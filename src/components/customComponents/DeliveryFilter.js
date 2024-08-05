import React, { useContext } from "react";
import adminContext from "../../context/adminContext";

const DeliveryFilter = ({ dataType = "" }) => {
  const { isDarkMode, deliveryFilter, setDeliveryFilter } =
    useContext(adminContext);

  // Handle Delivery Filter
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setDeliveryFilter((prevFilter) => ({
      ...prevFilter,
      [name]: value,
    }));
  };

  // Handle Apply Filter
  const handleApplyFilter = () => {
    alert("Delivery Filter Applied");
  };

  // Handle Clear Filter
  const handleClearFilters = () => {
    setDeliveryFilter({ name: "", phone: "" });
    alert("Delivery Filter Cleared");
  };

  return (
    <div className="w-[75%] h-fit flex justify-end items-center space-x-[2%]">
      <input
        type="text"
        name="name"
        placeholder="Search by name"
        value={deliveryFilter?.name}
        onChange={handleFilterChange}
        className={`${
          isDarkMode
            ? "bg-neutral-black-dark text-neutral-gray-light"
            : "bg-neutral-white text-neutral-black-dark"
        } w-[33%] rounded-3xl shadow-md font-normal text-base px-[2%] py-[0.25%] focus:outline-none placeholder:text-xs`}
      />
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
        } w-[33%] rounded-3xl shadow-md font-normal text-base px-[2%] py-[0.25%] focus:outline-none placeholder:text-xs`}
      />
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

export default DeliveryFilter;
