import React, { useContext, useState } from "react";
import { ProductsContext } from "../context/ProductsContext";
import { OrdersContext } from "../context/OrdersContext";
import { orderFilterData } from "../utils/LocalData";

// React Icons
import { MdPrint } from "../utils/Icons";

// Components Imports
import ModalWrapper from "./ModalWrapper";
import OrderText from "./customComponents/OrderText";

// Utils Imports
import { extractDateTime } from "../utils/DateUtils";

const OrderModal = () => {
  const { isDarkMode } = useContext(ProductsContext);
  const {
    setIsOrderModal,
    orderToUpdate,
    setOrderToUpdate,
    updateOrder,
    handlePrintOrder,
  } = useContext(OrdersContext);

  const handleOrderChange = (e) => {
    const newStatus = e.target.value;

    setOrderToUpdate((prevState) => ({
      ...prevState,
      status: newStatus,
    }));
  };

  return (
    <ModalWrapper closeModal={setIsOrderModal}>
      <div className="w-full h-full flex flex-col justify-between items-center">
        <div className="w-full h-[90%] flex flex-col justify-start space-y-[1%]">
          <div className="w-full h-fit flex justify-between items-center">
            <button
              title="Print Order"
              className={`text-xl ${
                isDarkMode
                  ? "text-neutral-gray-light"
                  : "text-neutral-black-dark"
              } active:scale-95 duration-300`}
              onClick={() => handlePrintOrder(orderToUpdate)}
            >
              <MdPrint />
            </button>
            <p
              className={`font-semibold text-xs ${
                isDarkMode
                  ? "text-neutral-gray-light"
                  : "text-neutral-black-dark"
              } text-center`}
            >
              {"ODR" + orderToUpdate?.id.toUpperCase()}
            </p>
            <div></div>
          </div>
          <hr />
          <div className="w-full h-[95%] bg-black overflow-x-hidden overflow-y-scroll customScrollbar"></div>
        </div>
        <div className="w-full h-fit flex justify-center items-center">
          <button
            className="buttonClass bg-primary-blue-dark"
            onClick={() => updateOrder(orderToUpdate)}
          >
            Update Order
          </button>
        </div>
      </div>
    </ModalWrapper>
  );
};

export default OrderModal;
