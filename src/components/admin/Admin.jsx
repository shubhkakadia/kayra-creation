import React, { useState } from "react";
import { useSelector } from "react-redux";
import Sidebar from "./Sidebar";
import Products from "./Products";
import Dashboard from "./Dashboard";

export default function Admin() {
  const [selected, setSelected] = useState("");

  function handleSelection(component) {
    setSelected(component);
  }
  const loggedInAdmin = useSelector((state) => state.loggedInAdmin?.data);
  return (
<div className="h-screen flex">
  <div className="flex-none w-64">
    <Sidebar
      admin={loggedInAdmin}
      selectedComponent={(e) => handleSelection(e)}
    />
  </div>
  <div className="flex-grow overflow-auto">
    {/* <h4 className="p-4">{selected}</h4> */}
    {selected === "Products" ? <Products /> : <Dashboard />}
  </div>
</div>

  );
}
