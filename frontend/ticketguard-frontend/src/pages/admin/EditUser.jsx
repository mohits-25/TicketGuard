import { useEffect, useState } from "react";

import { useNavigate, useParams } from "react-router-dom";

import DashboardLayout from "../../components/layout/DashboardLayout";
import UserForm from "../../components/user/UserForm";

import {
    getUserById,
    updateUser
} from "../../api/adminUserApi";

import {
    Box,
    CircularProgress
} from "@mui/material";

import toast from "react-hot-toast";

const EditUser = () => {

    const { id } = useParams();

    const navigate = useNavigate();

    const [loading, setLoading] = useState(true);

    const [saving, setSaving] = useState(false);

    const [user, setUser] = useState(null);

    useEffect(() => {

        loadUser();

    }, []);

    const loadUser = async () => {

        try {

            const data = await getUserById(id);

            setUser({

                firstName: data.firstName,

                lastName: data.lastName,

                email: data.email,

                password: "",

                role: data.role

            });

        } catch (err) {

            toast.error("Failed to load user");

        } finally {

            setLoading(false);

        }

    };

    const handleSubmit = async (formData) => {

        try {

            setSaving(true);

            await updateUser(id, formData);

            toast.success("User updated successfully");

            navigate("/admin/users");

        } catch (err) {

            toast.error(

                err.response?.data?.message ||

                "Failed to update user"

            );

        } finally {

            setSaving(false);

        }

    };

    if (loading)

        return (

            <DashboardLayout>

                <Box
                    display="flex"
                    justifyContent="center"
                    py={10}
                >

                    <CircularProgress />

                </Box>

            </DashboardLayout>

        );

    return (

        <DashboardLayout>

            <UserForm

                initialValues={user}

                loading={saving}

                onSubmit={handleSubmit}

            />

        </DashboardLayout>

    );

};

export default EditUser;