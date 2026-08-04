import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    Typography,
    Divider,
    Grid,
    Chip
} from "@mui/material";

const TicketDetailsDialog = ({
    open,
    ticket,
    onClose
}) => {

    if (!ticket) return null;

    return (

        <Dialog
            open={open}
            onClose={onClose}
            maxWidth="md"
            fullWidth
        >

            <DialogTitle>

                Ticket Details

            </DialogTitle>

            <DialogContent dividers>

                <Grid
                    container
                    spacing={2}
                >

                    <Grid size={{ xs: 12, md: 6 }}>

                        <Typography fontWeight="bold">
                            Ticket Number
                        </Typography>

                        <Typography>
                            {ticket.ticketNumber}
                        </Typography>

                    </Grid>

                    <Grid size={{ xs: 12, md: 6 }}>

                        <Typography fontWeight="bold">
                            Booking Reference
                        </Typography>

                        <Typography>
                            {ticket.bookingReference}
                        </Typography>

                    </Grid>

                    <Grid size={{ xs: 12, md: 6 }}>

                        <Typography fontWeight="bold">
                            Event
                        </Typography>

                        <Typography>
                            {ticket.eventTitle}
                        </Typography>

                    </Grid>

                    <Grid size={{ xs: 12, md: 6 }}>

                        <Typography fontWeight="bold">
                            Venue
                        </Typography>

                        <Typography>
                            {ticket.venueName}
                        </Typography>

                    </Grid>

                    <Grid size={{ xs: 12, md: 6 }}>

                        <Typography fontWeight="bold">
                            Event Date
                        </Typography>

                        <Typography>
                            {ticket.eventDate}
                        </Typography>

                    </Grid>

                    <Grid size={{ xs: 12, md: 6 }}>

                        <Typography fontWeight="bold">
                            Start Time
                        </Typography>

                        <Typography>
                            {ticket.eventStartTime}
                        </Typography>

                    </Grid>

                    <Grid size={{ xs: 12, md: 6 }}>

                        <Typography fontWeight="bold">
                            Tickets
                        </Typography>

                        <Typography>
                            {ticket.numberOfTickets}
                        </Typography>

                    </Grid>

                    <Grid size={{ xs: 12, md: 6 }}>

                        <Typography fontWeight="bold">
                            Amount
                        </Typography>

                        <Typography>
                            ₹ {ticket.totalAmount}
                        </Typography>

                    </Grid>

                    <Grid size={{ xs: 12, md: 6 }}>

                        <Typography fontWeight="bold">
                            Status
                        </Typography>

                        <Chip
                            label={ticket.status}
                            color={
                                ticket.status === "ACTIVE"
                                    ? "success"
                                    : ticket.status === "USED"
                                    ? "primary"
                                    : "error"
                            }
                        />

                    </Grid>

                    <Grid size={{ xs: 12, md: 6 }}>

                        <Typography fontWeight="bold">
                            Issued At
                        </Typography>

                        <Typography>
                            {ticket.issuedAt}
                        </Typography>

                    </Grid>

                    <Grid size={12}>

                        <Divider sx={{ my: 2 }} />

                    </Grid>

                    <Grid size={12}>

                        <Typography fontWeight="bold">
                            QR Code Path
                        </Typography>

                        <Typography
                            color="text.secondary"
                        >
                            {ticket.qrCode}
                        </Typography>

                    </Grid>

                    <Grid size={12}>

                        <Typography fontWeight="bold">
                            PDF Path
                        </Typography>

                        <Typography
                            color="text.secondary"
                        >
                            {ticket.pdfPath}
                        </Typography>

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

export default TicketDetailsDialog;