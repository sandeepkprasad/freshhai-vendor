import React, { useContext } from "react";
import { ProductsContext } from "../../context/ProductsContext";
import { UsersContext } from "../../context/UsersContext";

// React Icons
import { SlArrowRight } from "../../utils/Icons";

// Components Imports
import RowText from "./RowText";
import RowTextSmall from "./RowTextSmall";

const CustomerRow = ({ data, isClickable = false }) => {
  const { isDarkMode } = useContext(ProductsContext);
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
        className={`w-full h-fit flex md:hidden justify-between items-center border-b py-[1%] duration-300 ${clickableClass}`}
        onClick={handleClick}
      >
        <div className="w-[90%] h-fit">
          <RowTextSmall title="Full Name" value={data?.basicInfo?.fullName} />
          <RowTextSmall title="Mobile No." value={data?.basicInfo?.mobileNumber} />
          <RowTextSmall title="Email" value={data?.basicInfo?.email} />
          <RowTextSmall
            title="Postal Code"
            value={data?.addresses[0]?.pincode}
          />
        </div>
        <SlArrowRight
          className={`text-2xl ${
            isDarkMode ? "text-neutral-gray-light" : "text-neutral-black-dark"
          }`}
        />
      </div>
    </>
  );
};

export default CustomerRow;
