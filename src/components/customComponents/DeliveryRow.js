import React, { useContext } from "react";
import { ProductsContext } from "../../context/ProductsContext";
import { DeliveryContext } from "../../context/DeliveryContext";

// React Icons
import { SlArrowRight } from "../../utils/Icons";

// Components Imports
import RowText from "./RowText";
import RowTextSmall from "./RowTextSmall";

const CustomerRow = ({ data, isClickable = false }) => {
  const { isDarkMode } = useContext(ProductsContext);
  const { handleDeliveryPartnerModal } = useContext(DeliveryContext);

  const handleClick = () => {
    if (isClickable) handleDeliveryPartnerModal(data?.id);
  };

  const clickableClass = isClickable ? "cursor-pointer active:scale-95" : "";

  return (
    <>
      {/** Large Screens */}
      <div
        className={`w-full h-fit hidden md:flex justify-between items-center border-b py-[0.5%] ${
          isClickable ? "cursor-pointer active:scale-95 duration-300" : ""
        }`}
        onClick={handleClick}
      >
        <RowText text={data?.name} />
        <RowText text={data?.phone_number} />
        <RowText text={data?.vehicle_details?.vehicle_number} />
        <RowText text={data?.vehicle_details?.license_number} />
        <span
          className={`flex-1 text-start font-semibold text-xs ${
            data?.status?.active
              ? "text-primary-green-dark"
              : "text-secondary-red-dark"
          } overflow-hidden`}
        >
          {data?.status?.active ? "Active" : "Inactive"}
        </span>
        <span
          className={`flex-1 text-start font-semibold text-xs ${
            data?.availability
              ? "text-primary-green-dark"
              : "text-secondary-red-dark"
          } overflow-hidden`}
        >
          {data?.availability ? "Available" : "Unavailable"}
        </span>
      </div>

      {/** Mobile Screens */}
      <div
        className={`w-full h-fit flex md:hidden justify-between items-center border-b py-[1%] duration-300 ${clickableClass}`}
        onClick={handleClick}
      >
        <div className="w-[90%] h-fit">
          <RowTextSmall title="Name" value={data?.name} />
          <RowTextSmall title="Mobile No." value={data?.phone_number} />
          <RowTextSmall
            title="Vehicle No."
            value={data?.vehicle_details?.vehicle_number}
          />
          <RowTextSmall
            title="License No."
            value={data?.vehicle_details?.license_number}
          />
          <p
            className={`font-normal text-xs ${
              data?.status?.active
                ? "text-primary-green-dark"
                : "text-secondary-red-dark"
            }`}
          >
            <span className="font-semibold text-xs text-neutral-gray-dark">
              Status :{" "}
            </span>
            {data?.status?.active ? "Active" : "Inactive"}
          </p>
          <p
            className={`font-normal text-xs ${
              data?.availability
                ? "text-primary-green-dark"
                : "text-secondary-red-dark"
            }`}
          >
            <span className="font-semibold text-xs text-neutral-gray-dark">
              Availability :{" "}
            </span>
            {data?.availability ? "Available" : "Unavailable"}
          </p>
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
