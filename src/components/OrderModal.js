import React, { useContext, useState } from "react";
import adminContext from "../context/adminContext";
import { orderFilterData } from "../utils/LocalData";

// React Icons
import { MdPrint } from "../utils/Icons";

// Components Imports
import ModalWrapper from "./ModalWrapper";
import OrderText from "./customComponents/OrderText";

// Utils Imports
import { extractDateTime } from "../utils/DateUtils";

const OrderModal = () => {
  const {
    isDarkMode,
    setIsOrderModal,
    orderToUpdate,
    updateOrder,
    handlePrintOrder,
  } = useContext(adminContext);
  const [updatedOrder, setUpdatedOrder] = useState(orderToUpdate);

  const handleOrderChange = (e) => {
    const newStatus = e.target.value;

    setUpdatedOrder((prevState) => ({
      ...prevState,
      status: newStatus,
    }));
  };

  return (
    <ModalWrapper closeModal={setIsOrderModal}>
      <div className="w-full h-full flex flex-col justify-between items-center">
        <div className="w-full h-[90%] flex flex-col justify-start space-y-[1%] overflow-x-hidden overflow-y-scroll customScrollbar">
          <div className="w-full h-fit">
            <button
              title="Print Order"
              className={`text-xl ${
                isDarkMode
                  ? "text-neutral-gray-light"
                  : "text-neutral-black-dark"
              } active:scale-95 duration-300`}
              onClick={() => handlePrintOrder(updatedOrder)}
            >
              <MdPrint />
            </button>
          </div>
          <div className="w-full h-fit flex justify-between items-center">
            <OrderText text1="Order Id :" text2={updatedOrder?.orderId} />
            <select
              name="status"
              value={updatedOrder?.status}
              onChange={handleOrderChange}
              className={`w-fit h-fit ${
                isDarkMode ? "bg-neutral-black-dark" : "bg-neutral-white"
              } border rounded-3xl px-[1%] py-[0.5%] font-normal text-xs ${
                updatedOrder?.status === "Pending"
                  ? "text-secondary-orange-dark border-secondary-orange-dark"
                  : updatedOrder?.status === "Processing"
                  ? "text-primary-blue-dark border-primary-blue-dark"
                  : updatedOrder?.status === "Shipped"
                  ? "text-primary-green-dark border-primary-green-dark"
                  : updatedOrder?.status === "Out for Delivery"
                  ? "text-primary-green-dark border-primary-green-dark"
                  : updatedOrder?.status === "Delivered"
                  ? "text-primary-green-dark border-primary-green-dark"
                  : updatedOrder?.status === "Completed"
                  ? "text-primary-green-dark border-primary-green-dark"
                  : updatedOrder?.status === "Cancelled"
                  ? "text-secondary-red-dark border-secondary-red-dark"
                  : updatedOrder?.status === "Returned"
                  ? "text-secondary-orange-dark border-secondary-orange-dark"
                  : null
              } focus:outline-none active:scale-95 duration-300`}
            >
              {orderFilterData?.status?.map((status, index) => (
                <option value={status} key={index}>
                  {status}
                </option>
              ))}
            </select>
          </div>
          <OrderText text1="Customer Name :" text2={updatedOrder?.customerName} />
          <OrderText
            text1="Mobile Number :"
            text2={updatedOrder?.customerMobile}
          />
          <hr />
          <div className="w-full h-fit">
            <OrderText text1="Order Items :" />
            {updatedOrder?.items?.map((item, index) => (
              <div
                className="w-full h-fit flex justify-start items-center"
                key={index}
              >
                <span
                  className={`w-1/2 text-start font-medium text-base ${
                    isDarkMode
                      ? "text-neutral-gray-light"
                      : "text-neutral-black-dark"
                  } overflow-hidden`}
                >
                  {item.name}
                </span>
                <span
                  className={`flex-1 text-start font-medium text-base ${
                    isDarkMode
                      ? "text-neutral-gray-light"
                      : "text-neutral-black-dark"
                  } overflow-hidden`}
                >
                  {item.quantity}
                </span>
                <span
                  className={`flex-1 text-start font-medium text-base ${
                    isDarkMode
                      ? "text-neutral-gray-light"
                      : "text-neutral-black-dark"
                  } overflow-hidden`}
                >
                  ₹ {item.price}
                </span>
                <span
                  className={`flex-1 text-start font-medium text-base ${
                    isDarkMode
                      ? "text-neutral-gray-light"
                      : "text-neutral-black-dark"
                  } overflow-hidden`}
                >
                  ₹ {item.total}
                </span>
              </div>
            ))}
          </div>
          <div className="w-full h-fit flex justify-between items-center">
            <OrderText
              text1="Payment Method :"
              text2={updatedOrder?.paymentMethod}
            />
            <OrderText
              text1="Grand Total"
              text2={"₹" + " " + updatedOrder?.totalPrice}
            />
          </div>
          <hr />
          <div className="w-full h-fit flex justify-between items-center">
            <OrderText
              text1="Order Date :"
              text2={
                extractDateTime(updatedOrder?.orderDate).time +
                ", " +
                extractDateTime(updatedOrder?.orderDate).date
              }
            />
            <OrderText
              text1="Delivery Date :"
              text2={
                extractDateTime(updatedOrder?.deliveryDate).time +
                ", " +
                extractDateTime(updatedOrder?.deliveryDate).date
              }
            />
          </div>
          <div className="w-full h-fit">
            <OrderText text1="Delivery Address :" />
            <OrderText
              text2={
                updatedOrder?.deliveryAddress?.street +
                ", " +
                updatedOrder?.deliveryAddress?.city +
                ", " +
                updatedOrder?.deliveryAddress?.state +
                ", " +
                "PIN - " +
                updatedOrder?.deliveryAddress?.postalCode +
                ", " +
                updatedOrder?.deliveryAddress?.country
              }
            />
          </div>
        </div>
        <div className="w-full h-fit flex justify-center items-center">
          <button
            className="buttonClass bg-primary-blue-dark"
            onClick={() => updateOrder(updatedOrder)}
          >
            Update Order
          </button>
        </div>
      </div>
    </ModalWrapper>
  );
};

export default OrderModal;
