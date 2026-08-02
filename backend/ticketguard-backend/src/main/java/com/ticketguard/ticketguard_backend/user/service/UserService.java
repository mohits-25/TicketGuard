package com.ticketguard.ticketguard_backend.user.service;

import com.ticketguard.ticketguard_backend.common.exception.EmailAlreadyExistsException;
import com.ticketguard.ticketguard_backend.common.exception.UserNotFoundException;
import com.ticketguard.ticketguard_backend.user.dto.UserRequest;
import com.ticketguard.ticketguard_backend.user.dto.UserResponse;
import com.ticketguard.ticketguard_backend.user.entity.User;
import com.ticketguard.ticketguard_backend.user.mapper.UserMapper;
import com.ticketguard.ticketguard_backend.user.repository.UserRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {

    private static final Logger log =
            LoggerFactory.getLogger(UserService.class);

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public UserService(UserRepository userRepository,
                       PasswordEncoder passwordEncoder) {

        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    /**
     * Create a new user.
     */
    public UserResponse createUser(UserRequest request) {

        log.info("Creating user with email: {}", request.email());

        if (userRepository.existsByEmail(request.email())) {

            log.warn("User registration failed. Email already exists: {}",
                    request.email());

            throw new EmailAlreadyExistsException(
                    "Email already exists: " + request.email());
        }

        User user = UserMapper.toEntity(request);

        user.setPassword(passwordEncoder.encode(request.password()));

        User savedUser = userRepository.save(user);

        log.info("User created successfully. User ID: {}, Email: {}",
                savedUser.getId(),
                savedUser.getEmail());

        return UserMapper.toResponse(savedUser);
    }

    /**
     * Get all users.
     */
    public List<UserResponse> getAllUsers() {

        log.info("Fetching all users.");

        List<UserResponse> users = userRepository.findAll()
                .stream()
                .map(UserMapper::toResponse)
                .toList();

        log.info("Retrieved {} users.", users.size());

        return users;
    }

    /**
     * Get user by ID.
     */
    public UserResponse getUserById(Long id) {

        log.info("Fetching user with ID: {}", id);

        User user = userRepository.findById(id)
                .orElseThrow(() -> {

                    log.warn("User not found with ID: {}", id);

                    return new UserNotFoundException(
                            "User not found with id: " + id);
                });

        log.info("User found. Email: {}", user.getEmail());

        return UserMapper.toResponse(user);
    }

    /**
     * Update an existing user.
     */
    public UserResponse updateUser(Long id,
                                   UserRequest request) {

        log.info("Updating user with ID: {}", id);

        User existingUser = userRepository.findById(id)
                .orElseThrow(() -> {

                    log.warn("User not found for update. ID: {}", id);

                    return new UserNotFoundException(
                            "User not found with id: " + id);
                });

        if (!existingUser.getEmail().equals(request.email())
                && userRepository.existsByEmail(request.email())) {

            log.warn("User update failed. Email already exists: {}",
                    request.email());

            throw new EmailAlreadyExistsException(
                    "Email already exists: " + request.email());
        }

        existingUser.setFirstName(request.firstName());
        existingUser.setLastName(request.lastName());
        existingUser.setEmail(request.email());
        existingUser.setPassword(
                passwordEncoder.encode(request.password()));
        existingUser.setRole(request.role());

        User updatedUser = userRepository.save(existingUser);

        log.info("User updated successfully. ID: {}, Email: {}",
                updatedUser.getId(),
                updatedUser.getEmail());

        return UserMapper.toResponse(updatedUser);
    }

    /**
     * Delete user by ID.
     */
    public void deleteUser(Long id) {

        log.info("Deleting user with ID: {}", id);

        User user = userRepository.findById(id)
                .orElseThrow(() -> {

                    log.warn("User not found for deletion. ID: {}", id);

                    return new UserNotFoundException(
                            "User not found with id: " + id);
                });

        userRepository.delete(user);

        log.info("User deleted successfully. ID: {}, Email: {}",
                user.getId(),
                user.getEmail());
    }
}