// FirebaseContext.js
import React, { createContext, useMemo, useState } from "react";

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
