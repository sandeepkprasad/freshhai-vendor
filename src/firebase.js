// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyARXuLNws800ZFtfb3HOhjieQZRIZUM-d8",
  authDomain: "freshhai-all.firebaseapp.com",
  projectId: "freshhai-all",
  storageBucket: "freshhai-all.appspot.com",
  messagingSenderId: "515496255028",
  appId: "1:515496255028:web:619a7f970a9a2eff3ff461",
  measurementId: "G-TWB71910W8",
  databaseURL: "https://freshhai-all-default-rtdb.firebaseio.com",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
