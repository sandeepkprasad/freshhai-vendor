import React from "react";
import { extractDeliveryTimeDate } from "../../utils/DateUtils";

// Components Imports
import RowText from "./RowText";
import RowTextStatus from "./RowTextStatus";

const LatestOrderRow = ({ data }) => {
  const orderDeliveryTimeDate = extractDeliveryTimeDate(data.deliveryDate);

  return (
    <div className="w-full h-fit flex justify-between items-center border-b py-[0.5%] active:scale-95 duration-300">
      <RowText text={data?.orderId} />
      <RowText text={data?.customerName} />
      <RowText text={"₹ " + data?.totalPrice} />
      <RowText
        text={orderDeliveryTimeDate?.time + ", " + orderDeliveryTimeDate?.date}
      />
      <RowTextStatus text={data?.status} />
    </div>
  );
};

export default LatestOrderRow;
