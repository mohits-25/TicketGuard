import {
    Avatar,
    Box,
    Divider,
    Drawer,
    List,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Typography,
    Chip
} from "@mui/material";

import DashboardIcon from "@mui/icons-material/Dashboard";
import ConfirmationNumberIcon from "@mui/icons-material/ConfirmationNumber";
import PaymentIcon from "@mui/icons-material/Payment";
import LocalActivityIcon from "@mui/icons-material/LocalActivity";
import PersonIcon from "@mui/icons-material/Person";
import LogoutIcon from "@mui/icons-material/Logout";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import LocationCityIcon from "@mui/icons-material/LocationCity";
import BookOnlineIcon from "@mui/icons-material/BookOnline";
import EventIcon from "@mui/icons-material/Event";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const drawerWidth = 270;

const Sidebar = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    const handleLogout = () => {
        logout();
        navigate("/login", { replace: true });
    };

    const isActive = (path) => location.pathname === path;

    const getMenuItemStyle = (path) => ({
        mx: 1.5,
        my: 0.5,
        borderRadius: 3,
        color: isActive(path) ? "#FFFFFF" : "#94A3B8",
        bgcolor: isActive(path) ? "rgba(79, 70, 229, 0.25)" : "transparent",
        borderLeft: isActive(path) ? "3px solid #818CF8" : "3px solid transparent",
        transition: "all 0.2s ease",
        "&:hover": {
            bgcolor: "rgba(255, 255, 255, 0.06)",
            color: "#FFFFFF"
        }
    });

    const getIconStyle = (path) => ({
        color: isActive(path) ? "#818CF8" : "#64748B",
        minWidth: 40
    });

    return (
        <Drawer
            variant="permanent"
            sx={{
                width: drawerWidth,
                flexShrink: 0,
                "& .MuiDrawer-paper": {
                    width: drawerWidth,
                    backgroundColor: "#0F172A",
                    backgroundImage: "radial-gradient(circle at 10% 20%, rgba(79, 70, 229, 0.12) 0%, transparent 60%)",
                    color: "#FFFFFF",
                    borderRight: "1px solid #1E293B"
                }
            }}
        >
            {/* Top Brand Banner */}
            <Box sx={{ px: 3, py: 2.5, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <Box component={Link} to="/" sx={{ textDecoration: "none", display: "flex", alignItems: "center", gap: 1 }}>
                    <Box
                        sx={{
                            width: 34,
                            height: 34,
                            borderRadius: 2.5,
                            background: "linear-gradient(135deg, #4F46E5 0%, #7C3AED 100%)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            color: "#FFFFFF"
                        }}
                    >
                        <ConfirmationNumberIcon sx={{ fontSize: 20 }} />
                    </Box>
                    <Typography variant="h6" fontWeight={800} color="#FFFFFF">
                        Ticket<Box component="span" sx={{ color: "#818CF8" }}>Guard</Box>
                    </Typography>
                </Box>
            </Box>

            <Divider sx={{ borderColor: "#1E293B" }} />

            {/* User Info Header Card */}
            <Box sx={{ px: 2, py: 3, textAlign: "center" }}>
                <Box sx={{ position: "relative", display: "inline-block", mb: 1.5 }}>
                    <Avatar
                        sx={{
                            width: 64,
                            height: 64,
                            bgcolor: "primary.main",
                            background: "linear-gradient(135deg, #4F46E5 0%, #7C3AED 100%)",
                            fontSize: 24,
                            fontWeight: 800,
                            boxShadow: "0 8px 20px rgba(79, 70, 229, 0.4)",
                            mx: "auto"
                        }}
                    >
                        {user?.firstName?.charAt(0) || "U"}
                    </Avatar>
                </Box>
                <Typography variant="subtitle1" fontWeight={700} color="#FFFFFF" noWrap sx={{ px: 1 }}>
                    {user?.firstName} {user?.lastName}
                </Typography>
                <Typography variant="caption" sx={{ color: "#64748B", display: "block", mb: 1 }} noWrap>
                    {user?.email}
                </Typography>
                <Chip
                    label={user?.role || "CUSTOMER"}
                    size="small"
                    sx={{
                        bgcolor: user?.role === "ADMIN" ? "rgba(124, 58, 237, 0.2)" : "rgba(79, 70, 229, 0.15)",
                        color: user?.role === "ADMIN" ? "#C084FC" : "#818CF8",
                        fontWeight: 700,
                        fontSize: "0.68rem",
                        border: `1px solid ${user?.role === "ADMIN" ? "rgba(192, 132, 252, 0.3)" : "rgba(129, 140, 248, 0.3)"}`
                    }}
                />
            </Box>

            <Divider sx={{ borderColor: "#1E293B", mb: 1 }} />

            {/* Navigation Section */}
            <Box sx={{ flexGrow: 1, overflowY: "auto", px: 0.5 }}>
                <Typography variant="caption" sx={{ px: 3, pt: 1, pb: 0.5, display: "block", color: "#475569", fontWeight: 800, letterSpacing: 1 }}>
                    CUSTOMER PORTAL
                </Typography>

                <List disablePadding>
                    <ListItemButton component={Link} to="/dashboard" sx={getMenuItemStyle("/dashboard")}>
                        <ListItemIcon sx={getIconStyle("/dashboard")}>
                            <DashboardIcon />
                        </ListItemIcon>
                        <ListItemText primary="Overview" primaryTypographyProps={{ fontWeight: 600, fontSize: "0.9rem" }} />
                    </ListItemButton>

                    <ListItemButton component={Link} to="/my-tickets" sx={getMenuItemStyle("/my-tickets")}>
                        <ListItemIcon sx={getIconStyle("/my-tickets")}>
                            <LocalActivityIcon />
                        </ListItemIcon>
                        <ListItemText primary="My Tickets" primaryTypographyProps={{ fontWeight: 600, fontSize: "0.9rem" }} />
                    </ListItemButton>

                    <ListItemButton component={Link} to="/my-bookings" sx={getMenuItemStyle("/my-bookings")}>
                        <ListItemIcon sx={getIconStyle("/my-bookings")}>
                            <ConfirmationNumberIcon />
                        </ListItemIcon>
                        <ListItemText primary="My Bookings" primaryTypographyProps={{ fontWeight: 600, fontSize: "0.9rem" }} />
                    </ListItemButton>

                    <ListItemButton component={Link} to="/my-payments" sx={getMenuItemStyle("/my-payments")}>
                        <ListItemIcon sx={getIconStyle("/my-payments")}>
                            <PaymentIcon />
                        </ListItemIcon>
                        <ListItemText primary="My Payments" primaryTypographyProps={{ fontWeight: 600, fontSize: "0.9rem" }} />
                    </ListItemButton>

                    <ListItemButton component={Link} to="/profile" sx={getMenuItemStyle("/profile")}>
                        <ListItemIcon sx={getIconStyle("/profile")}>
                            <PersonIcon />
                        </ListItemIcon>
                        <ListItemText primary="Account Profile" primaryTypographyProps={{ fontWeight: 600, fontSize: "0.9rem" }} />
                    </ListItemButton>
                </List>

                {/* ADMIN SECTION */}
                {user?.role === "ADMIN" && (
                    <>
                        <Divider sx={{ my: 2, borderColor: "#1E293B" }} />
                        <Typography variant="caption" sx={{ px: 3, pb: 0.5, display: "block", color: "#475569", fontWeight: 800, letterSpacing: 1 }}>
                            ADMIN MANAGEMENT
                        </Typography>

                        <List disablePadding>
                            <ListItemButton component={Link} to="/admin" sx={getMenuItemStyle("/admin")}>
                                <ListItemIcon sx={getIconStyle("/admin")}>
                                    <AdminPanelSettingsIcon />
                                </ListItemIcon>
                                <ListItemText primary="Admin Dashboard" primaryTypographyProps={{ fontWeight: 600, fontSize: "0.9rem" }} />
                            </ListItemButton>

                            <ListItemButton component={Link} to="/admin/events" sx={getMenuItemStyle("/admin/events")}>
                                <ListItemIcon sx={getIconStyle("/admin/events")}>
                                    <EventIcon />
                                </ListItemIcon>
                                <ListItemText primary="Manage Events" primaryTypographyProps={{ fontWeight: 600, fontSize: "0.9rem" }} />
                            </ListItemButton>

                            <ListItemButton component={Link} to="/admin/venues" sx={getMenuItemStyle("/admin/venues")}>
                                <ListItemIcon sx={getIconStyle("/admin/venues")}>
                                    <LocationCityIcon />
                                </ListItemIcon>
                                <ListItemText primary="Manage Venues" primaryTypographyProps={{ fontWeight: 600, fontSize: "0.9rem" }} />
                            </ListItemButton>

                            <ListItemButton component={Link} to="/admin/users" sx={getMenuItemStyle("/admin/users")}>
                                <ListItemIcon sx={getIconStyle("/admin/users")}>
                                    <PersonIcon />
                                </ListItemIcon>
                                <ListItemText primary="Manage Users" primaryTypographyProps={{ fontWeight: 600, fontSize: "0.9rem" }} />
                            </ListItemButton>

                            <ListItemButton component={Link} to="/admin/bookings" sx={getMenuItemStyle("/admin/bookings")}>
                                <ListItemIcon sx={getIconStyle("/admin/bookings")}>
                                    <BookOnlineIcon />
                                </ListItemIcon>
                                <ListItemText primary="All Bookings" primaryTypographyProps={{ fontWeight: 600, fontSize: "0.9rem" }} />
                            </ListItemButton>

                            <ListItemButton component={Link} to="/admin/payments" sx={getMenuItemStyle("/admin/payments")}>
                                <ListItemIcon sx={getIconStyle("/admin/payments")}>
                                    <PaymentIcon />
                                </ListItemIcon>
                                <ListItemText primary="All Payments" primaryTypographyProps={{ fontWeight: 600, fontSize: "0.9rem" }} />
                            </ListItemButton>

                            <ListItemButton component={Link} to="/admin/tickets" sx={getMenuItemStyle("/admin/tickets")}>
                                <ListItemIcon sx={getIconStyle("/admin/tickets")}>
                                    <LocalActivityIcon />
                                </ListItemIcon>
                                <ListItemText primary="All Tickets" primaryTypographyProps={{ fontWeight: 600, fontSize: "0.9rem" }} />
                            </ListItemButton>
                        </List>
                    </>
                )}
            </Box>

            <Divider sx={{ borderColor: "#1E293B" }} />

            {/* Quick Actions Footer */}
            <Box sx={{ p: 2 }}>
                <ListItemButton
                    component={Link}
                    to="/events"
                    sx={{
                        borderRadius: 3,
                        color: "#94A3B8",
                        mb: 1,
                        "&:hover": { bgcolor: "rgba(255, 255, 255, 0.05)", color: "#FFFFFF" }
                    }}
                >
                    <ListItemIcon sx={{ color: "#64748B", minWidth: 36 }}>
                        <ArrowBackIcon sx={{ fontSize: 18 }} />
                    </ListItemIcon>
                    <ListItemText primary="Browse Public Events" primaryTypographyProps={{ fontSize: "0.82rem", fontWeight: 600 }} />
                </ListItemButton>

                <ListItemButton
                    onClick={handleLogout}
                    sx={{
                        borderRadius: 3,
                        color: "#F87171",
                        bgcolor: "rgba(239, 68, 68, 0.08)",
                        "&:hover": { bgcolor: "rgba(239, 68, 68, 0.18)" }
                    }}
                >
                    <ListItemIcon sx={{ color: "#F87171", minWidth: 36 }}>
                        <LogoutIcon sx={{ fontSize: 18 }} />
                    </ListItemIcon>
                    <ListItemText primary="Sign Out" primaryTypographyProps={{ fontWeight: 700, fontSize: "0.85rem" }} />
                </ListItemButton>
            </Box>
        </Drawer>
    );
};

export default Sidebar;