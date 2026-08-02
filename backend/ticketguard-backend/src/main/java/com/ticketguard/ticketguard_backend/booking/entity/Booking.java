package com.ticketguard.ticketguard_backend.booking.entity;

import com.ticketguard.ticketguard_backend.booking.enums.BookingStatus;
import com.ticketguard.ticketguard_backend.event.entity.Event;
import com.ticketguard.ticketguard_backend.user.entity.User;
import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "bookings")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Booking {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    //-----------------------------------------------------
    // Booking Reference
    //-----------------------------------------------------

    @Column(nullable = false, unique = true, length = 30)
    private String bookingReference;

    //-----------------------------------------------------
    // User
    //-----------------------------------------------------

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    //-----------------------------------------------------
    // Event
    //-----------------------------------------------------

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "event_id", nullable = false)
    private Event event;

    //-----------------------------------------------------
    // Tickets
    //-----------------------------------------------------

    @Column(nullable = false)
    private Integer numberOfTickets;

    //-----------------------------------------------------
    // Amount
    //-----------------------------------------------------

    @Column(nullable = false, precision = 10, scale = 2)
    private BigDecimal totalAmount;

    //-----------------------------------------------------
    // Status
    //-----------------------------------------------------

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private BookingStatus status;

    //-----------------------------------------------------
    // Booking Time
    //-----------------------------------------------------

    @Column(nullable = false)
    private LocalDateTime bookingTime;

    //-----------------------------------------------------
    // Audit Fields
    //-----------------------------------------------------

    @Column(nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @Column(nullable = false)
    private LocalDateTime updatedAt;

    //-----------------------------------------------------
    // Lifecycle
    //-----------------------------------------------------

    @PrePersist
    public void onCreate() {

        this.createdAt = LocalDateTime.now();
        this.updatedAt = LocalDateTime.now();

        this.bookingTime = LocalDateTime.now();

        if (this.status == null) {
            this.status = BookingStatus.CONFIRMED;
        }
    }

    @PreUpdate
    public void onUpdate() {

        this.updatedAt = LocalDateTime.now();
    }

}