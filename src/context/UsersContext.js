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
  limit,
  startAfter,
} from "firebase/firestore";

export const UsersContext = createContext();

const UsersProvider = ({ children }) => {
  const { firestore } = useContext(FirebaseContext);
  const [allUsers, setAllUsers] = useState([]);
  const [lastVisibleUser, setLastVisibleUser] = useState(null);
  const [userFilter, setUserFilter] = useState({ phone: "" });
  const [userToView, setUserToView] = useState(null);
  const [isUserModal, setIsUserModal] = useState(false);
  const [activeUsersCount, setActiveUsersCount] = useState(0);
  const [totalUsersCount, setTotalUsersCount] = useState(0);
  const [blockedUsersCount, setBlockedUsersCount] = useState(0);

  // Fetch all users
  const getUsers = useCallback(
    async (lastDoc = null) => {
      try {
        const usersCollectionRef = collection(firestore, "users");

        let usersQuery = query(usersCollectionRef, limit(20));

        if (lastDoc) {
          usersQuery = query(
            usersCollectionRef,
            startAfter(lastDoc),
            limit(20)
          );
        }

        const querySnapshot = await getDocs(usersQuery);

        const lastVisible = querySnapshot.docs[querySnapshot.docs.length - 1];

        const usersList = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setAllUsers((prevUsers) => [...prevUsers, ...usersList]);

        setLastVisibleUser(lastVisible);
      } catch (error) {
        console.error("Error fetching users: ", error);
      }
    },
    [firestore]
  );

  const fetchNextUsersPage = () => {
    if (lastVisibleUser) {
      getUsers(lastVisibleUser);
    }
  };

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

  // Handle user modal
  const handleUserModal = (getUserId) => {
    const dataById = allUsers?.find((user) => user?.id === getUserId);
    setUserToView(dataById);
    setIsUserModal(true);
  };

  // Get User By Phone
  const getUserByPhone = useCallback(async () => {
    try {
      const userByPhoneCollectionRef = collection(firestore, "users");

      const q = userFilter?.phone
        ? query(
            userByPhoneCollectionRef,
            where("basicInfo.mobileNumber", "==", userFilter.phone)
          )
        : userByPhoneCollectionRef;

      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        const doc = querySnapshot.docs[0];
        const userData = {
          id: doc.id,
          ...doc.data(),
        };

        setUserToView(userData);
        setIsUserModal(true);
      } else {
        console.warn("No user found with the provided phone number.");
        setUserToView(null);
      }
    } catch (error) {
      console.error("Error fetching user by phone number: ", error);
    }
  }, [firestore, userFilter.phone]);

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
    getUsers();
    getTotalUserCount();
    getBlockedUserCount();
    getActiveUserCount();
    console.log("Getting all users & total, blocked and active users count.");
  }, [getUsers, getTotalUserCount, getBlockedUserCount, getActiveUserCount]);

  return (
    <UsersContext.Provider
      value={{
        allUsers,
        userFilter,
        setUserFilter,
        isUserModal,
        setIsUserModal,
        userToView,
        setUserToView,
        handleUserModal,
        addUser,
        activeUsersCount,
        totalUsersCount,
        blockedUsersCount,
        getUserByPhone,
        fetchNextUsersPage,
      }}
    >
      {children}
    </UsersContext.Provider>
  );
};

export default UsersProvider;
