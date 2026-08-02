package com.ticketguard.ticketguard_backend.event.dto;

import com.ticketguard.ticketguard_backend.event.enums.EventCategory;
import jakarta.validation.constraints.*;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalTime;

public record EventRequest(

        @NotBlank(message = "Title is required")
        @Size(max = 100, message = "Title cannot exceed 100 characters")
        String title,

        @NotBlank(message = "Description is required")
        @Size(max = 1000, message = "Description cannot exceed 1000 characters")
        String description,

        @NotNull(message = "Category is required")
        EventCategory category,

        @NotNull(message = "Venue ID is required")
        Long venueId,

        @NotNull(message = "Event date is required")
        LocalDate eventDate,

        @NotNull(message = "Start time is required")
        LocalTime startTime,

        @NotNull(message = "End time is required")
        LocalTime endTime,

        @NotNull(message = "Ticket price is required")
        @DecimalMin(value = "0.0", inclusive = false,
                message = "Ticket price must be greater than zero")
        BigDecimal ticketPrice,

        @NotNull(message = "Total seats are required")
        @Min(value = 1, message = "Total seats must be at least 1")
        Integer totalSeats,

        @Size(max = 500, message = "Image URL cannot exceed 500 characters")
        String imageUrl

) {
}