import React from "react";
import { extractDeliveryTimeDate } from "../../utils/DateUtils";

// React Icons
import { MdDone, MdClose } from "../../utils/Icons";

// Components Imports
import RowText from "./RowText";
import RowTextStatus from "./RowTextStatus";

const LatestOrderRow = ({ data }) => {
  const { time, date } = extractDeliveryTimeDate(data?.actual_delivery_time);

  console.log("Latest Order : ", data);
  return (
    <div className="w-full h-fit flex justify-between items-center border-b py-[0.5%] active:scale-95 duration-300">
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
  );
};

export default LatestOrderRow;
