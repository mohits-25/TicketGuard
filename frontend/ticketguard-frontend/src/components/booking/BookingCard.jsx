import { Paper, Box, Typography, Button, Stack, Chip } from "@mui/material";
import { useNavigate } from "react-router-dom";

import ConfirmationNumberIcon from "@mui/icons-material/ConfirmationNumber";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

const BookingCard = ({ booking }) => {
    const navigate = useNavigate();

    return (
        <Paper
            elevation={0}
            sx={{
                p: 3.5,
                mb: 3,
                borderRadius: 5,
                bgcolor: "#FFFFFF",
                border: "1px solid #E2E8F0",
                transition: "all 0.3s ease",
                boxShadow: "0 10px 25px -10px rgba(15, 23, 42, 0.04)",
                "&:hover": {
                    transform: "translateY(-3px)",
                    boxShadow: "0 15px 30px -10px rgba(15, 23, 42, 0.08)"
                }
            }}
        >
            <Stack direction={{ xs: "column", sm: "row" }} justifyContent="space-between" alignItems={{ xs: "flex-start", sm: "center" }} gap={2}>
                <Box>
                    <Stack direction="row" spacing={1.5} alignItems="center" sx={{ mb: 1 }}>
                        <Chip
                            label={booking.status || "CONFIRMED"}
                            color={booking.status === "CONFIRMED" ? "success" : booking.status === "PENDING" ? "warning" : "error"}
                            size="small"
                            sx={{ fontWeight: 800, borderRadius: 2 }}
                        />
                        <Typography variant="caption" color="text.secondary" fontWeight={700}>
                            Ref: {booking.bookingReference}
                        </Typography>
                    </Stack>

                    <Typography variant="h5" fontWeight={800} color="#0F172A" sx={{ mb: 1 }}>
                        {booking.eventTitle || "Event Booking"}
                    </Typography>

                    <Stack direction="row" spacing={2.5} flexWrap="wrap" sx={{ color: "text.secondary" }}>
                        <Stack direction="row" spacing={0.8} alignItems="center">
                            <CalendarTodayIcon sx={{ fontSize: 16, color: "primary.main" }} />
                            <Typography variant="body2">{booking.eventDate || "TBA"}</Typography>
                        </Stack>
                        <Stack direction="row" spacing={0.8} alignItems="center">
                            <ConfirmationNumberIcon sx={{ fontSize: 16, color: "primary.main" }} />
                            <Typography variant="body2">{booking.numberOfTickets} Ticket(s)</Typography>
                        </Stack>
                    </Stack>
                </Box>

                <Stack direction={{ xs: "row", sm: "column" }} alignItems={{ xs: "center", sm: "flex-end" }} justifyContent="space-between" sx={{ width: { xs: "100%", sm: "auto" } }}>
                    <Typography variant="h5" fontWeight={800} color="primary.main">
                        ₹{booking.totalAmount}
                    </Typography>

                    <Button
                        variant="contained"
                        size="small"
                        endIcon={<ArrowForwardIcon />}
                        onClick={() => navigate("/tickets")}
                        sx={{ borderRadius: 3, fontWeight: 700, mt: { sm: 1.5 } }}
                    >
                        View Ticket
                    </Button>
                </Stack>
            </Stack>
        </Paper>
    );
};

export default BookingCard;