import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { Link as Mandar, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react"
import Theme from "../Theme/Theme";
import { ThemeProvider } from '@mui/material/styles';



export default function Login({ usuarios, setIdLogeado }) {

    const navigate = useNavigate();
    let [Email, setEmail] = useState('');
    let [Password, setPassword] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        

        /* Encontrar el usuario en el State */
        let usuarioBuscado = usuarios.find((user) => {
            return user.email === Email
        })

        

        /* Que existan datos */
        if (!Password|| !Email) {
            /* Si es diferente el State del login */
        } else if (usuarioBuscado.email !== Email || usuarioBuscado.password !== Password) {

            /* Si son iguales pasa */
        } else {

            setIdLogeado(usuarioBuscado.id)
            navigate('/todo', {replace: true})

        }


    };



    const tema = Theme;

    return (
        <ThemeProvider theme={tema}>
            <Grid container component="main" sx={{ height: '100vh' }}>
                <CssBaseline />
                <Grid
                    item
                    xs={false}
                    sm={4}
                    md={7}
                    sx={{
                        backgroundImage: 'url(https://source.unsplash.com/random)',
                        backgroundRepeat: 'no-repeat',
                        backgroundColor: (t) =>
                            t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                    }}
                />
                <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                    <Box
                        sx={{
                            my: 8,
                            mx: 4,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                            <LockOutlinedIcon />
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            Inicia Sesión
                        </Typography>
                        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="email"
                                label="Email"
                                name="email"
                                autoComplete="email"
                                autoFocus
                                onChange={(event)=> setEmail(event.target.value)}
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                                onChange={(event)=> setPassword(event.target.value)}
                            />

                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    sx={{ mt: 3, mb: 2 }}
                                >
                                    Iniciar Sesión
                                </Button>

                            <Grid container>
                                <Grid item xs>

                                </Grid>
                                <Grid item>
                                    <Mandar to="/registro" variant="body2">
                                        <Link>
                                            {"Aun no tengo Cuenta"}
                                        </Link>
                                    </Mandar>
                                </Grid>
                            </Grid>
                        </Box>
                    </Box>
                </Grid>
            </Grid>
        </ThemeProvider>
    );
}