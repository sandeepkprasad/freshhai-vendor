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
  limit,
  startAfter,
  orderBy,
  onSnapshot,
} from "firebase/firestore";

// Fake data imports
import { orderSchema } from "../utils/LocalData";

export const OrdersContext = createContext();

const OrdersProvider = ({ children }) => {
  const { firestore } = useContext(FirebaseContext);
  const { handleNotification } = useContext(ProductsContext);
  const [allOrders, setAllOrders] = useState([]);
  const [lastVisibleDoc, setLastVisibleDoc] = useState(null);
  const [orderFilter, setOrderFilter] = useState({ id: "", status: "" });
  const [isOrderModal, setIsOrderModal] = useState(false);
  const [orderToUpdate, setOrderToUpdate] = useState(null);
  const [latestOrdersCount, setLatestOrdersCount] = useState(0);
  const [lastMonthOrdersCount, setLastMonthOrdersCount] = useState(0);
  const [totalOrdersCount, setTotalOrdersCount] = useState(0);
  const [totalNetAmount, setTotalNetAmount] = useState(0);

  const salesBarChartData = [
    { name: "Jan", sales: 4000 },
    { name: "Feb", sales: 3000 },
    { name: "Mar", sales: 2000 },
    { name: "Apr", sales: 2780 },
    { name: "May", sales: 1890 },
    { name: "Jun", sales: 1250 },
    { name: "Jul", sales: 2500 },
    { name: "Aug", sales: 5000 },
    { name: "Sep", sales: 0 },
    { name: "Oct", sales: 0 },
    { name: "Nov", sales: 0 },
    { name: "Dec", sales: 0 },
  ];

  // Listen for real-time new orders
  const listenForNewOrders = useCallback(
    (lastTimestamp) => {
      const ordersCollectionRef = collection(firestore, "orders");

      const newOrdersQuery = query(
        ordersCollectionRef,
        orderBy("createdAt", "desc"),
        where("createdAt", ">", lastTimestamp)
      );

      const unsubscribe = onSnapshot(newOrdersQuery, (snapshot) => {
        const newOrders = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setAllOrders((prevOrders) => [...newOrders, ...prevOrders]);
      });

      return unsubscribe;
    },
    [firestore]
  );

  // Fetch all orders
  const getOrders = useCallback(
    async (lastDoc = null, reset = false) => {
      try {
        const ordersCollectionRef = collection(firestore, "orders");

        let ordersQuery = query(
          ordersCollectionRef,
          orderBy("createdAt", "desc"),
          limit(20)
        );

        if (lastDoc) {
          ordersQuery = query(
            ordersCollectionRef,
            orderBy("createdAt", "desc"),
            startAfter(lastDoc),
            limit(20)
          );
        }

        const querySnapshot = await getDocs(ordersQuery);

        const lastVisible = querySnapshot.docs[querySnapshot.docs.length - 1];

        const ordersList = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        if (reset) {
          setAllOrders(ordersList);
        } else {
          setAllOrders((prevOrders) => [...prevOrders, ...ordersList]);
        }

        setLastVisibleDoc(lastVisible);

        if (reset) {
          listenForNewOrders(ordersList[0]?.createdAt);
        }
      } catch (error) {
        console.error("Error fetching all orders: ", error);
      }
    },
    [firestore, listenForNewOrders]
  );

  const fetchNextPage = () => {
    if (lastVisibleDoc) {
      getOrders(lastVisibleDoc);
    }
  };

  // Add fake orders
  const addOrder = async () => {
    try {
      await addDoc(collection(firestore, "orders"), orderSchema);
      getOrders(null, true);
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
        getOrders(null, true);
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
      "Getting all recent and orders & latest, last month, total orders and total orders value count."
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
        salesBarChartData,
        getOrderbyId,
        fetchNextPage,
      }}
    >
      {children}
    </OrdersContext.Provider>
  );
};

export default OrdersProvider;
