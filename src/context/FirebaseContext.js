// FirebaseContext.js
import React, { createContext, useMemo } from "react";

// Firebase Services
import { app } from "../firebaseConfig";
import {
  getAuth,
  createUserWithEmailAndPassword,
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

  return (
    <FirebaseContext.Provider
      value={{
        auth,
        createUserWithEmailAndPassword,
        onAuthStateChanged,
        updateProfile,
        firestore,
        storage,
      }}
    >
      {children}
    </FirebaseContext.Provider>
  );
};

export default FirebaseProvider;
