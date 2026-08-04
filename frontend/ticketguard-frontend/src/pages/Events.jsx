import { useEffect, useState } from "react";

import {
    Container,
    Grid,
    Typography
} from "@mui/material";

import MainLayout from "../layouts/MainLayout";

import EventCard from "../components/EventCard";

import LoadingSpinner from "../components/LoadingSpinner";

import { getAllEvents } from "../api/eventApi";

const Events = () => {

    const [events, setEvents] = useState([]);

    const [loading, setLoading] = useState(true);

    useEffect(() => {

        loadEvents();

    }, []);

    const loadEvents = async () => {

        try {

            const data = await getAllEvents();
            console.log(data); // Log the entire response to see its structure

            // Spring Page response
            setEvents(data.content);

        } catch (error) {

            console.error(error);

        } finally {

            setLoading(false);

        }

    };

    if (loading) {

        return <LoadingSpinner />;

    }

    return (

        <MainLayout>

            <Container sx={{ mt: 5 }}>

                <Typography
                    variant="h4"
                    fontWeight="bold"
                    mb={4}
                >

                    Upcoming Events

                </Typography>

                <Grid container spacing={3}>

                    {events.map(event => (

                        <Grid
                            item
                            xs={12}
                            md={6}
                            lg={4}
                            key={event.id}
                        >

                            <EventCard
                                event={event}
                            />

                        </Grid>

                    ))}

                </Grid>

            </Container>

        </MainLayout>

    );

};

export default Events;