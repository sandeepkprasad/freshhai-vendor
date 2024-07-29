import React from "react";

// React Icons
import { FaFishFins } from "../../utils/Icons";

const Toggle = ({ data = false, toggleClick = "" }) => {
  return (
    <button
      className={`w-fit h-fit ${
        data ? "bg-primary-green-medium" : "bg-secondary-red-dark"
      } border rounded-3xl px-2 py-0.5 duration-300`}
      onClick={toggleClick}
    >
      {data ? (
        <div className="flex items-center space-x-1">
          <span className="font-semibold text-sm text-neutral-white">Yes</span>
          <FaFishFins className="text-base text-neutral-white" />
        </div>
      ) : (
        <div className="flex items-center space-x-1">
          <FaFishFins className="text-base text-neutral-white" />
          <span className="font-semibold text-sm text-neutral-white">No</span>
        </div>
      )}
    </button>
  );
};

export default Toggle;
