import { useEffect, useMemo, useState } from "react";
import {
    Box,
    Button,
    Chip,
    IconButton,
    Paper,
    Stack,
    TextField,
    Typography,
    InputAdornment
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { Link, useNavigate } from "react-router-dom";

import RefreshIcon from "@mui/icons-material/Refresh";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import SearchIcon from "@mui/icons-material/Search";
import AddIcon from "@mui/icons-material/Add";

import DashboardLayout from "../../components/layout/DashboardLayout";
import ConfirmDialog from "../../components/common/ConfirmDialog";
import LoadingSpinner from "../../components/LoadingSpinner";
import toast from "react-hot-toast";

import { getEvents, deleteEvent } from "../../api/adminEventApi";

const AdminEvents = () => {
    const navigate = useNavigate();

    const [rows, setRows] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [search, setSearch] = useState("");
    const [dialogOpen, setDialogOpen] = useState(false);
    const [selectedId, setSelectedId] = useState(null);

    useEffect(() => {
        loadEvents();
    }, []);

    const loadEvents = async () => {
        try {
            setLoading(true);
            setError("");
            const data = await getEvents();
            const list = Array.isArray(data) ? data : (data?.content || []);
            setRows(list);
        } catch (err) {
            console.error("Error loading admin events:", err);
            setError("Failed to load events.");
            setRows([]);
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteClick = (id) => {
        setSelectedId(id);
        setDialogOpen(true);
    };

    const handleDelete = async () => {
        try {
            await deleteEvent(selectedId);
            toast.success("Event deleted successfully");
            setDialogOpen(false);
            setSelectedId(null);
            await loadEvents();
        } catch (err) {
            toast.error("Failed to delete event");
        }
    };

    const filteredRows = useMemo(() => {
        return rows.filter((event) =>
            (event.title || "").toLowerCase().includes(search.toLowerCase()) ||
            (event.venueName || "").toLowerCase().includes(search.toLowerCase())
        );
    }, [rows, search]);

    const columns = [
        {
            field: "title",
            headerName: "Title",
            flex: 1.4,
            renderCell: ({ row }) => (
                <Typography variant="body2" fontWeight={700} color="#0F172A">
                    {row.title}
                </Typography>
            )
        },
        {
            field: "venueName",
            headerName: "Venue",
            flex: 1
        },
        {
            field: "eventDate",
            headerName: "Date",
            flex: 1
        },
        {
            field: "availableSeats",
            headerName: "Seats",
            flex: 0.8,
            renderCell: ({ value }) => (
                <Chip label={`${value} seats`} size="small" variant="outlined" sx={{ fontWeight: 700 }} />
            )
        },
        {
            field: "status",
            headerName: "Status",
            flex: 1,
            renderCell: ({ value }) => (
                <Chip
                    label={value || "UPCOMING"}
                    color={value === "UPCOMING" || value === "ACTIVE" ? "success" : "default"}
                    size="small"
                    sx={{ fontWeight: 800, borderRadius: 2 }}
                />
            )
        },
        {
            field: "actions",
            headerName: "Actions",
            width: 150,
            sortable: false,
            renderCell: ({ row }) => (
                <Stack direction="row" spacing={0.5}>
                    <IconButton size="small" color="primary" onClick={() => navigate(`/events/${row.id}`)}>
                        <VisibilityIcon fontSize="small" />
                    </IconButton>
                    <IconButton size="small" color="secondary" onClick={() => navigate(`/admin/events/edit/${row.id}`)}>
                        <EditIcon fontSize="small" />
                    </IconButton>
                    <IconButton size="small" color="error" onClick={() => handleDeleteClick(row.id)}>
                        <DeleteIcon fontSize="small" />
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
                            EVENT MANAGEMENT
                        </Typography>
                        <Typography variant="h4" fontWeight={800} color="#0F172A">
                            All Events
                        </Typography>
                    </Box>

                    <Stack direction="row" spacing={2}>
                        <Button
                            startIcon={<RefreshIcon />}
                            variant="outlined"
                            onClick={loadEvents}
                            sx={{ borderRadius: 3, fontWeight: 700 }}
                        >
                            Refresh
                        </Button>
                        <Button
                            component={Link}
                            to="/admin/events/create"
                            variant="contained"
                            startIcon={<AddIcon />}
                            sx={{ borderRadius: 3, fontWeight: 700 }}
                        >
                            Create Event
                        </Button>
                    </Stack>
                </Box>

                <TextField
                    placeholder="Search events by title or venue..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    size="small"
                    fullWidth
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
                    <Typography color="error" sx={{ mb: 2 }}>
                        {error}
                    </Typography>
                )}

                {loading ? (
                    <LoadingSpinner />
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
                                fontWeight: "bold",
                                borderBottom: "1px solid #E2E8F0"
                            },
                            "& .MuiDataGrid-row:hover": {
                                backgroundColor: "#F8FAFC"
                            }
                        }}
                    />
                )}
            </Paper>

            <ConfirmDialog
                open={dialogOpen}
                title="Delete Event"
                message="Are you sure you want to delete this event? This action cannot be undone."
                onCancel={() => setDialogOpen(false)}
                onConfirm={handleDelete}
            />
        </DashboardLayout>
    );
};

export default AdminEvents;