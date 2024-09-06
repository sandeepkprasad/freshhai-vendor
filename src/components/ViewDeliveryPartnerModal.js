import React, { useContext } from "react";
import { ProductsContext } from "../context/ProductsContext";
import { DeliveryContext } from "../context/DeliveryContext";

// Components Imports
import ModalWrapper from "./ModalWrapper";

const ViewDeliveryPartnerModal = React.memo(() => {
  const { isDarkMode } = useContext(ProductsContext);
  const { partnerToView, setPartnerToView, setIsPartnerModal } =
    useContext(DeliveryContext);

  const handleCloseDeliveryModal = () => {
    setPartnerToView(null);
    setIsPartnerModal(false);
  };

  const getCurrentLocation = () => {};

  return (
    <ModalWrapper closeModal={setIsPartnerModal}>
      <div className="w-full h-full flex flex-col justify-between items-center">
        <div className="w-full h-[90%] flex flex-col justify-start space-y-[2%] overflow-x-hidden overflow-y-scroll customScrollbar">
          <p
            className={`font-semibold text-sm ${
              isDarkMode ? "text-neutral-gray-light" : "text-neutral-black-dark"
            } text-center`}
          >
            {partnerToView?.name}
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
                  Name : {partnerToView?.name}
                </p>
                <p
                  className={`font-normal text-xs ${
                    isDarkMode
                      ? "text-neutral-gray-light"
                      : "text-neutral-black-dark"
                  }`}
                >
                  Contact : {partnerToView?.phone_number}
                </p>
                <p
                  className={`font-normal text-xs ${
                    isDarkMode
                      ? "text-neutral-gray-light"
                      : "text-neutral-black-dark"
                  }`}
                >
                  Email : {partnerToView?.email}
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
                  Vehicle Details :
                </p>
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
                  Vechile Number :{" "}
                  {partnerToView?.vehicle_details?.vehicle_number}
                </p>
                <p
                  className={`font-normal text-xs ${
                    isDarkMode
                      ? "text-neutral-gray-light"
                      : "text-neutral-black-dark"
                  }`}
                >
                  Licence Number :{" "}
                  {partnerToView?.vehicle_details?.license_number}
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
                  Active Status :{" "}
                  {partnerToView?.status?.active ? "Active" : "In-Active"}
                </p>
                <p
                  className={`font-normal text-xs ${
                    isDarkMode
                      ? "text-neutral-gray-light"
                      : "text-neutral-black-dark"
                  }`}
                >
                  Online Status :{" "}
                  {partnerToView?.status?.online_status ? "Online" : "Offline"}
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
                  Availability :
                </p>
                <p
                  className={`font-normal text-xs ${
                    isDarkMode
                      ? "text-neutral-gray-light"
                      : "text-neutral-black-dark"
                  }`}
                >
                  {partnerToView?.availability ? "Available" : "Not Available"}
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
                  Current Location :
                </p>
                <button className="filterApplyBtn" onClick={getCurrentLocation}>
                  Get Current Location
                </button>
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
                  Total Deliveries :
                </p>
                <p
                  className={`font-normal text-xs ${
                    isDarkMode
                      ? "text-neutral-gray-light"
                      : "text-neutral-black-dark"
                  }`}
                >
                  {partnerToView?.total_deliveries}
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
                  Order History :
                </p>
                {partnerToView?.order_history?.map((order, index) => (
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
            onClick={handleCloseDeliveryModal}
          >
            Close
          </button>
        </div>
      </div>
    </ModalWrapper>
  );
});

export default ViewDeliveryPartnerModal;
