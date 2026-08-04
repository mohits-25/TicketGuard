import api from "./axios";

export const makePayment = async (paymentData) => {

    const response = await api.post(
        "/api/v1/payments",
        paymentData
    );

    return response.data;
};

export const getPaymentById = async (id) => {

    const response = await api.get(
        `/api/v1/payments/${id}`
    );

    return response.data;
};

export const getMyPayments = async () => {

    const response = await api.get(
        "/api/v1/payments/my-payments"
    );

    return response.data;
};

export const getAllPayments = async () => {

    const response = await api.get(
        "/api/v1/payments"
    );

    return response.data;
};