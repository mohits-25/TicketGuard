import {
    AppBar,
    Toolbar,
    Typography,
    Button
} from "@mui/material";

import { Link, useNavigate } from "react-router-dom";

import { useAuth } from "../context/AuthContext";

const Navbar = () => {

    const { isAuthenticated, logout } = useAuth();

    const navigate = useNavigate();
const handleLogout = () => {

    logout();

    navigate("/login", { replace: true });

};

    return (

        <AppBar position="static">

            <Toolbar>

                <Typography
                    variant="h5"
                    sx={{
                        flexGrow: 1,
                        fontWeight: "bold"
                    }}
                >

                    🎟 TicketGuard

                </Typography>

                <Button
                    color="inherit"
                    component={Link}
                    to="/"
                >
                    Home
                </Button>

                <Button
                    color="inherit"
                    component={Link}
                    to="/events"
                >
                    Events
                </Button>

                {

                    isAuthenticated ?

                        <>

                            <Button
                                color="inherit"
                                component={Link}
                                to="/dashboard"
                            >
                                Dashboard
                            </Button>

                            <Button
                                color="inherit"
                                onClick={handleLogout}
                            >
                                Logout
                            </Button>

                        </>

                        :

                        <>

                            <Button
                                color="inherit"
                                component={Link}
                                to="/login"
                            >
                                Login
                            </Button>

                            <Button
                                color="inherit"
                                component={Link}
                                to="/register"
                            >
                                Register
                            </Button>

                        </>

                }

            </Toolbar>

        </AppBar>

    );

};

export default Navbar;