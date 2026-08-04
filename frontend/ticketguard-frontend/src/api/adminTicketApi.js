import api from "./axios";

export const getTickets = async () => {

    const response = await api.get("/api/v1/tickets");

    return response.data;

};

export const getTicketById = async (id) => {

    const response = await api.get(`/api/v1/tickets/${id}`);

    return response.data;

};

export const downloadTicket = async (id) => {

    const response = await api.get(
        `/api/v1/tickets/${id}/download`,
        {
            responseType: "blob"
        }
    );

    return response.data;

};

export const refreshTickets = async () => {

    return await getTickets();

};