import React, { useContext, useState, useRef } from "react";
import { ProductsContext } from "../context/ProductsContext";

// Components Imports
import ModalWrapper from "./ModalWrapper";
import Toggle from "./customComponents/Toggle";

import {
  newProductSchema,
  productSchema,
  productWeight,
  productUnit,
  productCategory,
  productAvailability,
  productBrand,
  productOrigin,
  productTemperature,
} from "../utils/LocalData";

const AddModal = () => {
  const { isDarkMode, setIsAddModal, addProduct } = useContext(ProductsContext);
  const [productToAdd, setProductToAdd] = useState(productSchema);
  const imgRef = useRef();

  const handleProductImgChange = (e) => {
    const fileData = e.target.files[0];
    setProductToAdd((prevState) => ({
      ...prevState,
      imageUrl: fileData,
    }));
  };

  const handleProductChange = (e) => {
    const { name, value } = e.target;
    setProductToAdd((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
  };

  const toggleHalal = () => {
    setProductToAdd((prevState) => ({
      ...prevState,
      isHalal: !prevState.isHalal,
    }));
  };

  return (
    <ModalWrapper closeModal={setIsAddModal}>
      <div className="w-full h-full flex flex-col justify-between items-center">
        <div className="w-full h-[90%] flex flex-col justify-start space-y-[2%] overflow-x-hidden overflow-y-scroll customScrollbar">
          <p
            className={`font-semibold text-sm ${
              isDarkMode ? "text-neutral-gray-light" : "text-neutral-black-dark"
            }`}
          >
            Add a Product
          </p>
          <hr />
          <div className="w-full h-fit flex justify-between items-center">
            <input
              type="file"
              accept="image/*"
              onChange={handleProductImgChange}
              ref={imgRef}
              className="hidden"
            />
            <button
            className="bg-primary-blue-light font-normal text-xs text-neutral-white rounded px-[1%] py-[0.5%] active:scale-95 duration-300"
              onClick={() => {
                imgRef.current.click();
              }}
            >
              Click to upload image
            </button>
            {productToAdd.imageUrl && (
              <img
                src={URL.createObjectURL(productToAdd.imageUrl)}
                alt="product_img"
                className="w-[4%] rounded object-contain"
              />
            )}
          </div>
          <div className="w-full h-fit flex justify-start items-center">
            <input
              type="text"
              placeholder="Product Name"
              name="name"
              value={productToAdd.name}
              onChange={handleProductChange}
              maxLength={50}
              className={`w-full ${
                isDarkMode ? "inputClassDark" : "inputClassLight"
              }`}
            />
          </div>
          <div className="w-full h-fit flex justify-start items-center space-x-[2%]">
            <select
              name="category"
              value={productToAdd.category}
              onChange={handleProductChange}
              className={`w-[25%] ${
                isDarkMode ? "selectClassDark" : "selectClassLight"
              }`}
            >
              <option
                value=""
                className={`font-normal text-xs ${
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
                  className={`font-normal text-xs ${
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
              value={productToAdd.brand}
              onChange={handleProductChange}
              className={`w-[25%] ${
                isDarkMode ? "selectClassDark" : "selectClassLight"
              }`}
            >
              <option
                value=""
                className={`font-normal text-xs ${
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
                  className={`font-normal text-xs ${
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
              value={productToAdd.price || ""}
              onChange={handleProductChange}
              className={`w-[25%] ${
                isDarkMode ? "inputClassDark" : "inputClassLight"
              }`}
            />
            <select
              name="weight"
              value={productToAdd.weight}
              onChange={handleProductChange}
              className={`w-[25%] ${
                isDarkMode ? "selectClassDark" : "selectClassLight"
              }`}
            >
              <option
                value=""
                className={`font-normal text-xs ${
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
                  className={`font-normal text-xs ${
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
              value={productToAdd.unit}
              onChange={handleProductChange}
              className={`w-[25%] ${
                isDarkMode ? "selectClassDark" : "selectClassLight"
              }`}
            >
              <option
                value=""
                className={`font-normal text-xs ${
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
                  className={`font-normal text-xs ${
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
              value={productToAdd.origin}
              onChange={handleProductChange}
              className={`w-[25%] ${
                isDarkMode ? "selectClassDark" : "selectClassLight"
              }`}
            >
              <option
                value=""
                className={`font-normal text-xs ${
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
                  className={`font-normal text-xs ${
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
              value={productToAdd.storageTemperature}
              onChange={handleProductChange}
              className={`w-[25%] ${
                isDarkMode ? "selectClassDark" : "selectClassLight"
              }`}
            >
              <option
                value=""
                className={`font-normal text-xs ${
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
                  className={`font-normal text-xs ${
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
              value={productToAdd.discount || ""}
              onChange={handleProductChange}
              className={`w-[25%] ${
                isDarkMode ? "inputClassDark" : "inputClassLight"
              }`}
            />
          </div>
          <div className="w-full h-fit flex justify-start items-center space-x-[2%]">
            <select
              name="available"
              value={productToAdd.available}
              onChange={handleProductChange}
              className={`w-[25%] ${
                isDarkMode ? "selectClassDark" : "selectClassLight"
              }`}
            >
              <option
                value=""
                className={`font-normal text-xs ${
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
                  className={`font-normal text-xs ${
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
                className={`font-semibold text-xs ${
                  isDarkMode
                    ? "text-neutral-gray-light"
                    : "text-neutral-black-dark"
                }`}
              >
                Halal :
              </span>
              <Toggle data={productToAdd.isHalal} toggleClick={toggleHalal} />
            </div>
          </div>
          <textarea
            placeholder="Enter product description here..."
            name="description"
            value={productToAdd.description}
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
            onClick={() => addProduct(productToAdd)}
          >
            Save Product
          </button>
        </div>
      </div>
    </ModalWrapper>
  );
};

export default AddModal;
