package com.ticketguard.ticketguard_backend.user.service;

import com.ticketguard.ticketguard_backend.common.exception.EmailAlreadyExistsException;
import com.ticketguard.ticketguard_backend.common.exception.UserNotFoundException;
import com.ticketguard.ticketguard_backend.user.Role;
import com.ticketguard.ticketguard_backend.user.dto.UserRequest;
import com.ticketguard.ticketguard_backend.user.dto.UserResponse;
import com.ticketguard.ticketguard_backend.user.entity.User;
import com.ticketguard.ticketguard_backend.user.repository.UserRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class UserServiceTest {

    @Mock
    private UserRepository userRepository;

    @Mock
    private PasswordEncoder passwordEncoder;

    @InjectMocks
    private UserService userService;

    @Test
    void createUser_shouldWorkSuccessfully() {

        UserRequest request = new UserRequest(
                "Mohit",
                "Sharma",
                "mohit@example.com",
                "Password123",
                Role.CUSTOMER
        );

        User savedUser = User.builder()
                .id(1L)
                .firstName("Mohit")
                .lastName("Sharma")
                .email("mohit@example.com")
                .password("encodedPassword")
                .role(Role.CUSTOMER)
                .build();

        when(userRepository.existsByEmail(request.email()))
                .thenReturn(false);

        when(passwordEncoder.encode(request.password()))
                .thenReturn("encodedPassword");

        when(userRepository.save(any(User.class)))
                .thenReturn(savedUser);

        UserResponse response =
                userService.createUser(request);

        assertThat(response).isNotNull();
        assertThat(response.email())
                .isEqualTo("mohit@example.com");
        assertThat(response.firstName())
                .isEqualTo("Mohit");
        assertThat(response.role())
                .isEqualTo(Role.CUSTOMER);
    }

    @Test
    void createUser_shouldRejectDuplicateEmail() {

        UserRequest request = new UserRequest(
                "Mohit",
                "Sharma",
                "mohit@example.com",
                "Password123",
                Role.CUSTOMER
        );

        when(userRepository.existsByEmail(request.email()))
                .thenReturn(true);

        assertThatThrownBy(() ->
                userService.createUser(request)
        )
                .isInstanceOf(EmailAlreadyExistsException.class);
    }

    @Test
    void getUserById_shouldReturnUser() {

        User user = User.builder()
                .id(1L)
                .firstName("Mohit")
                .lastName("Sharma")
                .email("mohit@example.com")
                .password("encodedPassword")
                .role(Role.CUSTOMER)
                .build();

        when(userRepository.findById(1L))
                .thenReturn(Optional.of(user));

        UserResponse response =
                userService.getUserById(1L);

        assertThat(response).isNotNull();
        assertThat(response.email())
                .isEqualTo("mohit@example.com");
        assertThat(response.firstName())
                .isEqualTo("Mohit");
    }
}