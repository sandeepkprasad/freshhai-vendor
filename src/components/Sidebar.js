import React, { useContext } from "react";
import { ProductsContext } from "../context/ProductsContext";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";

// React Icons
import {
  MdOutlineDashboard,
  MdOutlineShoppingCart,
  MdOutlineAllInbox,
  //MdOutlineAnalytics,
  MdPeopleOutline,
  MdOutlineDeliveryDining,
  MdOutlinePersonOutline,
  //MdOutlineSettings,
  BiSupport,
} from "../utils/Icons";

const sidebarItemsLarge = [
  { icon: <MdOutlineDashboard />, title: "Overview", route: "/" },
  { icon: <MdOutlineShoppingCart />, title: "Orders", route: "/orders" },
  { icon: <MdOutlineAllInbox />, title: "Products", route: "/products" },
  //{ icon: <MdOutlineAnalytics />, title: "Analytics", route: "/analytics" },
  { icon: <MdPeopleOutline />, title: "Customers", route: "/customers" },
  { icon: <MdOutlineDeliveryDining />, title: "Delivery", route: "/delivery" },
  { icon: <MdOutlinePersonOutline />, title: "Profile", route: "/profile" },
  //{ icon: <MdOutlineSettings />, title: "Settings", route: "/settings" },
  { icon: <BiSupport />, title: "Support", route: "/support" },
];

const sidebarItemsSmall = [
  { icon: <MdOutlineDashboard />, title: "Overview", route: "/" },
  { icon: <MdOutlineShoppingCart />, title: "Orders", route: "/orders" },
  { icon: <MdOutlineAllInbox />, title: "Products", route: "/products" },
  //{ icon: <MdOutlineAnalytics />, title: "Analytics", route: "/analytics" },
  { icon: <MdPeopleOutline />, title: "Customers", route: "/customers" },
  { icon: <MdOutlineDeliveryDining />, title: "Delivery", route: "/delivery" },
  //{ icon: <MdOutlinePersonOutline />, title: "Profile", route: "/profile" },
  //{ icon: <MdOutlineSettings />, title: "Settings", route: "/settings" },
];

const Sidebar = () => {
  const { isDarkMode } = useContext(ProductsContext);
  const location = useLocation();

  return (
    <>
      {/** Large Screens */}
      <div className="w-[15%] h-full px-[2%] pt-[9%] pb-[1%] fixed left-0 top-0 bottom-0 z-40 hidden md:block">
        {isDarkMode ? (
          <div className="w-full h-full space-y-[12.5%]">
            {sidebarItemsLarge?.map((item, index) => (
              <Link
                to={item.route}
                className={`w-full h-[8%] ${
                  item.route === location?.pathname
                    ? "bg-primary-blue-dark shadow"
                    : "bg-transparent"
                } flex justify-start items-center pl-[15%] space-x-[7%] rounded-lg active:scale-95 duration-300`}
                key={index}
              >
                <span
                  className={`text-2xl ${
                    item.route === location?.pathname
                      ? "text-neutral-white"
                      : "text-neutral-gray-medium"
                  } `}
                >
                  {item.icon}
                </span>
                <span
                  className={`${
                    item.route === location?.pathname
                      ? "font-semibold text-neutral-white"
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
            {sidebarItemsLarge?.map((item, index) => (
              <Link
                to={item.route}
                className={`w-full h-[8%] ${
                  item.route === location?.pathname
                    ? "bg-primary-blue-dark shadow"
                    : "bg-transparent"
                } flex justify-start items-center pl-[15%] space-x-[7%] rounded-lg active:scale-95 duration-300`}
                key={index}
              >
                <span
                  className={`text-2xl ${
                    item.route === location?.pathname
                      ? "text-neutral-white"
                      : "text-neutral-gray-dark"
                  } `}
                >
                  {item.icon}
                </span>
                <span
                  className={`${
                    item.route === location?.pathname
                      ? "font-semibold text-neutral-white"
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

      {/** Mobile Screens */}
      <div className="w-full h-[10%] bg-primary-blue-dark flex justify-evenly items-center fixed left-0 bottom-0 right-0 md:hidden">
        {sidebarItemsSmall?.map((item, index) => (
          <Link
            to={item.route}
            className="w-fit h-fit flex flex-col justify-center items-center active:scale-95 duration-300"
            key={index}
          >
            <span
              className={`text-2xl ${
                item.route === location?.pathname
                  ? "text-neutral-white"
                  : "text-neutral-gray-medium"
              } `}
            >
              {item.icon}
            </span>
            <span
              className={`${
                item.route === location?.pathname
                  ? "font-semibold text-neutral-white"
                  : "font-normal text-neutral-gray-medium"
              } text-xs`}
            >
              {item.title}
            </span>
          </Link>
        ))}
      </div>
    </>
  );
};

export default Sidebar;
