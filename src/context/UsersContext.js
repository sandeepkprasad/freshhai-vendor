import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  useCallback,
} from "react";
import { FirebaseContext } from "./FirebaseContext";

// Firebase Services
import { collection, getDocs } from "firebase/firestore";

export const UsersContext = createContext();

const UsersProvider = ({ children }) => {
  const { firestore } = useContext(FirebaseContext);
  const [allUsers, setAllUsers] = useState([]);

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

  return (
    <UsersContext.Provider value={{ allUsers }}>
      {children}
    </UsersContext.Provider>
  );
};

export default UsersProvider;
