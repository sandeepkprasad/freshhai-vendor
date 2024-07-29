import React, { useContext } from "react";
import adminContext from "../../context/adminContext";

const Heading = ({ heading = "Heading" }) => {
  const { isDarkMode } = useContext(adminContext);

  return (
    <span
      className={`font-semibold text-base ${
        isDarkMode ? "text-neutral-gray-light" : "text-neutral-black-light"
      }`}
    >
      {heading}
    </span>
  );
};

export default Heading;
