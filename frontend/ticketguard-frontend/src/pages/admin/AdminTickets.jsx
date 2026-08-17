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
import DownloadIcon from "@mui/icons-material/Download";

import DashboardLayout from "../../components/layout/DashboardLayout";
import TicketDetailsDialog from "../../components/ticket/TicketDetailsDialog";
import LoadingSpinner from "../../components/LoadingSpinner";
import { getTickets, downloadTicket } from "../../api/adminTicketApi";
import toast from "react-hot-toast";

const AdminTickets = () => {
    const [rows, setRows] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [search, setSearch] = useState("");
    const [detailsOpen, setDetailsOpen] = useState(false);
    const [selectedTicket, setSelectedTicket] = useState(null);

    useEffect(() => {
        loadTickets();
    }, []);

    const loadTickets = async () => {
        try {
            setLoading(true);
            setError("");
            const data = await getTickets();
            const list = Array.isArray(data) ? data : (data?.content || []);
            setRows(list);
        } catch (err) {
            console.error("Error loading admin tickets:", err);
            setError("Failed to load tickets.");
            setRows([]);
        } finally {
            setLoading(false);
        }
    };

    const handleView = (ticket) => {
        setSelectedTicket(ticket);
        setDetailsOpen(true);
    };

    const handleDownload = async (id, ticketNumber) => {
        try {
            const blob = await downloadTicket(id);
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement("a");
            link.href = url;
            link.download = `${ticketNumber}.pdf`;
            document.body.appendChild(link);
            link.click();
            link.remove();
            window.URL.revokeObjectURL(url);
            toast.success("Ticket downloaded successfully");
        } catch (err) {
            toast.error("Failed to download ticket");
        }
    };

    const filteredRows = useMemo(() => {
        return rows.filter(
            (ticket) =>
                ticket.ticketNumber?.toLowerCase().includes(search.toLowerCase()) ||
                ticket.bookingReference?.toLowerCase().includes(search.toLowerCase()) ||
                ticket.eventTitle?.toLowerCase().includes(search.toLowerCase()) ||
                ticket.venueName?.toLowerCase().includes(search.toLowerCase())
        );
    }, [rows, search]);

    const columns = [
        {
            field: "ticketNumber",
            headerName: "Ticket Number",
            flex: 1.4,
            renderCell: ({ value }) => (
                <Typography variant="body2" fontWeight={800} color="primary.main">
                    {value}
                </Typography>
            )
        },
        {
            field: "bookingReference",
            headerName: "Booking Ref",
            flex: 1.2
        },
        {
            field: "eventTitle",
            headerName: "Event",
            flex: 1.6,
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
            headerName: "Date",
            flex: 1
        },
        {
            field: "totalAmount",
            headerName: "Amount",
            flex: 0.9,
            renderCell: ({ value }) => (
                <Typography variant="body2" fontWeight={800}>
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
                    label={value || "VALID"}
                    size="small"
                    color={value === "ACTIVE" || value === "ISSUED" ? "success" : value === "USED" ? "warning" : "error"}
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
                    <IconButton size="small" color="success" onClick={() => handleDownload(row.id, row.ticketNumber)}>
                        <DownloadIcon fontSize="small" />
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
                            PASS MANAGEMENT
                        </Typography>
                        <Typography variant="h4" fontWeight={800} color="#0F172A">
                            Issued Digital Passes
                        </Typography>
                    </Box>

                    <Button
                        variant="outlined"
                        startIcon={<RefreshIcon />}
                        onClick={loadTickets}
                        sx={{ borderRadius: 3, fontWeight: 700 }}
                    >
                        Refresh
                    </Button>
                </Box>

                <TextField
                    fullWidth
                    placeholder="Search by ticket number, booking ref, event title..."
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
                            No tickets found.
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

            <TicketDetailsDialog
                open={detailsOpen}
                ticket={selectedTicket}
                onClose={() => {
                    setDetailsOpen(false);
                    setSelectedTicket(null);
                }}
            />
        </DashboardLayout>
    );
};

export default AdminTickets;