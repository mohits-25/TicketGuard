import api from "./axios";

export const getAllEvents = async () => {

    const response = await api.get("/api/v1/events");

    return response.data;

};

export const getEventById = async (id) => {

    const response = await api.get(
        `/api/v1/events/${id}`
    );

    return response.data;

};