import {
    Button,
    Chip,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Divider,
    Grid,
    Typography
} from "@mui/material";

const PaymentDetailsDialog = ({
    open,
    payment,
    onClose
}) => {

    if (!payment) return null;

    return (

        <Dialog
            open={open}
            onClose={onClose}
            maxWidth="sm"
            fullWidth
        >

            <DialogTitle>

                Payment Details

            </DialogTitle>

            <DialogContent dividers>

                <Grid
                    container
                    spacing={2}
                >

                    <Grid size={{ xs: 12, md: 6 }}>

                        <Typography fontWeight="bold">

                            Transaction ID

                        </Typography>

                        <Typography>

                            {payment.transactionId}

                        </Typography>

                    </Grid>

                    <Grid size={{ xs: 12, md: 6 }}>

                        <Typography fontWeight="bold">

                            Booking Reference

                        </Typography>

                        <Typography>

                            {payment.bookingReference}

                        </Typography>

                    </Grid>

                    <Grid size={{ xs: 12, md: 6 }}>

                        <Typography fontWeight="bold">

                            Amount

                        </Typography>

                        <Typography>

                            ₹ {payment.amount}

                        </Typography>

                    </Grid>

                    <Grid size={{ xs: 12, md: 6 }}>

                        <Typography fontWeight="bold">

                            Payment Method

                        </Typography>

                        <Typography>

                            {payment.paymentMethod}

                        </Typography>

                    </Grid>

                    <Grid size={{ xs: 12, md: 6 }}>

                        <Typography fontWeight="bold">

                            Status

                        </Typography>

                        <Chip

                            label={payment.paymentStatus}

                            color={
                                payment.paymentStatus === "SUCCESS"
                                    ? "success"
                                    : payment.paymentStatus === "PENDING"
                                    ? "warning"
                                    : "error"
                            }

                        />

                    </Grid>

                    <Grid size={{ xs: 12, md: 6 }}>

                        <Typography fontWeight="bold">

                            Payment Time

                        </Typography>

                        <Typography>

                            {payment.paymentTime}

                        </Typography>

                    </Grid>

                    <Grid size={12}>

                        <Divider sx={{ my: 1 }} />

                    </Grid>

                </Grid>

            </DialogContent>

            <DialogActions>

                <Button

                    variant="contained"

                    onClick={onClose}

                >

                    Close

                </Button>

            </DialogActions>

        </Dialog>

    );

};

export default PaymentDetailsDialog;