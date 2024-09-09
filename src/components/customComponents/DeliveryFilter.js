import React, { useContext } from "react";
import { ProductsContext } from "../../context/ProductsContext";
import { DeliveryContext } from "../../context/DeliveryContext";

const DeliveryFilter = () => {
  const { isDarkMode } = useContext(ProductsContext);
  const { deliveryFilter, setDeliveryFilter, handleDeliveryPartnerFilter } =
    useContext(DeliveryContext);

  // Handle Delivery Filter
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setDeliveryFilter((prevFilter) => ({
      ...prevFilter,
      [name]: value,
    }));
  };

  // Handle clear filter
  const handleClearFilters = () => {
    setDeliveryFilter({ phone: "" });
  };

  return (
    <div className="w-full md:w-[75%] h-fit flex justify-start md:justify-end items-center space-x-[2%]">
      <input
        type="text"
        name="phone"
        placeholder="Search by phone number"
        value={deliveryFilter?.phone}
        onChange={handleFilterChange}
        className={`${
          isDarkMode
            ? "bg-neutral-black-dark text-neutral-gray-light"
            : "bg-neutral-white text-neutral-black-dark"
        } w-[50%] md:w-[33%] h-6 rounded shadow font-normal text-base px-[2%] focus:outline-none placeholder:text-xs`}
      />
      <button className="filterApplyBtn" onClick={handleDeliveryPartnerFilter}>
        Filter
      </button>
      <button
        className={`font-normal text-sm md:text-xs ${
          isDarkMode ? "text-neutral-gray-light" : "text-neutral-black-light"
        } active:scale-95 duration-300`}
        onClick={handleClearFilters}
      >
        Clear Filter
      </button>
    </div>
  );
};

export default DeliveryFilter;
