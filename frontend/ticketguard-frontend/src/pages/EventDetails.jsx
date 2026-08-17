import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
    Container,
    Grid,
    Box,
    Paper,
    Typography,
    Button,
    Chip,
    Stack,
    Divider,
    LinearProgress
} from "@mui/material";

import MainLayout from "../layouts/MainLayout";
import LoadingSpinner from "../components/LoadingSpinner";
import { getEventById } from "../api/eventApi";

import LocationOnIcon from "@mui/icons-material/LocationOn";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import ConfirmationNumberIcon from "@mui/icons-material/ConfirmationNumber";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const EventDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [event, setEvent] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadEvent();
    }, [id]);

    const loadEvent = async () => {
        try {
            const data = await getEventById(id);
            setEvent(data);
        } catch (error) {
            console.error("Error loading event details:", error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return <LoadingSpinner />;
    }

    if (!event) {
        return (
            <MainLayout>
                <Container maxWidth="lg" sx={{ py: 10, textAlign: "center" }}>
                    <Typography variant="h4" fontWeight={800} color="#0F172A">
                        Event Not Found
                    </Typography>
                    <Button variant="contained" sx={{ mt: 3, borderRadius: 3 }} onClick={() => navigate("/events")}>
                        Back to Events
                    </Button>
                </Container>
            </MainLayout>
        );
    }

    const formattedDate = event.eventDate
        ? new Date(event.eventDate).toLocaleDateString("en-US", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric"
          })
        : "TBA";

    return (
        <MainLayout>
            <Box sx={{ bg: "#F8FAFC", py: 6 }}>
                <Container maxWidth="xl">
                    <Button
                        startIcon={<ArrowBackIcon />}
                        onClick={() => navigate("/events")}
                        sx={{ mb: 3, color: "text.secondary", fontWeight: 700 }}
                    >
                        Back to All Events
                    </Button>

                    <Grid container spacing={4}>
                        {/* Left Main Overview Column */}
                        <Grid item xs={12} md={8}>
                            <Paper
                                elevation={0}
                                sx={{
                                    borderRadius: 6,
                                    overflow: "hidden",
                                    border: "1px solid #E2E8F0",
                                    bgcolor: "#FFFFFF",
                                    mb: 4
                                }}
                            >
                                {/* Event Banner */}
                                <Box sx={{ position: "relative", height: { xs: 260, sm: 380 }, bgcolor: "#0F172A" }}>
                                    {event.imageUrl ? (
                                        <Box
                                            component="img"
                                            src={event.imageUrl}
                                            alt={event.title}
                                            sx={{ width: "100%", height: "100%", objectFit: "cover" }}
                                        />
                                    ) : (
                                        <Box
                                            sx={{
                                                width: "100%",
                                                height: "100%",
                                                background: "linear-gradient(135deg, #0F172A 0%, #1E1B4B 50%, #4F46E5 100%)",
                                                display: "flex",
                                                alignItems: "center",
                                                justifyContent: "center"
                                            }}
                                        >
                                            <ConfirmationNumberIcon sx={{ fontSize: 96, color: "rgba(255, 255, 255, 0.2)" }} />
                                        </Box>
                                    )}

                                    <Stack direction="row" spacing={1} sx={{ position: "absolute", top: 20, left: 20 }}>
                                        {event.category && (
                                            <Chip
                                                label={event.category}
                                                sx={{
                                                    bgcolor: "#4F46E5",
                                                    color: "#FFFFFF",
                                                    fontWeight: 800,
                                                    borderRadius: 3
                                                }}
                                            />
                                        )}
                                        {event.city && (
                                            <Chip
                                                label={event.city}
                                                sx={{
                                                    bgcolor: "rgba(15, 23, 42, 0.8)",
                                                    color: "#FFFFFF",
                                                    fontWeight: 700,
                                                    backdropFilter: "blur(8px)",
                                                    borderRadius: 3
                                                }}
                                            />
                                        )}
                                        {event.status && (
                                            <Chip
                                                label={event.status}
                                                color={event.status === "ACTIVE" || event.status === "UPCOMING" ? "success" : "default"}
                                                sx={{ fontWeight: 800, borderRadius: 3 }}
                                            />
                                        )}
                                    </Stack>
                                </Box>

                                <Box sx={{ p: { xs: 3, sm: 5 } }}>
                                    <Typography variant="h3" fontWeight={800} color="#0F172A" sx={{ mb: 2 }}>
                                        {event.title}
                                    </Typography>

                                    <Stack direction="row" flexWrap="wrap" gap={3} sx={{ mb: 4, py: 2, borderY: "1px solid #F1F5F9" }}>
                                        {event.venueName && (
                                            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                                                <LocationOnIcon sx={{ color: "primary.main" }} />
                                                <Box>
                                                    <Typography variant="caption" color="text.secondary" display="block">
                                                        Venue
                                                    </Typography>
                                                    <Typography variant="subtitle2" fontWeight={700}>
                                                        {event.venueName}
                                                    </Typography>
                                                </Box>
                                            </Box>
                                        )}

                                        {event.eventDate && (
                                            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                                                <CalendarTodayIcon sx={{ color: "secondary.main" }} />
                                                <Box>
                                                    <Typography variant="caption" color="text.secondary" display="block">
                                                        Date
                                                    </Typography>
                                                    <Typography variant="subtitle2" fontWeight={700}>
                                                        {formattedDate}
                                                    </Typography>
                                                </Box>
                                            </Box>
                                        )}

                                        {(event.startTime || event.endTime) && (
                                            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                                                <AccessTimeIcon sx={{ color: "info.main" }} />
                                                <Box>
                                                    <Typography variant="caption" color="text.secondary" display="block">
                                                        Time
                                                    </Typography>
                                                    <Typography variant="subtitle2" fontWeight={700}>
                                                        {event.startTime || "TBA"} - {event.endTime || "TBA"}
                                                    </Typography>
                                                </Box>
                                            </Box>
                                        )}
                                    </Stack>

                                    <Typography variant="h6" fontWeight={700} color="#0F172A" sx={{ mb: 1.5 }}>
                                        About This Event
                                    </Typography>
                                    <Typography variant="body1" color="text.secondary" sx={{ whiteSpace: "pre-line", lineHeight: 1.8, mb: 4 }}>
                                        {event.description || "No description provided for this event."}
                                    </Typography>

                                    <Paper
                                        elevation={0}
                                        sx={{
                                            p: 3,
                                            borderRadius: 4,
                                            bgcolor: "#F8FAFC",
                                            border: "1px solid #E2E8F0",
                                            display: "flex",
                                            alignItems: "center",
                                            gap: 2
                                        }}
                                    >
                                        <VerifiedUserIcon sx={{ fontSize: 32, color: "#10B981" }} />
                                        <Box>
                                            <Typography variant="subtitle2" fontWeight={700} color="#0F172A">
                                                TicketGuard Verified Event Guarantee
                                            </Typography>
                                            <Typography variant="caption" color="text.secondary">
                                                100% Authentic QR Pass Delivery. Full refund protection if cancelled or rescheduled.
                                            </Typography>
                                        </Box>
                                    </Paper>
                                </Box>
                            </Paper>
                        </Grid>

                        {/* Right Sticky Checkout Sidebar */}
                        <Grid item xs={12} md={4}>
                            <Paper
                                elevation={0}
                                sx={{
                                    p: 4,
                                    borderRadius: 6,
                                    border: "1px solid #E2E8F0",
                                    bgcolor: "#FFFFFF",
                                    position: "sticky",
                                    top: 100,
                                    boxShadow: "0 20px 40px -15px rgba(15, 23, 42, 0.08)"
                                }}
                            >
                                <Typography variant="overline" color="text.secondary" fontWeight={800}>
                                    TICKET PRICING
                                </Typography>

                                <Box sx={{ display: "flex", alignItems: "baseline", gap: 1, my: 1 }}>
                                    <Typography variant="h3" fontWeight={800} color="primary.main">
                                        ₹{event.ticketPrice}
                                    </Typography>
                                    <Typography variant="subtitle1" color="text.secondary">
                                        / pass
                                    </Typography>
                                </Box>

                                <Divider sx={{ my: 2.5 }} />

                                <Box sx={{ mb: 3 }}>
                                    <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 1 }}>
                                        <Typography variant="body2" color="text.secondary" fontWeight={600}>
                                            Seats Remaining
                                        </Typography>
                                        <Typography variant="body2" fontWeight={700} color="primary.main">
                                            {event.availableSeats} Left
                                        </Typography>
                                    </Stack>
                                    <LinearProgress
                                        variant="determinate"
                                        value={Math.min(100, Math.max(10, ((event.availableSeats || 50) / 100) * 100))}
                                        sx={{
                                            height: 8,
                                            borderRadius: 4,
                                            bgcolor: "#E2E8F0",
                                            "& .MuiLinearProgress-bar": {
                                                borderRadius: 4,
                                                background: "linear-gradient(135deg, #4F46E5 0%, #7C3AED 100%)"
                                            }
                                        }}
                                    />
                                </Box>

                                <Button
                                    variant="contained"
                                    size="large"
                                    fullWidth
                                    disabled={event.availableSeats <= 0}
                                    onClick={() => navigate(`/booking/${event.id}`)}
                                    sx={{
                                        py: 1.6,
                                        borderRadius: 3.5,
                                        fontWeight: 800,
                                        fontSize: "1.05rem",
                                        boxShadow: "0 8px 24px rgba(79, 70, 229, 0.35)"
                                    }}
                                >
                                    {event.availableSeats > 0 ? "Select Passes & Book" : "Sold Out"}
                                </Button>

                                <Typography variant="caption" textAlign="center" color="text.secondary" display="block" sx={{ mt: 2 }}>
                                    🔒 Instant Mobile Delivery & SSL Checkout
                                </Typography>
                            </Paper>
                        </Grid>
                    </Grid>
                </Container>
            </Box>
        </MainLayout>
    );
};

export default EventDetails;