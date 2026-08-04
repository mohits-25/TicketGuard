import { Box, Toolbar } from "@mui/material";
import Sidebar from "./Sidebar";

const DashboardLayout = ({ children }) => {

    return (

        <Box sx={{ display: "flex" }}>

            <Sidebar />

            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    p: 4
                }}
            >

                <Toolbar />

                {children}

            </Box>

        </Box>

    );

};

export default DashboardLayout;