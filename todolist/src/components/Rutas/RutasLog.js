import React from 'react'
import { Route, Routes } from 'react-router-dom'
import ToDoList from '../ToDoList/ToDoList'

const RutasLog = ({usuarios, setUsuarios, idLogeado, setIdLogeado}) => {
    return (
        <div>
            <Route path="/todo" element={
                <ToDoList
                    usuarios={usuarios}
                    setUsuarios={setUsuarios}
                    idLogeado={idLogeado}
                    setIdLogeado={setIdLogeado}
                />} />
        </div>
    )
}

export default RutasLog