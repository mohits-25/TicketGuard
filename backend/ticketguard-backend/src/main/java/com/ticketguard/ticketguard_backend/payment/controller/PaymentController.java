package com.ticketguard.ticketguard_backend.payment.controller;

import com.ticketguard.ticketguard_backend.payment.dto.PaymentRequest;
import com.ticketguard.ticketguard_backend.payment.dto.PaymentResponse;
import com.ticketguard.ticketguard_backend.payment.service.PaymentService;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@Tag(
        name = "Payments",
        description = "Payment Management APIs"
)
@RestController
@RequestMapping("/api/v1/payments")
public class PaymentController {

    private final PaymentService paymentService;

    public PaymentController(
            PaymentService paymentService) {

        this.paymentService = paymentService;
    }

    //----------------------------------------
    // CUSTOMER APIs
    //----------------------------------------

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public PaymentResponse processPayment(

            @Valid
            @RequestBody PaymentRequest request,

            @AuthenticationPrincipal
            UserDetails userDetails) {

        return paymentService.processPayment(
                request,
                userDetails);
    }

    @GetMapping("/{id}")
    public PaymentResponse getPayment(

            @PathVariable Long id) {

        return paymentService.getPaymentById(id);
    }

    @GetMapping("/my-payments")
    public List<PaymentResponse> myPayments(

            @AuthenticationPrincipal
            UserDetails userDetails) {

        return paymentService.getMyPayments(
                userDetails);
    }

    //----------------------------------------
    // ADMIN APIs
    //----------------------------------------

    @GetMapping
    @PreAuthorize("hasRole('ADMIN')")
    public List<PaymentResponse> getAllPayments() {

        return paymentService.getAllPayments();
    }

}