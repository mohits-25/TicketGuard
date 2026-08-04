import { Box, Typography } from "@mui/material";

const Footer = () => {

    return (

        <Box
            sx={{
                mt: 5,
                p: 2,
                bgcolor: "#1976d2",
                color: "white",
                textAlign: "center"
            }}
        >

            <Typography>

                © 2026 TicketGuard. All Rights Reserved.

            </Typography>

        </Box>

    );

};

export default Footer;