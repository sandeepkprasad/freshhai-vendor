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
  limit,
  startAfter,
} from "firebase/firestore";

export const DeliveryContext = createContext();

const DeliveryProvider = ({ children }) => {
  const { firestore } = useContext(FirebaseContext);
  const [allDeliveryPartners, setAllDeliveryPartners] = useState([]);
  const [lastVisibleDeliveryPartner, setLastVisibleDeliveryPartner] =
    useState(null);
  const [deliveryFilter, setDeliveryFilter] = useState({ phone: "" });
  const [partnerToView, setPartnerToView] = useState(null);
  const [isPartnerModal, setIsPartnerModal] = useState(false);
  const [availablePartnersCount, setAvailablePartnersCount] = useState(0);
  const [totalPartnersCount, setTotalPartnersCount] = useState(0);
  const [inactivePartnersCount, setInactivePartnersCount] = useState(0);

  // Fetch all delivery partners
  const getDeliveryPartners = useCallback(
    async (lastDoc = null) => {
      try {
        const deliveryPartnersCollectionRef = collection(
          firestore,
          "deliveryPartners"
        );

        let deliveryPartnersQuery = query(
          deliveryPartnersCollectionRef,
          limit(20)
        );

        if (lastDoc) {
          deliveryPartnersQuery = query(
            deliveryPartnersCollectionRef,
            startAfter(lastDoc),
            limit(20)
          );
        }

        const querySnapshot = await getDocs(deliveryPartnersQuery);

        const lastVisible = querySnapshot.docs[querySnapshot.docs.length - 1];

        const deliveryPartnersList = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setAllDeliveryPartners((prevDeliveryPartners) => [
          ...prevDeliveryPartners,
          ...deliveryPartnersList,
        ]);

        setLastVisibleDeliveryPartner(lastVisible);
      } catch (error) {
        console.error("Error fetching delivery partners: ", error);
      }
    },
    [firestore]
  );

  const fetchNextDeliveryPartnersPage = () => {
    if (lastVisibleDeliveryPartner) {
      getDeliveryPartners(lastVisibleDeliveryPartner);
    }
  };

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

  // Handle user modal
  const handleDeliveryPartnerModal = (getDeliveryPartnerId) => {
    const dataById = allDeliveryPartners?.find(
      (deliveryPartner) => deliveryPartner?.id === getDeliveryPartnerId
    );
    setPartnerToView(dataById);
    setIsPartnerModal(true);
  };

  // Get Delivery Agent By Phone
  const getAgentByPhone = useCallback(async () => {
    try {
      const agentByPhoneCollectionRef = collection(
        firestore,
        "deliveryPartners"
      );

      const q = deliveryFilter?.phone
        ? query(
            agentByPhoneCollectionRef,
            where("phone_number", "==", deliveryFilter.phone)
          )
        : agentByPhoneCollectionRef;

      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        const doc = querySnapshot.docs[0];
        const deliveryAgentData = {
          id: doc.id,
          ...doc.data(),
        };

        setPartnerToView(deliveryAgentData);
        setIsPartnerModal(true);
      } else {
        console.warn("No delivery agent found with the provided phone number.");
        setPartnerToView(null);
      }
    } catch (error) {
      console.error("Error fetching delivery agent by phone number: ", error);
    }
  }, [firestore, deliveryFilter.phone]);

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
      "Getting all partners & available, total and suspended partners count."
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
        availablePartnersCount,
        totalPartnersCount,
        inactivePartnersCount,
        getAgentByPhone,
        fetchNextDeliveryPartnersPage,
      }}
    >
      {children}
    </DeliveryContext.Provider>
  );
};

export default DeliveryProvider;
