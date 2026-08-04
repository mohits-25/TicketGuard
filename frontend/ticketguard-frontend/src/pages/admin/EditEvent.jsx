import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
    Alert,
    Box,
    CircularProgress,
    Paper,
    Typography
} from "@mui/material";
import DashboardLayout from "../../components/layout/DashboardLayout";
import toast from "react-hot-toast";
import EventForm from "../../components/event/EventForm";
import {
    getEventById,
    updateEvent
} from "../../api/adminEventApi";

const EditEvent = () => {

    const { id } = useParams();

    const navigate = useNavigate();

    const [loading, setLoading] = useState(true);

    const [submitting, setSubmitting] = useState(false);

    const [loadError, setLoadError] = useState("");

    const [eventData, setEventData] = useState(null);

    useEffect(() => {

        loadEvent();

    }, [id]);

    const loadEvent = async () => {

        try {

            setLoading(true);

            setLoadError("");

            const data = await getEventById(id);

            setEventData(data);

        } catch (err) {

            setLoadError("Unable to load event details.");

        } finally {

            setLoading(false);

        }

    };

    const handleSubmit = async (payload) => {

        try {

            setSubmitting(true);

            await updateEvent(id, payload);

            toast.success("Event updated successfully");

            navigate("/admin/events");

        } catch (err) {

            toast.error(err.response?.data?.message || "Update failed");

        } finally {

            setSubmitting(false);

        }

    };

    if (loading)

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
                sx={{
                    p: { xs: 2, md: 4 },
                    maxWidth: 980,
                    borderRadius: 3
                }}
            >

                <Typography
                    variant="h4"
                    mb={3}
                    fontWeight="bold"
                >

                    Edit Event

                </Typography>

                <EventForm
                    initialValues={eventData || {}}
                    submitLabel="Update Event"
                    loading={submitting}
                    onSubmit={handleSubmit}
                    onCancel={() => navigate("/admin/events")}
                />

            </Paper>

        </DashboardLayout>

    );

};

export default EditEvent;