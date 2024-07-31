import React, { useContext } from "react";
import adminContext from "../../context/adminContext";

// Components Imports
import RowText from "./RowText";
import RowTextStatus from "./RowTextStatus";

const OrderRow = ({ data, isClickable = false }) => {
  const { handleOrderModal } = useContext(adminContext);

  return (
    <>
      {isClickable && (
        <div
          className="w-full h-fit flex justify-between items-center border-b py-[0.5%] cursor-pointer active:scale-95 duration-300"
          onClick={() => handleOrderModal(data.orderId)}
        >
          <RowText text={data?.items[0]?.name + " + " + data?.items?.length} />
          <RowText text={data.orderId} />
          <RowText text={data.customerName} />
          <RowText text={"₹ " + data.totalPrice} />
          <RowText text={data.paymentMethod} />
          <RowTextStatus text={data?.status} />
        </div>
      )}

      {!isClickable && (
        <div className="w-full h-fit flex justify-between items-center border-b py-[0.5%]">
          <RowText text={data?.items[0]?.name + " + " + data?.items?.length} />
          <RowText text={data.orderId} />
          <RowText text={data.customerName} />
          <RowText text={"₹ " + data.totalPrice} />
          <RowText text={data.paymentMethod} />
          <RowTextStatus text={data?.status} />
        </div>
      )}
    </>
  );
};

export default OrderRow;
