import React, { useContext } from "react";
import { ProductsContext } from "../../context/ProductsContext";

const Heading = ({ heading = "Heading" }) => {
  const { isDarkMode } = useContext(ProductsContext);

  return (
    <span
      className={`font-semibold text-sm md:text-xs ${
        isDarkMode ? "text-neutral-gray-light" : "text-neutral-black-light"
      }`}
    >
      {heading}
    </span>
  );
};

export default Heading;
