package com.ticketguard.ticketguard_backend.user.controller;

import com.fasterxml.jackson.databind.ObjectMapper;

import com.ticketguard.ticketguard_backend.user.Role;
import com.ticketguard.ticketguard_backend.user.dto.UserRequest;
import com.ticketguard.ticketguard_backend.user.dto.UserResponse;
import com.ticketguard.ticketguard_backend.user.service.UserService;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;

import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.doNothing;
import static org.mockito.Mockito.when;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;

import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;


@ExtendWith(MockitoExtension.class)
class UserControllerTest {

    @Mock
    private UserService userService;

    private MockMvc mockMvc;

    private ObjectMapper objectMapper;


    @BeforeEach
    void setUp() {

        objectMapper = new ObjectMapper();

        mockMvc = MockMvcBuilders
                .standaloneSetup(
                        new UserController(userService)
                )
                .build();
    }


    // =========================================================
    // CREATE USER
    // =========================================================

    @Test
    void createUser_shouldReturnCreated() throws Exception {

        UserRequest userRequest =
                new UserRequest(
                        "Mohit",
                        "Sharma",
                        "mohit@example.com",
                        "Password123",
                        Role.CUSTOMER
                );

        UserResponse userResponse =
                new UserResponse(
                        1L,
                        "Mohit",
                        "Sharma",
                        "mohit@example.com",
                        Role.CUSTOMER
                );

        when(userService.createUser(
                any(UserRequest.class)
        ))
                .thenReturn(userResponse);

        mockMvc.perform(
                        post("/api/v1/users")
                                .contentType(MediaType.APPLICATION_JSON)
                                .content(
                                        objectMapper.writeValueAsString(
                                                userRequest
                                        )
                                )
                )
                .andExpect(status().isCreated());
    }


    // =========================================================
    // GET USER BY ID
    // =========================================================

    @Test
    void getUserById_shouldReturnOk() throws Exception {

        UserResponse userResponse =
                new UserResponse(
                        1L,
                        "Mohit",
                        "Sharma",
                        "mohit@example.com",
                        Role.CUSTOMER
                );

        when(userService.getUserById(1L))
                .thenReturn(userResponse);

        mockMvc.perform(
                        get("/api/v1/users/1")
                )
                .andExpect(status().isOk());
    }


    // =========================================================
    // DELETE USER
    // =========================================================

    @Test
    void deleteUser_shouldReturnNoContent() throws Exception {

        doNothing()
                .when(userService)
                .deleteUser(1L);

        mockMvc.perform(
                        delete("/api/v1/users/1")
                )
                .andExpect(status().isNoContent());
    }
}