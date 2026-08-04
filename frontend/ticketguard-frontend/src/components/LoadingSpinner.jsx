import { CircularProgress, Box } from "@mui/material";

const LoadingSpinner = () => {

    return (

        <Box
            sx={{
                display: "flex",
                justifyContent: "center",
                mt: 5
            }}
        >

            <CircularProgress />

        </Box>

    );

};

export default LoadingSpinner;