import React, { useState, useEffect } from "react";
import adminContext from "./adminContext";

// Firebase Imports
import { app } from "../firebase";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  updateDoc,
  doc,
  deleteDoc,
  query,
  where,
} from "firebase/firestore";

// API Imports
import { allProductsData } from "../api/allProducts";
import { latestOrdersData, allOrdersData, userData } from "../api/apiHandler";

const AdminState = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [notificationData, setNotificationData] = useState({
    flag: false,
    type: "",
    text: "",
  });
  const [adminProfile, setAdminProfile] = useState();
  const [allProducts, setAllProducts] = useState(null);
  const [topSellingProducts, setTopSellingProducts] = useState([]);
  const [latestOrders, setLatestOrders] = useState(latestOrdersData);
  const [allOrders, setAllOrders] = useState([]);
  const [totalUsers, setTotalUsers] = useState(userData);
  const [deliveryPartners, setDeliveryPartners] = useState(null);
  const [activeDeliveryPartners, setActiveDeliveryPartners] = useState(null);
  const [deliveryPartnersCount, setDeliveryPartnersCount] = useState({
    total: 0,
    active: 0,
    suspended: 0,
  });
  const [suspendedDeliveryPartners, setSuspendedDeliveryPartners] =
    useState(null);
  const [productFilter, setProductFilter] = useState({
    category: "",
    available: "",
    brand: "",
    origin: "",
  });
  const [orderFilter, setOrderFilter] = useState({ id: "", status: "" });
  const [userFilter, setUserFilter] = useState({ phone: "", isBlocked: "" });
  const [deliveryFilter, setDeliveryFilter] = useState({ name: "", phone: "" });
  const [isAddModal, setIsAddModal] = useState(false);
  const [isUpdateModal, setIsUpdateModal] = useState(false);
  const [productToUpdate, setProductToUpdate] = useState(null);
  const [isDeleteModal, setIsDeleteModal] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);
  const [isOrderModal, setIsOrderModal] = useState(false);
  const [orderToUpdate, setOrderToUpdate] = useState(null);
  const [isUserModal, setIsUserModal] = useState(false);
  const [userToUpdate, setUserToUpdate] = useState(null);
  const [isDeliveryAgentModal, setIsDeliveryAgentModal] = useState(false);

  const firestore = getFirestore(app);

  // Updating topSellingProducts & allOrders data
  useEffect(() => {
    setTopSellingProducts(allProductsData);
    setAllOrders(allOrdersData);
  }, []);

  // Handle Notification Popup
  const handleNotification = (getFlag, getType, getText) => {
    setNotificationData({
      flag: getFlag,
      type: getType,
      text: getText,
    });
  };

  // Handle Product Add
  const addProduct = async (productToAdd) => {
    const isValid =
      productToAdd?.imageUrl &&
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
      productToAdd?.available;

    if (isValid) {
      await addDoc(collection(firestore, "products"), {
        imageUrl: productToAdd?.imageUrl,
        name: productToAdd?.name,
        category: productToAdd?.category,
        price: productToAdd?.price,
        description: productToAdd?.description,
        available: productToAdd?.available,
        discount: productToAdd?.discount,
        brand: productToAdd?.brand,
        weight: productToAdd?.weight,
        unit: productToAdd?.unit,
        storageTemperature: productToAdd?.storageTemperature,
        origin: productToAdd?.origin,
        rating: productToAdd?.rating,
        numReviews: productToAdd?.numReviews,
        expiryDate: productToAdd?.expiryDate,
        isHalal: productToAdd?.isHalal,
      });
      setAllProducts((prevProducts) => [...prevProducts, productToAdd]);
      handleNotification(true, "green", "Product added successfully.");
      setIsAddModal(false);
    } else {
      handleNotification(true, "red", "Please fill all the details.");
    }
  };

  // Handle Get Products
  const getProducts = async () => {
    const productsCollectionRef = collection(firestore, "products");
    const querySnapshot = await getDocs(productsCollectionRef);
    const productsList = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setAllProducts(productsList);
  };

  // Handle Update Modal
  const handleUpdateModal = (getId) => {
    const dataById = allProducts?.find((product) => product?.id === getId);
    setProductToUpdate(dataById);
    setIsUpdateModal(true);
  };

  // Handle Product Update
  const updateProduct = async (updatedProduct) => {
    const isValid =
      updatedProduct?.imageUrl &&
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
      updatedProduct?.available;

    if (isValid) {
      const docRef = doc(firestore, "products", updatedProduct?.id);
      await updateDoc(docRef, updatedProduct);
      setAllProducts((prevProducts) =>
        prevProducts?.map((product) =>
          product?.id === updatedProduct?.id ? updatedProduct : product
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
  const deleteProductById = async () => {
    const docRef = doc(firestore, "products", productToDelete);
    await deleteDoc(docRef);
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

  // Add Delivery Partners
  const addDeliveryAgent = async (agentToAdd) => {
    const isValid =
      agentToAdd?.imageUrl &&
      agentToAdd?.name &&
      agentToAdd?.availability &&
      agentToAdd?.vehicle &&
      agentToAdd?.licenseNumber &&
      agentToAdd?.status &&
      agentToAdd?.contact?.phone !== undefined &&
      agentToAdd?.contact?.email &&
      agentToAdd?.address?.street &&
      agentToAdd?.address?.city &&
      agentToAdd?.address?.state &&
      agentToAdd?.address?.zip !== undefined;

    if (isValid) {
      await addDoc(collection(firestore, "deliveryPartners"), {
        imageUrl: agentToAdd?.imageUrl,
        name: agentToAdd?.name,
        availability: agentToAdd?.availability,
        vehicle: agentToAdd?.vehicle,
        licenseNumber: agentToAdd?.licenseNumber,
        status: agentToAdd?.status,
        contact: {
          phone: agentToAdd?.contact?.phone,
          email: agentToAdd?.contact?.email,
        },
        address: {
          street: agentToAdd?.address?.street,
          city: agentToAdd?.address?.city,
          state: agentToAdd?.address?.state,
          zip: agentToAdd?.address?.zip,
        },
      });
      setDeliveryPartners((prevProducts) => [...prevProducts, agentToAdd]);
      handleNotification(true, "green", "Delivery Agent added successfully.");
      setIsDeliveryAgentModal(false);
    } else {
      handleNotification(true, "red", "Please fill all the details.");
    }
  };

  // Handle Get All Delivery Partners
  const getAllDeliveryPartners = async () => {
    const deliveryPartnersCollectionRef = collection(
      firestore,
      "deliveryPartners"
    );
    const querySnapshot = await getDocs(deliveryPartnersCollectionRef);
    const deliveryPartnersList = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setDeliveryPartners(deliveryPartnersList);
  };

  // Handle Get Active Delivery Partners
  const getActiveDeliveryPartners = async () => {
    const deliveryPartnersCollectionRef = collection(
      firestore,
      "deliveryPartners"
    );

    const activeDeliveryPartnersQuery = query(
      deliveryPartnersCollectionRef,
      where("status", "==", "Active")
    );

    const querySnapshot = await getDocs(activeDeliveryPartnersQuery);

    const deliveryPartnersList = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    setActiveDeliveryPartners(deliveryPartnersList);
  };

  // Handle Get Suspended Delivery Partners
  const getSuspendedDeliveryPartners = async () => {
    const deliveryPartnersCollectionRef = collection(
      firestore,
      "deliveryPartners"
    );

    const suspendedDeliveryPartnersQuery = query(
      deliveryPartnersCollectionRef,
      where("status", "==", "Suspended")
    );

    const querySnapshot = await getDocs(suspendedDeliveryPartnersQuery);

    const deliveryPartnersList = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    setSuspendedDeliveryPartners(deliveryPartnersList);
  };

  // Get Delivery Partners Counts
  const getDeliveryPartnersCount = async () => {
    const deliveryPartnersCollectionRef = collection(
      firestore,
      "deliveryPartners"
    );

    // Total documents count
    const querySnapshot = await getDocs(deliveryPartnersCollectionRef);
    const totalDocuments = querySnapshot.size;

    // Active documents count
    const activeQuery = query(
      deliveryPartnersCollectionRef,
      where("status", "==", "Active")
    );
    const activeQuerySnapshot = await getDocs(activeQuery);
    const activeDocumentsCount = activeQuerySnapshot.size;

    // Suspended documents count
    const suspendedQuery = query(
      deliveryPartnersCollectionRef,
      where("status", "==", "Suspended")
    );
    const suspendedQuerySnapshot = await getDocs(suspendedQuery);
    const suspendedDocumentsCount = suspendedQuerySnapshot.size;

    setDeliveryPartnersCount((prevState) => ({
      ...prevState,
      total: totalDocuments,
      active: activeDocumentsCount,
      suspended: suspendedDocumentsCount,
    }));
  };

  return (
    <adminContext.Provider
      value={{
        app,
        isDarkMode,
        setIsDarkMode,
        handleNotification,
        notificationData,
        adminProfile,
        setAdminProfile,
        getProducts,
        allProducts,
        topSellingProducts,
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
        getActiveDeliveryPartners,
        getAllDeliveryPartners,
        getSuspendedDeliveryPartners,
        deliveryPartners,
        activeDeliveryPartners,
        suspendedDeliveryPartners,
        getDeliveryPartnersCount,
        deliveryPartnersCount,
        deliveryFilter,
        setDeliveryFilter,
        isDeliveryAgentModal,
        setIsDeliveryAgentModal,
        addDeliveryAgent,
      }}
    >
      {children}
    </adminContext.Provider>
  );
};

export default AdminState;
