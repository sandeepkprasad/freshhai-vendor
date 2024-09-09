import React, { useContext } from "react";
import { defaultImageAssets } from "../utils/LocalData";
import { ProductsContext } from "../context/ProductsContext";

const ProductCard = ({ data }) => {
  const { isDarkMode, handleUpdateModal, handleDeleteModal } =
    useContext(ProductsContext);

  return (
    <div
      className={`w-full md:w-[15vw] h-[40vh] md:h-[50vh] ${
        isDarkMode
          ? "bg-neutral-black-dark border-neutral-black-dark"
          : "bg-neutral-white"
      } flex flex-col justify-between border rounded-lg shadow p-[5%] relative`}
    >
      <div className="w-full h-fit flex justify-center items-center">
        <img
          src={data?.imageUrl}
          onError={(e) => (e.target.src = defaultImageAssets?.imageNotFoundUrl)}
          loading="lazy"
          alt="product_image"
          className="w-[50%] bg-neutral-gray-light rounded object-contain"
        />
      </div>
      <div className="w-full h-fit flex flex-col justify-start items-start space-y-[3%]">
        <p
          className={`font-normal text-xs ${
            isDarkMode ? "text-neutral-gray-light" : "text-neutral-black-light"
          }`}
        >
          {data?.category?.main} | {data?.storageTemperature} |{data?.origin} |{" "}
          {data?.brand}
        </p>
        <p
          className={`font-semibold text-xs ${
            isDarkMode ? "text-neutral-gray-light" : "text-neutral-black-dark"
          }`}
        >
          {data?.name}
        </p>
        <div className="w-full h-fit flex justify-start items-center space-x-[2%]">
          <span
            className={`font-normal text-xs ${
              isDarkMode ? "text-neutral-gray-light" : "text-neutral-black-dark"
            } line-through`}
          >
            ₹{data?.price.regular}
          </span>
          <span
            className={`font-normal text-xs ${
              isDarkMode ? "text-neutral-gray-light" : "text-neutral-black-dark"
            }`}
          >
            ₹{data?.price.sale}/{data?.weight?.value}
            {data?.weight?.unit}
          </span>
        </div>
        <p
          className={`font-normal text-xs ${
            isDarkMode ? "text-neutral-gray-light" : "text-neutral-black-dark"
          }`}
        >
          {data?.isAvailable}, {data?.isHalal ? "Halal" : "Not Halal"}
        </p>
        <p
          className={`font-normal text-xs ${
            isDarkMode ? "text-neutral-gray-light" : "text-neutral-black-light"
          }`}
        >
          {data?.description}
        </p>
      </div>
      <div className="w-full h-fit flex justify-evenly items-center">
        <button
          className="buttonClass bg-primary-blue-dark"
          onClick={() => handleUpdateModal(data?.id)}
        >
          Update
        </button>
        <button
          className="buttonClass bg-secondary-red-dark"
          onClick={() => handleDeleteModal(data?.id)}
        >
          Delete
        </button>
      </div>
      <span
        className={`bg-primary-green-dark font-semibold text-neutral-white text-sm rounded-tr-lg rounded-bl-lg px-2 absolute top-0 right-0`}
      >
        {data?.discount?.value}%
      </span>
    </div>
  );
};

export default ProductCard;
