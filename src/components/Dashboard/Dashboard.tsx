import * as React from 'react';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Chart from './Chart';
import Deposits from './Deposits';
import Orders from './Orders';
import Typography from "@mui/joy/Typography";
import Box from "@mui/joy/Box";
import {Divider} from "@mui/material";

// Contenu du Dashboard
function DashboardContent(props: any) {
    return (
        <Box p={1}>
            <Typography fontWeight={500} fontSize={"calc(10px + 3.3vmin)"} gutterBottom>Tableau de bord</Typography>
            <Divider sx={{mb: 2}}></Divider>
            <Box>
                <Grid sx={{display: 'flex', justifyContent: "center", width: "100%"}} container spacing={3}>
                    {/* Graphique */}
                    <Grid item xs={11} md={8} lg={8}>
                        <Paper
                            sx={{
                                p: 2,
                                display: 'flex',
                                flexDirection: 'column',
                                height: 240,
                            }}
                        >
                            <Chart/>
                        </Paper>
                    </Grid>
                    {/* Dépots récents */}
                    <Grid item xs={11} md={4} lg={3}>
                        <Paper
                            sx={{
                                p: 2,
                                display: 'flex',
                                flexDirection: 'column',
                                height: 240,
                            }}
                        >
                            <Deposits/>
                        </Paper>
                    </Grid>
                    {/* Achats récents */}
                    <Grid item xs={11}>
                        <Paper sx={{p: 2, display: 'flex', flexDirection: 'column'}}>
                            <Orders/>
                        </Paper>
                    </Grid>
                </Grid>
            </Box>
        </Box>
    );
}

export default function Dashboard() {
    return <DashboardContent />;
}
