import { useEffect, useMemo, useState } from "react";
import {
    Box,
    Button,
    CircularProgress,
    Grid,
    MenuItem,
    Stack,
    TextField
} from "@mui/material";
import { getVenues } from "../../api/adminVenueApi";

const EVENT_CATEGORIES = [
    "MUSIC",
    "SPORTS",
    "TECH",
    "THEATRE",
    "COMEDY",
    "WORKSHOP",
    "CONFERENCE",
    "OTHER"
];

const getDefaultValues = () => ({
    title: "",
    description: "",
    category: "",
    venueId: "",
    eventDate: "",
    startTime: "",
    endTime: "",
    ticketPrice: "",
    totalSeats: "",
    imageUrl: "",
    availableSeats: ""
});

const EventForm = ({
    initialValues = {},
    submitLabel = "Save Event",
    loading = false,
    onSubmit,
    onCancel
}) => {

    const [venues, setVenues] = useState([]);

    const [loadingVenues, setLoadingVenues] = useState(true);

    const [formValues, setFormValues] = useState(getDefaultValues);

    const [errors, setErrors] = useState({});

    const mergedInitialValues = useMemo(
        () => ({
            ...getDefaultValues(),
            ...initialValues
        }),
        [initialValues]
    );

    useEffect(() => {

        let mounted = true;

        const loadVenues = async () => {

            try {

                setLoadingVenues(true);

                const data = await getVenues();

                if (!mounted) {
                    return;
                }

                const venueList = Array.isArray(data) ? data : (data?.content || []);

                setVenues(venueList);

            } finally {

                if (mounted) {
                    setLoadingVenues(false);
                }

            }

        };

        loadVenues();

        return () => {
            mounted = false;
        };

    }, []);

    useEffect(() => {

        const matchedVenue = venues.find(
            (venue) =>
                String(venue.id) === String(mergedInitialValues.venueId) ||
                (mergedInitialValues.venueName && venue.name === mergedInitialValues.venueName)
        );

        setFormValues({
            ...mergedInitialValues,
            venueId: matchedVenue ? String(matchedVenue.id) : (mergedInitialValues.venueId ? String(mergedInitialValues.venueId) : ""),
            ticketPrice: mergedInitialValues.ticketPrice !== "" ? String(mergedInitialValues.ticketPrice) : "",
            totalSeats: mergedInitialValues.totalSeats !== "" ? String(mergedInitialValues.totalSeats) : "",
            availableSeats: mergedInitialValues.availableSeats !== "" ? String(mergedInitialValues.availableSeats) : "",
            eventDate: mergedInitialValues.eventDate || "",
            startTime: mergedInitialValues.startTime || "",
            endTime: mergedInitialValues.endTime || ""
        });

        setErrors({});

    }, [mergedInitialValues, venues]);

    const validate = () => {

        const nextErrors = {};

        if (!formValues.title.trim()) {
            nextErrors.title = "Title is required.";
        } else if (formValues.title.trim().length < 3) {
            nextErrors.title = "Title must be at least 3 characters.";
        }

        if (!formValues.description.trim()) {
            nextErrors.description = "Description is required.";
        } else if (formValues.description.trim().length < 10) {
            nextErrors.description = "Description must be at least 10 characters.";
        }

        if (!formValues.category) {
            nextErrors.category = "Category is required.";
        }

        if (!formValues.venueId) {
            nextErrors.venueId = "Venue is required.";
        }

        if (!formValues.eventDate) {
            nextErrors.eventDate = "Event date is required.";
        }

        if (!formValues.startTime) {
            nextErrors.startTime = "Start time is required.";
        }

        if (!formValues.endTime) {
            nextErrors.endTime = "End time is required.";
        } else if (formValues.startTime && formValues.endTime <= formValues.startTime) {
            nextErrors.endTime = "End time must be after start time.";
        }

        const price = Number(formValues.ticketPrice);

        if (!formValues.ticketPrice) {
            nextErrors.ticketPrice = "Ticket price is required.";
        } else if (Number.isNaN(price) || price <= 0) {
            nextErrors.ticketPrice = "Ticket price must be greater than 0.";
        }

        const seats = Number(formValues.totalSeats);

        if (!formValues.totalSeats) {
            nextErrors.totalSeats = "Total seats is required.";
        } else if (!Number.isInteger(seats) || seats <= 0) {
            nextErrors.totalSeats = "Total seats must be a positive whole number.";
        }

        if (!formValues.imageUrl.trim()) {
            nextErrors.imageUrl = "Image URL is required.";
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

        const totalSeats = Number(formValues.totalSeats);

        const payload = {
            ...formValues,
            title: formValues.title.trim(),
            description: formValues.description.trim(),
            imageUrl: formValues.imageUrl.trim(),
            venueId: Number(formValues.venueId),
            ticketPrice: Number(formValues.ticketPrice),
            totalSeats,
            availableSeats: formValues.availableSeats ? Number(formValues.availableSeats) : totalSeats
        };

        await onSubmit(payload);

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
                        label="Title"
                        name="title"
                        value={formValues.title}
                        onChange={handleChange}
                        error={Boolean(errors.title)}
                        helperText={errors.title}
                    />
                </Grid>

                <Grid item xs={12}>
                    <TextField
                        fullWidth
                        required
                        multiline
                        rows={4}
                        label="Description"
                        name="description"
                        value={formValues.description}
                        onChange={handleChange}
                        error={Boolean(errors.description)}
                        helperText={errors.description}
                    />
                </Grid>

                <Grid item xs={12} md={6}>
                    <TextField
                        select
                        fullWidth
                        required
                        label="Category"
                        name="category"
                        value={formValues.category}
                        onChange={handleChange}
                        error={Boolean(errors.category)}
                        helperText={errors.category}
                    >
                        {EVENT_CATEGORIES.map((category) => (
                            <MenuItem
                                key={category}
                                value={category}
                            >
                                {category}
                            </MenuItem>
                        ))}
                    </TextField>
                </Grid>

                <Grid item xs={12} md={6}>
                    <TextField
                        select
                        fullWidth
                        required
                        label="Venue"
                        name="venueId"
                        value={formValues.venueId}
                        onChange={handleChange}
                        error={Boolean(errors.venueId)}
                        helperText={errors.venueId}
                        disabled={loadingVenues}
                    >
                        {venues.map((venue) => (
                            <MenuItem
                                key={venue.id}
                                value={String(venue.id)}
                            >
                                {venue.name}
                            </MenuItem>
                        ))}
                    </TextField>
                </Grid>

                <Grid item xs={12} md={4}>
                    <TextField
                        fullWidth
                        required
                        type="date"
                        label="Date"
                        name="eventDate"
                        value={formValues.eventDate}
                        onChange={handleChange}
                        error={Boolean(errors.eventDate)}
                        helperText={errors.eventDate}
                        InputLabelProps={{ shrink: true }}
                    />
                </Grid>

                <Grid item xs={12} md={4}>
                    <TextField
                        fullWidth
                        required
                        type="time"
                        label="Start Time"
                        name="startTime"
                        value={formValues.startTime}
                        onChange={handleChange}
                        error={Boolean(errors.startTime)}
                        helperText={errors.startTime}
                        InputLabelProps={{ shrink: true }}
                    />
                </Grid>

                <Grid item xs={12} md={4}>
                    <TextField
                        fullWidth
                        required
                        type="time"
                        label="End Time"
                        name="endTime"
                        value={formValues.endTime}
                        onChange={handleChange}
                        error={Boolean(errors.endTime)}
                        helperText={errors.endTime}
                        InputLabelProps={{ shrink: true }}
                    />
                </Grid>

                <Grid item xs={12} md={6}>
                    <TextField
                        fullWidth
                        required
                        type="number"
                        label="Ticket Price"
                        name="ticketPrice"
                        value={formValues.ticketPrice}
                        onChange={handleChange}
                        error={Boolean(errors.ticketPrice)}
                        helperText={errors.ticketPrice}
                        inputProps={{ min: 1, step: "0.01" }}
                    />
                </Grid>

                <Grid item xs={12} md={6}>
                    <TextField
                        fullWidth
                        required
                        type="number"
                        label="Total Seats"
                        name="totalSeats"
                        value={formValues.totalSeats}
                        onChange={handleChange}
                        error={Boolean(errors.totalSeats)}
                        helperText={errors.totalSeats}
                        inputProps={{ min: 1, step: 1 }}
                    />
                </Grid>

                <Grid item xs={12}>
                    <TextField
                        fullWidth
                        required
                        type="url"
                        label="Image URL"
                        name="imageUrl"
                        value={formValues.imageUrl}
                        onChange={handleChange}
                        error={Boolean(errors.imageUrl)}
                        helperText={errors.imageUrl}
                    />
                </Grid>

                {formValues.imageUrl && (
                    <Grid item xs={12}>
                        <Box
                            component="img"
                            src={formValues.imageUrl}
                            alt="Event preview"
                            sx={{
                                width: "100%",
                                maxHeight: 280,
                                objectFit: "cover",
                                borderRadius: 2,
                                border: "1px solid",
                                borderColor: "divider"
                            }}
                            onError={(event) => {
                                event.currentTarget.style.display = "none";
                            }}
                            onLoad={(event) => {
                                event.currentTarget.style.display = "block";
                            }}
                        />
                    </Grid>
                )}
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
                    disabled={loading || loadingVenues}
                    startIcon={loading ? <CircularProgress size={18} color="inherit" /> : null}
                >
                    {loading ? "Saving..." : submitLabel}
                </Button>
            </Stack>
        </Box>
    );

};

export default EventForm;