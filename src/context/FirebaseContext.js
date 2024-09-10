// FirebaseContext.js
import React, { createContext, useMemo, useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

// Firebase Services
import { app } from "../firebaseConfig";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  updateProfile,
} from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

export const FirebaseContext = createContext();

const FirebaseProvider = ({ children }) => {
  const auth = useMemo(() => getAuth(app), []);
  const firestore = useMemo(() => getFirestore(app), []);
  const storage = useMemo(() => getStorage(app), []);
  const [adminProfile, setAdminProfile] = useState({
    img: null,
    imgUrl: "",
    name: "",
    email: "",
  });
  const navigate = useNavigate();
  const location = useLocation();

  // Handling Admin Login State
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setAdminProfile((prevData) => ({
          ...prevData,
          imgUrl: user?.photoURL,
          name: user?.displayName,
          email: user?.email,
        }));
      } else {
        if (location.pathname !== "/signup") {
          navigate("/login");
        }
      }
    });
  }, [auth, navigate, setAdminProfile, location.pathname]);

  return (
    <FirebaseContext.Provider
      value={{
        auth,
        createUserWithEmailAndPassword,
        signInWithEmailAndPassword,
        onAuthStateChanged,
        updateProfile,
        firestore,
        storage,
        adminProfile,
        setAdminProfile,
      }}
    >
      {children}
    </FirebaseContext.Provider>
  );
};

export default FirebaseProvider;
