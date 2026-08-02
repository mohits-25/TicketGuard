package com.ticketguard.ticketguard_backend.common.exception;

public class VenueAlreadyExistsException extends RuntimeException {
    public VenueAlreadyExistsException(String message) {
        super(message);
    }
}
