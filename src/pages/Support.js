import React, { useContext } from "react";
import { ProductsContext } from "../context/ProductsContext";

// Components Imports
import DashboardWrapper from "../components/DashboardWrapper";
import Heading from "../components/customComponents/Heading";

const Support = () => {
  const { isDarkMode } = useContext(ProductsContext);

  return (
    <DashboardWrapper>
      {/** Large Screens */}
      <div className="w-full h-full hidden md:flex justify-between items-center pb-[0.5%] space-x-[2%] overflow-hidden">
        <div className="w-[80%] h-full flex flex-col justify-between items-center">
          <div className="w-full h-fit flex justify-start items-center">
            <Heading heading="Help & Support" />
          </div>
          <div
            className={`w-full h-[90%] ${
              isDarkMode
                ? "bg-neutral-black-dark border border-neutral-black-dark"
                : "bg-neutral-white border"
            } flex flex-col justify-between items-center rounded-lg shadow space-y-[1%] p-[1%]`}
          ></div>
        </div>
        <div className="w-[20%] h-full flex flex-col justify-between items-center"></div>
      </div>

      {/** Mobile Screens */}
      <div className="w-full h-fit md:hidden space-y-[2%]">
        <Heading heading="Help & Support" />
        <div
          className={`w-full h-[60vh] ${
            isDarkMode
              ? "bg-neutral-black-dark border border-neutral-black-dark"
              : "bg-neutral-white border"
          } flex flex-col justify-between items-center rounded-lg shadow space-y-[1%] p-[2%]`}
        ></div>
      </div>
    </DashboardWrapper>
  );
};

export default Support;
