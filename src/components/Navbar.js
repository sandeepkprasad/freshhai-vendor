import React, { useContext, useState } from "react";
import { MdKeyboardArrowDown } from "../utils/Icons";
import adminContext from "../context/adminContext";
import { useNavigate } from "react-router-dom";

// React Icons
import { MdOutlineWbSunny, LuSunMoon } from "../utils/Icons";

// Components Imports
import { getCurrentDate } from "../utils/DateUtils";

const Navbar = () => {
  const { adminProfile, isDarkMode, setIsDarkMode } = useContext(adminContext);
  const [isLogoutPopup, setIsLogoutPopup] = useState(false);
  const navigate = useNavigate();

  const handleProfileClick = () => {
    setIsLogoutPopup((prev) => !prev);
  };

  const handleLogout = () => {
    navigate("/login");
  };

  // Hanlde Light/Dark Mode
  const handleDarkMode = () => {
    setIsDarkMode((prev) => !prev);
  };

  return (
    <div className="w-full h-[10%] flex px-[2%] py-0 mt-[1%] fixed left-0 top-0 right-0 bottom-0 z-40">
      <div
        className={`w-full h-full ${
          isDarkMode ? "bg-neutral-black-dark" : "bg-neutral-white"
        } flex justify-between items-center rounded-3xl shadow-md px-[2%] duration-300`}
      >
        <img
          src="/assets/freshhai.png"
          alt="freshhai_logo"
          className="w-[9%]"
        />
        <div className="w-[50%] h-fit flex justify-end items-center space-x-[2%]">
          <span
            className={`font-normal text-xs ${
              isDarkMode
                ? "text-neutral-gray-light"
                : "text-neutral-gray-medium"
            }`}
          >
            {getCurrentDate()}
          </span>
          {isDarkMode ? (
            <button
              className="bg-neutral-gray-light rounded-full p-1 text-lg text-neutral-gray-dark active:scale-95 duration-300"
              onClick={handleDarkMode}
            >
              <MdOutlineWbSunny className="animate-slideTopToBottom" />
            </button>
          ) : (
            <button
              className="bg-neutral-gray-light rounded-full p-1 text-lg text-neutral-gray-dark active:scale-95 duration-300"
              onClick={handleDarkMode}
            >
              <LuSunMoon className="animate-slideTopToBottom" />
            </button>
          )}
          <div
            className="w-fit h-fit flex items-center space-x-2 cursor-pointer active:scale-95 duration-300 relative"
            title="Logout"
            onClick={handleProfileClick}
          >
            <img
              src={adminProfile?.img}
              alt="profile_img"
              className="w-10 bg-neutral-gray-light rounded-full"
            />
            <span
              className={`font-semibold text-sm ${
                isDarkMode
                  ? "text-neutral-gray-light"
                  : "text-neutral-black-dark"
              }`}
            >
              {adminProfile?.firstName}
            </span>
            <span
              className={`text-xl ${
                isDarkMode
                  ? "text-neutral-gray-light"
                  : "text-neutral-black-dark"
              } ${isLogoutPopup && "rotate-180"} duration-300`}
            >
              <MdKeyboardArrowDown />
            </span>
            {isLogoutPopup && (
              <button
                className={`${
                  isDarkMode ? "bg-neutral-black-dark" : "bg-neutral-white"
                } border rounded-lg font-semibold text-base text-secondary-red-dark px-2 py-0.5 absolute top-10 right-0`}
                onClick={handleLogout}
              >
                Logout
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
