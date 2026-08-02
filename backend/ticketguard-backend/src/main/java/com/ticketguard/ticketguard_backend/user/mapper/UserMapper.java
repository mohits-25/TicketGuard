package com.ticketguard.ticketguard_backend.user.mapper;

import com.ticketguard.ticketguard_backend.user.dto.UserRequest;
import com.ticketguard.ticketguard_backend.user.dto.UserResponse;
import com.ticketguard.ticketguard_backend.user.entity.User;

public final class UserMapper {

    private UserMapper() {
        // Prevent instantiation
    }

    public static User toEntity(UserRequest request) {

        return User.builder()
                .firstName(request.firstName())
                .lastName(request.lastName())
                .email(request.email())
                .password(request.password())
                .role(request.role())
                .build();
    }

    public static UserResponse toResponse(User user) {

        return new UserResponse(
                user.getId(),
                user.getFirstName(),
                user.getLastName(),
                user.getEmail(),
                user.getRole()
        );
    }
}