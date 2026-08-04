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

const UserDetailsDialog = ({
    open,
    user,
    onClose
}) => {

    if (!user) return null;

    return (

        <Dialog
            open={open}
            onClose={onClose}
            maxWidth="sm"
            fullWidth
        >

            <DialogTitle>

                User Details

            </DialogTitle>

            <DialogContent dividers>

                <Grid
                    container
                    spacing={2}
                >

                    <Grid size={{ xs: 12, md: 6 }}>

                        <Typography fontWeight="bold">

                            ID

                        </Typography>

                        <Typography>

                            {user.id}

                        </Typography>

                    </Grid>

                    <Grid size={{ xs: 12, md: 6 }}>

                        <Typography fontWeight="bold">

                            Role

                        </Typography>

                        <Chip

                            label={user.role}

                            color={
                                user.role === "ADMIN"
                                    ? "error"
                                    : "primary"
                            }

                        />

                    </Grid>

                    <Grid size={{ xs: 12, md: 6 }}>

                        <Typography fontWeight="bold">

                            First Name

                        </Typography>

                        <Typography>

                            {user.firstName}

                        </Typography>

                    </Grid>

                    <Grid size={{ xs: 12, md: 6 }}>

                        <Typography fontWeight="bold">

                            Last Name

                        </Typography>

                        <Typography>

                            {user.lastName}

                        </Typography>

                    </Grid>

                    <Grid size={12}>

                        <Divider sx={{ my: 1 }} />

                    </Grid>

                    <Grid size={12}>

                        <Typography fontWeight="bold">

                            Email

                        </Typography>

                        <Typography>

                            {user.email}

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

export default UserDetailsDialog;