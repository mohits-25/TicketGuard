import { useEffect, useState } from "react";

import {
    Grid,
    Typography,
    Button,
    Stack,
    CircularProgress
} from "@mui/material";

import { Link } from "react-router-dom";

import DashboardLayout from "../../components/layout/DashboardLayout";
import AdminStatCard from "../../components/admin/AdminStatCard";

import { loadDashboard } from "../../api/adminDashboardApi";

const AdminDashboard = () => {

    const [stats, setStats] = useState(null);

    useEffect(() => {

        load();

    }, []);

    const load = async () => {

        const data = await loadDashboard();

        setStats(data);

    };

    if (!stats) {

        return (

            <DashboardLayout>

                <CircularProgress />

            </DashboardLayout>

        );

    }

    const revenue = stats.payments.reduce(

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

                Admin Dashboard

            </Typography>

            <Grid container spacing={3}>

                <Grid item xs={12} md={4}>
                    <AdminStatCard
                        title="Events"
                        value={stats.events.totalElements}
                    />
                </Grid>

                <Grid item xs={12} md={4}>
                    <AdminStatCard
                        title="Venues"
                        value={stats.venues.length}
                    />
                </Grid>

                <Grid item xs={12} md={4}>
                    <AdminStatCard
                        title="Bookings"
                        value={stats.bookings.length}
                    />
                </Grid>

                <Grid item xs={12} md={4}>
                    <AdminStatCard
                        title="Tickets"
                        value={stats.tickets.length}
                    />
                </Grid>

                <Grid item xs={12} md={4}>
                    <AdminStatCard
                        title="Payments"
                        value={stats.payments.length}
                    />
                </Grid>

                <Grid item xs={12} md={4}>
                    <AdminStatCard
                        title="Revenue"
                        value={`₹${revenue}`}
                    />
                </Grid>

            </Grid>

            <Stack
                direction="row"
                spacing={2}
                mt={5}
            >

                <Button
                    component={Link}
                    to="/admin/events/create"
                    variant="contained"
                >
                    Create Event
                </Button>

                <Button
                    component={Link}
                    to="/admin/venues/create"
                    variant="outlined"
                >
                    Create Venue
                </Button>

            </Stack>

        </DashboardLayout>

    );

};

export default AdminDashboard;