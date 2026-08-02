package com.ticketguard.ticketguard_backend.venue.repository;

import com.ticketguard.ticketguard_backend.venue.entity.Venue;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface VenueRepository extends JpaRepository<Venue, Long> {

    Optional<Venue> findByName(String name);

    boolean existsByName(String name);

    List<Venue> findByCity(String city);

    List<Venue> findByState(String state);

    List<Venue> findByCountry(String country);

    List<Venue> findByCapacityGreaterThanEqual(Integer capacity);

}