import api from "./axios";

export const getPayments = async () => {

    const response = await api.get("/api/v1/payments");

    return response.data;

};

export const getPaymentById = async (id) => {

    const response = await api.get(`/api/v1/payments/${id}`);

    return response.data;

};