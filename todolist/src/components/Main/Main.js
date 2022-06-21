import { useEffect, useState } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useNavigate
} from "react-router-dom";
import Login from "../Login/Login";
import Register from "../Register/Register";
import ToDoList from "../ToDoList/ToDoList";

function Main() {



  let usuariosIniciales = JSON.parse(localStorage.getItem("Usuarios"));
  if(usuariosIniciales === null){
    usuariosIniciales = [];
  }

  let logeadoIdInicial = JSON.parse(localStorage.getItem("IdLogeado"));
  

  let logeadoInicial = JSON.parse(localStorage.getItem("Logeado"));
  if(logeadoInicial === null){
    logeadoInicial = false;
  }

  const [usuarios, setUsuarios] = useState(usuariosIniciales)
  const [idLogeado, setIdLogeado] = useState(logeadoIdInicial)
  const [logeado, setLogeado] = useState(logeadoInicial)
  
  useEffect(() => {
    localStorage.setItem('Usuarios', JSON.stringify(usuarios))
  }, [usuarios])

  useEffect(() => {
    localStorage.setItem('Logeado', JSON.stringify(logeado))
  }, [logeado])

  useEffect(() => {
    localStorage.setItem('IdLogeado', JSON.stringify(idLogeado))
  }, [idLogeado])


  return (
    <>
      <BrowserRouter>

        <Routes>
          <Route path="/" element={
            <Login
              usuarios={usuarios}
              setIdLogeado={setIdLogeado}
              setLogeado={setLogeado}
            />
          } />
          <Route path="/registro" element={
            <Register
              setUsuarios={setUsuarios}
              usuarios={usuarios}
            />} />
          <Route path="/todo" element={
            <ToDoList
            usuarios={usuarios}
            setUsuarios={setUsuarios}
            idLogeado={idLogeado}
            setIdLogeado={setIdLogeado}
            />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>

      </BrowserRouter>
    </>
  );


}

export default Main;
