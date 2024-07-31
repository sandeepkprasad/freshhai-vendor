import React, { useContext, useState } from "react";
import adminContext from "../context/adminContext";

// Components Imports
import Toggle from "./customComponents/Toggle";

const UserModal = () => {
  const { isDarkMode, userToUpdate, updateUser, setIsUserModal } =
    useContext(adminContext);
  const [updatedUser, setUpdatedUser] = useState(userToUpdate);

  const handleUserBlock = () => {
    setUpdatedUser((prevUser) => ({
      ...prevUser,
      isBlocked: !prevUser.isBlocked,
    }));
  };

  return (
    <div className="w-screen h-screen bg-neutral-black-dark/50 flex justify-center items-center fixed left-0 top-0 right-0 bottom-0 z-50">
      <div
        className={`w-[25%] h-[20%] ${
          isDarkMode ? "bg-neutral-black-dark" : "bg-neutral-white"
        } rounded-3xl shadow-md p-[0.5%] animate-slideTopToBottom`}
      >
        <div className="w-full h-full flex flex-col justify-between items-center">
          <div className="w-full h-[70%] flex flex-col justify-center items-center space-y-[5%]">
            <p
              className={`font-semibold text-base ${
                isDarkMode
                  ? "text-neutral-gray-light"
                  : "text-neutral-black-dark"
              } text-center`}
            >
              Want to block this user?
            </p>
            <Toggle
              data={updatedUser?.isBlocked}
              toggleClick={handleUserBlock}
            />
          </div>
          <div className="w-full h-fit flex justify-evenly items-center">
            <button
              className="buttonClass bg-secondary-red-dark"
              onClick={() => updateUser(updatedUser)}
            >
              Done
            </button>
            <button
              className="buttonClass bg-primary-blue-dark"
              onClick={() => setIsUserModal(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserModal;
