import { useEffect, useState } from "react";
import {
    Container,
    Grid,
    Typography,
    Box,
    Paper,
    Button,
    Chip,
    Stack,
    Divider,
    IconButton,
    Skeleton
} from "@mui/material";

import MainLayout from "../layouts/MainLayout";
import { getMyTickets, downloadTicket } from "../api/ticketApi";

import ConfirmationNumberIcon from "@mui/icons-material/ConfirmationNumber";
import QrCode2Icon from "@mui/icons-material/QrCode2";
import DownloadIcon from "@mui/icons-material/Download";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";

const Tickets = () => {
    const [tickets, setTickets] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadTickets();
    }, []);

    const loadTickets = async () => {
        try {
            const data = await getMyTickets();
            setTickets(Array.isArray(data) ? data : (data.content || []));
        } catch (err) {
            console.error("Error fetching tickets:", err);
            setTickets([]);
        } finally {
            setLoading(false);
        }
    };

    const handleDownload = async (ticketId) => {
        try {
            await downloadTicket(ticketId);
        } catch (err) {
            console.error("Error downloading ticket:", err);
        }
    };

    return (
        <MainLayout>
            <Box sx={{ bgcolor: "#F8FAFC", py: 8, minHeight: "calc(100vh - 180px)" }}>
                <Container maxWidth="xl">
                    <Box sx={{ mb: 6 }}>
                        <Typography variant="overline" color="primary" fontWeight={800} letterSpacing={1.2}>
                            PASS WALLET
                        </Typography>
                        <Typography variant="h2" fontWeight={800} color="#0F172A">
                            My Digital Passes
                        </Typography>
                        <Typography variant="body1" color="text.secondary" sx={{ mt: 0.5 }}>
                            Access, present, and download your cryptographically verified event tickets.
                        </Typography>
                    </Box>

                    {loading ? (
                        <Grid container spacing={3.5}>
                            {[1, 2, 3].map((n) => (
                                <Grid item xs={12} md={6} lg={4} key={n}>
                                    <Skeleton variant="rounded" height={260} sx={{ borderRadius: 5 }} />
                                </Grid>
                            ))}
                        </Grid>
                    ) : tickets.length === 0 ? (
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
                            <EventAvailableIcon sx={{ fontSize: 64, color: "#94A3B8", mb: 2 }} />
                            <Typography variant="h5" fontWeight={800} color="#0F172A" sx={{ mb: 1 }}>
                                No Digital Passes Found
                            </Typography>
                            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                                You haven't booked any event passes yet. Browse upcoming events to get started!
                            </Typography>
                        </Paper>
                    ) : (
                        <Grid container spacing={3.5}>
                            {tickets.map((ticket) => (
                                <Grid item xs={12} md={6} lg={4} key={ticket.id}>
                                    <Paper
                                        elevation={0}
                                        sx={{
                                            borderRadius: 5,
                                            overflow: "hidden",
                                            border: "1px solid #E2E8F0",
                                            bgcolor: "#FFFFFF",
                                            transition: "all 0.3s ease",
                                            boxShadow: "0 10px 25px -10px rgba(15, 23, 42, 0.05)",
                                            "&:hover": {
                                                transform: "translateY(-4px)",
                                                boxShadow: "0 20px 35px -10px rgba(15, 23, 42, 0.12)"
                                            }
                                        }}
                                    >
                                        {/* Pass Header Gradient */}
                                        <Box
                                            sx={{
                                                p: 3,
                                                background: "linear-gradient(135deg, #0F172A 0%, #1E1B4B 100%)",
                                                color: "#FFFFFF",
                                                position: "relative"
                                            }}
                                        >
                                            <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 1 }}>
                                                <Chip
                                                    label={ticket.status || "VALID"}
                                                    size="small"
                                                    sx={{
                                                        bgcolor: ticket.status === "CANCELLED" ? "#EF4444" : "#10B981",
                                                        color: "#FFFFFF",
                                                        fontWeight: 800,
                                                        fontSize: "0.68rem"
                                                    }}
                                                />
                                                <Typography variant="caption" sx={{ color: "#94A3B8", fontWeight: 700 }}>
                                                    Ref: {ticket.bookingReference || `REF-${ticket.id}`}
                                                </Typography>
                                            </Stack>

                                            <Typography variant="h6" fontWeight={800} noWrap sx={{ mt: 1 }}>
                                                {ticket.eventTitle || "Event Pass"}
                                            </Typography>
                                        </Box>

                                        {/* Ticket Cutout Stub Divider */}
                                        <Box
                                            sx={{
                                                position: "relative",
                                                bgcolor: "#F8FAFC",
                                                height: 16,
                                                display: "flex",
                                                alignItems: "center",
                                                justifyContent: "space-between",
                                                px: 1,
                                                "&::before": {
                                                    content: '""',
                                                    width: 16,
                                                    height: 16,
                                                    borderRadius: "50%",
                                                    bgcolor: "#F8FAFC",
                                                    ml: -2.5,
                                                    borderRight: "1px solid #E2E8F0"
                                                },
                                                "&::after": {
                                                    content: '""',
                                                    width: 16,
                                                    height: 16,
                                                    borderRadius: "50%",
                                                    bgcolor: "#F8FAFC",
                                                    mr: -2.5,
                                                    borderLeft: "1px solid #E2E8F0"
                                                }
                                            }}
                                        >
                                            <Divider sx={{ width: "100%", borderStyle: "dashed", borderColor: "#CBD5E1" }} />
                                        </Box>

                                        {/* Ticket Body Content */}
                                        <Box sx={{ p: 3 }}>
                                            <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 3 }}>
                                                <Box>
                                                    <Typography variant="caption" color="text.secondary" display="block">
                                                        Ticket Number
                                                    </Typography>
                                                    <Typography variant="subtitle2" fontWeight={800} color="primary.main">
                                                        {ticket.ticketNumber || `#TKT-${ticket.id}`}
                                                    </Typography>
                                                </Box>

                                                <Box
                                                    sx={{
                                                        p: 1,
                                                        borderRadius: 3,
                                                        bgcolor: "#F1F5F9",
                                                        display: "inline-flex",
                                                        alignItems: "center",
                                                        justifyContent: "center"
                                                    }}
                                                >
                                                    <QrCode2Icon sx={{ fontSize: 36, color: "#0F172A" }} />
                                                </Box>
                                            </Stack>

                                            <Button
                                                fullWidth
                                                variant="contained"
                                                startIcon={<DownloadIcon />}
                                                onClick={() => handleDownload(ticket.id)}
                                                sx={{
                                                    borderRadius: 3,
                                                    py: 1.2,
                                                    fontWeight: 700,
                                                    boxShadow: "0 4px 14px rgba(79, 70, 229, 0.25)"
                                                }}
                                            >
                                                Download Pass PDF
                                            </Button>
                                        </Box>
                                    </Paper>
                                </Grid>
                            ))}
                        </Grid>
                    )}
                </Container>
            </Box>
        </MainLayout>
    );
};

export default Tickets;