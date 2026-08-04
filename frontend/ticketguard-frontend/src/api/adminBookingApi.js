import api from "./axios";

export const getBookings = async () => {

    const response = await api.get("/api/v1/bookings");

    return response.data;

};

export const getBookingById = async (id) => {

    const response = await api.get(`/api/v1/bookings/${id}`);

    return response.data;

};

export const cancelBooking = async (id) => {

    await api.delete(`/api/v1/bookings/${id}`);

};