package com.ticketguard.ticketguard_backend.common.exception;

public class EventBookingClosedException extends RuntimeException {
    public EventBookingClosedException(String message) {
        super(message);
    }
}
