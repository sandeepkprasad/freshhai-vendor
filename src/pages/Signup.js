import React from "react";

// Components Imports
import SignupCard from "../components/SignupCard";

const Signup = () => {
  return (
    <div className="w-screen h-screen bg-neutral-gray-light flex flex-col justify-center items-center p-[2%] space-y-[1%] overflow-hidden">
      <div className="w-full h-fit flex justify-center items-center space-x-[1%]">
        <img
          src="/assets/freshhai.png"
          alt="freshhai_logo"
          className="w-[8%]"
        />
        <p className="font-semibold text-2xl text-neutral-black-dark">
          Admin Signup
        </p>
      </div>
      <div className="w-[50%] h-[75%] bg-neutral-white border rounded-3xl shadow-md">
        <SignupCard />
      </div>
    </div>
  );
};

export default Signup;
