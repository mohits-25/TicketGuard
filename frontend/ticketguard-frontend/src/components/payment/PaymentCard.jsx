import {
    Card,
    CardContent,
    Chip,
    Stack,
    Typography
} from "@mui/material";

const PaymentCard = ({ payment }) => {

    return (

        <Card sx={{ mb: 3 }}>

            <CardContent>

                <Typography
                    variant="h6"
                    fontWeight="bold"
                >

                    Transaction

                </Typography>

                <Typography>

                    {payment.transactionId}

                </Typography>

                <Stack
                    direction="row"
                    spacing={4}
                    sx={{ mt:2 }}
                >

                    <Typography>

                        Amount

                        <br />

                        ₹{payment.amount}

                    </Typography>

                    <Typography>

                        {payment.paymentMethod}

                    </Typography>

                    <Chip

                        color={
                            payment.paymentStatus === "SUCCESS"
                                ? "success"
                                : "warning"
                        }

                        label={payment.paymentStatus}

                    />

                </Stack>

            </CardContent>

        </Card>

    );

};

export default PaymentCard;