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
import RefreshIcon from "@mui/icons-material/Refresh";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import SearchIcon from "@mui/icons-material/Search";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import DashboardLayout from "../../components/layout/DashboardLayout";
import ConfirmDialog from "../../components/common/ConfirmDialog";
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
        () => rows.filter((venue) => {
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
            flex: 1.2
        },
        {
            field: "city",
            headerName: "City",
            flex: 0.9
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
            renderCell: () => (
                <Chip
                    label="ACTIVE"
                    color="success"
                    size="small"
                />
            )
        },
        {
            field: "actions",
            headerName: "Actions",
            width: 140,
            sortable: false,
            renderCell: ({ row }) => (
                <Stack direction="row">
                    <IconButton
                        color="success"
                        onClick={() => navigate(`/admin/venues/edit/${row.id}`)}
                    >
                        <EditIcon />
                    </IconButton>

                    <IconButton
                        color="error"
                        onClick={() => handleDeleteClick(row.id)}
                    >
                        <DeleteIcon />
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
                    p: 3,
                    borderRadius: 3
                }}
            >
                <Box
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                    mb={3}
                >
                    <Typography
                        variant="h4"
                        fontWeight="bold"
                    >
                        Manage Venues
                    </Typography>

                    <Stack
                        direction="row"
                        spacing={2}
                    >
                        <Button
                            startIcon={<RefreshIcon />}
                            variant="outlined"
                            onClick={loadVenues}
                        >
                            Refresh
                        </Button>

                        <Button
                            component={Link}
                            to="/admin/venues/create"
                            variant="contained"
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
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <SearchIcon />
                            </InputAdornment>
                        )
                    }}
                    sx={{ mb: 3 }}
                />

                {error && (
                    <Typography
                        color="error"
                        sx={{ mb: 2 }}
                    >
                        {error}
                    </Typography>
                )}

                {loading ? (
                    <Box
                        display="flex"
                        justifyContent="center"
                        py={8}
                    >
                        <CircularProgress />
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
                                paginationModel: {
                                    pageSize: 10
                                }
                            }
                        }}
                        sx={{
                            border: 0,
                            "& .MuiDataGrid-columnHeaders": {
                                backgroundColor: "#F8FAFC",
                                fontWeight: "bold",
                                fontSize: 15
                            },
                            "& .MuiDataGrid-row:hover": {
                                backgroundColor: "#F9FAFB"
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