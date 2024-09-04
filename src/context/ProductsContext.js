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
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [notificationData, setNotificationData] = useState({
    flag: false,
    type: "",
    text: "",
  });
  const [productFilter, setProductFilter] = useState({
    category: "",
    available: "",
    brand: "",
    origin: "",
  });

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

  // Handle Notification Popup
  const handleNotification = (getFlag, getType, getText) => {
    setNotificationData({
      flag: getFlag,
      type: getType,
      text: getText,
    });
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
    console.log("Getting all products.");
  }, [getProducts]);

  // Add new product
  const addProduct = async (productToAdd) => {
    const isValid =
      productToAdd?.imageUrl &&
      productToAdd?.name &&
      productToAdd?.description &&
      productToAdd?.category?.main &&
      productToAdd?.price?.regular !== undefined &&
      productToAdd?.price?.sale !== undefined &&
      productToAdd?.discount?.value !== undefined &&
      productToAdd?.brand &&
      productToAdd?.weight?.value !== undefined &&
      productToAdd?.weight?.unit &&
      productToAdd?.storageTemperature &&
      productToAdd?.origin &&
      productToAdd?.isAvailable;

    if (isValid) {
      const imageUrlToUpoad = await uploadImageToStorage(
        productToAdd?.imageUrl,
        "products"
      );

      await addDoc(collection(firestore, "products"), {
        imageUrl: imageUrlToUpoad,
        name: productToAdd?.name,
        category: {
          main: productToAdd?.category?.main,
          sub: productToAdd?.category?.sub,
        },
        price: {
          regular: productToAdd?.price?.regular,
          sale: productToAdd?.price?.sale,
        },
        description: productToAdd?.description,
        isAvailable: productToAdd?.isAvailable,
        discount: {
          value: productToAdd?.discount?.value,
          type: productToAdd?.discount?.type,
        },
        brand: productToAdd?.brand,
        weight: {
          value: productToAdd?.weight?.value,
          unit: productToAdd?.weight?.unit,
        },
        storageTemperature: productToAdd?.storageTemperature,
        origin: productToAdd?.origin,
        isHalal: productToAdd?.isHalal,
      });
      getProducts();
      console.log("New product added to database.");
      handleNotification(true, "green", "Product added successfully.");
      setIsAddModal(false);
    } else {
      handleNotification(true, "red", "Please fill all the details.");
    }
  };

  // Product Update Modal
  const handleUpdateModal = (getId) => {
    const dataById = allProducts?.find((product) => product?.id === getId);
    setProductToUpdate(dataById);
    setIsUpdateModal(true);
  };

  // Product Update
  const updateProduct = async (updatedProduct) => {
    const isValid =
      updatedProduct?.imageUrl &&
      updatedProduct?.name &&
      updatedProduct?.description &&
      updatedProduct?.category?.main &&
      updatedProduct?.price?.regular !== undefined &&
      updatedProduct?.price?.sale !== undefined &&
      updatedProduct?.discount?.value !== undefined &&
      updatedProduct?.brand &&
      updatedProduct?.weight?.value !== undefined &&
      updatedProduct?.weight?.unit &&
      updatedProduct?.storageTemperature &&
      updatedProduct?.origin &&
      updatedProduct?.isAvailable;

    if (isValid) {
      const docRef = doc(firestore, "products", updatedProduct?.id);
      await updateDoc(docRef, updatedProduct);
      getProducts();
      console.log("Product updated to database.");
      handleNotification(true, "green", "Product updated successfully.");
      setIsUpdateModal(false);
    } else {
      handleNotification(true, "red", "Please fill all the details.");
    }
  };

  // Product Delete Modal
  const handleDeleteModal = (getId) => {
    setProductToDelete(getId);
    setIsDeleteModal(true);
  };

  // Product Delete
  const deleteProductById = async () => {
    const docRef = doc(firestore, "products", productToDelete);
    await deleteDoc(docRef);
    getProducts();
    console.log("Product deleted from database.");
    handleNotification(true, "red", "Product deleted successfully.");
    setIsDeleteModal(false);
  };

  return (
    <ProductsContext.Provider
      value={{
        isDarkMode,
        setIsDarkMode,
        handleNotification,
        notificationData,
        uploadImageToStorage,
        allProducts,
        isAddModal,
        setIsAddModal,
        isUpdateModal,
        setIsUpdateModal,
        productToUpdate,
        isDeleteModal,
        setIsDeleteModal,
        addProduct,
        handleUpdateModal,
        updateProduct,
        handleDeleteModal,
        deleteProductById,
        getProducts,
        productFilter,
        setProductFilter,
      }}
    >
      {children}
    </ProductsContext.Provider>
  );
};

export default ProductsProvider;
