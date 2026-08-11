package com.ticketguard.ticketguard_backend.ticket.controller;

import com.ticketguard.ticketguard_backend.ticket.dto.TicketResponse;
import com.ticketguard.ticketguard_backend.ticket.enums.TicketStatus;
import com.ticketguard.ticketguard_backend.ticket.service.TicketService;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;

import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import org.springframework.core.MethodParameter;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.core.io.Resource;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.bind.support.WebDataBinderFactory;
import org.springframework.web.context.request.NativeWebRequest;
import org.springframework.web.method.support.HandlerMethodArgumentResolver;
import org.springframework.web.method.support.ModelAndViewContainer;

import java.math.BigDecimal;
import java.nio.charset.StandardCharsets;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.List;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;

import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;


@ExtendWith(MockitoExtension.class)
class TicketControllerTest {

    @Mock
    private TicketService ticketService;

    @Mock
    private UserDetails userDetails;

    private MockMvc mockMvc;


    @BeforeEach
    void setUp() {

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
                        new TicketController(ticketService)
                )
                .setCustomArgumentResolvers(
                        userDetailsResolver
                )
                .build();
    }


    @Test
    void getTicketById_shouldReturnOk() throws Exception {

        TicketResponse ticketResponse =
                new TicketResponse(
                        1L,
                        "TKT-ABC12345",
                        1L,
                        "TG-ABC12345",
                        1L,
                        "Tech Conference",
                        LocalDate.of(2026, 9, 10),
                        LocalTime.of(10, 0),
                        "NIE Auditorium",
                        2,
                        new BigDecimal("1000.00"),
                        "qr-code",
                        "ticket.pdf",
                        TicketStatus.values()[0],
                        LocalDateTime.now()
                );

        when(ticketService.getTicketById(1L))
                .thenReturn(ticketResponse);

        mockMvc.perform(
                        get("/api/v1/tickets/1")
                )
                .andExpect(status().isOk());
    }


    @Test
    void getMyTickets_shouldReturnOk() throws Exception {

        TicketResponse ticketResponse =
                new TicketResponse(
                        1L,
                        "TKT-ABC12345",
                        1L,
                        "TG-ABC12345",
                        1L,
                        "Tech Conference",
                        LocalDate.of(2026, 9, 10),
                        LocalTime.of(10, 0),
                        "NIE Auditorium",
                        2,
                        new BigDecimal("1000.00"),
                        "qr-code",
                        "ticket.pdf",
                        TicketStatus.values()[0],
                        LocalDateTime.now()
                );

        when(ticketService.getMyTickets(
                any(UserDetails.class)
        ))
                .thenReturn(List.of(ticketResponse));

        mockMvc.perform(
                        get("/api/v1/tickets/my-tickets")
                )
                .andExpect(status().isOk());
    }


    @Test
    void downloadTicket_shouldReturnOk() throws Exception {

        Resource resource =
                new ByteArrayResource(
                        "PDF content".getBytes(
                                StandardCharsets.UTF_8
                        )
                ) {
                    @Override
                    public String getFilename() {
                        return "ticket.pdf";
                    }
                };

        when(ticketService.downloadTicket(1L))
                .thenReturn(resource);

        mockMvc.perform(
                        get("/api/v1/tickets/1/download")
                )
                .andExpect(status().isOk());
    }
}