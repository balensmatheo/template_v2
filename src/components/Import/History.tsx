import Box from "@mui/joy/Box";
import Sheet from "@mui/joy/Sheet";
import Typography from "@mui/joy/Typography";
import {HistoryRounded} from "@mui/icons-material";
import * as React from "react";
import {Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow} from "@mui/material";

export default function History(){
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    interface Data {
        name: string;
        code: string;
        population: number;
        size: number;
        density: number;
    }

    function createData(
        name: string,
        code: string,
        population: number,
        size: number,
    ): Data {
        const density = population / size;
        return { name, code, population, size, density };
    }

    const rows = [
        createData('India', 'IN', 1324171354, 3287263),
        createData('China', 'CN', 1403500365, 9596961),
        createData('Italy', 'IT', 60483973, 301340),
        createData('United States', 'US', 327167434, 9833520),
        createData('Canada', 'CA', 37602103, 9984670),
        createData('Australia', 'AU', 25475400, 7692024),
        createData('Germany', 'DE', 83019200, 357578),
        createData('Ireland', 'IE', 4857000, 70273),
        createData('Mexico', 'MX', 126577691, 1972550),
        createData('Japan', 'JP', 126317000, 377973),
        createData('France', 'FR', 67022000, 640679),
        createData('United Kingdom', 'GB', 67545757, 242495),
        createData('Russia', 'RU', 146793744, 17098246),
        createData('Nigeria', 'NG', 200962417, 923768),
        createData('Brazil', 'BR', 210147125, 8515767),
    ];

    return (
        <Box sx={{
            display: 'flex',
            width: "100%",
            mt: 2,
            borderRadius: 'xs'
        }}>
            <Box
                sx={{
                    border: '1px solid',
                    borderColor: 'background.level2',
                    boxShadow: 'sm',
                    width: "100%",
                    borderRadius: 'md',
                    overflow: 'auto',
                }}
            >
                <Sheet sx={{
                    borderWidth: '0 0 1px 0',
                    display: 'flex',
                    alignItems: 'center',
                    p: 2,
                    borderBottom: '1px solid',
                    borderColor: 'background.level2',
                }}>
                    <Typography startDecorator={<HistoryRounded sx={{mb:0.3, mr: .5, color:"rgba(76,76,76,0.85)"}}/>} sx={{color: "rgba(46,46,46,0.85)"}} fontWeight={600} level={"h5"} variant={"plain"} >
                        Historique
                    </Typography>
                </Sheet>
                <Sheet sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    p: 2,
                }}>
                    <Typography sx={{color:"rgba(95,95,95,0.8)"}} >Documents importés précédemment : </Typography>
                        <TableContainer>
                            <Table stickyHeader size="small">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Nom</TableCell>
                                        <TableCell>Taille</TableCell>
                                        <TableCell>Type</TableCell>
                                        <TableCell>Date de création</TableCell>
                                        <TableCell>Date de modification</TableCell>
                                    </TableRow>
                                </TableHead>
                            </Table>
                        </TableContainer>
                    <TablePagination
                        rowsPerPageOptions={[10, 25, 100]}
                        component="div"
                        count={rows.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                </Sheet>
            </Box>
        </Box>
    )
}
