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

const BookingDetailsDialog = ({
    open,
    booking,
    onClose
}) => {

    if (!booking) return null;

    return (

        <Dialog
            open={open}
            onClose={onClose}
            maxWidth="md"
            fullWidth
        >

            <DialogTitle>

                Booking Details

            </DialogTitle>

            <DialogContent dividers>

                <Grid
                    container
                    spacing={2}
                >

                    <Grid size={{ xs: 12, md: 6 }}>

                        <Typography fontWeight="bold">

                            Booking Reference

                        </Typography>

                        <Typography>

                            {booking.bookingReference}

                        </Typography>

                    </Grid>

                    <Grid size={{ xs: 12, md: 6 }}>

                        <Typography fontWeight="bold">

                            Status

                        </Typography>

                        <Chip

                            label={booking.status}

                            color={
                                booking.status === "CONFIRMED"
                                    ? "success"
                                    : booking.status === "PENDING"
                                    ? "warning"
                                    : "error"
                            }

                        />

                    </Grid>

                    <Grid size={{ xs: 12, md: 6 }}>

                        <Typography fontWeight="bold">

                            Event

                        </Typography>

                        <Typography>

                            {booking.eventTitle}

                        </Typography>

                    </Grid>

                    <Grid size={{ xs: 12, md: 6 }}>

                        <Typography fontWeight="bold">

                            Venue

                        </Typography>

                        <Typography>

                            {booking.venueName}

                        </Typography>

                    </Grid>

                    <Grid size={{ xs: 12, md: 6 }}>

                        <Typography fontWeight="bold">

                            Event Date

                        </Typography>

                        <Typography>

                            {booking.eventDate}

                        </Typography>

                    </Grid>

                    <Grid size={{ xs: 12, md: 6 }}>

                        <Typography fontWeight="bold">

                            Start Time

                        </Typography>

                        <Typography>

                            {booking.startTime}

                        </Typography>

                    </Grid>

                    <Grid size={{ xs: 12, md: 6 }}>

                        <Typography fontWeight="bold">

                            Tickets

                        </Typography>

                        <Typography>

                            {booking.numberOfTickets}

                        </Typography>

                    </Grid>

                    <Grid size={{ xs: 12, md: 6 }}>

                        <Typography fontWeight="bold">

                            Price Per Ticket

                        </Typography>

                        <Typography>

                            ₹ {booking.pricePerTicket}

                        </Typography>

                    </Grid>

                    <Grid size={{ xs: 12, md: 6 }}>

                        <Typography fontWeight="bold">

                            Total Amount

                        </Typography>

                        <Typography>

                            ₹ {booking.totalAmount}

                        </Typography>

                    </Grid>

                    <Grid size={{ xs: 12, md: 6 }}>

                        <Typography fontWeight="bold">

                            Booking Time

                        </Typography>

                        <Typography>

                            {booking.bookingTime}

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

export default BookingDetailsDialog;