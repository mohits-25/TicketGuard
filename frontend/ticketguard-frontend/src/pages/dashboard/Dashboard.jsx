import { useEffect, useState } from "react";
import { Grid, Typography, Box, Paper, Button, Stack, Avatar } from "@mui/material";
import { Link } from "react-router-dom";
import DashboardLayout from "../../components/layout/DashboardLayout";
import StatCard from "../../components/dashboard/StatCard";
import LoadingSpinner from "../../components/LoadingSpinner";

import { getMyBookings } from "../../api/bookingApi";
import { getMyPayments } from "../../api/paymentApi";
import { getMyTickets } from "../../api/ticketApi";
import { useAuth } from "../../context/AuthContext";

import ConfirmationNumberIcon from "@mui/icons-material/ConfirmationNumber";
import PaymentsIcon from "@mui/icons-material/Payments";
import TicketIcon from "@mui/icons-material/ConfirmationNumberOutlined";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ExploreIcon from "@mui/icons-material/Explore";

const Dashboard = () => {
    const { user } = useAuth();
    const [bookings, setBookings] = useState([]);
    const [payments, setPayments] = useState([]);
    const [tickets, setTickets] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadDashboard();
    }, []);

    const loadDashboard = async () => {
        try {
            const [bookingsData, paymentsData, ticketsData] = await Promise.all([
                getMyBookings(),
                getMyPayments(),
                getMyTickets()
            ]);

            setBookings(Array.isArray(bookingsData) ? bookingsData : (bookingsData?.content || []));
            setPayments(Array.isArray(paymentsData) ? paymentsData : (paymentsData?.content || []));
            setTickets(Array.isArray(ticketsData) ? ticketsData : (ticketsData?.content || []));
        } catch (err) {
            console.error("Error loading customer dashboard:", err);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <DashboardLayout>
                <LoadingSpinner />
            </DashboardLayout>
        );
    }

    const totalSpent = payments.reduce((sum, payment) => sum + (payment.amount || 0), 0);
    const firstName = user?.firstName || user?.email?.split("@")[0] || "User";

    return (
        <DashboardLayout>
            {/* Header Greeting Banner */}
            <Paper
                elevation={0}
                sx={{
                    p: { xs: 3, sm: 4.5 },
                    mb: 5,
                    borderRadius: 6,
                    background: "linear-gradient(135deg, #0F172A 0%, #1E1B4B 60%, #312E81 100%)",
                    color: "#FFFFFF",
                    display: "flex",
                    flexDirection: { xs: "column", sm: "row" },
                    justifyContent: "space-between",
                    alignItems: { xs: "flex-start", sm: "center" },
                    gap: 3,
                    boxShadow: "0 20px 40px -15px rgba(15, 23, 42, 0.2)"
                }}
            >
                <Stack direction="row" spacing={2.5} alignItems="center">
                    <Avatar
                        sx={{
                            width: 60,
                            height: 60,
                            bgcolor: "#4F46E5",
                            fontWeight: 800,
                            fontSize: "1.5rem",
                            boxShadow: "0 8px 20px rgba(79, 70, 229, 0.4)"
                        }}
                    >
                        {firstName[0].toUpperCase()}
                    </Avatar>
                    <Box>
                        <Typography variant="h4" fontWeight={800}>
                            Welcome Back, {firstName}! 👋
                        </Typography>
                        <Typography variant="body2" sx={{ color: "#CBD5E1", mt: 0.5 }}>
                            Manage your digital passes, view booking receipts, and explore trending live events.
                        </Typography>
                    </Box>
                </Stack>

                <Button
                    component={Link}
                    to="/events"
                    variant="contained"
                    startIcon={<ExploreIcon />}
                    sx={{
                        bgcolor: "#FFFFFF",
                        color: "#4F46E5",
                        fontWeight: 800,
                        px: 3,
                        py: 1.2,
                        borderRadius: 3,
                        "&:hover": { bgcolor: "#F1F5F9" }
                    }}
                >
                    Discover Events
                </Button>
            </Paper>

            {/* Metrics Overview Grid */}
            <Typography variant="h6" fontWeight={800} color="#0F172A" sx={{ mb: 2.5 }}>
                Account Statistics
            </Typography>

            <Grid container spacing={3} sx={{ mb: 6 }}>
                <Grid item xs={12} sm={4}>
                    <StatCard
                        title="Active Bookings"
                        value={bookings.length}
                        color="#4F46E5"
                        icon={<ConfirmationNumberIcon />}
                        subtitle="Total reservations created"
                    />
                </Grid>
                <Grid item xs={12} sm={4}>
                    <StatCard
                        title="Total Investment"
                        value={`₹${totalSpent.toLocaleString()}`}
                        color="#10B981"
                        icon={<PaymentsIcon />}
                        subtitle="Verified transaction payments"
                    />
                </Grid>
                <Grid item xs={12} sm={4}>
                    <StatCard
                        title="Passes Issued"
                        value={tickets.length}
                        color="#7C3AED"
                        icon={<TicketIcon />}
                        subtitle="QR Passes in your wallet"
                    />
                </Grid>
            </Grid>

            {/* Quick Navigation Cards */}
            <Typography variant="h6" fontWeight={800} color="#0F172A" sx={{ mb: 2.5 }}>
                Quick Access
            </Typography>

            <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                    <Paper
                        elevation={0}
                        sx={{
                            p: 3.5,
                            borderRadius: 5,
                            bgcolor: "#FFFFFF",
                            border: "1px solid #E2E8F0",
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center"
                        }}
                    >
                        <Box>
                            <Typography variant="h6" fontWeight={800} color="#0F172A">
                                Pass Wallet
                            </Typography>
                            <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                                View and download your QR tickets as PDF files.
                            </Typography>
                        </Box>
                        <Button
                            component={Link}
                            to="/tickets"
                            variant="outlined"
                            endIcon={<ArrowForwardIcon />}
                            sx={{ borderRadius: 3, fontWeight: 700 }}
                        >
                            View Passes
                        </Button>
                    </Paper>
                </Grid>

                <Grid item xs={12} sm={6}>
                    <Paper
                        elevation={0}
                        sx={{
                            p: 3.5,
                            borderRadius: 5,
                            bgcolor: "#FFFFFF",
                            border: "1px solid #E2E8F0",
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center"
                        }}
                    >
                        <Box>
                            <Typography variant="h6" fontWeight={800} color="#0F172A">
                                Booking History
                            </Typography>
                            <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                                Review reservation statuses and payment details.
                            </Typography>
                        </Box>
                        <Button
                            component={Link}
                            to="/dashboard/bookings"
                            variant="outlined"
                            endIcon={<ArrowForwardIcon />}
                            sx={{ borderRadius: 3, fontWeight: 700 }}
                        >
                            History
                        </Button>
                    </Paper>
                </Grid>
            </Grid>
        </DashboardLayout>
    );
};

export default Dashboard;