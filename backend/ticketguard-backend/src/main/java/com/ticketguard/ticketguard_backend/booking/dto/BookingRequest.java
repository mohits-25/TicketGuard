package com.ticketguard.ticketguard_backend.booking.dto;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;

public record BookingRequest(

        @NotNull(message = "Event ID is required")
        Long eventId,

        @NotNull(message = "Number of tickets is required")
        @Min(value = 1, message = "At least one ticket must be booked")
        Integer numberOfTickets

) {
}