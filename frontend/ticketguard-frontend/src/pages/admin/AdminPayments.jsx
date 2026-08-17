import { useEffect, useMemo, useState } from "react";
import {
    Box,
    Button,
    Chip,
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
import LoadingSpinner from "../../components/LoadingSpinner";
import { getPayments } from "../../api/adminPaymentApi";

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
            setRows(Array.isArray(data) ? data : (data?.content || []));
        } catch (err) {
            console.error("Error loading admin payments:", err);
            setError("Failed to load payments.");
            setRows([]);
        } finally {
            setLoading(false);
        }
    };

    const handleView = (payment) => {
        setSelectedPayment(payment);
        setDetailsOpen(true);
    };

    const filteredRows = useMemo(() => {
        const keyword = search.trim().toLowerCase();
        if (!keyword) return rows;

        return rows.filter((payment) => {
            const transactionId = payment.transactionId?.toLowerCase() || "";
            const bookingReference = payment.bookingReference?.toLowerCase() || "";
            const paymentMethod = payment.paymentMethod?.toLowerCase() || "";
            const paymentStatus = payment.paymentStatus?.toLowerCase() || "";
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
            minWidth: 180,
            renderCell: ({ value }) => (
                <Typography variant="body2" fontWeight={800} color="#0F172A">
                    {value || "N/A"}
                </Typography>
            )
        },
        {
            field: "bookingReference",
            headerName: "Booking Reference",
            flex: 1.4,
            minWidth: 170,
            renderCell: ({ value }) => (
                <Typography variant="body2" fontWeight={700} color="secondary.main">
                    {value}
                </Typography>
            )
        },
        {
            field: "amount",
            headerName: "Amount",
            flex: 0.9,
            minWidth: 110,
            renderCell: ({ value }) => (
                <Typography variant="body2" fontWeight={800} color="primary.main">
                    ₹{value}
                </Typography>
            )
        },
        {
            field: "paymentMethod",
            headerName: "Method",
            flex: 1,
            minWidth: 120,
            renderCell: ({ value }) => (
                <Chip label={value || "CARD"} size="small" variant="outlined" sx={{ fontWeight: 700 }} />
            )
        },
        {
            field: "paymentStatus",
            headerName: "Status",
            flex: 1,
            minWidth: 120,
            renderCell: ({ value }) => (
                <Chip
                    label={value || "SUCCESS"}
                    size="small"
                    color={value === "SUCCESS" || value === "COMPLETED" ? "success" : value === "PENDING" ? "warning" : "error"}
                    sx={{ fontWeight: 800, borderRadius: 2 }}
                />
            )
        },
        {
            field: "paymentTime",
            headerName: "Payment Time",
            flex: 1.3,
            minWidth: 180,
            renderCell: ({ value }) => {
                if (!value) return "N/A";
                const date = new Date(value);
                return Number.isNaN(date.getTime()) ? value : date.toLocaleString();
            }
        },
        {
            field: "actions",
            headerName: "Actions",
            width: 100,
            sortable: false,
            filterable: false,
            renderCell: ({ row }) => (
                <IconButton size="small" color="primary" onClick={() => handleView(row)}>
                    <VisibilityIcon fontSize="small" />
                </IconButton>
            )
        }
    ];

    return (
        <DashboardLayout>
            <Paper
                elevation={0}
                sx={{
                    p: { xs: 3, sm: 4 },
                    borderRadius: 6,
                    border: "1px solid #E2E8F0",
                    bgcolor: "#FFFFFF"
                }}
            >
                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 4, flexWrap: "wrap", gap: 2 }}>
                    <Box>
                        <Typography variant="overline" color="primary" fontWeight={800} letterSpacing={1}>
                            FINANCIAL LOGS
                        </Typography>
                        <Typography variant="h4" fontWeight={800} color="#0F172A">
                            Transactions & Payments
                        </Typography>
                    </Box>

                    <Button
                        variant="outlined"
                        startIcon={<RefreshIcon />}
                        onClick={loadPayments}
                        sx={{ borderRadius: 3, fontWeight: 700 }}
                    >
                        Refresh
                    </Button>
                </Box>

                <TextField
                    fullWidth
                    placeholder="Search by transaction ID, booking reference, method, or status..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    size="small"
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <SearchIcon sx={{ color: "#94A3B8" }} />
                            </InputAdornment>
                        )
                    }}
                    sx={{ mb: 3 }}
                />

                {error && (
                    <Typography color="error" mb={2}>
                        {error}
                    </Typography>
                )}

                {loading ? (
                    <LoadingSpinner />
                ) : filteredRows.length === 0 ? (
                    <Box py={8} textAlign="center">
                        <Typography variant="h6" color="text.secondary">
                            No payment transactions found.
                        </Typography>
                    </Box>
                ) : (
                    <DataGrid
                        rows={filteredRows}
                        columns={columns}
                        autoHeight
                        disableRowSelectionOnClick
                        pageSizeOptions={[5, 10, 20]}
                        initialState={{
                            pagination: {
                                paginationModel: { pageSize: 10 }
                            }
                        }}
                        sx={{
                            border: "1px solid #E2E8F0",
                            borderRadius: 4,
                            "& .MuiDataGrid-columnHeaders": {
                                backgroundColor: "#F8FAFC",
                                fontWeight: "bold"
                            },
                            "& .MuiDataGrid-row:hover": {
                                backgroundColor: "#F8FAFC"
                            }
                        }}
                    />
                )}
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