import * as React from 'react';
import Link from '@mui/material/Link';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Title from './Title';
import {TableContainer} from "@mui/material";

// Generate Order Data
function createData(
    id: number,
    date: string,
    name: string,
    paymentMethod: string,
    amount: number,
) {
    return { id, date, name, paymentMethod, amount };
}

const rows = [
    createData(
        0,
        '16 Mar, 2022',
        'Deciway Consulting',
        'VISA ⠀•••• 3719',
        3012.44,
    ),
    createData(
        1,
        '16 Mar, 2022',
        'Epsilon Consulting',
        'VISA ⠀•••• 2574',
        1866.99,
    ),
    createData(2, '16 Mar, 2019', 'ABS Decision', 'MC ⠀•••• 1253', 100.81),
    createData(
        3,
        '16 Mar, 2022',
        'XNDATA',
        'AMEX ⠀•••• 2000',
        2654.39,
    ),
    createData(
        4,
        '15 Mar, 2019',
        'Incisys',
        'VISA ⠀•••• 5919',
        1212.79,
    ),
];

function preventDefault(event: React.MouseEvent) {
    event.preventDefault();
}

export default function Orders() {
    return (
        <React.Fragment>
            <Title>Achats Récents - template</Title>
            <TableContainer sx={{maxHeight: "700px"}}>
                <Table size="small">
                    <TableHead>
                        <TableRow>
                            <TableCell>Date</TableCell>
                            <TableCell>Nom</TableCell>
                            <TableCell>Méthode de paiement</TableCell>
                            <TableCell align="right">Montant de l'achat</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row) => (
                            <TableRow key={row.id}>
                                <TableCell>{row.date}</TableCell>
                                <TableCell>{row.name}</TableCell>
                                <TableCell>{row.paymentMethod}</TableCell>
                                <TableCell align="right">{`$${row.amount}`}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <Link color="primary" href="#" onClick={preventDefault} sx={{ mt: 3 }}>
                Voir plus d'achats
            </Link>
        </React.Fragment>
    );
}
