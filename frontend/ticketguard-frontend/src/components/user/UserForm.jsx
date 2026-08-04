import { useState } from "react";

import {
    Box,
    Button,
    Grid,
    MenuItem,
    Paper,
    TextField,
    Typography
} from "@mui/material";

const UserForm = ({
    initialValues,
    onSubmit,
    loading
}) => {

    const [formData, setFormData] = useState(

        initialValues || {

            firstName: "",

            lastName: "",

            email: "",

            password: "",

            role: "CUSTOMER"

        }

    );

    const handleChange = (e) => {

        setFormData({

            ...formData,

            [e.target.name]: e.target.value

        });

    };

    const handleSubmit = (e) => {

        e.preventDefault();

        onSubmit(formData);

    };

    return (

        <Paper
            elevation={3}
            sx={{
                p: 4,
                borderRadius: 3
            }}
        >

            <Typography
                variant="h5"
                fontWeight="bold"
                mb={3}
            >

                User Information

            </Typography>

            <Box
                component="form"
                onSubmit={handleSubmit}
            >

                <Grid
                    container
                    spacing={3}
                >

                    <Grid size={{ xs: 12, md: 6 }}>

                        <TextField

                            fullWidth

                            label="First Name"

                            name="firstName"

                            value={formData.firstName}

                            onChange={handleChange}

                            required

                        />

                    </Grid>

                    <Grid size={{ xs: 12, md: 6 }}>

                        <TextField

                            fullWidth

                            label="Last Name"

                            name="lastName"

                            value={formData.lastName}

                            onChange={handleChange}

                            required

                        />

                    </Grid>

                    <Grid size={{ xs: 12 }}>

                        <TextField

                            fullWidth

                            label="Email"

                            type="email"

                            name="email"

                            value={formData.email}

                            onChange={handleChange}

                            required

                        />

                    </Grid>

                    <Grid size={{ xs: 12 }}>

                        <TextField

                            fullWidth

                            label="Password"

                            type="password"

                            name="password"

                            value={formData.password}

                            onChange={handleChange}

                            required

                        />

                    </Grid>

                    <Grid size={{ xs: 12 }}>

                        <TextField

                            select

                            fullWidth

                            label="Role"

                            name="role"

                            value={formData.role}

                            onChange={handleChange}

                        >

                            <MenuItem value="CUSTOMER">

                                CUSTOMER

                            </MenuItem>

                            <MenuItem value="ADMIN">

                                ADMIN

                            </MenuItem>

                        </TextField>

                    </Grid>

                    <Grid size={12}>

                        <Button

                            fullWidth

                            variant="contained"

                            size="large"

                            type="submit"

                            disabled={loading}

                        >

                            {

                                loading

                                    ? "Saving..."

                                    : "Save User"

                            }

                        </Button>

                    </Grid>

                </Grid>

            </Box>

        </Paper>

    );

};

export default UserForm;