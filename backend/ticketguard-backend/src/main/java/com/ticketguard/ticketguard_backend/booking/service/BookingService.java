package com.ticketguard.ticketguard_backend.booking.service;

import com.ticketguard.ticketguard_backend.booking.dto.BookingRequest;
import com.ticketguard.ticketguard_backend.booking.dto.BookingResponse;
import com.ticketguard.ticketguard_backend.booking.entity.Booking;
import com.ticketguard.ticketguard_backend.booking.enums.BookingStatus;
import com.ticketguard.ticketguard_backend.booking.mapper.BookingMapper;
import com.ticketguard.ticketguard_backend.booking.repository.BookingRepository;
import com.ticketguard.ticketguard_backend.common.exception.BookingNotFoundException;
import com.ticketguard.ticketguard_backend.common.exception.EventBookingClosedException;
import com.ticketguard.ticketguard_backend.common.exception.InsufficientSeatsException;
import com.ticketguard.ticketguard_backend.event.entity.Event;
import com.ticketguard.ticketguard_backend.event.enums.EventStatus;
import com.ticketguard.ticketguard_backend.event.repository.EventRepository;
import com.ticketguard.ticketguard_backend.user.entity.User;
import com.ticketguard.ticketguard_backend.user.repository.UserRepository;
import jakarta.persistence.EntityNotFoundException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.List;
import java.util.UUID;

@Service
public class BookingService {

    private static final Logger log =
            LoggerFactory.getLogger(BookingService.class);

    private final BookingRepository bookingRepository;
    private final EventRepository eventRepository;
    private final UserRepository userRepository;

    public BookingService(
            BookingRepository bookingRepository,
            EventRepository eventRepository,
            UserRepository userRepository) {

        this.bookingRepository = bookingRepository;
        this.eventRepository = eventRepository;
        this.userRepository = userRepository;
    }

    /**
     * Create Booking
     */
    @Transactional
    public BookingResponse createBooking(
            BookingRequest request,
            UserDetails userDetails) {

        log.info("Booking request received. Event ID: {}, Tickets: {}, User: {}",
                request.eventId(),
                request.numberOfTickets(),
                userDetails.getUsername());

        User user = userRepository
                .findByEmail(userDetails.getUsername())
                .orElseThrow(() -> {

                    log.warn("User not found: {}", userDetails.getUsername());

                    return new EntityNotFoundException("User not found");
                });

        Event event = eventRepository
                .findById(request.eventId())
                .orElseThrow(() -> {

                    log.warn("Event not found. Event ID: {}", request.eventId());

                    return new EntityNotFoundException("Event not found");
                });

        if (event.getStatus() == EventStatus.CANCELLED) {

            log.warn("Booking rejected. Event {} is cancelled.",
                    event.getId());

            throw new EventBookingClosedException(
                    "Cannot book cancelled event");
        }

        if (event.getStatus() == EventStatus.COMPLETED) {

            log.warn("Booking rejected. Event {} already completed.",
                    event.getId());

            throw new IllegalStateException(
                    "Event already completed");
        }

        if (request.numberOfTickets() <= 0) {

            log.warn("Invalid ticket quantity: {}",
                    request.numberOfTickets());

            throw new IllegalArgumentException(
                    "Invalid ticket quantity");
        }

        if (request.numberOfTickets() > event.getAvailableSeats()) {

            log.warn(
                    "Insufficient seats. Requested: {}, Available: {}, Event: {}",
                    request.numberOfTickets(),
                    event.getAvailableSeats(),
                    event.getId());

            throw new InsufficientSeatsException(
                    "Not enough seats available");
        }

        BigDecimal totalAmount = event.getTicketPrice()
                .multiply(BigDecimal.valueOf(request.numberOfTickets()));

        event.setAvailableSeats(
                event.getAvailableSeats() - request.numberOfTickets());

        Booking booking = Booking.builder()
                .bookingReference(generateBookingReference())
                .user(user)
                .event(event)
                .numberOfTickets(request.numberOfTickets())
                .totalAmount(totalAmount)
                .status(BookingStatus.CONFIRMED)
                .build();

        Booking savedBooking = bookingRepository.save(booking);

        eventRepository.save(event);

        log.info(
                "Booking created successfully. Reference: {}, User: {}, Event: {}, Remaining Seats: {}",
                savedBooking.getBookingReference(),
                user.getEmail(),
                event.getTitle(),
                event.getAvailableSeats());

        return BookingMapper.toResponse(savedBooking);
    }

    /**
     * Get Booking
     */
    public BookingResponse getBookingById(Long id) {

        log.info("Fetching booking with ID: {}", id);

        Booking booking = bookingRepository.findById(id)
                .orElseThrow(() -> {

                    log.warn("Booking not found. ID: {}", id);

                    return new BookingNotFoundException(
                            "Booking not found");
                });

        log.info("Booking found. Reference: {}",
                booking.getBookingReference());

        return BookingMapper.toResponse(booking);
    }

    /**
     * My Bookings
     */
    public List<BookingResponse> getMyBookings(
            UserDetails userDetails) {

        log.info("Fetching bookings for user: {}",
                userDetails.getUsername());

        User user = userRepository
                .findByEmail(userDetails.getUsername())
                .orElseThrow(() -> {

                    log.warn("User not found: {}",
                            userDetails.getUsername());

                    return new EntityNotFoundException(
                            "User not found");
                });

        List<BookingResponse> bookings = bookingRepository
                .findByUser(user)
                .stream()
                .map(BookingMapper::toResponse)
                .toList();

        log.info("Retrieved {} bookings for user {}",
                bookings.size(),
                user.getEmail());

        return bookings;
    }

    /**
     * All Bookings
     */
    public List<BookingResponse> getAllBookings() {

        log.info("Fetching all bookings.");

        List<BookingResponse> bookings = bookingRepository
                .findAll()
                .stream()
                .map(BookingMapper::toResponse)
                .toList();

        log.info("Retrieved {} bookings.",
                bookings.size());

        return bookings;
    }

    /**
     * Cancel Booking
     */
    @Transactional
    public void cancelBooking(Long id) {

        log.info("Cancelling booking. ID: {}", id);

        Booking booking = bookingRepository.findById(id)
                .orElseThrow(() -> {

                    log.warn("Booking not found. ID: {}", id);

                    return new BookingNotFoundException(
                            "Booking not found");
                });

        if (booking.getStatus() == BookingStatus.CANCELLED) {

            log.warn("Booking already cancelled. Reference: {}",
                    booking.getBookingReference());

            throw new IllegalStateException(
                    "Booking already cancelled");
        }

        Event event = booking.getEvent();

        event.setAvailableSeats(
                event.getAvailableSeats() + booking.getNumberOfTickets());

        booking.setStatus(BookingStatus.CANCELLED);

        bookingRepository.save(booking);
        eventRepository.save(event);

        log.info(
                "Booking cancelled successfully. Reference: {}, Seats Restored: {}, Available Seats: {}",
                booking.getBookingReference(),
                booking.getNumberOfTickets(),
                event.getAvailableSeats());
    }

    /**
     * Generate Booking Reference
     */
    private String generateBookingReference() {

        return "TG-"
                + UUID.randomUUID()
                .toString()
                .substring(0, 8)
                .toUpperCase();
    }
}