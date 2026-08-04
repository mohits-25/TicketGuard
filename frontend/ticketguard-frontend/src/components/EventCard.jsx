import {
    Card,
    CardContent,
    CardActions,
    Typography,
    Button
} from "@mui/material";

import { useNavigate } from "react-router-dom";

const EventCard = ({ event }) => {

    const navigate = useNavigate();

    return (

        <Card elevation={3}>

            <CardContent>

                <Typography
                    variant="h5"
                    fontWeight="bold"
                >
                    {event.title}
                </Typography>

                <Typography>
                    📍 {event.venueName}
                </Typography>

                <Typography>
                    📅 {event.eventDate}
                </Typography>

                <Typography
                    color="primary"
                    fontWeight="bold"
                >
                    ₹ {event.ticketPrice}
                </Typography>

            </CardContent>

            <CardActions>

                <Button
                    variant="contained"
                    fullWidth
                    onClick={() =>
                        navigate(`/events/${event.id}`)
                    }
                >
                    View Details
                </Button>

            </CardActions>

        </Card>

    );

};

export default EventCard;