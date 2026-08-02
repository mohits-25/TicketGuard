package com.ticketguard.ticketguard_backend.booking.repository;

import com.ticketguard.ticketguard_backend.booking.entity.Booking;
import com.ticketguard.ticketguard_backend.booking.enums.BookingStatus;
import com.ticketguard.ticketguard_backend.event.entity.Event;
import com.ticketguard.ticketguard_backend.user.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface BookingRepository extends JpaRepository<Booking, Long> {

    List<Booking> findByUser(User user);

    List<Booking> findByEvent(Event event);

    List<Booking> findByStatus(BookingStatus status);

    Optional<Booking> findByBookingReference(String bookingReference);

    boolean existsByBookingReference(String bookingReference);

}