import api from "./axios";

export const getVenues = async () => {

    const response = await api.get("/api/v1/venues");

    return response.data;

};

export const getVenueById = async (id) => {

    const response = await api.get(`/api/v1/venues/${id}`);

    return response.data;

};

export const createVenue = async (data) => {

    const response = await api.post(
        "/api/v1/venues",
        data
    );

    return response.data;

};

export const updateVenue = async (id, data) => {

    const response = await api.put(
        `/api/v1/venues/${id}`,
        data
    );

    return response.data;

};

export const deleteVenue = async (id) => {

    await api.delete(`/api/v1/venues/${id}`);

};