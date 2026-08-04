import { useEffect, useState } from "react";
import { Alert, Box, CircularProgress, Paper, Typography } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import DashboardLayout from "../../components/layout/DashboardLayout";
import VenueForm from "../../components/venue/VenueForm";
import { getVenueById, updateVenue } from "../../api/adminVenueApi";

const EditVenue = () => {

    const { id } = useParams();

    const navigate = useNavigate();

    const [loading, setLoading] = useState(true);

    const [submitting, setSubmitting] = useState(false);

    const [venueData, setVenueData] = useState(null);

    const [loadError, setLoadError] = useState("");

    useEffect(() => {

        loadVenue();

    }, [id]);

    const loadVenue = async () => {

        try {

            setLoading(true);

            setLoadError("");

            const data = await getVenueById(id);

            setVenueData(data);

        } catch (error) {

            setLoadError("Unable to load venue details.");

        } finally {

            setLoading(false);

        }

    };

    const handleUpdateVenue = async (payload) => {

        try {

            setSubmitting(true);

            await updateVenue(id, payload);

            toast.success("Venue updated successfully");

            navigate("/admin/venues");

        } catch (error) {

            toast.error(error.response?.data?.message || "Failed to update venue");

        } finally {

            setSubmitting(false);

        }

    };

    if (loading) {

        return (
            <DashboardLayout>
                <Box
                    textAlign="center"
                    py={8}
                >
                    <CircularProgress />
                </Box>
            </DashboardLayout>
        );

    }

    if (loadError) {

        return (
            <DashboardLayout>
                <Paper
                    sx={{
                        p: 3,
                        maxWidth: 760
                    }}
                >
                    <Alert severity="error">{loadError}</Alert>
                </Paper>
            </DashboardLayout>
        );

    }

    return (
        <DashboardLayout>
            <Paper
                elevation={3}
                sx={{
                    p: { xs: 2, md: 4 },
                    borderRadius: 3,
                    maxWidth: 900
                }}
            >
                <Typography
                    variant="h4"
                    fontWeight="bold"
                    mb={3}
                >
                    Edit Venue
                </Typography>

                <VenueForm
                    initialValues={venueData || {}}
                    submitLabel="Update Venue"
                    loading={submitting}
                    onSubmit={handleUpdateVenue}
                    onCancel={() => navigate("/admin/venues")}
                />
            </Paper>
        </DashboardLayout>
    );

};

export default EditVenue;
