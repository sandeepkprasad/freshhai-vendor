import React, { useContext, useEffect } from "react";
import { ProductsContext } from "../context/ProductsContext";

const NotificationPopup = () => {
  const { notificationData, handleNotification } = useContext(ProductsContext);

  useEffect(() => {
    if (notificationData?.flag) {
      const timer = setTimeout(() => {
        handleNotification(false, "", "");
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [notificationData?.flag, handleNotification]);

  if (!notificationData?.flag) return null;

  const getBackgroundColor = () => {
    switch (notificationData?.type) {
      case "green":
        return "bg-primary-green-dark";
      case "yellow":
        return "bg-secondary-orange-dark";
      case "red":
        return "bg-secondary-red-dark";
      default:
        return "";
    }
  };

  return (
    <div
      className="w-screen h-[10%] md:h-[12.5%] flex justify-center items-center p-[2%] md:p-[1%] fixed left-0 top-0 right-0"
      style={{ zIndex: 2147483647 }}
    >
      <div
        className={`w-full md:w-[33%] h-full ${getBackgroundColor()} flex justify-center items-center rounded-lg shadow p-[1%] animate-slideTopToBottom`}
      >
        <p className="font-normal text-sm text-neutral-white">
          {notificationData?.text}
        </p>
      </div>
    </div>
  );
};

export default NotificationPopup;
