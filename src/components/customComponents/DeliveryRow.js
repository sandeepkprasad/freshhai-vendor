import React, { useContext } from "react";
import { DeliveryContext } from "../../context/DeliveryContext";

// Components Imports
import RowText from "./RowText";

const CustomerRow = ({ data, isClickable = false }) => {
  const { handleDeliveryPartnerModal } = useContext(DeliveryContext);

  const handleClick = () => {
    if (isClickable) handleDeliveryPartnerModal(data?.id);
  };

  return (
    <div
      className={`w-full h-fit flex justify-between items-center border-b py-[0.5%] space-x-[2%] md:space-x-0 ${
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
  );
};

export default CustomerRow;
