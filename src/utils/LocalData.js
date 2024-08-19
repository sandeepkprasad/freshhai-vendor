export const newProductSchema = {
  imageUrl: [],
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
