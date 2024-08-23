import React, { useContext } from "react";
import { OrdersContext } from "../../context/OrdersContext";
import { extractDeliveryTimeDate } from "../../utils/DateUtils";

// Components Imports
import RowText from "./RowText";
import RowTextStatus from "./RowTextStatus";

const OrderRow = ({ data, isClickable = false }) => {
  const { handleOrderModal } = useContext(OrdersContext);

  const orderDeliveryTimeDate = extractDeliveryTimeDate(data.deliveryDate);

  return (
    <>
      {isClickable && (
        <div
          className="w-full h-fit flex justify-between items-center border-b py-[0.5%] cursor-pointer active:scale-95 duration-300"
          onClick={() => handleOrderModal(data.orderId)}
        >
          <RowText text={data.orderId} />
          <RowText text={data?.items[0]?.name + " + " + data?.items?.length} />
          <RowText text={"₹ " + data.totalPrice} />
          <RowText text={data.paymentMethod} />
          <RowText
            text={
              orderDeliveryTimeDate.time + ", " + orderDeliveryTimeDate.date
            }
          />
          <RowTextStatus text={data?.status} />
        </div>
      )}

      {!isClickable && (
        <div className="w-full h-fit flex justify-between items-center border-b py-[0.5%]">
          <RowText text={data.orderId} />
          <RowText text={data?.items[0]?.name + " + " + data?.items?.length} />
          <RowText text={"₹ " + data.totalPrice} />
          <RowText text={data.paymentMethod} />
          <RowText
            text={
              orderDeliveryTimeDate.time + ", " + orderDeliveryTimeDate.date
            }
          />
          <RowTextStatus text={data?.status} />
        </div>
      )}
    </>
  );
};

export default OrderRow;
