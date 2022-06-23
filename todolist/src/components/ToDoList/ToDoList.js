import { Button, Container, CssBaseline, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Fab, TextField } from '@mui/material'
import { Box, ThemeProvider } from '@mui/system'
import React, { useEffect, useState } from 'react'
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
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';
import './ToDoList.css';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { useNavigate } from "react-router-dom";

const ToDoList = ({ usuarios, setUsuarios, idLogeado, setIdLogeado }) => {
    const navigate = useNavigate();
    let usuarioBuscado = usuarios.find((user) => {
        return user.id === idLogeado
    })
    let [usuarioS, setUsuarioS] = useState(usuarioBuscado);

    let listaLocal = JSON.parse(localStorage.getItem("Lista" + "=" + usuarioS.email));
    if (listaLocal === null) {
        listaLocal = [];
    }
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

    const MySwal = withReactContent(Swal)

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

    

    let [texto, setTexto] = useState('');
    
    let [lista, setLista] = useState(listaLocal)

    let[editTodo, setEditTodo] = useState(null);
    let[editText, setEditText] = useState('');

     useEffect(() => {
        localStorage.setItem('Lista' + "=" + usuarioS.email, JSON.stringify(lista))
    }, [lista])  



    const crearLista = (event) => {
        event.preventDefault();

        let nuevoTodo = {
            id: lista.length,
            texto: texto,
            completado: false

        }
        if (!texto) {
            console.log('faltan datos')

        } else {
            setLista(
            [...lista, nuevoTodo],
            )
            setTexto(
                ''
            )
            setOpen(false)
        }
    };

    function eliminarTodo(id){
        const actualizarTodo = [...lista].filter((todo) => todo.id !== id)
        MySwal.fire({
            title: <p>¿Seguro que quieres eliminar?</p>,
            icon: 'question',
            iconColor: '#774360',
            showCloseButton: true,
            confirmButtonColor: '#774360',
            cancelButtonColor: '#B25068',
            confirmButtonText: 'Si quiero',
            showCancelButton: true,
            cancelButtonText: 'Cancelar',
          }).then((result) => {
            if(result.isConfirmed){
                Toast.fire({
                    icon: 'success',
                    iconColor: '#774360',
                    title: 'ToDo Eliminado'
                  })
                setLista(
                    actualizarTodo
                    )
            }
          })
        
        
    }

    function chekearChange(id){
        const actualizarCheck = [...lista].map((todo)=>{
            if(todo.id === id){
                todo.completado = !todo.completado
            }
            return todo
        })

        setLista(
            actualizarCheck
            )
    }

    function editarTodo(){
        const actualizarTodo = [...lista].map((todo)=>{
            if(todo.id === editTodo){
                todo.texto = editText
            }
            return todo
        })
        setLista(
            actualizarTodo
            )
        
    }

    function handleClickOpened(id,text){
        setOpened(true);
        setEditTodo(id)
        setEditText(text)
    }

    function cerrarS(){
        navigate('/', {replace: true})
        localStorage.setItem('IdLogeado','false')
        localStorage.setItem('Logeado','null')

        Toast.fire({
            icon: 'success',
            iconColor: '#774360',
            title: usuarioS.nombre + ' ' +'Cerro Sesión'
          })
    }

    /* mis cosasas/// */



    /* Dialog i */
    const [open, setOpen] = React.useState(false);
    const [opened, setOpened] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose2 = () => {
        setOpen(false);
    };


    const handleClose3 = () => {
        setOpened(false);
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
                                <MenuItem >{usuarioS.nombre}</MenuItem>
                                <MenuItem >{usuarioS.email}</MenuItem>
                                <MenuItem onClick={cerrarS}>Cerrar Sesión</MenuItem>
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
                        <List sx={{ width: '600px', maxWidth: 1000, bgcolor: 'background.paper' }}>
                            {lista.map((value) => {

                                return (
                                    <ListItem
                                        key={value.id}
                                        secondaryAction={
                                            <>
                                            <IconButton edge="end" aria-label="comments" onClick={() => eliminarTodo(value.id)} >
                                                <DeleteOutlineOutlinedIcon />
                                            </IconButton> 
                                            <IconButton edge="end" aria-label="comments" onClick={() => handleClickOpened(value.id, value.texto)} >
                                                <ModeEditOutlineOutlinedIcon />
                                            </IconButton> 
                                            </>
                                            
                                        }

                                        
                                        disablePadding
                                    >
                                        
                                        <ListItemButton role={undefined}dense>
                                            <ListItemIcon>
                                                <Checkbox
                                                   edge="start"
                                                   checked={value.completado}
                                                   disableRipple
                                                   onChange={() => chekearChange(value.id)}
                                                />
                                            </ListItemIcon>
                                            <ListItemText Textid={value.id} className={value.completado ? ('tachado') : (null) }  primary={`${value.texto}`} />
                    
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

                        <Dialog open={opened} onClose={handleClose3}>
                            <DialogTitle>Editar To Do</DialogTitle>
                            <DialogContent>
                                <DialogContentText>
                                    Aqui podras editar tu lista, un To Do.
                                </DialogContentText>
                                <TextField
                                    autoFocus
                                    margin="dense"
                                    id="texto"
                                    label="Texto"
                                    type="texto"
                                    fullWidth
                                    variant="standard"
                                    onChange={(event) => setEditText(event.target.value)}
                                    value={editText}
                                />
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={handleClose3}>Cancelar</Button>
                                <Button onClick={editarTodo}>Editar</Button>
                            </DialogActions>
                        </Dialog>


                    </Box>

                </Container>

            </ThemeProvider>
        </>
    )
}

export default ToDoList