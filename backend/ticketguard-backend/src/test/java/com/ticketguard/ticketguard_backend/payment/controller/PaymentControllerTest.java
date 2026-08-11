package com.ticketguard.ticketguard_backend.payment.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;

import com.ticketguard.ticketguard_backend.payment.dto.PaymentRequest;
import com.ticketguard.ticketguard_backend.payment.dto.PaymentResponse;
import com.ticketguard.ticketguard_backend.payment.enums.PaymentMethod;
import com.ticketguard.ticketguard_backend.payment.enums.PaymentStatus;
import com.ticketguard.ticketguard_backend.payment.service.PaymentService;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;

import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import org.springframework.core.MethodParameter;
import org.springframework.http.MediaType;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;

import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import org.springframework.web.bind.support.WebDataBinderFactory;
import org.springframework.web.context.request.NativeWebRequest;
import org.springframework.web.method.support.HandlerMethodArgumentResolver;
import org.springframework.web.method.support.ModelAndViewContainer;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;

import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;


@ExtendWith(MockitoExtension.class)
class PaymentControllerTest {

    @Mock
    private PaymentService paymentService;

    @Mock
    private UserDetails userDetails;

    private MockMvc mockMvc;

    private ObjectMapper objectMapper;


    @BeforeEach
    void setUp() {

        objectMapper = new ObjectMapper();

        objectMapper.registerModule(
                new JavaTimeModule()
        );

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
                        new PaymentController(paymentService)
                )
                .setCustomArgumentResolvers(
                        userDetailsResolver
                )
                .build();
    }


    // =========================================================
    // PROCESS PAYMENT
    // =========================================================

    @Test
    void processPayment_shouldReturnCreated() throws Exception {

        PaymentRequest paymentRequest =
                new PaymentRequest(
                        1L,
                        PaymentMethod.values()[0]
                );

        PaymentResponse paymentResponse =
                new PaymentResponse(
                        1L,
                        1L,
                        "TG-ABC12345",
                        "TXN-ABC123456",
                        new BigDecimal("1000.00"),
                        PaymentMethod.values()[0],
                        PaymentStatus.SUCCESS,
                        LocalDateTime.now()
                );

        when(paymentService.processPayment(
                any(PaymentRequest.class),
                any(UserDetails.class)
        ))
                .thenReturn(paymentResponse);

        mockMvc.perform(
                        post("/api/v1/payments")
                                .contentType(MediaType.APPLICATION_JSON)
                                .content(
                                        objectMapper.writeValueAsString(
                                                paymentRequest
                                        )
                                )
                )
                .andExpect(status().isCreated());
    }


    // =========================================================
    // GET PAYMENT BY ID
    // =========================================================

    @Test
    void getPayment_shouldReturnOk() throws Exception {

        PaymentResponse paymentResponse =
                new PaymentResponse(
                        1L,
                        1L,
                        "TG-ABC12345",
                        "TXN-ABC123456",
                        new BigDecimal("1000.00"),
                        PaymentMethod.values()[0],
                        PaymentStatus.SUCCESS,
                        LocalDateTime.now()
                );

        when(paymentService.getPaymentById(1L))
                .thenReturn(paymentResponse);

        mockMvc.perform(
                        get("/api/v1/payments/1")
                )
                .andExpect(status().isOk());
    }


    // =========================================================
    // MY PAYMENTS
    // =========================================================

    @Test
    void myPayments_shouldReturnOk() throws Exception {

        PaymentResponse paymentResponse =
                new PaymentResponse(
                        1L,
                        1L,
                        "TG-ABC12345",
                        "TXN-ABC123456",
                        new BigDecimal("1000.00"),
                        PaymentMethod.values()[0],
                        PaymentStatus.SUCCESS,
                        LocalDateTime.now()
                );

        when(paymentService.getMyPayments(
                any(UserDetails.class)
        ))
                .thenReturn(List.of(paymentResponse));

        mockMvc.perform(
                        get("/api/v1/payments/my-payments")
                )
                .andExpect(status().isOk());
    }
}