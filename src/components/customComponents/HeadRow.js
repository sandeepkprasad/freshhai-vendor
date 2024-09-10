import React from "react";

const HeadRow = ({ rowData }) => {
  return (
    <div className="w-full h-fit flex justify-between items-center border-b pb-[1%] space-x-[5%] md:space-x-0">
      {rowData?.map((text, index) => (
        <span
          className="flex-1 text-start font-semibold text-xs text-neutral-gray-dark"
          key={index}
        >
          {text}
        </span>
      ))}
    </div>
  );
};

export default HeadRow;
