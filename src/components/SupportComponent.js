import React, { useContext } from "react";
import { ProductsContext } from "../context/ProductsContext";

// React Icons
import { MdPhone, MdEmail, MdWhatsapp } from "../utils/Icons";

const SupportComponent = () => {
  const { isDarkMode } = useContext(ProductsContext);

  return (
    <div className="w-full h-fit flex justify-end items-center">
      <div className="w-[95%] md:w-[75%] h-fit flex flex-col justify-center items-start space-y-[2%] md:space-y-[1%]">
        <div className="w-full h-fit flex justify-start items-center space-x-[4%] md:space-x-[2%]">
          <MdPhone className="text-3xl text-primary-blue-light" />
          <span
            className={`font-medium text-2xl ${
              isDarkMode ? "text-neutral-gray-light" : "text-neutral-black-dark"
            }`}
          >
            12345 67890
          </span>
        </div>
        <div className="w-full h-fit flex justify-start items-center space-x-[4%] md:space-x-[2%]">
          <MdEmail
            className="text-3xl text-primary-blue-medium"
          />
          <span
            className={`font-medium text-2xl ${
              isDarkMode ? "text-neutral-gray-light" : "text-neutral-black-dark"
            }`}
          >
            support@freshhai.com
          </span>
        </div>
        <div className="w-full h-fit flex justify-start items-center space-x-[4%] md:space-x-[2%]">
          <MdWhatsapp
            className="text-3xl text-primary-green-light"
          />
          <span
            className={`font-medium text-2xl ${
              isDarkMode ? "text-neutral-gray-light" : "text-neutral-black-dark"
            }`}
          >
            12345 67890
          </span>
        </div>
      </div>
    </div>
  );
};

export default SupportComponent;
