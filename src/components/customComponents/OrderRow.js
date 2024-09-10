import React, { useContext } from "react";
import { OrdersContext } from "../../context/OrdersContext";
import { extractDeliveryTimeDate } from "../../utils/DateUtils";

// React Icons
import { MdDone, MdClose } from "../../utils/Icons";

// Components Imports
import RowText from "./RowText";

const OrderRow = ({ data, isClickable = false }) => {
  const { handleOrderModal } = useContext(OrdersContext);

  const { time, date } = extractDeliveryTimeDate(data?.actual_delivery_time);

  const handleClick = () => {
    if (isClickable) {
      handleOrderModal(data?.id);
    }
  };

  const clickableClass = isClickable ? "cursor-pointer active:scale-95" : "";

  return (
    <div
      className={`w-full h-fit flex justify-between items-center border-b py-[0.5%] space-x-[5%] md:space-x-0 duration-300 ${clickableClass}`}
      onClick={handleClick}
    >
      <RowText text={data?.delivery_address?.name} />
      <RowText
        text={`${data?.order_items[0]?.name} & ${
          data?.order_items?.length - 1
        } more`}
      />
      <RowText text={`₹${data?.net_amount}`} />
      <div
        className={`flex flex-1 justify-start items-center space-x-[2%] font-semibold text-xs ${
          data?.payment_status === "Paid"
            ? "text-primary-green-dark"
            : "text-secondary-red-dark"
        } overflow-hidden`}
      >
        {data?.payment_status === "Paid" ? <MdDone /> : <MdClose />}
        <span>{data?.payment_status}</span>
      </div>
      <RowText text={`${time}, ${date}`} />
      <RowText text={data?.order_status} />
    </div>
  );
};

export default OrderRow;
