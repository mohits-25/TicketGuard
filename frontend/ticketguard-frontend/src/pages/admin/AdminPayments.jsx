import { useEffect, useMemo, useState } from "react";

import {
    Box,
    Button,
    Chip,
    CircularProgress,
    IconButton,
    InputAdornment,
    Paper,
    Stack,
    TextField,
    Typography
} from "@mui/material";

import { DataGrid } from "@mui/x-data-grid";

import SearchIcon from "@mui/icons-material/Search";
import RefreshIcon from "@mui/icons-material/Refresh";
import VisibilityIcon from "@mui/icons-material/Visibility";

import DashboardLayout from "../../components/layout/DashboardLayout";
import PaymentDetailsDialog from "../../components/payment/PaymentDetailsDialog";

import {
    getPayments
} from "../../api/adminPaymentApi";

const AdminPayments = () => {

    const [rows, setRows] = useState([]);

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState("");

    const [search, setSearch] = useState("");

    const [detailsOpen, setDetailsOpen] = useState(false);

    const [selectedPayment, setSelectedPayment] = useState(null);


    useEffect(() => {

        loadPayments();

    }, []);


    const loadPayments = async () => {

        try {

            setLoading(true);

            setError("");

            const data = await getPayments();

            setRows(Array.isArray(data) ? data : []);

        } catch (err) {

            console.error(err);

            setError("Failed to load payments.");

        } finally {

            setLoading(false);

        }

    };


    const handleView = (payment) => {

        setSelectedPayment(payment);

        setDetailsOpen(true);

    };


    const filteredRows = useMemo(() => {

        const keyword = search
            .trim()
            .toLowerCase();

        if (!keyword) {

            return rows;

        }

        return rows.filter(payment => {

            const transactionId =
                payment.transactionId?.toLowerCase() || "";

            const bookingReference =
                payment.bookingReference?.toLowerCase() || "";

            const paymentMethod =
                payment.paymentMethod?.toLowerCase() || "";

            const paymentStatus =
                payment.paymentStatus?.toLowerCase() || "";

            return (

                transactionId.includes(keyword) ||

                bookingReference.includes(keyword) ||

                paymentMethod.includes(keyword) ||

                paymentStatus.includes(keyword)

            );

        });

    }, [rows, search]);


    const columns = [

        {
            field: "transactionId",
            headerName: "Transaction ID",
            flex: 1.5,
            minWidth: 180
        },

        {
            field: "bookingReference",
            headerName: "Booking Reference",
            flex: 1.4,
            minWidth: 170
        },

        {
            field: "amount",
            headerName: "Amount",
            flex: 0.9,
            minWidth: 110,

            renderCell: ({ value }) => (

                <Typography fontWeight={600}>

                    ₹ {value}

                </Typography>

            )
        },

        {
            field: "paymentMethod",
            headerName: "Method",
            flex: 1,
            minWidth: 120,

            renderCell: ({ value }) => (

                <Chip
                    label={value || "N/A"}
                    size="small"
                    variant="outlined"
                />

            )
        },

        {
            field: "paymentStatus",
            headerName: "Status",
            flex: 1,
            minWidth: 120,

            renderCell: ({ value }) => (

                <Chip

                    label={value || "UNKNOWN"}

                    size="small"

                    color={
                        value === "SUCCESS"
                            ? "success"
                            : value === "PENDING"
                            ? "warning"
                            : "error"
                    }

                />

            )
        },

        {
            field: "paymentTime",
            headerName: "Payment Time",
            flex: 1.3,
            minWidth: 180,

            renderCell: ({ value }) => {

                if (!value) {

                    return "N/A";

                }

                const date = new Date(value);

                return Number.isNaN(date.getTime())
                    ? value
                    : date.toLocaleString();

            }
        },

        {
            field: "actions",
            headerName: "Actions",
            width: 100,
            sortable: false,
            filterable: false,

            renderCell: ({ row }) => (

                <Stack
                    direction="row"
                    spacing={1}
                >

                    <IconButton

                        color="primary"

                        title="View Payment"

                        onClick={() =>
                            handleView(row)
                        }

                    >

                        <VisibilityIcon />

                    </IconButton>

                </Stack>

            )
        }

    ];


    return (

        <DashboardLayout>

            <Paper
                elevation={3}
                sx={{
                    p: {
                        xs: 2,
                        md: 3
                    },
                    borderRadius: 3
                }}
            >

                <Box

                    display="flex"

                    justifyContent="space-between"

                    alignItems={{
                        xs: "stretch",
                        sm: "center"
                    }}

                    flexDirection={{
                        xs: "column",
                        sm: "row"
                    }}

                    gap={2}

                    mb={3}

                >

                    <Box>

                        <Typography
                            variant="h4"
                            fontWeight="bold"
                        >

                            Manage Payments

                        </Typography>

                        <Typography
                            variant="body2"
                            color="text.secondary"
                            mt={0.5}
                        >

                            View and monitor payment transactions

                        </Typography>

                    </Box>


                    <Button

                        variant="outlined"

                        startIcon={<RefreshIcon />}

                        onClick={loadPayments}

                        disabled={loading}

                    >

                        Refresh

                    </Button>

                </Box>


                <TextField

                    fullWidth

                    placeholder="Search by transaction, booking, method or status..."

                    value={search}

                    onChange={(e) =>
                        setSearch(e.target.value)
                    }

                    sx={{
                        mb: 3,
                        maxWidth: 600
                    }}

                    slotProps={{

                        input: {

                            startAdornment: (

                                <InputAdornment position="start">

                                    <SearchIcon />

                                </InputAdornment>

                            )

                        }

                    }}

                />


                {

                    error && (

                        <Typography
                            color="error"
                            mb={2}
                        >

                            {error}

                        </Typography>

                    )

                }


                {

                    loading ?

                        (

                            <Box
                                display="flex"
                                justifyContent="center"
                                alignItems="center"
                                py={10}
                            >

                                <CircularProgress />

                            </Box>

                        )

                        :

                        filteredRows.length === 0 ?

                            (

                                <Box
                                    textAlign="center"
                                    py={10}
                                >

                                    <Typography
                                        variant="h6"
                                        color="text.secondary"
                                    >

                                        No payments found.

                                    </Typography>

                                    <Typography
                                        variant="body2"
                                        color="text.secondary"
                                        mt={1}
                                    >

                                        {
                                            search
                                                ? "Try a different search term."
                                                : "Payment records will appear here."
                                        }

                                    </Typography>

                                </Box>

                            )

                            :

                            (

                                <Box
                                    sx={{
                                        width: "100%",
                                        overflowX: "auto"
                                    }}
                                >

                                    <DataGrid

                                        rows={filteredRows}

                                        columns={columns}

                                        autoHeight

                                        disableRowSelectionOnClick

                                        pageSizeOptions={[
                                            5,
                                            10,
                                            20,
                                            50
                                        ]}

                                        initialState={{

                                            pagination: {

                                                paginationModel: {

                                                    page: 0,

                                                    pageSize: 10

                                                }

                                            }

                                        }}

                                        sx={{

                                            border: 0,

                                            minWidth: 900,

                                            "& .MuiDataGrid-columnHeaders": {

                                                backgroundColor: "#F8FAFC",

                                                fontWeight: "bold"

                                            },

                                            "& .MuiDataGrid-row:hover": {

                                                backgroundColor: "#F9FAFB"

                                            }

                                        }}

                                    />

                                </Box>

                            )

                }

            </Paper>


            <PaymentDetailsDialog

                open={detailsOpen}

                payment={selectedPayment}

                onClose={() => {

                    setDetailsOpen(false);

                    setSelectedPayment(null);

                }}

            />

        </DashboardLayout>

    );

};

export default AdminPayments;