import * as React from 'react';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import Title from './Title';

function preventDefault(event: React.MouseEvent) {
    event.preventDefault();
}

export default function Deposits() {
    const date = new Date().toLocaleDateString();
    return (
        <React.Fragment>
            <Title>Dépôts récents</Title>
            <Typography component="p" variant="h4">
                $3,024.00 - template
            </Typography>
            <Typography color="text.secondary" sx={{ flex: 1 }}>
                le {date}
            </Typography>
            <div>
                <Link color="primary" href="#" onClick={preventDefault}>
                    Voir le solde
                </Link>
            </div>
        </React.Fragment>
    );
}
