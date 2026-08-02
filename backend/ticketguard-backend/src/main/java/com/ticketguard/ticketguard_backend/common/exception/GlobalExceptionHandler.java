package com.ticketguard.ticketguard_backend.common.exception;

import jakarta.servlet.http.HttpServletRequest;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;

@RestControllerAdvice
public class GlobalExceptionHandler {

    private static final Logger log =
            LoggerFactory.getLogger(GlobalExceptionHandler.class);

    @ExceptionHandler(UserNotFoundException.class)
    @ResponseStatus(HttpStatus.NOT_FOUND)
    public ErrorResponse handleUserNotFound(
            UserNotFoundException ex,
            HttpServletRequest request) {

        log.warn("User not found. URI: {}, Message: {}",
                request.getRequestURI(),
                ex.getMessage());

        return buildErrorResponse(HttpStatus.NOT_FOUND, ex, request);
    }

    @ExceptionHandler(EmailAlreadyExistsException.class)
    @ResponseStatus(HttpStatus.CONFLICT)
    public ErrorResponse handleEmailAlreadyExists(
            EmailAlreadyExistsException ex,
            HttpServletRequest request) {

        log.warn("Duplicate email. URI: {}, Message: {}",
                request.getRequestURI(),
                ex.getMessage());

        return buildErrorResponse(HttpStatus.CONFLICT, ex, request);
    }

    @ExceptionHandler(EventNotFoundException.class)
    @ResponseStatus(HttpStatus.NOT_FOUND)
    public ErrorResponse handleEventNotFound(
            EventNotFoundException ex,
            HttpServletRequest request) {

        log.warn("Event not found. URI: {}, Message: {}",
                request.getRequestURI(),
                ex.getMessage());

        return buildErrorResponse(HttpStatus.NOT_FOUND, ex, request);
    }

    @ExceptionHandler(EventAlreadyExistsException.class)
    @ResponseStatus(HttpStatus.CONFLICT)
    public ErrorResponse handleEventAlreadyExists(
            EventAlreadyExistsException ex,
            HttpServletRequest request) {

        log.warn("Duplicate event. URI: {}, Message: {}",
                request.getRequestURI(),
                ex.getMessage());

        return buildErrorResponse(HttpStatus.CONFLICT, ex, request);
    }

    @ExceptionHandler(VenueNotFoundException.class)
    @ResponseStatus(HttpStatus.NOT_FOUND)
    public ErrorResponse handleVenueNotFound(
            VenueNotFoundException ex,
            HttpServletRequest request) {

        log.warn("Venue not found. URI: {}, Message: {}",
                request.getRequestURI(),
                ex.getMessage());

        return buildErrorResponse(HttpStatus.NOT_FOUND, ex, request);
    }

    @ExceptionHandler(VenueAlreadyExistsException.class)
    @ResponseStatus(HttpStatus.CONFLICT)
    public ErrorResponse handleVenueAlreadyExists(
            VenueAlreadyExistsException ex,
            HttpServletRequest request) {

        log.warn("Duplicate venue. URI: {}, Message: {}",
                request.getRequestURI(),
                ex.getMessage());

        return buildErrorResponse(HttpStatus.CONFLICT, ex, request);
    }

    @ExceptionHandler(BookingNotFoundException.class)
    @ResponseStatus(HttpStatus.NOT_FOUND)
    public ErrorResponse handleBookingNotFound(
            BookingNotFoundException ex,
            HttpServletRequest request) {

        log.warn("Booking not found. URI: {}, Message: {}",
                request.getRequestURI(),
                ex.getMessage());

        return buildErrorResponse(HttpStatus.NOT_FOUND, ex, request);
    }

    @ExceptionHandler(InsufficientSeatsException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public ErrorResponse handleSeats(
            InsufficientSeatsException ex,
            HttpServletRequest request) {

        log.warn("Insufficient seats. URI: {}, Message: {}",
                request.getRequestURI(),
                ex.getMessage());

        return buildErrorResponse(HttpStatus.BAD_REQUEST, ex, request);
    }

    @ExceptionHandler(EventBookingClosedException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public ErrorResponse handleBookingClosed(
            EventBookingClosedException ex,
            HttpServletRequest request) {

        log.warn("Booking closed. URI: {}, Message: {}",
                request.getRequestURI(),
                ex.getMessage());

        return buildErrorResponse(HttpStatus.BAD_REQUEST, ex, request);
    }

    @ExceptionHandler(PaymentNotFoundException.class)
    @ResponseStatus(HttpStatus.NOT_FOUND)
    public ErrorResponse handlePaymentNotFound(
            PaymentNotFoundException ex,
            HttpServletRequest request) {

        log.warn("Payment not found. URI: {}, Message: {}",
                request.getRequestURI(),
                ex.getMessage());

        return buildErrorResponse(HttpStatus.NOT_FOUND, ex, request);
    }

    @ExceptionHandler(PaymentAlreadyExistsException.class)
    @ResponseStatus(HttpStatus.CONFLICT)
    public ErrorResponse handlePaymentAlreadyExists(
            PaymentAlreadyExistsException ex,
            HttpServletRequest request) {

        log.warn("Duplicate payment. URI: {}, Message: {}",
                request.getRequestURI(),
                ex.getMessage());

        return buildErrorResponse(HttpStatus.CONFLICT, ex, request);
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public Map<String, String> handleValidation(
            MethodArgumentNotValidException ex) {

        log.warn("Validation failed.");

        Map<String, String> errors = new HashMap<>();

        ex.getBindingResult()
                .getFieldErrors()
                .forEach(error ->
                        errors.put(
                                error.getField(),
                                error.getDefaultMessage()));

        return errors;
    }

    @ExceptionHandler(Exception.class)
    @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
    public ErrorResponse handleGenericException(
            Exception ex,
            HttpServletRequest request) {

        log.error(
                "Unhandled exception at URI: {}",
                request.getRequestURI(),
                ex);

        return buildErrorResponse(
                HttpStatus.INTERNAL_SERVER_ERROR,
                ex,
                request);
    }

    /**
     * Helper method to build ErrorResponse
     */
    private ErrorResponse buildErrorResponse(
            HttpStatus status,
            Exception ex,
            HttpServletRequest request) {

        return new ErrorResponse(
                LocalDateTime.now(),
                status.value(),
                status.getReasonPhrase(),
                ex.getMessage(),
                request.getRequestURI()
        );
    }
}