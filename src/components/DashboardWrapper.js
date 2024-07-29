import React, { useContext } from "react";
import adminContext from "../context/adminContext";

// Components Imports
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

const DashboardWrapper = ({ children }) => {
  const { isDarkMode } = useContext(adminContext);
  return (
    <div
      className={`w-screen h-screen ${
        isDarkMode ? "bg-neutral-black-light" : "bg-neutral-gray-light"
      } pl-[15%] pr-[2%] pt-[9%] pb-[1%] duration-300 overflow-hidden`}
    >
      <Navbar />
      <Sidebar />
      {children}
    </div>
  );
};

export default DashboardWrapper;
