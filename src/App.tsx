import * as React from 'react';
import { GlobalStyles } from '@mui/system';
import { CssVarsProvider, useColorScheme } from '@mui/joy/styles';
import type { Theme } from '@mui/joy/styles';
import Box from '@mui/joy/Box';
import Typography from '@mui/joy/Typography';
import IconButton from '@mui/joy/IconButton';
import Logo from "./assets/logo_dn.png";
import "./App.css"

// Icons import
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import DarkModeRoundedIcon from '@mui/icons-material/DarkModeRounded';
import LightModeRoundedIcon from '@mui/icons-material/LightModeRounded';
import GridViewRoundedIcon from '@mui/icons-material/GridViewRounded';
import MenuIcon from '@mui/icons-material/Menu';

// custom
import filesTheme from './theme';
import Menu from './components/Menu';
import Layout from './components/Layout';
import Navigation from './components/Navigation';
import {Route, Routes, useNavigate} from "react-router-dom";
import Achats from "./components/Data/Achats";
import Tools from "./Tools/Tools";
import Import from "./components/Import/Import";
import Infos from "./components/About/Infos";
import Factures from "./components/Data/Factures";
import Banque from "./components/Data/Banque";
import Dashboard from "./components/Dashboard/Dashboard";
import {Divider, Link} from "@mui/material";
import {useEffect, useState} from "react";


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
    const [drawerOpen, setDrawerOpen] = useState(false);
    const navigate = useNavigate();

    return (
        <CssVarsProvider disableTransitionOnChange theme={filesTheme}>
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
                                        fontSize={"calc(13px + 3.3vmin)"} fontWeight="700">
                                Espace Facturation
                            </Typography>
                        </Box>
                    </Box>
                    <Box sx={{ display: 'flex', flexDirection: 'row', gap: 1.5 }}>
                        <Menu
                            id="app-selector"
                            control={
                                <IconButton
                                    size="sm"
                                    variant="outlined"
                                    color="primary"
                                    aria-label="applications"
                                >
                                    <GridViewRoundedIcon />
                                </IconButton>
                            }
                            menus={[
                                {
                                    label: 'A propos',
                                    href: '/infos',
                                },
                            ]}
                        />
                        <ColorSchemeToggle />
                    </Box>
                </Layout.Header>
                <Layout.SideNav>
                    <Navigation />
                </Layout.SideNav>
                <Layout.Main>
                    <Box sx={{width: '100%'}}>
                        <Routes>
                            <Route path="*" element={<Dashboard/>} />
                            <Route path="/import-data" element={<Import/>} />
                            <Route path="/data/achats" element={<Achats/>}/>
                            <Route path="/data/factures" element={<Factures/>}/>
                            <Route path="/data/banque" element={<Banque/>}/>
                            <Route path="/tools" element={<Tools/>} />
                            <Route path="/infos" element={<Infos/>}/>
                        </Routes>
                    </Box>
                </Layout.Main>

                <Layout.Footer>
                    <Box>
                        <Link underline={"none"} variant={"body2"} href="http://decision-network.eu/">Decision Network © 2022</Link>
                    </Box>
                </Layout.Footer>
            </Layout.Root>
        </CssVarsProvider>
    );
}
