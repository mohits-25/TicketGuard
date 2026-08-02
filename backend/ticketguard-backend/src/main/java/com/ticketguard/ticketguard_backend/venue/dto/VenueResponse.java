package com.ticketguard.ticketguard_backend.venue.dto;

import java.time.LocalDateTime;

public record VenueResponse(

        Long id,

        String name,

        String address,

        String city,

        String state,

        String country,

        String zipCode,

        Integer capacity,

        LocalDateTime createdAt,

        LocalDateTime updatedAt

) {
}