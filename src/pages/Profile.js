import React, { useContext, useState, useRef, useEffect, useMemo } from "react";
import adminContext from "../context/adminContext";
import { useNavigate } from "react-router-dom";
import { defaultImageAssets } from "../utils/LocalData";

// Firebase Imports
import { getAuth, onAuthStateChanged, updateProfile } from "firebase/auth";

// React Icons
import { MdEdit } from "../utils/Icons";

// Components Imports
import DashboardWrapper from "../components/DashboardWrapper";
import Heading from "../components/customComponents/Heading";

const Profile = () => {
  const { app, isDarkMode, handleNotification, uploadImageToStorage } =
    useContext(adminContext);
  const [isProfileUpdate, setProfileUpdate] = useState(false);
  const [adminProfileUpdate, setAdminProfileUpdate] = useState({
    img: null,
    imgUrl: "",
    name: "",
    email: "",
  });
  const fileInputRef = useRef(null);
  const navigate = useNavigate();
  const auth = useMemo(() => getAuth(app), [app]);
  const getCurrentUser = auth.currentUser;

  // Handling Admin Login State
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setAdminProfileUpdate((prevData) => ({
          ...prevData,
          imgUrl: user?.photoURL,
          name: user?.displayName,
          email: user?.email,
        }));
        navigate("/profile");
      } else {
        navigate("/login");
      }
    });
  }, [auth, navigate, setAdminProfileUpdate]);

  const handleImageUpload = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleImageChange = (e) => {
    const fileData = e.target.files[0];
    setAdminProfileUpdate((prevState) => ({
      ...prevState,
      img: fileData,
    }));
  };

  const handleProfileChange = (e) => {
    const { value } = e.target;
    setAdminProfileUpdate((prevData) => ({
      ...prevData,
      name: value,
    }));
  };

  // Edit Admin Profile
  const handleProfileEdit = () => {
    setProfileUpdate((prev) => !prev);
  };

  // Function to handle profile save
  const handleProfileSave = async () => {
    if (getCurrentUser && adminProfileUpdate?.img && adminProfileUpdate?.name) {
      const imageUrlToUpoad = await uploadImageToStorage(
        adminProfileUpdate?.img,
        "admin-profile"
      );

      updateProfile(getCurrentUser, {
        displayName: adminProfileUpdate?.name || getCurrentUser.displayName,
        photoURL: imageUrlToUpoad,
      })
        .then(() => {
          handleNotification(true, "green", "Profile updated successfully.");
          setProfileUpdate((prev) => !prev);
        })
        .catch((error) => {
          console.error("Error updating profile:", error);
          handleNotification(true, "red", "Error while updating profile");
        });
    } else {
      handleNotification(true, "red", "Please fill all the details.");
    }
  };

  return (
    <DashboardWrapper>
      <div className="w-full h-full flex justify-between items-center pb-[0.5%] space-x-[2%] overflow-hidden">
        <div className="w-[80%] h-full flex flex-col justify-between items-center">
          <div className="w-full h-fit flex justify-start items-center">
            <Heading heading="Profile" />
          </div>
          <div
            className={`w-full h-[90%] ${
              isDarkMode
                ? "bg-neutral-black-dark border border-neutral-black-dark"
                : "bg-neutral-white border"
            } flex flex-col justify-between items-center rounded-3xl shadow-md space-y-[1%] p-[1%]`}
          >
            <div className="w-full h-fit flex justify-end items-center">
              {isProfileUpdate ? (
                <div className="w-full h-fit flex justify-end items-center space-x-[1%]">
                  <button
                    className="buttonClass bg-primary-blue-dark"
                    onClick={handleProfileSave}
                  >
                    Save
                  </button>
                  <button
                    className="buttonClass bg-secondary-red-dark"
                    onClick={handleProfileEdit}
                  >
                    Cancel
                  </button>
                </div>
              ) : (
                <button
                  className="buttonClass bg-primary-blue-dark"
                  onClick={handleProfileEdit}
                >
                  Edit
                </button>
              )}
            </div>
            <div className="w-full h-[95%] flex flex-col justify-center items-center">
              {isProfileUpdate ? (
                <div className="w-[25%] h-fit flex justify-center items-center mb-[1%] relative">
                  <img
                    src={
                      adminProfileUpdate?.img
                        ? adminProfileUpdate?.img
                        : adminProfileUpdate?.imgUrl
                    }
                    alt="admin_profile_img"
                    onError={(e) =>
                      (e.target.src =
                        defaultImageAssets?.defaultProfileImageUrl)
                    }
                    loading="lazy"
                    className="w-full bg-neutral-gray-light rounded-3xl object-contain"
                  />
                  <button
                    className="text-base text-neutral-black-dark border border-neutral-black-dark rounded-full p-[0.5%] active:scale-95 duration-300 absolute top-0 right-0"
                    onClick={handleImageUpload}
                  >
                    <MdEdit />
                  </button>
                  <input
                    type="file"
                    ref={fileInputRef}
                    style={{ display: "none" }}
                    onChange={handleImageChange}
                  />
                </div>
              ) : (
                <img
                  src={adminProfileUpdate?.imgUrl}
                  alt="admin_profile_img"
                  onError={(e) =>
                    (e.target.src = defaultImageAssets?.defaultProfileImageUrl)
                  }
                  loading="lazy"
                  className="w-[25%] bg-neutral-gray-light rounded-3xl object-contain"
                />
              )}
              {isProfileUpdate ? (
                <input
                  type="text"
                  placeholder="Full Name"
                  name="name"
                  value={adminProfileUpdate?.name}
                  onChange={handleProfileChange}
                  maxLength={25}
                  className={`w-[33%] ${
                    isDarkMode ? "inputClassDark" : "inputClassLight"
                  }`}
                />
              ) : (
                <p
                  className={`font-medium text-2xl ${
                    isDarkMode
                      ? "text-neutral-gray-light"
                      : "text-neutral-black-dark"
                  }`}
                >
                  {adminProfileUpdate?.name}
                </p>
              )}
              <p
                className={`font-normal text-lg ${
                  isDarkMode
                    ? "text-neutral-gray-light"
                    : "text-neutral-black-dark"
                }`}
              >
                {adminProfileUpdate?.email}
              </p>
            </div>
          </div>
        </div>
        <div className="w-[20%] h-full flex flex-col justify-between items-center"></div>
      </div>
    </DashboardWrapper>
  );
};

export default Profile;
