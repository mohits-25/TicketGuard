package com.ticketguard.ticketguard_backend.event.entity;

import com.ticketguard.ticketguard_backend.event.enums.EventCategory;
import com.ticketguard.ticketguard_backend.event.enums.EventStatus;
import com.ticketguard.ticketguard_backend.venue.entity.Venue;
import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;

@Entity
@Table(name = "events")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Event {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    //----------------------------------------------------
    // Basic Information
    //----------------------------------------------------

    @Column(nullable = false, length = 100)
    private String title;

    @Column(nullable = false, length = 1000)
    private String description;

    //----------------------------------------------------
    // Category
    //----------------------------------------------------

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private EventCategory category;

    //----------------------------------------------------
    // Venue
    //----------------------------------------------------
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "venue_id")
    private Venue venue;

    //----------------------------------------------------
    // Date & Time
    //----------------------------------------------------

    @Column(nullable = false)
    private LocalDate eventDate;

    @Column(nullable = false)
    private LocalTime startTime;

    @Column(nullable = false)
    private LocalTime endTime;

    //----------------------------------------------------
    // Pricing
    //----------------------------------------------------

    @Column(nullable = false, precision = 10, scale = 2)
    private BigDecimal ticketPrice;

    //----------------------------------------------------
    // Seats
    //----------------------------------------------------

    @Column(nullable = false)
    private Integer totalSeats;

    @Column(nullable = false)
    private Integer availableSeats;

    //----------------------------------------------------
    // Banner Image
    //----------------------------------------------------

    @Column(length = 500)
    private String imageUrl;

    //----------------------------------------------------
    // Status
    //----------------------------------------------------

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private EventStatus status;

    //----------------------------------------------------
    // Audit Fields
    //----------------------------------------------------

    @Column(nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @Column(nullable = false)
    private LocalDateTime updatedAt;

    //----------------------------------------------------
    // Lifecycle Callbacks
    //----------------------------------------------------

    @PrePersist
    public void onCreate() {

        this.createdAt = LocalDateTime.now();
        this.updatedAt = LocalDateTime.now();

        if (this.availableSeats == null) {
            this.availableSeats = this.totalSeats;
        }

        if (this.status == null) {
            this.status = EventStatus.UPCOMING;
        }
    }

    @PreUpdate
    public void onUpdate() {

        this.updatedAt = LocalDateTime.now();
    }
}