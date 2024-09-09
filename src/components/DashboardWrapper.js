import React, { useContext } from "react";
import { ProductsContext } from "../context/ProductsContext";

// Components Imports
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

const DashboardWrapper = ({ children }) => {
  const { isDarkMode } = useContext(ProductsContext);
  return (
    <div
      className={`w-screen h-screen ${
        isDarkMode ? "bg-neutral-black-light" : "bg-neutral-gray-light"
      } px-[2%] py-[20%] md:pl-[15%] md:pr-[2%] md:pt-[9%] md:pb-[1%] duration-300 overflow-y-scroll md:overflow-hidden`}
    >
      <Navbar />
      <Sidebar />
      {children}
    </div>
  );
};

export default DashboardWrapper;
