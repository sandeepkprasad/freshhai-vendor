import React, { useContext } from "react";
import adminContext from "../../context/adminContext";
import { orderFilterData } from "../../utils/LocalData";

const OrderFilter = ({ dataType = " " }) => {
  const { isDarkMode, orderFilter, setOrderFilter } = useContext(adminContext);

  // Handle Product Filter
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setOrderFilter((prevFilter) => ({
      ...prevFilter,
      [name]: value,
    }));
  };

  // Handle Clear Filter
  const handleClearFilters = () => {
    setOrderFilter({ id: "", status: "" });
  };

  return (
    <div className="w-full h-fit flex justify-end items-center space-x-[2%]">
      <input
        type="text"
        name="id"
        placeholder="Search by order id"
        value={orderFilter?.id}
        onChange={handleFilterChange}
        className={`${
          isDarkMode
            ? "bg-neutral-black-dark text-neutral-gray-light"
            : "bg-neutral-white text-neutral-black-dark"
        } w-[50%] h-6 rounded-3xl shadow-md font-normal text-base px-[2%] focus:outline-none placeholder:text-xs`}
      />
      <select
        name="status"
        value={orderFilter?.status}
        onChange={handleFilterChange}
        className={`${isDarkMode ? "dropdownClassDark" : "dropdownClass"}`}
      >
        <option value="">By Status</option>
        {orderFilterData?.status?.map((status, index) => (
          <option value={status} key={index}>
            {status}
          </option>
        ))}
      </select>
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

export default OrderFilter;
