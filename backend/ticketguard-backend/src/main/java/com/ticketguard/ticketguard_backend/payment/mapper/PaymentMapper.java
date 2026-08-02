package com.ticketguard.ticketguard_backend.payment.mapper;

import com.ticketguard.ticketguard_backend.payment.dto.PaymentResponse;
import com.ticketguard.ticketguard_backend.payment.entity.Payment;

public class PaymentMapper {

    private PaymentMapper() {
    }

    /**
     * Entity -> Response
     */
    public static PaymentResponse toResponse(Payment payment) {

        return new PaymentResponse(

                payment.getId(),

                payment.getBooking().getId(),

                payment.getBooking().getBookingReference(),

                payment.getTransactionId(),

                payment.getAmount(),

                payment.getPaymentMethod(),

                payment.getPaymentStatus(),

                payment.getPaymentTime()

        );
    }

}