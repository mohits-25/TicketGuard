import { Paper, Box, Typography, Stack } from "@mui/material";

const AdminStatCard = ({ title, value, icon, color = "#4F46E5" }) => {
    return (
        <Paper
            elevation={0}
            sx={{
                p: 3.5,
                borderRadius: 5,
                bgcolor: "#FFFFFF",
                border: "1px solid #E2E8F0",
                position: "relative",
                overflow: "hidden",
                height: "100%",
                transition: "all 0.3s ease",
                "&:hover": {
                    transform: "translateY(-4px)",
                    boxShadow: "0 20px 30px -10px rgba(15, 23, 42, 0.08)",
                    borderColor: "#CBD5E1"
                }
            }}
        >
            <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
                <Typography variant="overline" color="text.secondary" fontWeight={800} letterSpacing={1}>
                    {title}
                </Typography>
                {icon && (
                    <Box
                        sx={{
                            width: 44,
                            height: 44,
                            borderRadius: 3,
                            bgcolor: `${color}15`,
                            color: color,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center"
                        }}
                    >
                        {icon}
                    </Box>
                )}
            </Stack>

            <Typography variant="h3" fontWeight={800} color="#0F172A">
                {value}
            </Typography>
        </Paper>
    );
};

export default AdminStatCard;