import React from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from './Navbar/Navbar'

const Dashboard = () => {
    const navigate = useNavigate()
    const Logout = () => {
        navigate('/login')
    }
    return (
        <>
            <Navbar />
        </>
    )
}

export default Dashboard