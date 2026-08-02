package com.ticketguard.ticketguard_backend.ticket.pdf;

import com.lowagie.text.*;
import com.lowagie.text.pdf.PdfPCell;
import com.lowagie.text.pdf.PdfPTable;
import com.lowagie.text.pdf.PdfWriter;
import com.ticketguard.ticketguard_backend.ticket.entity.Ticket;
import org.springframework.stereotype.Service;

import java.awt.Color;
import java.io.FileOutputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

@Service
public class PdfService {

    private static final String PDF_DIRECTORY = "uploads/pdf/";

    public String generateTicketPdf(Ticket ticket) {

        try {

            //----------------------------------------
            // Create PDF Directory
            //----------------------------------------

            Path directory = Paths.get(PDF_DIRECTORY);

            if (!Files.exists(directory)) {
                Files.createDirectories(directory);
            }

            //----------------------------------------
            // PDF File
            //----------------------------------------

            String fileName = ticket.getTicketNumber() + ".pdf";

            Path filePath = directory.resolve(fileName);

            Document document = new Document(PageSize.A4);

            PdfWriter.getInstance(
                    document,
                    new FileOutputStream(filePath.toFile()));

            document.open();

            //----------------------------------------
            // Title
            //----------------------------------------

            Font titleFont = new Font(
                    Font.HELVETICA,
                    20,
                    Font.BOLD,
                    Color.BLUE);

            Paragraph title = new Paragraph(
                    "TicketGuard",
                    titleFont);

            title.setAlignment(Element.ALIGN_CENTER);

            document.add(title);

            document.add(new Paragraph(" "));

            //----------------------------------------
            // Ticket Details
            //----------------------------------------

            PdfPTable table = new PdfPTable(2);

            table.setWidthPercentage(100);

            table.addCell(createCell("Ticket Number"));
            table.addCell(ticket.getTicketNumber());

            table.addCell(createCell("Booking Reference"));
            table.addCell(ticket.getBooking().getBookingReference());

            table.addCell(createCell("Customer"));
            table.addCell(
                    ticket.getBooking().getUser().getFirstName()
                            + " "
                            + ticket.getBooking().getUser().getLastName());

            table.addCell(createCell("Event"));
            table.addCell(
                    ticket.getBooking().getEvent().getTitle());

            table.addCell(createCell("Venue"));
            table.addCell(
                    ticket.getBooking().getEvent().getVenue().getName());

            table.addCell(createCell("Date"));
            table.addCell(
                    ticket.getBooking().getEvent().getEventDate().toString());

            table.addCell(createCell("Time"));
            table.addCell(
                    ticket.getBooking().getEvent().getStartTime().toString());

            table.addCell(createCell("Tickets"));
            table.addCell(
                    String.valueOf(
                            ticket.getBooking().getNumberOfTickets()));

            table.addCell(createCell("Amount"));
            table.addCell(
                    "₹ " + ticket.getBooking().getTotalAmount());

            table.addCell(createCell("Status"));
            table.addCell(ticket.getStatus().name());

            document.add(table);

            document.add(new Paragraph(" "));

            //----------------------------------------
            // QR Code
            //----------------------------------------

            if (ticket.getQrCode() != null) {

                Path qrPath = Paths.get("uploads")
                        .resolve(ticket.getQrCode());

                System.out.println("QR Path : "
                        + qrPath.toAbsolutePath());

                if (!Files.exists(qrPath)) {
                    throw new RuntimeException(
                            "QR Image not found : "
                                    + qrPath.toAbsolutePath());
                }

                Image qr = Image.getInstance(
                        qrPath.toAbsolutePath().toString());

                qr.scaleAbsolute(180, 180);

                qr.setAlignment(Element.ALIGN_CENTER);

                document.add(qr);
            }

            document.add(new Paragraph(" "));

            //----------------------------------------
            // Footer
            //----------------------------------------

            Paragraph footer = new Paragraph(
                    "Thank you for booking with TicketGuard.");

            footer.setAlignment(Element.ALIGN_CENTER);

            document.add(footer);

            document.close();

            return filePath.toString();

        } catch (Exception ex) {

            ex.printStackTrace();

            throw new RuntimeException(
                    "Failed to generate PDF",
                    ex);
        }
    }

    private PdfPCell createCell(String text) {

        PdfPCell cell = new PdfPCell(new Phrase(text));

        cell.setBackgroundColor(Color.LIGHT_GRAY);

        return cell;
    }
}