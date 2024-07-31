import React, { useState } from "react";
import adminContext from "./adminContext";

// API Imports
import { profileData } from "../api/profileData";
import { allProductsData } from "../api/allProducts";
import { latestOrdersData, allOrdersData } from "../api/apiHandler";
import { userData } from "../api/apiHandler";

const AdminState = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [notificationData, setNotificationData] = useState({
    flag: false,
    type: "",
    text: "",
  });

  const [adminProfile, setAdminProfile] = useState(profileData);
  const [allProducts, setAllProducts] = useState(allProductsData);
  const [latestOrders, setLatestOrders] = useState(latestOrdersData);
  const [allOrders, setAllOrders] = useState(allOrdersData);
  const [totalUsers, setTotalUsers] = useState(userData);
  const [productFilter, setProductFilter] = useState({
    category: "",
    available: "",
    brand: "",
    origin: "",
  });
  const [orderFilter, setOrderFilter] = useState({ id: "", status: "" });
  const [userFilter, setUserFilter] = useState({ phone: "", isBlocked: "" });
  const [isAddModal, setIsAddModal] = useState(false);
  const [isUpdateModal, setIsUpdateModal] = useState(false);
  const [productToUpdate, setProductToUpdate] = useState(null);
  const [isDeleteModal, setIsDeleteModal] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);
  const [isOrderModal, setIsOrderModal] = useState(false);
  const [orderToUpdate, setOrderToUpdate] = useState(null);
  const [isUserModal, setIsUserModal] = useState(false);
  const [userToUpdate, setUserToUpdate] = useState(null);

  // Handle Notification Popup
  const handleNotification = (getFlag, getType, getText) => {
    setNotificationData({
      flag: getFlag,
      type: getType,
      text: getText,
    });
  };

  // Handle Product Add
  const addProduct = (productToAdd) => {
    const isValid =
      productToAdd?.name &&
      productToAdd?.description &&
      productToAdd?.category &&
      productToAdd?.price !== undefined &&
      productToAdd?.discount !== undefined &&
      productToAdd?.brand &&
      productToAdd?.weight !== undefined &&
      productToAdd?.unit &&
      productToAdd?.storageTemperature &&
      productToAdd?.origin &&
      productToAdd?.available !== undefined;

    if (isValid) {
      setAllProducts((prevProducts) => [...prevProducts, productToAdd]);
      handleNotification(true, "green", "Product added successfully.");
      setIsAddModal(false);
    } else {
      handleNotification(true, "red", "Please fill all the details.");
    }
  };

  // Handle Update Modal
  const handleUpdateModal = (getId) => {
    const dataById = allProducts?.find((product) => product?.id === getId);
    setProductToUpdate(dataById);
    setIsUpdateModal(true);
  };

  // Handle Product Update
  const updateProduct = (updatedProduct) => {
    const isValid =
      updatedProduct?.name &&
      updatedProduct?.description &&
      updatedProduct?.category &&
      updatedProduct?.price !== undefined &&
      updatedProduct?.discount !== undefined &&
      updatedProduct?.brand &&
      updatedProduct?.weight !== undefined &&
      updatedProduct?.unit &&
      updatedProduct?.storageTemperature &&
      updatedProduct?.origin &&
      updatedProduct?.available !== undefined;

    if (isValid) {
      setAllProducts((prevProducts) =>
        prevProducts.map((product) =>
          product.id === updatedProduct.id ? updatedProduct : product
        )
      );
      handleNotification(true, "green", "Product updated successfully.");
      setIsUpdateModal(false);
    } else {
      handleNotification(true, "red", "Please fill all the details.");
    }
  };

  // Handle Delete Modal
  const handleDeleteModal = (getId) => {
    setProductToDelete(getId);
    setIsDeleteModal(true);
  };

  // Handle Product Delete
  const deleteProductById = () => {
    setAllProducts((prevProducts) =>
      prevProducts.filter((product) => product.id !== productToDelete)
    );
    handleNotification(true, "red", "Product deleted successfully.");
    setIsDeleteModal(false);
  };

  // Handle Order Modal
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

  // Handle User Modal
  const handleUserModal = (getUserId) => {
    const dataById = totalUsers?.find((user) => user?.userId === getUserId);
    setUserToUpdate(dataById);
    setIsUserModal(true);
  };

  // User Update
  const updateUser = (updatedUser) => {
    if (updatedUser) {
      setTotalUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.userId === updatedUser.userId ? updatedUser : user
        )
      );
      setIsUserModal(false);
      handleNotification(true, "green", "User updated successfully.");
    } else {
      handleNotification(true, "red", "User couldn't update.");
    }
  };

  return (
    <adminContext.Provider
      value={{
        isDarkMode,
        setIsDarkMode,
        handleNotification,
        notificationData,
        adminProfile,
        allProducts,
        productFilter,
        setProductFilter,
        handleUpdateModal,
        isUpdateModal,
        setIsUpdateModal,
        updateProduct,
        productToUpdate,
        handleDeleteModal,
        isDeleteModal,
        setIsDeleteModal,
        deleteProductById,
        isAddModal,
        setIsAddModal,
        addProduct,
        allOrders,
        latestOrders,
        orderFilter,
        setOrderFilter,
        handleOrderModal,
        isOrderModal,
        setIsOrderModal,
        orderToUpdate,
        updateOrder,
        handlePrintOrder,
        totalUsers,
        handleUserModal,
        isUserModal,
        setIsUserModal,
        userToUpdate,
        updateUser,
        userFilter,
        setUserFilter,
      }}
    >
      {children}
    </adminContext.Provider>
  );
};

export default AdminState;
