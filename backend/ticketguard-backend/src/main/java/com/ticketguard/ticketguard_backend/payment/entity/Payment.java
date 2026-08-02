package com.ticketguard.ticketguard_backend.payment.entity;

import com.ticketguard.ticketguard_backend.booking.entity.Booking;
import com.ticketguard.ticketguard_backend.payment.enums.PaymentMethod;
import com.ticketguard.ticketguard_backend.payment.enums.PaymentStatus;
import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "payments")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Payment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    //--------------------------------------------------
    // Booking
    //--------------------------------------------------

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "booking_id", nullable = false, unique = true)
    private Booking booking;

    //--------------------------------------------------
    // Transaction
    //--------------------------------------------------

    @Column(nullable = false, unique = true, length = 50)
    private String transactionId;

    //--------------------------------------------------
    // Amount
    //--------------------------------------------------

    @Column(nullable = false, precision = 10, scale = 2)
    private BigDecimal amount;

    //--------------------------------------------------
    // Payment Method
    //--------------------------------------------------

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private PaymentMethod paymentMethod;

    //--------------------------------------------------
    // Payment Status
    //--------------------------------------------------

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private PaymentStatus paymentStatus;

    //--------------------------------------------------
    // Payment Time
    //--------------------------------------------------

    @Column(nullable = false)
    private LocalDateTime paymentTime;

    //--------------------------------------------------
    // Audit
    //--------------------------------------------------

    @Column(nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @Column(nullable = false)
    private LocalDateTime updatedAt;

    //--------------------------------------------------
    // Lifecycle
    //--------------------------------------------------

    @PrePersist
    public void onCreate() {

        this.createdAt = LocalDateTime.now();
        this.updatedAt = LocalDateTime.now();
        this.paymentTime = LocalDateTime.now();

        if (this.paymentStatus == null) {
            this.paymentStatus = PaymentStatus.PENDING;
        }
    }

    @PreUpdate
    public void onUpdate() {

        this.updatedAt = LocalDateTime.now();
    }
}