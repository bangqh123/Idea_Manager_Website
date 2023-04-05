import DashboardIcon from '@mui/icons-material/Dashboard';
import DesktopWindowsIcon from '@mui/icons-material/DesktopWindows';
import CreateIcon from '@mui/icons-material/Create';
import PersonIcon from '@mui/icons-material/Person';
import TipsAndUpdatesIcon from '@mui/icons-material/TipsAndUpdates';
import SettingsIcon from '@mui/icons-material/Settings';
// import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import React, { useState } from 'react'

export const mainNavbarItems = [

    {

        id: 1,
        icon: <DashboardIcon />,
        label: 'Dashboard',
        route: 'dashboard',
        roles: ["Admin", "QA", "Coordinator"]
    },
    {
        id: 2,
        icon: <DesktopWindowsIcon />,
        label: 'View Ideas',
        route: 'view-ideas',
        roles: ["Admin", "QA", "Coordinator", "Staff"]
    },
    {
        id: 3,
        icon: <CreateIcon />,
        label: 'Write Ideas',
        route: 'write-idea',
        roles: ["Admin", "QA", "Coordinator", "Staff"]
    },

    {
        id: 4,
        icon: <PersonIcon />,
        label: 'Management Users',
        route: 'management-users',
        roles: ["Admin"]
    },
    {
        id: 5,
        icon: <TipsAndUpdatesIcon />,
        label: 'Management Ideas',
        route: 'management-ideas',
        roles: ["QA", "Coordinator"]
    },
    {
        id: 6,
        icon: <SettingsIcon />,
        label: 'Department',
        route: 'departments',
        roles: ["QA"]
    },
    {
        id: 7,
        icon: <SettingsIcon />,
        label: 'Categories',
        route: 'categories',
        roles: ["QA", "Coordinator"]
    },
]