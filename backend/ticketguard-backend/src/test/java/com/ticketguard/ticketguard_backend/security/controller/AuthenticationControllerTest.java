package com.ticketguard.ticketguard_backend.security.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.ticketguard.ticketguard_backend.security.dto.LoginRequest;
import com.ticketguard.ticketguard_backend.security.dto.LoginResponse;
import com.ticketguard.ticketguard_backend.security.dto.RegisterRequest;
import com.ticketguard.ticketguard_backend.security.service.AuthenticationService;
import com.ticketguard.ticketguard_backend.user.Role;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;

import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@ExtendWith(MockitoExtension.class)
class AuthenticationControllerTest {

    private final ObjectMapper objectMapper = new ObjectMapper();

    private MockMvc mockMvc;

    @Mock
    private AuthenticationService authenticationService;

    @Test
    void register_shouldReturnCreated() throws Exception {

        mockMvc = MockMvcBuilders
                .standaloneSetup(
                        new AuthenticationController(authenticationService)
                )
                .build();

        RegisterRequest request = new RegisterRequest(
                "Mohit",
                "Sharma",
                "mohit@example.com",
                "Password123",
                Role.CUSTOMER
        );

        LoginResponse response = new LoginResponse(
                "jwt-token",
                "Mohit",
                "Sharma",
                "mohit@example.com",
                Role.CUSTOMER
        );

        when(authenticationService.register(any(RegisterRequest.class)))
                .thenReturn(response);

        mockMvc.perform(
                        post("/api/auth/register")
                                .contentType(MediaType.APPLICATION_JSON)
                                .content(objectMapper.writeValueAsString(request))
                )
                .andExpect(status().isCreated());
    }

    @Test
    void login_shouldReturnOk() throws Exception {

        mockMvc = MockMvcBuilders
                .standaloneSetup(
                        new AuthenticationController(authenticationService)
                )
                .build();

        LoginRequest request = new LoginRequest(
                "mohit@example.com",
                "Password123"
        );

        LoginResponse response = new LoginResponse(
                "jwt-token",
                "Mohit",
                "Sharma",
                "mohit@example.com",
                Role.CUSTOMER
        );

        when(authenticationService.login(any(LoginRequest.class)))
                .thenReturn(response);

        mockMvc.perform(
                        post("/api/auth/login")
                                .contentType(MediaType.APPLICATION_JSON)
                                .content(objectMapper.writeValueAsString(request))
                )
                .andExpect(status().isOk());
    }
}