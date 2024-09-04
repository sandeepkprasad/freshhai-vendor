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
import { collection, getDocs, addDoc } from "firebase/firestore";

export const UsersContext = createContext();

const UsersProvider = ({ children }) => {
  const { firestore } = useContext(FirebaseContext);
  const [allUsers, setAllUsers] = useState([]);
  const [userFilter, setUserFilter] = useState({ phone: "" });
  const [userToView, setUserToView] = useState(null);
  const [isUserModal, setIsUserModal] = useState(false);

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
      }}
    >
      {children}
    </UsersContext.Provider>
  );
};

export default UsersProvider;
