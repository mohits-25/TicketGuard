package com.ticketguard.ticketguard_backend.ticket.controller;

import com.ticketguard.ticketguard_backend.ticket.dto.TicketResponse;
import com.ticketguard.ticketguard_backend.ticket.service.TicketService;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import java.util.List;

@Tag(
        name = "Tickets",
        description = "Ticket Management APIs"
)
@RestController
@RequestMapping("/api/v1/tickets")
public class TicketController {

    private final TicketService ticketService;

    public TicketController(
            TicketService ticketService) {

        this.ticketService = ticketService;
    }

    //---------------------------------------------------
    // CUSTOMER APIs
    //---------------------------------------------------

    /**
     * Get Ticket By ID
     */
    @GetMapping("/{id}")
    public TicketResponse getTicketById(
            @PathVariable Long id) {

        return ticketService.getTicketById(id);
    }

    /**
     * Get Logged-in User Tickets
     */
    @GetMapping("/my-tickets")
    public List<TicketResponse> getMyTickets(

            @AuthenticationPrincipal
            UserDetails userDetails) {

        return ticketService.getMyTickets(
                userDetails);
    }

    //---------------------------------------------------
    // ADMIN APIs
    //---------------------------------------------------

    /**
     * Get All Tickets
     */
    @GetMapping
    @PreAuthorize("hasRole('ADMIN')")
    public List<TicketResponse> getAllTickets() {

        return ticketService.getAllTickets();
    }

    @GetMapping("/{id}/download")
    public ResponseEntity<Resource> downloadTicket(
            @PathVariable Long id) {

        Resource resource =
                ticketService.downloadTicket(id);

        return ResponseEntity.ok()

                .contentType(MediaType.APPLICATION_PDF)

                .header(
                        HttpHeaders.CONTENT_DISPOSITION,
                        "attachment; filename=\"" +
                                resource.getFilename() +
                                "\"")

                .body(resource);
    }
}