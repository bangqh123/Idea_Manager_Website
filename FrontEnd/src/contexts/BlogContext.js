import React, { useReducer, createContext } from "react"
import { blogReducer } from '../reducers/blogReducer';
//import { apiUrl, LOCAL_STORAGE_TOKEN_NAME } from "./constants";
import axios from "axios";
import { apiUrl, LOCAL_STORAGE_TOKEN_NAME } from './constants';


export const BlogContext = createContext()
const BlogContextProvider = ({ children }) => {
    const [BlogState, dispatch] = useReducer(blogReducer, {
        blogs: [],
        blog: '',
        blogs_by_cate: []
    })

    //Get all blogs
    const getAllBlogs = async () => {
        try {

            const response = await axios.get(`${apiUrl}/blogs`)
            if (response.data) {
                console.log("data luu payload", response.data.data.blogs)
                dispatch({ type: 'BLOGS_LOAD_SUCCESS', payload: response.data.data.blogs })
            }
        } catch (error) {
            dispatch({ type: 'BLOGS_LOAD_FAIL' })
        }
    }

    //add a new blog
    const addNewBlog = async BlogForm => {
        try {
            let token = localStorage.getItem(LOCAL_STORAGE_TOKEN_NAME)
            console.log(token)
            const response = await axios.post(`${apiUrl}/blogs/create`, BlogForm, {

                headers: {
                    "Authorization": token
                }
            })
            console.log("data a new blog", response)
            if (response)
                dispatch({ type: 'ADD_NEW_BLOG', payload: response })
            return response
        } catch (error) {
            if (error.response.data)
                return error.response.data
            else return { success: false, message: "Server Error" }
        }
    }

    //get a blog by category id
    const getBlogByCateId = async (_id) => {
        const response = await axios.get(`${apiUrl}`)
        console.log("blog by cate: ", response)
    }

    const DeleteBlog = async (_id) => {
        let token = localStorage.getItem(LOCAL_STORAGE_TOKEN_NAME)
        const response = await axios.delete(`${apiUrl}/blogs/` + _id + `/delete`, {

            headers: {
                "Authorization": token
            }
        })
        console.log("delete blog: ", response.data)
        return response.data
    }

    const BlogContextData = { BlogState, getAllBlogs, addNewBlog, getBlogByCateId, DeleteBlog }

    return (
        <BlogContext.Provider value={BlogContextData} >
            {children}
        </BlogContext.Provider>
    )
}

export default BlogContextProvider