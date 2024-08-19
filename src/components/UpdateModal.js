import React, { useContext, useState } from "react";
import adminContext from "../context/adminContext";

// Components Imports
import ModalWrapper from "./ModalWrapper";
import Toggle from "./customComponents/Toggle";

import {
  productWeight,
  productUnit,
  productCategory,
  productAvailability,
  productBrand,
  productOrigin,
  productTemperature,
} from "../utils/LocalData";

const UpdateModal = () => {
  const { isDarkMode, productToUpdate, setIsUpdateModal, updateProduct } =
    useContext(adminContext);
  const [updatedProduct, setUpdatedProduct] = useState(productToUpdate);

  const handleProductImgChange = (e) => {
    const files = e.target.files;
    if (files.length > 0) {
      const file = files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setUpdatedProduct((prevState) => ({
          ...prevState,
          imageUrl: [reader.result],
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleProductChange = (e) => {
    const { name, value } = e.target;
    setUpdatedProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
  };

  const toggleHalal = () => {
    setUpdatedProduct((prevState) => ({
      ...prevState,
      isHalal: !prevState.isHalal,
    }));
  };

  return (
    <ModalWrapper closeModal={setIsUpdateModal}>
      <div className="w-full h-full flex flex-col justify-between items-center">
        <div className="w-full h-[90%] flex flex-col justify-start space-y-[2%]">
          <p
            className={`font-semibold text-lg ${
              isDarkMode ? "text-neutral-gray-light" : "text-neutral-black-dark"
            }`}
          >
            Update a Product
          </p>
          <div className="w-full h-fit flex justify-between items-center">
            <input type="file" onChange={handleProductImgChange} />
            {updatedProduct.imageUrl.length > 0 && (
              <img
                src={updatedProduct.imageUrl}
                alt="product_img"
                className="w-[4%] rounded object-contain"
              />
            )}
          </div>
          <div className="w-full h-full flex justify-start items-center">
            <input
              type="text"
              placeholder="Product Name"
              name="name"
              value={updatedProduct.name}
              onChange={handleProductChange}
              maxLength={25}
              className={`w-[79%] ${
                isDarkMode ? "inputClassDark" : "inputClassLight"
              }`}
            />
          </div>
          <div className="w-full h-fit flex justify-start items-center space-x-[2%]">
            <select
              name="category"
              value={updatedProduct.category}
              onChange={handleProductChange}
              className={`w-[25%] ${
                isDarkMode ? "selectClassDark" : "selectClassLight"
              }`}
            >
              <option
                value=""
                className={`font-normal text-sm ${
                  isDarkMode
                    ? "text-neutral-gray-light"
                    : "text-neutral-black-dark"
                }`}
              >
                Select Category
              </option>
              {productCategory?.map((category, index) => (
                <option
                  value={category}
                  key={index}
                  className={`font-normal text-sm ${
                    isDarkMode
                      ? "text-neutral-gray-light"
                      : "text-neutral-black-dark"
                  }`}
                >
                  {category}
                </option>
              ))}
            </select>
            <select
              name="brand"
              value={updatedProduct.brand}
              onChange={handleProductChange}
              className={`w-[25%] ${
                isDarkMode ? "selectClassDark" : "selectClassLight"
              }`}
            >
              <option
                value=""
                className={`font-normal text-sm ${
                  isDarkMode
                    ? "text-neutral-gray-light"
                    : "text-neutral-black-dark"
                }`}
              >
                Select Type
              </option>
              {productBrand?.map((brand, index) => (
                <option
                  value={brand}
                  key={index}
                  className={`font-normal text-sm ${
                    isDarkMode
                      ? "text-neutral-gray-light"
                      : "text-neutral-black-dark"
                  }`}
                >
                  {brand}
                </option>
              ))}
            </select>
          </div>
          <div className="w-full h-fit flex justify-start items-center space-x-[2%]">
            <input
              type="number"
              placeholder="Product Price (₹)"
              name="price"
              value={updatedProduct.price || ""}
              onChange={handleProductChange}
              className={`w-[25%] ${
                isDarkMode ? "inputClassDark" : "inputClassLight"
              }`}
            />
            <select
              name="weight"
              value={updatedProduct.weight}
              onChange={handleProductChange}
              className={`w-[25%] ${
                isDarkMode ? "selectClassDark" : "selectClassLight"
              }`}
            >
              <option
                value=""
                className={`font-normal text-sm ${
                  isDarkMode
                    ? "text-neutral-gray-light"
                    : "text-neutral-black-dark"
                }`}
              >
                Select Weight
              </option>
              {productWeight?.map((weight, index) => (
                <option
                  value={weight}
                  className={`font-normal text-sm ${
                    isDarkMode
                      ? "text-neutral-gray-light"
                      : "text-neutral-black-dark"
                  }`}
                  key={index}
                >
                  {weight}
                </option>
              ))}
            </select>
            <select
              name="unit"
              value={updatedProduct.unit}
              onChange={handleProductChange}
              className={`w-[25%] ${
                isDarkMode ? "selectClassDark" : "selectClassLight"
              }`}
            >
              <option
                value=""
                className={`font-normal text-sm ${
                  isDarkMode
                    ? "text-neutral-gray-light"
                    : "text-neutral-black-dark"
                }`}
              >
                Select Unit
              </option>
              {productUnit?.map((unit, index) => (
                <option
                  value={unit}
                  className={`font-normal text-sm ${
                    isDarkMode
                      ? "text-neutral-gray-light"
                      : "text-neutral-black-dark"
                  }`}
                  key={index}
                >
                  {unit}
                </option>
              ))}
            </select>
          </div>
          <div className="w-full h-fit flex justify-start items-center space-x-[2%]">
            <select
              name="origin"
              value={updatedProduct.origin}
              onChange={handleProductChange}
              className={`w-[25%] ${
                isDarkMode ? "selectClassDark" : "selectClassLight"
              }`}
            >
              <option
                value=""
                className={`font-normal text-sm ${
                  isDarkMode
                    ? "text-neutral-gray-light"
                    : "text-neutral-black-dark"
                }`}
              >
                Select Origin
              </option>
              {productOrigin?.map((origin, index) => (
                <option
                  value={origin}
                  key={index}
                  className={`font-normal text-sm ${
                    isDarkMode
                      ? "text-neutral-gray-light"
                      : "text-neutral-black-dark"
                  }`}
                >
                  {origin}
                </option>
              ))}
            </select>
            <select
              name="storageTemperature"
              value={updatedProduct.storageTemperature}
              onChange={handleProductChange}
              className={`w-[25%] ${
                isDarkMode ? "selectClassDark" : "selectClassLight"
              }`}
            >
              <option
                value=""
                className={`font-normal text-sm ${
                  isDarkMode
                    ? "text-neutral-gray-light"
                    : "text-neutral-black-dark"
                }`}
              >
                Select Temp.
              </option>
              {productTemperature?.map((temp, index) => (
                <option
                  value={temp}
                  key={index}
                  className={`font-normal text-sm ${
                    isDarkMode
                      ? "text-neutral-gray-light"
                      : "text-neutral-black-dark"
                  }`}
                >
                  {temp}
                </option>
              ))}
            </select>
            <input
              type="number"
              placeholder="Discount (%)"
              name="discount"
              value={updatedProduct.discount || ""}
              onChange={handleProductChange}
              className={`w-[25%] ${
                isDarkMode ? "inputClassDark" : "inputClassLight"
              }`}
            />
          </div>
          <div className="w-full h-fit flex justify-start items-center space-x-[2%]">
            <select
              name="available"
              value={updatedProduct.available}
              onChange={handleProductChange}
              className={`w-[25%] ${
                isDarkMode ? "selectClassDark" : "selectClassLight"
              }`}
            >
              <option
                value=""
                className={`font-normal text-sm ${
                  isDarkMode
                    ? "text-neutral-gray-light"
                    : "text-neutral-black-dark"
                }`}
              >
                Stock
              </option>
              {productAvailability?.map((available, index) => (
                <option
                  value={available}
                  key={index}
                  className={`font-normal text-sm ${
                    isDarkMode
                      ? "text-neutral-gray-light"
                      : "text-neutral-black-dark"
                  }`}
                >
                  {available}
                </option>
              ))}
            </select>
            <div className="w-[25%] h-fit flex justify-start items-center space-x-[2%]">
              <span
                className={`font-semibold text-base ${
                  isDarkMode
                    ? "text-neutral-gray-light"
                    : "text-neutral-black-dark"
                }`}
              >
                Halal :
              </span>
              <Toggle data={updatedProduct.isHalal} toggleClick={toggleHalal} />
            </div>
          </div>
          <textarea
            placeholder="Enter product description here..."
            name="description"
            value={updatedProduct.description}
            onChange={handleProductChange}
            maxLength={100}
            className={`w-[79%] h-[33%] ${
              isDarkMode ? "textareaClassDark" : "textareaClassLight"
            }`}
          ></textarea>
        </div>
        <div className="w-full h-fit flex justify-center items-center">
          <button
            className="buttonClass bg-primary-blue-dark"
            onClick={() => updateProduct(updatedProduct)}
          >
            Save Product
          </button>
        </div>
      </div>
    </ModalWrapper>
  );
};

export default UpdateModal;
