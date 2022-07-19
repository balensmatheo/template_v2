import * as React from 'react';
import { GlobalStyles } from '@mui/system';
import type { Theme } from '@mui/joy/styles';
import Box from '@mui/joy/Box';
import Typography from '@mui/joy/Typography';
import IconButton from '@mui/joy/IconButton';
import Logo from "./assets/logo_dn.png";
import "./App.css"

// Icons import
import DarkModeRoundedIcon from '@mui/icons-material/DarkModeRounded';
import LightModeRoundedIcon from '@mui/icons-material/LightModeRounded';
import MenuIcon from '@mui/icons-material/Menu';

// custom
import { deepmerge } from "@mui/utils";
import Layout from './components/Layout';
import Navigation from './components/Navigation';
import {Route, Routes, useNavigate} from "react-router-dom";
import Achats from "./components/Data/Achats";
import type {} from "@mui/material/themeCssVarsAugmentation";
import Tools from "./Tools/Tools";
import Import from "./components/Import/Import";
import Factures from "./components/Data/Factures";
import Banque from "./components/Data/Banque";
import Dashboard from "./components/Dashboard/Dashboard";
import {Link, TypeBackground} from "@mui/material";
import {useEffect, useState} from "react";
import ReactLoading from 'react-loading';

import {
    experimental_extendTheme as extendMuiTheme,
    PaletteColor,
    TypeText,
    TypeAction,
    Overlays,
    Theme as MuiTheme,
    Palette as MuiPalette,
    PaletteColorChannel,
    // PaletteAlert,
    PaletteAppBar,
    PaletteAvatar,
    PaletteChip,
    PaletteFilledInput,
    PaletteLinearProgress,
    PaletteSlider,
    // PaletteSkeleton,
    PaletteSnackbarContent,
    // PaletteSpeedDialAction,
    PaletteStepConnector,
    PaletteStepContent,
    PaletteSwitch,
    PaletteTableCell,
    PaletteTextChannel,
    PaletteTooltip
} from "@mui/material/styles";

import colors from "@mui/joy/colors";
import {
    extendTheme as extendJoyTheme,
    CssVarsProvider,
    useColorScheme,
    Theme as JoyTheme
} from "@mui/joy/styles";
import {CommonColors} from "@mui/material/styles/createPalette";
import LogIn from "./components/LogIn/LogIn";
import {Auth} from "aws-amplify";

declare module "@mui/joy/styles" {
    interface Palette {
        secondary: PaletteColorChannel;
        error: PaletteColorChannel;
        dividerChannel: string;
        action: TypeAction;
        // Material UI components
        // Alert: PaletteAlert;
        AppBar: PaletteAppBar;
        Avatar: PaletteAvatar;
        Chip: PaletteChip;
        FilledInput: PaletteFilledInput;
        LinearProgress: PaletteLinearProgress;
        // Skeleton: PaletteSkeleton;
        Slider: PaletteSlider;
        SnackbarContent: PaletteSnackbarContent;
        // SpeedDialAction: PaletteSpeedDialAction;
        StepConnector: PaletteStepConnector;
        StepContent: PaletteStepContent;
        Switch: PaletteSwitch;
        TableCell: PaletteTableCell;
        Tooltip: PaletteTooltip;
    }
    interface PalettePrimary extends PaletteColor {}
    interface PaletteInfo extends PaletteColor {}
    interface PaletteSuccess extends PaletteColor {}
    interface PaletteWarning extends PaletteColor {}
    interface PaletteCommon extends CommonColors {}
    interface PaletteText extends TypeText {}
    interface PaletteBackground extends TypeBackground {}

    interface ThemeScales {
        // apply to `theme` and `theme.vars`
        // overlays: Overlays;
        zIndex: MuiTheme["zIndex"];
    }
}

declare module "@mui/material/styles" {
    interface Theme {
        vars: JoyTheme["vars"];
    }
}


const muiTheme = extendMuiTheme({
    cssVarPrefix: "joy",
    colorSchemes: {
        light: {
            palette: {
                primary: {
                    main: colors.blue[500]
                },
                grey: colors.grey,
                error: {
                    main: colors.red[500]
                },
                info: {
                    main: colors.purple[500]
                },
                success: {
                    main: colors.green[500]
                },
                warning: {
                    main: colors.yellow[200]
                },
                common: {
                    white: "#FFF",
                    black: "#09090D"
                },
                divider: colors.grey[200],
                text: {
                    primary: colors.grey[800],
                    secondary: colors.grey[600]
                }
            }
        },
        dark: {
            palette: {
                primary: {
                    main: colors.blue[600]
                },
                grey: colors.grey,
                error: {
                    main: colors.red[600]
                },
                info: {
                    main: colors.purple[600]
                },
                success: {
                    main: colors.green[600]
                },
                warning: {
                    main: colors.yellow[300]
                },
                common: {
                    white: "#FFF",
                    black: "#09090D"
                },
                divider: colors.grey[800],
                text: {
                    primary: colors.grey[100],
                    secondary: colors.grey[300]
                }
            }
        }
    }
});

const joyTheme = extendJoyTheme();

function ColorSchemeToggle() {
    const { mode, setMode } = useColorScheme();
    const [mounted, setMounted] = useState(false);
    useEffect(() => {
        setMounted(true);
    }, []);
    if (!mounted) {
        return <IconButton size="sm" variant="outlined" color="primary" />;
    }
    return (
        <IconButton
            sx={{mr: 3}}
            id="toggle-mode"
            size="sm"
            variant="outlined"
            color="primary"
            onClick={() => {
                if (mode === 'light') {
                    setMode('dark');
                } else {
                    setMode('light');
                }
            }}
        >
            {mode === 'light' ? <DarkModeRoundedIcon /> : <LightModeRoundedIcon />}
        </IconButton>
    );
}

export default function App() {
    // Déclenché au chargement de la page
    useEffect(() => {
        setLoading(true);
        // On vérifie si l'utilisateur est connecté
        assessLoggedInState();
        setLoading(false)
    }, [])

    // Navigation
    const navigate = useNavigate();

    // états
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [loggedIn, setLoggedIn] = useState(false);
    const [user, setUser] = useState();
    const [group, setGroup]: Array<any> = useState([]);
    const [loading, setLoading] = useState(false);

    // fonctions
    async function assessLoggedInState() {
        Auth.currentAuthenticatedUser().then(
            (user) => {
                setLoggedIn(true);
                setGroup(user.signInUserSession.accessToken.payload["cognito:groups"]);
            }
        ).catch(() => {
            setLoggedIn(false);
            navigate("/login");
        })
    }

    function getUser(user: any) {
        setUser(user);
    }

    function onSignIn() {
        setLoggedIn(true);
    }

    if(loading) {
        return(
            <Box sx={{display: 'flex', flexDirection: "column", justifyContent: "center", alignItems:'center', width: "100%", height: "100vh"}}>
                <ReactLoading color={"black"} type="spin"/>
            </Box>
        )
    } else {
        return (
            <CssVarsProvider disableTransitionOnChange theme={deepmerge(muiTheme, joyTheme)}>
                <GlobalStyles<Theme>
                    styles={(theme) => ({
                        body: {
                            margin: 0,
                            fontFamily: theme.vars.fontFamily.body,
                        },
                    })}
                />
                {drawerOpen && (
                    <Layout.SideDrawer onClose={() => setDrawerOpen(false)}>
                        <Navigation />
                    </Layout.SideDrawer>
                )}
                <Layout.Root
                    sx={{
                        gridTemplateColumns: {
                            xs: '1fr',
                            sm: 'minmax(64px, 200px) minmax(450px, 1fr)',
                            md: 'minmax(160px, 300px) minmax(600px, 1fr)',
                        },
                        ...(drawerOpen && {
                            height: '100vh',
                            overflow: 'hidden',
                        }),
                    }}
                >
                    <Layout.Header>
                        <Box
                            sx={{
                                display: 'flex',
                                flexDirection: 'row',
                                alignItems: 'center',
                                gap: 1.5,
                            }}
                        >
                            <IconButton
                                variant="outlined"
                                size="sm"
                                onClick={() => setDrawerOpen(true)}
                                sx={{ display: { sm: 'none' } }}
                            >
                                <MenuIcon />
                            </IconButton>
                            <IconButton
                                size="sm"
                                variant="plain"
                                sx={{ display: { xs: 'none', sm: 'inline-flex' }}}
                                onClick={() => navigate('/')}
                            >
                                <img onClick={() => window.location.reload()} style={{width: "75px"}} src={Logo} alt={"Decision network logo"}/>
                            </IconButton>
                            <Box sx={{
                                borderLeft: '1px solid',
                                borderColor: 'background.level2',
                            }}>
                                <Typography className={"main-title"} onClick={() => navigate("/")} marginLeft={"1rem"}
                                            fontSize={"calc(10px + 3.3vmin)"} fontWeight="600">
                                    Espace Facturation
                                </Typography>
                            </Box>
                        </Box>
                        <ColorSchemeToggle />
                    </Layout.Header>
                    <Layout.SideNav>
                        <Navigation loggedIn={loggedIn}/>
                    </Layout.SideNav>
                    <Layout.Main>
                        {
                            loggedIn || loading ?
                                <Routes>
                                    <Route path={"*"} element={<Dashboard {...group} ></Dashboard>}></Route>
                                    <Route path="/import-data" element={<Import/>}/>
                                    <Route path="/data/achats" element={<Achats/>}/>
                                    <Route path="/data/factures" element={<Factures/>}/>
                                    <Route path="/data/banque" element={<Banque/>}/>
                                    <Route path="/tools" element={<Tools/>}/>
                                </Routes>
                                :
                                <Routes>
                                    <Route path="/login" element={<LogIn onSignIn={onSignIn} getUser={getUser}/>}/>
                                </Routes>
                        }
                    </Layout.Main>
                    <Layout.Footer>
                        <Box sx={{display: 'flex', flexDirection: 'row', width: "100%"}}>
                            <Link underline={"none"} variant={"body2"} href="http://decision-network.eu/">Decision Network © 2022</Link>
                            <Typography sx={{justifySelf: 'flex-end'}} level={"body2"}>v0.3</Typography>
                        </Box>
                    </Layout.Footer>
                </Layout.Root>
            </CssVarsProvider>
        );
    }
}
