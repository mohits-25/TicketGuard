import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import {
    Container,
    Card,
    CardMedia,
    CardContent,
    Typography,
    Button,
    Chip,
    Stack,
    CircularProgress
} from "@mui/material";

import MainLayout from "../layouts/MainLayout";
import { getEventById } from "../api/eventApi";

const EventDetails = () => {

    const { id } = useParams();

    const navigate = useNavigate();

    const [event, setEvent] = useState(null);

    const [loading, setLoading] = useState(true);

    useEffect(() => {

        loadEvent();

    }, []);

    const loadEvent = async () => {

        try {

            const data = await getEventById(id);

            setEvent(data);

        } catch (error) {

            console.error(error);

        } finally {

            setLoading(false);

        }

    };

    if (loading) {

        return (
            <MainLayout>
                <Container sx={{ mt: 5, textAlign: "center" }}>
                    <CircularProgress />
                </Container>
            </MainLayout>
        );

    }

    return (

        <MainLayout>

            <Container maxWidth="md" sx={{ mt: 5 }}>

                <Card>

                    <CardMedia

                        component="img"

                        height="350"

                        image={event.imageUrl}

                        alt={event.title}

                    />

                    <CardContent>

                        <Typography
                            variant="h4"
                            fontWeight="bold"
                        >

                            {event.title}

                        </Typography>

                        <Typography
                            sx={{ mt: 2 }}
                        >

                            {event.description}

                        </Typography>

                        <Stack
                            direction="row"
                            spacing={2}
                            sx={{ mt: 3 }}
                        >

                            <Chip
                                label={event.category}
                                color="primary"
                            />

                            <Chip
                                label={event.city}
                            />

                            <Chip
                                label={event.status}
                                color="success"
                            />

                        </Stack>

                        <Typography sx={{ mt: 3 }}>

                            📍 {event.venueName}

                        </Typography>

                        <Typography>

                            📅 {event.eventDate}

                        </Typography>

                        <Typography>

                            🕒 {event.startTime} - {event.endTime}

                        </Typography>

                        <Typography>

                            🎫 Available Seats : {event.availableSeats}

                        </Typography>

                        <Typography
                            variant="h5"
                            color="primary"
                            fontWeight="bold"
                            sx={{ mt: 3 }}
                        >

                            ₹ {event.ticketPrice}

                        </Typography>

                        <Button

                            variant="contained"

                            size="large"

                            sx={{ mt: 4 }}

                            onClick={() =>
                                navigate(`/booking/${event.id}`)
                            }

                        >

                            Book Tickets

                        </Button>

                    </CardContent>

                </Card>

            </Container>

        </MainLayout>

    );

};

export default EventDetails;