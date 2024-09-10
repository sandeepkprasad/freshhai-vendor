import React, { useContext, useState } from "react";
import { MdKeyboardArrowDown } from "../utils/Icons";
import { FirebaseContext } from "../context/FirebaseContext";
import { ProductsContext } from "../context/ProductsContext";
import { useNavigate } from "react-router-dom";
import { getFirstName } from "../utils/OtherUtils";
import { defaultImageAssets } from "../utils/LocalData";
import { Link } from "react-router-dom";

// Firebase Imports
import { signOut } from "firebase/auth";

// React Icons
import { MdOutlineWbSunny, LuSunMoon } from "../utils/Icons";

// Components Imports
import { getCurrentDate } from "../utils/DateUtils";

const Navbar = () => {
  const { auth, adminProfile } = useContext(FirebaseContext);
  const { isDarkMode, setIsDarkMode, handleNotification } =
    useContext(ProductsContext);

  const [isLogoutPopup, setIsLogoutPopup] = useState(false);
  const navigate = useNavigate();

  const handleProfileClick = () => {
    setIsLogoutPopup((prev) => !prev);
  };

  // Handling Admin Logout
  const handleLogout = () => {
    signOut(auth);
    handleNotification(true, "green", "Signed out successfully.");
    setTimeout(() => {
      navigate("/login");
    }, 1000);
  };

  // Hanlde Light/Dark Mode
  const handleDarkMode = () => {
    setIsDarkMode((prev) => !prev);
  };

  return (
    <div className="w-full h-[7%] md:h-[10%] flex px-[2%] py-0 mt-[1%] fixed left-0 top-0 right-0 bottom-0 z-40">
      <div
        className={`w-full h-full ${
          isDarkMode ? "bg-neutral-black-dark" : "bg-neutral-white"
        } flex justify-between items-center rounded-lg shadow px-[3%] md:px-[2%] duration-300`}
      >
        <img
          src={defaultImageAssets?.brandLogo}
          alt="freshhai_logo"
          className="w-[25%] md:w-[9%]"
        />
        <div className="w-[50%] h-fit flex justify-end items-center space-x-[5%] md:space-x-[2%]">
          <span
            className={`font-normal text-xs ${
              isDarkMode
                ? "text-neutral-gray-light"
                : "text-neutral-gray-medium"
            } hidden md:block`}
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
            {adminProfile?.imgUrl ? (
              <img
                src={adminProfile?.imgUrl}
                alt="profile_img"
                onError={(e) => (e.target.src = "/assets/default_profile.png")}
                className="w-10 bg-neutral-gray-light rounded-full object-contain"
              />
            ) : (
              <img
                src={defaultImageAssets?.defaultProfileImageUrl}
                alt="profile_img"
                onError={(e) => (e.target.src = "/assets/default_profile.png")}
                className="w-10 bg-neutral-gray-light rounded-full object-contain"
              />
            )}
            {adminProfile?.name ? (
              <span
                className={`font-semibold text-sm ${
                  isDarkMode
                    ? "text-neutral-gray-light"
                    : "text-neutral-black-dark"
                } hidden md:block`}
              >
                {getFirstName(adminProfile?.name)}
              </span>
            ) : (
              <span
                className={`font-semibold text-sm ${
                  isDarkMode
                    ? "text-neutral-gray-light"
                    : "text-neutral-black-dark"
                } hidden md:block`}
              >
                Admin
              </span>
            )}
            <span
              className={`text-xl ${
                isDarkMode
                  ? "text-neutral-gray-light"
                  : "text-neutral-black-dark"
              } ${isLogoutPopup && "rotate-180"} duration-300 hidden md:block`}
            >
              <MdKeyboardArrowDown />
            </span>
            {isLogoutPopup && (
              <div
                className={`w-fit h-fit ${
                  isDarkMode ? "bg-neutral-black-dark" : "bg-neutral-white"
                } flex flex-col justify-center items-center border rounded-lg px-3 py-0.5 absolute top-10 right-0`}
              >
                <Link
                  to="/profile"
                  className={`font-semibold text-base ${
                    isDarkMode
                      ? "text-neutral-gray-light"
                      : "text-neutral-black-dark"
                  }`}
                >
                  Profile
                </Link>
                <button
                  className="font-semibold text-base text-secondary-red-dark"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
