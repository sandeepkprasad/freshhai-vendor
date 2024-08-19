import React, { useContext, useEffect } from "react";
import adminContext from "../context/adminContext";

const NotificationPopup = () => {
  const { notificationData, handleNotification } = useContext(adminContext);

  useEffect(() => {
    if (notificationData.flag) {
      const timer = setTimeout(() => {
        handleNotification(false, "", "");
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [notificationData.flag, handleNotification]);

  if (!notificationData.flag) return null;

  const getBackgroundColor = () => {
    switch (notificationData.type) {
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
      className="w-screen h-[15%] flex justify-center items-center py-[1%] fixed left-0 top-0 right-0"
      style={{ zIndex: 2147483647 }}
    >
      <div
        className={`w-[33%] h-full ${getBackgroundColor()} flex justify-center items-center rounded-2xl shadow-md p-[1%] animate-slideTopToBottom`}
      >
        <p className="font-normal text-sm text-neutral-white">
          {notificationData?.text}
        </p>
      </div>
    </div>
  );
};

export default NotificationPopup;
