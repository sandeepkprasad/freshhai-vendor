import React, { useContext } from "react";
import { ProductsContext } from "../../context/ProductsContext";

const OrderText = ({ text1 = "", text2 = "" }) => {
  const { isDarkMode } = useContext(ProductsContext);

  return (
    <p
      className={`font-normal text-xs ${
        isDarkMode ? "text-neutral-gray-light" : "text-neutral-black-dark"
      }`}
    >
      {text1} <span className="font-medium text-base">{text2}</span>
    </p>
  );
};

export default OrderText;
