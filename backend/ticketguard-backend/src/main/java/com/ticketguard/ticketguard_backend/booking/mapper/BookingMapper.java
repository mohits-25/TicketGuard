package com.ticketguard.ticketguard_backend.booking.mapper;

import com.ticketguard.ticketguard_backend.booking.dto.BookingResponse;
import com.ticketguard.ticketguard_backend.booking.entity.Booking;

public class BookingMapper {

    private BookingMapper() {
    }

    /**
     * Entity -> Response
     */
    public static BookingResponse toResponse(Booking booking) {

        return new BookingResponse(

                booking.getId(),

                booking.getBookingReference(),

                booking.getEvent().getId(),

                booking.getEvent().getTitle(),

                booking.getEvent().getEventDate(),

                booking.getEvent().getStartTime(),

                booking.getEvent().getVenue().getName(),

                booking.getNumberOfTickets(),

                booking.getEvent().getTicketPrice(),

                booking.getTotalAmount(),

                booking.getStatus(),

                booking.getBookingTime()

        );
    }

}