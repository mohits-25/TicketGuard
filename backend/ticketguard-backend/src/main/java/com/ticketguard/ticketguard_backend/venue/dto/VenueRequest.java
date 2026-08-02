package com.ticketguard.ticketguard_backend.venue.dto;

import jakarta.validation.constraints.*;

public record VenueRequest(

        @NotBlank(message = "Venue name is required")
        @Size(max = 100)
        String name,

        @NotBlank(message = "Address is required")
        @Size(max = 250)
        String address,

        @NotBlank(message = "City is required")
        @Size(max = 100)
        String city,

        @NotBlank(message = "State is required")
        @Size(max = 100)
        String state,

        @NotBlank(message = "Country is required")
        @Size(max = 100)
        String country,

        @NotBlank(message = "Zip Code is required")
        @Size(max = 10)
        String zipCode,

        @NotNull(message = "Capacity is required")
        @Min(value = 1, message = "Capacity must be greater than zero")
        Integer capacity

) {
}