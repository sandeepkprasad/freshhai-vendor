import React, { useContext } from "react";
import adminContext from "../../context/adminContext";

const RowText = ({ text }) => {
  const { isDarkMode } = useContext(adminContext);

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
