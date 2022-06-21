import React from 'react'
import { Navigate } from 'react-router-dom'

const RutasPublic = ({children, logeado}) => {
  return logeado ? <Navigate to='/' /> : children
}

export default RutasPublic