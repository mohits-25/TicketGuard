import {
    Card,
    CardContent,
    Typography,
    Button,
    Stack
} from "@mui/material";

import { useNavigate } from "react-router-dom";

const BookingCard = ({ booking }) => {

    const navigate = useNavigate();

    return (

        <Card sx={{ mb: 3 }}>

            <CardContent>

                <Typography
                    variant="h6"
                    fontWeight="bold"
                >
                    {booking.eventTitle}
                </Typography>

                <Typography>
                    Booking Ref : {booking.bookingReference}
                </Typography>

                <Typography>
                    Date : {booking.eventDate}
                </Typography>

                <Typography>
                    Tickets : {booking.numberOfTickets}
                </Typography>

                <Typography>
                    Amount : ₹{booking.totalAmount}
                </Typography>

                <Typography
                    color="primary"
                    fontWeight="bold"
                    sx={{ mt: 1 }}
                >
                    {booking.status}
                </Typography>

                <Stack
                    direction="row"
                    spacing={2}
                    sx={{ mt: 3 }}
                >

                    <Button
                        variant="contained"
                        onClick={() =>
                            navigate("/my-tickets")
                        }
                    >
                        View Ticket
                    </Button>

                </Stack>

            </CardContent>

        </Card>

    );

};

export default BookingCard;