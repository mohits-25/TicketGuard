package com.ticketguard.ticketguard_backend.event.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;

import com.ticketguard.ticketguard_backend.event.dto.EventRequest;
import com.ticketguard.ticketguard_backend.event.dto.EventResponse;
import com.ticketguard.ticketguard_backend.event.enums.EventCategory;
import com.ticketguard.ticketguard_backend.event.enums.EventStatus;
import com.ticketguard.ticketguard_backend.event.service.EventService;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;

import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.List;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;

import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;


@ExtendWith(MockitoExtension.class)
class EventControllerTest {

    @Mock
    private EventService eventService;

    private MockMvc mockMvc;

    private ObjectMapper objectMapper;


    @BeforeEach
    void setUp() {

        objectMapper = new ObjectMapper();

        objectMapper.registerModule(
                new JavaTimeModule()
        );

        mockMvc = MockMvcBuilders
                .standaloneSetup(
                        new EventController(eventService)
                )
                .setCustomArgumentResolvers(
                        new PageableHandlerMethodArgumentResolver()
                )
                .build();
    }


    // =========================================================
    // GET EVENT BY ID
    // =========================================================

    @Test
    void getEventById_shouldReturnOk() throws Exception {

        EventResponse eventResponse = new EventResponse(
                1L,
                "Tech Conference",
                "Spring Boot Conference",
                EventCategory.CONCERT,
                1L,
                "NIE Auditorium",
                "Mysore",
                LocalDate.of(2026, 9, 10),
                LocalTime.of(10, 0),
                LocalTime.of(16, 0),
                new BigDecimal("500.00"),
                100,
                100,
                "image.jpg",
                EventStatus.UPCOMING,
                LocalDateTime.now(),
                LocalDateTime.now()
        );

        when(eventService.getEventById(1L))
                .thenReturn(eventResponse);

        mockMvc.perform(
                        get("/api/v1/events/1")
                )
                .andExpect(status().isOk());
    }


    // =========================================================
    // GET ALL EVENTS
    // =========================================================

    @Test
    void getAllEvents_shouldReturnOk() throws Exception {

        EventResponse eventResponse = new EventResponse(
                1L,
                "Tech Conference",
                "Spring Boot Conference",
                EventCategory.CONCERT,
                1L,
                "NIE Auditorium",
                "Mysore",
                LocalDate.of(2026, 9, 10),
                LocalTime.of(10, 0),
                LocalTime.of(16, 0),
                new BigDecimal("500.00"),
                100,
                100,
                "image.jpg",
                EventStatus.UPCOMING,
                LocalDateTime.now(),
                LocalDateTime.now()
        );

        when(eventService.getAllEvents(any()))
                .thenReturn(
                        new PageImpl<>(
                                List.of(eventResponse),
                                PageRequest.of(0, 10),
                                1
                        )
                );

        mockMvc.perform(
                        get("/api/v1/events")
                                .param("page", "0")
                                .param("size", "10")
                )
                .andExpect(status().isOk());
    }


    // =========================================================
    // CREATE EVENT
    // =========================================================

    @Test
    void createEvent_shouldReturnCreated() throws Exception {

        EventRequest eventRequest = new EventRequest(
                "Tech Conference",
                "Spring Boot Conference",
                EventCategory.CONCERT,
                1L,
                LocalDate.of(2026, 9, 10),
                LocalTime.of(10, 0),
                LocalTime.of(16, 0),
                new BigDecimal("500.00"),
                100,
                "image.jpg"
        );

        EventResponse eventResponse = new EventResponse(
                1L,
                "Tech Conference",
                "Spring Boot Conference",
                EventCategory.CONCERT,
                1L,
                "NIE Auditorium",
                "Mysore",
                LocalDate.of(2026, 9, 10),
                LocalTime.of(10, 0),
                LocalTime.of(16, 0),
                new BigDecimal("500.00"),
                100,
                100,
                "image.jpg",
                EventStatus.UPCOMING,
                LocalDateTime.now(),
                LocalDateTime.now()
        );

        when(eventService.createEvent(any(EventRequest.class)))
                .thenReturn(eventResponse);

        mockMvc.perform(
                        post("/api/v1/events")
                                .contentType(MediaType.APPLICATION_JSON)
                                .content(
                                        objectMapper.writeValueAsString(
                                                eventRequest
                                        )
                                )
                )
                .andExpect(status().isCreated());
    }
}