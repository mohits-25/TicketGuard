package com.ticketguard.ticketguard_backend.venue.service;

import com.ticketguard.ticketguard_backend.common.exception.VenueAlreadyExistsException;
import com.ticketguard.ticketguard_backend.common.exception.VenueNotFoundException;
import com.ticketguard.ticketguard_backend.venue.dto.VenueRequest;
import com.ticketguard.ticketguard_backend.venue.dto.VenueResponse;
import com.ticketguard.ticketguard_backend.venue.entity.Venue;
import com.ticketguard.ticketguard_backend.venue.mapper.VenueMapper;
import com.ticketguard.ticketguard_backend.venue.repository.VenueRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.cache.annotation.CachePut;
import org.springframework.cache.annotation.CacheEvict;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class VenueService {

    private static final Logger log =
            LoggerFactory.getLogger(VenueService.class);

    private final VenueRepository venueRepository;

    public VenueService(VenueRepository venueRepository) {
        this.venueRepository = venueRepository;
    }

    /**
     * Create Venue
     */
    public VenueResponse createVenue(VenueRequest request) {

        log.info("Creating venue: {}", request.name());

        if (venueRepository.existsByName(request.name())) {

            log.warn("Venue already exists: {}", request.name());

            throw new VenueAlreadyExistsException(
                    "Venue already exists with name: " + request.name());
        }

        Venue venue = VenueMapper.toEntity(request);

        Venue savedVenue = venueRepository.save(venue);

        log.info("Venue created successfully. ID: {}, Name: {}",
                savedVenue.getId(),
                savedVenue.getName());

        return VenueMapper.toResponse(savedVenue);
    }

    /**
     * Get All Venues
     */
    public List<VenueResponse> getAllVenues() {

        log.info("Fetching all venues.");

        List<VenueResponse> venues = venueRepository.findAll()
                .stream()
                .map(VenueMapper::toResponse)
                .toList();

        log.info("Retrieved {} venues.", venues.size());

        return venues;
    }

    /**
     * Get Venue By ID
     */
    @Cacheable(value = "venues", key = "#id")
    public VenueResponse getVenueById(Long id) {

        log.info("Fetching venue with ID: {}", id);

        Venue venue = venueRepository.findById(id)
                .orElseThrow(() -> {

                    log.warn("Venue not found with ID: {}", id);

                    return new VenueNotFoundException(
                            "Venue not found with id: " + id);
                });

        log.info("Venue found. Name: {}", venue.getName());

        return VenueMapper.toResponse(venue);
    }

    /**
     * Update Venue
     */
    @CachePut(value = "venues", key = "#id")
    public VenueResponse updateVenue(
            Long id,
            VenueRequest request) {

        log.info("Updating venue with ID: {}", id);

        Venue venue = venueRepository.findById(id)
                .orElseThrow(() -> {

                    log.warn("Venue not found for update. ID: {}", id);

                    return new VenueNotFoundException(
                            "Venue not found with id: " + id);
                });

        if (!venue.getName().equals(request.name())
                && venueRepository.existsByName(request.name())) {

            log.warn("Venue update failed. Duplicate venue name: {}",
                    request.name());

            throw new VenueAlreadyExistsException(
                    "Venue already exists with name: " + request.name());
        }

        venue.setName(request.name());
        venue.setAddress(request.address());
        venue.setCity(request.city());
        venue.setState(request.state());
        venue.setCountry(request.country());
        venue.setZipCode(request.zipCode());
        venue.setCapacity(request.capacity());

        Venue updatedVenue = venueRepository.save(venue);

        log.info("Venue updated successfully. ID: {}, Name: {}",
                updatedVenue.getId(),
                updatedVenue.getName());

        return VenueMapper.toResponse(updatedVenue);
    }

    /**
     * Delete Venue
     */
    @CacheEvict(value = "venues", key = "#id")
    public void deleteVenue(Long id) {

        log.info("Deleting venue with ID: {}", id);

        Venue venue = venueRepository.findById(id)
                .orElseThrow(() -> {

                    log.warn("Venue not found for deletion. ID: {}", id);

                    return new VenueNotFoundException(
                            "Venue not found with id: " + id);
                });

        venueRepository.delete(venue);

        log.info("Venue deleted successfully. ID: {}, Name: {}",
                venue.getId(),
                venue.getName());
    }

    /**
     * Search By City
     */
    public List<VenueResponse> getVenuesByCity(String city) {

        log.info("Searching venues in city: {}", city);

        List<VenueResponse> venues = venueRepository.findByCity(city)
                .stream()
                .map(VenueMapper::toResponse)
                .toList();

        log.info("Found {} venues in city {}",
                venues.size(),
                city);

        return venues;
    }

    /**
     * Search By State
     */
    public List<VenueResponse> getVenuesByState(String state) {

        log.info("Searching venues in state: {}", state);

        List<VenueResponse> venues = venueRepository.findByState(state)
                .stream()
                .map(VenueMapper::toResponse)
                .toList();

        log.info("Found {} venues in state {}",
                venues.size(),
                state);

        return venues;
    }

    /**
     * Search By Country
     */
    public List<VenueResponse> getVenuesByCountry(String country) {

        log.info("Searching venues in country: {}", country);

        List<VenueResponse> venues = venueRepository.findByCountry(country)
                .stream()
                .map(VenueMapper::toResponse)
                .toList();

        log.info("Found {} venues in country {}",
                venues.size(),
                country);

        return venues;
    }

    /**
     * Search By Capacity
     */
    public List<VenueResponse> getVenuesByMinimumCapacity(Integer capacity) {

        log.info("Searching venues with minimum capacity: {}", capacity);

        List<VenueResponse> venues = venueRepository
                .findByCapacityGreaterThanEqual(capacity)
                .stream()
                .map(VenueMapper::toResponse)
                .toList();

        log.info("Found {} venues with capacity >= {}",
                venues.size(),
                capacity);

        return venues;
    }

}