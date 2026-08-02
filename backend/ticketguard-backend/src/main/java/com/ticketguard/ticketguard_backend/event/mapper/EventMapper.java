package com.ticketguard.ticketguard_backend.event.mapper;

import com.ticketguard.ticketguard_backend.event.dto.EventRequest;
import com.ticketguard.ticketguard_backend.event.dto.EventResponse;
import com.ticketguard.ticketguard_backend.event.entity.Event;
import com.ticketguard.ticketguard_backend.venue.entity.Venue;

public class EventMapper {

    private EventMapper() {
    }

    /**
     * DTO -> Entity
     */
    public static Event toEntity(
            EventRequest request,
            Venue venue) {

        return Event.builder()

                .title(request.title())

                .description(request.description())

                .category(request.category())

                .venue(venue)

                .eventDate(request.eventDate())

                .startTime(request.startTime())

                .endTime(request.endTime())

                .ticketPrice(request.ticketPrice())

                .totalSeats(request.totalSeats())

                .availableSeats(request.totalSeats())

                .imageUrl(request.imageUrl())

                .build();
    }

    /**
     * Entity -> DTO
     */
    public static EventResponse toResponse(Event event) {

        return new EventResponse(

                event.getId(),

                event.getTitle(),

                event.getDescription(),

                event.getCategory(),

                event.getVenue().getId(),

                event.getVenue().getName(),

                event.getVenue().getCity(),

                event.getEventDate(),

                event.getStartTime(),

                event.getEndTime(),

                event.getTicketPrice(),

                event.getTotalSeats(),

                event.getAvailableSeats(),

                event.getImageUrl(),

                event.getStatus(),

                event.getCreatedAt(),

                event.getUpdatedAt()

        );
    }

}