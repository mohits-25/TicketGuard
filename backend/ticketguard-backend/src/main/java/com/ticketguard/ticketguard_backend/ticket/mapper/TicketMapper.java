package com.ticketguard.ticketguard_backend.ticket.mapper;

import com.ticketguard.ticketguard_backend.booking.entity.Booking;
import com.ticketguard.ticketguard_backend.event.entity.Event;
import com.ticketguard.ticketguard_backend.ticket.dto.TicketResponse;
import com.ticketguard.ticketguard_backend.ticket.entity.Ticket;

public class TicketMapper {

    private TicketMapper() {
    }

    public static TicketResponse toResponse(Ticket ticket) {

        Booking booking = ticket.getBooking();

        Event event = booking.getEvent();

        return new TicketResponse(

                ticket.getId(),

                ticket.getTicketNumber(),

                booking.getId(),

                booking.getBookingReference(),

                event.getId(),

                event.getTitle(),

                event.getEventDate(),

                event.getStartTime(),

                event.getVenue().getName(),

                booking.getNumberOfTickets(),

                booking.getTotalAmount(),

                ticket.getQrCode(),

                ticket.getPdfPath(),

                ticket.getStatus(),

                ticket.getIssuedAt()

        );
    }

}