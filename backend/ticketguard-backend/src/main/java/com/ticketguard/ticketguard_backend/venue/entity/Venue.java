package com.ticketguard.ticketguard_backend.venue.entity;
import com.ticketguard.ticketguard_backend.event.entity.Event;

import com.ticketguard.ticketguard_backend.event.entity.Event;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "venues")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Venue {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    //------------------------------------------------
    // Basic Information
    //------------------------------------------------

    @Column(nullable = false, length = 100)
    private String name;

    @Column(nullable = false, length = 250)
    private String address;

    @Column(nullable = false, length = 100)
    private String city;

    @Column(nullable = false, length = 100)
    private String state;

    @Column(nullable = false, length = 100)
    private String country;

    @Column(nullable = false, length = 10)
    private String zipCode;

    //------------------------------------------------
    // Capacity
    //------------------------------------------------

    @Column(nullable = false)
    private Integer capacity;

    //------------------------------------------------
    // Audit
    //------------------------------------------------

    @Column(nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @Column(nullable = false)
    private LocalDateTime updatedAt;

    //------------------------------------------------
    // Lifecycle
    //------------------------------------------------

    @PrePersist
    public void onCreate() {

        this.createdAt = LocalDateTime.now();
        this.updatedAt = LocalDateTime.now();
    }

    @PreUpdate
    public void onUpdate() {

        this.updatedAt = LocalDateTime.now();
    }


    @OneToMany(
            mappedBy = "venue",
            cascade = CascadeType.ALL,
            orphanRemoval = false,
            fetch = FetchType.LAZY
    )
    private List<Event> events = new ArrayList<>();

}