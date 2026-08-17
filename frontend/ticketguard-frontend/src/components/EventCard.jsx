import {
    Card,
    CardContent,
    CardActions,
    Typography,
    Button,
    Box,
    Chip,
    Stack,
    LinearProgress
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ConfirmationNumberIcon from "@mui/icons-material/ConfirmationNumber";

const getGradientByCategory = (category = "") => {
    const cat = category.toLowerCase();
    if (cat.includes("music") || cat.includes("concert")) return "linear-gradient(135deg, #4F46E5 0%, #7C3AED 100%)";
    if (cat.includes("sport")) return "linear-gradient(135deg, #059669 0%, #10B981 100%)";
    if (cat.includes("comedy")) return "linear-gradient(135deg, #D97706 0%, #F59E0B 100%)";
    if (cat.includes("tech")) return "linear-gradient(135deg, #2563EB 0%, #38BDF8 100%)";
    return "linear-gradient(135deg, #4F46E5 0%, #7C3AED 100%)";
};

const EventCard = ({ event }) => {
    const navigate = useNavigate();

    const formattedDate = event.eventDate
        ? new Date(event.eventDate).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric"
          })
        : "TBA";

    const seatsLeft = event.availableSeats ?? 50;

    return (
        <Card
            elevation={0}
            sx={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
                borderRadius: 5,
                border: "1px solid #E2E8F0",
                bgcolor: "#FFFFFF",
                transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                "&:hover": {
                    transform: "translateY(-6px)",
                    boxShadow: "0 20px 40px -15px rgba(15, 23, 42, 0.12)",
                    borderColor: "#CBD5E1"
                }
            }}
        >
            {/* Top Media Header / Category Gradient */}
            <Box
                sx={{
                    height: 140,
                    background: getGradientByCategory(event.category || "Event"),
                    position: "relative",
                    p: 2.5,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between"
                }}
            >
                <Stack direction="row" justifyContent="space-between" alignItems="center">
                    <Chip
                        label={event.category || "LIVE EVENT"}
                        size="small"
                        sx={{
                            bgcolor: "rgba(255, 255, 255, 0.25)",
                            backdropFilter: "blur(8px)",
                            color: "#FFFFFF",
                            fontWeight: 800,
                            fontSize: "0.7rem",
                            letterSpacing: 0.5
                        }}
                    />
                    {seatsLeft <= 20 && (
                        <Chip
                            label="Selling Fast"
                            size="small"
                            sx={{
                                bgcolor: "#EF4444",
                                color: "#FFFFFF",
                                fontWeight: 800,
                                fontSize: "0.68rem"
                            }}
                        />
                    )}
                </Stack>

                <Typography
                    variant="h5"
                    fontWeight={800}
                    color="#FFFFFF"
                    sx={{
                        display: "-webkit-box",
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        lineHeight: 1.25
                    }}
                >
                    {event.title}
                </Typography>
            </Box>

            <CardContent sx={{ p: 3, flexGrow: 1, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                <Stack spacing={1.5} sx={{ mb: 2 }}>
                    {/* Venue Location */}
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                        <LocationOnIcon sx={{ color: "primary.main", fontSize: 18 }} />
                        <Typography variant="body2" color="text.secondary" fontWeight={600} noWrap>
                            {event.venueName || "Venue TBA"}
                        </Typography>
                    </Box>

                    {/* Date */}
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                        <CalendarTodayIcon sx={{ color: "secondary.main", fontSize: 18 }} />
                        <Typography variant="body2" color="text.secondary" fontWeight={600}>
                            {formattedDate}
                        </Typography>
                    </Box>
                </Stack>

                {/* Available Seats Progress */}
                <Box sx={{ mb: 2 }}>
                    <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 0.5 }}>
                        <Typography variant="caption" color="text.secondary" fontWeight={600}>
                            Pass Availability
                        </Typography>
                        <Typography variant="caption" color="primary.main" fontWeight={700}>
                            {seatsLeft} passes remaining
                        </Typography>
                    </Stack>
                    <LinearProgress
                        variant="determinate"
                        value={Math.min(100, Math.max(15, (seatsLeft / 100) * 100))}
                        sx={{
                            height: 6,
                            borderRadius: 3,
                            bgcolor: "#E2E8F0",
                            "& .MuiLinearProgress-bar": {
                                borderRadius: 3,
                                background: getGradientByCategory(event.category)
                            }
                        }}
                    />
                </Box>

                {/* Price Display */}
                <Box sx={{ display: "flex", alignItems: "baseline", gap: 0.5, pt: 1, borderTop: "1px dashed #E2E8F0" }}>
                    <Typography variant="caption" color="text.secondary" fontWeight={600}>
                        From
                    </Typography>
                    <Typography variant="h5" fontWeight={800} color="primary.main">
                        ₹{event.ticketPrice}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                        / ticket
                    </Typography>
                </Box>
            </CardContent>

            <CardActions sx={{ p: 2.5, pt: 0 }}>
                <Button
                    variant="contained"
                    fullWidth
                    size="large"
                    onClick={() => navigate(`/events/${event.id}`)}
                    endIcon={<ArrowForwardIcon />}
                    sx={{
                        borderRadius: 3,
                        py: 1.2,
                        fontWeight: 700,
                        boxShadow: "0 4px 14px rgba(79, 70, 229, 0.25)"
                    }}
                >
                    Get Passes
                </Button>
            </CardActions>
        </Card>
    );
};

export default EventCard;