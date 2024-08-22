import React, { useContext } from "react";
import adminContext from "../../context/adminContext";

// Components Imports
import RowText from "./RowText";
import RowTextStatus from "./RowTextStatus";

const CustomerRow = ({ data, isClickable = false }) => {
  const { handleDeliveryPartnerModal } = useContext(adminContext);

  return (
    <>
      {isClickable && (
        <div
          className="w-full h-fit flex justify-between items-center border-b py-[0.5%] cursor-pointer active:scale-95 duration-300"
          onClick={() => handleDeliveryPartnerModal(data)}
        >
          <RowText text={data?.name} />
          <RowText text={data?.contact?.phone} />
          <RowText text={data?.vehicle} />
          <RowText text={data?.licenseNumber} />
          <RowText text={data?.status} />
          <RowTextStatus text={data?.availability} />
        </div>
      )}

      {!isClickable && (
        <div className="w-full h-fit flex justify-between items-center border-b py-[0.5%]">
          <RowText text={data?.name} />
          <RowText text={data?.contact?.phone} />
          <RowText text={data?.vehicle} />
          <RowText text={data?.licenseNumber} />
          <RowText text={data?.status} />
          <RowTextStatus text={data?.availability} />
        </div>
      )}
    </>
  );
};

export default CustomerRow;
