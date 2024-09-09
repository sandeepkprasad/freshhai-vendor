import React, { useContext } from "react";
import { UsersContext } from "../../context/UsersContext";

// Components Imports
import RowText from "./RowText";

const CustomerRow = ({ data, isClickable = false }) => {
  const { handleUserModal } = useContext(UsersContext);

  return (
    <>
      {isClickable && (
        <div
          className="w-full h-fit flex justify-between items-center border-b py-[0.5%] space-x-[5%] md:space-x-0 cursor-pointer active:scale-95 duration-300"
          onClick={() => handleUserModal(data?.id)}
        >
          <RowText text={data?.basicInfo?.fullName} />
          <RowText text={data?.basicInfo?.mobileNumber} />
          <RowText text={data?.basicInfo?.email} />
          <RowText text={data?.addresses[0]?.pincode} />
        </div>
      )}

      {!isClickable && (
        <div className="w-full h-fit flex justify-between items-center border-b py-[0.5%] space-x-[5%] md:space-x-0">
          <RowText text={data?.basicInfo?.fullName} />
          <RowText text={data?.basicInfo?.mobileNumber} />
          <RowText text={data?.basicInfo?.email} />
          <RowText text={data?.addresses[0]?.pincode} />
        </div>
      )}
    </>
  );
};

export default CustomerRow;
