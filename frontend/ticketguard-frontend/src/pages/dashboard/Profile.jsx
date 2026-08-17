import { Box, Paper, Typography, Avatar, Grid, Chip, Divider, Stack, Button } from "@mui/material";
import DashboardLayout from "../../components/layout/DashboardLayout";
import { useAuth } from "../../context/AuthContext";

import PersonIcon from "@mui/icons-material/Person";
import EmailIcon from "@mui/icons-material/Email";
import BadgeIcon from "@mui/icons-material/Badge";
import SecurityIcon from "@mui/icons-material/Security";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";

const Profile = () => {
    const { user } = useAuth();

    const firstName = user?.firstName || "TicketGuard";
    const lastName = user?.lastName || "User";
    const email = user?.email || "user@ticketguard.com";
    const role = user?.role || "CUSTOMER";

    return (
        <DashboardLayout>
            <Box sx={{ maxWidth: 800, mx: "auto" }}>
                {/* User Header Profile Card */}
                <Paper
                    elevation={0}
                    sx={{
                        p: 4,
                        borderRadius: 6,
                        border: "1px solid #E2E8F0",
                        bgcolor: "#FFFFFF",
                        mb: 4,
                        position: "relative",
                        overflow: "hidden"
                    }}
                >
                    <Box
                        sx={{
                            height: 120,
                            mx: -4,
                            mt: -4,
                            mb: 4,
                            background: "linear-gradient(135deg, #4F46E5 0%, #7C3AED 100%)"
                        }}
                    />

                    <Stack direction={{ xs: "column", sm: "row" }} spacing={3} alignItems={{ xs: "flex-start", sm: "center" }}>
                        <Avatar
                            sx={{
                                width: 90,
                                height: 90,
                                mt: -6,
                                bgcolor: "#0F172A",
                                border: "4px solid #FFFFFF",
                                fontSize: "2.2rem",
                                fontWeight: 800,
                                boxShadow: "0 10px 25px rgba(0,0,0,0.15)"
                            }}
                        >
                            {firstName[0].toUpperCase()}
                        </Avatar>

                        <Box sx={{ flexGrow: 1 }}>
                            <Stack direction="row" spacing={1.5} alignItems="center" sx={{ mb: 0.5 }}>
                                <Typography variant="h4" fontWeight={800} color="#0F172A">
                                    {firstName} {lastName}
                                </Typography>
                                <Chip
                                    label={role}
                                    color={role === "ADMIN" ? "secondary" : "primary"}
                                    size="small"
                                    sx={{ fontWeight: 800, borderRadius: 2 }}
                                />
                            </Stack>
                            <Typography variant="body2" color="text.secondary">
                                {email}
                            </Typography>
                        </Box>
                    </Stack>
                </Paper>

                {/* Details Breakdown */}
                <Paper
                    elevation={0}
                    sx={{
                        p: 4,
                        borderRadius: 6,
                        border: "1px solid #E2E8F0",
                        bgcolor: "#FFFFFF"
                    }}
                >
                    <Typography variant="h6" fontWeight={800} color="#0F172A" sx={{ mb: 3 }}>
                        Personal Information
                    </Typography>

                    <Grid container spacing={3}>
                        <Grid item xs={12} sm={6}>
                            <Paper elevation={0} sx={{ p: 2.5, borderRadius: 4, bgcolor: "#F8FAFC", border: "1px solid #E2E8F0" }}>
                                <Stack direction="row" spacing={2} alignItems="center">
                                    <Box sx={{ p: 1, borderRadius: 2.5, bgcolor: "#EEF2FF", color: "#4F46E5" }}>
                                        <PersonIcon fontSize="small" />
                                    </Box>
                                    <Box>
                                        <Typography variant="caption" color="text.secondary" display="block">
                                            First Name
                                        </Typography>
                                        <Typography variant="subtitle2" fontWeight={700} color="#0F172A">
                                            {firstName}
                                        </Typography>
                                    </Box>
                                </Stack>
                            </Paper>
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <Paper elevation={0} sx={{ p: 2.5, borderRadius: 4, bgcolor: "#F8FAFC", border: "1px solid #E2E8F0" }}>
                                <Stack direction="row" spacing={2} alignItems="center">
                                    <Box sx={{ p: 1, borderRadius: 2.5, bgcolor: "#EEF2FF", color: "#4F46E5" }}>
                                        <BadgeIcon fontSize="small" />
                                    </Box>
                                    <Box>
                                        <Typography variant="caption" color="text.secondary" display="block">
                                            Last Name
                                        </Typography>
                                        <Typography variant="subtitle2" fontWeight={700} color="#0F172A">
                                            {lastName}
                                        </Typography>
                                    </Box>
                                </Stack>
                            </Paper>
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <Paper elevation={0} sx={{ p: 2.5, borderRadius: 4, bgcolor: "#F8FAFC", border: "1px solid #E2E8F0" }}>
                                <Stack direction="row" spacing={2} alignItems="center">
                                    <Box sx={{ p: 1, borderRadius: 2.5, bgcolor: "#EEF2FF", color: "#4F46E5" }}>
                                        <EmailIcon fontSize="small" />
                                    </Box>
                                    <Box>
                                        <Typography variant="caption" color="text.secondary" display="block">
                                            Email Address
                                        </Typography>
                                        <Typography variant="subtitle2" fontWeight={700} color="#0F172A">
                                            {email}
                                        </Typography>
                                    </Box>
                                </Stack>
                            </Paper>
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <Paper elevation={0} sx={{ p: 2.5, borderRadius: 4, bgcolor: "#F8FAFC", border: "1px solid #E2E8F0" }}>
                                <Stack direction="row" spacing={2} alignItems="center">
                                    <Box sx={{ p: 1, borderRadius: 2.5, bgcolor: "#EEF2FF", color: "#4F46E5" }}>
                                        <SecurityIcon fontSize="small" />
                                    </Box>
                                    <Box>
                                        <Typography variant="caption" color="text.secondary" display="block">
                                            Account Status
                                        </Typography>
                                        <Stack direction="row" spacing={0.5} alignItems="center">
                                            <VerifiedUserIcon color="success" sx={{ fontSize: 16 }} />
                                            <Typography variant="subtitle2" fontWeight={700} color="#0F172A">
                                                Verified & Active
                                            </Typography>
                                        </Stack>
                                    </Box>
                                </Stack>
                            </Paper>
                        </Grid>
                    </Grid>
                </Paper>
            </Box>
        </DashboardLayout>
    );
};

export default Profile;