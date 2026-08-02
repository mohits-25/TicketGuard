package com.ticketguard.ticketguard_backend.ticket.repository;

import com.ticketguard.ticketguard_backend.booking.entity.Booking;
import com.ticketguard.ticketguard_backend.ticket.entity.Ticket;
import com.ticketguard.ticketguard_backend.ticket.enums.TicketStatus;
import com.ticketguard.ticketguard_backend.user.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface TicketRepository
        extends JpaRepository<Ticket, Long> {

    /**
     * Find ticket by booking
     */
    Optional<Ticket> findByBooking(Booking booking);

    /**
     * Find ticket by ticket number
     */
    Optional<Ticket> findByTicketNumber(String ticketNumber);

    /**
     * Get all tickets of a user
     */
    List<Ticket> findByBookingUser(User user);

    /**
     * Get tickets by status
     */
    List<Ticket> findByStatus(TicketStatus status);

    /**
     * Check duplicate ticket number
     */
    boolean existsByTicketNumber(String ticketNumber);

}