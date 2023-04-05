import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import App from "./App";
import HomePage from "./components/Home";
import ViewIdeas from "./components/ViewIdeas";
import WriteIdea from "./components/WriteIdea";
import ManagementUsers from "./components/ManagementUsers/ManagementsUsers";
import ManagementIdeas from "./components/ManagementIdeas";
import Dashboard from "./components/Dashboard";

//ContextProvider
import AuthContextProvider from "./contexts/AuthContext";
import CategoryContextProvider from "./contexts/CategoryContext";
import DepartmentContextProvider from "./contexts/DepartmentContext";
import BlogContextProvider from "./contexts/BlogContext";

//departments
import DepartmentsManagement from "./components/DepartmentsManagement/DepartmentsManagement";
import AddNewDepart from "./components/DepartmentsManagement/AddNewDepart";

//categories
import CategoriesManagement from "./components/CategoriesManagement/CategoriesManagement";
import AddNewCategory from "./components/CategoriesManagement/AddNewCategory";

//page not found
import PageNotFound from "./pages/404Page";

//routeProtected
import ProtectedRoutes from "./components/ProtectedRoutes";

//users
import AddNewUser from './components/ManagementUsers/AddNewUser'
import CommentContextProvider from "./contexts/CommentContext";




ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthContextProvider>
        <DepartmentContextProvider>
          <CategoryContextProvider>
            <BlogContextProvider>
              <CommentContextProvider>
                <Routes>
                  <Route path="/" element={<App />} />
                  {/* <Route path="login" element={<Login />} /> */}
                  <Route path="/" element={<ProtectedRoutes />}>
                    <Route path="home" element={<HomePage />}>
                      <Route
                        path="/home"
                        element={<Navigate replace to="dashboard" />}
                      />
                      {/*dashboard */}
                      <Route path="dashboard" element={<Dashboard />} />

                      {/* ideas */}
                      <Route path="view-ideas" element={<ViewIdeas />} />
                      <Route path="write-idea" element={<WriteIdea />} />
                      <Route path="management-ideas" element={<ManagementIdeas />} />

                      {/* users */}
                      <Route path="management-users" element={<ManagementUsers />} />
                      <Route path="register-user" element={<AddNewUser />} />


                      {/* department */}
                      <Route path="departments" element={<DepartmentsManagement />} />
                      <Route path="new-department" element={<AddNewDepart />} />

                      {/* categories */}
                      <Route path="categories" element={<CategoriesManagement />} />
                      <Route path="new-category" element={<AddNewCategory />} />

                    </Route>
                  </Route>
                  <Route path="*" element={<PageNotFound />} />
                </Routes>
              </CommentContextProvider>
            </BlogContextProvider>
          </CategoryContextProvider>
        </DepartmentContextProvider>
      </AuthContextProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);
