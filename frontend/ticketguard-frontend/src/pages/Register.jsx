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
    Typography,
    Grid,
    InputAdornment,
    IconButton,
    CircularProgress
} from "@mui/material";

import MainLayout from "../layouts/MainLayout";
import { register } from "../api/authApi";

import PersonIcon from "@mui/icons-material/Person";
import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";
import BadgeIcon from "@mui/icons-material/Badge";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import ConfirmationNumberIcon from "@mui/icons-material/ConfirmationNumber";

const Register = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        role: "CUSTOMER"
    });

    const [showPassword, setShowPassword] = useState(false);
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
            setSuccess("Account created successfully! Redirecting to login...");
            setTimeout(() => {
                navigate("/login");
            }, 1500);
        } catch (err) {
            setError(err.response?.data?.message || "Registration failed. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <MainLayout>
            <Box
                sx={{
                    minHeight: "calc(100vh - 180px)",
                    display: "flex",
                    alignItems: "center",
                    py: 8,
                    bgcolor: "#F8FAFC",
                    backgroundImage: "radial-gradient(circle at 50% 30%, rgba(124, 58, 237, 0.08) 0%, transparent 60%)"
                }}
            >
                <Container maxWidth="sm">
                    <Paper
                        elevation={0}
                        sx={{
                            p: { xs: 3.5, sm: 5 },
                            borderRadius: 6,
                            bgcolor: "#FFFFFF",
                            border: "1px solid #E2E8F0",
                            boxShadow: "0 20px 40px -15px rgba(15, 23, 42, 0.08)"
                        }}
                    >
                        {/* Header Logo */}
                        <Box sx={{ textAlign: "center", mb: 3.5 }}>
                            <Box
                                sx={{
                                    width: 48,
                                    height: 48,
                                    borderRadius: 3.5,
                                    background: "linear-gradient(135deg, #7C3AED 0%, #4F46E5 100%)",
                                    display: "inline-flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    color: "#FFFFFF",
                                    mb: 2,
                                    boxShadow: "0 8px 20px rgba(124, 58, 237, 0.35)"
                                }}
                            >
                                <ConfirmationNumberIcon sx={{ fontSize: 26 }} />
                            </Box>
                            <Typography variant="h4" fontWeight={800} color="#0F172A">
                                Create Account
                            </Typography>
                            <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                                Join TicketGuard to discover and book authentic event passes
                            </Typography>
                        </Box>

                        {error && (
                            <Alert severity="error" sx={{ mb: 3, borderRadius: 3 }}>
                                {error}
                            </Alert>
                        )}

                        {success && (
                            <Alert severity="success" sx={{ mb: 3, borderRadius: 3 }}>
                                {success}
                            </Alert>
                        )}

                        <Box component="form" onSubmit={handleSubmit}>
                            <Grid container spacing={2.5}>
                                <Grid item xs={12} sm={6}>
                                    <Typography variant="caption" fontWeight={700} color="#0F172A" sx={{ mb: 0.5, display: "block" }}>
                                        First Name
                                    </Typography>
                                    <TextField
                                        fullWidth
                                        name="firstName"
                                        placeholder="John"
                                        value={formData.firstName}
                                        onChange={handleChange}
                                        required
                                        InputProps={{
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                    <PersonIcon sx={{ color: "#94A3B8" }} />
                                                </InputAdornment>
                                            )
                                        }}
                                    />
                                </Grid>

                                <Grid item xs={12} sm={6}>
                                    <Typography variant="caption" fontWeight={700} color="#0F172A" sx={{ mb: 0.5, display: "block" }}>
                                        Last Name
                                    </Typography>
                                    <TextField
                                        fullWidth
                                        name="lastName"
                                        placeholder="Doe"
                                        value={formData.lastName}
                                        onChange={handleChange}
                                        required
                                        InputProps={{
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                    <PersonIcon sx={{ color: "#94A3B8" }} />
                                                </InputAdornment>
                                            )
                                        }}
                                    />
                                </Grid>

                                <Grid item xs={12}>
                                    <Typography variant="caption" fontWeight={700} color="#0F172A" sx={{ mb: 0.5, display: "block" }}>
                                        Email Address
                                    </Typography>
                                    <TextField
                                        fullWidth
                                        name="email"
                                        type="email"
                                        placeholder="name@example.com"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                        InputProps={{
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                    <EmailIcon sx={{ color: "#94A3B8" }} />
                                                </InputAdornment>
                                            )
                                        }}
                                    />
                                </Grid>

                                <Grid item xs={12}>
                                    <Typography variant="caption" fontWeight={700} color="#0F172A" sx={{ mb: 0.5, display: "block" }}>
                                        Password
                                    </Typography>
                                    <TextField
                                        fullWidth
                                        name="password"
                                        type={showPassword ? "text" : "password"}
                                        placeholder="••••••••"
                                        value={formData.password}
                                        onChange={handleChange}
                                        required
                                        InputProps={{
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                    <LockIcon sx={{ color: "#94A3B8" }} />
                                                </InputAdornment>
                                            ),
                                            endAdornment: (
                                                <InputAdornment position="end">
                                                    <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                                    </IconButton>
                                                </InputAdornment>
                                            )
                                        }}
                                    />
                                </Grid>

                                <Grid item xs={12}>
                                    <Typography variant="caption" fontWeight={700} color="#0F172A" sx={{ mb: 0.5, display: "block" }}>
                                        Account Type
                                    </Typography>
                                    <TextField
                                        select
                                        fullWidth
                                        name="role"
                                        value={formData.role}
                                        onChange={handleChange}
                                        InputProps={{
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                    <BadgeIcon sx={{ color: "#94A3B8" }} />
                                                </InputAdornment>
                                            )
                                        }}
                                    >
                                        <MenuItem value="CUSTOMER">Customer (Book & Attend Events)</MenuItem>
                                    </TextField>
                                </Grid>
                            </Grid>

                            <Button
                                fullWidth
                                variant="contained"
                                color="secondary"
                                size="large"
                                type="submit"
                                disabled={loading}
                                sx={{
                                    mt: 4,
                                    py: 1.4,
                                    borderRadius: 3.5,
                                    fontWeight: 700,
                                    fontSize: "1rem",
                                    boxShadow: "0 8px 20px rgba(124, 58, 237, 0.35)"
                                }}
                            >
                                {loading ? <CircularProgress size={24} color="inherit" /> : "Create Account"}
                            </Button>
                        </Box>

                        <Typography textAlign="center" variant="body2" color="text.secondary" sx={{ mt: 3.5 }}>
                            Already have an account?{" "}
                            <Box
                                component={Link}
                                to="/login"
                                sx={{
                                    color: "secondary.main",
                                    fontWeight: 700,
                                    textDecoration: "none",
                                    "&:hover": { textDecoration: "underline" }
                                }}
                            >
                                Sign In
                            </Box>
                        </Typography>
                    </Paper>
                </Container>
            </Box>
        </MainLayout>
    );
};

export default Register;