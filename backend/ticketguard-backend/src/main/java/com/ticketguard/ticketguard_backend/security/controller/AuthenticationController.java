package com.ticketguard.ticketguard_backend.security.controller;

import com.ticketguard.ticketguard_backend.security.dto.LoginRequest;
import com.ticketguard.ticketguard_backend.security.dto.LoginResponse;
import com.ticketguard.ticketguard_backend.security.dto.RegisterRequest;
import com.ticketguard.ticketguard_backend.security.service.AuthenticationService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthenticationController {

    private final AuthenticationService authenticationService;

    public AuthenticationController(AuthenticationService authenticationService) {
        this.authenticationService = authenticationService;
    }

    @PostMapping("/register")
    @ResponseStatus(HttpStatus.CREATED)
    public LoginResponse register(
            @Valid @RequestBody RegisterRequest request) {

        return authenticationService.register(request);
    }

    @PostMapping("/login")
    public LoginResponse login(
            @Valid @RequestBody LoginRequest request) {

        return authenticationService.login(request);
    }
}