import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { Link as Mandar, useNavigate } from "react-router-dom";
import Theme from "../Theme/Theme";
import { ThemeProvider } from '@mui/material/styles';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

export default function Register({ usuarios, setUsuarios }) {

    const MySwal = withReactContent(Swal)

    const navigate = useNavigate();

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

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);



        let nuevoUsuario = {
            id: usuarios.length,
            nombre: data.get('nombre'),
            email: data.get('email'),
            password: data.get('password'),
            todos: [
                
            ]
        }

        if (!data.get('nombre') || !data.get('email') || !data.get('password')) {
            MySwal.fire({
                title: <p>Ingrese valores porfavor</p>,
                icon: 'warning',
                iconColor: '#774360',
                showCloseButton: true,
                confirmButtonColor: '#774360',
              })

        } else {
            setUsuarios(

                [...usuarios, nuevoUsuario],
                
                
            )
            navigate('/login', {replace: true})
            Toast.fire({
                icon: 'success',
                iconColor: '#774360',
                title: nuevoUsuario.nombre + ' ' + 'Registrado correctamente'
              })
        }

    };

    const reg = (event) => {
        navigate('/login')
    }

    const tema = Theme;

    return (
        <ThemeProvider theme={tema}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Registra una cuenta
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="nombre"
                            label="Nombre de Usuario"
                            name="nombre"
                            autoComplete="nombre"
                            autoFocus
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email"
                            name="email"
                            autoComplete="email"
                            autoFocus
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Contraseña"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Registrar
                        </Button>
                        <Grid container>
                            <Grid item xs>

                            </Grid>
                            <Grid item>
                                    <Link onClick={reg}>
                                        {"Ya tengo una cuenta"}
                                    </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    );
}