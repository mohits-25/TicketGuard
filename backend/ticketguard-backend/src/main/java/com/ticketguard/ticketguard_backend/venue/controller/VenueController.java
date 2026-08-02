package com.ticketguard.ticketguard_backend.venue.controller;

import com.ticketguard.ticketguard_backend.venue.dto.VenueRequest;
import com.ticketguard.ticketguard_backend.venue.dto.VenueResponse;
import com.ticketguard.ticketguard_backend.venue.service.VenueService;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@Tag(
        name = "Venues",
        description = "Venue Management APIs"
)
@RestController
@RequestMapping("/api/v1/venues")
public class VenueController {

    private final VenueService venueService;

    public VenueController(VenueService venueService) {
        this.venueService = venueService;
    }

    //----------------------------------------------------
    // ADMIN APIs
    //----------------------------------------------------

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    @PreAuthorize("hasRole('ADMIN')")
    public VenueResponse createVenue(
            @Valid @RequestBody VenueRequest request) {

        return venueService.createVenue(request);
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public VenueResponse updateVenue(
            @PathVariable Long id,
            @Valid @RequestBody VenueRequest request) {

        return venueService.updateVenue(id, request);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    @PreAuthorize("hasRole('ADMIN')")
    public void deleteVenue(
            @PathVariable Long id) {

        venueService.deleteVenue(id);
    }

    //----------------------------------------------------
    // PUBLIC APIs
    //----------------------------------------------------

    @GetMapping
    public List<VenueResponse> getAllVenues() {

        return venueService.getAllVenues();
    }

    @GetMapping("/{id}")
    public VenueResponse getVenueById(
            @PathVariable Long id) {

        return venueService.getVenueById(id);
    }

    @GetMapping("/city/{city}")
    public List<VenueResponse> getByCity(
            @PathVariable String city) {

        return venueService.getVenuesByCity(city);
    }

    @GetMapping("/state/{state}")
    public List<VenueResponse> getByState(
            @PathVariable String state) {

        return venueService.getVenuesByState(state);
    }

    @GetMapping("/country/{country}")
    public List<VenueResponse> getByCountry(
            @PathVariable String country) {

        return venueService.getVenuesByCountry(country);
    }

    @GetMapping("/capacity/{capacity}")
    public List<VenueResponse> getByCapacity(
            @PathVariable Integer capacity) {

        return venueService.getVenuesByMinimumCapacity(capacity);
    }
}