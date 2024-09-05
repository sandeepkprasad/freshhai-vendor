import React, { createContext, useState, useEffect, useContext } from "react";
import { ProductsContext } from "./ProductsContext";

// Fake data imports
import { allOrdersData } from "../api/apiHandler";
//import { orderSchema } from "../utils/LocalData";

export const OrdersContext = createContext();

const OrdersProvider = ({ children }) => {
  const { handleNotification } = useContext(ProductsContext);
  const [allOrders, setAllOrders] = useState([]);
  const [orderFilter, setOrderFilter] = useState({ id: "", status: "" });
  const [isOrderModal, setIsOrderModal] = useState(false);
  const [orderToUpdate, setOrderToUpdate] = useState(null);

  // Updating topSelling Products & allOrders data
  useEffect(() => {
    setAllOrders(allOrdersData);
  }, []);

  // Order Update Modal
  const handleOrderModal = (getOrderId) => {
    const dataById = allOrders?.find((order) => order?.orderId === getOrderId);
    setOrderToUpdate(dataById);
    setIsOrderModal(true);
  };

  // Update Order
  const updateOrder = (updatedOrder) => {
    if (updatedOrder) {
      setAllOrders((prevOrders) =>
        prevOrders.map((order) =>
          order.orderId === updatedOrder.orderId ? updatedOrder : order
        )
      );
      handleNotification(true, "green", "Order updated successfully.");
      setIsOrderModal(false);
    } else {
      handleNotification(true, "red", "Order couldn't update.");
    }
  };

  // Handle Print Order
  const handlePrintOrder = (orderToPrint) => {
    if (orderToPrint) {
      console.log("Order to print : ", orderToPrint);
      handleNotification(true, "green", "Order printing successfully.");
    } else {
      handleNotification(true, "red", "Order couldn't print.");
    }
  };

  return (
    <OrdersContext.Provider
      value={{
        allOrders,
        orderFilter,
        setOrderFilter,
        handleOrderModal,
        isOrderModal,
        setIsOrderModal,
        orderToUpdate,
        updateOrder,
        handlePrintOrder,
      }}
    >
      {children}
    </OrdersContext.Provider>
  );
};

export default OrdersProvider;
