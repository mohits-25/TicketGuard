package com.ticketguard.ticketguard_backend.payment.dto;

import com.ticketguard.ticketguard_backend.payment.enums.PaymentMethod;
import com.ticketguard.ticketguard_backend.payment.enums.PaymentStatus;

import java.math.BigDecimal;
import java.time.LocalDateTime;

public record PaymentResponse(

        Long id,

        Long bookingId,

        String bookingReference,

        String transactionId,

        BigDecimal amount,

        PaymentMethod paymentMethod,

        PaymentStatus paymentStatus,

        LocalDateTime paymentTime

) {
}