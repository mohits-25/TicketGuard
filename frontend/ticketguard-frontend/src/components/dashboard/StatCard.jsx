import { Paper, Box, Typography, Stack } from "@mui/material";

const StatCard = ({ title, value, color = "#4F46E5", icon, subtitle }) => {
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
                transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                "&:hover": {
                    transform: "translateY(-4px)",
                    boxShadow: "0 20px 30px -10px rgba(15, 23, 42, 0.08)",
                    borderColor: "#CBD5E1"
                }
            }}
        >
            {/* Top Right Background Soft Glow Accent */}
            <Box
                sx={{
                    position: "absolute",
                    top: -20,
                    right: -20,
                    width: 90,
                    height: 90,
                    borderRadius: "50%",
                    bgcolor: color,
                    opacity: 0.08,
                    filter: "blur(20px)"
                }}
            />

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

            <Typography variant="h3" fontWeight={800} color="#0F172A" sx={{ mb: 0.5 }}>
                {value}
            </Typography>

            {subtitle && (
                <Typography variant="caption" color="text.secondary" fontWeight={600}>
                    {subtitle}
                </Typography>
            )}
        </Paper>
    );
};

export default StatCard;