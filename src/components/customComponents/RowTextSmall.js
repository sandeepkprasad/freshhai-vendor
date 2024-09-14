import React, { useContext } from "react";
import { ProductsContext } from "../../context/ProductsContext";

const RowTextSmall = ({ title = "Title", value = "Value" }) => {
  const { isDarkMode } = useContext(ProductsContext);

  return (
    <p
      className={`font-normal text-xs ${
        isDarkMode ? "text-neutral-gray-light" : "text-neutral-black-dark"
      }`}
    >
      <span className="font-semibold text-xs text-neutral-gray-dark">
        {title} :{" "}
      </span>
      {value}
    </p>
  );
};

export default RowTextSmall;
