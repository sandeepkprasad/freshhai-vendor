import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="w-screen h-screen bg-neutral-gray-light flex flex-col justify-center items-center space-y-[1%]">
      <img
        src="/assets/pageNotFound.jpeg"
        alt="page_not_found"
        className="w-[20%] rounded-xl"
      />
      <Link to="/" className="font-semibold text-xl text-neutral-black-dark active:scale-95 duration-300">
        Go to Home
      </Link>
    </div>
  );
};

export default NotFound;
