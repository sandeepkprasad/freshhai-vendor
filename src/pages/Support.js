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
            } flex flex-col justify-center items-center rounded-lg shadow space-y-[1%] p-[1%]`}
          >
            <p
              className={`font-medium text-2xl ${
                isDarkMode
                  ? "text-neutral-gray-light"
                  : "text-neutral-black-dark"
              }`}
            >
              <span className="font-normal text-base">Contact Number :</span>{" "}
              12345 67890
            </p>
            <p
              className={`font-medium text-2xl ${
                isDarkMode
                  ? "text-neutral-gray-light"
                  : "text-neutral-black-dark"
              }`}
            >
              <span className="font-normal text-base">Email :</span>{" "}
              support@freshhai.com
            </p>
            <p
              className={`font-medium text-2xl ${
                isDarkMode
                  ? "text-neutral-gray-light"
                  : "text-neutral-black-dark"
              }`}
            >
              <span className="font-normal text-base">WhatsApp :</span>{" "}
              12345 67890
            </p>
          </div>
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
          } flex flex-col justify-center items-center rounded-lg shadow space-y-[1%] p-[2%]`}
        >
          <p
            className={`font-medium text-2xl ${
              isDarkMode ? "text-neutral-gray-light" : "text-neutral-black-dark"
            }`}
          >
            <span className="font-normal text-base">Contact Number :</span>{" "}
            12345 67890
          </p>
          <p
            className={`font-medium text-2xl ${
              isDarkMode ? "text-neutral-gray-light" : "text-neutral-black-dark"
            }`}
          >
            <span className="font-normal text-base">Email :</span>{" "}
            support@freshhai.com
          </p>
          <p
            className={`font-medium text-2xl ${
              isDarkMode ? "text-neutral-gray-light" : "text-neutral-black-dark"
            }`}
          >
            <span className="font-normal text-base">WhatsApp :</span> 12345
            67890
          </p>
        </div>
      </div>
    </DashboardWrapper>
  );
};

export default Support;
