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
    Typography,
    Avatar
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { Link, useNavigate } from "react-router-dom";

import SearchIcon from "@mui/icons-material/Search";
import RefreshIcon from "@mui/icons-material/Refresh";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";

import DashboardLayout from "../../components/layout/DashboardLayout";
import ConfirmDialog from "../../components/common/ConfirmDialog";
import UserDetailsDialog from "../../components/user/UserDetailsDialog";
import LoadingSpinner from "../../components/LoadingSpinner";
import toast from "react-hot-toast";

import { getUsers, deleteUser } from "../../api/adminUserApi";

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
            const list = Array.isArray(data) ? data : (data?.content || []);
            setRows(list);
        } catch (err) {
            console.error("Error loading admin users:", err);
            setError("Failed to load users.");
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
        return rows.filter(
            (user) =>
                `${user.firstName || ""} ${user.lastName || ""}`.toLowerCase().includes(search.toLowerCase()) ||
                (user.email || "").toLowerCase().includes(search.toLowerCase())
        );
    }, [rows, search]);

    const columns = [
        {
            field: "user",
            headerName: "User Profile",
            flex: 1.5,
            renderCell: ({ row }) => (
                <Stack direction="row" spacing={1.5} alignItems="center">
                    <Avatar sx={{ width: 32, height: 32, bgcolor: "primary.main", fontSize: "0.85rem", fontWeight: 700 }}>
                        {(row.firstName?.[0] || row.email?.[0] || "U").toUpperCase()}
                    </Avatar>
                    <Box>
                        <Typography variant="subtitle2" fontWeight={700} color="#0F172A">
                            {row.firstName} {row.lastName}
                        </Typography>
                    </Box>
                </Stack>
            )
        },
        {
            field: "email",
            headerName: "Email Address",
            flex: 1.8
        },
        {
            field: "role",
            headerName: "Role",
            flex: 1,
            renderCell: ({ value }) => (
                <Chip
                    label={value || "CUSTOMER"}
                    color={value === "ADMIN" ? "secondary" : "primary"}
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
                    <IconButton size="small" color="primary" onClick={() => handleView(row)}>
                        <VisibilityIcon fontSize="small" />
                    </IconButton>
                    <IconButton size="small" color="secondary" onClick={() => navigate(`/admin/users/edit/${row.id}`)}>
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
                            USER MANAGEMENT
                        </Typography>
                        <Typography variant="h4" fontWeight={800} color="#0F172A">
                            All Platform Users
                        </Typography>
                    </Box>

                    <Stack direction="row" spacing={2}>
                        <Button
                            variant="outlined"
                            startIcon={<RefreshIcon />}
                            onClick={loadUsers}
                            sx={{ borderRadius: 3, fontWeight: 700 }}
                        >
                            Refresh
                        </Button>
                        <Button
                            component={Link}
                            to="/admin/users/create"
                            variant="contained"
                            startIcon={<AddIcon />}
                            sx={{ borderRadius: 3, fontWeight: 700 }}
                        >
                            Create User
                        </Button>
                    </Stack>
                </Box>

                <TextField
                    fullWidth
                    placeholder="Search users by name or email address..."
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
                title="Delete User"
                message="Are you sure you want to delete this user?"
                onCancel={() => setDialogOpen(false)}
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