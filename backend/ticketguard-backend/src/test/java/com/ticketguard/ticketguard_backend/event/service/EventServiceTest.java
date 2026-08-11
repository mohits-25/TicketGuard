package com.ticketguard.ticketguard_backend.event.service;

import com.ticketguard.ticketguard_backend.common.exception.EventAlreadyExistsException;
import com.ticketguard.ticketguard_backend.event.dto.EventRequest;
import com.ticketguard.ticketguard_backend.event.dto.EventResponse;
import com.ticketguard.ticketguard_backend.event.entity.Event;
import com.ticketguard.ticketguard_backend.event.enums.EventCategory;
import com.ticketguard.ticketguard_backend.event.repository.EventRepository;
import com.ticketguard.ticketguard_backend.venue.entity.Venue;
import com.ticketguard.ticketguard_backend.venue.repository.VenueRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class EventServiceTest {

    @Mock
    private EventRepository eventRepository;

    @Mock
    private VenueRepository venueRepository;

    @InjectMocks
    private EventService eventService;

    @Test
    void createEvent_shouldWorkSuccessfully() {

        EventRequest request = new EventRequest(
                "Tech Conference",
                "Spring Boot Conference",
                EventCategory.CONCERT,
                1L,
                LocalDate.of(2026, 9, 10),
                LocalTime.of(10, 0),
                LocalTime.of(16, 0),
                new BigDecimal("500.00"),
                100,
                "image.jpg"
        );

        Venue venue = Venue.builder()
                .id(1L)
                .name("NIE Auditorium")
                .build();

        Event savedEvent = Event.builder()
                .id(1L)
                .title("Tech Conference")
                .description("Spring Boot Conference")
                .category(EventCategory.CONCERT)
                .venue(venue)
                .eventDate(request.eventDate())
                .startTime(request.startTime())
                .endTime(request.endTime())
                .ticketPrice(request.ticketPrice())
                .totalSeats(request.totalSeats())
                .imageUrl(request.imageUrl())
                .build();

        when(eventRepository.existsByTitleAndEventDate(
                request.title(),
                request.eventDate()
        )).thenReturn(false);

        when(venueRepository.findById(request.venueId()))
                .thenReturn(Optional.of(venue));

        when(eventRepository.save(any(Event.class)))
                .thenReturn(savedEvent);

        EventResponse response =
                eventService.createEvent(request);

        assertThat(response).isNotNull();
        assertThat(response.title())
                .isEqualTo("Tech Conference");
    }

    @Test
    void createEvent_shouldRejectDuplicateEvent() {

        EventRequest request = new EventRequest(
                "Tech Conference",
                "Spring Boot Conference",
                EventCategory.CONCERT,
                1L,
                LocalDate.of(2026, 9, 10),
                LocalTime.of(10, 0),
                LocalTime.of(16, 0),
                new BigDecimal("500.00"),
                100,
                "image.jpg"
        );

        when(eventRepository.existsByTitleAndEventDate(
                request.title(),
                request.eventDate()
        )).thenReturn(true);

        assertThatThrownBy(() ->
                eventService.createEvent(request)
        )
                .isInstanceOf(EventAlreadyExistsException.class);
    }

    @Test
    void getEventById_shouldReturnEvent() {

        Venue venue = Venue.builder()
                .id(1L)
                .name("NIE Auditorium")
                .build();

        Event event = Event.builder()
                .id(1L)
                .title("Tech Conference")
                .description("Spring Boot Conference")
                .category(EventCategory.CONCERT)
                .venue(venue)
                .eventDate(LocalDate.of(2026, 9, 10))
                .startTime(LocalTime.of(10, 0))
                .endTime(LocalTime.of(16, 0))
                .ticketPrice(new BigDecimal("500.00"))
                .totalSeats(100)
                .imageUrl("image.jpg")
                .build();

        when(eventRepository.findById(1L))
                .thenReturn(Optional.of(event));

        EventResponse response =
                eventService.getEventById(1L);

        assertThat(response).isNotNull();
        assertThat(response.title())
                .isEqualTo("Tech Conference");
    }
}