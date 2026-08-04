import { useEffect, useMemo, useState } from "react";

import {
    Box,
    Button,
    Chip,
    CircularProgress,
    IconButton,
    Paper,
    Stack,
    TextField,
    Typography,
    InputAdornment
} from "@mui/material";

import { DataGrid } from "@mui/x-data-grid";

import RefreshIcon from "@mui/icons-material/Refresh";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import SearchIcon from "@mui/icons-material/Search";

import { Link, useNavigate } from "react-router-dom";

import DashboardLayout from "../../components/layout/DashboardLayout";
import ConfirmDialog from "../../components/common/ConfirmDialog";

import toast from "react-hot-toast";

import {
    getEvents,
    deleteEvent
} from "../../api/adminEventApi";

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

            setRows(data.content);

        } catch (err) {

            console.error(err);

            setError("Failed to load events.");

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

        return rows.filter(event =>

            event.title
                .toLowerCase()
                .includes(search.toLowerCase())

        );

    }, [rows, search]);

    const columns = [

        {
            field: "title",
            headerName: "Title",
            flex: 1.4
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
            flex: 0.8
        },

        {
            field: "status",
            headerName: "Status",
            flex: 1,

            renderCell: ({ value }) => (

                <Chip

                    label={value}

                    color={

                        value === "UPCOMING"

                            ? "success"

                            : value === "COMPLETED"

                            ? "default"

                            : "warning"

                    }

                    size="small"

                />

            )

        },

        {

            field: "actions",

            headerName: "Actions",

            width: 170,

            sortable: false,

            renderCell: ({ row }) => (

                <Stack direction="row">

                    <IconButton

                        color="primary"

                        onClick={() =>
                            navigate(`/events/${row.id}`)
                        }

                    >

                        <VisibilityIcon />

                    </IconButton>

                    <IconButton

                        color="success"

                        onClick={() =>
                            navigate(`/admin/events/edit/${row.id}`)
                        }

                    >

                        <EditIcon />

                    </IconButton>

                    <IconButton

                        color="error"

                        onClick={() =>
                            handleDeleteClick(row.id)
                        }

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

                        Manage Events

                    </Typography>

                    <Stack
                        direction="row"
                        spacing={2}
                    >

                        <Button
                            startIcon={<RefreshIcon />}
                            variant="outlined"
                            onClick={loadEvents}
                        >

                            Refresh

                        </Button>

                        <Button
                            component={Link}
                            to="/admin/events/create"
                            variant="contained"
                        >

                            Create Event

                        </Button>

                    </Stack>

                </Box>

                <TextField

                    placeholder="Search events..."

                    value={search}

                    onChange={(e) =>
                        setSearch(e.target.value)
                    }

                    InputProps={{

                        startAdornment: (

                            <InputAdornment position="start">

                                <SearchIcon />

                            </InputAdornment>

                        )

                    }}

                    sx={{ mb: 3 }}

                />

                {

                    error && (

                        <Typography
                            color="error"
                            sx={{ mb: 2 }}
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
                                py={8}
                            >

                                <CircularProgress />

                            </Box>

                        )

                        :

                        (

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

                                    "& .MuiDataGrid-cell": {

                                        alignItems: "center"

                                    },

                                    "& .MuiDataGrid-row:hover": {

                                        backgroundColor: "#F9FAFB"

                                    }

                                }}

                            />

                        )

                }

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