import Box from "@mui/joy/Box";
import Sheet from "@mui/joy/Sheet";
import Typography from "@mui/joy/Typography";
import {HistoryRounded} from "@mui/icons-material";
import * as React from "react";
import {Table, TableCell, tableCellClasses, TableContainer, TableHead, TableRow} from "@mui/material";
import {styled} from "@mui/joy/styles";

export default function History(){
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
                    <Typography startDecorator={<HistoryRounded sx={{mb:.5, mr: .5, color:"rgba(90,90,90,0.85)"}}/>} sx={{color: "rgba(65,65,65,0.85)"}} fontWeight={600} level={"h5"} variant={"plain"} >
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
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell className={tableCellClasses.root}>oui</TableCell>
                                </TableRow>
                            </TableHead>
                        </Table>
                    </TableContainer>
                </Sheet>
            </Box>
        </Box>
    )
}
