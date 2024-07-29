import React, { useContext } from "react";
import adminContext from "../context/adminContext";

const ProductCard = ({ data }) => {
  const { handleUpdateModal, handleDeleteModal } = useContext(adminContext);

  return (
    <div className="w-[25vw] h-[50vh] bg-neutral-white flex flex-col justify-between border rounded-3xl shadow-md p-[2%]">
      <div className="w-full h-[90%]">
        <div className="w-full h-fit flex items-start space-x-[2%] mb-[2%]">
          <img
            src={data?.imageUrl}
            onError={(e) => (e.target.src = "/assets/image_not_found.jpeg")}
            loading="lazy"
            alt="product_image"
            className="w-[25%] bg-neutral-gray-light rounded-2xl object-contain"
          />
          <div className="w-[75%] h-fit">
            <p className="font-semibold text-base text-neutral-black-dark">
              {data?.name}
            </p>
            <p className="font-normal text-sm text-neutral-black-light">
              {data?.category}
            </p>
            <p className="font-normal text-sm text-neutral-black-light">
              {data?.brand}
            </p>
            <div className="w-full h-fit flex justify-between items-center">
              <span className="bg-primary-green-dark font-semibold text-sm text-neutral-white rounded px-2 py-0.5">
                ₹ {data?.price} / {data?.weight}
                {data?.unit}
              </span>
              {data?.available === "Available" ? (
                <span className="font-semibold text-sm text-primary-green-dark rounded px-2 py-0.5">
                  Available
                </span>
              ) : (
                <span className="font-semibold text-sm text-secondary-red-dark rounded px-2 py-0.5">
                  Not Available
                </span>
              )}
            </div>
          </div>
        </div>
        <div className="w-full h-fit space-y-[2%]">
          <div className="w-full h-fit flex flex-wrap justify-between items-center">
            <p className="font-normal text-sm text-neutral-black-light">
              Origin : {data?.origin}
            </p>
            <p className="font-normal text-sm text-neutral-black-light">
              Temp. : {data?.storageTemperature}°C
            </p>
          </div>
          <div className="w-full h-fit flex flex-wrap justify-between items-center">
            <p className="font-normal text-sm text-neutral-black-light">
              Discount : {data?.discount}%
            </p>
            <p className="font-normal text-sm text-neutral-black-light">
              {data?.isHalal ? "Halal" : "Not Halal"}
            </p>
          </div>
          <p className="font-normal text-xs text-neutral-black-light">
            {data?.description}
          </p>
        </div>
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
    </div>
  );
};

export default ProductCard;
