import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
    Box,
    Button,
    Container,
    Paper,
    TextField,
    Typography,
    Alert,
    InputAdornment,
    IconButton,
    CircularProgress
} from "@mui/material";

import MainLayout from "../layouts/MainLayout";
import { login as loginApi } from "../api/authApi";
import { useAuth } from "../context/AuthContext";

import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import ConfirmationNumberIcon from "@mui/icons-material/ConfirmationNumber";

const Login = () => {
    const navigate = useNavigate();
    const auth = useAuth();

    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });

    const [showPassword, setShowPassword] = useState(false);
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
            setError(err.response?.data?.message || "Invalid email or password");
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
                    backgroundImage: "radial-gradient(circle at 50% 30%, rgba(79, 70, 229, 0.08) 0%, transparent 60%)"
                }}
            >
                <Container maxWidth="xs">
                    <Paper
                        elevation={0}
                        sx={{
                            p: { xs: 3.5, sm: 4.5 },
                            borderRadius: 6,
                            bgcolor: "#FFFFFF",
                            border: "1px solid #E2E8F0",
                            boxShadow: "0 20px 40px -15px rgba(15, 23, 42, 0.08)"
                        }}
                    >
                        {/* Header Logo & Title */}
                        <Box sx={{ textCenter: "center", textAlign: "center", mb: 3 }}>
                            <Box
                                sx={{
                                    width: 48,
                                    height: 48,
                                    borderRadius: 3.5,
                                    background: "linear-gradient(135deg, #4F46E5 0%, #7C3AED 100%)",
                                    display: "inline-flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    color: "#FFFFFF",
                                    mb: 2,
                                    boxShadow: "0 8px 20px rgba(79, 70, 229, 0.35)"
                                }}
                            >
                                <ConfirmationNumberIcon sx={{ fontSize: 26 }} />
                            </Box>
                            <Typography variant="h4" fontWeight={800} color="#0F172A">
                                Welcome Back
                            </Typography>
                            <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                                Log in to access your digital event passes
                            </Typography>
                        </Box>

                        {error && (
                            <Alert severity="error" sx={{ mb: 3, borderRadius: 3 }}>
                                {error}
                            </Alert>
                        )}

                        <Box component="form" onSubmit={handleSubmit}>
                            <Box sx={{ mb: 2.5 }}>
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
                            </Box>

                            <Box sx={{ mb: 3 }}>
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
                            </Box>

                            <Button
                                fullWidth
                                variant="contained"
                                size="large"
                                type="submit"
                                disabled={loading}
                                sx={{
                                    py: 1.4,
                                    borderRadius: 3.5,
                                    fontWeight: 700,
                                    fontSize: "1rem",
                                    boxShadow: "0 8px 20px rgba(79, 70, 229, 0.35)"
                                }}
                            >
                                {loading ? <CircularProgress size={24} color="inherit" /> : "Sign In"}
                            </Button>
                        </Box>

                        <Typography textAlign="center" variant="body2" color="text.secondary" sx={{ mt: 3.5 }}>
                            Don't have an account?{" "}
                            <Box
                                component={Link}
                                to="/register"
                                sx={{
                                    color: "primary.main",
                                    fontWeight: 700,
                                    textDecoration: "none",
                                    "&:hover": { textDecoration: "underline" }
                                }}
                            >
                                Create Account
                            </Box>
                        </Typography>
                    </Paper>
                </Container>
            </Box>
        </MainLayout>
    );
};

export default Login;