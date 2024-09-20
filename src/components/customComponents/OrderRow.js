import React, { useContext } from "react";
import { ProductsContext } from "../../context/ProductsContext";
import { OrdersContext } from "../../context/OrdersContext";
import { extractDeliveryTimeDate } from "../../utils/DateUtils";

// React Icons
import { MdDone, MdClose, FaCircle } from "../../utils/Icons";

// Components Imports
import RowText from "./RowText";
import RowTextSmall from "./RowTextSmall";
import RowTextStatus from "./RowTextStatus";

const OrderRow = ({ data, isClickable = false }) => {
  const { isDarkMode } = useContext(ProductsContext);
  const { handleOrderModal } = useContext(OrdersContext);

  const { time, date } = extractDeliveryTimeDate(data?.actual_delivery_time);

  const handleClick = () => {
    if (isClickable) {
      handleOrderModal(data?.id);
    }
  };

  const clickableClass = isClickable ? "cursor-pointer active:scale-95" : "";

  return (
    <>
      {/** Large Screens */}
      <div
        className={`w-full h-fit hidden md:flex justify-between items-center border-b py-[0.5%] duration-300 ${clickableClass}`}
        onClick={handleClick}
      >
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
              : "text-secondary-orange-dark"
          } overflow-hidden`}
        >
          {data?.payment_status === "Paid" ? <MdDone /> : <MdClose />}
          <span>{data?.payment_status}</span>
        </div>
        <RowText text={`${time}, ${date}`} />
        <RowTextStatus text={data?.order_status} />
        {data?.order_status === "Placed" ? (
          <span className="flex-1 text-start text-[8px] text-secondary-red-dark overflow-hidden">
            <FaCircle />
          </span>
        ) : (
          <span className="flex-1 text-start font-normal text-xs text-neutral-gray-light overflow-hidden"></span>
        )}
      </div>

      {/** Small Screens */}
      <div
        className={`w-full h-fit border-b py-[1%] duration-300 md:hidden ${clickableClass} relative`}
        onClick={handleClick}
      >
        <RowTextSmall title="Name" value={data?.delivery_address?.name} />
        <RowTextSmall
          title="Product"
          value={`${data?.order_items[0]?.name} & ${
            data?.order_items?.length - 1
          } more`}
        />
        <RowTextSmall title="Total" value={`₹${data?.net_amount}`} />
        <p
          className={`font-normal text-xs ${
            data?.payment_status === "Paid"
              ? "text-primary-green-dark"
              : "text-secondary-orange-dark"
          }`}
        >
          <span className="font-semibold text-xs text-neutral-gray-dark">
            Payment :{" "}
          </span>
          {data?.payment_status}
        </p>
        <RowTextSmall title="Delivery" value={`${time}, ${date}`} />
        <p
          className={`font-normal text-xs ${
            isDarkMode ? "text-neutral-gray-light" : "text-neutral-black-dark"
          }`}
        >
          <span className="font-semibold text-xs text-neutral-gray-dark">
            Status :{" "}
          </span>
          <RowTextStatus text={data?.order_status} />
        </p>
        {data?.order_status === "Placed" && (
          <span className="text-xs text-secondary-red-dark absolute top-3 right-0">
            <FaCircle />
          </span>
        )}
      </div>
    </>
  );
};

export default OrderRow;
