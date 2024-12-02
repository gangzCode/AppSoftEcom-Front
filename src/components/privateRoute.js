import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const PrivateRoute = ({ children }) => {
    const { user } = useAuth();
    const token = localStorage.getItem("user");
  
    if (!user && !token) {
      return <Navigate to="/signin" replace />;
    }
  
    return children;
  };
  

export default PrivateRoute;