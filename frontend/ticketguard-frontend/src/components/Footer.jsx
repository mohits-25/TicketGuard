import { Box, Container, Grid, Typography, Stack, IconButton, TextField, Button, Divider } from "@mui/material";
import { Link } from "react-router-dom";
import ConfirmationNumberIcon from "@mui/icons-material/ConfirmationNumber";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import SecurityIcon from "@mui/icons-material/Security";
import LocalActivityIcon from "@mui/icons-material/LocalActivity";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import GitHubIcon from "@mui/icons-material/GitHub";

const Footer = () => {
    return (
        <Box
            component="footer"
            sx={{
                bgcolor: "#0F172A",
                color: "#94A3B8",
                pt: 8,
                pb: 4,
                mt: "auto",
                borderTop: "1px solid #1E293B"
            }}
        >
            <Container maxWidth="xl">
                <Grid container spacing={4} sx={{ mb: 6 }}>
                    {/* Brand Column */}
                    <Grid item xs={12} md={4}>
                        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 2 }}>
                            <Box
                                sx={{
                                    width: 40,
                                    height: 40,
                                    borderRadius: 3,
                                    background: "linear-gradient(135deg, #4F46E5 0%, #7C3AED 100%)",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    color: "#FFFFFF"
                                }}
                            >
                                <ConfirmationNumberIcon />
                            </Box>
                            <Typography variant="h5" fontWeight={800} color="#FFFFFF">
                                Ticket<Box component="span" sx={{ color: "#818CF8" }}>Guard</Box>
                            </Typography>
                        </Box>

                        <Typography variant="body2" sx={{ mb: 3, color: "#94A3B8", maxWidth: 360, lineHeight: 1.7 }}>
                            The next-generation event ticketing platform. Discover, book, and verify authentic event passes with instant digital delivery and zero-fraud protection.
                        </Typography>

                        <Stack direction="row" spacing={1}>
                            <IconButton sx={{ color: "#94A3B8", "&:hover": { color: "#FFFFFF", bgcolor: "rgba(255,255,255,0.08)" } }}>
                                <TwitterIcon />
                            </IconButton>
                            <IconButton sx={{ color: "#94A3B8", "&:hover": { color: "#FFFFFF", bgcolor: "rgba(255,255,255,0.08)" } }}>
                                <InstagramIcon />
                            </IconButton>
                            <IconButton sx={{ color: "#94A3B8", "&:hover": { color: "#FFFFFF", bgcolor: "rgba(255,255,255,0.08)" } }}>
                                <LinkedInIcon />
                            </IconButton>
                            <IconButton sx={{ color: "#94A3B8", "&:hover": { color: "#FFFFFF", bgcolor: "rgba(255,255,255,0.08)" } }}>
                                <GitHubIcon />
                            </IconButton>
                        </Stack>
                    </Grid>

                    {/* Quick Links */}
                    <Grid item xs={6} md={2}>
                        <Typography variant="subtitle1" fontWeight={700} color="#FFFFFF" sx={{ mb: 2.5 }}>
                            Explore
                        </Typography>
                        <Stack spacing={1.5}>
                            <Typography component={Link} to="/" variant="body2" sx={{ color: "#94A3B8", "&:hover": { color: "#818CF8" } }}>
                                Home
                            </Typography>
                            <Typography component={Link} to="/events" variant="body2" sx={{ color: "#94A3B8", "&:hover": { color: "#818CF8" } }}>
                                Browse Events
                            </Typography>
                            <Typography component={Link} to="/login" variant="body2" sx={{ color: "#94A3B8", "&:hover": { color: "#818CF8" } }}>
                                Login
                            </Typography>
                            <Typography component={Link} to="/register" variant="body2" sx={{ color: "#94A3B8", "&:hover": { color: "#818CF8" } }}>
                                Sign Up
                            </Typography>
                        </Stack>
                    </Grid>

                    {/* Customer Portal */}
                    <Grid item xs={6} md={2}>
                        <Typography variant="subtitle1" fontWeight={700} color="#FFFFFF" sx={{ mb: 2.5 }}>
                            Account
                        </Typography>
                        <Stack spacing={1.5}>
                            <Typography component={Link} to="/dashboard" variant="body2" sx={{ color: "#94A3B8", "&:hover": { color: "#818CF8" } }}>
                                Dashboard
                            </Typography>
                            <Typography component={Link} to="/my-tickets" variant="body2" sx={{ color: "#94A3B8", "&:hover": { color: "#818CF8" } }}>
                                My Tickets
                            </Typography>
                            <Typography component={Link} to="/my-bookings" variant="body2" sx={{ color: "#94A3B8", "&:hover": { color: "#818CF8" } }}>
                                My Bookings
                            </Typography>
                            <Typography component={Link} to="/my-payments" variant="body2" sx={{ color: "#94A3B8", "&:hover": { color: "#818CF8" } }}>
                                Payment History
                            </Typography>
                        </Stack>
                    </Grid>

                    {/* Newsletter & Trust Badges */}
                    <Grid item xs={12} md={4}>
                        <Typography variant="subtitle1" fontWeight={700} color="#FFFFFF" sx={{ mb: 2.5 }}>
                            Stay Updated
                        </Typography>
                        <Typography variant="body2" sx={{ mb: 2.5, color: "#94A3B8" }}>
                            Subscribe to get early access to concert tickets, festival drops & exclusive discounts.
                        </Typography>

                        <Stack direction="row" spacing={1} sx={{ mb: 3 }}>
                            <TextField
                                size="small"
                                placeholder="Enter your email"
                                sx={{
                                    bgcolor: "#1E293B",
                                    borderRadius: 3,
                                    "& .MuiOutlinedInput-root": {
                                        color: "#FFFFFF",
                                        "& fieldset": { borderColor: "#334155" },
                                        "&:hover fieldset": { borderColor: "#4F46E5" }
                                    }
                                }}
                            />
                            <Button variant="contained" color="primary" sx={{ borderRadius: 3, px: 3, whiteSpace: "nowrap" }}>
                                Join
                            </Button>
                        </Stack>

                        <Stack direction="row" spacing={2} alignItems="center">
                            <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                                <VerifiedUserIcon sx={{ color: "#10B981", fontSize: 18 }} />
                                <Typography variant="caption" color="#CBD5E1">Verified Pass</Typography>
                            </Box>
                            <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                                <SecurityIcon sx={{ color: "#818CF8", fontSize: 18 }} />
                                <Typography variant="caption" color="#CBD5E1">256-Bit SSL</Typography>
                            </Box>
                            <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                                <LocalActivityIcon sx={{ color: "#F59E0B", fontSize: 18 }} />
                                <Typography variant="caption" color="#CBD5E1">Instant QR</Typography>
                            </Box>
                        </Stack>
                    </Grid>
                </Grid>

                <Divider sx={{ borderColor: "#1E293B", mb: 3 }} />

                <Box sx={{ display: "flex", flexDirection: { xs: "column", sm: "row" }, justifyContent: "space-between", alignItems: "center", gap: 2 }}>
                    <Typography variant="caption" color="#64748B">
                        © 2026 TicketGuard Platform Inc. All Rights Reserved.
                    </Typography>
                    <Stack direction="row" spacing={3}>
                        <Typography variant="caption" color="#64748B" sx={{ cursor: "pointer", "&:hover": { color: "#94A3B8" } }}>
                            Privacy Policy
                        </Typography>
                        <Typography variant="caption" color="#64748B" sx={{ cursor: "pointer", "&:hover": { color: "#94A3B8" } }}>
                            Terms of Service
                        </Typography>
                        <Typography variant="caption" color="#64748B" sx={{ cursor: "pointer", "&:hover": { color: "#94A3B8" } }}>
                            Security Guarantee
                        </Typography>
                    </Stack>
                </Box>
            </Container>
        </Box>
    );
};

export default Footer;