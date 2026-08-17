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
import CancelIcon from "@mui/icons-material/Cancel";

import DashboardLayout from "../../components/layout/DashboardLayout";
import BookingDetailsDialog from "../../components/booking/BookingDetailsDialog";
import ConfirmDialog from "../../components/common/ConfirmDialog";
import LoadingSpinner from "../../components/LoadingSpinner";
import toast from "react-hot-toast";

import { getBookings, cancelBooking } from "../../api/adminBookingApi";

const AdminBookings = () => {
    const [rows, setRows] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [search, setSearch] = useState("");
    const [dialogOpen, setDialogOpen] = useState(false);
    const [selectedBooking, setSelectedBooking] = useState(null);
    const [confirmOpen, setConfirmOpen] = useState(false);
    const [selectedId, setSelectedId] = useState(null);

    useEffect(() => {
        loadBookings();
    }, []);

    const loadBookings = async () => {
        try {
            setLoading(true);
            setError("");
            const data = await getBookings();
            const list = Array.isArray(data) ? data : (data?.content || []);
            setRows(list);
        } catch (err) {
            console.error("Error loading admin bookings:", err);
            setError("Failed to load bookings.");
            setRows([]);
        } finally {
            setLoading(false);
        }
    };

    const handleView = (booking) => {
        setSelectedBooking(booking);
        setDialogOpen(true);
    };

    const handleCancelClick = (id) => {
        setSelectedId(id);
        setConfirmOpen(true);
    };

    const handleCancelBooking = async () => {
        try {
            await cancelBooking(selectedId);
            toast.success("Booking cancelled successfully");
            setConfirmOpen(false);
            setSelectedId(null);
            loadBookings();
        } catch (err) {
            toast.error("Failed to cancel booking");
        }
    };

    const filteredRows = useMemo(() => {
        return rows.filter(
            (booking) =>
                booking.bookingReference?.toLowerCase().includes(search.toLowerCase()) ||
                booking.eventTitle?.toLowerCase().includes(search.toLowerCase()) ||
                booking.venueName?.toLowerCase().includes(search.toLowerCase())
        );
    }, [rows, search]);

    const columns = [
        {
            field: "bookingReference",
            headerName: "Reference",
            flex: 1.3,
            renderCell: ({ value }) => (
                <Typography variant="body2" fontWeight={800} color="secondary.main">
                    {value}
                </Typography>
            )
        },
        {
            field: "eventTitle",
            headerName: "Event",
            flex: 1.5,
            renderCell: ({ value }) => (
                <Typography variant="body2" fontWeight={700} color="#0F172A">
                    {value}
                </Typography>
            )
        },
        {
            field: "venueName",
            headerName: "Venue",
            flex: 1.3
        },
        {
            field: "eventDate",
            headerName: "Event Date",
            flex: 1
        },
        {
            field: "numberOfTickets",
            headerName: "Passes",
            flex: 0.8
        },
        {
            field: "totalAmount",
            headerName: "Amount",
            flex: 0.9,
            renderCell: ({ value }) => (
                <Typography variant="body2" fontWeight={800} color="primary.main">
                    ₹{value}
                </Typography>
            )
        },
        {
            field: "status",
            headerName: "Status",
            flex: 1,
            renderCell: ({ value }) => (
                <Chip
                    label={value}
                    color={value === "CONFIRMED" ? "success" : value === "PENDING" ? "warning" : "error"}
                    size="small"
                    sx={{ fontWeight: 800, borderRadius: 2 }}
                />
            )
        },
        {
            field: "actions",
            headerName: "Actions",
            width: 140,
            sortable: false,
            renderCell: ({ row }) => (
                <Stack direction="row" spacing={0.5}>
                    <IconButton size="small" color="primary" onClick={() => handleView(row)}>
                        <VisibilityIcon fontSize="small" />
                    </IconButton>
                    <IconButton
                        size="small"
                        color="error"
                        disabled={row.status === "CANCELLED"}
                        onClick={() => handleCancelClick(row.id)}
                    >
                        <CancelIcon fontSize="small" />
                    </IconButton>
                </Stack>
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
                            RESERVATION MANAGEMENT
                        </Typography>
                        <Typography variant="h4" fontWeight={800} color="#0F172A">
                            All Customer Bookings
                        </Typography>
                    </Box>

                    <Button
                        variant="outlined"
                        startIcon={<RefreshIcon />}
                        onClick={loadBookings}
                        sx={{ borderRadius: 3, fontWeight: 700 }}
                    >
                        Refresh
                    </Button>
                </Box>

                <TextField
                    fullWidth
                    placeholder="Search by booking reference, event title, or venue..."
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
                            No bookings found.
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

            <BookingDetailsDialog
                open={dialogOpen}
                booking={selectedBooking}
                onClose={() => {
                    setDialogOpen(false);
                    setSelectedBooking(null);
                }}
            />

            <ConfirmDialog
                open={confirmOpen}
                title="Cancel Booking"
                message="Are you sure you want to cancel this booking?"
                onCancel={() => setConfirmOpen(false)}
                onConfirm={handleCancelBooking}
            />
        </DashboardLayout>
    );
};

export default AdminBookings;