package com.ticketguard.ticketguard_backend.ticket.service;
import com.ticketguard.ticketguard_backend.mail.EmailService;
import com.ticketguard.ticketguard_backend.booking.entity.Booking;
import com.ticketguard.ticketguard_backend.common.exception.TicketAlreadyExistsException;
import com.ticketguard.ticketguard_backend.common.exception.TicketNotFoundException;
import com.ticketguard.ticketguard_backend.ticket.dto.TicketResponse;
import com.ticketguard.ticketguard_backend.ticket.entity.Ticket;
import com.ticketguard.ticketguard_backend.ticket.enums.TicketStatus;
import com.ticketguard.ticketguard_backend.ticket.mapper.TicketMapper;
import com.ticketguard.ticketguard_backend.ticket.repository.TicketRepository;
import com.ticketguard.ticketguard_backend.user.entity.User;
import com.ticketguard.ticketguard_backend.user.repository.UserRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import com.ticketguard.ticketguard_backend.ticket.pdf.PdfService;
import jakarta.persistence.EntityNotFoundException;
import com.ticketguard.ticketguard_backend.ticket.qr.QrCodeService;
import java.util.List;
import java.util.UUID;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import java.net.MalformedURLException;
import java.nio.file.Path;
import java.nio.file.Paths;

@Service
public class TicketService {

    private static final Logger log =
            LoggerFactory.getLogger(TicketService.class);

    private final TicketRepository ticketRepository;
    private final UserRepository userRepository;
    private final QrCodeService qrCodeService;
    private final PdfService pdfService;
    private final EmailService emailService;

    public TicketService(
            TicketRepository ticketRepository,
            UserRepository userRepository,
            QrCodeService qrCodeService,
            PdfService pdfService,
            EmailService emailService) {

        this.ticketRepository = ticketRepository;
        this.userRepository = userRepository;
        this.qrCodeService = qrCodeService;
        this.pdfService = pdfService;
        this.emailService = emailService;
    }
    /**
     * Generate Ticket
     */
    @Transactional
    public Ticket generateTicket(Booking booking) {

        log.info("Generating ticket for booking {}",
                booking.getBookingReference());

        if (ticketRepository.findByBooking(booking).isPresent()) {

            log.warn("Ticket already exists for booking {}",
                    booking.getBookingReference());

            throw new TicketAlreadyExistsException(
                    "Ticket already generated.");
        }

        //----------------------------------------
        // Generate Ticket Number
        //----------------------------------------

        String ticketNumber = generateTicketNumber();

        //----------------------------------------
        // QR Data
        //----------------------------------------

        String qrData = """
            Ticket Number : %s
            Booking Ref   : %s
            Event         : %s
            Customer      : %s
            Status        : ACTIVE
            """
                .formatted(
                        ticketNumber,
                        booking.getBookingReference(),
                        booking.getEvent().getTitle(),
                        booking.getUser().getFirstName()
                                + " "
                                + booking.getUser().getLastName()
                );

        //----------------------------------------
        // Generate QR
        //----------------------------------------

        String qrPath = qrCodeService.generateQrCode(
                ticketNumber,
                qrData
        );

        //----------------------------------------
        // Create Ticket
        //----------------------------------------

        Ticket ticket = Ticket.builder()

                .ticketNumber(ticketNumber)

                .booking(booking)

                .qrCode(qrPath)

                .status(TicketStatus.ACTIVE)

                .build();

        Ticket savedTicket =
                ticketRepository.save(ticket);

        log.info(
                "Ticket {} generated successfully",
                savedTicket.getTicketNumber());

        /*
         * Generate PDF
         */

        //----------------------------------------
// Generate PDF
//----------------------------------------

        String pdfPath =
                pdfService.generateTicketPdf(savedTicket);

        savedTicket.setPdfPath(pdfPath);

        savedTicket =
                ticketRepository.save(savedTicket);

        log.info(
                "PDF generated successfully for ticket {}",
                savedTicket.getTicketNumber());


//----------------------------------------
// Send Email
//----------------------------------------

        emailService.sendTicketEmail(

                savedTicket.getBooking()
                        .getUser()
                        .getEmail(),

                savedTicket.getBooking()
                        .getUser()
                        .getFirstName()
                        + " "
                        + savedTicket.getBooking()
                        .getUser()
                        .getLastName(),

                savedTicket.getBooking()
                        .getEvent()
                        .getTitle(),

                savedTicket.getBooking()
                        .getBookingReference(),

                savedTicket.getTicketNumber(),

                pdfPath

        );

        log.info(
                "Ticket email sent successfully to {}",
                savedTicket.getBooking()
                        .getUser()
                        .getEmail());

        return savedTicket;
    }

    /**
     * Get Ticket By ID
     */
    public TicketResponse getTicketById(Long id) {

        log.info("Fetching ticket {}", id);

        Ticket ticket = ticketRepository.findById(id)

                .orElseThrow(() -> {

                    log.warn("Ticket not found {}", id);

                    return new TicketNotFoundException(
                            "Ticket not found");
                });

        return TicketMapper.toResponse(ticket);
    }

    /**
     * Get My Tickets
     */
    public List<TicketResponse> getMyTickets(
            UserDetails userDetails) {

        User user = userRepository.findByEmail(
                        userDetails.getUsername())

                .orElseThrow(() ->
                        new EntityNotFoundException(
                                "User not found"));

        List<TicketResponse> tickets =
                ticketRepository.findByBookingUser(user)

                        .stream()

                        .map(TicketMapper::toResponse)

                        .toList();

        log.info(
                "Retrieved {} tickets for {}",
                tickets.size(),
                user.getEmail());

        return tickets;
    }

    /**
     * Get All Tickets
     */
    public List<TicketResponse> getAllTickets() {

        List<TicketResponse> tickets =
                ticketRepository.findAll()

                        .stream()

                        .map(TicketMapper::toResponse)

                        .toList();

        log.info(
                "Retrieved {} tickets",
                tickets.size());

        return tickets;
    }

    /**
     * Generate Ticket Number
     */
    private String generateTicketNumber() {

        String ticketNumber;

        do {

            ticketNumber =
                    "TKT-"
                            + UUID.randomUUID()
                            .toString()
                            .substring(0, 8)
                            .toUpperCase();

        } while (ticketRepository.existsByTicketNumber(
                ticketNumber));

        return ticketNumber;
    }

    public Resource downloadTicket(Long id) {

        Ticket ticket = ticketRepository.findById(id)
                .orElseThrow(() ->
                        new TicketNotFoundException(
                                "Ticket not found"));

        try {

            Path path = Paths.get(ticket.getPdfPath());

            Resource resource = new UrlResource(path.toUri());

            if (!resource.exists()) {

                throw new RuntimeException(
                        "PDF not found");
            }

            return resource;

        } catch (MalformedURLException ex) {

            throw new RuntimeException(
                    "Unable to read PDF",
                    ex);
        }
    }

}