import { useEffect, useState } from "react";

import {
    CircularProgress,
    Typography
} from "@mui/material";

import DashboardLayout from "../../components/layout/DashboardLayout";

import PaymentCard from "../../components/payment/PaymentCard";

import { getMyPayments } from "../../api/paymentApi";

const MyPayments = () => {

    const [payments, setPayments] = useState([]);

    const [loading, setLoading] = useState(true);

    useEffect(() => {

        loadPayments();

    }, []);

    const loadPayments = async () => {

        try {

            const data = await getMyPayments();

            setPayments(data);

        }

        finally {

            setLoading(false);

        }

    };

    if (loading) {

        return (

            <DashboardLayout>

                <CircularProgress />

            </DashboardLayout>

        );

    }

    return (

        <DashboardLayout>

            <Typography
                variant="h4"
                fontWeight="bold"
                mb={4}
            >

                My Payments

            </Typography>

            {

                payments.map(payment => (

                    <PaymentCard

                        key={payment.id}

                        payment={payment}

                    />

                ))

            }

        </DashboardLayout>

    );

};

export default MyPayments;