import React from "react";

const Toggle = ({ data = false, toggleClick = "" }) => {
  return (
    <button
      className={`w-fit h-fit flex justify-center items-center ${
        data ? "bg-primary-green-medium" : "bg-secondary-red-dark"
      } border rounded-3xl px-2 py-0.5 duration-300`}
      onClick={toggleClick}
    >
      {data ? (
        <span className="font-semibold text-xs text-neutral-white">Yes</span>
      ) : (
        <span className="font-semibold text-xs text-neutral-white">No</span>
      )}
    </button>
  );
};

export default Toggle;
