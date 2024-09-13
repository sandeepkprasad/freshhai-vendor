import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  useCallback,
} from "react";
import { FirebaseContext } from "./FirebaseContext";

// Fake data
import { deliveryPartnerSchema } from "../utils/LocalData";

// Firebase Services
import {
  collection,
  getDocs,
  addDoc,
  query,
  where,
  getCountFromServer,
} from "firebase/firestore";

export const DeliveryContext = createContext();

const DeliveryProvider = ({ children }) => {
  const { firestore } = useContext(FirebaseContext);
  const [allDeliveryPartners, setAllDeliveryPartners] = useState([]);
  const [deliveryFilter, setDeliveryFilter] = useState({ phone: "" });
  const [partnerToView, setPartnerToView] = useState(null);
  const [isPartnerModal, setIsPartnerModal] = useState(false);
  const [availablePartnersCount, setAvailablePartnersCount] = useState(0);
  const [totalPartnersCount, setTotalPartnersCount] = useState(0);
  const [inactivePartnersCount, setInactivePartnersCount] = useState(0);

  // Fetch all delivery partners
  const getDeliveryPartners = useCallback(async () => {
    try {
      const deliveryPartnersCollectionRef = collection(
        firestore,
        "deliveryPartners"
      );
      const querySnapshot = await getDocs(deliveryPartnersCollectionRef);
      const deliveryPartnersList = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setAllDeliveryPartners(deliveryPartnersList);
    } catch (error) {
      console.error("Error fetching delivery partners: ", error);
    }
  }, [firestore]);

  // Add fake delivery partners
  const addDeliveryPartners = async () => {
    try {
      await addDoc(
        collection(firestore, "deliveryPartners"),
        deliveryPartnerSchema
      );
      getDeliveryPartners();
      console.log("New delivery partner added to database.");
    } catch (error) {
      console.log("Error while adding delivery partner : ", error);
    }
  };

  const handleDeliveryPartnerFilter = () => {
    console.log("Delivery partner filter clicked : ", deliveryFilter);
  };

  // Handle user modal
  const handleDeliveryPartnerModal = (getDeliveryPartnerId) => {
    const dataById = allDeliveryPartners?.find(
      (deliveryPartner) => deliveryPartner?.id === getDeliveryPartnerId
    );
    setPartnerToView(dataById);
    setIsPartnerModal(true);
  };

  const getAvailablePartnerCount = useCallback(async () => {
    try {
      const availablePartnerCountCollectionRef = collection(
        firestore,
        "deliveryPartners"
      );

      const q = query(
        availablePartnerCountCollectionRef,
        where("availability", "==", true)
      );

      const countSnapshot = await getCountFromServer(q);
      const availablePartnerCount = countSnapshot.data().count;

      setAvailablePartnersCount(availablePartnerCount);
    } catch (error) {
      console.error("Error fetching available partner count: ", error);
    }
  }, [firestore]);

  const getTotalPartnerCount = useCallback(async () => {
    try {
      const totalPartnerCountCollectionRef = collection(
        firestore,
        "deliveryPartners"
      );

      const q = query(totalPartnerCountCollectionRef);

      const countSnapshot = await getCountFromServer(q);
      const totalPartnerCount = countSnapshot.data().count;

      setTotalPartnersCount(totalPartnerCount);
    } catch (error) {
      console.error("Error fetching total partner count: ", error);
    }
  }, [firestore]);

  const getInactivePartnerCount = useCallback(async () => {
    try {
      const inactivePartnerCountCollectionRef = collection(
        firestore,
        "deliveryPartners"
      );

      const q = query(
        inactivePartnerCountCollectionRef,
        where("status.active", "==", false)
      );

      const countSnapshot = await getCountFromServer(q);
      const inactivePartnerCount = countSnapshot.data().count;

      setInactivePartnersCount(inactivePartnerCount);
    } catch (error) {
      console.error("Error fetching inactive partner count: ", error);
    }
  }, [firestore]);

  useEffect(() => {
    getDeliveryPartners();
    getAvailablePartnerCount();
    getTotalPartnerCount();
    getInactivePartnerCount();
    console.log(
      "Getting all partners & available, total and suspended partners."
    );
  }, [
    getDeliveryPartners,
    getAvailablePartnerCount,
    getTotalPartnerCount,
    getInactivePartnerCount,
  ]);

  return (
    <DeliveryContext.Provider
      value={{
        allDeliveryPartners,
        addDeliveryPartners,
        handleDeliveryPartnerModal,
        isPartnerModal,
        setIsPartnerModal,
        partnerToView,
        setPartnerToView,
        deliveryFilter,
        setDeliveryFilter,
        handleDeliveryPartnerFilter,
        availablePartnersCount,
        totalPartnersCount,
        inactivePartnersCount,
      }}
    >
      {children}
    </DeliveryContext.Provider>
  );
};

export default DeliveryProvider;
