import { Button, Container, CssBaseline, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Fab, TextField } from '@mui/material'
import { Box, ThemeProvider } from '@mui/system'
import React, { useState } from 'react'
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import Theme from '../Theme/Theme';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import CommentIcon from '@mui/icons-material/Comment';
import AddIcon from '@mui/icons-material/Add';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';


const ToDoList = ({ usuarios, setUsuarios, idLogeado, setIdLogeado }) => {

    /* navb i */
    const [auth, setAuth] = React.useState(true);
    const [anchorEl, setAnchorEl] = React.useState(null);


    const handleChange = (event) => {
        setAuth(event.target.checked);
    };

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose1 = () => {
        setAnchorEl(null);
    };
    /* navb f */



    /* mis cosas */
    const tema = Theme;

    let usuarioBuscado = usuarios.find((user) => {
        return user.id === idLogeado
    })

    let [texto, setTexto] = useState('');
    let [usuarioS, setUsuarioS] = useState(usuarioBuscado);





    const crearLista = () => {

        let nuevoTodo = {

            id: 0,
            check: false,
            texto: texto,

        }
        if (!texto) {
            console.log('faltan datos')

        } else {
            let cantidad = (usuarioS.todos.length)
        
            setUsuarioS(
                {
                    id: usuarioS.id, 
                    nombre: usuarioS.nombre, 
                    email: usuarioS.email, 
                    password: usuarioS.password, 
                    todos: [...usuarioS.todos, { id: cantidad, check: false, texto: texto }]
                }
            )

            setOpen(false)
        }

    };
    /* mis cosasas/// */



    /* lista i */
    const [checked, setChecked] = React.useState([0]);

    const handleToggle = (value) => () => {
        const currentIndex = checked.indexOf(value);
        const newChecked = [...checked];

        if (currentIndex === -1) {
            newChecked.push(value);
        } else {
            newChecked.splice(currentIndex, 1);
        }

        setChecked(newChecked);
    };
    /* lista f */

    /* Dialog i */
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose2 = () => {
        setOpen(false);
    };
    /* Dialog f */
    return (
        <>
            <ThemeProvider theme={tema}>
                <AppBar position="static">
                    <Toolbar>

                        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                            To Do List de {usuarioS.nombre}
                        </Typography>
                        <div>
                            <IconButton
                                size="large"
                                aria-label="account of current user"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                onClick={handleMenu}
                                color="inherit"
                            >
                                <AccountCircle />
                            </IconButton>
                            <Menu
                                id="menu-appbar"
                                anchorEl={anchorEl}
                                anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                open={Boolean(anchorEl)}
                                onClose={handleClose1}
                            >
                                <MenuItem onClick={handleClose1}>Profile</MenuItem>
                                <MenuItem onClick={handleClose1}>My account</MenuItem>
                            </Menu>
                        </div>

                    </Toolbar>
                </AppBar>


                <Container maxWidth="xs">
                    <CssBaseline />
                    <Box
                        sx={{
                            marginTop: 5,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <List sx={{ width: '100%', maxWidth: 860, bgcolor: 'background.paper' }}>
                            {usuarioS.todos.map((value) => {

                                return (
                                    <ListItem
                                        key={value.id}
                                        secondaryAction={
                                            <IconButton edge="end" aria-label="comments">
                                                <DeleteOutlineOutlinedIcon />
                                            </IconButton>
                                        }
                                        disablePadding
                                    >
                                        <ListItemButton role={undefined} onClick={handleToggle(value)} dense>
                                            <ListItemIcon>
                                                <Checkbox
                                                    edge="start"
                                                    checked={checked.indexOf(value.check) === false}
                                                    tabIndex={-1}
                                                    disableRipple
                                                />
                                            </ListItemIcon>
                                            <ListItemText id={value.id} primary={`${value.texto}`} />
                                        </ListItemButton>
                                    </ListItem>
                                );
                            })}
                        </List>


                        <Fab color="primary" aria-label="add" onClick={handleClickOpen}>
                            <AddIcon />
                        </Fab>


                        <Dialog open={open} onClose={handleClose2}>
                            <DialogTitle>Añadir To Do</DialogTitle>
                            <DialogContent>
                                <DialogContentText>
                                    Aqui podras añadir a tu lista, un To Do.
                                </DialogContentText>
                                <TextField
                                    autoFocus
                                    margin="dense"
                                    id="texto"
                                    label="Texto"
                                    type="texto"
                                    fullWidth
                                    variant="standard"
                                    onChange={(event) => setTexto(event.target.value)}
                                />
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={handleClose2}>Cancelar</Button>
                                <Button onClick={crearLista}>Crear</Button>
                            </DialogActions>
                        </Dialog>


                    </Box>

                </Container>

            </ThemeProvider>
        </>
    )
}

export default ToDoList