import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import {
    Container,
    Grid,
    Typography,
    Box,
    TextField,
    InputAdornment,
    Chip,
    Stack,
    Paper,
    Button
} from "@mui/material";

import MainLayout from "../layouts/MainLayout";
import EventCard from "../components/EventCard";
import LoadingSpinner from "../components/LoadingSpinner";
import { getAllEvents } from "../api/eventApi";

import SearchIcon from "@mui/icons-material/Search";
import FilterListIcon from "@mui/icons-material/FilterList";
import EventBusyIcon from "@mui/icons-material/EventBusy";

const categories = ["All", "Concerts", "Sports", "Comedy", "Festival", "Conference"];

const Events = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const initialQuery = searchParams.get("search") || "";

    const [events, setEvents] = useState([]);
    const [filteredEvents, setFilteredEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState(initialQuery);
    const [selectedCategory, setSelectedCategory] = useState("All");

    useEffect(() => {
        loadEvents();
    }, []);

    useEffect(() => {
        filterEvents();
    }, [searchTerm, selectedCategory, events]);

    const loadEvents = async () => {
        try {
            const data = await getAllEvents();
            console.log("Events response data:", data);
            const list = Array.isArray(data) ? data : (data.content || []);
            setEvents(list);
            setFilteredEvents(list);
        } catch (error) {
            console.error("Error fetching events:", error);
            setEvents([]);
            setFilteredEvents([]);
        } finally {
            setLoading(false);
        }
    };

    const filterEvents = () => {
        let result = [...events];

        if (searchTerm.trim()) {
            const term = searchTerm.toLowerCase();
            result = result.filter(
                (e) =>
                    (e.title && e.title.toLowerCase().includes(term)) ||
                    (e.venueName && e.venueName.toLowerCase().includes(term)) ||
                    (e.category && e.category.toLowerCase().includes(term))
            );
        }

        if (selectedCategory !== "All") {
            result = result.filter(
                (e) => e.category && e.category.toLowerCase().includes(selectedCategory.toLowerCase())
            );
        }

        setFilteredEvents(result);
    };

    if (loading) {
        return <LoadingSpinner />;
    }

    return (
        <MainLayout>
            {/* Header Title & Filter Bar */}
            <Box
                sx={{
                    bgcolor: "#0F172A",
                    color: "#FFFFFF",
                    py: 8,
                    borderBottom: "1px solid #1E293B",
                    backgroundImage: "radial-gradient(circle at 50% 0%, rgba(79, 70, 229, 0.25) 0%, transparent 70%)"
                }}
            >
                <Container maxWidth="xl">
                    <Box sx={{ maxWidth: 720, mb: 4 }}>
                        <Typography variant="overline" color="primary" fontWeight={800} letterSpacing={1.2}>
                            EXPLORE & BOOK
                        </Typography>
                        <Typography variant="h2" fontWeight={800} sx={{ mb: 2 }}>
                            Explore Live Events
                        </Typography>
                        <Typography variant="body1" color="#94A3B8">
                            Discover upcoming concerts, sports games, comedy shows, and exclusive passes with 100% verified QR digital ticketing.
                        </Typography>
                    </Box>

                    {/* Search Field & Category Chips Bar */}
                    <Paper
                        elevation={0}
                        sx={{
                            p: 2.5,
                            borderRadius: 4,
                            bgcolor: "rgba(255, 255, 255, 0.05)",
                            backdropFilter: "blur(12px)",
                            border: "1px solid rgba(255, 255, 255, 0.12)"
                        }}
                    >
                        <Grid container spacing={2} alignItems="center">
                            <Grid item xs={12} md={5}>
                                <TextField
                                    placeholder="Search by event title or venue..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    size="small"
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <SearchIcon sx={{ color: "#94A3B8" }} />
                                            </InputAdornment>
                                        )
                                    }}
                                    sx={{
                                        "& .MuiOutlinedInput-root": {
                                            bgcolor: "#0F172A",
                                            color: "#FFFFFF",
                                            borderRadius: 3,
                                            "& fieldset": { borderColor: "#334155" },
                                            "&:hover fieldset": { borderColor: "#4F46E5" }
                                        }
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12} md={7}>
                                <Stack direction="row" spacing={1} overflow="auto" pb={{ xs: 1, md: 0 }}>
                                    {categories.map((cat) => (
                                        <Chip
                                            key={cat}
                                            label={cat}
                                            onClick={() => setSelectedCategory(cat)}
                                            sx={{
                                                fontWeight: 700,
                                                borderRadius: 3,
                                                px: 1,
                                                bgcolor: selectedCategory === cat ? "#4F46E5" : "rgba(255, 255, 255, 0.08)",
                                                color: selectedCategory === cat ? "#FFFFFF" : "#CBD5E1",
                                                "&:hover": {
                                                    bgcolor: selectedCategory === cat ? "#4338CA" : "rgba(255, 255, 255, 0.16)"
                                                }
                                            }}
                                        />
                                    ))}
                                </Stack>
                            </Grid>
                        </Grid>
                    </Paper>
                </Container>
            </Box>

            {/* Events Grid Section */}
            <Container maxWidth="xl" sx={{ py: 8 }}>
                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 4 }}>
                    <Typography variant="h5" fontWeight={800} color="#0F172A">
                        Showing {filteredEvents.length} {filteredEvents.length === 1 ? "Event" : "Events"}
                    </Typography>
                    {searchTerm && (
                        <Button
                            variant="text"
                            color="secondary"
                            onClick={() => {
                                setSearchTerm("");
                                setSelectedCategory("All");
                            }}
                            sx={{ fontWeight: 700 }}
                        >
                            Clear Filters
                        </Button>
                    )}
                </Box>

                {filteredEvents.length === 0 ? (
                    <Paper
                        elevation={0}
                        sx={{
                            p: 8,
                            textAlign: "center",
                            borderRadius: 6,
                            bgcolor: "#FFFFFF",
                            border: "1px dashed #CBD5E1"
                        }}
                    >
                        <EventBusyIcon sx={{ fontSize: 64, color: "#94A3B8", mb: 2 }} />
                        <Typography variant="h5" fontWeight={800} color="#0F172A" sx={{ mb: 1 }}>
                            No events found
                        </Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                            Try modifying your search keywords or switching category filters.
                        </Typography>
                        <Button
                            variant="contained"
                            onClick={() => {
                                setSearchTerm("");
                                setSelectedCategory("All");
                            }}
                            sx={{ borderRadius: 3, fontWeight: 700 }}
                        >
                            Reset Search
                        </Button>
                    </Paper>
                ) : (
                    <Grid container spacing={3.5}>
                        {filteredEvents.map((event) => (
                            <Grid item xs={12} md={6} lg={4} key={event.id}>
                                <EventCard event={event} />
                            </Grid>
                        ))}
                    </Grid>
                )}
            </Container>
        </MainLayout>
    );
};

export default Events;