import { useEffect, useState } from "react";

import {
    Grid,
    Typography,
    CircularProgress
} from "@mui/material";

import DashboardLayout from "../../components/layout/DashboardLayout";

import StatCard from "../../components/dashboard/StatCard";

import { getMyBookings } from "../../api/bookingApi";
import { getMyPayments } from "../../api/paymentApi";
import { getMyTickets } from "../../api/ticketApi";

const Dashboard = () => {

    const [bookings, setBookings] = useState([]);

    const [payments, setPayments] = useState([]);

    const [tickets, setTickets] = useState([]);

    const [loading, setLoading] = useState(true);

    useEffect(() => {

        loadDashboard();

    }, []);

    const loadDashboard = async () => {

        try {

            const [

                bookingsData,

                paymentsData,

                ticketsData

            ] = await Promise.all([

                getMyBookings(),

                getMyPayments(),

                getMyTickets()

            ]);

            setBookings(bookingsData);

            setPayments(paymentsData);

            setTickets(ticketsData);

        }

        catch (err) {

            console.error(err);

        }

        finally {

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

    const totalSpent = payments.reduce(

        (sum, payment) => sum + payment.amount,

        0

    );

    return (

        <DashboardLayout>

            <Typography
                variant="h4"
                fontWeight="bold"
                mb={4}
            >

                Welcome Back 👋

            </Typography>

            <Grid container spacing={3}>

                <Grid item xs={12} md={4}>

                    <StatCard

                        title="Bookings"

                        value={bookings.length}

                        color="#1976d2"

                    />

                </Grid>

                <Grid item xs={12} md={4}>

                    <StatCard

                        title="Payments"

                        value={`₹${totalSpent}`}

                        color="#2e7d32"

                    />

                </Grid>

                <Grid item xs={12} md={4}>

                    <StatCard

                        title="Tickets"

                        value={tickets.length}

                        color="#ed6c02"

                    />

                </Grid>

            </Grid>

        </DashboardLayout>

    );

};

export default Dashboard;