import { useEffect, useState } from "react";

import {
    CircularProgress,
    Typography
} from "@mui/material";

import DashboardLayout from "../../components/layout/DashboardLayout";

import BookingCard from "../../components/booking/BookingCard";

import { getMyBookings } from "../../api/bookingApi";

const MyBookings = () => {

    const [bookings, setBookings] = useState([]);

    const [loading, setLoading] = useState(true);

    useEffect(() => {

        loadBookings();

    }, []);

    const loadBookings = async () => {

        try {

            const data = await getMyBookings();

            setBookings(data);

        }

        finally {

            setLoading(false);

        }

    };

    if (loading) {

        return (

            <DashboardLayout>

                <CircularProgress />

            </DashboardLayout>

        );

    }

    return (

        <DashboardLayout>

            <Typography
                variant="h4"
                fontWeight="bold"
                mb={4}
            >

                My Bookings

            </Typography>

            {

                bookings.map((booking) => (

                    <BookingCard

                        key={booking.id}

                        booking={booking}

                    />

                ))

            }

        </DashboardLayout>

    );

};

export default MyBookings;