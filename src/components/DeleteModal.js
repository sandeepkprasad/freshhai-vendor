import React, { useContext } from "react";
import adminContext from "../context/adminContext";

const DeleteModal = () => {
  const { isDarkMode, deleteProductById, setIsDeleteModal } =
    useContext(adminContext);

  return (
    <div className="w-screen h-screen bg-neutral-black-dark/50 flex justify-center items-center fixed left-0 top-0 right-0 bottom-0 z-50">
      <div
        className={`w-[25%] h-[20%] ${
          isDarkMode ? "bg-neutral-black-dark" : "bg-neutral-white"
        } rounded-3xl shadow-md p-[0.5%] animate-slideTopToBottom`}
      >
        <div className="w-full h-full flex flex-col justify-between items-center">
          <div className="w-full h-[70%] flex justify-center items-center">
            <p
              className={`font-semibold text-base ${
                isDarkMode
                  ? "text-neutral-gray-light"
                  : "text-neutral-black-dark"
              } text-center`}
            >
              Are you sure you want to delete this item? This action cannot be
              undone.
            </p>
          </div>
          <div className="w-full h-fit flex justify-evenly items-center">
            <button
              className="buttonClass bg-secondary-red-dark"
              onClick={deleteProductById}
            >
              Delete
            </button>
            <button
              className="buttonClass bg-primary-blue-dark"
              onClick={() => setIsDeleteModal(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
