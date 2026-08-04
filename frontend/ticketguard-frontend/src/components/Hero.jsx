import { Box, Typography, Button, Container } from "@mui/material";
import { Link } from "react-router-dom";

const Hero = () => {

    return (

        <Box
            sx={{
                background:
                    "linear-gradient(to right, #1976d2, #42a5f5)",
                color: "white",
                py: 10,
                textAlign: "center"
            }}
        >

            <Container>

                <Typography
                    variant="h2"
                    fontWeight="bold"
                >

                    Discover Amazing Events

                </Typography>

                <Typography
                    variant="h6"
                    sx={{ mt: 2 }}
                >

                    Book concerts, sports, comedy shows and
                    unforgettable experiences.

                </Typography>

                <Button
                    variant="contained"
                    color="secondary"
                    size="large"
                    sx={{ mt: 4 }}
                    component={Link}
                    to="/events"
                >

                    Explore Events

                </Button>

            </Container>

        </Box>

    );

};

export default Hero;