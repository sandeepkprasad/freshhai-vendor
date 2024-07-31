import React, { useContext } from "react";
import adminContext from "../../context/adminContext";

// Components Imports
import RowText from "./RowText";

const CustomerRow = ({ data, isClickable = false }) => {
  const { isDarkMode, handleUserModal } = useContext(adminContext);

  return (
    <>
      {isClickable && (
        <div
          className="w-full h-fit flex justify-between items-center border-b py-[0.5%] cursor-pointer active:scale-95 duration-300"
          onClick={() => handleUserModal(data?.userId)}
        >
          <RowText text={data?.name} />
          <RowText text={data.phone} />
          <RowText text={data.email} />
          <span
            className={`flex-1 text-start font-normal text-sm ${
              isDarkMode ? "text-neutral-gray-light" : "text-neutral-black-dark"
            } overflow-hidden`}
          >
            {data.isBlocked ? "Blocked" : "Active"}
          </span>
        </div>
      )}

      {!isClickable && (
        <div className="w-full h-fit flex justify-between items-center border-b py-[0.5%]">
          <RowText text={data?.name} />
          <RowText text={data.phone} />
          <RowText text={data.email} />
          <span
            className={`flex-1 text-start font-normal text-sm ${
              isDarkMode ? "text-neutral-gray-light" : "text-neutral-black-dark"
            } overflow-hidden`}
          >
            {data.isBlocked ? "Blocked" : "Active"}
          </span>
        </div>
      )}
    </>
  );
};

export default CustomerRow;
