package com.ticketguard.ticketguard_backend.booking.service;

import com.ticketguard.ticketguard_backend.booking.dto.BookingRequest;
import com.ticketguard.ticketguard_backend.booking.dto.BookingResponse;
import com.ticketguard.ticketguard_backend.booking.entity.Booking;
import com.ticketguard.ticketguard_backend.booking.enums.BookingStatus;
import com.ticketguard.ticketguard_backend.booking.repository.BookingRepository;
import com.ticketguard.ticketguard_backend.common.exception.InsufficientSeatsException;
import com.ticketguard.ticketguard_backend.event.entity.Event;
import com.ticketguard.ticketguard_backend.event.enums.EventStatus;
import com.ticketguard.ticketguard_backend.event.repository.EventRepository;
import com.ticketguard.ticketguard_backend.user.entity.User;
import com.ticketguard.ticketguard_backend.user.repository.UserRepository;
import com.ticketguard.ticketguard_backend.venue.entity.Venue;
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
class BookingServiceTest {

    @Mock
    private BookingRepository bookingRepository;

    @Mock
    private EventRepository eventRepository;

    @Mock
    private UserRepository userRepository;

    @Mock
    private UserDetails userDetails;

    @InjectMocks
    private BookingService bookingService;

    @Test
    void createBooking_shouldWorkSuccessfully() {

        BookingRequest request = new BookingRequest(
                1L,
                2
        );

        User user = User.builder()
                .id(1L)
                .email("mohit@example.com")
                .build();

        Venue venue = Venue.builder()
                .id(1L)
                .name("NIE Auditorium")
                .build();

        Event event = Event.builder()
                .id(1L)
                .title("Tech Conference")
                .venue(venue)
                .ticketPrice(new BigDecimal("500.00"))
                .availableSeats(100)
                .status(EventStatus.UPCOMING)
                .build();

        Booking savedBooking = Booking.builder()
                .id(1L)
                .bookingReference("TG-ABC12345")
                .user(user)
                .event(event)
                .numberOfTickets(2)
                .totalAmount(new BigDecimal("1000.00"))
                .status(BookingStatus.CONFIRMED)
                .build();

        when(userDetails.getUsername())
                .thenReturn("mohit@example.com");

        when(userRepository.findByEmail("mohit@example.com"))
                .thenReturn(Optional.of(user));

        when(eventRepository.findById(1L))
                .thenReturn(Optional.of(event));

        when(bookingRepository.save(any(Booking.class)))
                .thenReturn(savedBooking);

        BookingResponse response =
                bookingService.createBooking(request, userDetails);

        assertThat(response).isNotNull();

        assertThat(response.bookingReference())
                .isEqualTo("TG-ABC12345");

        assertThat(event.getAvailableSeats())
                .isEqualTo(98);
    }

    @Test
    void createBooking_shouldRejectWhenSeatsAreInsufficient() {

        BookingRequest request = new BookingRequest(
                1L,
                10
        );

        User user = User.builder()
                .id(1L)
                .email("mohit@example.com")
                .build();

        Venue venue = Venue.builder()
                .id(1L)
                .name("NIE Auditorium")
                .build();

        Event event = Event.builder()
                .id(1L)
                .title("Tech Conference")
                .venue(venue)
                .ticketPrice(new BigDecimal("500.00"))
                .availableSeats(5)
                .status(EventStatus.UPCOMING)
                .build();

        when(userDetails.getUsername())
                .thenReturn("mohit@example.com");

        when(userRepository.findByEmail("mohit@example.com"))
                .thenReturn(Optional.of(user));

        when(eventRepository.findById(1L))
                .thenReturn(Optional.of(event));

        assertThatThrownBy(() ->
                bookingService.createBooking(request, userDetails)
        )
                .isInstanceOf(InsufficientSeatsException.class);
    }

    @Test
    void getBookingById_shouldReturnBooking() {

        User user = User.builder()
                .id(1L)
                .email("mohit@example.com")
                .build();

        Venue venue = Venue.builder()
                .id(1L)
                .name("NIE Auditorium")
                .build();

        Event event = Event.builder()
                .id(1L)
                .title("Tech Conference")
                .venue(venue)
                .ticketPrice(new BigDecimal("500.00"))
                .availableSeats(98)
                .status(EventStatus.UPCOMING)
                .build();

        Booking booking = Booking.builder()
                .id(1L)
                .bookingReference("TG-ABC12345")
                .user(user)
                .event(event)
                .numberOfTickets(2)
                .totalAmount(new BigDecimal("1000.00"))
                .status(BookingStatus.CONFIRMED)
                .build();

        when(bookingRepository.findById(1L))
                .thenReturn(Optional.of(booking));

        BookingResponse response =
                bookingService.getBookingById(1L);

        assertThat(response).isNotNull();

        assertThat(response.bookingReference())
                .isEqualTo("TG-ABC12345");
    }
}