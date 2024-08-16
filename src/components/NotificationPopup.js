import React, { useContext, useEffect } from "react";
import adminContext from "../context/adminContext";

const NotificationPopup = () => {
  const { isDarkMode, notificationData, handleNotification } =
    useContext(adminContext);

  useEffect(() => {
    if (notificationData.flag) {
      const timer = setTimeout(() => {
        handleNotification(false, "", "");
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [notificationData.flag, handleNotification]);

  if (!notificationData.flag) return null;

  const getBorderColor = () => {
    switch (notificationData.type) {
      case "green":
        return "border-primary-green-dark";
      case "yellow":
        return "border-secondary-orange-dark";
      case "red":
        return "border-secondary-red-dark";
      default:
        return "";
    }
  };

  const getTextColor = () => {
    switch (notificationData.type) {
      case "green":
        return "text-primary-green-dark";
      case "yellow":
        return "text-secondary-orange-dark";
      case "red":
        return "text-secondary-red-dark";
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
        className={`w-[33%] h-full ${
          isDarkMode ? "bg-neutral-black-dark" : "bg-neutral-white"
        } flex justify-center items-center border ${getBorderColor()} rounded-2xl shadow-md p-[1%] animate-pulse`}
      >
        <p className={`font-normal text-base ${getTextColor()}`}>
          {notificationData.text}
        </p>
      </div>
    </div>
  );
};

export default NotificationPopup;
