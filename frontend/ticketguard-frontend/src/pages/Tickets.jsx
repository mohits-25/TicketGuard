import { useEffect, useState } from "react";

import {
    Card,
    CardContent,
    Button,
    Container,
    Grid,
    Typography
} from "@mui/material";

import MainLayout from "../layouts/MainLayout";

import {
    getMyTickets,
    downloadTicket
} from "../api/ticketApi";

const Tickets = () => {

    const [tickets, setTickets] = useState([]);

    useEffect(() => {

        loadTickets();

    }, []);

    const loadTickets = async () => {

        try {

            const data = await getMyTickets();

            setTickets(data);

        }

        catch (err) {

            console.error(err);

        }

    };

    return (

        <MainLayout>

            <Container sx={{ mt:5 }}>

                <Typography
                    variant="h4"
                    fontWeight="bold"
                    mb={4}
                >

                    My Tickets

                </Typography>

                <Grid
                    container
                    spacing={3}
                >

                    {

                        tickets.map(ticket => (

                            <Grid
                                item
                                xs={12}
                                md={6}
                                lg={4}
                                key={ticket.id}
                            >

                                <Card>

                                    <CardContent>

                                        <Typography
                                            variant="h6"
                                        >

                                            {ticket.eventTitle}

                                        </Typography>

                                        <Typography>

                                            Ticket Number

                                        </Typography>

                                        <Typography>

                                            {ticket.ticketNumber}

                                        </Typography>

                                        <Typography>

                                            Booking

                                        </Typography>

                                        <Typography>

                                            {ticket.bookingReference}

                                        </Typography>

                                        <Typography>

                                            Status

                                        </Typography>

                                        <Typography>

                                            {ticket.status}

                                        </Typography>

                                        <Button

                                            fullWidth

                                            sx={{ mt:3 }}

                                            variant="contained"

                                            onClick={() =>
                                                downloadTicket(ticket.id)
                                            }

                                        >

                                            Download PDF

                                        </Button>

                                    </CardContent>

                                </Card>

                            </Grid>

                        ))

                    }

                </Grid>

            </Container>

        </MainLayout>

    );

};

export default Tickets;