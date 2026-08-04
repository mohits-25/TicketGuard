import api from "./axios";

export const getTicketById = async (id) => {

    const response = await api.get(
        `/api/v1/tickets/${id}`
    );

    return response.data;
};

export const getMyTickets = async () => {

    const response = await api.get(
        "/api/v1/tickets/my-tickets"
    );

    return response.data;
};

export const getAllTickets = async () => {

    const response = await api.get(
        "/api/v1/tickets"
    );

    return response.data;
};

export const downloadTicket = async (id) => {

    const response = await api.get(
        `/api/v1/tickets/${id}/download`,
        {
            responseType: "blob"
        }
    );

    const url = window.URL.createObjectURL(
        new Blob([response.data])
    );

    const link = document.createElement("a");

    link.href = url;

    link.download = `ticket-${id}.pdf`;

    document.body.appendChild(link);

    link.click();

    link.remove();
};