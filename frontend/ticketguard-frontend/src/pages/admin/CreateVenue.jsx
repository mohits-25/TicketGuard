import { useState } from "react";
import { Paper, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import DashboardLayout from "../../components/layout/DashboardLayout";
import VenueForm from "../../components/venue/VenueForm";
import { createVenue } from "../../api/adminVenueApi";

const CreateVenue = () => {

    const navigate = useNavigate();

    const [submitting, setSubmitting] = useState(false);

    const handleCreateVenue = async (payload) => {

        try {

            setSubmitting(true);

            await createVenue(payload);

            toast.success("Venue created successfully");

            navigate("/admin/venues");

        } catch (error) {

            toast.error(error.response?.data?.message || "Failed to create venue");

        } finally {

            setSubmitting(false);

        }

    };

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
                    Create Venue
                </Typography>

                <VenueForm
                    submitLabel="Create Venue"
                    loading={submitting}
                    onSubmit={handleCreateVenue}
                    onCancel={() => navigate("/admin/venues")}
                />
            </Paper>
        </DashboardLayout>
    );

};

export default CreateVenue;