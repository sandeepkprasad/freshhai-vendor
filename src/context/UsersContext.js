import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  useCallback,
} from "react";
import { FirebaseContext } from "./FirebaseContext";

// Fake data
import { userSchema } from "../utils/LocalData";

// Firebase Services
import {
  collection,
  getDocs,
  addDoc,
  query,
  where,
  getCountFromServer,
} from "firebase/firestore";

export const UsersContext = createContext();

const UsersProvider = ({ children }) => {
  const { firestore } = useContext(FirebaseContext);
  const [allUsers, setAllUsers] = useState([]);
  const [userFilter, setUserFilter] = useState({ phone: "" });
  const [userToView, setUserToView] = useState(null);
  const [isUserModal, setIsUserModal] = useState(false);
  const [activeUsersCount, setActiveUsersCount] = useState(0);
  const [totalUsersCount, setTotalUsersCount] = useState(0);
  const [blockedUsersCount, setBlockedUsersCount] = useState(0);

  // Fetch all users
  const getUsers = useCallback(async () => {
    try {
      const usersCollectionRef = collection(firestore, "users");
      const querySnapshot = await getDocs(usersCollectionRef);
      const usersList = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setAllUsers(usersList);
    } catch (error) {
      console.error("Error fetching users: ", error);
    }
  }, [firestore]);

  useEffect(() => {
    getUsers();
    console.log("Getting all users.");
  }, [getUsers]);

  // Add fake users
  const addUser = async () => {
    try {
      await addDoc(collection(firestore, "users"), userSchema);
      getUsers();
      console.log("New user added to database.");
    } catch (error) {
      console.log("Error while adding user : ", error);
    }
  };

  const handleUserFilter = () => {
    console.log("User filter clicked : ", userFilter);
  };

  // Handle user modal
  const handleUserModal = (getUserId) => {
    const dataById = allUsers?.find((user) => user?.id === getUserId);
    setUserToView(dataById);
    setIsUserModal(true);
  };

  const getTotalUserCount = useCallback(async () => {
    try {
      const totalUserCountCollectionRef = collection(firestore, "users");

      const q = query(totalUserCountCollectionRef);

      const countSnapshot = await getCountFromServer(q);
      const totalUserCount = countSnapshot.data().count;

      setTotalUsersCount(totalUserCount);
    } catch (error) {
      console.error("Error fetching total user count: ", error);
    }
  }, [firestore]);

  useEffect(() => {
    getTotalUserCount();
    console.log("Total users count.");
  }, [getTotalUserCount]);

  const getBlockedUserCount = useCallback(async () => {
    try {
      const blockedUserCountCollectionRef = collection(firestore, "users");

      const q = query(
        blockedUserCountCollectionRef,
        where("userStatus", "==", "blocked")
      );

      const countSnapshot = await getCountFromServer(q);
      const blockedUserCount = countSnapshot.data().count;

      setBlockedUsersCount(blockedUserCount);
    } catch (error) {
      console.error("Error fetching blocked user count: ", error);
    }
  }, [firestore]);

  useEffect(() => {
    getBlockedUserCount();
    console.log("Blocked users count.");
  }, [getBlockedUserCount]);

  const getActiveUserCount = useCallback(async () => {
    try {
      const activeUserCountCollectionRef = collection(firestore, "users");

      const q = query(
        activeUserCountCollectionRef,
        where("userStatus", "==", "active")
      );

      const countSnapshot = await getCountFromServer(q);
      const activeUserCount = countSnapshot.data().count;

      setActiveUsersCount(activeUserCount);
    } catch (error) {
      console.error("Error fetching active user count: ", error);
    }
  }, [firestore]);

  useEffect(() => {
    getActiveUserCount();
    console.log("Active users count.");
  }, [getActiveUserCount]);

  return (
    <UsersContext.Provider
      value={{
        allUsers,
        userFilter,
        setUserFilter,
        handleUserFilter,
        isUserModal,
        setIsUserModal,
        userToView,
        setUserToView,
        handleUserModal,
        addUser,
        activeUsersCount,
        totalUsersCount,
        blockedUsersCount,
      }}
    >
      {children}
    </UsersContext.Provider>
  );
};

export default UsersProvider;
