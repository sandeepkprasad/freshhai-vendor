import React, { createContext, useState, useEffect, useContext } from "react";
import { ProductsContext } from "./ProductsContext";

// Fake Data Imports
import { latestOrdersData, allOrdersData } from "../api/apiHandler";

export const OrdersContext = createContext();

const OrdersProvider = ({ children }) => {
  const { handleNotification } = useContext(ProductsContext);
  const [latestOrders, setLatestOrders] = useState(latestOrdersData);
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
    const dataById = latestOrders?.find(
      (order) => order?.orderId === getOrderId
    );
    setOrderToUpdate(dataById);
    setIsOrderModal(true);
  };

  // Update Order
  const updateOrder = (updatedOrder) => {
    if (updatedOrder) {
      setLatestOrders((prevOrders) =>
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
        latestOrders,
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
