package com.ticketguard.ticketguard_backend.ticket.qr;

import com.google.zxing.BarcodeFormat;
import com.google.zxing.WriterException;
import com.google.zxing.client.j2se.MatrixToImageWriter;
import com.google.zxing.common.BitMatrix;
import com.google.zxing.qrcode.QRCodeWriter;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

@Service
public class QrCodeService {

    private static final String QR_DIRECTORY = "uploads/qr/";

    /**
     * Generates a QR Code PNG and returns its path.
     */
    public String generateQrCode(
            String ticketNumber,
            String qrData) {

        try {

            Path directory = Paths.get(QR_DIRECTORY);

            if (!Files.exists(directory)) {
                Files.createDirectories(directory);
            }

            String fileName = ticketNumber + ".png";

            Path filePath = directory.resolve(fileName);

            QRCodeWriter qrCodeWriter = new QRCodeWriter();

            BitMatrix bitMatrix = qrCodeWriter.encode(
                    qrData,
                    BarcodeFormat.QR_CODE,
                    300,
                    300
            );

            MatrixToImageWriter.writeToPath(
                    bitMatrix,
                    "PNG",
                    filePath
            );

            return "qr/" + fileName;
        } catch (WriterException | IOException ex) {

            throw new RuntimeException(
                    "Failed to generate QR Code",
                    ex
            );
        }
    }
}