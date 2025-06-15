//import useContext
import { useContext } from 'react';

//import context
import { AuthContext } from '../context/AuthContext';

//import react router dom
import { Routes, Route, Navigate } from "react-router";

//import view home
import Home from "../views/home/index.tsx";

//import view register
import Register from "../views/auth/register.tsx";

//import view login
import Login from "../views/auth/login.tsx";

import Dashboard from "../views/admin/dashboard/index.tsx";
import UsersIndex from '../views/admin/user/index.tsx';
import UserCreate from '../views/admin/user/create.tsx';

/**
 * AppRoutes component defines the routing structure of the application using React Router.
 * It conditionally renders pages based on authentication status:
 * - Redirects authenticated users from '/register' and '/login' to '/admin/dashboard'.
 * - Allows access to '/admin/dashboard' only if the user is authenticated, otherwise redirects to '/login'.
 * - Always allows access to the Home page at the '/' route.
 * Utilizes the AuthContext to determine if a user is authenticated.
 */

export default function AppRoutes() {

    // Menggunakan useContext untuk mendapatkan nilai dari AuthContext
    const auth = useContext(AuthContext);

    // Menggunakan optional chaining untuk menghindari error jika auth tidak ada
    const isAuthenticated = auth?.isAuthenticated ?? false;

    return (
        <Routes>
            {/* route "/" */}
            <Route path="/" element={<Home />} />

            {/* route "/register" */}
            <Route path="/register" element={
                isAuthenticated ? <Navigate to="/admin/dashboard" replace /> : <Register />
            } />

            {/* route "/login" */}
            <Route path="/login" element={
                isAuthenticated ? <Navigate to="/admin/dashboard" replace /> : <Login />
            } />

            {/* route "/admin/dashboard" */}
            <Route path="/admin/dashboard" element={
                isAuthenticated ? <Dashboard /> : <Navigate to="/login" replace />
            } />

             {/* route "/admin/users" */}
            <Route path="/admin/users" element={
                isAuthenticated ? <UsersIndex /> : <Navigate to="/login" replace />
            } />

            {/* route "/admin/users/create" */}
            <Route path="/admin/users/create" element={
                isAuthenticated ? <UserCreate /> : <Navigate to="/login" replace />
            } />
        </Routes>
    );
}