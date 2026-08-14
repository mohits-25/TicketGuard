package com.ticketguard.ticketguard_backend.event.service;

import com.ticketguard.ticketguard_backend.common.exception.EventAlreadyExistsException;
import com.ticketguard.ticketguard_backend.common.exception.EventNotFoundException;
import com.ticketguard.ticketguard_backend.event.dto.EventRequest;
import com.ticketguard.ticketguard_backend.event.dto.EventResponse;
import com.ticketguard.ticketguard_backend.event.entity.Event;
import com.ticketguard.ticketguard_backend.event.enums.EventCategory;
import com.ticketguard.ticketguard_backend.event.mapper.EventMapper;
import com.ticketguard.ticketguard_backend.event.repository.EventRepository;
import com.ticketguard.ticketguard_backend.venue.entity.Venue;
import com.ticketguard.ticketguard_backend.venue.repository.VenueRepository;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.cache.annotation.CachePut;
import org.springframework.cache.annotation.CacheEvict;
import jakarta.persistence.EntityNotFoundException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
public class EventService {

    private static final Logger log =
            LoggerFactory.getLogger(EventService.class);

    private final EventRepository eventRepository;
    private final VenueRepository venueRepository;

    public EventService(
            EventRepository eventRepository,
            VenueRepository venueRepository) {

        this.eventRepository = eventRepository;
        this.venueRepository = venueRepository;
    }

    /**
     * Create Event
     */
    public EventResponse createEvent(EventRequest request) {

        log.info("Creating event: {}", request.title());

        if (eventRepository.existsByTitleAndEventDate(
                request.title(),
                request.eventDate())) {

            log.warn("Event already exists. Title: {}, Date: {}",
                    request.title(),
                    request.eventDate());

            throw new EventAlreadyExistsException(
                    "Event already exists on " + request.eventDate());
        }

        Venue venue = venueRepository.findById(request.venueId())
                .orElseThrow(() -> {

                    log.warn("Venue not found while creating event. Venue ID: {}",
                            request.venueId());

                    return new EntityNotFoundException(
                            "Venue not found with id: " + request.venueId());
                });

        Event event = EventMapper.toEntity(request, venue);

        Event savedEvent = eventRepository.save(event);

        log.info("Event created successfully. ID: {}, Title: {}",
                savedEvent.getId(),
                savedEvent.getTitle());

        return EventMapper.toResponse(savedEvent);
    }

    /**
     * Get All Events
     */
    public Page<EventResponse> getAllEvents(Pageable pageable) {

        log.info("Fetching events. Page: {}, Size: {}",
                pageable.getPageNumber(),
                pageable.getPageSize());

        Page<EventResponse> events = eventRepository
                .findAll(pageable)
                .map(EventMapper::toResponse);

        log.info("Retrieved {} events.",
                events.getNumberOfElements());

        return events;
    }

    /**
     * Get Event By Id
     */
    @Cacheable(value = "events", key = "#id")
    public EventResponse getEventById(Long id) {

        log.info("Fetching event with ID: {}", id);

        Event event = eventRepository.findById(id)
                .orElseThrow(() -> {

                    log.warn("Event not found with ID: {}", id);

                    return new EventNotFoundException(
                            "Event not found with id: " + id);
                });

        log.info("Event found. Title: {}", event.getTitle());

        return EventMapper.toResponse(event);
    }

    /**
     * Update Event
     */
    @CachePut(value = "events", key = "#id")
    public EventResponse updateEvent(
            Long id,
            EventRequest request) {

        log.info("Updating event with ID: {}", id);

        Event event = eventRepository.findById(id)
                .orElseThrow(() -> {

                    log.warn("Event not found for update. ID: {}", id);

                    return new EventNotFoundException(
                            "Event not found with id: " + id);
                });

        Venue venue = venueRepository.findById(request.venueId())
                .orElseThrow(() -> {

                    log.warn("Venue not found while updating event. Venue ID: {}",
                            request.venueId());

                    return new EntityNotFoundException(
                            "Venue not found with id: " + request.venueId());
                });

        event.setTitle(request.title());
        event.setDescription(request.description());
        event.setCategory(request.category());
        event.setVenue(venue);
        event.setEventDate(request.eventDate());
        event.setStartTime(request.startTime());
        event.setEndTime(request.endTime());
        event.setTicketPrice(request.ticketPrice());
        event.setTotalSeats(request.totalSeats());
        event.setImageUrl(request.imageUrl());

        Event updatedEvent = eventRepository.save(event);

        log.info("Event updated successfully. ID: {}, Title: {}",
                updatedEvent.getId(),
                updatedEvent.getTitle());

        return EventMapper.toResponse(updatedEvent);
    }

    /**
     * Delete Event
     */
    @CacheEvict(value = "events", key = "#id")
    public void deleteEvent(Long id) {

        log.info("Deleting event with ID: {}", id);

        Event event = eventRepository.findById(id)
                .orElseThrow(() -> {

                    log.warn("Event not found for deletion. ID: {}", id);

                    return new EventNotFoundException(
                            "Event not found with id: " + id);
                });

        eventRepository.delete(event);

        log.info("Event deleted successfully. ID: {}, Title: {}",
                event.getId(),
                event.getTitle());
    }

    /**
     * Get Events By Category
     */
    public Page<EventResponse> getEventsByCategory(
            EventCategory category,
            Pageable pageable) {

        log.info("Fetching events by category: {}", category);

        Page<EventResponse> events = eventRepository
                .findByCategory(category, pageable)
                .map(EventMapper::toResponse);

        log.info("Found {} events for category {}",
                events.getNumberOfElements(),
                category);

        return events;
    }

    /**
     * Search Events
     */
    public Page<EventResponse> searchEvents(
            String keyword,
            Pageable pageable) {

        log.info("Searching events with keyword: {}", keyword);

        Page<EventResponse> events = eventRepository
                .findByTitleContainingIgnoreCase(keyword, pageable)
                .map(EventMapper::toResponse);

        log.info("Search returned {} events.",
                events.getNumberOfElements());

        return events;
    }

}