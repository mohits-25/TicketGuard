import {
    Button,
    Card,
    CardContent,
    Chip,
    Stack,
    Typography
} from "@mui/material";

import { downloadTicket } from "../../api/ticketApi";

const TicketCard = ({ ticket }) => {

    const qrUrl = `${import.meta.env.VITE_API_BASE_URL}/uploads/${ticket.qrCode}`;

    return (

        <Card sx={{ mb: 3 }}>

            <CardContent>

                <Typography
                    variant="h6"
                    fontWeight="bold"
                >
                    {ticket.eventTitle}
                </Typography>

                <Typography sx={{ mt: 1 }}>
                    Ticket No: {ticket.ticketNumber}
                </Typography>

                <Typography>
                    Booking Ref: {ticket.bookingReference}
                </Typography>

                <Typography>
                    Date: {ticket.eventDate}
                </Typography>

                <Stack
                    direction="row"
                    spacing={2}
                    alignItems="center"
                    sx={{ mt: 3 }}
                >

                    <img
                        src={qrUrl}
                        alt="QR Code"
                        width={120}
                        height={120}
                    />

                    <Chip
                        color="success"
                        label={ticket.status}
                    />

                </Stack>

                <Button
                    sx={{ mt: 3 }}
                    variant="contained"
                    onClick={() => downloadTicket(ticket.id)}
                >
                    Download PDF
                </Button>

            </CardContent>

        </Card>

    );

};

export default TicketCard;