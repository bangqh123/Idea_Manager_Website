import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { LOCAL_STORAGE_TOKEN_NAME } from "../contexts/constants";

const useAuth = () => {
    const user = localStorage.getItem(LOCAL_STORAGE_TOKEN_NAME)
    if (user) {
        return true
    }
    else {
        return true
    }
}

const ProtectedRoutes = () => {
    const auth = useAuth()
    return auth ? <Outlet /> : <Navigate to='/login' />
}

export default ProtectedRoutes