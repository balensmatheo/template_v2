import Box from "@mui/joy/Box";
import Sheet from "@mui/joy/Sheet";
import Typography from "@mui/joy/Typography";
import {HistoryRounded} from "@mui/icons-material";
import * as React from "react";
import {Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";

export default function History(){

    function createData(
        name: string,
        calories: number,
        fat: number,
        carbs: number,
        protein: number,
    ) {
        return { name, calories, fat, carbs, protein };
    }

    const rows = [
        createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
        createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
        createData('Eclair', 262, 16.0, 24, 6.0),
        createData('Cupcake', 305, 3.7, 67, 4.3),
        createData('Gingerbread', 356, 16.0, 49, 3.9),
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
                </Sheet>
            </Box>
        </Box>
    )
}
