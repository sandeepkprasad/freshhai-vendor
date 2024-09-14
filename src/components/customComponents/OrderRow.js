import React, { useContext } from "react";
import { ProductsContext } from "../../context/ProductsContext";
import { OrdersContext } from "../../context/OrdersContext";
import { extractDeliveryTimeDate } from "../../utils/DateUtils";

// React Icons
import { MdDone, MdClose, SlArrowRight } from "../../utils/Icons";

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
        className={`w-full h-fit hidden md:flex justify-between items-center border-b py-[0.5%] space-x-[5%] md:space-x-0 duration-300 ${clickableClass}`}
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
              : "text-secondary-orange-dark"
          } overflow-hidden`}
        >
          {data?.payment_status === "Paid" ? <MdDone /> : <MdClose />}
          <span>{data?.payment_status}</span>
        </div>
        <RowText text={`${time}, ${date}`} />
        <RowTextStatus text={data?.order_status} />
      </div>

      {/** Small Screens */}
      <div
        className={`w-full h-fit flex md:hidden justify-between items-center border-b py-[2%] duration-300 ${clickableClass}`}
        onClick={handleClick}
      >
        <div className="w-[90%] h-fit">
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

export default OrderRow;
