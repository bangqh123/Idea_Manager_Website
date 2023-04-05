import { Paper, Box } from "@mui/material";
import React, { useContext, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { DepartmentContext } from '../contexts/DepartmentContext'
import { CategoryContext } from "../contexts/CategoryContext";
import { BlogContext } from "../contexts/BlogContext";


import Typography from "@mui/material/Typography";

const Dashboard = () => {

  const { authState: { Users }, getAllUser } = useContext(AuthContext)
  React.useEffect(() => getAllUser(), [])

  const { departSate: { departments }, getAllDepartments } = useContext(DepartmentContext)

  React.useEffect(() => getAllDepartments(), [])

  const { cateSate: { categories }, getAllCategories } = useContext(CategoryContext)
  React.useEffect(() => getAllCategories(), [])
  const { BlogState: { blogs }, getAllBlogs } = useContext(BlogContext)
  React.useEffect(() => getAllBlogs(), [])




  return (
    <>
      <Paper elevation={8} sx={{ height: "auto", marginTop: 1 }}>
        <Typography variant="h4">Data Analysis</Typography>
        <Box>
          <Box
            sx={{
              borderTop: 2,
              borderBottom: 2,
              height: 199,
              background: "#1976D2",
              alignItems: "center",
            }}
            display={"flex"}
          >
            <Box
              sx={{
                width: "25%",
                borderRight: 2,
                textAlign: "center",
                color: "white",
              }}
            >
              <Typography variant="h4" mb={2}>
                Users
              </Typography>
              <Typography variant="h4">{Users.length}</Typography>
            </Box>
            <Box
              sx={{
                width: "25%",
                borderRight: 2,
                textAlign: "center",
                color: "white",
              }}
            >
              <Typography variant="h4" mb={2}>
                Departments
              </Typography>
              <Typography variant="h4"> {departments.length}</Typography>
            </Box>
            <Box
              sx={{
                width: "25%",
                borderRight: 2,
                textAlign: "center",
                color: "white",
              }}
            >
              <Typography variant="h4" mb={2}>
                Categories
              </Typography>
              <Typography variant="h4">{categories.length}</Typography>
            </Box>
            <Box sx={{ width: "25%", textAlign: "center", color: "white" }}>
              <Typography variant="h4" mb={2}>
                Blogs
              </Typography>
              <Typography variant="h4">{blogs.length}</Typography>
            </Box>
          </Box>
        </Box>
      </Paper>

    </>
  );
};

export default Dashboard;
