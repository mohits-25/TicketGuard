import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

import {
    Box,
    Button,
    Container,
    Paper,
    TextField,
    Typography,
    Alert
} from "@mui/material";

import MainLayout from "../layouts/MainLayout";
import { login as loginApi } from "../api/authApi";
import { useAuth } from "../context/AuthContext";

const Login = () => {

    const navigate = useNavigate();

    const auth = useAuth();

    const [formData, setFormData] = useState({

        email: "",

        password: ""

    });

    const [error, setError] = useState("");

    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {

        setFormData({

            ...formData,

            [e.target.name]: e.target.value

        });

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        setLoading(true);

        setError("");

        try {

            const response = await loginApi(formData);

            auth.login(response);

            navigate("/dashboard", { replace: true });

        } catch (err) {

            setError(

                err.response?.data?.message ||

                "Invalid email or password"

            );

        } finally {

            setLoading(false);

        }

    };

    return (

        <MainLayout>

            <Container maxWidth="sm">

                <Paper
                    elevation={4}
                    sx={{
                        mt: 8,
                        p: 4
                    }}
                >

                    <Typography
                        variant="h4"
                        align="center"
                        fontWeight="bold"
                    >

                        Login

                    </Typography>

                    <Typography
                        align="center"
                        sx={{ mb: 3 }}
                    >

                        Welcome back to TicketGuard

                    </Typography>

                    {

                        error &&

                        <Alert
                            severity="error"
                            sx={{ mb: 2 }}
                        >

                            {error}

                        </Alert>

                    }

                    <Box
                        component="form"
                        onSubmit={handleSubmit}
                    >

                        <TextField

                            fullWidth

                            label="Email"

                            name="email"

                            type="email"

                            margin="normal"

                            value={formData.email}

                            onChange={handleChange}

                            required

                        />

                        <TextField

                            fullWidth

                            label="Password"

                            name="password"

                            type="password"

                            margin="normal"

                            value={formData.password}

                            onChange={handleChange}

                            required

                        />

                        <Button

                            fullWidth

                            variant="contained"

                            size="large"

                            sx={{ mt: 3 }}

                            type="submit"

                            disabled={loading}

                        >

                            {

                                loading

                                    ? "Signing In..."

                                    : "Login"

                            }

                        </Button>

                    </Box>

                    <Typography
                        align="center"
                        sx={{ mt: 3 }}
                    >

                        Don't have an account?{" "}

                        <Link to="/register">

                            Register

                        </Link>

                    </Typography>

                </Paper>

            </Container>

        </MainLayout>

    );

};

export default Login;