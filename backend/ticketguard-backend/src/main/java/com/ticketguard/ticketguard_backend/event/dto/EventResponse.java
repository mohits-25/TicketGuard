package com.ticketguard.ticketguard_backend.event.dto;

import com.ticketguard.ticketguard_backend.event.enums.EventCategory;
import com.ticketguard.ticketguard_backend.event.enums.EventStatus;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;

public record EventResponse(

        Long id,

        String title,

        String description,

        EventCategory category,

        Long venueId,

        String venueName,

        String city,

        LocalDate eventDate,

        LocalTime startTime,

        LocalTime endTime,

        BigDecimal ticketPrice,

        Integer totalSeats,

        Integer availableSeats,

        String imageUrl,

        EventStatus status,

        LocalDateTime createdAt,

        LocalDateTime updatedAt

) {
}