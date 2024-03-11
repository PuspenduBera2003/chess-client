import React from 'react'
import { useSelector } from "react-redux"
import { Navigate, useLocation } from "react-router-dom"

const ProtectedRoute = ({ children }) => {
    const isAuthenticated = useSelector(state => state.Auth.isAuthenticated);
    let location = useLocation();

    if (!isAuthenticated) {
        return <Navigate to="/auth/signin" state={{ from: location }} replace />
    }
    return children

};

export default ProtectedRoute;