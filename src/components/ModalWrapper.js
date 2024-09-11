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
        } md:rounded-lg md:shadow animate-slideTopToBottom`}
      >
        <div className="w-full h-[5%] bg-primary-blue-dark hidden md:flex justify-end items-center rounded-t-lg p-[0.5%]">
          <button
            className="text-xl text-neutral-gray-light"
            onClick={() => closeModal(false)}
          >
            <VscChromeClose />
          </button>
        </div>
        <div className="w-full h-[5%] bg-primary-blue-dark flex justify-start items-center p-[2%] md:hidden">
          <button
            className="text-xl text-neutral-gray-light"
            onClick={() => closeModal(false)}
          >
            <FaArrowLeft />
          </button>
        </div>
        <div className="w-full h-[95%] p-[2%] md:p-[1%]">{children}</div>
      </div>
    </div>
  );
};

export default ModalWrapper;
