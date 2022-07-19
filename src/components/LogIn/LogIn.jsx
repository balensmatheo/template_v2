import Box from "@mui/joy/Box";
import React, {useEffect, useState} from 'react'
import "./login.css";
import Paper from "@mui/material/Paper";
import Typography from "@mui/joy/Typography";
import {Avatar, Link} from "@mui/joy";
import {Divider, TextField} from "@mui/material";
import {CheckCircle, Mail, Password} from "@mui/icons-material";
import {Auth} from "aws-amplify";
import LoadingButton from "@mui/lab/LoadingButton";
import {useNavigate} from "react-router-dom";

export default function LogIn({onSignIn, getUser}) {

    // Navigator
    const navigate = useNavigate();

    // States
    const [mail, setMail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [challenge, setChallenge] = useState(false);
    const [error, setError] = useState({state: false, value: ""});
    const [newPassword, setNewPassword] = useState("");

    // Functions
    async function signIn() {
        try {
            setLoading(true);
            const user = await Auth.signIn(mail, password)
                .then(user => {
                    if (user.challengeName === 'NEW_PASSWORD_REQUIRED') {
                        setChallenge(true);
                        setLoading(false)
                    } else {
                        onSignIn();
                        setLoading(false)
                        navigate("/");
                    }
                });
            getUser(user);
        } catch (e) {
            console.log("Error while Sign-In : " + e);
            setLoading(false);
            setError({state: true, value: e.message});
        }
    }


    async function changePassword() {
        setLoading(true)
        const user = await Auth.signIn(mail, password).then(
            user => {
                Auth.completeNewPassword(
                    user,
                    newPassword,
                    {},
                )
            }
        )
        onSignIn();
        getUser(user);
        setChallenge(false);
        setLoading(false);
    }


    // Rendering
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
                            <TextField onChange={event => setMail(event.target.value)} value={mail} margin={"normal"} variant={"standard"} size={"small"} name={"Email"} type={"email"} label={<Typography startDecorator={<Mail/>}>Email</Typography>}/>
                            <TextField helperText={error.value} error={error.state} onChange={event => setPassword(event.target.value)} value={password} margin={"normal"} variant={"standard"} size={"small"} name={"Password"} type={"password"} label={<Typography startDecorator={<Password/>}>Password</Typography>}/>
                            {
                                challenge ?
                                    <Box sx={{display: "flex", flexDirection: "column"}}>
                                        <TextField onChange={event => setNewPassword(event.target.value)}
                                                   value={newPassword} margin={"normal"} variant={"standard"}
                                                   size={"small"} type={"password"} label={"Nouveau mot de passe"}/>
                                        <Box sx={{display: "flex", flexDiraction: "row", alignItems: "center", width: "100%", mt: 1}}>
                                            <CheckCircle color={newPassword.length >= 8 ? "success" : "danger"}/>
                                            <Typography sx={{ml: 1}}>8 caractères minimum</Typography>
                                        </Box>
                                        <Box sx={{display: "flex", flexDiraction: "row", alignItems: "center", width: "100%", mt: 1}}>
                                            <CheckCircle color={newPassword.match(/[A-Z]/) ? "success" : "danger"}/>
                                            <Typography sx={{ml: 1}}>Au moins une majuscule</Typography>
                                        </Box>
                                        <Box sx={{display: "flex", flexDiraction: "row", alignItems: "center", width: "100%", mt: 1}}>
                                            <CheckCircle color={newPassword.match(/[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/) ? "success" : "danger"}/>
                                            <Typography sx={{ml: 1}}>Un caractère spécial</Typography>
                                        </Box>
                                    </Box>
                                    :
                                    undefined
                            }
                        </Box>

                                <Box sx={{display: "flex", flexDirection: 'column', width: "100%"}}>
                                    <Divider variant={'fullWidth'} sx={{mb: 2}}/>
                                    {
                                        challenge ?
                                            <LoadingButton loading={loading} sx={{
                                                bgcolor: "#9a2797",
                                                '&:hover': {
                                                    bgcolor: "rgba(154,39,151,0.53)",
                                                }
                                            }}
                                                           disabled={!newPassword.match(/[A-Z]/) || !newPassword.match(/[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/) || newPassword.length < 8}
                                                           variant={"contained"}
                                                           onClick={changePassword}>
                                                Mettre à jour le mot de passe
                                            </LoadingButton>
                                            :
                                            <LoadingButton loading={loading} sx={{
                                                bgcolor: "#9a2797",
                                                '&:hover': {
                                                    bgcolor: "rgba(154,39,151,0.53)",
                                                }
                                            }}
                                                    variant={"contained"}
                                                    onClick={() => signIn()}>
                                                Connexion
                                            </LoadingButton>
                                    }
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
