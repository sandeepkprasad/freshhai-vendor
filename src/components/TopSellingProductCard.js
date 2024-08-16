import React, { useContext } from "react";
import adminContext from "../context/adminContext";

const TopSellingProductCard = ({ data }) => {
  const { isDarkMode } = useContext(adminContext);

  return (
    <div className="w-full h-fit flex justify-between items-start space-x-[1%] active:scale-95 duration-300">
      <img
        src={data?.imageUrl}
        alt="product_img"
        onError={(e) => (e.target.src = "/assets/image_not_found.jpeg")}
        loading="lazy"
        className="w-[12.5%] bg-neutral-gray-light rounded-lg object-contain"
      />
      <div className="w-[87.5%] h-fit">
        <p
          className={`font-semibold text-xs ${
            isDarkMode ? "text-neutral-gray-light" : "text-neutral-black-dark"
          }`}
        >
          {data?.name}
        </p>
        <div className="w-full h-fit flex justify-between items-center">
          <span
            className={`font-normal text-xs ${
              isDarkMode
                ? "text-neutral-gray-light"
                : "text-neutral-black-light"
            }`}
          >
            7,000 Orders
          </span>
          {data?.available === "Available" ? (
            <span className="font-semibold text-xs text-primary-green-dark">
              Available
            </span>
          ) : (
            <span className="font-semibold text-xs text-secondary-red-dark">
              Not Available
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default TopSellingProductCard;
