import React from "react";
import { useSelector } from "react-redux";
// import Loader from "./Loader";

export default function Shop() {

  const selected_shop = useSelector((state) => state.selectedShop.selected);
  console.log(selected_shop)

  return (
    <div>
      <h1 className="text-center text-[30px]">{selected_shop}</h1>
      {/* <Loader /> */}
    </div>
  );
}
