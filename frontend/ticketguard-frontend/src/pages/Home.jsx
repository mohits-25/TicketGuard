import { useEffect, useState } from "react";
import { Container, Typography, Box, Grid, Card, CardContent, Button, Stack, Paper, Skeleton } from "@mui/material";
import { Link } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Hero from "../components/Hero";
import EventCard from "../components/EventCard";
import { getAllEvents } from "../api/eventApi";

import SecurityIcon from "@mui/icons-material/Security";
import QrCodeScannerIcon from "@mui/icons-material/QrCodeScanner";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

const Home = () => {
    const [featuredEvents, setFeaturedEvents] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadFeaturedEvents();
    }, []);

    const loadFeaturedEvents = async () => {
        try {
            const data = await getAllEvents();
            const list = Array.isArray(data) ? data : (data.content || []);
            setFeaturedEvents(list.slice(0, 3));
        } catch (error) {
            console.error("Error loading featured events:", error);
        } finally {
            setLoading(false);
        }
    };

    const features = [
        {
            icon: <SecurityIcon sx={{ fontSize: 36, color: "#4F46E5" }} />,
            title: "Fraud-Proof Verification",
            description: "Every ticket is cryptographically signed with unique QR validation to eliminate duplicate passes."
        },
        {
            icon: <QrCodeScannerIcon sx={{ fontSize: 36, color: "#7C3AED" }} />,
            title: "Instant Mobile Entry",
            description: "No printing required. Scan your digital ticket QR code directly from your smartphone at the gate."
        },
        {
            icon: <MonetizationOnIcon sx={{ fontSize: 36, color: "#10B981" }} />,
            title: "100% Refund Protection",
            description: "Full refund guarantee if an event is canceled or rescheduled, transferred safely without hassle."
        },
        {
            icon: <SupportAgentIcon sx={{ fontSize: 36, color: "#F59E0B" }} />,
            title: "24/7 Fan Support",
            description: "Our dedicated support team is available round the clock to ensure seamless entry to your event."
        }
    ];

    return (
        <MainLayout>
            <Hero />

            {/* Featured Events Section */}
            <Box sx={{ py: 10, bgcolor: "#F8FAFC" }}>
                <Container maxWidth="xl">
                    <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", mb: 5 }}>
                        <Box>
                            <Typography variant="overline" color="primary" fontWeight={800} letterSpacing={1.2}>
                                TRENDING PASSES
                            </Typography>
                            <Typography variant="h3" fontWeight={800} color="#0F172A">
                                Featured Events
                            </Typography>
                        </Box>
                        <Button
                            component={Link}
                            to="/events"
                            variant="outlined"
                            color="primary"
                            endIcon={<ArrowForwardIcon />}
                            sx={{ borderRadius: 3, fontWeight: 700 }}
                        >
                            View All Events
                        </Button>
                    </Box>

                    <Grid container spacing={3.5}>
                        {loading
                            ? [1, 2, 3].map((n) => (
                                  <Grid item xs={12} md={4} key={n}>
                                      <Skeleton variant="rounded" height={380} sx={{ borderRadius: 5 }} />
                                  </Grid>
                              ))
                            : featuredEvents.map((event) => (
                                  <Grid item xs={12} md={4} key={event.id}>
                                      <EventCard event={event} />
                                  </Grid>
                              ))}
                    </Grid>
                </Container>
            </Box>

            {/* Why TicketGuard Feature Grid */}
            <Box sx={{ py: 10, bgcolor: "#FFFFFF", borderTop: "1px solid #E2E8F0" }}>
                <Container maxWidth="lg">
                    <Box sx={{ textAlign: "center", mb: 8, maxWidth: 640, mx: "auto" }}>
                        <Typography variant="overline" color="secondary" fontWeight={800} letterSpacing={1.2}>
                            THE TICKETGUARD ADVANTAGE
                        </Typography>
                        <Typography variant="h3" fontWeight={800} color="#0F172A" sx={{ mt: 1, mb: 2 }}>
                            Built for Modern Fans
                        </Typography>
                        <Typography variant="body1" color="text.secondary">
                            Experience the safest, fastest, and most intuitive event booking system engineered for absolute peace of mind.
                        </Typography>
                    </Box>

                    <Grid container spacing={4}>
                        {features.map((f, idx) => (
                            <Grid item xs={12} sm={6} md={3} key={idx}>
                                <Paper
                                    elevation={0}
                                    sx={{
                                        p: 4,
                                        height: "100%",
                                        borderRadius: 5,
                                        bgcolor: "#F8FAFC",
                                        border: "1px solid #E2E8F0",
                                        transition: "all 0.3s ease",
                                        "&:hover": {
                                            bgcolor: "#FFFFFF",
                                            boxShadow: "0 20px 30px rgba(0,0,0,0.06)",
                                            transform: "translateY(-4px)"
                                        }
                                    }}
                                >
                                    <Box sx={{ mb: 2 }}>{f.icon}</Box>
                                    <Typography variant="h6" fontWeight={700} color="#0F172A" sx={{ mb: 1 }}>
                                        {f.title}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.6 }}>
                                        {f.description}
                                    </Typography>
                                </Paper>
                            </Grid>
                        ))}
                    </Grid>
                </Container>
            </Box>

            {/* Call to Action Banner */}
            <Container maxWidth="xl" sx={{ my: 8 }}>
                <Paper
                    sx={{
                        p: { xs: 5, md: 8 },
                        borderRadius: 6,
                        background: "linear-gradient(135deg, #0F172A 0%, #1E1B4B 50%, #312E81 100%)",
                        color: "#FFFFFF",
                        position: "relative",
                        overflow: "hidden",
                        boxShadow: "0 20px 40px rgba(15, 23, 42, 0.2)"
                    }}
                >
                    <Grid container spacing={4} alignItems="center">
                        <Grid item xs={12} md={8}>
                            <Typography variant="h3" fontWeight={800} sx={{ mb: 2 }}>
                                Ready to Experience Your Next Live Event?
                            </Typography>
                            <Typography variant="h6" sx={{ color: "#CBD5E1", fontWeight: 400, maxWidth: 600 }}>
                                Join thousands of fans booking seamless, verified passes every single day.
                            </Typography>
                        </Grid>
                        <Grid item xs={12} md={4} sx={{ textAlign: { xs: "left", md: "right" } }}>
                            <Button
                                component={Link}
                                to="/events"
                                variant="contained"
                                size="large"
                                sx={{
                                    bgcolor: "#FFFFFF",
                                    color: "#4F46E5",
                                    fontWeight: 800,
                                    px: 4,
                                    py: 1.5,
                                    borderRadius: 3,
                                    fontSize: "1rem",
                                    "&:hover": {
                                        bgcolor: "#F1F5F9"
                                    }
                                }}
                            >
                                Get Passes Now
                            </Button>
                        </Grid>
                    </Grid>
                </Paper>
            </Container>
        </MainLayout>
    );
};

export default Home;