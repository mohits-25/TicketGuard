import { useLocation, useNavigate } from "react";
import { useState } from "react";
import {
    Alert,
    Box,
    Button,
    Container,
    Paper,
    Typography,
    Stack,
    Divider,
    Stepper,
    Step,
    StepLabel,
    CircularProgress
} from "@mui/material";

import MainLayout from "../layouts/MainLayout";
import { makePayment } from "../api/paymentApi";

import CreditCardIcon from "@mui/icons-material/CreditCard";
import QrCodeIcon from "@mui/icons-material/QrCode";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import LockIcon from "@mui/icons-material/Lock";
import CheckCircleOutlinedIcon from "@mui/icons-material/CheckCircleOutlined";

const Payment = () => {
    const navigate = useNavigate();
    const { state } = useLocation();
    const booking = state?.booking;

    const [paymentMethod, setPaymentMethod] = useState("CARD");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    if (!booking) {
        return (
            <MainLayout>
                <Container maxWidth="sm" sx={{ py: 10, textAlign: "center" }}>
                    <Alert severity="warning" sx={{ borderRadius: 3, mb: 3 }}>
                        No active booking found for checkout.
                    </Alert>
                    <Button variant="contained" onClick={() => navigate("/events")} sx={{ borderRadius: 3 }}>
                        Browse Events
                    </Button>
                </Container>
            </MainLayout>
        );
    }

    const handlePayment = async () => {
        try {
            setLoading(true);
            setError("");

            const payment = await makePayment({
                bookingId: booking.id,
                paymentMethod
            });

            navigate("/tickets", {
                state: {
                    payment
                }
            });
        } catch (err) {
            setError(err.response?.data?.message || "Payment authorization failed. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const paymentMethods = [
        { id: "CARD", label: "Credit / Debit Card", icon: <CreditCardIcon />, desc: "Visa, Mastercard, RuPay" },
        { id: "UPI", label: "UPI Instant Scan", icon: <QrCodeIcon />, desc: "GPay, PhonePe, Paytm" },
        { id: "NET_BANKING", label: "Net Banking", icon: <AccountBalanceIcon />, desc: "All major Indian banks" }
    ];

    return (
        <MainLayout>
            <Box sx={{ bgcolor: "#F8FAFC", py: 8, minHeight: "calc(100vh - 180px)" }}>
                <Container maxWidth="sm">
                    {/* Stepper Progress */}
                    <Box sx={{ mb: 5 }}>
                        <Stepper activeStep={1} alternativeLabel>
                            <Step key="Select Passes">
                                <StepLabel>Select Passes</StepLabel>
                            </Step>
                            <Step key="Checkout Payment">
                                <StepLabel>Payment</StepLabel>
                            </Step>
                            <Step key="Get QR Pass">
                                <StepLabel>Pass Issued</StepLabel>
                            </Step>
                        </Stepper>
                    </Box>

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
                        <Typography variant="overline" color="primary" fontWeight={800} letterSpacing={1}>
                            PAYMENT CHECKOUT
                        </Typography>
                        <Typography variant="h4" fontWeight={800} color="#0F172A" sx={{ mb: 1 }}>
                            Confirm Payment
                        </Typography>

                        <Paper
                            elevation={0}
                            sx={{
                                p: 2.5,
                                borderRadius: 4,
                                bgcolor: "#F8FAFC",
                                border: "1px solid #E2E8F0",
                                my: 3
                            }}
                        >
                            <Stack spacing={1.5}>
                                <Stack direction="row" justifyContent="space-between">
                                    <Typography variant="body2" color="text.secondary">
                                        Booking Reference
                                    </Typography>
                                    <Typography variant="subtitle2" fontWeight={800} color="secondary.main">
                                        {booking.bookingReference}
                                    </Typography>
                                </Stack>

                                <Stack direction="row" justifyContent="space-between">
                                    <Typography variant="body2" color="text.secondary">
                                        Tickets Reserved
                                    </Typography>
                                    <Typography variant="body2" fontWeight={700}>
                                        {booking.numberOfTickets} Pass(es)
                                    </Typography>
                                </Stack>

                                <Divider sx={{ my: 1 }} />

                                <Stack direction="row" justifyContent="space-between" alignItems="baseline">
                                    <Typography variant="subtitle1" fontWeight={800} color="#0F172A">
                                        Total Amount Due
                                    </Typography>
                                    <Typography variant="h4" fontWeight={800} color="primary.main">
                                        ₹{booking.totalAmount}
                                    </Typography>
                                </Stack>
                            </Stack>
                        </Paper>

                        {error && (
                            <Alert severity="error" sx={{ mb: 3, borderRadius: 3 }}>
                                {error}
                            </Alert>
                        )}

                        <Typography variant="subtitle2" fontWeight={700} color="#0F172A" sx={{ mb: 1.5 }}>
                            Select Payment Method
                        </Typography>

                        <Stack spacing={1.5} sx={{ mb: 4 }}>
                            {paymentMethods.map((pm) => {
                                const selected = paymentMethod === pm.id;
                                return (
                                    <Paper
                                        key={pm.id}
                                        elevation={0}
                                        onClick={() => setPaymentMethod(pm.id)}
                                        sx={{
                                            p: 2,
                                            borderRadius: 4,
                                            border: selected ? "2px solid #4F46E5" : "1px solid #E2E8F0",
                                            bgcolor: selected ? "#EEF2FF" : "#FFFFFF",
                                            cursor: "pointer",
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "space-between",
                                            transition: "all 0.2s ease"
                                        }}
                                    >
                                        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                                            <Box sx={{ color: selected ? "primary.main" : "#64748B" }}>{pm.icon}</Box>
                                            <Box>
                                                <Typography variant="subtitle2" fontWeight={700} color="#0F172A">
                                                    {pm.label}
                                                </Typography>
                                                <Typography variant="caption" color="text.secondary">
                                                    {pm.desc}
                                                </Typography>
                                            </Box>
                                        </Box>

                                        {selected && <CheckCircleOutlinedIcon color="primary" fontSize="small" />}
                                    </Paper>
                                );
                            })}
                        </Stack>

                        <Button
                            fullWidth
                            variant="contained"
                            size="large"
                            disabled={loading}
                            onClick={handlePayment}
                            startIcon={loading ? <CircularProgress size={20} color="inherit" /> : <LockIcon />}
                            sx={{
                                py: 1.6,
                                borderRadius: 3.5,
                                fontWeight: 800,
                                fontSize: "1.05rem",
                                boxShadow: "0 8px 24px rgba(79, 70, 229, 0.35)"
                            }}
                        >
                            {loading ? "Authorizing Payment..." : `Pay ₹${booking.totalAmount} Now`}
                        </Button>

                        <Typography textAlign="center" variant="caption" color="text.secondary" display="block" sx={{ mt: 2.5 }}>
                            🔒 256-Bit SSL Encrypted Payment Gateway
                        </Typography>
                    </Paper>
                </Container>
            </Box>
        </MainLayout>
    );
};

export default Payment;