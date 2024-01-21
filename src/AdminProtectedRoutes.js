import React from "react";
// import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import Cookies from "universal-cookie";
const cookies = new Cookies();

export default function AdminProtectedRoutes({ children }) {
  const token = cookies.get("ADMIN_TOKEN");
  // const loggedInAdmin = useSelector((state) => state.loggedInAdmin.data);
  return token ? children : <Navigate to="/Admin/Account/Login" replace/>;
}
