package com.ticketguard.ticketguard_backend.security.service;

import com.ticketguard.ticketguard_backend.common.exception.EmailAlreadyExistsException;
import com.ticketguard.ticketguard_backend.security.dto.LoginRequest;
import com.ticketguard.ticketguard_backend.security.dto.LoginResponse;
import com.ticketguard.ticketguard_backend.security.dto.RegisterRequest;
import com.ticketguard.ticketguard_backend.security.jwt.JwtService;
import com.ticketguard.ticketguard_backend.user.Role;
import com.ticketguard.ticketguard_backend.user.entity.User;
import com.ticketguard.ticketguard_backend.user.repository.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class AuthenticationServiceTest {

    @Mock
    private UserRepository userRepository;

    @Mock
    private PasswordEncoder passwordEncoder;

    @Mock
    private JwtService jwtService;

    @Mock
    private AuthenticationManager authenticationManager;

    @Mock
    private CustomUserDetailsService userDetailsService;

    @Mock
    private UserDetails userDetails;

    @Mock
    private Authentication authentication;

    @InjectMocks
    private AuthenticationService authenticationService;

    private RegisterRequest registerRequest;
    private LoginRequest loginRequest;
    private User savedUser;

    @BeforeEach
    void setUp() {

        registerRequest = new RegisterRequest(
                "Mohit",
                "Sharma",
                "mohit@example.com",
                "Password123",
                Role.CUSTOMER
        );

        loginRequest = new LoginRequest(
                "mohit@example.com",
                "Password123"
        );

        savedUser = User.builder()
                .id(1L)
                .firstName("Mohit")
                .lastName("Sharma")
                .email("mohit@example.com")
                .password("encodedPassword")
                .role(Role.CUSTOMER)
                .build();
    }

    @Test
    void register_shouldWorkSuccessfully() {

        when(userRepository.existsByEmail(registerRequest.email()))
                .thenReturn(false);

        when(passwordEncoder.encode(registerRequest.password()))
                .thenReturn("encodedPassword");

        when(userRepository.save(any(User.class)))
                .thenReturn(savedUser);

        when(userDetailsService.loadUserByUsername(savedUser.getEmail()))
                .thenReturn(userDetails);

        when(jwtService.generateToken(userDetails))
                .thenReturn("jwt-token");

        LoginResponse response =
                authenticationService.register(registerRequest);

        assertThat(response).isNotNull();
        assertThat(response.token()).isEqualTo("jwt-token");
        assertThat(response.email()).isEqualTo("mohit@example.com");
        assertThat(response.role()).isEqualTo(Role.CUSTOMER);
    }

    @Test
    void register_shouldRejectDuplicateEmail() {

        when(userRepository.existsByEmail(registerRequest.email()))
                .thenReturn(true);

        assertThatThrownBy(() ->
                authenticationService.register(registerRequest)
        )
                .isInstanceOf(EmailAlreadyExistsException.class);
    }

    @Test
    void login_shouldWorkSuccessfully() {

        when(authenticationManager.authenticate(any()))
                .thenReturn(authentication);

        when(userRepository.findByEmail(loginRequest.email()))
                .thenReturn(Optional.of(savedUser));

        when(userDetailsService.loadUserByUsername(loginRequest.email()))
                .thenReturn(userDetails);

        when(jwtService.generateToken(userDetails))
                .thenReturn("jwt-token");

        LoginResponse response =
                authenticationService.login(loginRequest);

        assertThat(response).isNotNull();
        assertThat(response.token()).isEqualTo("jwt-token");
        assertThat(response.email()).isEqualTo("mohit@example.com");
        assertThat(response.role()).isEqualTo(Role.CUSTOMER);
    }
}