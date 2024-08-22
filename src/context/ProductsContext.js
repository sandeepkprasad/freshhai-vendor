// ProductContext.js
import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  useCallback,
} from "react";
import { FirebaseContext } from "./FirebaseContext";

// Firebase Services
import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  doc,
  deleteDoc,
} from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

export const ProductsContext = createContext();

const ProductsProvider = ({ children }) => {
  const { firestore, storage } = useContext(FirebaseContext);
  const [allProducts, setAllProducts] = useState([]);
  const [isAddModal, setIsAddModal] = useState(false);
  const [isUpdateModal, setIsUpdateModal] = useState(false);
  const [productToUpdate, setProductToUpdate] = useState(null);
  const [isDeleteModal, setIsDeleteModal] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);
  const [notificationData, setNotificationData] = useState({
    flag: false,
    type: "",
    text: "",
  });

  // Handle Notification Popup
  const handleNotification = (getFlag, getType, getText) => {
    setNotificationData({
      flag: getFlag,
      type: getType,
      text: getText,
    });
  };

  // Upload image to Firebase Storage
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

  // Fetch all products
  const getProducts = useCallback(async () => {
    try {
      const productsCollectionRef = collection(firestore, "products");
      const querySnapshot = await getDocs(productsCollectionRef);
      const productsList = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setAllProducts(productsList);
    } catch (error) {
      console.error("Error fetching products: ", error);
    }
  }, [firestore]);

  useEffect(() => {
    getProducts();
  }, [getProducts]);

  // Add new product
  const addProduct = async (productToAdd) => {
    const isValid =
      productToAdd?.imageUrl &&
      productToAdd?.name &&
      productToAdd?.description &&
      productToAdd?.category &&
      productToAdd?.price !== undefined &&
      productToAdd?.discount !== undefined &&
      productToAdd?.brand &&
      productToAdd?.weight !== undefined &&
      productToAdd?.unit &&
      productToAdd?.storageTemperature &&
      productToAdd?.origin &&
      productToAdd?.available;

    if (isValid) {
      const imageUrlToUpoad = await uploadImageToStorage(
        productToAdd?.imageUrl,
        "products"
      );

      await addDoc(collection(firestore, "products"), {
        imageUrl: imageUrlToUpoad,
        name: productToAdd?.name,
        category: productToAdd?.category,
        price: productToAdd?.price,
        description: productToAdd?.description,
        available: productToAdd?.available,
        discount: productToAdd?.discount,
        brand: productToAdd?.brand,
        weight: productToAdd?.weight,
        unit: productToAdd?.unit,
        storageTemperature: productToAdd?.storageTemperature,
        origin: productToAdd?.origin,
        rating: productToAdd?.rating,
        numReviews: productToAdd?.numReviews,
        expiryDate: productToAdd?.expiryDate,
        isHalal: productToAdd?.isHalal,
      });
      setAllProducts((prevProducts) => [...prevProducts, productToAdd]);
      handleNotification(true, "green", "Product added successfully.");
      setIsAddModal(false);
    } else {
      handleNotification(true, "red", "Please fill all the details.");
    }
  };

  // Update product
  const updateProduct = async (updatedProduct) => {
    const docRef = doc(firestore, "products", updatedProduct.id);
    await updateDoc(docRef, updatedProduct);
    setAllProducts((prevProducts) =>
      prevProducts.map((product) =>
        product.id === updatedProduct.id ? updatedProduct : product
      )
    );
    setIsUpdateModal(false);
  };

  // Delete product
  const deleteProduct = async () => {
    const docRef = doc(firestore, "products", productToDelete);
    await deleteDoc(docRef);
    setAllProducts((prevProducts) =>
      prevProducts.filter((product) => product.id !== productToDelete)
    );
    setIsDeleteModal(false);
  };

  return (
    <ProductsContext.Provider
      value={{
        allProducts,
        setAllProducts,
        isAddModal,
        setIsAddModal,
        isUpdateModal,
        setIsUpdateModal,
        productToUpdate,
        setProductToUpdate,
        isDeleteModal,
        setIsDeleteModal,
        productToDelete,
        setProductToDelete,
        addProduct,
        updateProduct,
        deleteProduct,
        getProducts,
        notificationData,
      }}
    >
      {children}
    </ProductsContext.Provider>
  );
};

export default ProductsProvider;
