import React, { useContext } from "react";
import adminContext from "../../context/adminContext";

const OrderText = ({ text1 = "", text2 = "" }) => {
  const { isDarkMode } = useContext(adminContext);

  return (
    <p
      className={`font-normal text-sm ${
        isDarkMode ? "text-neutral-gray-light" : "text-neutral-black-dark"
      }`}
    >
      {text1} <span className="font-medium text-base">{text2}</span>
    </p>
  );
};

export default OrderText;
