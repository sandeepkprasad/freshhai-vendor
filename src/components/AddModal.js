import React, { useContext, useState } from "react";
import { ProductsContext } from "../context/ProductsContext";

// React Icons
import { FaSave, MdExitToApp } from "../utils/Icons";

// Components Imports
import ModalWrapper from "./ModalWrapper";
import Toggle from "./customComponents/Toggle";

import {
  productSchema,
  productUnit,
  productCategory,
  productAvailability,
  productBrand,
  productTemperature,
} from "../utils/LocalData";

const AddModal = () => {
  const { isDarkMode, setIsAddModal, addProduct } = useContext(ProductsContext);
  const [productToAdd, setProductToAdd] = useState(productSchema);

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

  const handlePriceChange = (e) => {
    const { name, value } = e.target;

    setProductToAdd((prevProduct) => ({
      ...prevProduct,
      price: {
        ...prevProduct.price,
        [name]: value,
      },
    }));
  };

  const handleDiscountChange = (e) => {
    const { name, value } = e.target;

    setProductToAdd((prevProduct) => ({
      ...prevProduct,
      discount: {
        ...prevProduct.discount,
        [name]: value,
      },
    }));
  };

  const handleWeightChange = (e) => {
    const { name, value } = e.target;

    setProductToAdd((prevProduct) => ({
      ...prevProduct,
      weight: {
        ...prevProduct.weight,
        [name]: value,
      },
    }));
  };

  const handleCategoryChange = (e) => {
    const { name, value } = e.target;

    setProductToAdd((prevProduct) => ({
      ...prevProduct,
      category: {
        ...prevProduct.category,
        [name]: value,
      },
    }));
  };

  const toggleHalal = () => {
    setProductToAdd((prevState) => ({
      ...prevState,
      isHalal: !prevState.isHalal,
    }));
  };

  console.log("Product to be added : ", productToAdd);

  return (
    <ModalWrapper heading="Add Product" closeModal={setIsAddModal}>
      <div className="w-full h-full flex flex-col justify-between items-center">
        <div className="w-full h-[95%] p-[5%] space-y-[2%] overflow-x-hidden overflow-y-scroll customScrollbar">
          <div className="w-full h-fit">
            {productToAdd.imageUrl && (
              <img
                src={URL.createObjectURL(productToAdd.imageUrl)}
                alt="product_img"
                className="w-[25%] rounded object-contain"
              />
            )}
            <input
              id="productImg"
              type="file"
              accept="image/*"
              onChange={handleProductImgChange}
              className="hidden"
            />
            <label
              htmlFor="productImg"
              className="font-normal text-xs text-primary-blue-dark underline active:scale-95 duration-300"
            >
              Click to upload image
            </label>
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
          <div className="w-full h-fit flex justify-start items-center space-x-[2.5%]">
            <input
              type="number"
              placeholder="Regular Price (₹)"
              name="regular"
              value={productToAdd.price.regular || ""}
              onChange={handlePriceChange}
              className={`w-[50%] ${
                isDarkMode ? "inputClassDark" : "inputClassLight"
              }`}
            />
            <input
              type="number"
              placeholder="Sale Price (₹)"
              name="sale"
              value={productToAdd.price.sale || ""}
              onChange={handlePriceChange}
              className={`w-[50%] ${
                isDarkMode ? "inputClassDark" : "inputClassLight"
              }`}
            />
          </div>
          <div className="w-full h-fit flex justify-start items-center space-x-[2.5%]">
            <input
              type="number"
              placeholder="Product Weight"
              name="value"
              value={productToAdd.weight.value || ""}
              onChange={handleWeightChange}
              className={`w-[50%] ${
                isDarkMode ? "inputClassDark" : "inputClassLight"
              }`}
            />
            <select
              name="unit"
              value={productToAdd.weight.unit}
              onChange={handleWeightChange}
              className={`w-[50%] ${
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
          <div className="w-full h-fit flex justify-start items-center space-x-[2.5%]">
            <input
              type="number"
              placeholder="Discount (%)"
              name="value"
              value={productToAdd.discount.value || ""}
              onChange={handleDiscountChange}
              className={`w-[50%] ${
                isDarkMode ? "inputClassDark" : "inputClassLight"
              }`}
            />
            <select
              name="main"
              value={productToAdd.category.main}
              onChange={handleCategoryChange}
              className={`w-[50%] ${
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
          </div>
          <div className="w-full h-fit flex justify-start items-center space-x-[2.5%]">
            <input
              type="text"
              placeholder="Product Origin"
              name="origin"
              value={productToAdd.origin || ""}
              onChange={handleProductChange}
              className={`w-[50%] ${
                isDarkMode ? "inputClassDark" : "inputClassLight"
              }`}
            />
            <select
              name="brand"
              value={productToAdd.brand}
              onChange={handleProductChange}
              className={`w-[50%] ${
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
                Select Brand
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
          <div className="w-full h-fit flex justify-start items-center space-x-[2.5%]">
            <select
              name="isAvailable"
              value={productToAdd.isAvailable}
              onChange={handleProductChange}
              className={`w-[50%] ${
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
            <select
              name="storageTemperature"
              value={productToAdd.storageTemperature}
              onChange={handleProductChange}
              className={`w-[50%] ${
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
          </div>
          <div className="w-[50%] h-fit flex justify-start items-center space-x-[2%]">
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
          <textarea
            placeholder="Enter product description here..."
            name="description"
            value={productToAdd.description}
            onChange={handleProductChange}
            maxLength={200}
            className={`w-full h-[25%] ${
              isDarkMode ? "textareaClassDark" : "textareaClassLight"
            }`}
          ></textarea>
        </div>
        <div className="w-full h-[5%] flex justify-evenly items-center border-t">
          <button
            className={`font-semibold text-sm flex items-center space-x-1 ${
              isDarkMode ? "text-neutral-gray-light" : "text-neutral-black-dark"
            } active:scale-95 duration-300`}
            onClick={() => addProduct(productToAdd)}
          >
            <FaSave /> <span>Save</span>
          </button>
          <div className="h-full border"></div>
          <button
            className={`font-semibold text-sm flex items-center space-x-1 ${
              isDarkMode ? "text-neutral-gray-light" : "text-neutral-black-dark"
            } active:scale-95 duration-300`}
            onClick={() => setIsAddModal(false)}
          >
            <MdExitToApp /> <span>Close</span>
          </button>
        </div>
      </div>
    </ModalWrapper>
  );
};

export default AddModal;
