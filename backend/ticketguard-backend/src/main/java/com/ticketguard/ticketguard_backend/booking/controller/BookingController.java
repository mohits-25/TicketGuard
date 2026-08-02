package com.ticketguard.ticketguard_backend.booking.controller;

import com.ticketguard.ticketguard_backend.booking.dto.BookingRequest;
import com.ticketguard.ticketguard_backend.booking.dto.BookingResponse;
import com.ticketguard.ticketguard_backend.booking.service.BookingService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@Tag(
        name = "Booking",
        description = "Booking Management APIs"
)
@RestController
@RequestMapping("/api/v1/bookings")
public class BookingController {

    private final BookingService bookingService;

    public BookingController(
            BookingService bookingService) {

        this.bookingService = bookingService;
    }

    //-----------------------------------------
    // CUSTOMER
    //-----------------------------------------
    @Operation(
            summary = "Create Booking",
            description = "Books tickets for an event."
    )
    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public BookingResponse createBooking(

            @Valid
            @RequestBody BookingRequest request,

            @AuthenticationPrincipal
            UserDetails userDetails) {

        return bookingService.createBooking(
                request,
                userDetails);
    }

    @GetMapping("/my-bookings")
    public List<BookingResponse> myBookings(

            @AuthenticationPrincipal
            UserDetails userDetails) {

        return bookingService.getMyBookings(
                userDetails);
    }

    @GetMapping("/{id}")
    public BookingResponse getBooking(

            @PathVariable Long id) {

        return bookingService.getBookingById(id);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void cancelBooking(

            @PathVariable Long id) {

        bookingService.cancelBooking(id);
    }

    //-----------------------------------------
    // ADMIN
    //-----------------------------------------

    @GetMapping
    @PreAuthorize("hasRole('ADMIN')")
    public List<BookingResponse> getAllBookings() {

        return bookingService.getAllBookings();
    }

}