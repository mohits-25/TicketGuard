import {
    Avatar,
    Box,
    Divider,
    Drawer,
    List,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Toolbar,
    Typography
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

import { Link, useNavigate } from "react-router-dom";

import { useAuth } from "../../context/AuthContext";

const drawerWidth = 260;

const menuStyle = {
    mx: 1,
    my: 0.5,
    borderRadius: 2,
    color: "white",
    "&:hover": {
        bgcolor: "#1E3A8A"
    }
};

const iconStyle = {
    color: "white",
    minWidth: 40
};

const Sidebar = () => {

    const { user, logout } = useAuth();

    const navigate = useNavigate();

    const handleLogout = () => {

        logout();

        navigate("/login", {
            replace: true
        });

    };

    return (

        <Drawer
            variant="permanent"
            sx={{
                width: drawerWidth,
                flexShrink: 0,

                "& .MuiDrawer-paper": {

                    width: drawerWidth,

                    backgroundColor: "#111827",

                    color: "white",

                    borderRight: "none"

                }

            }}
        >

            <Toolbar />

            {/* User */}

            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    px: 2,
                    py: 3
                }}
            >

                <Avatar
                    sx={{
                        width: 72,
                        height: 72,
                        bgcolor: "primary.main",
                        fontSize: 28,
                        mb: 2
                    }}
                >

                    {user?.firstName?.charAt(0)}

                </Avatar>

                <Typography
                    variant="h6"
                    fontWeight="bold"
                >

                    {user?.firstName} {user?.lastName}

                </Typography>

                <Typography
                    variant="body2"
                    sx={{
                        color: "#D1D5DB"
                    }}
                >

                    {user?.email}

                </Typography>

                <Typography
                    variant="caption"
                    sx={{
                        mt: 1,
                        color: "#60A5FA",
                        fontWeight: "bold"
                    }}
                >

                    {user?.role}

                </Typography>

            </Box>

            <Divider
                sx={{
                    borderColor: "rgba(255,255,255,0.15)"
                }}
            />

            <List>

                {/* CUSTOMER */}

                <ListItemButton
                    component={Link}
                    to="/dashboard"
                    sx={menuStyle}
                >

                    <ListItemIcon sx={iconStyle}>
                        <DashboardIcon />
                    </ListItemIcon>

                    <ListItemText primary="Dashboard" />

                </ListItemButton>

                <ListItemButton
                    component={Link}
                    to="/my-bookings"
                    sx={menuStyle}
                >

                    <ListItemIcon sx={iconStyle}>
                        <ConfirmationNumberIcon />
                    </ListItemIcon>

                    <ListItemText primary="My Bookings" />

                </ListItemButton>

                <ListItemButton
                    component={Link}
                    to="/my-payments"
                    sx={menuStyle}
                >

                    <ListItemIcon sx={iconStyle}>
                        <PaymentIcon />
                    </ListItemIcon>

                    <ListItemText primary="My Payments" />

                </ListItemButton>

                <ListItemButton
                    component={Link}
                    to="/my-tickets"
                    sx={menuStyle}
                >

                    <ListItemIcon sx={iconStyle}>
                        <LocalActivityIcon />
                    </ListItemIcon>

                    <ListItemText primary="My Tickets" />

                </ListItemButton>

                <ListItemButton
                    component={Link}
                    to="/profile"
                    sx={menuStyle}
                >

                    <ListItemIcon sx={iconStyle}>
                        <PersonIcon />
                    </ListItemIcon>

                    <ListItemText primary="Profile" />

                </ListItemButton>

                {/* ADMIN */}

                {

                    user?.role === "ADMIN" && (

                        <>

                            <Divider
                                sx={{
                                    my: 2,
                                    borderColor: "rgba(255,255,255,0.15)"
                                }}
                            />

                            <Typography
                                sx={{
                                    px: 3,
                                    mb: 1,
                                    fontWeight: "bold",
                                    color: "#9CA3AF",
                                    letterSpacing: 1
                                }}
                            >

                                ADMIN

                            </Typography>

                            <ListItemButton
                                component={Link}
                                to="/admin"
                                sx={menuStyle}
                            >

                                <ListItemIcon sx={iconStyle}>
                                    <AdminPanelSettingsIcon />
                                </ListItemIcon>

                                <ListItemText primary="Dashboard" />

                            </ListItemButton>

                            <ListItemButton
                                component={Link}
                                to="/admin/events"
                                sx={menuStyle}
                            >

                                <ListItemIcon sx={iconStyle}>
                                    <ConfirmationNumberIcon />
                                </ListItemIcon>

                                <ListItemText primary="Manage Events" />

                            </ListItemButton>

                            <ListItemButton
                                component={Link}
                                to="/admin/venues"
                                sx={menuStyle}
                            >

                                <ListItemIcon sx={iconStyle}>
                                    <LocationCityIcon />
                                </ListItemIcon>

                                <ListItemText primary="Manage Venues" />

                            </ListItemButton>

                            <ListItemButton
                                component={Link}
                                to="/admin/users"
                                sx={menuStyle}
                            >

                                <ListItemIcon sx={iconStyle}>
                                    <PersonIcon />
                                </ListItemIcon>

                                <ListItemText primary="Manage Users" />

                            </ListItemButton>

                            <ListItemButton
                                component={Link}
                                to="/admin/bookings"
                                sx={menuStyle}
                            >

                                <ListItemIcon sx={iconStyle}>
                                    <BookOnlineIcon />
                                </ListItemIcon>

                                <ListItemText primary="Manage Bookings" />

                            </ListItemButton>

                            <ListItemButton
                                component={Link}
                                to="/admin/payments"
                                sx={menuStyle}
                            >

                                <ListItemIcon sx={iconStyle}>
                                    <PaymentIcon />
                                </ListItemIcon>

                                <ListItemText primary="Manage Payments" />

                            </ListItemButton>

                            <ListItemButton
                                component={Link}
                                to="/admin/tickets"
                                sx={menuStyle}
                            >

                                <ListItemIcon sx={iconStyle}>
                                    <LocalActivityIcon />
                                </ListItemIcon>

                                <ListItemText primary="Manage Tickets" />

                            </ListItemButton>

                        </>

                    )

                }

                <Divider
                    sx={{
                        my: 2,
                        borderColor: "rgba(255,255,255,0.15)"
                    }}
                />

                <ListItemButton
                    onClick={handleLogout}
                    sx={menuStyle}
                >

                    <ListItemIcon sx={iconStyle}>
                        <LogoutIcon color="error" />
                    </ListItemIcon>

                    <ListItemText primary="Logout" />

                </ListItemButton>

            </List>

        </Drawer>

    );

};

export default Sidebar;