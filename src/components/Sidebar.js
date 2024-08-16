import React, { useContext } from "react";
import adminContext from "../context/adminContext";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";

// React Icons
import {
  MdOutlineDashboard,
  MdOutlineShoppingCart,
  MdOutlineAllInbox,
  MdOutlineAnalytics,
  MdPeopleOutline,
  MdOutlineDeliveryDining,
  MdOutlinePersonOutline,
  MdOutlineSettings,
} from "../utils/Icons";

const sidebarItems = [
  { icon: <MdOutlineDashboard />, title: "Overview", route: "/" },
  { icon: <MdOutlineShoppingCart />, title: "Orders", route: "/orders" },
  { icon: <MdOutlineAllInbox />, title: "Products", route: "/products" },
  //{ icon: <MdOutlineAnalytics />, title: "Analytics", route: "/analytics" },
  { icon: <MdPeopleOutline />, title: "Customers", route: "/customers" },
  { icon: <MdOutlineDeliveryDining />, title: "Delivery", route: "/delivery" },
  { icon: <MdOutlinePersonOutline />, title: "Profile", route: "/profile" },
  //{ icon: <MdOutlineSettings />, title: "Settings", route: "/settings" },
];

const Sidebar = () => {
  const { isDarkMode } = useContext(adminContext);
  const location = useLocation();

  return (
    <div className="w-[15%] h-full px-[2%] pt-[9%] pb-[1%] fixed left-0 top-0 bottom-0 z-40">
      {isDarkMode ? (
        <div className="w-full h-full space-y-[12.5%]">
          {sidebarItems?.map((item, index) => (
            <Link
              to={item.route}
              className={`w-full h-[8%] ${
                item.route === location?.pathname
                  ? "bg-neutral-black-dark shadow-md"
                  : "bg-transparent"
              } flex justify-start items-center pl-[15%] space-x-[7%] rounded-3xl active:scale-95 duration-300`}
              key={index}
            >
              <span
                className={`text-2xl ${
                  item.route === location?.pathname
                    ? "text-neutral-gray-light"
                    : "text-neutral-gray-medium"
                } `}
              >
                {item.icon}
              </span>
              <span
                className={`${
                  item.route === location?.pathname
                    ? "font-semibold text-neutral-gray-light"
                    : "font-normal text-neutral-gray-medium"
                } text-base`}
              >
                {item.title}
              </span>
            </Link>
          ))}
        </div>
      ) : (
        <div className="w-full h-full space-y-[12.5%]">
          {sidebarItems?.map((item, index) => (
            <Link
              to={item.route}
              className={`w-full h-[8%] ${
                item.route === location?.pathname
                  ? "bg-neutral-white shadow-md"
                  : "bg-transparent"
              } flex justify-start items-center pl-[15%] space-x-[7%] rounded-3xl active:scale-95 duration-300`}
              key={index}
            >
              <span
                className={`text-2xl ${
                  item.route === location?.pathname
                    ? "text-neutral-black-dark"
                    : "text-neutral-gray-dark"
                } `}
              >
                {item.icon}
              </span>
              <span
                className={`${
                  item.route === location?.pathname
                    ? "font-semibold text-neutral-black-dark"
                    : "font-normal text-neutral-gray-dark"
                } text-base`}
              >
                {item.title}
              </span>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default Sidebar;
