import React, { useContext } from "react";
import { ProductsContext } from "../context/ProductsContext";
import { UsersContext } from "../context/UsersContext";

// Components Imports
import ModalWrapper from "./ModalWrapper";

const UserModal = () => {
  const { isDarkMode } = useContext(ProductsContext);
  const { userToView, setUserToView, setIsUserModal } =
    useContext(UsersContext);

  const handleCloseUserModal = () => {
    setUserToView(null);
    setIsUserModal(false);
  };

  console.log("Single user data : ", userToView);
  return (
    <ModalWrapper closeModal={setIsUserModal}>
      <div className="w-full h-full flex flex-col justify-between items-center">
        <div className="w-full h-[90%] flex flex-col justify-start space-y-[1%]">
          <p
            className={`font-semibold text-sm ${
              isDarkMode ? "text-neutral-gray-light" : "text-neutral-black-dark"
            } text-center`}
          >
            {userToView?.basicInfo?.fullName}
          </p>
          <hr />
          <div className="w-full h-[95%] flex justify-center items-center space-x-[1%]">
            <div className="w-[50%] h-full border-e space-y-[2%] overflow-x-hidden overflow-y-scroll customScrollbar">
              <div className="w-full h-fit">
                <p
                  className={`font-semibold text-xs ${
                    isDarkMode
                      ? "text-neutral-gray-light"
                      : "text-neutral-black-dark"
                  } mb-[1%]`}
                >
                  Basic Info :
                </p>
                <p
                  className={`font-normal text-xs ${
                    isDarkMode
                      ? "text-neutral-gray-light"
                      : "text-neutral-black-dark"
                  }`}
                >
                  Name : {userToView?.basicInfo?.fullName}
                </p>
                <p
                  className={`font-normal text-xs ${
                    isDarkMode
                      ? "text-neutral-gray-light"
                      : "text-neutral-black-dark"
                  }`}
                >
                  Contact : {userToView?.basicInfo?.mobileNumber}
                </p>
                <p
                  className={`font-normal text-xs ${
                    isDarkMode
                      ? "text-neutral-gray-light"
                      : "text-neutral-black-dark"
                  }`}
                >
                  Email : {userToView?.basicInfo?.email}
                </p>
                <p
                  className={`font-normal text-xs ${
                    isDarkMode
                      ? "text-neutral-gray-light"
                      : "text-neutral-black-dark"
                  }`}
                >
                  DOB : {userToView?.basicInfo?.dateOfBirth}
                </p>
              </div>
              <div className="w-full h-fit">
                <p
                  className={`font-semibold text-xs ${
                    isDarkMode
                      ? "text-neutral-gray-light"
                      : "text-neutral-black-dark"
                  } mb-[1%]`}
                >
                  Addresses :
                </p>
                {userToView?.addresses?.map((address, index) => (
                  <div className="w-full h-fit mb-[1%]" key={index}>
                    <p
                      className={`font-normal text-xs ${
                        isDarkMode
                          ? "text-neutral-gray-light"
                          : "text-neutral-black-dark"
                      }`}
                    >
                      Type : {address?.type}
                    </p>
                    <p
                      className={`font-normal text-xs ${
                        isDarkMode
                          ? "text-neutral-gray-light"
                          : "text-neutral-black-dark"
                      }`}
                    >
                      Address : {address?.addressLine1}, {address?.addressLine2}
                      , {address?.city}, {address?.state}, {address?.pincode}
                    </p>
                    <p
                      className={`font-normal text-xs ${
                        isDarkMode
                          ? "text-neutral-gray-light"
                          : "text-neutral-black-dark"
                      }`}
                    >
                      Landmark : {address?.landmark}
                    </p>
                  </div>
                ))}
              </div>
              <div className="w-full h-fit">
                <p
                  className={`font-semibold text-xs ${
                    isDarkMode
                      ? "text-neutral-gray-light"
                      : "text-neutral-black-dark"
                  } mb-[1%]`}
                >
                  Wallet :
                </p>
                <p
                  className={`font-normal text-xs ${
                    isDarkMode
                      ? "text-neutral-gray-light"
                      : "text-neutral-black-dark"
                  }`}
                >
                  Balance : ₹{userToView?.wallet?.balance}{" "}
                  {userToView?.wallet?.currency}
                </p>
              </div>
              <div className="w-full h-fit">
                <p
                  className={`font-semibold text-xs ${
                    isDarkMode
                      ? "text-neutral-gray-light"
                      : "text-neutral-black-dark"
                  } mb-[1%]`}
                >
                  Status :
                </p>
                <p
                  className={`font-normal text-xs ${
                    isDarkMode
                      ? "text-neutral-gray-light"
                      : "text-neutral-black-dark"
                  }`}
                >
                  {userToView?.userStatus}
                </p>
              </div>
            </div>
            <div className="w-[50%] h-full space-y-[2%] overflow-x-hidden overflow-y-scroll customScrollbar">
              <div className="w-full h-fit">
                <p
                  className={`font-semibold text-xs ${
                    isDarkMode
                      ? "text-neutral-gray-light"
                      : "text-neutral-black-dark"
                  } mb-[1%]`}
                >
                  Total Orders :
                </p>
                <p
                  className={`font-normal text-xs ${
                    isDarkMode
                      ? "text-neutral-gray-light"
                      : "text-neutral-black-dark"
                  }`}
                >
                  {userToView?.orderReferences?.length}
                </p>
              </div>
              <div className="w-full h-fit">
                <p
                  className={`font-semibold text-xs ${
                    isDarkMode
                      ? "text-neutral-gray-light"
                      : "text-neutral-black-dark"
                  } mb-[1%]`}
                >
                  Orders :
                </p>
                {userToView?.orderReferences?.map((order, index) => (
                  <p
                    className={`font-normal text-xs ${
                      isDarkMode
                        ? "text-neutral-gray-light"
                        : "text-neutral-black-dark"
                    }`}
                    key={index}
                  >
                    {order}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="w-full h-fit flex justify-center items-center">
          <button
            className="buttonClass bg-primary-blue-dark"
            onClick={handleCloseUserModal}
          >
            Close
          </button>
        </div>
      </div>
    </ModalWrapper>
  );
};

export default UserModal;
