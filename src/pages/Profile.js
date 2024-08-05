import React, { useContext } from "react";
import adminContext from "../context/adminContext";

// Components Imports
import DashboardWrapper from "../components/DashboardWrapper";
import Heading from "../components/customComponents/Heading";

const Profile = () => {
  const { isDarkMode, adminProfile, setAdminProfile } =
    useContext(adminContext);

  return (
    <DashboardWrapper>
      <div className="w-full h-full flex justify-between items-center pb-[0.5%] space-x-[2%] overflow-hidden">
        <div className="w-[80%] h-full flex flex-col justify-between items-center">
          <div className="w-full h-fit flex justify-start items-center">
            <Heading heading="Profile" />
          </div>
          <div
            className={`w-full h-[90%] ${
              isDarkMode
                ? "bg-neutral-black-dark border border-neutral-black-dark"
                : "bg-neutral-white border"
            } flex flex-col justify-center items-center rounded-3xl shadow-md space-y-[1%] p-[1%]`}
          >
            <img
              src={adminProfile?.img}
              alt="admin_profile"
              className="w-[25%] bg-neutral-gray-light rounded-3xl shadow-md object-contain"
            />
            <p
              className={`font-medium text-2xl ${
                isDarkMode
                  ? "text-neutral-gray-light"
                  : "text-neutral-black-dark"
              }`}
            >
              {adminProfile?.firstName} {adminProfile?.lastName}
            </p>
            <p
              className={`font-normal text-lg ${
                isDarkMode
                  ? "text-neutral-gray-light"
                  : "text-neutral-black-dark"
              }`}
            >
              {adminProfile?.email}
            </p>
          </div>
        </div>
        <div className="w-[20%] h-full flex flex-col justify-between items-center"></div>
      </div>
    </DashboardWrapper>
  );
};

export default Profile;
