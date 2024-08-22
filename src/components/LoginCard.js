import React, { useContext, useState } from "react";
import adminContext from "../context/adminContext";
import { useNavigate } from "react-router-dom";

// Firebase Imports
import { signInWithEmailAndPassword } from "firebase/auth";

// Reacr Icons
import { ImEye, ImEyeBlocked } from "../utils/Icons";

const LoginCard = () => {
  const { auth, handleNotification, setAdminProfile } =
    useContext(adminContext);
  const [loginCred, setLoginCred] = useState({ email: "", password: "" });
  const [passwordVisibility, setPasswordVisibility] = useState(false);
  const navigate = useNavigate();

  // Handle Admin Login OnChange
  const handleAdminLoginChange = (e) => {
    const { name, value } = e.target;
    setLoginCred((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handlePasswordVisibility = () => {
    setPasswordVisibility((prev) => !prev);
  };

  // Handle Admin Login
  const handleAdminLogin = () => {
    if (loginCred?.email && loginCred?.password) {
      signInWithEmailAndPassword(auth, loginCred?.email, loginCred?.password)
        .then((userCredential) => {
          setAdminProfile(userCredential?.user);
          handleNotification(true, "green", "Logged in successfully.");
          setTimeout(() => {
            navigate("/");
          }, 1000);
        })
        .catch((error) => {
          //const errorCode = error.code;
          const errorMessage = error.message;
          handleNotification(true, "red", errorMessage);
        });
    } else {
      handleNotification(true, "red", "Please check your credentials.");
    }
  };

  return (
    <div className="w-full h-full flex flex-col justify-center items-center space-y-[5%]">
      <p className="font-normal text-lg text-neutral-gray-dark">
        Please fill in your unique admin login details below.
      </p>
      <input
        type="text"
        placeholder="Enter Email"
        name="email"
        value={loginCred?.email}
        onChange={handleAdminLoginChange}
        required
        className="w-[50%] h-[10%] bg-neutral-gray-light border rounded-xl px-[2%] focus:outline-none"
      />
      <div className="w-[50%] h-[10%] relative">
        <input
          type={passwordVisibility ? "text" : "password"}
          placeholder="Enter Password"
          name="password"
          value={loginCred?.password}
          onChange={handleAdminLoginChange}
          required
          className="w-full h-full bg-neutral-gray-light border rounded-xl px-[4%] focus:outline-none"
        />
        {passwordVisibility ? (
          <button
            className="text-xl text-neutral-gray-dark active:scale-95 duration-300 absolute top-3.5 right-[4%]"
            onClick={handlePasswordVisibility}
          >
            <ImEye />
          </button>
        ) : (
          <button
            className="text-xl text-neutral-gray-dark active:scale-95 duration-300 absolute top-3.5 right-[4%]"
            onClick={handlePasswordVisibility}
          >
            <ImEyeBlocked />
          </button>
        )}
      </div>
      <button
        className="w-[50%] h-[10%] bg-primary-blue-dark border rounded-xl shadow-md font-semibold text-lg text-neutral-white active:scale-95 duration-300"
        onClick={handleAdminLogin}
      >
        Login
      </button>
    </div>
  );
};

export default LoginCard;
