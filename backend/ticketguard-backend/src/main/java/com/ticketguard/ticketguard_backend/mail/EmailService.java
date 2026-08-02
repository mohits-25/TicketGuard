package com.ticketguard.ticketguard_backend.mail;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import org.springframework.core.io.FileSystemResource;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import java.io.File;

@Service
public class EmailService {

    private final JavaMailSender mailSender;

    public EmailService(JavaMailSender mailSender) {
        this.mailSender = mailSender;
    }

    /**
     * Send Ticket Email
     */
    public void sendTicketEmail(
            String toEmail,
            String customerName,
            String eventName,
            String bookingReference,
            String ticketNumber,
            String pdfPath) {

        try {

            MimeMessage message =
                    mailSender.createMimeMessage();

            MimeMessageHelper helper =
                    new MimeMessageHelper(message, true);

            helper.setTo(toEmail);

            helper.setSubject(
                    "Your Ticket for " + eventName);

            helper.setText("""
                    Hello %s,

                    Thank you for booking with TicketGuard.

                    Your booking has been confirmed.

                    Booking Reference:
                    %s

                    Ticket Number:
                    %s

                    Please find your ticket attached.

                    Have a wonderful event!

                    Regards,
                    TicketGuard Team
                    """
                    .formatted(
                            customerName,
                            bookingReference,
                            ticketNumber
                    ));

            FileSystemResource file =
                    new FileSystemResource(
                            new File(pdfPath));

            helper.addAttachment(
                    file.getFilename(),
                    file);

            mailSender.send(message);

        } catch (MessagingException ex) {

            throw new RuntimeException(
                    "Failed to send email",
                    ex);
        }
    }
}