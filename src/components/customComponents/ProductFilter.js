import React, { useContext } from "react";
import "../../App.css";
import { productFilterData } from "../../utils/LocalData";
import adminContext from "../../context/adminContext";

const ProductFilter = () => {
  const { isDarkMode, productFilter, setProductFilter } =
    useContext(adminContext);

  // Handle Product Filter
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setProductFilter((prevFilter) => ({
      ...prevFilter,
      [name]: value,
    }));
  };

  // Handle Apply Filter
  const handleApplyFilter = () => {
    alert("Order Filter Applied");
  };

  // Handle Clear Filter
  const handleClearFilters = () => {
    setProductFilter({
      category: "",
      available: "",
      brand: "",
      origin: "",
    });

    alert("Order Filter Cleared");
  };

  return (
    <div className="w-full h-fit flex justify-end items-center space-x-[1%]">
      <select
        name="category"
        value={productFilter?.category}
        onChange={handleFilterChange}
        className={`${isDarkMode ? "dropdownClassDark" : "dropdownClass"}`}
      >
        <option value="">Category</option>
        {productFilterData?.category?.map((category, index) => (
          <option value={category} key={index}>
            {category}
          </option>
        ))}
      </select>
      <select
        name="brand"
        value={productFilter?.brand}
        onChange={handleFilterChange}
        className={`${isDarkMode ? "dropdownClassDark" : "dropdownClass"}`}
      >
        <option value="">Type</option>
        {productFilterData?.brand?.map((brand, index) => (
          <option value={brand} key={index}>
            {brand}
          </option>
        ))}
      </select>
      <select
        name="origin"
        value={productFilter?.origin}
        onChange={handleFilterChange}
        className={`${isDarkMode ? "dropdownClassDark" : "dropdownClass"}`}
      >
        <option value="">Origin</option>
        {productFilterData?.origin?.map((origin, index) => (
          <option value={origin} key={index}>
            {origin}
          </option>
        ))}
      </select>
      <select
        name="available"
        value={productFilter?.available}
        onChange={handleFilterChange}
        className={`${isDarkMode ? "dropdownClassDark" : "dropdownClass"}`}
      >
        <option value="">Stock</option>
        {productFilterData?.stock?.map((stock, index) => (
          <option value={stock} key={index}>
            {stock}
          </option>
        ))}
      </select>
      <button className="filterApplyBtn" onClick={handleApplyFilter}>
        Filter
      </button>
      <button
        className={`font-normal text-xs ${
          isDarkMode ? "text-neutral-gray-light" : "text-neutral-black-light"
        } active:scale-95 duration-300`}
        onClick={handleClearFilters}
      >
        Clear Filter
      </button>
    </div>
  );
};

export default ProductFilter;
