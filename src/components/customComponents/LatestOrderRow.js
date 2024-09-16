import React, { useContext } from "react";
import { ProductsContext } from "../../context/ProductsContext";
import { extractDeliveryTimeDate } from "../../utils/DateUtils";

// React Icons
import { MdDone, MdClose, SlArrowRight } from "../../utils/Icons";

// Components Imports
import RowText from "./RowText";
import RowTextStatus from "./RowTextStatus";
import RowTextSmall from "./RowTextSmall";

const LatestOrderRow = ({ data }) => {
  const { isDarkMode } = useContext(ProductsContext);
  const { time, date } = extractDeliveryTimeDate(data?.actual_delivery_time);

  return (
    <>
      {/** Large Screens */}
      <div className="w-full h-fit hidden md:flex justify-between items-center border-b py-[0.5%] active:scale-95 duration-300">
        <RowText text={data?.delivery_address?.name} />
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

      {/** Mobile Screens */}
      <div className="w-full h-fit border-b py-[1%] md:hidden">
        <RowTextSmall title="Name" value={data?.delivery_address?.name} />
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
        <p className="font-normal text-xs">
          <span className="font-semibold text-xs text-neutral-gray-dark">
            Status :{" "}
          </span>
          <RowTextStatus text={data?.order_status} />
        </p>
      </div>
    </>
  );
};

export default LatestOrderRow;
