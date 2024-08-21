import React, { useContext } from "react";
import adminContext from "../context/adminContext";

// Components Imports
import ModalWrapper from "./ModalWrapper";

const ViewDeliveryPartnerModal = React.memo(() => {
  const { isDarkMode, viewDeliveryPartner, setIsViewDeliveryPartnerModal } =
    useContext(adminContext);

  console.log("View Delivery Partner : ", viewDeliveryPartner);

  return (
    <ModalWrapper closeModal={setIsViewDeliveryPartnerModal}>
      <div className="w-full h-full flex flex-col justify-between items-center">
        <div className="w-full h-[90%] flex flex-col justify-start space-y-[2%] overflow-x-hidden overflow-y-scroll customScrollbar">
          <p
            className={`font-semibold text-lg ${
              isDarkMode ? "text-neutral-gray-light" : "text-neutral-black-dark"
            }`}
          >
            {viewDeliveryPartner?.name}
          </p>
          <hr />
        </div>
        <div className="w-full h-fit flex justify-center items-center">
          <button
            className="buttonClass bg-primary-blue-dark"
            onClick={() => setIsViewDeliveryPartnerModal(false)}
          >
            Close
          </button>
        </div>
      </div>
    </ModalWrapper>
  );
});

export default ViewDeliveryPartnerModal;
