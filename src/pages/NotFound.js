import React from "react";
import { Link } from "react-router-dom";
import { defaultImageAssets } from "../utils/LocalData";

const NotFound = () => {
  return (
    <div className="w-screen h-screen bg-neutral-gray-light flex flex-col justify-center items-center space-y-[1%]">
      <img
        src={defaultImageAssets?.pageNotFoundImageUrl}
        alt="page_not_found"
        className="w-[50%] md:w-[20%] rounded-lg"
      />
      <Link
        to="/"
        className="font-semibold text-xl text-neutral-black-dark underline active:scale-95 duration-300"
      >
        Go to Home
      </Link>
    </div>
  );
};

export default NotFound;
