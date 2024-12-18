import React from "react";

const RowTextStatus = ({ text }) => {
  return (
    <span
      className={`flex-1 text-start font-semibold text-xs ${
        text === "Pending"
          ? "text-secondary-orange-dark"
          : text === "Placed"
          ? "text-primary-blue-dark"
          : text === "Processing"
          ? "text-primary-blue-dark"
          : text === "Shipped"
          ? "text-primary-green-dark"
          : text === "Out for Delivery"
          ? "text-primary-green-dark"
          : text === "Delivered"
          ? "text-primary-green-dark"
          : text === "Completed"
          ? "text-primary-green-dark"
          : text === "Cancelled"
          ? "text-secondary-red-dark"
          : text === "Returned"
          ? "text-secondary-orange-dark"
          : text === "Refunded"
          ? "text-primary-green-dark"
          : text === "Failed"
          ? "text-secondary-red-dark"
          : text === "Available"
          ? "text-primary-green-dark"
          : text === "Unavailable"
          ? "text-secondary-red-dark"
          : text === "Busy"
          ? "text-secondary-orange-dark"
          : text === "Suspended"
          ? "text-neutral-gray-light"
          : null
      } overflow-hidden`}
    >
      {text}
    </span>
  );
};

export default RowTextStatus;
