package com.ticketguard.ticketguard_backend.payment.service;

import com.ticketguard.ticketguard_backend.booking.entity.Booking;
import com.ticketguard.ticketguard_backend.booking.enums.BookingStatus;
import com.ticketguard.ticketguard_backend.booking.repository.BookingRepository;
import com.ticketguard.ticketguard_backend.common.exception.PaymentAlreadyExistsException;
import com.ticketguard.ticketguard_backend.payment.dto.PaymentRequest;
import com.ticketguard.ticketguard_backend.payment.dto.PaymentResponse;
import com.ticketguard.ticketguard_backend.payment.entity.Payment;
import com.ticketguard.ticketguard_backend.payment.enums.PaymentMethod;
import com.ticketguard.ticketguard_backend.payment.enums.PaymentStatus;
import com.ticketguard.ticketguard_backend.payment.repository.PaymentRepository;
import com.ticketguard.ticketguard_backend.ticket.service.TicketService;
import com.ticketguard.ticketguard_backend.user.entity.User;
import com.ticketguard.ticketguard_backend.user.repository.UserRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.core.userdetails.UserDetails;

import java.math.BigDecimal;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class PaymentServiceTest {

    @Mock
    private PaymentRepository paymentRepository;

    @Mock
    private BookingRepository bookingRepository;

    @Mock
    private UserRepository userRepository;

    @Mock
    private TicketService ticketService;

    @Mock
    private UserDetails userDetails;

    @InjectMocks
    private PaymentService paymentService;

    @Test
    void processPayment_shouldWorkSuccessfully() {

        PaymentRequest request = new PaymentRequest(
                1L,
                PaymentMethod.CARD
        );

        User user = User.builder()
                .id(1L)
                .email("mohit@example.com")
                .build();

        Booking booking = Booking.builder()
                .id(1L)
                .bookingReference("TG-ABC12345")
                .user(user)
                .totalAmount(new BigDecimal("1000.00"))
                .status(BookingStatus.PENDING)
                .build();

        Payment savedPayment = Payment.builder()
                .id(1L)
                .booking(booking)
                .transactionId("TXN-ABC123456")
                .amount(new BigDecimal("1000.00"))
                .paymentMethod(PaymentMethod.CARD)
                .paymentStatus(PaymentStatus.SUCCESS)
                .build();

        when(userDetails.getUsername())
                .thenReturn("mohit@example.com");

        when(userRepository.findByEmail("mohit@example.com"))
                .thenReturn(Optional.of(user));

        when(bookingRepository.findById(1L))
                .thenReturn(Optional.of(booking));

        when(paymentRepository.findByBooking(booking))
                .thenReturn(Optional.empty());

        when(paymentRepository.save(any(Payment.class)))
                .thenReturn(savedPayment);

        PaymentResponse response =
                paymentService.processPayment(request, userDetails);

        assertThat(response).isNotNull();

        assertThat(response.transactionId())
                .isEqualTo("TXN-ABC123456");

        assertThat(response.paymentStatus())
                .isEqualTo(PaymentStatus.SUCCESS);

        assertThat(booking.getStatus())
                .isEqualTo(BookingStatus.CONFIRMED);
    }

    @Test
    void processPayment_shouldRejectDuplicatePayment() {

        PaymentRequest request = new PaymentRequest(
                1L,
                PaymentMethod.CARD
        );

        User user = User.builder()
                .id(1L)
                .email("mohit@example.com")
                .build();

        Booking booking = Booking.builder()
                .id(1L)
                .bookingReference("TG-ABC12345")
                .user(user)
                .totalAmount(new BigDecimal("1000.00"))
                .status(BookingStatus.PENDING)
                .build();

        Payment existingPayment = Payment.builder()
                .id(1L)
                .booking(booking)
                .paymentStatus(PaymentStatus.SUCCESS)
                .build();

        when(userDetails.getUsername())
                .thenReturn("mohit@example.com");

        when(userRepository.findByEmail("mohit@example.com"))
                .thenReturn(Optional.of(user));

        when(bookingRepository.findById(1L))
                .thenReturn(Optional.of(booking));

        when(paymentRepository.findByBooking(booking))
                .thenReturn(Optional.of(existingPayment));

        assertThatThrownBy(() ->
                paymentService.processPayment(request, userDetails)
        )
                .isInstanceOf(PaymentAlreadyExistsException.class);
    }

    @Test
    void processPayment_shouldRejectAnotherUsersBooking() {

        PaymentRequest request = new PaymentRequest(
                1L,
                PaymentMethod.CARD
        );

        User currentUser = User.builder()
                .id(1L)
                .email("mohit@example.com")
                .build();

        User bookingOwner = User.builder()
                .id(2L)
                .email("other@example.com")
                .build();

        Booking booking = Booking.builder()
                .id(1L)
                .bookingReference("TG-ABC12345")
                .user(bookingOwner)
                .totalAmount(new BigDecimal("1000.00"))
                .status(BookingStatus.PENDING)
                .build();

        when(userDetails.getUsername())
                .thenReturn("mohit@example.com");

        when(userRepository.findByEmail("mohit@example.com"))
                .thenReturn(Optional.of(currentUser));

        when(bookingRepository.findById(1L))
                .thenReturn(Optional.of(booking));

        assertThatThrownBy(() ->
                paymentService.processPayment(request, userDetails)
        )
                .isInstanceOf(IllegalStateException.class)
                .hasMessageContaining(
                        "You cannot pay for another user's booking"
                );
    }
}