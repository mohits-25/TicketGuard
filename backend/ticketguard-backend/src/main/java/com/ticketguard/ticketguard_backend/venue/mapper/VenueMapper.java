package com.ticketguard.ticketguard_backend.venue.mapper;

import com.ticketguard.ticketguard_backend.venue.dto.VenueRequest;
import com.ticketguard.ticketguard_backend.venue.dto.VenueResponse;
import com.ticketguard.ticketguard_backend.venue.entity.Venue;

public class VenueMapper {

    private VenueMapper() {
    }

    /**
     * Request -> Entity
     */
    public static Venue toEntity(VenueRequest request) {

        return Venue.builder()
                .name(request.name())
                .address(request.address())
                .city(request.city())
                .state(request.state())
                .country(request.country())
                .zipCode(request.zipCode())
                .capacity(request.capacity())
                .build();
    }

    /**
     * Entity -> Response
     */
    public static VenueResponse toResponse(Venue venue) {

        return new VenueResponse(

                venue.getId(),

                venue.getName(),

                venue.getAddress(),

                venue.getCity(),

                venue.getState(),

                venue.getCountry(),

                venue.getZipCode(),

                venue.getCapacity(),

                venue.getCreatedAt(),

                venue.getUpdatedAt()
        );
    }

}