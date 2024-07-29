import React, { useContext } from "react";
import adminContext from "../../context/adminContext";

const HeadText = ({ text }) => {
  const { isDarkMode } = useContext(adminContext);

  return (
    <span
      className={`flex-1 text-start font-semibold text-base ${
        isDarkMode ? "text-neutral-gray-light" : "neutral-black-dark"
      }`}
    >
      {text}
    </span>
  );
};

export default HeadText;
