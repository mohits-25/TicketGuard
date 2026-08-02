package com.ticketguard.ticketguard_backend.payment.repository;

import com.ticketguard.ticketguard_backend.booking.entity.Booking;
import com.ticketguard.ticketguard_backend.payment.entity.Payment;
import com.ticketguard.ticketguard_backend.payment.enums.PaymentStatus;
import com.ticketguard.ticketguard_backend.user.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface PaymentRepository extends JpaRepository<Payment, Long> {

    Optional<Payment> findByBooking(Booking booking);

    Optional<Payment> findByTransactionId(String transactionId);

    List<Payment> findByPaymentStatus(PaymentStatus paymentStatus);

    List<Payment> findByBookingUser(User user);

    boolean existsByTransactionId(String transactionId);
}