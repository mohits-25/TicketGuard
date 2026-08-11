package com.ticketguard.ticketguard_backend.venue.service;

import com.ticketguard.ticketguard_backend.common.exception.VenueAlreadyExistsException;
import com.ticketguard.ticketguard_backend.venue.dto.VenueRequest;
import com.ticketguard.ticketguard_backend.venue.dto.VenueResponse;
import com.ticketguard.ticketguard_backend.venue.entity.Venue;
import com.ticketguard.ticketguard_backend.venue.repository.VenueRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class VenueServiceTest {

    @Mock
    private VenueRepository venueRepository;

    @InjectMocks
    private VenueService venueService;

    @Test
    void createVenue_shouldWorkSuccessfully() {

        VenueRequest request = new VenueRequest(
                "NIE Auditorium",
                "Manandavadi Road",
                "Mysore",
                "Karnataka",
                "India",
                "570008",
                500
        );

        Venue savedVenue = Venue.builder()
                .id(1L)
                .name("NIE Auditorium")
                .address("Manandavadi Road")
                .city("Mysore")
                .state("Karnataka")
                .country("India")
                .zipCode("570008")
                .capacity(500)
                .build();

        when(venueRepository.existsByName(request.name()))
                .thenReturn(false);

        when(venueRepository.save(any(Venue.class)))
                .thenReturn(savedVenue);

        VenueResponse response =
                venueService.createVenue(request);

        assertThat(response).isNotNull();
        assertThat(response.name())
                .isEqualTo("NIE Auditorium");
        assertThat(response.city())
                .isEqualTo("Mysore");
    }

    @Test
    void createVenue_shouldRejectDuplicateVenue() {

        VenueRequest request = new VenueRequest(
                "NIE Auditorium",
                "Manandavadi Road",
                "Mysore",
                "Karnataka",
                "India",
                "570008",
                500
        );

        when(venueRepository.existsByName(request.name()))
                .thenReturn(true);

        assertThatThrownBy(() ->
                venueService.createVenue(request)
        )
                .isInstanceOf(VenueAlreadyExistsException.class);
    }

    @Test
    void getVenueById_shouldReturnVenue() {

        Venue venue = Venue.builder()
                .id(1L)
                .name("NIE Auditorium")
                .address("Manandavadi Road")
                .city("Mysore")
                .state("Karnataka")
                .country("India")
                .zipCode("570008")
                .capacity(500)
                .build();

        when(venueRepository.findById(1L))
                .thenReturn(Optional.of(venue));

        VenueResponse response =
                venueService.getVenueById(1L);

        assertThat(response).isNotNull();
        assertThat(response.name())
                .isEqualTo("NIE Auditorium");
        assertThat(response.city())
                .isEqualTo("Mysore");
    }
}