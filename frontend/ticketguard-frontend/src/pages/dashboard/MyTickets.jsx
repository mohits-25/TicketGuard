import { useEffect, useState } from "react";

import {
    CircularProgress,
    Typography
} from "@mui/material";

import DashboardLayout from "../../components/layout/DashboardLayout";

import TicketCard from "../../components/ticket/TicketCard";

import { getMyTickets } from "../../api/ticketApi";

const MyTickets = () => {

    const [tickets, setTickets] = useState([]);

    const [loading, setLoading] = useState(true);

    useEffect(() => {

        loadTickets();

    }, []);

    const loadTickets = async () => {

        try {

            const data = await getMyTickets();

            setTickets(data);

        } finally {

            setLoading(false);

        }

    };

    if (loading) {

        return (

            <DashboardLayout>

                <CircularProgress />

            </DashboardLayout>

        );

    }

    return (

        <DashboardLayout>

            <Typography
                variant="h4"
                fontWeight="bold"
                mb={4}
            >
                My Tickets
            </Typography>

            {

                tickets.map(ticket => (

                    <TicketCard

                        key={ticket.id}

                        ticket={ticket}

                    />

                ))

            }

        </DashboardLayout>

    );

};

export default MyTickets;