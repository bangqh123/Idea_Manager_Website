import { createContext, useReducer } from "react";
import { authReducer } from "../reducers/authReducer";
import { apiUrl, LOCAL_STORAGE_TOKEN_NAME } from "./constants";
import setAuthToken from "../utils/setAuthToken";
import axios from "axios";
import * as React from 'react'


export const AuthContext = createContext()

const AuthContextProvider = ({ children }) => {
    const [authState, dispatch] = useReducer(authReducer, {
        authLoading: true,
        isAuthenticated: false,
        user: '',
        role: '',
        Users: [],
        accessToken: ''
    })

    const loadUser = async () => {
        if (localStorage[LOCAL_STORAGE_TOKEN_NAME]) {
            setAuthToken(localStorage[LOCAL_STORAGE_TOKEN_NAME])
        }
        try {
            const response = await axios.get(`${apiUrl}/auth`)
            dispatch({
                type: 'SET_AUTH',
                payload: { user: response.data.userToken.username, role: response.data.userToken.role }
            })
        } catch (error) {
            localStorage.removeItem(LOCAL_STORAGE_TOKEN_NAME)
            setAuthToken(null)
            dispatch({
                type: 'SET_AUTH',
                payload: { isAuthenticated: false, user: null }
            })
        }
    }
    React.useEffect(() => loadUser(), [])

    //login
    const loginUser = async userForm => {
        try {
            const response = await axios.post(`${apiUrl}/auth/login`, userForm)
            console.log("data", response.data.data.email)
            if (response.data.token)
                localStorage.setItem(LOCAL_STORAGE_TOKEN_NAME, response.data.token)

            if (response.data.data.email) {
                dispatch({
                    type: 'SET_AUTH',
                    payload: { user: response.data.data.email, role: response.data.data.role }
                })
            }
            await loadUser()
            return response.data
        } catch (error) {
            if (error.response.data)
                return error.response.data
            else return { success: false, message: error.message }
        }
    }



    const getAllUser = async () => {
        try {
            const response = await axios.get(`${apiUrl}/auth/users`)
            console.log('data', response.data)
            if (response.data.users) {
                dispatch({ type: 'USERS_LOAD_SUCCESS', payload: response.data.users })
            }
            else {
                dispatch({ type: 'USERS_LOAD_FAIL' })
            }
        } catch (error) {
        }
    }

    const register = async (registerForm) => {
        const response = await axios.post(`${apiUrl}/auth/register`, registerForm)
        console.log("register response", response.data)
        return response.data

    }

    const deleteUser = async (id) => {
        const response = await axios.delete(`${apiUrl}/auth/user/` + id)
        console.log('response delete: ', response)
    }

    //context Data
    const authContextData = { authState, loginUser, getAllUser, register, deleteUser, loadUser }

    //return provider
    return (
        <AuthContext.Provider value={authContextData}>
            {children}
        </AuthContext.Provider>
    )
}
export default AuthContextProvider