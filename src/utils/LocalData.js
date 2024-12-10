import { serverTimestamp } from "firebase/firestore";

const timestamp = serverTimestamp();

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
  createdAt: timestamp,
};

export const deliveryPartnerSchema = {
  name: "John Doe",
  phone_number: "+91XXXXXXXXXX",
  email: "john.doe@example.com",
  profile_picture_url: "https://firebasestorage.googleapis.com/...",
  vehicle_details: {
    vehicle_type: "bike",
    vehicle_number: "KA-01-1234",
    license_number: "DL1234567890",
  },
  status: {
    active: true,
    online_status: true,
  },
  current_location: {
    latitude: 12.9715987,
    longitude: 77.5945627,
  },
  total_deliveries: 150,
  rating: 4.8,
  earnings: {
    total_earnings: 50000,
    earnings_details: [
      {
        order_id: "order123",
        amount: 300,
        date: "2024-09-05T12:00:00Z",
      },
      {
        order_id: "order124",
        amount: 200,
        date: "2024-09-05T14:00:00Z",
      },
    ],
  },
  assigned_orders: ["order123", "order124"],
  order_history: ["order101", "order102", "order103"],
  availability: true,
  createdAt: timestamp,
};

export const orderSchema = {
  user_id: "user123",
  order_status: "Placed", // Status of the order (e.g., placed, confirmed, dispatched, delivered, cancelled)
  payment_status: "Paid",
  payment_method: "credit_card",
  total_amount: 1200,
  discount: 100,
  net_amount: 1100,
  order_items: [
    {
      item_id: "item123",
      name: "Fresh Fish",
      quantity: 2,
      price: 600,
      discount: 50,
      final_price: 550,
      weight: "1kg",
      category: "Fish",
      image_url: "https://firebasestorage.googleapis.com/...",
    },
    {
      item_id: "item124",
      name: "Chicken",
      quantity: 1,
      price: 500,
      discount: 50,
      final_price: 450,
      weight: "1kg",
      category: "Poultry",
      image_url: "https://firebasestorage.googleapis.com/...",
    },
  ],
  delivery_address: {
    name: "Jane Doe",
    address_line_1: "123 Main Street",
    address_line_2: "Apartment 4B",
    city: "Bangalore",
    state: "Karnataka",
    pincode: "560001",
    phone_number: "+91XXXXXXXXXX",
    location: {
      latitude: 12.9715987,
      longitude: 77.5945627,
    },
  },
  delivery_charges: 29,
  delivery_instructions: "Leave at the front door",
  delivery_partner_id: "partner123",
  estimated_delivery_time: "2024-09-05T12:30:00Z",
  actual_delivery_time: "2024-09-05T12:45:00Z",
  order_placed_at: "2024-09-05T10:00:00Z",
  order_confirmed_at: "2024-09-05T10:15:00Z",
  order_dispatched_at: "2024-09-05T11:00:00Z",
  order_delivered_at: "2024-09-05T12:45:00Z",
  order_cancelled_at: null,
  order_rating: null,
  promo_code_applied: "FRESH10",
  order_notes: "Please deliver fresh items",
  order_tracking: [
    {
      status: "Order Placed",
      timestamp: "2024-09-05T10:00:00Z",
    },
    {
      status: "Order Confirmed",
      timestamp: "2024-09-05T10:15:00Z",
    },
    {
      status: "Order Dispatched",
      timestamp: "2024-09-05T11:00:00Z",
    },
    {
      status: "Out for Delivery",
      timestamp: "2024-09-05T12:00:00Z",
    },
    {
      status: "Delivered",
      timestamp: "2024-09-05T12:45:00Z",
    },
  ],
  createdAt: timestamp,
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
    "Placed",
    "Processing",
    "Shipped",
    "Out for Delivery",
    "Delivered",
    "Completed",
    "Cancelled",
    "Returned",
    "Failed",
    "Refunded",
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

export const registeredAdmins = [
  "sandeep@freshhai.com",
  "kundan@freshhai.com, sandeepkr648@gmail.com",
];
