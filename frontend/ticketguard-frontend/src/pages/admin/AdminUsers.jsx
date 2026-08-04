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
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

import { Link, useNavigate } from "react-router-dom";

import DashboardLayout from "../../components/layout/DashboardLayout";
import ConfirmDialog from "../../components/common/ConfirmDialog";
import UserDetailsDialog from "../../components/user/UserDetailsDialog";

import toast from "react-hot-toast";

import {
    getUsers,
    deleteUser
} from "../../api/adminUserApi";

const AdminUsers = () => {

    const navigate = useNavigate();

    const [rows, setRows] = useState([]);

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState("");

    const [search, setSearch] = useState("");

    const [dialogOpen, setDialogOpen] = useState(false);

    const [selectedId, setSelectedId] = useState(null);

    const [detailsOpen, setDetailsOpen] = useState(false);

    const [selectedUser, setSelectedUser] = useState(null);

    useEffect(() => {

        loadUsers();

    }, []);

    const loadUsers = async () => {

        try {

            setLoading(true);

            setError("");

            const data = await getUsers();

            setRows(data);

        } catch (err) {

            console.error(err);

            setError("Failed to load users.");

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

            await deleteUser(selectedId);

            toast.success("User deleted successfully");

            setDialogOpen(false);

            setSelectedId(null);

            loadUsers();

        } catch {

            toast.error("Failed to delete user");

        }

    };

    const handleView = (user) => {

        setSelectedUser(user);

        setDetailsOpen(true);

    };

    const filteredRows = useMemo(() => {

        return rows.filter(user =>

            `${user.firstName} ${user.lastName}`
                .toLowerCase()
                .includes(search.toLowerCase())

            ||

            user.email
                .toLowerCase()
                .includes(search.toLowerCase())

        );

    }, [rows, search]);

    const columns = [
                {
            field: "firstName",
            headerName: "First Name",
            flex: 1
        },

        {
            field: "lastName",
            headerName: "Last Name",
            flex: 1
        },

        {
            field: "email",
            headerName: "Email",
            flex: 1.8
        },

        {
            field: "role",
            headerName: "Role",
            flex: 1,

            renderCell: ({ value }) => (

                <Chip

                    label={value}

                    color={
                        value === "ADMIN"
                            ? "error"
                            : "primary"
                    }

                    size="small"

                />

            )

        },

        {

            field: "actions",

            headerName: "Actions",

            width: 180,

            sortable: false,

            renderCell: ({ row }) => (

                <Stack
                    direction="row"
                    spacing={1}
                >

                    <IconButton

                        color="primary"

                        onClick={() =>
                            handleView(row)
                        }

                    >

                        <VisibilityIcon />

                    </IconButton>

                    <IconButton

                        color="success"

                        onClick={() =>
                            navigate(`/admin/users/edit/${row.id}`)
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

                        Manage Users

                    </Typography>

                    <Stack
                        direction="row"
                        spacing={2}
                    >

                        <Button

                            variant="outlined"

                            startIcon={<RefreshIcon />}

                            onClick={loadUsers}

                        >

                            Refresh

                        </Button>

                        <Button

                            component={Link}

                            to="/admin/users/create"

                            variant="contained"

                        >

                            Create User

                        </Button>

                    </Stack>

                </Box>

                <TextField

                    fullWidth

                    placeholder="Search users..."

                    value={search}

                    onChange={(e) =>
                        setSearch(e.target.value)
                    }

                    sx={{ mb: 3 }}

                    InputProps={{

                        startAdornment: (

                            <InputAdornment position="start">

                                <SearchIcon />

                            </InputAdornment>

                        )

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
                                py={8}
                                textAlign="center"
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

                                pageSizeOptions={[5,10,20]}

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

                                        fontWeight: "bold"

                                    }

                                }}

                            />

                        )

                }

            </Paper>

            <ConfirmDialog

                open={dialogOpen}

                title="Delete User"

                message="Are you sure you want to delete this user?"

                onCancel={() =>
                    setDialogOpen(false)
                }

                onConfirm={handleDelete}

            />

            <UserDetailsDialog

                open={detailsOpen}

                user={selectedUser}

                onClose={() => {

                    setDetailsOpen(false);

                    setSelectedUser(null);

                }}

            />

        </DashboardLayout>

    );

};

export default AdminUsers;