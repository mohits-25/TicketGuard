import { useEffect, useState } from "react";
import { Grid, Typography, Button, Stack, Box, Paper } from "@mui/material";
import { Link } from "react-router-dom";

import DashboardLayout from "../../components/layout/DashboardLayout";
import AdminStatCard from "../../components/admin/AdminStatCard";
import LoadingSpinner from "../../components/LoadingSpinner";
import { loadDashboard } from "../../api/adminDashboardApi";

import EventIcon from "@mui/icons-material/Event";
import LocationCityIcon from "@mui/icons-material/LocationCity";
import ConfirmationNumberIcon from "@mui/icons-material/ConfirmationNumber";
import QrCodeIcon from "@mui/icons-material/QrCode";
import PaymentsIcon from "@mui/icons-material/Payments";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import AddIcon from "@mui/icons-material/Add";

const AdminDashboard = () => {
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        try {
            const data = await loadDashboard();
            setStats(data);
        } catch (err) {
            console.error("Error loading admin dashboard:", err);
        } finally {
            setLoading(false);
        }
    };

    if (loading || !stats) {
        return (
            <DashboardLayout>
                <LoadingSpinner />
            </DashboardLayout>
        );
    }

    const eventsCount = stats.events?.totalElements ?? (Array.isArray(stats.events) ? stats.events.length : 0);
    const venuesCount = stats.venues?.length ?? 0;
    const bookingsCount = stats.bookings?.length ?? 0;
    const ticketsCount = stats.tickets?.length ?? 0;
    const paymentsCount = stats.payments?.length ?? 0;

    const revenue = (stats.payments || []).reduce((sum, payment) => sum + (payment.amount || 0), 0);

    return (
        <DashboardLayout>
            {/* Header Banner */}
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", mb: 5, flexWrap: "wrap", gap: 2 }}>
                <Box>
                    <Typography variant="overline" color="secondary" fontWeight={800} letterSpacing={1.2}>
                        ADMINISTRATION CONTROL
                    </Typography>
                    <Typography variant="h3" fontWeight={800} color="#0F172A">
                        Platform Overview
                    </Typography>
                </Box>

                <Stack direction="row" spacing={2}>
                    <Button
                        component={Link}
                        to="/admin/events/create"
                        variant="contained"
                        startIcon={<AddIcon />}
                        sx={{ borderRadius: 3, fontWeight: 700, px: 3 }}
                    >
                        New Event
                    </Button>
                    <Button
                        component={Link}
                        to="/admin/venues/create"
                        variant="outlined"
                        startIcon={<AddIcon />}
                        sx={{ borderRadius: 3, fontWeight: 700, px: 3 }}
                    >
                        New Venue
                    </Button>
                </Stack>
            </Box>

            {/* Stat Cards Grid */}
            <Grid container spacing={3.5} sx={{ mb: 6 }}>
                <Grid item xs={12} sm={6} md={4}>
                    <AdminStatCard title="Total Events" value={eventsCount} color="#4F46E5" icon={<EventIcon />} />
                </Grid>

                <Grid item xs={12} sm={6} md={4}>
                    <AdminStatCard title="Total Venues" value={venuesCount} color="#7C3AED" icon={<LocationCityIcon />} />
                </Grid>

                <Grid item xs={12} sm={6} md={4}>
                    <AdminStatCard title="Total Bookings" value={bookingsCount} color="#2563EB" icon={<ConfirmationNumberIcon />} />
                </Grid>

                <Grid item xs={12} sm={6} md={4}>
                    <AdminStatCard title="Passes Issued" value={ticketsCount} color="#059669" icon={<QrCodeIcon />} />
                </Grid>

                <Grid item xs={12} sm={6} md={4}>
                    <AdminStatCard title="Transactions" value={paymentsCount} color="#D97706" icon={<PaymentsIcon />} />
                </Grid>

                <Grid item xs={12} sm={6} md={4}>
                    <AdminStatCard
                        title="Platform Revenue"
                        value={`₹${revenue.toLocaleString()}`}
                        color="#10B981"
                        icon={<AccountBalanceWalletIcon />}
                    />
                </Grid>
            </Grid>
        </DashboardLayout>
    );
};

export default AdminDashboard;