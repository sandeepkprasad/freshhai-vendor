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
  const [totalNetAmount, setTotalNetAmount] = useState(0);

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

  // Get Order By ID
  const getOrderbyId = useCallback(async () => {
    try {
      const orderByIdCollectionRef = collection(firestore, "orders");

      const q = orderFilter?.id
        ? query(orderByIdCollectionRef, where("id", "==", orderFilter.id))
        : orderByIdCollectionRef;

      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        const doc = querySnapshot.docs[0];
        const orderData = {
          id: doc.id,
          ...doc.data(),
        };

        setOrderToUpdate(orderData);
        setIsOrderModal(true);
      } else {
        console.warn("No order found with the provided id.");
        setOrderToUpdate(null);
      }
    } catch (error) {
      console.error("Error fetching order by id: ", error);
    }
  }, [firestore, orderFilter?.id]);

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

  const getTotalNetAmount = useCallback(async () => {
    try {
      const ordersCollectionRef = collection(firestore, "orders");

      const querySnapshot = await getDocs(ordersCollectionRef);

      const totalNetAmount = querySnapshot.docs.reduce((total, doc) => {
        const orderData = doc.data();
        return total + (orderData.net_amount || 0);
      }, 0);

      setTotalNetAmount(totalNetAmount);
    } catch (error) {
      console.error("Error calculating total net amount: ", error);
    }
  }, [firestore]);

  useEffect(() => {
    getOrders();
    getOrderCountForCurrentMonth();
    getLastMonthOrderCount();
    getTotalOrderCount();
    getTotalNetAmount();
    console.log(
      "Getting all orders & latest, last month, total orders and total orders value count."
    );
  }, [
    getOrders,
    getOrderCountForCurrentMonth,
    getLastMonthOrderCount,
    getTotalOrderCount,
    getTotalNetAmount,
  ]);

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
        totalNetAmount,
        getOrderbyId,
      }}
    >
      {children}
    </OrdersContext.Provider>
  );
};

export default OrdersProvider;
