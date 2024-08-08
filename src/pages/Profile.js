import React, { useContext, useState, useRef } from "react";
import adminContext from "../context/adminContext";

// React Icons
import { MdEdit } from "../utils/Icons";

// Components Imports
import DashboardWrapper from "../components/DashboardWrapper";
import Heading from "../components/customComponents/Heading";

const Profile = () => {
  const { isDarkMode, adminProfile, setAdminProfile } =
    useContext(adminContext);
  const [isProfileUpdate, setProfileUpdate] = useState(false);
  const fileInputRef = useRef(null);

  const handleImageUpload = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleProfileUpdate = () => {
    setProfileUpdate((prev) => !prev);
  };

  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setAdminProfile((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      console.log("Selected image file:", file);
    }
  };

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
            } flex flex-col justify-between items-center rounded-3xl shadow-md space-y-[1%] p-[1%]`}
          >
            <div className="w-full h-fit flex justify-end items-center">
              {isProfileUpdate ? (
                <button
                  className="buttonClass bg-primary-blue-dark"
                  onClick={handleProfileUpdate}
                >
                  Save
                </button>
              ) : (
                <button
                  className="buttonClass bg-primary-blue-dark"
                  onClick={handleProfileUpdate}
                >
                  Edit
                </button>
              )}
            </div>
            <div className="w-full h-[95%] flex flex-col justify-center items-center">
              {isProfileUpdate ? (
                <div className="w-[25%] h-fit flex justify-center items-center mb-[1%] relative">
                  <img
                    src={adminProfile?.img}
                    alt="admin_profile"
                    className="w-full bg-neutral-gray-light rounded-3xl object-contain"
                  />
                  <button
                    className="text-base text-neutral-black-dark border border-neutral-black-dark rounded-full p-[0.5%] active:scale-95 duration-300 absolute top-0 right-0"
                    onClick={handleImageUpload}
                  >
                    <MdEdit />
                  </button>
                  <input
                    type="file"
                    ref={fileInputRef}
                    style={{ display: "none" }}
                    onChange={handleImageChange}
                  />
                </div>
              ) : (
                <img
                  src={adminProfile?.img}
                  alt="admin_profile"
                  className="w-[25%] bg-neutral-gray-light rounded-3xl object-contain"
                />
              )}
              {isProfileUpdate ? (
                <input
                  type="text"
                  placeholder="Full Name"
                  name="name"
                  value={adminProfile.name}
                  onChange={handleProfileChange}
                  maxLength={25}
                  className={`w-[33%] ${
                    isDarkMode ? "inputClassDark" : "inputClassLight"
                  }`}
                />
              ) : (
                <p
                  className={`font-medium text-2xl ${
                    isDarkMode
                      ? "text-neutral-gray-light"
                      : "text-neutral-black-dark"
                  }`}
                >
                  {adminProfile?.name}
                </p>
              )}
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
        </div>
        <div className="w-[20%] h-full flex flex-col justify-between items-center"></div>
      </div>
    </DashboardWrapper>
  );
};

export default Profile;
