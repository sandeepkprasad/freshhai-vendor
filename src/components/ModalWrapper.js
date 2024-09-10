import React, { useContext } from "react";
import { ProductsContext } from "../context/ProductsContext";

// React Icons
import { VscChromeClose, FaArrowLeft } from "../utils/Icons";

const ModalWrapper = ({ children, closeModal }) => {
  const { isDarkMode } = useContext(ProductsContext);

  return (
    <div className="w-screen h-screen bg-neutral-black-dark/50 flex justify-center items-center fixed left-0 top-0 right-0 bottom-0 z-50">
      <div
        className={`w-full md:w-[50%] h-full md:h-[75%] ${
          isDarkMode ? "bg-neutral-black-dark" : "bg-neutral-white"
        } md:rounded-lg md:shadow p-[2%] md:p-[0.5%] animate-slideTopToBottom`}
      >
        <div className="w-full h-[5%] hidden md:flex justify-end items-center">
          <button
            className={`text-xl ${
              isDarkMode ? "text-neutral-gray-light" : "text-neutral-gray-dark"
            }`}
            onClick={() => closeModal(false)}
          >
            <VscChromeClose />
          </button>
        </div>
        <div className="w-full h-[5%] flex justify-start items-center md:hidden">
          <button
            className={`text-xl ${
              isDarkMode ? "text-neutral-gray-light" : "text-neutral-gray-dark"
            }`}
            onClick={() => closeModal(false)}
          >
            <FaArrowLeft />
          </button>
        </div>
        <div className="w-full h-[95%]">{children}</div>
      </div>
    </div>
  );
};

export default ModalWrapper;
