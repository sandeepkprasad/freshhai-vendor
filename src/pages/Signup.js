import React from "react";

// Components Imports
import SignupCard from "../components/SignupCard";

const Signup = () => {
  return (
    <div className="w-screen h-screen bg-neutral-gray-light flex flex-col justify-center items-center p-[2%] space-y-[1%] overflow-hidden">
      <div className="w-full h-fit flex justify-center items-center space-x-[3%] md:space-x-[1%]">
        <img
          src="/assets/freshhai.png"
          alt="freshhai_logo"
          className="w-[25%] md:w-[8%]"
        />
        <p className="font-semibold text-xl md:text-2xl text-neutral-black-dark">
          Admin Signup
        </p>
      </div>
      <div className="w-full md:w-[50%] h-[50%] md:h-[75%] bg-neutral-white border rounded-lg shadow p-[3%]">
        <SignupCard />
      </div>
    </div>
  );
};

export default Signup;
