export const newProductSchema = {
  imageUrl: null,
  name: "",
  description: "",
  category: "",
  price: null,
  discount: null,
  available: "",
  brand: "",
  weight: "",
  unit: "",
  rating: null,
  numReviews: null,
  expiryDate: "",
  storageTemperature: "",
  isHalal: true,
  origin: "",
};

export const newDeliveryPartnersSchema = {
  imageUrl: null,
  name: "",
  contact: {
    phone: "",
    email: "",
  },
  address: {
    street: "",
    city: "",
    state: "",
    zip: "",
  },
  vehicle: "",
  licenseNumber: "",
  status: "Active",
  availability: "Available",
};

export const productFilterData = {
  category: ["Fish", "Prawns", "Crab", "Seafood", "Poultry", "Meat"],
  stock: ["Available", "Not Available"],
  brand: ["Fresh Water", "Local Catch"],
  origin: ["Andhra Pradesh", "West Bengal", "Bihar", "Local"],
};

export const orderFilterData = {
  status: [
    "Pending",
    "Processing",
    "Shipped",
    "Out for Delivery",
    "Delivered",
    "Completed",
    "Cancelled",
    "Returned",
  ],
};

export const productCategory = [
  "Fish",
  "Prawns",
  "Crab",
  "Seafood",
  "Poultry",
  "Meat",
];

export const productBrand = ["Fresh Water", "Local Catch"];

export const productOrigin = [
  "Andhra Pradesh",
  "West Bengal",
  "Bihar",
  "Local",
];

export const productTemperature = ["0 to 4 °C", "-1 to 1 °C"];

export const productWeight = ["500", "0.5", "1000", "1", "2000", "2"];

export const productUnit = ["kg", "g", "L", "ml", "pcs"];

export const productAvailability = ["Available", "Not Available"];

export const defaultImageAssets = {
  brandLogo:
    "https://firebasestorage.googleapis.com/v0/b/freshhai-all.appspot.com/o/assets%2Ffreshhai.png?alt=media&token=fbb4cdf7-d73d-4a42-ba6e-1ca8cb54d52f",
  defaultProfileImageUrl:
    "https://firebasestorage.googleapis.com/v0/b/freshhai-all.appspot.com/o/assets%2Fdefault_profile.png?alt=media&token=0c163555-232c-4506-ac11-dc6c1424959a",
  pageNotFoundImageUrl:
    "https://firebasestorage.googleapis.com/v0/b/freshhai-all.appspot.com/o/assets%2FpageNotFound.jpeg?alt=media&token=d1cdf64a-fa05-4b0c-855f-64ea6a383bc3",
  imageNotFoundUrl:
    "https://firebasestorage.googleapis.com/v0/b/freshhai-all.appspot.com/o/assets%2Fimage_not_found.jpeg?alt=media&token=36664369-acad-44f9-8a36-0a2510012ef9",
};
