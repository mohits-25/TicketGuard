import { Box, Container } from "@mui/material";
import Sidebar from "./Sidebar";

const DashboardLayout = ({ children }) => {
    return (
        <Box sx={{ display: "flex", minHeight: "100vh", bgcolor: "#F8FAFC" }}>
            <Sidebar />

            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    p: { xs: 2.5, md: 4 },
                    minHeight: "100vh",
                    overflowX: "hidden"
                }}
            >
                <Container maxWidth="xl" disableGutters sx={{ py: 1 }}>
                    {children}
                </Container>
            </Box>
        </Box>
    );
};

export default DashboardLayout;