export const productSchema = {
  imageUrl: null,
  name: "",
  shortDescription: "",
  description: "",
  category: { main: "", sub: "" },
  price: {
    regular: null,
    sale: null,
  },
  discount: {
    value: null,
    type: "percentage",
  },
  isAvailable: "",
  inventory: null,
  brand: "",
  weight: {
    value: "",
    unit: "",
  },
  rating: null,
  numReviews: null,
  reviewIds: [],
  expiryDate: "",
  storageTemperature: "",
  isHalal: true,
  origin: "",
  productCode: "",
  tags: [],
  deliveryOptions: "",
  minOrderQuantity: null,
  loyaltyPoints: null,
};

export const userSchema = {
  basicInfo: {
    fullName: "John Doe",
    email: "john.doe@example.com",
    mobileNumber: "+919876543210",
    dateOfBirth: "1990-05-15",
    profilePictureUrl: "https://example.com/profile-pictures/john-doe.jpg",
  },
  addresses: [
    {
      type: "Home",
      addressLine1: "123 Main Street",
      addressLine2: "Apartment 4B",
      city: "Bangalore",
      state: "Karnataka",
      pincode: "560001",
      landmark: "Near MG Road",
      location: {
        latitude: 12.9715987,
        longitude: 77.594566,
      },
      isDefault: true,
    },
    {
      type: "Office",
      addressLine1: "456 Corporate Blvd",
      addressLine2: "Suite 200",
      city: "Bangalore",
      state: "Karnataka",
      pincode: "560002",
      landmark: "Near UB City",
      location: {
        latitude: 12.9715987,
        longitude: 77.594566,
      },
      isDefault: false,
    },
  ],
  paymentPreferences: {
    savedPaymentMethods: [
      {
        type: "Credit Card",
        cardNumber: "**** **** **** 1234",
        expiryDate: "12/25",
        cardholderName: "John Doe",
        isDefault: true,
      },
      {
        type: "UPI",
        upiId: "john.doe@upi",
        isDefault: false,
      },
    ],
  },
  wallet: {
    balance: 500.0,
    currency: "INR",
    transactions: [
      {
        transactionId: "txn_1",
        type: "Credit",
        amount: 200.0,
        description: "Added via UPI",
        timestamp: "2024-09-01T10:30:00Z",
      },
      {
        transactionId: "txn_2",
        type: "Debit",
        amount: 100.0,
        description: "Order Payment",
        timestamp: "2024-09-02T15:45:00Z",
      },
    ],
  },
  notificationPreferences: {
    orderNotifications: {
      sms: true,
      email: true,
      inApp: true,
    },
    promotionalNotifications: {
      sms: false,
      email: true,
      inApp: true,
    },
  },
  referral: {
    referralCode: "REF12345",
  },
  orderReferences: ["order_1", "order_2", "order_3"],
  userStatus: "active",
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
  "Mutton",
];

export const productBrand = ["FreshHai"];

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
