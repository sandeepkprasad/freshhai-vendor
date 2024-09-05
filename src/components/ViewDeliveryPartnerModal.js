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
            <div className="w-[50%] h-full border-e space-y-[2%] overflow-x-hidden overflow-y-scroll customScrollbar"></div>
            <div className="w-[50%] h-full space-y-[2%] overflow-x-hidden overflow-y-scroll customScrollbar"></div>
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
