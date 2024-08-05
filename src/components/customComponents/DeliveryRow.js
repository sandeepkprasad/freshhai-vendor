import React, { useContext } from "react";

// Components Imports
import RowText from "./RowText";
import RowTextStatus from "./RowTextStatus";

const CustomerRow = ({ data }) => {
  return (
    <div className="w-full h-fit flex justify-between items-center border-b py-[0.5%]">
      <RowText text={data?.name} />
      <RowText text={data?.contact?.phone} />
      <RowText text={data?.vehicle} />
      <RowText text={data?.licenseNumber} />
      <RowTextStatus text={data?.availability} />
    </div>
  );
};

export default CustomerRow;
