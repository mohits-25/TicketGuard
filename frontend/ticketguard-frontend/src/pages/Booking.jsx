import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
    Box,
    Button,
    Container,
    Paper,
    Typography,
    Alert,
    Stack,
    IconButton,
    Divider,
    Stepper,
    Step,
    StepLabel
} from "@mui/material";

import MainLayout from "../layouts/MainLayout";
import LoadingSpinner from "../components/LoadingSpinner";
import { getEventById } from "../api/eventApi";
import { createBooking } from "../api/bookingApi";

import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import LockIcon from "@mui/icons-material/Lock";
import ConfirmationNumberIcon from "@mui/icons-material/ConfirmationNumber";

const Booking = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [event, setEvent] = useState(null);
    const [tickets, setTickets] = useState(1);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        loadEvent();
    }, [id]);

    const loadEvent = async () => {
        try {
            const response = await getEventById(id);
            setEvent(response);
        } catch (err) {
            console.error("Error loading event for booking:", err);
        }
    };

    const handleBooking = async () => {
        try {
            setLoading(true);
            setError("");

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
            setError(err.response?.data?.message || "Failed to initialize booking. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    if (!event) {
        return <LoadingSpinner />;
    }

    const pricePerTicket = event.ticketPrice || 0;
    const totalAmount = tickets * pricePerTicket;

    return (
        <MainLayout>
            <Box sx={{ bgcolor: "#F8FAFC", py: 8, minHeight: "calc(100vh - 180px)" }}>
                <Container maxWidth="sm">
                    {/* Step Progress Bar */}
                    <Box sx={{ mb: 5 }}>
                        <Stepper activeStep={0} alternativeLabel>
                            <Step key="Select Passes">
                                <StepLabel>Select Passes</StepLabel>
                            </Step>
                            <Step key="Checkout Payment">
                                <StepLabel>Payment</StepLabel>
                            </Step>
                            <Step key="Get QR Pass">
                                <StepLabel>Pass Issued</StepLabel>
                            </Step>
                        </Stepper>
                    </Box>

                    <Paper
                        elevation={0}
                        sx={{
                            p: { xs: 3.5, sm: 5 },
                            borderRadius: 6,
                            bgcolor: "#FFFFFF",
                            border: "1px solid #E2E8F0",
                            boxShadow: "0 20px 40px -15px rgba(15, 23, 42, 0.08)"
                        }}
                    >
                        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 2 }}>
                            <Box
                                sx={{
                                    p: 1,
                                    borderRadius: 3,
                                    bgcolor: "#EEF2FF",
                                    color: "#4F46E5"
                                }}
                            >
                                <ConfirmationNumberIcon />
                            </Box>
                            <Typography variant="overline" color="primary" fontWeight={800} letterSpacing={1}>
                                SECURE BOOKING
                            </Typography>
                        </Box>

                        <Typography variant="h4" fontWeight={800} color="#0F172A" sx={{ mb: 1 }}>
                            {event.title}
                        </Typography>

                        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                            📍 {event.venueName || "Venue TBA"} • {event.city || "Online"}
                        </Typography>

                        <Divider sx={{ my: 3 }} />

                        {error && (
                            <Alert severity="error" sx={{ mb: 3, borderRadius: 3 }}>
                                {error}
                            </Alert>
                        )}

                        {/* Quantity Counter Box */}
                        <Box sx={{ mb: 4 }}>
                            <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
                                <Box>
                                    <Typography variant="subtitle1" fontWeight={700} color="#0F172A">
                                        Quantity of Passes
                                    </Typography>
                                    <Typography variant="caption" color="text.secondary">
                                        Max seats available: {event.availableSeats}
                                    </Typography>
                                </Box>

                                {/* Inc / Dec Buttons */}
                                <Paper
                                    elevation={0}
                                    sx={{
                                        display: "flex",
                                        alignItems: "center",
                                        gap: 1.5,
                                        p: 0.8,
                                        borderRadius: 4,
                                        border: "1px solid #CBD5E1",
                                        bgcolor: "#F8FAFC"
                                    }}
                                >
                                    <IconButton
                                        size="small"
                                        disabled={tickets <= 1}
                                        onClick={() => setTickets(Math.max(1, tickets - 1))}
                                        sx={{ bgcolor: "#FFFFFF", border: "1px solid #E2E8F0" }}
                                    >
                                        <RemoveIcon fontSize="small" />
                                    </IconButton>
                                    <Typography variant="h6" fontWeight={800} sx={{ minWidth: 24, textAlign: "center" }}>
                                        {tickets}
                                    </Typography>
                                    <IconButton
                                        size="small"
                                        disabled={tickets >= (event.availableSeats || 10)}
                                        onClick={() => setTickets(tickets + 1)}
                                        sx={{ bgcolor: "#FFFFFF", border: "1px solid #E2E8F0" }}
                                    >
                                        <AddIcon fontSize="small" />
                                    </IconButton>
                                </Paper>
                            </Stack>
                        </Box>

                        {/* Price Calculation Summary */}
                        <Paper
                            elevation={0}
                            sx={{
                                p: 3,
                                borderRadius: 4,
                                bgcolor: "#F8FAFC",
                                border: "1px solid #E2E8F0",
                                mb: 4
                            }}
                        >
                            <Stack spacing={1.5}>
                                <Stack direction="row" justifyContent="space-between">
                                    <Typography variant="body2" color="text.secondary">
                                        Price per ticket
                                    </Typography>
                                    <Typography variant="body2" fontWeight={700}>
                                        ₹{pricePerTicket}
                                    </Typography>
                                </Stack>
                                <Stack direction="row" justifyContent="space-between">
                                    <Typography variant="body2" color="text.secondary">
                                        Selected passes
                                    </Typography>
                                    <Typography variant="body2" fontWeight={700}>
                                        x {tickets}
                                    </Typography>
                                </Stack>
                                <Divider sx={{ my: 1 }} />
                                <Stack direction="row" justifyContent="space-between" alignItems="baseline">
                                    <Typography variant="subtitle1" fontWeight={800} color="#0F172A">
                                        Total Amount
                                    </Typography>
                                    <Typography variant="h4" fontWeight={800} color="primary.main">
                                        ₹{totalAmount}
                                    </Typography>
                                </Stack>
                            </Stack>
                        </Paper>

                        <Button
                            fullWidth
                            variant="contained"
                            size="large"
                            disabled={loading || event.availableSeats <= 0}
                            onClick={handleBooking}
                            startIcon={<LockIcon />}
                            sx={{
                                py: 1.6,
                                borderRadius: 3.5,
                                fontWeight: 800,
                                fontSize: "1.05rem",
                                boxShadow: "0 8px 24px rgba(79, 70, 229, 0.35)"
                            }}
                        >
                            {loading ? "Initializing Booking..." : "Proceed to Payment"}
                        </Button>

                        <Typography textAlign="center" variant="caption" color="text.secondary" display="block" sx={{ mt: 2.5 }}>
                            🔒 Encrypted transaction with Instant Digital Pass Reservation
                        </Typography>
                    </Paper>
                </Container>
            </Box>
        </MainLayout>
    );
};

export default Booking;