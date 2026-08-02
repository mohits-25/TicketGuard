package com.ticketguard.ticketguard_backend.event.repository;

import com.ticketguard.ticketguard_backend.event.entity.Event;
import com.ticketguard.ticketguard_backend.event.enums.EventCategory;
import com.ticketguard.ticketguard_backend.event.enums.EventStatus;
import com.ticketguard.ticketguard_backend.venue.entity.Venue;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.List;

public interface EventRepository extends JpaRepository<Event, Long> {

    // Pagination
    Page<Event> findByCategory(EventCategory category, Pageable pageable);

    Page<Event> findByTitleContainingIgnoreCase(
            String keyword,
            Pageable pageable);

    // Other Queries
    List<Event> findByStatus(EventStatus status);

    List<Event> findByVenue(Venue venue);

    List<Event> findByEventDate(LocalDate eventDate);

    boolean existsByTitleAndEventDate(
            String title,
            LocalDate eventDate);
}