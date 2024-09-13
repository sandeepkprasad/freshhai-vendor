import React, { useContext } from "react";
import { ProductsContext } from "../../context/ProductsContext";
import { UsersContext } from "../../context/UsersContext";

const CustomerFilter = () => {
  const { isDarkMode } = useContext(ProductsContext);
  const { userFilter, getUserByPhone, setUserFilter } =
    useContext(UsersContext);

  // Handle Product Filter
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setUserFilter((prevFilter) => ({
      ...prevFilter,
      [name]: value,
    }));
  };

  // Handle Clear Filter
  const handleClearFilters = () => {
    setUserFilter({ phone: "" });
  };

  return (
    <div className="w-full md:w-[50%] h-fit flex justify-start md:justify-end items-center space-x-[2%]">
      <input
        type="number"
        name="phone"
        placeholder="Search by phone number"
        value={userFilter?.phone}
        onChange={handleFilterChange}
        className={`${
          isDarkMode
            ? "bg-neutral-black-dark text-neutral-gray-light"
            : "bg-neutral-white text-neutral-black-dark"
        } w-[50%] h-6 rounded shadow font-normal text-xs px-[2%] focus:outline-none placeholder:text-xs`}
      />
      <button className="filterApplyBtn" onClick={getUserByPhone}>
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

export default CustomerFilter;
