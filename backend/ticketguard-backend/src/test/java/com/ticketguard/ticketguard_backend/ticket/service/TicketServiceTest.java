package com.ticketguard.ticketguard_backend.ticket.service;

import com.ticketguard.ticketguard_backend.booking.entity.Booking;
import com.ticketguard.ticketguard_backend.common.exception.TicketAlreadyExistsException;
import com.ticketguard.ticketguard_backend.event.entity.Event;
import com.ticketguard.ticketguard_backend.ticket.dto.TicketResponse;
import com.ticketguard.ticketguard_backend.ticket.entity.Ticket;
import com.ticketguard.ticketguard_backend.ticket.enums.TicketStatus;
import com.ticketguard.ticketguard_backend.ticket.pdf.PdfService;
import com.ticketguard.ticketguard_backend.ticket.qr.QrCodeService;
import com.ticketguard.ticketguard_backend.ticket.repository.TicketRepository;
import com.ticketguard.ticketguard_backend.mail.EmailService;
import com.ticketguard.ticketguard_backend.user.entity.User;
import com.ticketguard.ticketguard_backend.user.repository.UserRepository;
import com.ticketguard.ticketguard_backend.venue.entity.Venue;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;

import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class TicketServiceTest {

    @Mock
    private TicketRepository ticketRepository;

    @Mock
    private UserRepository userRepository;

    @Mock
    private QrCodeService qrCodeService;

    @Mock
    private PdfService pdfService;

    @Mock
    private EmailService emailService;

    @InjectMocks
    private TicketService ticketService;


    // =========================================================
    // GENERATE TICKET
    // =========================================================

    @Test
    void generateTicket_shouldWorkSuccessfully() {

        User user = User.builder()
                .id(1L)
                .firstName("Mohit")
                .lastName("Sharma")
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
                .build();

        Booking booking = Booking.builder()
                .id(1L)
                .bookingReference("TG-ABC12345")
                .user(user)
                .event(event)
                .build();

        Ticket savedTicket = Ticket.builder()
                .id(1L)
                .ticketNumber("TKT-ABC12345")
                .booking(booking)
                .qrCode("qr-code.png")
                .pdfPath("ticket.pdf")
                .status(TicketStatus.ACTIVE)
                .build();

        when(ticketRepository.findByBooking(booking))
                .thenReturn(Optional.empty());

        when(ticketRepository.existsByTicketNumber(anyString()))
                .thenReturn(false);

        when(qrCodeService.generateQrCode(
                anyString(),
                anyString()
        ))
                .thenReturn("qr-code.png");

        when(ticketRepository.save(any(Ticket.class)))
                .thenReturn(savedTicket);

        when(pdfService.generateTicketPdf(savedTicket))
                .thenReturn("ticket.pdf");

        Ticket result =
                ticketService.generateTicket(booking);

        assertThat(result).isNotNull();

        assertThat(result.getTicketNumber())
                .isEqualTo("TKT-ABC12345");

        assertThat(result.getStatus())
                .isEqualTo(TicketStatus.ACTIVE);

        assertThat(result.getPdfPath())
                .isEqualTo("ticket.pdf");
    }


    // =========================================================
    // DUPLICATE TICKET
    // =========================================================

    @Test
    void generateTicket_shouldRejectDuplicateTicket() {

        User user = User.builder()
                .id(1L)
                .firstName("Mohit")
                .lastName("Sharma")
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
                .build();

        Booking booking = Booking.builder()
                .id(1L)
                .bookingReference("TG-ABC12345")
                .user(user)
                .event(event)
                .build();

        Ticket existingTicket = Ticket.builder()
                .id(1L)
                .ticketNumber("TKT-ABC12345")
                .booking(booking)
                .status(TicketStatus.ACTIVE)
                .build();

        when(ticketRepository.findByBooking(booking))
                .thenReturn(Optional.of(existingTicket));

        assertThatThrownBy(() ->
                ticketService.generateTicket(booking)
        )
                .isInstanceOf(TicketAlreadyExistsException.class);
    }


    // =========================================================
    // GET TICKET BY ID
    // =========================================================

    @Test
    void getTicketById_shouldReturnTicket() {

        User user = User.builder()
                .id(1L)
                .firstName("Mohit")
                .lastName("Sharma")
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
                .build();

        Booking booking = Booking.builder()
                .id(1L)
                .bookingReference("TG-ABC12345")
                .user(user)
                .event(event)
                .build();

        Ticket ticket = Ticket.builder()
                .id(1L)
                .ticketNumber("TKT-ABC12345")
                .booking(booking)
                .qrCode("qr-code.png")
                .pdfPath("ticket.pdf")
                .status(TicketStatus.ACTIVE)
                .build();

        when(ticketRepository.findById(1L))
                .thenReturn(Optional.of(ticket));

        TicketResponse response =
                ticketService.getTicketById(1L);

        assertThat(response).isNotNull();

        assertThat(response.ticketNumber())
                .isEqualTo("TKT-ABC12345");
    }
}