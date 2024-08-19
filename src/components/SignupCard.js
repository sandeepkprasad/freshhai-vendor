import React, { useContext, useState } from "react";
import adminContext from "../context/adminContext";
import { useNavigate } from "react-router-dom";

// Firebase Imports
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

// React Icons
import { ImEye, ImEyeBlocked } from "../utils/Icons";

const SignupCard = () => {
  const { app, handleNotification, setAdminProfile } = useContext(adminContext);
  const [signupCred, setSignupCred] = useState({ email: "", password: "" });
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordVisibility, setPasswordVisibility] = useState(false);
  const navigate = useNavigate();

  const auth = getAuth(app);

  // Handle Admin Signup OnChange
  const handleAdminSignupChange = (e) => {
    const { name, value } = e.target;
    setSignupCred((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Handle Admin Confirn Password OnChange
  const handleAdminConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  const handlePasswordVisibility = () => {
    setPasswordVisibility((prev) => !prev);
  };

  // Handle Admin Signup
  const handleAdminSignup = () => {
    if (
      signupCred?.email &&
      signupCred?.password &&
      signupCred?.password === confirmPassword
    ) {
      createUserWithEmailAndPassword(
        auth,
        signupCred?.email,
        signupCred?.password
      )
        .then((userCredential) => {
          setAdminProfile(userCredential?.user);
          handleNotification(true, "green", "Signed up successfully.");
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
        Please fill in your unique admin signup details below.
      </p>
      <input
        type="text"
        placeholder="Enter Email"
        name="email"
        value={signupCred?.email}
        onChange={handleAdminSignupChange}
        required
        className="w-[50%] h-[10%] bg-neutral-gray-light border rounded-xl px-[2%] focus:outline-none"
      />
      <div className="w-[50%] h-[10%] relative">
        <input
          type={passwordVisibility ? "text" : "password"}
          placeholder="Enter Password"
          name="password"
          value={signupCred?.password}
          onChange={handleAdminSignupChange}
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
      <div className="w-[50%] h-[10%] relative">
        <input
          type={passwordVisibility ? "text" : "password"}
          placeholder="Enter Confirm Password"
          name="password"
          value={confirmPassword}
          onChange={handleAdminConfirmPasswordChange}
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
        onClick={handleAdminSignup}
      >
        Signup
      </button>
    </div>
  );
};

export default SignupCard;