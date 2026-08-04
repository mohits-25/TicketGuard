import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

import {
    Alert,
    Box,
    Button,
    Container,
    MenuItem,
    Paper,
    TextField,
    Typography
} from "@mui/material";

import MainLayout from "../layouts/MainLayout";
import { register } from "../api/authApi";

const Register = () => {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({

        firstName: "",

        lastName: "",

        email: "",

        password: "",

        role: "CUSTOMER"

    });

    const [error, setError] = useState("");

    const [success, setSuccess] = useState("");

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

        setSuccess("");

        try {

            await register(formData);

            setSuccess("Registration successful! Redirecting to Login...");

            setTimeout(() => {

                navigate("/login");

            }, 1500);

        } catch (err) {

            setError(

                err.response?.data?.message ||

                "Registration Failed"

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
                        mt: 6,
                        p: 4
                    }}
                >

                    <Typography
                        variant="h4"
                        align="center"
                        fontWeight="bold"
                    >

                        Create Account

                    </Typography>

                    <Typography
                        align="center"
                        sx={{ mb: 3 }}
                    >

                        Join TicketGuard

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

                    {

                        success &&

                        <Alert
                            severity="success"
                            sx={{ mb: 2 }}
                        >

                            {success}

                        </Alert>

                    }

                    <Box
                        component="form"
                        onSubmit={handleSubmit}
                    >

                        <TextField

                            fullWidth

                            margin="normal"

                            label="First Name"

                            name="firstName"

                            value={formData.firstName}

                            onChange={handleChange}

                            required

                        />

                        <TextField

                            fullWidth

                            margin="normal"

                            label="Last Name"

                            name="lastName"

                            value={formData.lastName}

                            onChange={handleChange}

                            required

                        />

                        <TextField

                            fullWidth

                            margin="normal"

                            label="Email"

                            name="email"

                            type="email"

                            value={formData.email}

                            onChange={handleChange}

                            required

                        />

                        <TextField

                            fullWidth

                            margin="normal"

                            label="Password"

                            name="password"

                            type="password"

                            value={formData.password}

                            onChange={handleChange}

                            required

                        />

                        <TextField

                            select

                            fullWidth

                            margin="normal"

                            label="Role"

                            name="role"

                            value={formData.role}

                            onChange={handleChange}

                        >

                            <MenuItem value="CUSTOMER">

                                CUSTOMER

                            </MenuItem>

                        </TextField>

                        <Button

                            fullWidth

                            variant="contained"

                            type="submit"

                            sx={{ mt: 3 }}

                            disabled={loading}

                        >

                            {

                                loading ?

                                        "Creating Account..."

                                        :

                                        "Register"

                            }

                        </Button>

                    </Box>

                    <Typography
                        align="center"
                        sx={{ mt: 3 }}
                    >

                        Already have an account?

                        {" "}

                        <Link to="/login">

                            Login

                        </Link>

                    </Typography>

                </Paper>

            </Container>

        </MainLayout>

    );

};

export default Register;