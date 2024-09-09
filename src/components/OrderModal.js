import React, { useContext } from "react";
import { ProductsContext } from "../context/ProductsContext";
import { OrdersContext } from "../context/OrdersContext";
//import { orderFilterData } from "../utils/LocalData";

// React Icons
import { MdPrint } from "../utils/Icons";

// Components Imports
import ModalWrapper from "./ModalWrapper";
//import OrderText from "./customComponents/OrderText";

// Utils Imports
//import { extractDateTime } from "../utils/DateUtils";

const OrderModal = () => {
  const { isDarkMode } = useContext(ProductsContext);
  const {
    setIsOrderModal,
    orderToUpdate,
    //setOrderToUpdate,
    updateOrder,
    handlePrintOrder,
  } = useContext(OrdersContext);

  const getCurrentLocation = () => {};

  return (
    <ModalWrapper closeModal={setIsOrderModal}>
      <div className="w-full h-full flex flex-col justify-between items-center">
        <div className="w-full h-[90%] flex flex-col justify-start space-y-[1%]">
          <div className="w-full h-fit flex justify-between items-center">
            <button
              title="Print Order"
              className={`text-2xl md:text-xl ${
                isDarkMode
                  ? "text-neutral-gray-light"
                  : "text-neutral-black-dark"
              } active:scale-95 duration-300`}
              onClick={() => handlePrintOrder(orderToUpdate)}
            >
              <MdPrint />
            </button>
            <p
              className={`font-semibold text-sm md:text-xs ${
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
                  Items :
                </p>
                {orderToUpdate?.order_items?.map((item, index) => (
                  <div className="w-full h-fit mb-[1%]" key={index}>
                    <p
                      className={`font-semibold text-xs ${
                        isDarkMode
                          ? "text-neutral-gray-light"
                          : "text-neutral-black-dark"
                      }`}
                    >
                      Item {index + 1} :
                    </p>
                    <p
                      className={`font-normal text-xs ${
                        isDarkMode
                          ? "text-neutral-gray-light"
                          : "text-neutral-black-dark"
                      }`}
                    >
                      Name : {item?.name}
                    </p>
                    <p
                      className={`font-normal text-xs ${
                        isDarkMode
                          ? "text-neutral-gray-light"
                          : "text-neutral-black-dark"
                      }`}
                    >
                      Quantity : {item?.quantity}
                    </p>
                    <p
                      className={`font-normal text-xs ${
                        isDarkMode
                          ? "text-neutral-gray-light"
                          : "text-neutral-black-dark"
                      }`}
                    >
                      Price : ₹{item?.price}
                    </p>
                    <p
                      className={`font-normal text-xs ${
                        isDarkMode
                          ? "text-neutral-gray-light"
                          : "text-neutral-black-dark"
                      }`}
                    >
                      Weight : {item?.weight}
                    </p>
                    <p
                      className={`font-normal text-xs ${
                        isDarkMode
                          ? "text-neutral-gray-light"
                          : "text-neutral-black-dark"
                      }`}
                    >
                      Category : {item?.category}
                    </p>
                  </div>
                ))}
              </div>
            </div>
            <div className="w-[50%] h-full space-y-[2%] overflow-x-hidden overflow-y-scroll customScrollbar">
              <div className="w-full h-fit">
                <p
                  className={`font-semibold text-xs ${
                    isDarkMode
                      ? "text-neutral-gray-light"
                      : "text-neutral-black-dark"
                  }`}
                >
                  Payment :
                </p>
                <p
                  className={`font-normal text-xs ${
                    isDarkMode
                      ? "text-neutral-gray-light"
                      : "text-neutral-black-dark"
                  }`}
                >
                  Payment Status : {orderToUpdate?.payment_status}
                </p>
                <p
                  className={`font-normal text-xs ${
                    isDarkMode
                      ? "text-neutral-gray-light"
                      : "text-neutral-black-dark"
                  }`}
                >
                  Payment Method : {orderToUpdate?.payment_method}
                </p>
              </div>
              <div className="w-full h-fit">
                <p
                  className={`font-semibold text-xs ${
                    isDarkMode
                      ? "text-neutral-gray-light"
                      : "text-neutral-black-dark"
                  }`}
                >
                  Amount :
                </p>
                <p
                  className={`font-normal text-xs ${
                    isDarkMode
                      ? "text-neutral-gray-light"
                      : "text-neutral-black-dark"
                  }`}
                >
                  Total : ₹{orderToUpdate?.total_amount}
                </p>
                <p
                  className={`font-normal text-xs ${
                    isDarkMode
                      ? "text-neutral-gray-light"
                      : "text-neutral-black-dark"
                  }`}
                >
                  Discount : ₹{orderToUpdate?.discount}
                </p>
                <p
                  className={`font-normal text-xs ${
                    isDarkMode
                      ? "text-neutral-gray-light"
                      : "text-neutral-black-dark"
                  }`}
                >
                  Delivery Charges : ₹{orderToUpdate?.delivery_charges}
                </p>
                <p
                  className={`font-normal text-xs ${
                    isDarkMode
                      ? "text-neutral-gray-light"
                      : "text-neutral-black-dark"
                  }`}
                >
                  Net Amount : ₹{orderToUpdate?.net_amount}
                </p>
              </div>
              <div className="w-full h-fit">
                <p
                  className={`font-semibold text-xs ${
                    isDarkMode
                      ? "text-neutral-gray-light"
                      : "text-neutral-black-dark"
                  }`}
                >
                  Delivery Address :
                </p>
                <p
                  className={`font-normal text-xs ${
                    isDarkMode
                      ? "text-neutral-gray-light"
                      : "text-neutral-black-dark"
                  }`}
                >
                  {orderToUpdate?.delivery_address?.name}
                </p>
                <p
                  className={`font-normal text-xs ${
                    isDarkMode
                      ? "text-neutral-gray-light"
                      : "text-neutral-black-dark"
                  }`}
                >
                  {orderToUpdate?.delivery_address?.phone_number}
                </p>
                <p
                  className={`font-normal text-xs ${
                    isDarkMode
                      ? "text-neutral-gray-light"
                      : "text-neutral-black-dark"
                  }`}
                >
                  {orderToUpdate?.delivery_address?.address_line_1},{" "}
                  {orderToUpdate?.delivery_address?.address_line_2},{" "}
                  {orderToUpdate?.delivery_address?.city},{" "}
                  {orderToUpdate?.delivery_address?.state},{" "}
                  {orderToUpdate?.delivery_address?.pincode}
                </p>
                <button className="filterApplyBtn" onClick={getCurrentLocation}>
                  Get Location
                </button>
              </div>
            </div>
          </div>
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
