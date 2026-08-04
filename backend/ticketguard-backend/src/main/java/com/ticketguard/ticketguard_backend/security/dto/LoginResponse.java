package com.ticketguard.ticketguard_backend.security.dto;

import com.ticketguard.ticketguard_backend.user.Role;

public record LoginResponse(

        String token,

        String firstName,

        String lastName,

        String email,

        Role role

) {
}