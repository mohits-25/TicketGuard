import { Box, Typography, Button, Container, Stack, Chip, InputBase, Paper, Grid } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import ConfirmationNumberIcon from "@mui/icons-material/ConfirmationNumber";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import FlashOnIcon from "@mui/icons-material/FlashOn";
import StarIcon from "@mui/icons-material/Star";
import MusicNoteIcon from "@mui/icons-material/MusicNote";
import SportsSoccerIcon from "@mui/icons-material/SportsSoccer";
import TheaterComedyIcon from "@mui/icons-material/TheaterComedy";

const Hero = () => {
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState("");

    const handleSearch = (e) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            navigate(`/events?search=${encodeURIComponent(searchQuery)}`);
        } else {
            navigate("/events");
        }
    };

    return (
        <Box
            sx={{
                position: "relative",
                bgcolor: "#0F172A",
                color: "#FFFFFF",
                pt: { xs: 8, md: 12 },
                pb: { xs: 10, md: 14 },
                overflow: "hidden",
                backgroundImage: "radial-gradient(ellipse 80% 50% at 50% -20%, rgba(79, 70, 229, 0.35) 0%, rgba(15, 23, 42, 0) 100%), radial-gradient(circle at 90% 80%, rgba(124, 58, 237, 0.2) 0%, transparent 50%)"
            }}
        >
            <Container maxWidth="lg">
                <Box sx={{ textAlign: "center", maxWidth: 860, mx: "auto", position: "relative", zIndex: 2 }}>
                    {/* Badge */}
                    <Chip
                        icon={<FlashOnIcon sx={{ color: "#F59E0B !important", fontSize: "16px !important" }} />}
                        label="Next-Gen Verified Ticketing Platform"
                        sx={{
                            bgcolor: "rgba(255, 255, 255, 0.08)",
                            color: "#E2E8F0",
                            fontWeight: 700,
                            fontSize: "0.82rem",
                            px: 1.5,
                            py: 0.5,
                            mb: 3,
                            border: "1px solid rgba(255, 255, 255, 0.15)",
                            backdropFilter: "blur(8px)"
                        }}
                    />

                    {/* Headline */}
                    <Typography
                        variant="h1"
                        sx={{
                            fontSize: { xs: "2.5rem", sm: "3.5rem", md: "4.2rem" },
                            fontWeight: 800,
                            lineHeight: 1.1,
                            letterSpacing: "-0.03em",
                            mb: 3
                        }}
                    >
                        Discover & Book <br />
                        <Box
                            component="span"
                            sx={{
                                background: "linear-gradient(135deg, #818CF8 0%, #C084FC 50%, #38BDF8 100%)",
                                WebkitBackgroundClip: "text",
                                WebkitTextFillColor: "transparent"
                            }}
                        >
                            Unforgettable Events
                        </Box>
                    </Typography>

                    {/* Subtitle */}
                    <Typography
                        variant="h6"
                        sx={{
                            color: "#94A3B8",
                            fontWeight: 400,
                            maxWidth: 680,
                            mx: "auto",
                            mb: 5,
                            lineHeight: 1.6,
                            fontSize: { xs: "1rem", sm: "1.2rem" }
                        }}
                    >
                        Instant QR digital passes, guaranteed seat reservations, and zero-fraud protection for concerts, live sports, comedy shows, and exclusive festivals.
                    </Typography>

                    {/* Search Bar */}
                    <Paper
                        component="form"
                        onSubmit={handleSearch}
                        elevation={0}
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            p: 0.8,
                            pl: 2.5,
                            borderRadius: 6,
                            maxWidth: 640,
                            mx: "auto",
                            mb: 4,
                            bgcolor: "rgba(255, 255, 255, 0.95)",
                            boxShadow: "0 20px 40px rgba(0, 0, 0, 0.3)",
                            border: "1px solid rgba(255, 255, 255, 0.2)"
                        }}
                    >
                        <SearchIcon sx={{ color: "#64748B", mr: 1.5, fontSize: 24 }} />
                        <InputBase
                            placeholder="Search by artist, concert, sport or venue..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            sx={{ flex: 1, color: "#0F172A", fontWeight: 500, fontSize: "1rem" }}
                        />
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            size="large"
                            sx={{
                                borderRadius: 4,
                                px: 3.5,
                                py: 1.2,
                                fontWeight: 700,
                                textTransform: "none",
                                boxShadow: "0 8px 20px rgba(79, 70, 229, 0.4)"
                            }}
                        >
                            Explore
                        </Button>
                    </Paper>

                    {/* Quick Category Chips */}
                    <Stack direction="row" spacing={1.5} justifyContent="center" flexWrap="wrap" useFlexGap sx={{ mb: 8 }}>
                        <Typography variant="body2" sx={{ color: "#64748B", alignSelf: "center", mr: 1 }}>
                            Popular:
                        </Typography>
                        <Chip
                            icon={<MusicNoteIcon sx={{ fontSize: 16 }} />}
                            label="Concerts"
                            component={Link}
                            to="/events"
                            clickable
                            sx={{ bgcolor: "rgba(255, 255, 255, 0.06)", color: "#CBD5E1", "&:hover": { bgcolor: "rgba(255, 255, 255, 0.15)" } }}
                        />
                        <Chip
                            icon={<SportsSoccerIcon sx={{ fontSize: 16 }} />}
                            label="Sports"
                            component={Link}
                            to="/events"
                            clickable
                            sx={{ bgcolor: "rgba(255, 255, 255, 0.06)", color: "#CBD5E1", "&:hover": { bgcolor: "rgba(255, 255, 255, 0.15)" } }}
                        />
                        <Chip
                            icon={<TheaterComedyIcon sx={{ fontSize: 16 }} />}
                            label="Comedy"
                            component={Link}
                            to="/events"
                            clickable
                            sx={{ bgcolor: "rgba(255, 255, 255, 0.06)", color: "#CBD5E1", "&:hover": { bgcolor: "rgba(255, 255, 255, 0.15)" } }}
                        />
                    </Stack>

                    {/* Live Stats Strip */}
                    <Grid container spacing={3} sx={{ pt: 4, borderTop: "1px solid rgba(255, 255, 255, 0.1)" }}>
                        <Grid item xs={6} md={3}>
                            <Typography variant="h4" fontWeight={800} color="#FFFFFF">
                                100K+
                            </Typography>
                            <Typography variant="body2" color="#94A3B8">
                                Tickets Delivered
                            </Typography>
                        </Grid>
                        <Grid item xs={6} md={3}>
                            <Typography variant="h4" fontWeight={800} color="#FFFFFF">
                                99.9%
                            </Typography>
                            <Typography variant="body2" color="#94A3B8">
                                Verified Authenticity
                            </Typography>
                        </Grid>
                        <Grid item xs={6} md={3}>
                            <Typography variant="h4" fontWeight={800} color="#FFFFFF">
                                500+
                            </Typography>
                            <Typography variant="body2" color="#94A3B8">
                                Partner Venues
                            </Typography>
                        </Grid>
                        <Grid item xs={6} md={3}>
                            <Stack direction="row" spacing={0.5} justifyContent="center" alignItems="center" sx={{ mb: 0.5 }}>
                                <Typography variant="h4" fontWeight={800} color="#FFFFFF">
                                    4.9
                                </Typography>
                                <StarIcon sx={{ color: "#F59E0B", fontSize: 24 }} />
                            </Stack>
                            <Typography variant="body2" color="#94A3B8">
                                Fan Rating
                            </Typography>
                        </Grid>
                    </Grid>
                </Box>
            </Container>
        </Box>
    );
};

export default Hero;