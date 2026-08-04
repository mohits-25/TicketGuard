package com.ticketguard.ticketguard_backend.security.service;

import com.ticketguard.ticketguard_backend.common.exception.EmailAlreadyExistsException;
import com.ticketguard.ticketguard_backend.security.dto.LoginRequest;
import com.ticketguard.ticketguard_backend.security.dto.LoginResponse;
import com.ticketguard.ticketguard_backend.security.dto.RegisterRequest;
import com.ticketguard.ticketguard_backend.security.jwt.JwtService;
import com.ticketguard.ticketguard_backend.user.entity.User;
import com.ticketguard.ticketguard_backend.user.repository.UserRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthenticationService {

    private static final Logger log =
            LoggerFactory.getLogger(AuthenticationService.class);

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;
    private final CustomUserDetailsService userDetailsService;

    public AuthenticationService(
            UserRepository userRepository,
            PasswordEncoder passwordEncoder,
            JwtService jwtService,
            AuthenticationManager authenticationManager,
            CustomUserDetailsService userDetailsService) {

        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtService = jwtService;
        this.authenticationManager = authenticationManager;
        this.userDetailsService = userDetailsService;
    }

    /**
     * Register a new user and return JWT.
     */
    public LoginResponse register(RegisterRequest request) {

        log.info("Registration request received for email: {}", request.email());

        if (userRepository.existsByEmail(request.email())) {

            log.warn("Registration failed. Email already exists: {}",
                    request.email());

            throw new EmailAlreadyExistsException(
                    "Email already exists: " + request.email()
            );
        }

        User user = User.builder()
                .firstName(request.firstName())
                .lastName(request.lastName())
                .email(request.email())
                .password(passwordEncoder.encode(request.password()))
                .role(request.role())
                .build();

        User savedUser = userRepository.save(user);

        log.info("User registered successfully. ID: {}, Email: {}",
                savedUser.getId(),
                savedUser.getEmail());

        UserDetails userDetails =
                userDetailsService.loadUserByUsername(savedUser.getEmail());

        String token = jwtService.generateToken(userDetails);

        log.info("JWT generated successfully for user: {}",
                savedUser.getEmail());

        return new LoginResponse(

                token,

                savedUser.getFirstName(),

                savedUser.getLastName(),

                savedUser.getEmail(),

                savedUser.getRole()

        );
    }

    /**
     * Authenticate user and return JWT.
     */
    public LoginResponse login(LoginRequest request) {

        log.info("Login attempt for email: {}", request.email());

        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.email(),
                        request.password()
                )
        );

        log.info("Authentication successful for user: {}",
                request.email());

        User user = userRepository.findByEmail(request.email())
                .orElseThrow();

        UserDetails userDetails =
                userDetailsService.loadUserByUsername(request.email());

        String token = jwtService.generateToken(userDetails);

        log.info("JWT generated successfully for user: {}",
                request.email());

        return new LoginResponse(

                token,

                user.getFirstName(),

                user.getLastName(),

                user.getEmail(),

                user.getRole()

        );
    }
}