import React from "react";
import { Navigate } from "react-router-dom";
import Cookies from "universal-cookie";
const cookies = new Cookies();

export default function CustomerProtectedRoutes({ children }) {
  const token = cookies.get("Customer_TOKEN");
  return token ? children : <Navigate to="/Customer/Account/Login" replace/>;
}
