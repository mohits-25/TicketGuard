package com.ticketguard.ticketguard_backend.venue.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.ticketguard.ticketguard_backend.venue.dto.VenueRequest;
import com.ticketguard.ticketguard_backend.venue.dto.VenueResponse;
import com.ticketguard.ticketguard_backend.venue.service.VenueService;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;

import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import java.time.LocalDateTime;
import java.util.List;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;

import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@ExtendWith(MockitoExtension.class)
class VenueControllerTest {

    @Mock
    private VenueService venueService;

    private MockMvc mockMvc;

    private ObjectMapper objectMapper;

    @BeforeEach
    void setUp() {

        objectMapper = new ObjectMapper();

        mockMvc = MockMvcBuilders
                .standaloneSetup(
                        new VenueController(venueService)
                )
                .build();
    }

    @Test
    void getAllVenues_shouldReturnOk() throws Exception {

        VenueResponse venueResponse = new VenueResponse(
                1L,
                "NIE Auditorium",
                "Manasagangothri",
                "Mysore",
                "Karnataka",
                "India",
                "570008",
                500,
                LocalDateTime.now(),
                LocalDateTime.now()
        );

        when(venueService.getAllVenues())
                .thenReturn(List.of(venueResponse));

        mockMvc.perform(
                        get("/api/v1/venues")
                )
                .andExpect(status().isOk());
    }

    @Test
    void getVenueById_shouldReturnOk() throws Exception {

        VenueResponse venueResponse = new VenueResponse(
                1L,
                "NIE Auditorium",
                "Manasagangothri",
                "Mysore",
                "Karnataka",
                "India",
                "570008",
                500,
                LocalDateTime.now(),
                LocalDateTime.now()
        );

        when(venueService.getVenueById(1L))
                .thenReturn(venueResponse);

        mockMvc.perform(
                        get("/api/v1/venues/1")
                )
                .andExpect(status().isOk());
    }

    @Test
    void createVenue_shouldReturnCreated() throws Exception {

        VenueRequest venueRequest = new VenueRequest(
                "NIE Auditorium",
                "Manasagangothri",
                "Mysore",
                "Karnataka",
                "India",
                "570008",
                500
        );

        VenueResponse venueResponse = new VenueResponse(
                1L,
                "NIE Auditorium",
                "Manasagangothri",
                "Mysore",
                "Karnataka",
                "India",
                "570008",
                500,
                LocalDateTime.now(),
                LocalDateTime.now()
        );

        when(venueService.createVenue(any(VenueRequest.class)))
                .thenReturn(venueResponse);

        mockMvc.perform(
                        post("/api/v1/venues")
                                .contentType(MediaType.APPLICATION_JSON)
                                .content(
                                        objectMapper.writeValueAsString(
                                                venueRequest
                                        )
                                )
                )
                .andExpect(status().isCreated());
    }
}