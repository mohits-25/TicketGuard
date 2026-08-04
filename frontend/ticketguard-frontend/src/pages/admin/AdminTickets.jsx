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
import DownloadIcon from "@mui/icons-material/Download";

import DashboardLayout from "../../components/layout/DashboardLayout";
import TicketDetailsDialog from "../../components/ticket/TicketDetailsDialog";

import {
    getTickets,
    downloadTicket
} from "../../api/adminTicketApi";

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

            setRows(data);

        } catch (err) {

            console.error(err);

            setError("Failed to load tickets.");

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

        return rows.filter(ticket =>

            ticket.ticketNumber
                ?.toLowerCase()
                .includes(search.toLowerCase())

            ||

            ticket.bookingReference
                ?.toLowerCase()
                .includes(search.toLowerCase())

            ||

            ticket.eventTitle
                ?.toLowerCase()
                .includes(search.toLowerCase())

            ||

            ticket.venueName
                ?.toLowerCase()
                .includes(search.toLowerCase())

        );

    }, [rows, search]);

    const columns = [
                {
            field: "ticketNumber",
            headerName: "Ticket Number",
            flex: 1.4
        },

        {
            field: "bookingReference",
            headerName: "Booking Ref",
            flex: 1.2
        },

        {
            field: "eventTitle",
            headerName: "Event",
            flex: 1.6
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
            field: "numberOfTickets",
            headerName: "Qty",
            flex: 0.6
        },

        {
            field: "totalAmount",
            headerName: "Amount",
            flex: 0.9,

            renderCell: ({ value }) => (

                <Typography fontWeight={600}>

                    ₹ {value}

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

                    size="small"

                    color={
                        value === "ACTIVE"
                            ? "success"
                            : value === "USED"
                            ? "warning"
                            : "error"
                    }

                />

            )

        },

        {
            field: "actions",

            headerName: "Actions",

            width: 170,

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
                            handleDownload(
                                row.id,
                                row.ticketNumber
                            )
                        }

                    >

                        <DownloadIcon />

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

                        Manage Tickets

                    </Typography>

                    <Button

                        variant="outlined"

                        startIcon={<RefreshIcon />}

                        onClick={loadTickets}

                    >

                        Refresh

                    </Button>

                </Box>

                <TextField

                    fullWidth

                    placeholder="Search tickets..."

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

                        filteredRows.length === 0 ?

                            (

                                <Box
                                    py={8}
                                    textAlign="center"
                                >

                                    <Typography
                                        variant="h6"
                                        color="text.secondary"
                                    >

                                        No tickets found.

                                    </Typography>

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

                                            fontWeight: "bold"

                                        },

                                        "& .MuiDataGrid-row:hover": {

                                            backgroundColor: "#F9FAFB"

                                        }

                                    }}

                                />

                            )

                }

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