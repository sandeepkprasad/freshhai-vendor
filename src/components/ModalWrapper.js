import React, { useContext } from "react";
import { ProductsContext } from "../context/ProductsContext";

// React Icons
import { VscChromeClose } from "../utils/Icons";

const ModalWrapper = ({ children, heading = "", closeModal = "" }) => {
  const { isDarkMode } = useContext(ProductsContext);

  return (
    <div className="w-screen h-screen bg-neutral-black-dark/50 flex justify-center items-center fixed left-0 top-0 right-0 bottom-0 z-50">
      <div
        className={`w-full md:w-[20%] h-full md:h-[75%] ${
          isDarkMode ? "bg-neutral-black-dark" : "bg-neutral-white"
        } md:rounded md:shadow animate-slideTopToBottom`}
      >
        <div className="w-full h-[5%] bg-primary-blue-dark flex justify-between items-center md:rounded-t px-[2%]">
          <span className="font-semibold text-sm md:text-xs text-neutral-gray-light">
            {heading}
          </span>
          <button
            className="text-base text-neutral-gray-light"
            onClick={() => closeModal(false)}
          >
            <VscChromeClose />
          </button>
        </div>
        <div className="w-full h-[95%]">{children}</div>
      </div>
    </div>
  );
};

export default ModalWrapper;
