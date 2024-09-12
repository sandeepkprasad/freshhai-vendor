import React, { useContext, useState } from "react";
import { ProductsContext } from "../context/ProductsContext";
import { DeliveryContext } from "../context/DeliveryContext";

// React Icons
import {
  MdPerson,
  MdPhone,
  MdEmail,
  FaAddressCard,
  MdExitToApp,
  MdContentCopy,
} from "../utils/Icons";

// Components Imports
import ModalWrapper from "./ModalWrapper";

const ViewDeliveryPartnerModal = React.memo(() => {
  const { isDarkMode, handleNotification } = useContext(ProductsContext);
  const { partnerToView, setPartnerToView, setIsPartnerModal } =
    useContext(DeliveryContext);
  const [selectedOption, setSelectedOption] = useState(0);

  const handleCloseDeliveryModal = () => {
    setPartnerToView(null);
    setIsPartnerModal(false);
  };

  const getCurrentLocation = (latitude, longitude) => {
    alert(latitude, longitude);
  };

  const handleCopyAgentId = (agentId) => {
    navigator.clipboard
      .writeText(agentId)
      .then(() => {
        handleNotification(
          true,
          "green",
          "Agent ID copied to clipboard successfully!"
        );
      })
      .catch((err) => {
        handleNotification(true, "red", "Failed to copy agent ID");
        console.error("Failed to copy agent ID:", err);
      });
  };

  return (
    <ModalWrapper heading={partnerToView?.name} closeModal={setIsPartnerModal}>
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
              <MdPerson /> <span>{partnerToView?.name}</span>
            </p>
            <p
              className={`font-semibold text-sm ${
                isDarkMode
                  ? "text-neutral-gray-light"
                  : "text-neutral-black-dark"
              } flex items-center space-x-[2%]`}
            >
              <MdPhone /> <span>{partnerToView?.phone_number}</span>
            </p>
            <p
              className={`font-semibold text-sm ${
                isDarkMode
                  ? "text-neutral-gray-light"
                  : "text-neutral-black-dark"
              } flex items-center space-x-[2%]`}
            >
              <MdEmail /> <span>{partnerToView?.email}</span>
            </p>
            <p
              className={`font-semibold text-sm ${
                isDarkMode
                  ? "text-neutral-gray-light"
                  : "text-neutral-black-dark"
              } flex items-center space-x-[2%]`}
            >
              <FaAddressCard />{" "}
              <span
                className={`font-normal text-xs ${
                  isDarkMode
                    ? "text-neutral-gray-light"
                    : "text-neutral-black-dark"
                }`}
              >
                Copy Id
              </span>{" "}
              <button
                className="active:scale-95 duration-300"
                title="Copy delivery agent id"
                onClick={() => handleCopyAgentId(partnerToView?.id)}
              >
                <MdContentCopy />
              </button>
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
              Order history
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
              Vehicle details
            </button>
          </div>
          {selectedOption === 0 && (
            <div className="w-full h-[66%] md:h-[50%] space-y-[5%] mb-[2%] overflow-x-hidden overflow-y-scroll customScrollbar">
              {partnerToView?.order_history.map((item, index) => (
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
              <div className="w-full h-fit space-y-[2%]">
                <p
                  className={`font-normal text-xs ${
                    isDarkMode
                      ? "text-neutral-gray-light"
                      : "text-neutral-black-dark"
                  }`}
                >
                  Vehicle Type : {partnerToView?.vehicle_details?.vehicle_type}
                </p>
                <p
                  className={`font-normal text-xs ${
                    isDarkMode
                      ? "text-neutral-gray-light"
                      : "text-neutral-black-dark"
                  }`}
                >
                  Vehicle Number :{" "}
                  {partnerToView?.vehicle_details?.vehicle_number}
                </p>
                <p
                  className={`font-normal text-xs ${
                    isDarkMode
                      ? "text-neutral-gray-light"
                      : "text-neutral-black-dark"
                  }`}
                >
                  License Number :{" "}
                  {partnerToView?.vehicle_details?.license_number}
                </p>
              </div>
              <button
                className="font-normal text-xs text-blue-500 underline active:scale-95 duration-300"
                onClick={() =>
                  getCurrentLocation(
                    partnerToView?.current_location?.latitude,
                    partnerToView?.current_location?.longitude
                  )
                }
              >
                See location on map
              </button>
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
                Total Deliveries :
              </span>
              <span
                className={`font-bold text-sm ${
                  isDarkMode
                    ? "text-neutral-gray-light"
                    : "text-neutral-black-dark"
                }`}
              >
                {partnerToView?.total_deliveries}
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
                Total Earnings :
              </span>
              <span
                className={`font-bold text-sm ${
                  isDarkMode
                    ? "text-neutral-gray-light"
                    : "text-neutral-black-dark"
                }`}
              >
                ₹{partnerToView?.earnings?.total_earnings}
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
                Availability :
              </span>
              <span
                className={`font-semibold text-sm ${
                  partnerToView?.availability
                    ? "text-primary-green-dark"
                    : "text-secondary-red-dark"
                }`}
              >
                {partnerToView?.availability ? "Available" : "Unavailable"}
              </span>
            </div>
          </div>
        </div>
        <div className="w-full h-[5%] flex justify-center items-center border-t">
          <button
            className={`font-semibold text-sm flex items-center space-x-1 ${
              isDarkMode ? "text-neutral-gray-light" : "text-neutral-black-dark"
            } active:scale-95 duration-300`}
            onClick={handleCloseDeliveryModal}
          >
            <MdExitToApp /> <span>Close</span>
          </button>
        </div>
      </div>
    </ModalWrapper>
  );
});

export default ViewDeliveryPartnerModal;
