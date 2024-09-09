import React, { useContext } from "react";
import { OrdersContext } from "../../context/OrdersContext";
import { extractDeliveryTimeDate } from "../../utils/DateUtils";

// Components Imports
import RowText from "./RowText";

const OrderRow = ({ data, isClickable = false }) => {
  const { handleOrderModal } = useContext(OrdersContext);

  const orderDeliveryTimeDate = extractDeliveryTimeDate(
    data.actual_delivery_time
  );

  return (
    <>
      {isClickable && (
        <div
          className="w-full h-fit flex justify-between items-center border-b py-[0.5%] space-x-[5%] md:space-x-0 cursor-pointer active:scale-95 duration-300"
          onClick={() => handleOrderModal(data.id)}
        >
          <RowText text={data?.delivery_address?.name} />
          <RowText
            text={
              data?.order_items[0]?.name +
              " & " +
              (data?.order_items?.length - 1) +
              " more"
            }
          />
          <RowText text={"₹" + data.net_amount} />
          <RowText text={data.payment_status} />
          <RowText
            text={
              orderDeliveryTimeDate.time + ", " + orderDeliveryTimeDate.date
            }
          />
          <RowText text={data?.order_status} />
        </div>
      )}

      {!isClickable && (
        <div className="w-full h-fit flex justify-between items-center border-b py-[0.5%] space-x-[5%] md:space-x-0">
          <RowText text={data?.delivery_address?.name} />
          <RowText
            text={
              data?.order_items[0]?.name +
              " & " +
              (data?.order_items?.length - 1) +
              " more"
            }
          />
          <RowText text={"₹" + data.net_amount} />
          <RowText text={data.payment_status} />
          <RowText
            text={
              orderDeliveryTimeDate.time + ", " + orderDeliveryTimeDate.date
            }
          />
          <RowText text={data?.order_status} />
        </div>
      )}
    </>
  );
};

export default OrderRow;
