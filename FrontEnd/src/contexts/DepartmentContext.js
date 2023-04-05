import React from 'react'
import { createContext, useReducer } from "react";
import { departmentReducer } from '../reducers/departmentReducer';
//import { apiUrl, LOCAL_STORAGE_TOKEN_NAME } from "./constants";
import axios from "axios";
import { apiUrl } from './constants';


export const DepartmentContext = createContext()
const DepartmentContextProvider = ({ children }) => {
    const [departSate, dispatch] = useReducer(departmentReducer, {
        departments: [],
        one_department: '',
        departmentsLoading: true,

    })

    //Get all departments
    const getAllDepartments = async () => {
        try {
            const response = await axios.get(`${apiUrl}/depart/departments`)
            if (response.data.allDepartments) {
                console.log("data luu payload", response.data.allDepartments)
                dispatch({ type: 'DEPARTMENT_LOAD_SUCCESS', payload: response.data.allDepartments })
            }
        } catch (error) {
            dispatch({ type: 'DEPARTMENT_LOAD_FAIL' })
        }
    }

    const addNewDepartment = async departForm => {
        try {
            const response = await axios.post(`${apiUrl}/depart/addDepart`, departForm)
            console.log("data", response)
            if (response)
                dispatch({ type: 'ADD_NEW_DEPARTMENT', payload: response })
            return response
        } catch (error) {
            if (error.response.data)
                return error.response.data
            else return { success: false, message: "Server Error" }
        }
    }

    const update_Department = async (_id, departForm) => {
        const response = await axios.put(`${apiUrl}/depart/` + _id, departForm)
        console.log("data get", response)
        return response
    }


    const deleteDepart = async (_id) => {
        const response = await axios.delete(`${apiUrl}/depart/` + _id)
        console.log("data", response)
        return response
    }

    const getDepartmentById = async (_id) => {
        try {
            const response = await axios.get(`${apiUrl}/depart/` + _id)
            console.log('data depart get: ', response.data.department)
            if (response.data.department) {
                dispatch({ type: 'GET_AN_DEPARTMENT', payload: response.data.department })
            }
        }
        catch (error) {
            dispatch({ type: 'GET_DEPARTMENT_FAIL' })
        }
    }


    const DepartmentContextData = { departSate, getAllDepartments, getDepartmentById, addNewDepartment, update_Department, deleteDepart }

    return (
        <DepartmentContext.Provider value={DepartmentContextData} >
            {children}
        </DepartmentContext.Provider>
    )
}

export default DepartmentContextProvider