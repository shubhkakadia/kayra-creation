// Import necessary dependencies
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Loader from "../Loader";
import { adminLogin } from "../../state/actions/admin_login";
import Cookies from "universal-cookie";

export default function AdminLogin() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // State variables for storing input values
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const admin = useSelector((state) => state.loggedInAdmin);
  const cookies = new Cookies();
  const token = cookies.get("ADMIN_TOKEN");

  console.log(admin)
  useEffect(() => {
    redirect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Perform authentication logic here
    console.log("Username:", username);
    console.log("Password:", password);

    const adminObj = {
      username: username,
      password: password,
    };
    dispatch(adminLogin(adminObj));
    setUsername("");
    setPassword("");
    // Add your authentication logic here (e.g., check against a backend)
  };

  function redirect() {
    if (token) {
      navigate("/admin/account/dashboard");
    }
  }

  return (
    <div>
      <div className="min-h-screen flex items-center justify-center">
        <div className="bg-white p-8 shadow-md rounded-md w-full sm:w-96">
          <h2 className="text-2xl font-bold mb-4">Admin Login</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="username" className="block text-gray-600">
                Username:
              </label>
              <input
                type="text"
                id="username"
                className="mt-1 p-2 w-full border rounded-md"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="password" className="block text-gray-600">
                Password:
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  className="mt-1 p-2 w-full border rounded-md"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  className="absolute top-1/2 right-2 transform -translate-y-1/2"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
            </div>
            <button
              type="submit"
              className="bg-blue-500 text-white p-2 rounded-md w-full hover:bg-blue-600"
            >
              Login
            </button>
            {admin.load ? (
              <div className="p-4">
                <Loader />
              </div>
            ) : (
              <></>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}
