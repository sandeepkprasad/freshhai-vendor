import React, { useContext } from "react";
import { ProductsContext } from "../../context/ProductsContext";

const RowText = ({ text }) => {
  const { isDarkMode } = useContext(ProductsContext);

  return (
    <span
      className={`flex-1 text-start font-normal text-sm ${
        isDarkMode ? "text-neutral-gray-light" : "text-neutral-black-dark"
      } overflow-hidden`}
    >
      {text}
    </span>
  );
};

export default RowText;
