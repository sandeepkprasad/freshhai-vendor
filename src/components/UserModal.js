import React, { useContext, useState } from "react";
import { ProductsContext } from "../context/ProductsContext";
import { UsersContext } from "../context/UsersContext";
import { formatDate } from "../utils/DateUtils";

// React Icons
import {
  MdPerson,
  MdPhone,
  MdEmail,
  MdDateRange,
  MdExitToApp,
} from "../utils/Icons";

// Components Imports
import ModalWrapper from "./ModalWrapper";

const UserModal = () => {
  const { isDarkMode } = useContext(ProductsContext);
  const { userToView, setUserToView, setIsUserModal } =
    useContext(UsersContext);
  const [selectedOption, setSelectedOption] = useState(0);

  const handleCloseUserModal = () => {
    setUserToView(null);
    setIsUserModal(false);
  };

  const getCurrentLocation = (latitude, longitude) => {
    alert(latitude, longitude);
  };

  return (
    <ModalWrapper
      heading={userToView?.basicInfo?.fullName}
      closeModal={setIsUserModal}
    >
      <div className="w-full h-full flex flex-col justify-between items-center">
        <div className="w-full h-[95%] p-[5%]">
          <div className="w-full h-fit space-y-[2%] mb-[5%]">
            <p
              className={`font-semibold text-sm ${
                isDarkMode
                  ? "text-neutral-gray-light"
                  : "text-neutral-black-dark"
              } flex items-center space-x-[2%]`}
            >
              <MdPerson /> <span>{userToView?.basicInfo?.fullName}</span>
            </p>
            <p
              className={`font-semibold text-sm ${
                isDarkMode
                  ? "text-neutral-gray-light"
                  : "text-neutral-black-dark"
              } flex items-center space-x-[2%]`}
            >
              <MdPhone /> <span>{userToView?.basicInfo?.mobileNumber}</span>
            </p>
            <p
              className={`font-semibold text-sm ${
                isDarkMode
                  ? "text-neutral-gray-light"
                  : "text-neutral-black-dark"
              } flex items-center space-x-[2%]`}
            >
              <MdEmail /> <span>{userToView?.basicInfo?.email}</span>
            </p>
            <p
              className={`font-semibold text-sm ${
                isDarkMode
                  ? "text-neutral-gray-light"
                  : "text-neutral-black-dark"
              } flex items-center space-x-[2%]`}
            >
              <MdDateRange />{" "}
              <span>{formatDate(userToView?.basicInfo?.dateOfBirth)}</span>
            </p>
          </div>
          <div className="w-full h-fit flex justify-start items-center space-x-[5%] border-b mb-[2%]">
            <button
              className={`${
                selectedOption === 0
                  ? "font-semibold border-b-2 border-primary-blue-dark"
                  : "font-normal"
              } text-xs ${
                isDarkMode
                  ? "text-neutral-gray-light"
                  : "text-neutral-black-dark"
              }`}
              onClick={() => setSelectedOption(0)}
            >
              All orders
            </button>
            <button
              className={`${
                selectedOption === 1
                  ? "font-semibold border-b-2 border-primary-blue-dark"
                  : "font-normal"
              } text-xs ${
                isDarkMode
                  ? "text-neutral-gray-light"
                  : "text-neutral-black-dark"
              }`}
              onClick={() => setSelectedOption(1)}
            >
              Addresses
            </button>
          </div>
          {selectedOption === 0 && (
            <div className="w-full h-[66%] md:h-[50%] space-y-[5%] mb-[2%] overflow-x-hidden overflow-y-scroll customScrollbar">
              {userToView?.orderReferences.map((item, index) => (
                <div
                  className="w-full h-fit flex justify-start items-start space-x-[2%]"
                  key={index}
                >
                  <p
                    className={`font-normal text-xs ${
                      isDarkMode
                        ? "text-neutral-gray-light"
                        : "text-neutral-black-dark"
                    }`}
                  >
                    {item}
                  </p>
                  {/** <img
                    src={item?.image_url}
                    alt="product_img"
                    onError={(e) =>
                      (e.target.src = "/assets/image_not_found.jpeg")
                    }
                    loading="lazy"
                    className="w-[12.5%] bg-neutral-gray-light rounded object-contain"
                  />
                  <div className="w-[87.5%] h-fit space-y-[1%]">
                    <p
                      className={`font-normal text-xs ${
                        isDarkMode
                          ? "text-neutral-gray-light"
                          : "text-neutral-black-dark"
                      }`}
                    >
                      {item?.name}
                    </p>
                    <p
                      className={`font-normal text-xs ${
                        isDarkMode
                          ? "text-neutral-gray-light"
                          : "text-neutral-black-dark"
                      }`}
                    >
                      {item?.category}
                    </p>
                    <p
                      className={`font-normal text-xs ${
                        isDarkMode
                          ? "text-neutral-gray-light"
                          : "text-neutral-black-dark"
                      }`}
                    >
                      {item?.weight}
                    </p>
                    <p
                      className={`font-bold text-xs ${
                        isDarkMode
                          ? "text-neutral-gray-light"
                          : "text-neutral-black-dark"
                      }`}
                    >
                      <span>{item?.quantity}</span> x{" "}
                      <span>₹{item?.price}</span>
                    </p>
                  </div> */}
                </div>
              ))}
            </div>
          )}
          {selectedOption === 1 && (
            <div className="w-full h-[66%] md:h-[50%] space-y-[5%] mb-[2%] overflow-x-hidden overflow-y-scroll customScrollbar">
              {userToView?.addresses?.map((address, index) => (
                <div className="w-full h-fit space-y-[2%]" key={index}>
                  <p
                    className={`font-normal text-xs ${
                      isDarkMode
                        ? "text-neutral-gray-light"
                        : "text-neutral-black-dark"
                    }`}
                  >
                    {address?.type}
                  </p>
                  <p
                    className={`font-normal text-xs ${
                      isDarkMode
                        ? "text-neutral-gray-light"
                        : "text-neutral-black-dark"
                    }`}
                  >
                    {address?.addressLine1}, {address?.addressLine2},{" "}
                    {address?.city}, {address?.state}, {address?.pincode}
                  </p>
                  <p
                    className={`font-normal text-xs ${
                      isDarkMode
                        ? "text-neutral-gray-light"
                        : "text-neutral-black-dark"
                    }`}
                  >
                    {address?.landmark}
                  </p>
                  <button
                    className="font-normal text-xs text-blue-500 underline active:scale-95 duration-300"
                    onClick={() =>
                      getCurrentLocation(
                        address?.location?.latitude,
                        address?.location?.longitude
                      )
                    }
                  >
                    See location on map
                  </button>
                </div>
              ))}
            </div>
          )}
          <div className="w-full h-fit space-y-[2%]">
            <div className="w-full h-fit flex justify-between items-center">
              <span
                className={`font-normal text-xs ${
                  isDarkMode
                    ? "text-neutral-gray-light"
                    : "text-neutral-black-dark"
                }`}
              >
                Wallet Balance :
              </span>
              <span
                className={`font-bold text-sm ${
                  isDarkMode
                    ? "text-neutral-gray-light"
                    : "text-neutral-black-dark"
                }`}
              >
                ₹{userToView?.wallet?.balance}
              </span>
            </div>
            <div className="w-full h-fit flex justify-between items-center">
              <span
                className={`font-normal text-xs ${
                  isDarkMode
                    ? "text-neutral-gray-light"
                    : "text-neutral-black-dark"
                }`}
              >
                Status :
              </span>
              <span
                className={`font-semibold text-sm ${
                  userToView?.userStatus === "active"
                    ? "text-primary-green-dark"
                    : "text-secondary-red-dark"
                }`}
              >
                {userToView?.userStatus === "active" ? "Active" : "In-Active"}
              </span>
            </div>
          </div>
        </div>
        <div className="w-full h-[5%] flex justify-center items-center border-t">
          <button
            className={`font-semibold text-sm flex items-center space-x-1 ${
              isDarkMode ? "text-neutral-gray-light" : "text-neutral-black-dark"
            } active:scale-95 duration-300`}
            onClick={handleCloseUserModal}
          >
            <MdExitToApp /> <span>Close</span>
          </button>
        </div>
      </div>
    </ModalWrapper>
  );
};

export default UserModal;
