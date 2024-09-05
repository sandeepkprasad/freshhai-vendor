import React, { useContext } from "react";
import { ProductsContext } from "../../context/ProductsContext";
import { OrdersContext } from "../../context/OrdersContext";
import { orderFilterData } from "../../utils/LocalData";

const OrderFilter = () => {
  const { isDarkMode } = useContext(ProductsContext);
  const { orderFilter, setOrderFilter } = useContext(OrdersContext);

  // Handle Product Filter
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setOrderFilter((prevFilter) => ({
      ...prevFilter,
      [name]: value,
    }));
  };

  // Handle Apply Filter
  const handleApplyFilter = () => {
    alert("Product Filter Applied");
  };

  // Handle Clear Filter
  const handleClearFilters = () => {
    setOrderFilter({ id: "", status: "" });
  };

  return (
    <div className="w-[75%] h-fit flex justify-end items-center space-x-[2%]">
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
        } w-[33%] rounded shadow font-normal text-base px-[2%] focus:outline-none placeholder:text-xs`}
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

export default OrderFilter;
