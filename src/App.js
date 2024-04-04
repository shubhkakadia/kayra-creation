import React from 'react'

import { Route, Routes, useLocation } from "react-router";
import Dashboard from "./components/Dashboard";
import Navbar from "./components/Navbar/Navbar.jsx";
import Footer from "./components/Footer/Footer.jsx";
import Shop from "./components/Shop.jsx";
import PageNotFound from "./components/PageNotFound.jsx";
import CustomerLogin from "./components/CustomerLogin.jsx";
import CustomerSignup from "./components/CustomerSignup.jsx";
import AdminLogin from "./components/admin/Login.jsx";
import AdminDashboard from "./components/admin/Admin.jsx";
import AdminProtectedRoutes from "./AdminProtectedRoutes.js";
import Product from "./components/product.jsx";

function App() {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith("/admin");
  return (
    <section className="App bg-[#f5f5f7] bg-cover md:bg-top">
      <link
        href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css"
        rel="stylesheet"
        integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN"
        crossOrigin="anonymous"
      ></link>

      {/* <Navbar />
      <Routes>
        <Route path="customer/account/login" element={<CustomerLogin />} />
        <Route path="customer/account/signup" element={<CustomerSignup />} />
        <Route path="/admin/account/login" element={<AdminLogin />} />
        <Route
          path="/Admin/Account/dashboard"
          element={
            <AdminProtectedRoutes>
              <AdminDashboard />
            </AdminProtectedRoutes>
          }
        />
        <Route path="/" element={<Dashboard />} />
        <Route path="/Jewellery/Shop/:product" element={<Shop />} />
        <Route path="/Shop/Diamonds" element={<Shop />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
      <Footer /> */}

      {!isAdminRoute && <Navbar />}
      <Routes>
        <Route path="customer/account/login" element={<CustomerLogin />} />
        <Route path="customer/account/signup" element={<CustomerSignup />} />
        <Route path="/admin/account/login" element={<AdminLogin />} />
        <Route
          path="/admin/account/dashboard"
          element={
            <AdminProtectedRoutes>
              <AdminDashboard />
            </AdminProtectedRoutes>
          }
        />
        <Route path="/" element={<Dashboard />} />
        <Route path="/Jewellery/Shop/:category" element={<Shop />} />
        <Route path="/Jewellery/:category/:productNo" element={<Product />} />
        <Route path="/Shop/Diamonds" element={<Shop />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
      {!isAdminRoute && <Footer />}
    </section>
  );
}

export default App;
