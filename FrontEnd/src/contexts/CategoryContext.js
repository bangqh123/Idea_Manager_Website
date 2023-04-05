import React from 'react'
import { createContext, useReducer } from "react";
import { categoryReducer } from '../reducers/categoryReducer';
import axios from "axios";
import { apiUrl } from './constants';


export const CategoryContext = createContext()
const CategoryContextProvider = ({ children }) => {
    const [cateSate, dispatch] = useReducer(categoryReducer, {
        categories: [],
        categoriesLoading: true
    })

    //Get all departments
    const getAllCategories = async () => {
        try {
            const response = await axios.get(`${apiUrl}/cate/getAllCategory`)
            console.log('data', response.data.categories)
            if (response.data.categories) {
                console.log("data", response.data.categories)
                dispatch({ type: 'CATEGORIES_LOAD_SUCCESS', payload: response.data.categories })
            }
        } catch (error) {
            dispatch({ type: 'CATEGORIES_LOAD_FAIL' })
        }
    }

    const addNewCate = async (cateForm, image) => {
        try {
            const response = await axios.post(`${apiUrl}/cate/addCate`, cateForm, image)
            console.log("data", response.data)
            if (response.data)
                dispatch({ type: 'ADD_NEW_CATEGORY', payload: response.data })
            return response.data
        } catch (error) {
            if (error.response.data)
                return error.response.data
            else return { success: false, message: "Server Error" }
        }
    }


    const updateCate = async (_id, cateForm) => {
        const response = await axios.put(`${apiUrl}/cate/updateCategory/` + _id, cateForm)
        console.log("update", response)
    }

    const deleteCate = async (_id) => {
        const response = await axios.delete(`${apiUrl}/cate/deleteCategory/` + _id)
        console.log("delete res", response)
    }
    const CategoryContextData = { cateSate, getAllCategories, addNewCate, updateCate, deleteCate }

    return (
        <CategoryContext.Provider value={CategoryContextData} >
            {children}
        </CategoryContext.Provider>
    )
}

export default CategoryContextProvider