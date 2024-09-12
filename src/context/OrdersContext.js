import React, {
  createContext,
  useState,
  useEffect,
  useContext,
  useCallback,
} from "react";
import { startOfMonth, endOfMonth, subMonths } from "date-fns";
import { FirebaseContext } from "./FirebaseContext";
import { ProductsContext } from "./ProductsContext";

// Firebase Services
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  doc,
  query,
  where,
  getCountFromServer,
} from "firebase/firestore";

// Fake data imports
import { orderSchema } from "../utils/LocalData";

export const OrdersContext = createContext();

const OrdersProvider = ({ children }) => {
  const { firestore } = useContext(FirebaseContext);
  const { handleNotification } = useContext(ProductsContext);
  const [allOrders, setAllOrders] = useState([]);
  const [orderFilter, setOrderFilter] = useState({ id: "", status: "" });
  const [isOrderModal, setIsOrderModal] = useState(false);
  const [orderToUpdate, setOrderToUpdate] = useState(null);
  const [latestOrdersCount, setLatestOrdersCount] = useState(0);
  const [lastMonthOrdersCount, setLastMonthOrdersCount] = useState(0);
  const [totalOrdersCount, setTotalOrdersCount] = useState(0);

  // Fetch all users
  const getOrders = useCallback(async () => {
    try {
      const ordersCollectionRef = collection(firestore, "orders");
      const querySnapshot = await getDocs(ordersCollectionRef);
      const ordersList = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setAllOrders(ordersList);
    } catch (error) {
      console.error("Error fetching orders: ", error);
    }
  }, [firestore]);

  useEffect(() => {
    getOrders();
    console.log("Getting all orders.");
  }, [getOrders]);

  // Add fake orders
  const addOrder = async () => {
    try {
      await addDoc(collection(firestore, "orders"), orderSchema);
      getOrders();
      console.log("New order added to database.");
    } catch (error) {
      console.log("Error while adding order : ", error);
    }
  };

  // Order Update Modal
  const handleOrderModal = (getOrderId) => {
    const dataById = allOrders?.find((order) => order?.id === getOrderId);
    setOrderToUpdate(dataById);
    setIsOrderModal(true);
  };

  // Update Order
  const updateOrder = async (updatedOrder) => {
    if (updatedOrder) {
      try {
        const docRef = doc(firestore, "orders", updatedOrder?.id);
        await updateDoc(docRef, updatedOrder);
        getOrders();
        console.log("Order updated to database.");
        handleNotification(true, "green", "Order updated successfully.");
        setIsOrderModal(false);
      } catch (error) {
        handleNotification(true, "red", error);
      }
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

  const getOrderCountForCurrentMonth = useCallback(async () => {
    try {
      const now = new Date();
      const firstDayOfMonth = startOfMonth(now);
      const lastDayOfMonth = endOfMonth(now);

      const latestOrderCountCollectionRef = collection(firestore, "orders");
      const q = query(
        latestOrderCountCollectionRef,
        where("createdAt", ">=", firstDayOfMonth),
        where("createdAt", "<=", lastDayOfMonth)
      );

      const countSnapshot = await getCountFromServer(q);
      const latestOrderCount = countSnapshot.data().count;

      setLatestOrdersCount(latestOrderCount);
    } catch (error) {
      console.error("Error fetching current month's order count: ", error);
    }
  }, [firestore]);

  useEffect(() => {
    getOrderCountForCurrentMonth();
    console.log("Latest orders count.");
  }, [getOrderCountForCurrentMonth]);

  const getLastMonthOrderCount = useCallback(async () => {
    try {
      const now = new Date();

      const firstDayOfLastMonth = startOfMonth(subMonths(now, 1));
      const lastDayOfLastMonth = endOfMonth(subMonths(now, 1));

      const lastMonthOrderCountCollectionRef = collection(firestore, "orders");
      const q = query(
        lastMonthOrderCountCollectionRef,
        where("createdAt", ">=", firstDayOfLastMonth),
        where("createdAt", "<=", lastDayOfLastMonth)
      );

      const countSnapshot = await getCountFromServer(q);
      const lastMonthOrderCount = countSnapshot.data().count;

      setLastMonthOrdersCount(lastMonthOrderCount);
    } catch (error) {
      console.error("Error fetching last month's order count: ", error);
    }
  }, [firestore]);

  useEffect(() => {
    getLastMonthOrderCount();
    console.log("Last month orders count.");
  }, [getLastMonthOrderCount]);

  const getTotalOrderCount = useCallback(async () => {
    try {
      const totalOrderCountCollectionRef = collection(firestore, "orders");

      const q = query(totalOrderCountCollectionRef);

      const countSnapshot = await getCountFromServer(q);
      const totalOrderCount = countSnapshot.data().count;

      setTotalOrdersCount(totalOrderCount);
    } catch (error) {
      console.error("Error fetching total order count: ", error);
    }
  }, [firestore]);

  useEffect(() => {
    getTotalOrderCount();
    console.log("Total orders count.");
  }, [getTotalOrderCount]);

  return (
    <OrdersContext.Provider
      value={{
        allOrders,
        addOrder,
        orderFilter,
        setOrderFilter,
        handleOrderModal,
        isOrderModal,
        setIsOrderModal,
        orderToUpdate,
        setOrderToUpdate,
        updateOrder,
        handlePrintOrder,
        latestOrdersCount,
        lastMonthOrdersCount,
        totalOrdersCount,
      }}
    >
      {children}
    </OrdersContext.Provider>
  );
};

export default OrdersProvider;
