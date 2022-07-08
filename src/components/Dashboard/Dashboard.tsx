import Box from "@mui/joy/Box";
import Typography from "@mui/joy/Typography";

export default function Dashboard() {
    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                p: ".5"
            }}
        >
            <Box
                sx={{
                    flexDirection: "row",
                }}
            >
                <Typography fontSize={"22pt"} fontWeight={700}>Tableau de bord</Typography>
            </Box>
        </Box>
    );
}

