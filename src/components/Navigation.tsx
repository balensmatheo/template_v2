import * as React from 'react';
import Box from '@mui/joy/Box';
import Typography from '@mui/joy/Typography';
import IconButton from '@mui/joy/IconButton';
import List from '@mui/joy/List';
import ListItem from '@mui/joy/ListItem';
import ListItemButton from '@mui/joy/ListItemButton';
import ListItemDecorator from '@mui/joy/ListItemDecorator';
import ListItemContent from '@mui/joy/ListItemContent';

// Icons import
import KeyboardArrowDownRoundedIcon from '@mui/icons-material/KeyboardArrowDownRounded';
import {Link} from "react-router-dom";
import {
    AccountBalance, AccountBalanceRounded,
    BuildRounded, CloudDownloadRounded, Dashboard, DashboardRounded, DataUsageRounded,
    HomeRounded, KeyboardArrowRight, KeyboardArrowRightRounded, Login, Money, PeopleAltRounded,
    ReceiptRounded,

    ShoppingCartRounded
} from "@mui/icons-material";

export default function Navigation(props: any) {
    const [index, setIndex] = React.useState(0);
    const [open, setOpen] = React.useState(true);
    const [dataSubmenu, setDataSubmenu] = React.useState(false);
    const [loggedIn, setLoggedIn] = React.useState(props.loggedIn);


    if (loggedIn) {
        return (
            <List size="sm" sx={{'--List-item-radius': '8px'}}>
                <ListItem nested sx={{p: 0}}>
                    <Box
                        sx={{
                            mb: 1,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                        }}
                    >
                        <Typography
                            id="nav-list-browse"
                            textColor="neutral.500"
                            fontWeight={700}
                            sx={{
                                fontSize: '10px',
                                textTransform: 'uppercase',
                                letterSpacing: '.1rem',
                            }}
                        >
                            Navigation
                        </Typography>
                        <IconButton
                            size="sm"
                            variant="plain"
                            color="primary"
                            sx={{'--IconButton-size': '24px'}}
                            onClick={() => setOpen(!open)}
                        >

                            {open ? <KeyboardArrowDownRoundedIcon fontSize="small" color="primary"/> :
                                <KeyboardArrowRightRounded fontSize="small" color="primary"/>}
                        </IconButton>
                    </Box>
                    {open ?
                        <List
                            aria-labelledby="nav-list-browse"
                            sx={{
                                '& .JoyListItemButton-root': {p: '8px'},
                            }}
                        >
                            <Link style={{textDecoration: "none"}} to={"/"}>
                                <ListItem sx={{mb: ".5em"}}>
                                    <ListItemButton
                                        selected={index === 0}
                                        variant={index === 0 ? 'soft' : 'plain'}
                                        color={index === 0 ? 'danger' : undefined}
                                        onClick={() => setIndex(0)}
                                    >
                                        <ListItemDecorator sx={{color: 'inherit'}}>
                                            <DashboardRounded color={index === 0 ? "action" : "action"}
                                                              fontSize="large"/>
                                        </ListItemDecorator>
                                        <ListItemContent sx={{mt: "0.2em"}}>Dashboard</ListItemContent>
                                    </ListItemButton>
                                </ListItem>
                            </Link>
                            <Link style={{textDecoration: "none"}} to={"/import-data"}>
                                <ListItem sx={{mb: ".5em"}}>
                                    <ListItemButton
                                        selected={index === 1}
                                        variant={index === 1 ? 'soft' : 'plain'}
                                        color={index === 1 ? 'neutral' : undefined}
                                        onClick={() => setIndex(1)}
                                    >
                                        <ListItemDecorator sx={{color: 'inherit'}}>
                                            <CloudDownloadRounded color={index === 1 ? "primary" : "action"}
                                                                  fontSize="large"/>
                                        </ListItemDecorator>
                                        <ListItemContent sx={{mt: "0.2em"}}>Module d'import</ListItemContent>
                                    </ListItemButton>
                                </ListItem>
                            </Link>
                            <ListItem onClick={() => setDataSubmenu(!dataSubmenu)}
                                      sx={{mb: ".5em", display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
                                <ListItemButton
                                    selected={index === 2}
                                    variant={index === 2 ? 'soft' : 'plain'}
                                    color={index === 2 ? 'neutral' : undefined}
                                    onClick={() => setIndex(2)}
                                >
                                    <ListItemDecorator sx={{color: 'inherit'}}>
                                        <DataUsageRounded color={index === 2 ? "info" : "action"} fontSize="large"/>
                                    </ListItemDecorator>
                                    <ListItemContent sx={{mt: "0.2em"}}>Visualisation des données</ListItemContent>
                                    <IconButton
                                        size="sm"
                                        variant="plain"
                                        color="neutral"
                                        sx={{'--IconButton-size': '24px'}}
                                        onClick={() => setDataSubmenu(!dataSubmenu)}
                                    >

                                        {dataSubmenu ? <KeyboardArrowDownRoundedIcon fontSize="small" color="action"/> :
                                            <KeyboardArrowRightRounded fontSize="small" color="action"/>}
                                    </IconButton>
                                </ListItemButton>
                            </ListItem>
                            {dataSubmenu ?
                                <Box
                                    sx={{ml: "2.2em"}}
                                >
                                    <Link style={{textDecoration: "none"}} to={"/data/achats"}>
                                        <ListItem sx={{
                                            mb: ".2em",
                                            display: 'flex',
                                            flexDirection: 'row',
                                            alignItems: 'center'
                                        }}>
                                            <ListItemButton
                                                selected={index === 3}
                                                variant={index === 3 ? 'soft' : 'plain'}
                                                color={index === 3 ? 'neutral' : undefined}
                                                onClick={() => setIndex(3)}
                                            >
                                                <ListItemDecorator sx={{color: 'grey'}}>
                                                    <ShoppingCartRounded color={index === 3 ? "secondary" : "action"}
                                                                         fontSize="large"/>
                                                </ListItemDecorator>
                                                <ListItemContent sx={{mt: "0.2em"}}>Achats</ListItemContent>
                                            </ListItemButton>
                                        </ListItem>
                                    </Link>
                                    <Link style={{textDecoration: "none"}} to={"/data/factures"}>
                                        <ListItem sx={{
                                            mb: ".2em",
                                            display: 'flex',
                                            flexDirection: 'row',
                                            alignItems: 'center'
                                        }}>
                                            <ListItemButton
                                                selected={index === 4}
                                                variant={index === 4 ? 'soft' : 'plain'}
                                                color={index === 4 ? 'neutral' : undefined}
                                                onClick={() => setIndex(4)}
                                            >
                                                <ListItemDecorator sx={{color: 'grey'}}>
                                                    <ReceiptRounded fontSize="small"/>
                                                </ListItemDecorator>
                                                <ListItemContent sx={{mt: "0.2em"}}>Factures</ListItemContent>
                                            </ListItemButton>
                                        </ListItem>
                                    </Link>
                                    <Link style={{textDecoration: "none"}} to={"/data/banque"}>
                                        <ListItem sx={{
                                            mb: ".2em",
                                            display: 'flex',
                                            flexDirection: 'row',
                                            alignItems: 'center'
                                        }}>
                                            <ListItemButton
                                                selected={index === 5}
                                                variant={index === 5 ? 'soft' : 'plain'}
                                                color={index === 5 ? 'neutral' : undefined}
                                                onClick={() => setIndex(5)}
                                            >
                                                <ListItemDecorator sx={{color: 'grey'}}>
                                                    <AccountBalanceRounded fontSize="small"/>
                                                </ListItemDecorator>
                                                <ListItemContent sx={{mt: "0.2em"}}>Opérations
                                                    bancaires</ListItemContent>
                                            </ListItemButton>
                                        </ListItem>
                                    </Link>
                                    <Link style={{textDecoration: "none"}} to={"/data/banque"}>
                                        <ListItem sx={{
                                            mb: "1em",
                                            display: 'flex',
                                            flexDirection: 'row',
                                            alignItems: 'center'
                                        }}>
                                            <ListItemButton
                                                selected={index === 6}
                                                variant={index === 6 ? 'soft' : 'plain'}
                                                color={index === 6 ? 'neutral' : undefined}
                                                onClick={() => setIndex(6)}
                                            >
                                                <ListItemDecorator sx={{color: 'grey'}}>
                                                    <PeopleAltRounded fontSize="small"/>
                                                </ListItemDecorator>
                                                <ListItemContent
                                                    sx={{mt: "0.3em"}}>Clients/Fournisseurs</ListItemContent>
                                            </ListItemButton>
                                        </ListItem>
                                    </Link>
                                </Box>
                                :
                                undefined
                            }
                            <Link style={{textDecoration: "none"}} to={"tools"}>
                                <ListItem sx={{mb: ".5em"}}>
                                    <ListItemButton
                                        selected={index === 7}
                                        variant={index === 7 ? 'soft' : 'plain'}
                                        color={index === 7 ? 'neutral' : undefined}
                                        onClick={() => setIndex(7)}
                                    >
                                        <ListItemDecorator sx={{color: 'inherit'}}>
                                            <BuildRounded fontSize="medium"/>
                                        </ListItemDecorator>
                                        <ListItemContent sx={{mt: "0.2em"}}>Rapprochements</ListItemContent>
                                    </ListItemButton>
                                </ListItem>
                            </Link>
                        </List>
                        :
                        undefined
                    }
                </ListItem>
            </List>
        );
    } else {
        return (
            <List size="sm" sx={{'--List-item-radius': '8px'}}>
                <ListItem nested sx={{p: 0}}>
                    <Box
                        sx={{
                            mb: 1,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                        }}
                    >
                        <Typography
                            id="nav-list-browse"
                            textColor="neutral.500"
                            fontWeight={700}
                            sx={{
                                fontSize: '10px',
                                textTransform: 'uppercase',
                                letterSpacing: '.1rem',
                            }}
                        >
                            Navigation
                        </Typography>
                        <IconButton
                            size="sm"
                            variant="plain"
                            color="primary"
                            sx={{'--IconButton-size': '24px'}}
                            onClick={() => setOpen(!open)}
                        >

                            {open ? <KeyboardArrowDownRoundedIcon fontSize="small" color="primary"/> :
                                <KeyboardArrowRightRounded fontSize="small" color="primary"/>}
                        </IconButton>
                    </Box>
                    {open ?
                        <List
                            aria-labelledby="nav-list-browse"
                            sx={{
                                '& .JoyListItemButton-root': {p: '8px'},
                            }}
                        >
                            <Link style={{textDecoration: "none"}} to={"/"}>
                                <ListItem sx={{mb: ".5em"}}>
                                    <ListItemButton
                                        selected={index === 0}
                                        variant={index === 0 ? 'soft' : 'plain'}
                                        color={index === 0 ? 'success' : undefined}
                                        onClick={() => setIndex(0)}
                                    >
                                        <ListItemDecorator sx={{color: 'inherit'}}>
                                            <Login color={index === 0 ? "action" : "action"}
                                                              fontSize="large"/>
                                        </ListItemDecorator>
                                        <ListItemContent>Connexion</ListItemContent>
                                    </ListItemButton>
                                </ListItem>
                            </Link>
                        </List>
                        :
                        undefined
                    }
                </ListItem>
            </List>
        );
    }
}
