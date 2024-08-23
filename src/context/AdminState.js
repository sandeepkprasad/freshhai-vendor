import React, { useContext, useState, useEffect, useCallback } from "react";
import { FirebaseContext } from "./FirebaseContext";
import adminContext from "./adminContext";

// Firebase Imports
import { collection, addDoc, getDocs, query, where } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

// Fake Data Imports
import { allProductsData } from "../api/allProducts";
import { userData } from "../api/apiHandler";

const AdminState = ({ children }) => {
  const { auth, firestore, storage, handleNotification } =
    useContext(FirebaseContext);
  const [topSellingProducts, setTopSellingProducts] = useState([]);
  const [totalUsers, setTotalUsers] = useState(userData);
  const [deliveryPartners, setDeliveryPartners] = useState([]);
  const [activeDeliveryPartners, setActiveDeliveryPartners] = useState([]);
  const [suspendedDeliveryPartners, setSuspendedDeliveryPartners] = useState(
    []
  );
  const [deliveryPartnersCount, setDeliveryPartnersCount] = useState({
    total: 0,
    active: 0,
    suspended: 0,
  });
  const [userFilter, setUserFilter] = useState({ phone: "", isBlocked: "" });
  const [deliveryFilter, setDeliveryFilter] = useState({ name: "", phone: "" });
  const [isUserModal, setIsUserModal] = useState(false);
  const [userToUpdate, setUserToUpdate] = useState(null);
  const [isDeliveryAgentModal, setIsDeliveryAgentModal] = useState(false);
  const [viewDeliveryPartner, setViewDeliveryPartner] = useState(null);
  const [isViewDeliveryPartnerModal, setIsViewDeliveryPartnerModal] =
    useState(false);

  // Updating topSellingProducts & allOrders data
  useEffect(() => {
    setTopSellingProducts(allProductsData);
  }, []);

  // Image Upload
  const uploadImageToStorage = async (imageFile, pathToAdd) => {
    const timestamp = new Date().toISOString().replace(/[:.]/g, "-");

    const storageRef = ref(
      storage,
      `${pathToAdd}/${timestamp}_${imageFile.name}`
    );
    await uploadBytes(storageRef, imageFile);
    const downloadURL = await getDownloadURL(storageRef);
    return downloadURL;
  };

  // Handle User Modal
  const handleUserModal = (getUserId) => {
    const dataById = totalUsers?.find((user) => user?.userId === getUserId);
    setUserToUpdate(dataById);
    setIsUserModal(true);
  };

  // User Update
  const updateUser = (updatedUser) => {
    if (updatedUser) {
      setTotalUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.userId === updatedUser.userId ? updatedUser : user
        )
      );
      setIsUserModal(false);
      handleNotification(true, "green", "User updated successfully.");
    } else {
      handleNotification(true, "red", "User couldn't update.");
    }
  };

  // Handle View Delivery Partner
  const handleDeliveryPartnerModal = (deliveryPartnerToView) => {
    setViewDeliveryPartner(deliveryPartnerToView);
    setIsViewDeliveryPartnerModal(true);
    console.log("Delivery Partner to view : ", deliveryPartnerToView);
  };

  // Add Delivery Partners
  const addDeliveryAgent = async (agentToAdd) => {
    const isValid =
      agentToAdd?.imageUrl &&
      agentToAdd?.name &&
      agentToAdd?.availability &&
      agentToAdd?.vehicle &&
      agentToAdd?.licenseNumber &&
      agentToAdd?.status &&
      agentToAdd?.contact?.phone !== undefined &&
      agentToAdd?.contact?.email &&
      agentToAdd?.address?.street &&
      agentToAdd?.address?.city &&
      agentToAdd?.address?.state &&
      agentToAdd?.address?.zip !== undefined;

    if (isValid) {
      const imageUrlToUpoad = await uploadImageToStorage(
        agentToAdd?.imageUrl,
        "delivery-partners"
      );

      await addDoc(collection(firestore, "deliveryPartners"), {
        imageUrl: imageUrlToUpoad,
        name: agentToAdd?.name,
        availability: agentToAdd?.availability,
        vehicle: agentToAdd?.vehicle,
        licenseNumber: agentToAdd?.licenseNumber,
        status: agentToAdd?.status,
        contact: {
          phone: agentToAdd?.contact?.phone,
          email: agentToAdd?.contact?.email,
        },
        address: {
          street: agentToAdd?.address?.street,
          city: agentToAdd?.address?.city,
          state: agentToAdd?.address?.state,
          zip: agentToAdd?.address?.zip,
        },
      });
      setDeliveryPartners((prevProducts) => [...prevProducts, agentToAdd]);
      handleNotification(true, "green", "Delivery Agent added successfully.");
      setIsDeliveryAgentModal(false);
    } else {
      handleNotification(true, "red", "Please fill all the details.");
    }
  };

  // Handle Get All Delivery Partners
  const getAllDeliveryPartners = async () => {
    const deliveryPartnersCollectionRef = collection(
      firestore,
      "deliveryPartners"
    );
    const querySnapshot = await getDocs(deliveryPartnersCollectionRef);
    const deliveryPartnersList = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    console.log("All Delivery Partners : ", deliveryPartnersList);
    setDeliveryPartners(deliveryPartnersList);
  };

  // Handle Get Active Delivery Partners
  const getActiveDeliveryPartners = useCallback(async () => {
    const deliveryPartnersCollectionRef = collection(
      firestore,
      "deliveryPartners"
    );

    const activeDeliveryPartnersQuery = query(
      deliveryPartnersCollectionRef,
      where("status", "==", "Active")
    );

    const querySnapshot = await getDocs(activeDeliveryPartnersQuery);

    const deliveryPartnersList = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    console.log("Active Delivery Partners : ", deliveryPartnersList);
    setActiveDeliveryPartners(deliveryPartnersList);
  }, [firestore]);

  // Handle Get Suspended Delivery Partners
  const getSuspendedDeliveryPartners = async () => {
    const deliveryPartnersCollectionRef = collection(
      firestore,
      "deliveryPartners"
    );

    const suspendedDeliveryPartnersQuery = query(
      deliveryPartnersCollectionRef,
      where("status", "==", "Suspended")
    );

    const querySnapshot = await getDocs(suspendedDeliveryPartnersQuery);

    const deliveryPartnersList = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    console.log("Suspended Delivery Partners : ", deliveryPartnersList);
    setSuspendedDeliveryPartners(deliveryPartnersList);
  };

  // Get Delivery Partners Counts
  const getDeliveryPartnersCount = useCallback(async () => {
    const deliveryPartnersCollectionRef = collection(
      firestore,
      "deliveryPartners"
    );

    // Total documents count
    const querySnapshot = await getDocs(deliveryPartnersCollectionRef);
    const totalDocuments = querySnapshot.size;
    console.log("Total Delivery Partners : ", totalDocuments);

    // Active documents count
    const activeQuery = query(
      deliveryPartnersCollectionRef,
      where("status", "==", "Active")
    );
    const activeQuerySnapshot = await getDocs(activeQuery);
    const activeDocumentsCount = activeQuerySnapshot.size;
    console.log("Active Delivery Partners : ", activeDocumentsCount);

    // Suspended documents count
    const suspendedQuery = query(
      deliveryPartnersCollectionRef,
      where("status", "==", "Suspended")
    );
    const suspendedQuerySnapshot = await getDocs(suspendedQuery);
    const suspendedDocumentsCount = suspendedQuerySnapshot.size;
    console.log("Suspended Delivery Partners : ", suspendedDocumentsCount);

    setDeliveryPartnersCount((prevState) => ({
      ...prevState,
      total: totalDocuments,
      active: activeDocumentsCount,
      suspended: suspendedDocumentsCount,
    }));
  }, [firestore]);

  return (
    <adminContext.Provider
      value={{
        auth,
        firestore,
        storage,
        uploadImageToStorage,
        topSellingProducts,
        totalUsers,
        handleUserModal,
        isUserModal,
        setIsUserModal,
        userToUpdate,
        updateUser,
        userFilter,
        setUserFilter,
        getActiveDeliveryPartners,
        getAllDeliveryPartners,
        getSuspendedDeliveryPartners,
        deliveryPartners,
        activeDeliveryPartners,
        suspendedDeliveryPartners,
        getDeliveryPartnersCount,
        deliveryPartnersCount,
        deliveryFilter,
        setDeliveryFilter,
        isDeliveryAgentModal,
        setIsDeliveryAgentModal,
        addDeliveryAgent,
        handleDeliveryPartnerModal,
        viewDeliveryPartner,
        isViewDeliveryPartnerModal,
        setIsViewDeliveryPartnerModal,
      }}
    >
      {children}
    </adminContext.Provider>
  );
};

export default AdminState;
