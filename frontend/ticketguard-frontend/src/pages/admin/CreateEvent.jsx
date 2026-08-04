import { useState } from "react";
import { Paper, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import DashboardLayout from "../../components/layout/DashboardLayout";
import EventForm from "../../components/event/EventForm";
import { createEvent } from "../../api/adminEventApi";

const CreateEvent = () => {

    const navigate = useNavigate();

    const [submitting, setSubmitting] = useState(false);

    const handleCreateEvent = async (payload) => {

        try {

            setSubmitting(true);

            await createEvent(payload);

            toast.success("Event created successfully");

            navigate("/admin/events");

        } catch (error) {

            toast.error(error.response?.data?.message || "Failed to create event");

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
                    maxWidth: 980
                }}
            >
                <Typography
                    variant="h4"
                    fontWeight="bold"
                    mb={3}
                >
                    Create Event
                </Typography>

                <EventForm
                    submitLabel="Create Event"
                    loading={submitting}
                    onSubmit={handleCreateEvent}
                    onCancel={() => navigate("/admin/events")}
                />
            </Paper>
        </DashboardLayout>
    );

};

export default CreateEvent;