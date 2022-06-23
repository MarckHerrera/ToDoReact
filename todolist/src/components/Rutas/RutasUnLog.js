import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Login from '../Login/Login'
import Register from '../Register/Register'

const RutasUnLog = ({usuarios, setUsuarios}) => {
  return (
    <div>
        <Routes>
          <Route path="/registro" element={
            <Register
              setUsuarios={setUsuarios}
              usuarios={usuarios}
            />} />
        </Routes>
    </div>
  )
}

export default RutasUnLog