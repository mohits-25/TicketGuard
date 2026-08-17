import { useState } from "react";
import {
    AppBar,
    Toolbar,
    Typography,
    Button,
    Box,
    Container,
    Avatar,
    IconButton,
    Menu,
    MenuItem,
    Divider,
    Drawer,
    List,
    ListItem,
    ListItemButton,
    ListItemText,
    Chip
} from "@mui/material";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

import ConfirmationNumberIcon from "@mui/icons-material/ConfirmationNumber";
import MenuIcon from "@mui/icons-material/Menu";
import DashboardIcon from "@mui/icons-material/Dashboard";
import LogoutIcon from "@mui/icons-material/Logout";
import PersonIcon from "@mui/icons-material/Person";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import LocalActivityIcon from "@mui/icons-material/LocalActivity";
import PaymentIcon from "@mui/icons-material/Payment";

const Navbar = () => {
    const { isAuthenticated, user, logout } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    const [anchorEl, setAnchorEl] = useState(null);
    const [mobileOpen, setMobileOpen] = useState(false);

    const handleMenuOpen = (event) => setAnchorEl(event.currentTarget);
    const handleMenuClose = () => setAnchorEl(null);

    const handleLogout = () => {
        handleMenuClose();
        logout();
        navigate("/login", { replace: true });
    };

    const isActive = (path) => location.pathname === path;

    const navItems = [
        { label: "Home", path: "/" },
        { label: "Events", path: "/events" }
    ];

    return (
        <AppBar position="sticky">
            <Container maxWidth="xl">
                <Toolbar disableGutters sx={{ justifyContent: "space-between", py: 1 }}>
                    {/* Brand Logo */}
                    <Box
                        component={Link}
                        to="/"
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 1.5,
                            textDecoration: "none"
                        }}
                    >
                        <Box
                            sx={{
                                width: 42,
                                height: 42,
                                borderRadius: 3,
                                background: "linear-gradient(135deg, #4F46E5 0%, #7C3AED 100%)",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                color: "#FFFFFF",
                                boxShadow: "0 6px 16px rgba(79, 70, 229, 0.35)"
                            }}
                        >
                            <ConfirmationNumberIcon sx={{ fontSize: 24 }} />
                        </Box>
                        <Typography
                            variant="h5"
                            sx={{
                                fontWeight: 800,
                                background: "linear-gradient(135deg, #0F172A 0%, #4F46E5 100%)",
                                WebkitBackgroundClip: "text",
                                WebkitTextFillColor: "transparent",
                                letterSpacing: "-0.02em"
                            }}
                        >
                            Ticket<Box component="span" sx={{ color: "#7C3AED", WebkitTextFillColor: "#7C3AED" }}>Guard</Box>
                        </Typography>
                    </Box>

                    {/* Desktop Navigation Links */}
                    <Box sx={{ display: { xs: "none", md: "flex" }, alignItems: "center", gap: 1 }}>
                        {navItems.map((item) => (
                            <Button
                                key={item.path}
                                component={Link}
                                to={item.path}
                                sx={{
                                    color: isActive(item.path) ? "primary.main" : "text.secondary",
                                    fontWeight: isActive(item.path) ? 700 : 500,
                                    bgcolor: isActive(item.path) ? "rgba(79, 70, 229, 0.08)" : "transparent",
                                    borderRadius: 3,
                                    px: 2.5,
                                    py: 1,
                                    "&:hover": {
                                        bgcolor: "rgba(79, 70, 229, 0.06)",
                                        color: "primary.main"
                                    }
                                }}
                            >
                                {item.label}
                            </Button>
                        ))}
                    </Box>

                    {/* Auth / Action Buttons */}
                    <Box sx={{ display: { xs: "none", md: "flex" }, alignItems: "center", gap: 2 }}>
                        {isAuthenticated ? (
                            <>
                                {user?.role === "ADMIN" && (
                                    <Button
                                        component={Link}
                                        to="/admin"
                                        variant="outlined"
                                        color="secondary"
                                        startIcon={<AdminPanelSettingsIcon />}
                                        sx={{ borderRadius: 3, py: 0.8 }}
                                    >
                                        Admin Console
                                    </Button>
                                )}
                                <Button
                                    onClick={handleMenuOpen}
                                    sx={{
                                        p: 0.5,
                                        pr: 2,
                                        pl: 1,
                                        borderRadius: 8,
                                        bgcolor: "rgba(241, 245, 249, 0.8)",
                                        border: "1px solid #E2E8F0",
                                        "&:hover": { bgcolor: "#E2E8F0" }
                                    }}
                                >
                                    <Avatar
                                        sx={{
                                            width: 36,
                                            height: 36,
                                            mr: 1.5,
                                            bgcolor: "primary.main",
                                            fontWeight: 700,
                                            fontSize: "0.9rem"
                                        }}
                                    >
                                        {user?.firstName?.charAt(0) || "U"}
                                    </Avatar>
                                    <Box sx={{ textAlign: "left" }}>
                                        <Typography variant="subtitle2" sx={{ color: "text.primary", fontWeight: 700, lineHeight: 1.2 }}>
                                            {user?.firstName || "User"}
                                        </Typography>
                                        <Typography variant="caption" sx={{ color: "text.secondary", fontSize: "0.7rem" }}>
                                            {user?.role || "CUSTOMER"}
                                        </Typography>
                                    </Box>
                                </Button>

                                <Menu
                                    anchorEl={anchorEl}
                                    open={Boolean(anchorEl)}
                                    onClose={handleMenuClose}
                                    PaperProps={{
                                        sx: {
                                            mt: 1.5,
                                            minWidth: 200,
                                            borderRadius: 4,
                                            boxShadow: "0 10px 30px rgba(0,0,0,0.12)",
                                            p: 1
                                        }
                                    }}
                                    transformOrigin={{ horizontal: "right", vertical: "top" }}
                                    anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
                                >
                                    <MenuItem component={Link} to="/dashboard" onClick={handleMenuClose} sx={{ borderRadius: 2, py: 1 }}>
                                        <DashboardIcon sx={{ mr: 1.5, color: "primary.main", fontSize: 20 }} /> Dashboard
                                    </MenuItem>
                                    <MenuItem component={Link} to="/my-tickets" onClick={handleMenuClose} sx={{ borderRadius: 2, py: 1 }}>
                                        <LocalActivityIcon sx={{ mr: 1.5, color: "secondary.main", fontSize: 20 }} /> My Tickets
                                    </MenuItem>
                                    <MenuItem component={Link} to="/my-bookings" onClick={handleMenuClose} sx={{ borderRadius: 2, py: 1 }}>
                                        <ConfirmationNumberIcon sx={{ mr: 1.5, color: "info.main", fontSize: 20 }} /> My Bookings
                                    </MenuItem>
                                    <MenuItem component={Link} to="/profile" onClick={handleMenuClose} sx={{ borderRadius: 2, py: 1 }}>
                                        <PersonIcon sx={{ mr: 1.5, color: "text.secondary", fontSize: 20 }} /> Profile Settings
                                    </MenuItem>
                                    <Divider sx={{ my: 1 }} />
                                    <MenuItem onClick={handleLogout} sx={{ borderRadius: 2, py: 1, color: "error.main" }}>
                                        <LogoutIcon sx={{ mr: 1.5, fontSize: 20 }} /> Logout
                                    </MenuItem>
                                </Menu>
                            </>
                        ) : (
                            <>
                                <Button
                                    component={Link}
                                    to="/login"
                                    variant="text"
                                    sx={{ color: "text.primary", fontWeight: 600 }}
                                >
                                    Login
                                </Button>
                                <Button
                                    component={Link}
                                    to="/register"
                                    variant="contained"
                                    sx={{
                                        borderRadius: 3,
                                        px: 3,
                                        boxShadow: "0 4px 14px rgba(79, 70, 229, 0.35)"
                                    }}
                                >
                                    Get Started
                                </Button>
                            </>
                        )}
                    </Box>

                    {/* Mobile Hamburger Button */}
                    <IconButton
                        onClick={() => setMobileOpen(true)}
                        sx={{ display: { xs: "flex", md: "none" }, color: "text.primary" }}
                    >
                        <MenuIcon />
                    </IconButton>

                    {/* Mobile Drawer Navigation */}
                    <Drawer
                        anchor="right"
                        open={mobileOpen}
                        onClose={() => setMobileOpen(false)}
                        PaperProps={{ sx: { width: 280, p: 2, borderRadius: "24px 0 0 24px" } }}
                    >
                        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 3, px: 1 }}>
                            <Typography variant="h6" fontWeight={800} color="primary">
                                TicketGuard
                            </Typography>
                        </Box>
                        <Divider sx={{ mb: 2 }} />
                        <List>
                            <ListItem disablePadding>
                                <ListItemButton component={Link} to="/" onClick={() => setMobileOpen(false)}>
                                    <ListItemText primary="Home" />
                                </ListItemButton>
                            </ListItem>
                            <ListItem disablePadding>
                                <ListItemButton component={Link} to="/events" onClick={() => setMobileOpen(false)}>
                                    <ListItemText primary="Events" />
                                </ListItemButton>
                            </ListItem>
                            {isAuthenticated ? (
                                <>
                                    <ListItem disablePadding>
                                        <ListItemButton component={Link} to="/dashboard" onClick={() => setMobileOpen(false)}>
                                            <ListItemText primary="Dashboard" />
                                        </ListItemButton>
                                    </ListItem>
                                    <ListItem disablePadding>
                                        <ListItemButton component={Link} to="/my-tickets" onClick={() => setMobileOpen(false)}>
                                            <ListItemText primary="My Tickets" />
                                        </ListItemButton>
                                    </ListItem>
                                    {user?.role === "ADMIN" && (
                                        <ListItem disablePadding>
                                            <ListItemButton component={Link} to="/admin" onClick={() => setMobileOpen(false)}>
                                                <ListItemText primary="Admin Portal" />
                                            </ListItemButton>
                                        </ListItem>
                                    )}
                                    <Divider sx={{ my: 2 }} />
                                    <ListItem disablePadding>
                                        <ListItemButton onClick={handleLogout} sx={{ color: "error.main" }}>
                                            <ListItemText primary="Logout" />
                                        </ListItemButton>
                                    </ListItem>
                                </>
                            ) : (
                                <>
                                    <Divider sx={{ my: 2 }} />
                                    <ListItem disablePadding>
                                        <ListItemButton component={Link} to="/login" onClick={() => setMobileOpen(false)}>
                                            <ListItemText primary="Login" />
                                        </ListItemButton>
                                    </ListItem>
                                    <ListItem disablePadding>
                                        <ListItemButton component={Link} to="/register" onClick={() => setMobileOpen(false)}>
                                            <ListItemText primary="Register" />
                                        </ListItemButton>
                                    </ListItem>
                                </>
                            )}
                        </List>
                    </Drawer>
                </Toolbar>
            </Container>
        </AppBar>
    );
};

export default Navbar;