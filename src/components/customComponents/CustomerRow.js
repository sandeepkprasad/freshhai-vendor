import React, { useContext } from "react";
import { UsersContext } from "../../context/UsersContext";

// Components Imports
import RowText from "./RowText";
import RowTextSmall from "./RowTextSmall";

const CustomerRow = ({ data, isClickable = false }) => {
  const { handleUserModal } = useContext(UsersContext);

  const handleClick = () => {
    if (isClickable) {
      handleUserModal(data?.id);
    }
  };

  const clickableClass = isClickable ? "cursor-pointer active:scale-95" : "";

  return (
    <>
      {/** Large Screens */}
      <div
        className={`w-full h-fit hidden md:flex justify-between items-center border-b py-[0.5%]
      ${isClickable ? "cursor-pointer active:scale-95 duration-300" : ""}`}
        onClick={handleClick}
      >
        <RowText text={data?.basicInfo?.fullName} />
        <RowText text={data?.basicInfo?.mobileNumber} />
        <RowText text={data?.basicInfo?.email} />
        <RowText text={data?.addresses[0]?.pincode} />
      </div>

      {/** Mobile Screens */}
      <div
        className={`w-full h-fit md:hidden border-b py-[1%] duration-300 ${clickableClass}`}
        onClick={handleClick}
      >
        <RowTextSmall title="Full Name" value={data?.basicInfo?.fullName} />
        <RowTextSmall
          title="Mobile No."
          value={data?.basicInfo?.mobileNumber}
        />
        <RowTextSmall title="Email" value={data?.basicInfo?.email} />
        <RowTextSmall title="Postal Code" value={data?.addresses[0]?.pincode} />
      </div>
    </>
  );
};

export default CustomerRow;
