package com.ticketguard.ticketguard_backend.ticket.entity;

import com.ticketguard.ticketguard_backend.booking.entity.Booking;
import com.ticketguard.ticketguard_backend.ticket.enums.TicketStatus;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(
        name = "tickets",
        indexes = {
                @Index(name = "idx_ticket_number", columnList = "ticketNumber")
        }
)
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Ticket {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    //----------------------------------------
    // Unique Ticket Number
    //----------------------------------------

    @Column(nullable = false, unique = true)
    private String ticketNumber;

    //----------------------------------------
    // Booking
    //----------------------------------------

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(
            name = "booking_id",
            nullable = false,
            unique = true
    )
    private Booking booking;

    //----------------------------------------
    // QR Code
    //----------------------------------------

    @Column(length = 500)
    private String qrCode;
    @Column(length = 500)
    private String pdfPath;

    //----------------------------------------
    // Status
    //----------------------------------------

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private TicketStatus status;

    //----------------------------------------
    // Issued Time
    //----------------------------------------

    @Column(nullable = false)
    private LocalDateTime issuedAt;

    //----------------------------------------
    // Default Values
    //----------------------------------------

    @PrePersist
    public void prePersist() {

        if (issuedAt == null) {
            issuedAt = LocalDateTime.now();
        }

        if (status == null) {
            status = TicketStatus.ACTIVE;
        }
    }

}