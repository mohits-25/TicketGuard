import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";

import {
    Alert,
    Box,
    Button,
    Card,
    CardContent,
    Container,
    MenuItem,
    TextField,
    Typography
} from "@mui/material";

import MainLayout from "../layouts/MainLayout";
import { makePayment } from "../api/paymentApi";

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

                <Container sx={{ mt: 5 }}>

                    <Alert severity="warning">

                        No booking found.

                    </Alert>

                </Container>

            </MainLayout>

        );

    }

    const handlePayment = async () => {

        try {

            setLoading(true);

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

            setError(

                err.response?.data?.message ||

                "Payment Failed"

            );

        } finally {

            setLoading(false);

        }

    };

    return (

        <MainLayout>

            <Container maxWidth="sm" sx={{ mt: 5 }}>

                <Card>

                    <CardContent>

                        <Typography
                            variant="h4"
                            gutterBottom
                        >

                            Payment

                        </Typography>

                        <Typography>

                            Booking Reference

                        </Typography>

                        <Typography
                            fontWeight="bold"
                        >

                            {booking.bookingReference}

                        </Typography>

                        <Typography sx={{ mt: 3 }}>

                            Total Amount

                        </Typography>

                        <Typography
                            variant="h4"
                            color="primary"
                        >

                            ₹ {booking.totalAmount}

                        </Typography>

                        <TextField

                            select

                            fullWidth

                            sx={{ mt: 4 }}

                            label="Payment Method"

                            value={paymentMethod}

                            onChange={(e) =>
                                setPaymentMethod(
                                    e.target.value
                                )
                            }

                        >

                            <MenuItem value="CARD">

                                CARD

                            </MenuItem>

                            <MenuItem value="UPI">

                                UPI

                            </MenuItem>

                            <MenuItem value="NET_BANKING">

                                NET BANKING

                            </MenuItem>

                        </TextField>

                        {

                            error &&

                            <Alert
                                severity="error"
                                sx={{ mt: 2 }}
                            >

                                {error}

                            </Alert>

                        }

                        <Box sx={{ mt: 4 }}>

                            <Button

                                fullWidth

                                variant="contained"

                                size="large"

                                disabled={loading}

                                onClick={handlePayment}

                            >

                                {

                                    loading ?

                                            "Processing..."

                                            :

                                            "Pay Now"

                                }

                            </Button>

                        </Box>

                    </CardContent>

                </Card>

            </Container>

        </MainLayout>

    );

};

export default Payment;