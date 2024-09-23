import React, { useContext } from "react";
import { ProductsContext } from "../context/ProductsContext";

const TopSellingProductCard = ({ data }) => {
  const { isDarkMode } = useContext(ProductsContext);

  return (
    <div className="w-full h-fit flex justify-between items-start space-x-[1%] active:scale-95 duration-300">
      <img
        src={data?.image_url}
        alt="product_img"
        onError={(e) => (e.target.src = "/assets/image_not_found.jpeg")}
        loading="lazy"
        className="w-[10%] bg-neutral-gray-light rounded object-contain"
      />
      <div className="w-[90%] h-fit">
        <p
          className={`font-semibold text-xs ${
            isDarkMode ? "text-neutral-gray-light" : "text-neutral-black-dark"
          }`}
        >
          {data?.name}
        </p>
        <p
          className={`font-normal text-xs ${
            isDarkMode ? "text-neutral-gray-light" : "text-neutral-black-dark"
          }`}
        >
          {data?.category}
        </p>
        <p
          className={`font-normal text-xs ${
            isDarkMode ? "text-neutral-gray-light" : "text-neutral-black-dark"
          }`}
        >
          {data?.weight}
        </p>
      </div>
    </div>
  );
};

export default TopSellingProductCard;
