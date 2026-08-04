import api from "./axios";

export const getUsers = async () => {

    const response = await api.get("/api/v1/users");

    return response.data;

};

export const getUserById = async (id) => {

    const response = await api.get(`/api/v1/users/${id}`);

    return response.data;

};

export const createUser = async (data) => {

    const response = await api.post(
        "/api/v1/users",
        data
    );

    return response.data;

};

export const updateUser = async (id, data) => {

    const response = await api.put(
        `/api/v1/users/${id}`,
        data
    );

    return response.data;

};

export const deleteUser = async (id) => {

    await api.delete(`/api/v1/users/${id}`);

};