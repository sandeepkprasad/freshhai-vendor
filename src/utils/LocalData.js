export const newProductSchema = {
  id: "",
  name: "",
  description: "",
  category: "",
  price: null,
  discount: null,
  available: "",
  imageUrl: "",
  brand: "",
  weight: "",
  unit: "",
  rating: null,
  numReviews: null,
  createdAt: new Date(),
  updatedAt: new Date(),
  expiryDate: new Date(new Date().setDate(new Date().getDate() + 3)),
  storageTemperature: "",
  isHalal: true,
  origin: "",
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
