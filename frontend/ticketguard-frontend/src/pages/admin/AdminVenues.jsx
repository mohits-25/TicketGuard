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
import RefreshIcon from "@mui/icons-material/Refresh";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import SearchIcon from "@mui/icons-material/Search";
import AddIcon from "@mui/icons-material/Add";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import DashboardLayout from "../../components/layout/DashboardLayout";
import ConfirmDialog from "../../components/common/ConfirmDialog";
import LoadingSpinner from "../../components/LoadingSpinner";
import { deleteVenue, getVenues } from "../../api/adminVenueApi";

const AdminVenues = () => {
    const navigate = useNavigate();

    const [rows, setRows] = useState([]);
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [dialogOpen, setDialogOpen] = useState(false);
    const [selectedId, setSelectedId] = useState(null);

    useEffect(() => {
        loadVenues();
    }, []);

    const loadVenues = async () => {
        try {
            setLoading(true);
            setError("");
            const data = await getVenues();
            const venueList = Array.isArray(data) ? data : (data?.content || []);
            setRows(venueList);
        } catch (loadError) {
            setError("Failed to load venues.");
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
            await deleteVenue(selectedId);
            toast.success("Venue deleted successfully");
            setDialogOpen(false);
            setSelectedId(null);
            await loadVenues();
        } catch (deleteError) {
            toast.error(deleteError.response?.data?.message || "Failed to delete venue");
        }
    };

    const filteredRows = useMemo(
        () =>
            rows.filter((venue) => {
                const term = search.toLowerCase();
                return (
                    venue.name?.toLowerCase().includes(term) ||
                    venue.city?.toLowerCase().includes(term) ||
                    venue.address?.toLowerCase().includes(term)
                );
            }),
        [rows, search]
    );

    const columns = [
        {
            field: "name",
            headerName: "Venue Name",
            flex: 1.2,
            renderCell: ({ row }) => (
                <Typography variant="body2" fontWeight={800} color="#0F172A">
                    📍 {row.name}
                </Typography>
            )
        },
        {
            field: "city",
            headerName: "City",
            flex: 0.9,
            renderCell: ({ value }) => (
                <Chip label={value || "Unknown"} size="small" variant="outlined" sx={{ fontWeight: 700 }} />
            )
        },
        {
            field: "address",
            headerName: "Address",
            flex: 1.6
        },
        {
            field: "status",
            headerName: "Status",
            width: 120,
            sortable: false,
            renderCell: () => <Chip label="ACTIVE" color="success" size="small" sx={{ fontWeight: 800, borderRadius: 2 }} />
        },
        {
            field: "actions",
            headerName: "Actions",
            width: 120,
            sortable: false,
            renderCell: ({ row }) => (
                <Stack direction="row" spacing={0.5}>
                    <IconButton size="small" color="secondary" onClick={() => navigate(`/admin/venues/edit/${row.id}`)}>
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
                            LOCATION MANAGEMENT
                        </Typography>
                        <Typography variant="h4" fontWeight={800} color="#0F172A">
                            All Venues
                        </Typography>
                    </Box>

                    <Stack direction="row" spacing={2}>
                        <Button
                            startIcon={<RefreshIcon />}
                            variant="outlined"
                            onClick={loadVenues}
                            sx={{ borderRadius: 3, fontWeight: 700 }}
                        >
                            Refresh
                        </Button>
                        <Button
                            component={Link}
                            to="/admin/venues/create"
                            variant="contained"
                            startIcon={<AddIcon />}
                            sx={{ borderRadius: 3, fontWeight: 700 }}
                        >
                            Create Venue
                        </Button>
                    </Stack>
                </Box>

                <TextField
                    fullWidth
                    placeholder="Search venues by name, city, or address..."
                    value={search}
                    onChange={(event) => setSearch(event.target.value)}
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
                                fontWeight: "bold"
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
                title="Delete Venue"
                message="Are you sure you want to delete this venue? This action cannot be undone."
                onCancel={() => setDialogOpen(false)}
                onConfirm={handleDelete}
            />
        </DashboardLayout>
    );
};

export default AdminVenues;