package com.ticketguard.ticketguard_backend.event.controller;

import com.ticketguard.ticketguard_backend.event.dto.EventRequest;
import com.ticketguard.ticketguard_backend.event.dto.EventResponse;
import com.ticketguard.ticketguard_backend.event.enums.EventCategory;
import com.ticketguard.ticketguard_backend.event.service.EventService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@Tag(
        name = "Events",
        description = "Event Management APIs"
)
@RestController
@RequestMapping("/api/v1/events")
public class EventController {

    private final EventService eventService;

    public EventController(EventService eventService) {
        this.eventService = eventService;
    }

    //---------------------------------------------------
    // ADMIN APIs
    //---------------------------------------------------

    @Operation(summary = "Create Event")
    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    @PreAuthorize("hasRole('ADMIN')")
    public EventResponse createEvent(
            @Valid @RequestBody EventRequest request) {

        return eventService.createEvent(request);
    }

    @Operation(summary = "Update Event")
    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public EventResponse updateEvent(
            @PathVariable Long id,
            @Valid @RequestBody EventRequest request) {

        return eventService.updateEvent(id, request);
    }

    @Operation(summary = "Delete Event")
    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    @PreAuthorize("hasRole('ADMIN')")
    public void deleteEvent(@PathVariable Long id) {

        eventService.deleteEvent(id);
    }

    //---------------------------------------------------
    // PUBLIC APIs
    //---------------------------------------------------

    @Operation(summary = "Get All Events")
    @GetMapping
    public Page<EventResponse> getAllEvents(

            @PageableDefault(
                    size = 10,
                    sort = "eventDate")
            Pageable pageable) {

        return eventService.getAllEvents(pageable);
    }

    @Operation(summary = "Get Event By Id")
    @GetMapping("/{id}")
    public EventResponse getEventById(
            @PathVariable Long id) {

        return eventService.getEventById(id);
    }

    @Operation(summary = "Get Events By Category")
    @GetMapping("/category/{category}")
    public Page<EventResponse> getByCategory(

            @PathVariable EventCategory category,

            @PageableDefault(
                    size = 10,
                    sort = "eventDate")
            Pageable pageable) {

        return eventService.getEventsByCategory(
                category,
                pageable);
    }

    @Operation(summary = "Search Events")
    @GetMapping("/search")
    public Page<EventResponse> search(

            @RequestParam String keyword,

            @PageableDefault(
                    size = 10,
                    sort = "eventDate")
            Pageable pageable) {

        return eventService.searchEvents(
                keyword,
                pageable);
    }

}