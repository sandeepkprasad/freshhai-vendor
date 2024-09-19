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
  Timestamp,
} from "firebase/firestore";

// Fake data imports
import { orderSchema } from "../utils/LocalData";

export const OrdersContext = createContext();

const OrdersProvider = ({ children }) => {
  const { firestore } = useContext(FirebaseContext);
  const { handleNotification } = useContext(ProductsContext);
  const [allOrders, setAllOrders] = useState([]);
  const [recentOrders, setRecentOrders] = useState([]);
  const [realtimeOrders, setRealtimeOrders] = useState([]);
  const [lastVisibleDoc, setLastVisibleDoc] = useState(null);
  const [lastRecentVisibleDoc, setLastRecentVisibleDoc] = useState(null);
  const [orderFilter, setOrderFilter] = useState({ id: "", status: "" });
  const [isOrderModal, setIsOrderModal] = useState(false);
  const [orderToUpdate, setOrderToUpdate] = useState(null);
  const [latestOrdersCount, setLatestOrdersCount] = useState(0);
  const [lastMonthOrdersCount, setLastMonthOrdersCount] = useState(0);
  const [totalOrdersCount, setTotalOrdersCount] = useState(0);
  const [totalNetAmount, setTotalNetAmount] = useState(0);
  const [ordersSwitch, setOrdersSwitch] = useState(true);

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

  // Fetch all orders
  const getOrders = useCallback(
    async (lastDoc = null, reset = false) => {
      try {
        const ordersCollectionRef = collection(firestore, "orders");

        let ordersQuery = query(ordersCollectionRef, limit(20));

        if (lastDoc) {
          ordersQuery = query(
            ordersCollectionRef,
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
      } catch (error) {
        console.error("Error fetching orders: ", error);
      }
    },
    [firestore]
  );

  const fetchNextPage = () => {
    if (lastVisibleDoc) {
      getOrders(lastVisibleDoc);
    }
  };

  // Fetch orders from the last 90 minutes (1.5 hours)
  const getRecentOrders = useCallback(
    async (lastDoc = null, reset = false) => {
      try {
        const ordersCollectionRef = collection(firestore, "orders");

        // Calculate the timestamp for 90 minutes ago
        const currentTime = new Date();
        const ninetyMinutesAgo = new Date(
          currentTime.getTime() - 90 * 60 * 1000
        );

        // Query Firestore for orders created within the last 90 minutes
        let ordersQuery = query(
          ordersCollectionRef,
          where("createdAt", ">=", ninetyMinutesAgo),
          orderBy("createdAt", "desc"),
          limit(20)
        );

        if (lastDoc) {
          ordersQuery = query(
            ordersCollectionRef,
            where("createdAt", ">=", ninetyMinutesAgo),
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

        // If reset, clear the previous orders
        if (reset) {
          setRecentOrders(ordersList);
        } else {
          setRecentOrders((prevOrders) => [...prevOrders, ...ordersList]);
        }

        setLastRecentVisibleDoc(lastVisible);
      } catch (error) {
        console.error("Error fetching recent orders: ", error);
      }
    },
    [firestore]
  );

  const fetchNextRecentPage = () => {
    if (lastRecentVisibleDoc) {
      getRecentOrders(lastRecentVisibleDoc);
    }
  };

  // Last 15 min realtime orders
  const fetchRealTimeOrders = useCallback(() => {
    try {
      const ordersCollectionRef = collection(firestore, "orders");

      const now = Timestamp.now();

      const fifteenMinutesAgo = new Timestamp(
        now.seconds - 15 * 60,
        now.nanoseconds
      );

      const ordersQuery = query(
        ordersCollectionRef,
        where("createdAt", ">=", fifteenMinutesAgo),
        orderBy("createdAt", "desc")
      );

      onSnapshot(ordersQuery, (snapshot) => {
        const orders = snapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        setRealtimeOrders(orders);
        if (orders.length > 0) {
          handleNotification(true, "green", "New order received");
        }
      });
    } catch (error) {
      console.error("Error fetching real-time orders:", error);
    }
  }, [firestore, handleNotification]);

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
    const orders = ordersSwitch ? recentOrders : allOrders;
    const dataById = orders?.find((order) => order?.id === getOrderId);

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

        if (ordersSwitch) {
          getRecentOrders(null, true);
        } else {
          getOrders(null, true);
        }

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
    getRecentOrders();
    getOrderCountForCurrentMonth();
    getLastMonthOrderCount();
    getTotalOrderCount();
    getTotalNetAmount();
    fetchRealTimeOrders();
    console.log(
      "Getting all recent and orders & latest, last month, total orders and total orders value count."
    );
  }, [
    getOrders,
    getRecentOrders,
    getOrderCountForCurrentMonth,
    getLastMonthOrderCount,
    getTotalOrderCount,
    getTotalNetAmount,
    fetchRealTimeOrders,
  ]);

  return (
    <OrdersContext.Provider
      value={{
        allOrders,
        recentOrders,
        realtimeOrders,
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
        fetchNextRecentPage,
        ordersSwitch,
        setOrdersSwitch,
      }}
    >
      {children}
    </OrdersContext.Provider>
  );
};

export default OrdersProvider;
