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
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'


export default function Login({ usuarios, setIdLogeado, setLogeado }) {

    const MySwal = withReactContent(Swal)

    const navigate = useNavigate();
    let [Email, setEmail] = useState('');
    let [Password, setPassword] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        

        /* Encontrar el usuario en el State */
        let usuarioBuscado = usuarios.find((user) => {
            return user.email === Email

        })

        if (usuarioBuscado === undefined) {
            MySwal.fire({
                title: <p>Email inexistente</p>,
                icon: 'error',
                iconColor: '#774360',
                showCloseButton: true,
                confirmButtonColor: '#774360',
              })
        }

        const Toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: (toast) => {
              toast.addEventListener('mouseenter', Swal.stopTimer)
              toast.addEventListener('mouseleave', Swal.resumeTimer)
            }
          })


        /* Que existan datos */
        if (!Password|| !Email) {
            MySwal.fire({
                title: <p>Ingrese valores porfavor</p>,
                icon: 'warning',
                iconColor: '#774360',
                showCloseButton: true,
                confirmButtonColor: '#774360',
              })
            /* Si es diferente el State del login */
        } else if (Email  !== usuarioBuscado.email ) {
            MySwal.fire({
                title: <p>Email no coincide</p>,
                icon: 'warning',
                iconColor: '#774360',
                showCloseButton: true,
                confirmButtonColor: '#774360',
              })
            /* Si son iguales pasa */

        } else if (Password  !== usuarioBuscado.password) {
            MySwal.fire({
                title: <p>Password no coincide</p>,
                icon: 'warning',
                iconColor: '#774360',
                showCloseButton: true,
                confirmButtonColor: '#774360',
              })
        } else {

            setIdLogeado(usuarioBuscado.id)
            setLogeado(true)
            navigate('/todo', {replace: true})
            Toast.fire({
                icon: 'success',
                iconColor: '#774360',
                title: usuarioBuscado.nombre + ' ' +'Logeado correctamente'
              })

        }

        

    };
    const loge = (event) => {
        navigate('/registro')
    }



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
                            Inicia Sesi??n
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
                                    Iniciar Sesi??n
                                </Button>

                            <Grid container>
                                <Grid item xs>

                                </Grid>
                                <Grid item>
                                        <Link onClick={loge} >
                                            {"Aun no tengo Cuenta"}
                                        </Link>
                                </Grid>
                            </Grid>
                        </Box>
                    </Box>
                </Grid>
            </Grid>
        </ThemeProvider>
    );
}