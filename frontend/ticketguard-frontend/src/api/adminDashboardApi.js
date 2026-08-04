import { getEvents } from "./adminEventApi";
import { getVenues } from "./adminVenueApi";
import { getAllBookings } from "./bookingApi";
import { getAllPayments } from "./paymentApi";
import { getAllTickets } from "./ticketApi";

export const loadDashboard = async () => {

    const [
        events,
        venues,
        bookings,
        payments,
        tickets
    ] = await Promise.all([
        getEvents(),
        getVenues(),
        getAllBookings(),
        getAllPayments(),
        getAllTickets()
    ]);

    return {
        events,
        venues,
        bookings,
        payments,
        tickets
    };
};