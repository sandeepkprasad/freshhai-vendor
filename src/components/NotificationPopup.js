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
  }, [notificationData.flag]);

  return (
    <>
      {notificationData?.flag && (
        <div
          className="w-screen h-[15%] flex justify-center items-center py-[1%] fixed left-0 top-0 right-0"
          style={{ zIndex: 2147483647 }}
        >
          <div
            className={`w-[33%] h-full ${
              isDarkMode ? "bg-neutral-black-dark" : "bg-neutral-white"
            } flex justify-center items-center border ${
              notificationData?.type === "green"
                ? "border-primary-green-dark"
                : notificationData?.type === "yellow"
                ? "border-secondary-orange-dark"
                : notificationData?.type === "red"
                ? "border-secondary-red-dark"
                : ""
            } rounded-2xl shadow-md p-[1%] animate-pulse`}
          >
            {notificationData?.type === "green" && (
              <p className="font-normal text-base text-primary-green-dark">
                {notificationData?.text}
              </p>
            )}
            {notificationData?.type === "yellow" && (
              <p className="font-normal text-base text-secondary-orange-dark">
                {notificationData?.text}
              </p>
            )}
            {notificationData?.type === "red" && (
              <p className="font-normal text-base text-secondary-red-dark">
                {notificationData?.text}
              </p>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default NotificationPopup;
