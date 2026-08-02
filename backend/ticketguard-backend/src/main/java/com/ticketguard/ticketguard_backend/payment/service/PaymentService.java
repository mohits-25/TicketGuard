package com.ticketguard.ticketguard_backend.payment.service;

import com.ticketguard.ticketguard_backend.booking.entity.Booking;
import com.ticketguard.ticketguard_backend.booking.enums.BookingStatus;
import com.ticketguard.ticketguard_backend.booking.repository.BookingRepository;
import com.ticketguard.ticketguard_backend.common.exception.BookingNotFoundException;
import com.ticketguard.ticketguard_backend.common.exception.PaymentAlreadyExistsException;
import com.ticketguard.ticketguard_backend.common.exception.PaymentNotFoundException;
import com.ticketguard.ticketguard_backend.payment.dto.PaymentRequest;
import com.ticketguard.ticketguard_backend.payment.dto.PaymentResponse;
import com.ticketguard.ticketguard_backend.payment.entity.Payment;
import com.ticketguard.ticketguard_backend.payment.enums.PaymentStatus;
import com.ticketguard.ticketguard_backend.payment.mapper.PaymentMapper;
import com.ticketguard.ticketguard_backend.payment.repository.PaymentRepository;
import com.ticketguard.ticketguard_backend.user.entity.User;
import com.ticketguard.ticketguard_backend.user.repository.UserRepository;
import jakarta.persistence.EntityNotFoundException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import com.ticketguard.ticketguard_backend.ticket.service.TicketService;
import java.util.List;
import java.util.UUID;

@Service
public class PaymentService {

    private static final Logger log =
            LoggerFactory.getLogger(PaymentService.class);

    private final PaymentRepository paymentRepository;
    private final BookingRepository bookingRepository;
    private final UserRepository userRepository;
    private final TicketService ticketService;

    public PaymentService(
            PaymentRepository paymentRepository,
            BookingRepository bookingRepository,
            UserRepository userRepository,
            TicketService ticketService) {

        this.paymentRepository = paymentRepository;
        this.bookingRepository = bookingRepository;
        this.userRepository = userRepository;
        this.ticketService = ticketService;
    }

    /**
     * Process Payment
     */
    @Transactional
    public PaymentResponse processPayment(
            PaymentRequest request,
            UserDetails userDetails) {

        log.info("Payment initiated. Booking ID: {}, User: {}",
                request.bookingId(),
                userDetails.getUsername());

        User user = userRepository.findByEmail(
                        userDetails.getUsername())
                .orElseThrow(() -> {

                    log.warn("User not found: {}",
                            userDetails.getUsername());

                    return new EntityNotFoundException(
                            "User not found");
                });

        Booking booking = bookingRepository.findById(
                        request.bookingId())
                .orElseThrow(() -> {

                    log.warn("Booking not found. ID: {}",
                            request.bookingId());

                    return new BookingNotFoundException(
                            "Booking not found");
                });

        //----------------------------------------
        // Ownership Validation
        //----------------------------------------

        if (!booking.getUser().getId().equals(user.getId())) {

            log.warn(
                    "Unauthorized payment attempt. Booking: {}, Requested By: {}, Booking Owner: {}",
                    booking.getId(),
                    user.getEmail(),
                    booking.getUser().getEmail());

            throw new IllegalStateException(
                    "You cannot pay for another user's booking.");
        }

        //----------------------------------------
        // Duplicate Payment
        //----------------------------------------

        if (paymentRepository.findByBooking(booking).isPresent()) {

            log.warn(
                    "Duplicate payment attempt for booking {}",
                    booking.getBookingReference());

            throw new PaymentAlreadyExistsException(
                    "Payment already completed for this booking.");
        }

        //----------------------------------------
        // Mock Payment Gateway
        //----------------------------------------

        PaymentStatus paymentStatus = PaymentStatus.SUCCESS;

        //----------------------------------------
        // Create Payment
        //----------------------------------------

        Payment payment = Payment.builder()
                .booking(booking)
                .transactionId(generateTransactionId())
                .amount(booking.getTotalAmount())
                .paymentMethod(request.paymentMethod())
                .paymentStatus(paymentStatus)
                .build();

        Payment savedPayment =
                paymentRepository.save(payment);

        log.info(
                "Payment saved successfully. Transaction: {}, Booking: {}, Amount: {}",
                savedPayment.getTransactionId(),
                booking.getBookingReference(),
                savedPayment.getAmount());

        //----------------------------------------
        // Update Booking
        //----------------------------------------

        if (paymentStatus == PaymentStatus.SUCCESS) {

            booking.setStatus(BookingStatus.CONFIRMED);

            bookingRepository.save(booking);

            //----------------------------------------
            // Generate Ticket
            //----------------------------------------

            ticketService.generateTicket(booking);

            log.info(
                    "Ticket generated successfully for booking {}",
                    booking.getBookingReference());
        }

        return PaymentMapper.toResponse(savedPayment);
    }

    /**
     * Get Payment
     */
    public PaymentResponse getPaymentById(Long id) {

        log.info("Fetching payment with ID: {}", id);

        Payment payment = paymentRepository.findById(id)
                .orElseThrow(() -> {

                    log.warn("Payment not found. ID: {}", id);

                    return new PaymentNotFoundException(
                            "Payment not found");
                });

        log.info("Payment found. Transaction ID: {}",
                payment.getTransactionId());

        return PaymentMapper.toResponse(payment);
    }

    /**
     * My Payments
     */
    public List<PaymentResponse> getMyPayments(
            UserDetails userDetails) {

        log.info("Fetching payments for user: {}",
                userDetails.getUsername());

        User user = userRepository.findByEmail(
                        userDetails.getUsername())
                .orElseThrow(() -> {

                    log.warn("User not found: {}",
                            userDetails.getUsername());

                    return new EntityNotFoundException(
                            "User not found");
                });

        List<PaymentResponse> payments = paymentRepository
                .findByBookingUser(user)
                .stream()
                .map(PaymentMapper::toResponse)
                .toList();

        log.info("Retrieved {} payments for user {}",
                payments.size(),
                user.getEmail());

        return payments;
    }

    /**
     * All Payments
     */
    public List<PaymentResponse> getAllPayments() {

        log.info("Fetching all payments.");

        List<PaymentResponse> payments = paymentRepository
                .findAll()
                .stream()
                .map(PaymentMapper::toResponse)
                .toList();

        log.info("Retrieved {} payments.",
                payments.size());

        return payments;
    }

    /**
     * Generate Transaction ID
     */
    private String generateTransactionId() {

        return "TXN-"
                + UUID.randomUUID()
                .toString()
                .substring(0, 10)
                .toUpperCase();
    }

}