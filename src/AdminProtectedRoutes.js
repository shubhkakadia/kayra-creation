import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import Cookies from "universal-cookie";
// import jwt from "jsonwebtoken";

const cookies = new Cookies();

export default function AdminProtectedRoutes({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const token = cookies.get("ADMIN_TOKEN");
  // useEffect(() => {
    

  //   if (token) {
  //     try {
  //       // Verify the JWT token
  //       const decodedToken = jwt.verify(token, process.env.REACT_APP_JWT_SECRET_KEY);

  //       console.log(decodedToken)
  //       // Check if the token belongs to an admin user
  //       if (decodedToken.role === "admin") {
  //         setIsAuthenticated(true);
  //       }
  //     } catch (error) {
  //       // Token verification failed
  //       console.error("Invalid token:", error);
  //     }
  //   }
  // }, []);

  return token ? children : <Navigate to="/Admin/Account/Login" replace />;
}