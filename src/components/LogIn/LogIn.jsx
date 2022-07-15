import Box from "@mui/joy/Box";
import React from 'react'
import "./login.css";
import Paper from "@mui/material/Paper";
import Typography from "@mui/joy/Typography";
import {Avatar, Checkbox, Link} from "@mui/joy";
import {Button, Divider, TextField} from "@mui/material";
import {useState, useEffect} from "react";
import {Mail, Password, RememberMe} from "@mui/icons-material";

export default function LogIn(props){
    return(
        <Box>
            <Box className="header">
                <Box className="inner-header flex">
                    <Paper
                        elevation={8}
                        sx={{
                            maxWidth: 400,
                            minWidth: 300,
                            mx: 'auto', // margin left & right
                            my: 4, // margin top & botom
                            py: 3, // padding top & bottom
                            px: 2, // padding left & right
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'center',
                            gap: 2,
                            borderRadius: "10px",
                            borderBottom: '1px solid #e0e0e0',
                        }}
                    >
                        <Box sx={{display: 'flex', flexDirection: "column", justifyContent: "center",alignItems: "center",width: '100%'}}>
                            <Avatar sx={{mb:1}} size={"lg"} />
                            <Typography
                                id="nav-list-browse"
                                textColor="neutral.500"
                                fontWeight={700}
                                sx={{
                                    textTransform: 'uppercase',
                                    letterSpacing: '.1rem',
                                }}
                                level={"h4"}>
                                Connexion
                            </Typography>
                        </Box>
                        <Box sx={{width: "100%", display: "flex", flexDirection: 'column', mb: 2}}>
                            <Divider sx={{mb:2}} variant={"fullWidth"}/>
                            <TextField margin={"normal"} variant={"standard"} size={"small"} name={"Email"} type={"email"} label={<Typography startDecorator={<Mail/>}>Email</Typography>}/>
                            <TextField margin={"normal"} variant={"standard"} size={"small"} name={"Password"} type={"password"} label={<Typography startDecorator={<Password/>}>Password</Typography>}/>
                        </Box>
                        <Box sx={{display: "flex", flexDirection: 'column', width: "100%"}}>
                            <Divider variant={'fullWidth'} sx={{mb: 2}}/>
                            <Button sx={{
                                bgcolor: "#9a2797",
                                '&:hover': {
                                    bgcolor: "rgba(154,39,151,0.53)",
                                }
                            }} variant={"contained"}>Connexion</Button>
                        </Box>
                        <Typography
                            fontSize="8pt"
                            sx={{ alignSelf: 'center' }}
                        >
                            <Link>Mot de passe oublié ?</Link>
                        </Typography>
                    </Paper>
                </Box>
                <Box>
                    <svg className="waves" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink"
                         viewBox="0 24 150 28" preserveAspectRatio="none" shapeRendering="auto">
                        <defs>
                            <path id="gentle-wave"
                                  d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z"/>
                        </defs>
                        <g className="parallax">
                            <use xlinkHref="#gentle-wave" x="48" y="0" fill="rgba(255,255,255,0.7"/>
                            <use xlinkHref="#gentle-wave" x="48" y="3" fill="rgba(255,255,255,0.5)"/>
                            <use xlinkHref="#gentle-wave" x="48" y="5" fill="rgba(255,255,255,0.3)"/>
                            <use xlinkHref="#gentle-wave" x="48" y="7" fill="#fff"/>
                        </g>
                    </svg>
                </Box>
            </Box>
        </Box>
    )
}
