package com.ticketguard.ticketguard_backend.booking.dto;

import com.ticketguard.ticketguard_backend.booking.enums.BookingStatus;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;

public record BookingResponse(

        Long id,

        String bookingReference,

        Long eventId,

        String eventTitle,

        LocalDate eventDate,

        LocalTime startTime,

        String venueName,

        Integer numberOfTickets,

        BigDecimal pricePerTicket,

        BigDecimal totalAmount,

        BookingStatus status,

        LocalDateTime bookingTime

) {
}