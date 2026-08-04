import { useEffect, useMemo, useState } from "react";
import { Box, Button, CircularProgress, Grid, Stack, TextField } from "@mui/material";

const getDefaultValues = () => ({
    name: "",
    address: "",
    city: ""
});

const VenueForm = ({
    initialValues = {},
    submitLabel = "Save Venue",
    loading = false,
    onSubmit,
    onCancel
}) => {

    const [formValues, setFormValues] = useState(getDefaultValues);

    const [errors, setErrors] = useState({});

    const mergedValues = useMemo(
        () => ({
            ...getDefaultValues(),
            ...initialValues
        }),
        [initialValues]
    );

    useEffect(() => {

        setFormValues({
            name: mergedValues.name || "",
            address: mergedValues.address || "",
            city: mergedValues.city || ""
        });

        setErrors({});

    }, [mergedValues]);

    const validate = () => {

        const nextErrors = {};

        if (!formValues.name.trim()) {
            nextErrors.name = "Venue name is required.";
        } else if (formValues.name.trim().length < 3) {
            nextErrors.name = "Venue name must be at least 3 characters.";
        }

        if (!formValues.address.trim()) {
            nextErrors.address = "Address is required.";
        } else if (formValues.address.trim().length < 5) {
            nextErrors.address = "Address must be at least 5 characters.";
        }

        if (!formValues.city.trim()) {
            nextErrors.city = "City is required.";
        }

        setErrors(nextErrors);

        return Object.keys(nextErrors).length === 0;

    };

    const handleChange = (event) => {

        const { name, value } = event.target;

        setFormValues((prev) => ({
            ...prev,
            [name]: value
        }));

        setErrors((prev) => ({
            ...prev,
            [name]: ""
        }));

    };

    const handleSubmit = async (event) => {

        event.preventDefault();

        if (!validate()) {
            return;
        }

        await onSubmit({
            name: formValues.name.trim(),
            address: formValues.address.trim(),
            city: formValues.city.trim()
        });

    };

    return (
        <Box
            component="form"
            onSubmit={handleSubmit}
        >
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <TextField
                        fullWidth
                        required
                        label="Venue Name"
                        name="name"
                        value={formValues.name}
                        onChange={handleChange}
                        error={Boolean(errors.name)}
                        helperText={errors.name}
                    />
                </Grid>

                <Grid item xs={12}>
                    <TextField
                        fullWidth
                        required
                        multiline
                        rows={3}
                        label="Address"
                        name="address"
                        value={formValues.address}
                        onChange={handleChange}
                        error={Boolean(errors.address)}
                        helperText={errors.address}
                    />
                </Grid>

                <Grid item xs={12} md={6}>
                    <TextField
                        fullWidth
                        required
                        label="City"
                        name="city"
                        value={formValues.city}
                        onChange={handleChange}
                        error={Boolean(errors.city)}
                        helperText={errors.city}
                    />
                </Grid>
            </Grid>

            <Stack
                direction={{ xs: "column", sm: "row" }}
                spacing={2}
                justifyContent="flex-end"
                sx={{ mt: 3 }}
            >
                {onCancel && (
                    <Button
                        variant="outlined"
                        onClick={onCancel}
                        disabled={loading}
                    >
                        Cancel
                    </Button>
                )}

                <Button
                    type="submit"
                    variant="contained"
                    disabled={loading}
                    startIcon={loading ? <CircularProgress size={18} color="inherit" /> : null}
                >
                    {loading ? "Saving..." : submitLabel}
                </Button>
            </Stack>
        </Box>
    );

};

export default VenueForm;
