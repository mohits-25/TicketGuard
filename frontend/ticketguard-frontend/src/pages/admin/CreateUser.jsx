import { useState } from "react";

import { useNavigate } from "react-router-dom";

import DashboardLayout from "../../components/layout/DashboardLayout";
import UserForm from "../../components/user/UserForm";

import { createUser } from "../../api/adminUserApi";

import toast from "react-hot-toast";

const CreateUser = () => {

    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);

    const handleSubmit = async (formData) => {

        try {

            setLoading(true);

            await createUser(formData);

            toast.success("User created successfully");

            navigate("/admin/users");

        } catch (err) {

            toast.error(

                err.response?.data?.message ||

                "Failed to create user"

            );

        } finally {

            setLoading(false);

        }

    };

    return (

        <DashboardLayout>

            <UserForm

                loading={loading}

                onSubmit={handleSubmit}

            />

        </DashboardLayout>

    );

};

export default CreateUser;