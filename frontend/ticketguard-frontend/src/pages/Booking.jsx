import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import {
    Box,
    Button,
    Card,
    CardContent,
    Container,
    TextField,
    Typography,
    Alert
} from "@mui/material";

import MainLayout from "../layouts/MainLayout";
import { getEventById } from "../api/eventApi";
import { createBooking } from "../api/bookingApi";

const Booking = () => {

    const { id } = useParams();

    const navigate = useNavigate();

    const [event, setEvent] = useState(null);

    const [tickets, setTickets] = useState(1);

    const [error, setError] = useState("");

    useEffect(() => {

        loadEvent();

    }, []);

    const loadEvent = async () => {

        try {

            const response = await getEventById(id);

            setEvent(response);

        } catch (err) {

            console.error(err);

        }

    };

    const handleBooking = async () => {

        try {

            const booking = await createBooking({

                eventId: Number(id),

                numberOfTickets: Number(tickets)

            });

            navigate("/payment", {

                state: {

                    booking

                }

            });

        } catch (err) {

            setError(

                err.response?.data?.message ||

                "Booking Failed"

            );

        }

    };

    if (!event) {

        return (

            <MainLayout>

                <Container sx={{ mt: 5 }}>

                    Loading...

                </Container>

            </MainLayout>

        );

    }

    return (

        <MainLayout>

            <Container maxWidth="sm" sx={{ mt: 5 }}>

                <Card>

                    <CardContent>

                        <Typography
                            variant="h4"
                            gutterBottom
                        >

                            {event.title}

                        </Typography>

                        <Typography>

                            Price per Ticket : ₹ {event.ticketPrice}

                        </Typography>

                        <Typography>

                            Available Seats : {event.availableSeats}

                        </Typography>

                        <Box sx={{ mt: 3 }}>

                            <TextField

                                type="number"

                                label="Number of Tickets"

                                value={tickets}

                                onChange={(e) =>
                                    setTickets(e.target.value)
                                }

                                fullWidth

                            />

                        </Box>

                        <Typography
                            variant="h5"
                            sx={{ mt: 3 }}
                        >

                            Total Amount

                        </Typography>

                        <Typography
                            variant="h4"
                            color="primary"
                        >

                            ₹ {tickets * event.ticketPrice}

                        </Typography>

                        {

                            error &&

                            <Alert
                                severity="error"
                                sx={{ mt: 2 }}
                            >

                                {error}

                            </Alert>

                        }

                        <Button

                            fullWidth

                            variant="contained"

                            sx={{ mt: 4 }}

                            onClick={handleBooking}

                        >

                            Proceed To Payment

                        </Button>

                    </CardContent>

                </Card>

            </Container>

        </MainLayout>

    );

};

export default Booking;