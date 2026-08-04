import api from "./axios";

export const createBooking = async (bookingData) => {

    const response = await api.post(
        "/api/v1/bookings",
        bookingData
    );

    return response.data;
};

export const getMyBookings = async () => {

    const response = await api.get(
        "/api/v1/bookings/my-bookings"
    );

    return response.data;
};

export const getBookingById = async (id) => {

    const response = await api.get(
        `/api/v1/bookings/${id}`
    );

    return response.data;
};

export const cancelBooking = async (id) => {

    await api.delete(
        `/api/v1/bookings/${id}`
    );

};

export const getAllBookings = async () => {

    const response = await api.get(
        "/api/v1/bookings"
    );

    return response.data;
};