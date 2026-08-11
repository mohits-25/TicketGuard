package com.ticketguard.ticketguard_backend.booking.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.ticketguard.ticketguard_backend.booking.dto.BookingRequest;
import com.ticketguard.ticketguard_backend.booking.dto.BookingResponse;
import com.ticketguard.ticketguard_backend.booking.enums.BookingStatus;
import com.ticketguard.ticketguard_backend.booking.service.BookingService;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;

import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import org.springframework.core.MethodParameter;
import org.springframework.http.MediaType;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.bind.support.WebDataBinderFactory;
import org.springframework.web.context.request.NativeWebRequest;
import org.springframework.web.method.support.HandlerMethodArgumentResolver;
import org.springframework.web.method.support.ModelAndViewContainer;

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
class BookingControllerTest {

    @Mock
    private BookingService bookingService;

    @Mock
    private UserDetails userDetails;

    private MockMvc mockMvc;

    private ObjectMapper objectMapper;


    @BeforeEach
    void setUp() {

        objectMapper = new ObjectMapper();

        HandlerMethodArgumentResolver userDetailsResolver =
                new HandlerMethodArgumentResolver() {

                    @Override
                    public boolean supportsParameter(
                            MethodParameter parameter) {

                        return parameter.hasParameterAnnotation(
                                AuthenticationPrincipal.class
                        );
                    }

                    @Override
                    public Object resolveArgument(
                            MethodParameter parameter,
                            ModelAndViewContainer mavContainer,
                            NativeWebRequest webRequest,
                            WebDataBinderFactory binderFactory) {

                        return userDetails;
                    }
                };

        mockMvc = MockMvcBuilders
                .standaloneSetup(
                        new BookingController(bookingService)
                )
                .setCustomArgumentResolvers(
                        userDetailsResolver
                )
                .build();
    }


    @Test
    void createBooking_shouldReturnCreated() throws Exception {

        BookingRequest bookingRequest =
                new BookingRequest(
                        1L,
                        2
                );

        BookingResponse bookingResponse =
                new BookingResponse(
                        1L,
                        "TG-ABC12345",
                        1L,
                        "Tech Conference",
                        LocalDate.of(2026, 9, 10),
                        LocalTime.of(10, 0),
                        "NIE Auditorium",
                        2,
                        new BigDecimal("500.00"),
                        new BigDecimal("1000.00"),
                        BookingStatus.CONFIRMED,
                        LocalDateTime.now()
                );

        when(bookingService.createBooking(
                any(BookingRequest.class),
                any(UserDetails.class)
        ))
                .thenReturn(bookingResponse);

        mockMvc.perform(
                        post("/api/v1/bookings")
                                .contentType(MediaType.APPLICATION_JSON)
                                .content(
                                        objectMapper.writeValueAsString(
                                                bookingRequest
                                        )
                                )
                )
                .andExpect(status().isCreated());
    }


    @Test
    void getBooking_shouldReturnOk() throws Exception {

        BookingResponse bookingResponse =
                new BookingResponse(
                        1L,
                        "TG-ABC12345",
                        1L,
                        "Tech Conference",
                        LocalDate.of(2026, 9, 10),
                        LocalTime.of(10, 0),
                        "NIE Auditorium",
                        2,
                        new BigDecimal("500.00"),
                        new BigDecimal("1000.00"),
                        BookingStatus.CONFIRMED,
                        LocalDateTime.now()
                );

        when(bookingService.getBookingById(1L))
                .thenReturn(bookingResponse);

        mockMvc.perform(
                        get("/api/v1/bookings/1")
                )
                .andExpect(status().isOk());
    }


    @Test
    void myBookings_shouldReturnOk() throws Exception {

        BookingResponse bookingResponse =
                new BookingResponse(
                        1L,
                        "TG-ABC12345",
                        1L,
                        "Tech Conference",
                        LocalDate.of(2026, 9, 10),
                        LocalTime.of(10, 0),
                        "NIE Auditorium",
                        2,
                        new BigDecimal("500.00"),
                        new BigDecimal("1000.00"),
                        BookingStatus.CONFIRMED,
                        LocalDateTime.now()
                );

        when(bookingService.getMyBookings(
                any(UserDetails.class)
        ))
                .thenReturn(List.of(bookingResponse));

        mockMvc.perform(
                        get("/api/v1/bookings/my-bookings")
                )
                .andExpect(status().isOk());
    }
}