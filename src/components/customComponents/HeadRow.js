import React, { useContext } from "react";
import { ProductsContext } from "../../context/ProductsContext";

const HeadRow = ({ rowData }) => {
  const { isDarkMode } = useContext(ProductsContext);

  return (
    <div className="w-full h-fit flex justify-between items-center border-b pb-[1%]">
      {rowData?.map((text, index) => (
        <span
          className={`flex-1 text-start font-semibold text-base ${
            isDarkMode ? "text-neutral-gray-light" : "neutral-black-dark"
          }`}
          key={index}
        >
          {text}
        </span>
      ))}
    </div>
  );
};

export default HeadRow;
