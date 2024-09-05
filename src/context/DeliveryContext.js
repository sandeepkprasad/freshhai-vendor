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
import { collection, getDocs, addDoc } from "firebase/firestore";

export const DeliveryContext = createContext();

const DeliveryProvider = ({ children }) => {
  const { firestore } = useContext(FirebaseContext);
  const [allDeliveryPartners, setAllDeliveryPartners] = useState([]);
  const [deliveryFilter, setDeliveryFilter] = useState({ phone: "" });
  const [partnerToView, setPartnerToView] = useState(null);
  const [isPartnerModal, setIsPartnerModal] = useState(false);

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

  useEffect(() => {
    getDeliveryPartners();
    console.log("Getting all delivery partners.");
  }, [getDeliveryPartners]);

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
      }}
    >
      {children}
    </DeliveryContext.Provider>
  );
};

export default DeliveryProvider;
