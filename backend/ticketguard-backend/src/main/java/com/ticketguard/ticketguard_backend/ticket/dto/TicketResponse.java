package com.ticketguard.ticketguard_backend.ticket.dto;

import com.ticketguard.ticketguard_backend.ticket.enums.TicketStatus;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;

public record TicketResponse(

        Long id,

        String ticketNumber,

        Long bookingId,

        String bookingReference,

        Long eventId,

        String eventTitle,

        LocalDate eventDate,

        LocalTime eventStartTime,

        String venueName,

        Integer numberOfTickets,

        BigDecimal totalAmount,

        String qrCode,

        String pdfPath,

        TicketStatus status,

        LocalDateTime issuedAt

) {
}