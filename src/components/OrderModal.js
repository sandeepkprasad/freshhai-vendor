import React, { useContext, useEffect, useState } from "react";
import { ProductsContext } from "../context/ProductsContext";
import { OrdersContext } from "../context/OrdersContext";
import { DeliveryContext } from "../context/DeliveryContext";
import { orderFilterData } from "../utils/LocalData";

// React Icons
import {
  MdPrint,
  FaSave,
  MdPerson,
  MdPhone,
  FaAddressCard,
  MdContentCopy,
} from "../utils/Icons";

// Components Imports
import ModalWrapper from "./ModalWrapper";

// Utils Imports
//import { extractDateTime } from "../utils/DateUtils";

const OrderModal = () => {
  const { isDarkMode, handleCopyText } = useContext(ProductsContext);
  const {
    setIsOrderModal,
    orderToUpdate,
    setOrderToUpdate,
    updateOrder,
    handlePrintOrder,
  } = useContext(OrdersContext);
  const { getDeliveryPartnerName, partnerName, handleDeliveryPartnerModal } =
    useContext(DeliveryContext);
  const [selectedOption, setSelectedOption] = useState(0);
  const [deliveryPartnerEdit, setDeliveryPartnerEdit] = useState(false);

  const handleOrderStatusChange = (e) => {
    const newStatus = e.target.value;
    setOrderToUpdate((prevOrder) => ({
      ...prevOrder,
      order_status: newStatus,
      order_tracking: [
        ...prevOrder.order_tracking,
        { status: newStatus, timestamp: new Date().toISOString() },
      ],
    }));
  };

  const handleDeliveryPartnerChange = (e) => {
    const newPartnerId = e.target.value;
    setOrderToUpdate((prevOrder) => ({
      ...prevOrder,
      delivery_partner_id: newPartnerId,
    }));
  };

  const getCurrentLocation = () => {};

  const handleDeliveryPartnerEdit = () => {
    setDeliveryPartnerEdit((prev) => !prev);
  };

  useEffect(() => {
    if (orderToUpdate?.delivery_partner_id) {
      getDeliveryPartnerName(orderToUpdate.delivery_partner_id);
    }
  }, [getDeliveryPartnerName, orderToUpdate?.delivery_partner_id]);

  return (
    <ModalWrapper
      heading={"ODR" + orderToUpdate?.id?.toUpperCase()}
      closeModal={setIsOrderModal}
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
              <MdPerson /> <span>{orderToUpdate?.delivery_address?.name}</span>
            </p>
            <p
              className={`font-semibold text-sm ${
                isDarkMode
                  ? "text-neutral-gray-light"
                  : "text-neutral-black-dark"
              } flex items-center space-x-[2%]`}
            >
              <MdPhone />{" "}
              <span>{orderToUpdate?.delivery_address?.phone_number}</span>
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
                className={`font-semibold text-sm ${
                  isDarkMode
                    ? "text-neutral-gray-light"
                    : "text-neutral-black-dark"
                }`}
              >
                ODR{orderToUpdate?.id?.toUpperCase()}
              </span>{" "}
              <button
                className="active:scale-95 duration-300"
                title="Copy delivery agent id"
                onClick={() => handleCopyText(orderToUpdate?.id)}
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
              Order items
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
              Delivery
            </button>
          </div>
          {selectedOption === 0 && (
            <div className="w-full h-[50%] md:h-[40%] space-y-[5%] mb-[2%] overflow-x-hidden overflow-y-scroll customScrollbar">
              {orderToUpdate?.order_items.map((item, index) => (
                <div
                  className="w-full h-fit flex justify-start items-start space-x-[2%]"
                  key={index}
                >
                  <img
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
                  </div>
                </div>
              ))}
            </div>
          )}
          {selectedOption === 1 && (
            <div className="w-full h-[50%] md:h-[40%] space-y-[5%] mb-[2%] overflow-x-hidden overflow-y-scroll customScrollbar">
              <div className="w-full h-fit space-y-[2%]">
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
                  {orderToUpdate?.delivery_address?.address_line_1},{" "}
                  {orderToUpdate?.delivery_address?.address_line_2},{" "}
                  {orderToUpdate?.delivery_address?.city},{" "}
                  {orderToUpdate?.delivery_address?.state},{" "}
                  {orderToUpdate?.delivery_address?.pincode}
                </p>
              </div>
              <button
                className="font-normal text-xs text-blue-500 underline active:scale-95 duration-300"
                onClick={getCurrentLocation}
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
                Total :
              </span>
              <span
                className={`font-bold text-sm ${
                  isDarkMode
                    ? "text-neutral-gray-light"
                    : "text-neutral-black-dark"
                }`}
              >
                ₹{orderToUpdate?.net_amount}
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
                Payment :
              </span>
              <span
                className={`font-semibold text-sm ${
                  orderToUpdate?.payment_status === "Paid"
                    ? "text-primary-green-dark"
                    : "text-secondary-orange-dark"
                }`}
              >
                {orderToUpdate?.payment_status}
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
              <select
                id="order_status"
                value={orderToUpdate?.order_status}
                onChange={handleOrderStatusChange}
                className={`${
                  isDarkMode ? "dropdownClassDark" : "dropdownClass"
                }`}
              >
                {orderFilterData?.status?.map((status, index) => (
                  <option
                    value={status}
                    className={`font-normal text-xs ${
                      isDarkMode
                        ? "text-neutral-gray-light"
                        : "text-neutral-black-dark"
                    }`}
                    key={index}
                  >
                    {status}
                  </option>
                ))}
              </select>
            </div>
            <div className="w-full h-fit flex flex-col justify-start items-start space-y-[2%]">
              <span
                className={`font-normal text-xs ${
                  isDarkMode
                    ? "text-neutral-gray-light"
                    : "text-neutral-black-dark"
                }`}
              >
                Delivery Partner :
              </span>
              <div className="w-full h-fit flex justify-start items-center space-x-[3%]">
                {deliveryPartnerEdit ? (
                  <input
                    type="text"
                    value={orderToUpdate?.delivery_partner_id}
                    onChange={handleDeliveryPartnerChange}
                    className={`h-6 md:h-5 rounded font-normal text-xs px-[1%] focus:outline-none ${
                      isDarkMode
                        ? "bg-neutral-black-light text-neutral-gray-light"
                        : "bg-neutral-gray-light text-neutral-black-dark"
                    }`}
                  />
                ) : (
                  <button
                    className={`font-semibold text-sm md:text-xs ${
                      isDarkMode
                        ? "text-neutral-gray-light"
                        : "text-neutral-black-dark"
                    } border rounded px-[1%] py-[0.5%] md:py-[0.3%] active:scale-95 duration-300`}
                    onClick={() =>
                      handleDeliveryPartnerModal(
                        orderToUpdate?.delivery_partner_id
                      )
                    }
                  >
                    {partnerName}
                  </button>
                )}
                {deliveryPartnerEdit ? (
                  <button
                    className="font-normal text-xs text-primary-blue-dark underline active:scale-95 duration-300"
                    onClick={handleDeliveryPartnerEdit}
                  >
                    Cancel
                  </button>
                ) : (
                  <button
                    className="font-normal text-xs text-primary-blue-dark underline active:scale-95 duration-300"
                    onClick={handleDeliveryPartnerEdit}
                  >
                    Change
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="w-full h-[5%] flex justify-evenly items-center border-t">
          <button
            className={`font-semibold text-sm flex items-center space-x-1 ${
              isDarkMode ? "text-neutral-gray-light" : "text-neutral-black-dark"
            } active:scale-95 duration-300`}
            onClick={() => updateOrder(orderToUpdate)}
          >
            <FaSave /> <span>Update</span>
          </button>
          <div className="h-full border"></div>
          <button
            className={`font-semibold text-sm flex items-center space-x-1 ${
              isDarkMode ? "text-neutral-gray-light" : "text-neutral-black-dark"
            } active:scale-95 duration-300`}
            onClick={handlePrintOrder}
          >
            <MdPrint /> <span>Print</span>
          </button>
        </div>
      </div>
    </ModalWrapper>
  );
};

export default OrderModal;
