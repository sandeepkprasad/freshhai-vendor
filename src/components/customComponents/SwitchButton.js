import React, { useContext } from "react";
import { ProductsContext } from "../../context/ProductsContext";

const SwitchButton = ({
  buttonText1 = "Button 1",
  buttonText2 = "Button 2",
  data,
  setData,
}) => {
  const { isDarkMode } = useContext(ProductsContext);

  return (
    <div
      className={`w-fit h-fit ${
        isDarkMode ? "bg-neutral-black-dark" : "bg-neutral-white"
      } rounded shadow space-x-1`}
    >
      <button
        className={`font-normal text-xs ${
          isDarkMode && data === 0
            ? "bg-primary-blue-dark text-neutral-gray-light"
            : "text-neutral-black-light"
        } ${
          !isDarkMode && data === 0
            ? "bg-primary-blue-dark text-neutral-gray-light"
            : "text-neutral-black-light"
        }`}
        onClick={() => setData(0)}
      >
        {buttonText1}
      </button>
      <button
        className={`font-normal text-xs ${
          isDarkMode ? "text-neutral-gray-light" : "text-neutral-black-light"
        }`}
        onClick={() => setData(1)}
      >
        {buttonText2}
      </button>
    </div>
  );
};

export default SwitchButton;
