// Handle Total Order Data
export const allOrdersData = [
  {
    orderId: "ORD001",
    userId: "USER123",
    customerName: "John Doe",
    customerMobile: "+1-555-123-4567",
    items: [
      {
        itemId: "ITEM001",
        name: "Fresh Salmon",
        quantity: 2,
        price: 15.99,
        total: 31.98,
      },
      {
        itemId: "ITEM002",
        name: "Organic Tomatoes",
        quantity: 3,
        price: 3.49,
        total: 10.47,
      },
    ],
    totalPrice: 42.45,
    deliveryAddress: {
      street: "123 Ocean Ave",
      city: "San Francisco",
      state: "CA",
      postalCode: "94101",
      country: "USA",
      latitude: 37.7749,
      longitude: -122.4194,
    },
    status: "Out for Delivery",
    orderDate: "2024-07-25T14:00:00Z",
    deliveryDate: "2024-07-27T14:00:00Z",
    paymentMethod: "Credit Card",
    specialInstructions: "Leave at the front door if not home.",
    trackingNumber: "TRACK1234567890",
  },
  {
    orderId: "ORD002",
    userId: "USER456",
    customerName: "Jane Smith",
    customerMobile: "+1-555-234-5678",
    items: [
      {
        itemId: "ITEM003",
        name: "Free Range Chicken",
        quantity: 1,
        price: 9.99,
        total: 9.99,
      },
      {
        itemId: "ITEM004",
        name: "Basil",
        quantity: 1,
        price: 2.99,
        total: 2.99,
      },
      {
        itemId: "ITEM005",
        name: "Whole Wheat Bread",
        quantity: 2,
        price: 4.49,
        total: 8.98,
      },
    ],
    totalPrice: 21.96,
    deliveryAddress: {
      street: "456 Maple St",
      city: "Los Angeles",
      state: "CA",
      postalCode: "90001",
      country: "USA",
      latitude: 34.0522,
      longitude: -118.2437,
    },
    status: "Delivered",
    orderDate: "2024-07-24T10:30:00Z",
    deliveryDate: "2024-07-25T10:30:00Z",
    paymentMethod: "COD",
    specialInstructions: "Ring the doorbell when you arrive.",
    trackingNumber: "TRACK0987654321",
  },
  {
    orderId: "ORD003",
    userId: "USER789",
    customerName: "Emily Johnson",
    customerMobile: "+1-555-345-6789",
    items: [
      {
        itemId: "ITEM006",
        name: "Almond Milk",
        quantity: 1,
        price: 2.99,
        total: 2.99,
      },
      {
        itemId: "ITEM007",
        name: "Granola Bars",
        quantity: 3,
        price: 4.49,
        total: 13.47,
      },
    ],
    totalPrice: 16.46,
    deliveryAddress: {
      street: "789 Elm St",
      city: "Seattle",
      state: "WA",
      postalCode: "98101",
      country: "USA",
      latitude: 47.6062,
      longitude: -122.3321,
    },
    status: "Pending",
    orderDate: "2024-07-26T09:00:00Z",
    deliveryDate: "2024-07-28T09:00:00Z",
    paymentMethod: "Credit Card",
    specialInstructions: "Leave on the porch.",
    trackingNumber: "TRACK1122334455",
  },
  {
    orderId: "ORD004",
    userId: "USER012",
    customerName: "Michael Brown",
    customerMobile: "+1-555-456-7890",
    items: [
      {
        itemId: "ITEM008",
        name: "Greek Yogurt",
        quantity: 4,
        price: 1.99,
        total: 7.96,
      },
      {
        itemId: "ITEM009",
        name: "Honey",
        quantity: 1,
        price: 5.99,
        total: 5.99,
      },
    ],
    totalPrice: 13.95,
    deliveryAddress: {
      street: "321 Pine St",
      city: "Austin",
      state: "TX",
      postalCode: "73301",
      country: "USA",
      latitude: 30.2672,
      longitude: -97.7431,
    },
    status: "Shipped",
    orderDate: "2024-07-27T12:00:00Z",
    deliveryDate: "2024-07-29T12:00:00Z",
    paymentMethod: "UPI",
    specialInstructions: "Deliver between 2-4 PM.",
    trackingNumber: "TRACK5566778899",
  },
  {
    orderId: "ORD005",
    userId: "USER345",
    customerName: "Olivia Davis",
    customerMobile: "+1-555-567-8901",
    items: [
      {
        itemId: "ITEM010",
        name: "Spinach",
        quantity: 2,
        price: 2.49,
        total: 4.98,
      },
      {
        itemId: "ITEM011",
        name: "Carrots",
        quantity: 1,
        price: 1.49,
        total: 1.49,
      },
    ],
    totalPrice: 6.47,
    deliveryAddress: {
      street: "654 Oak St",
      city: "Chicago",
      state: "IL",
      postalCode: "60601",
      country: "USA",
      latitude: 41.8781,
      longitude: -87.6298,
    },
    status: "Delivered",
    orderDate: "2024-07-28T15:00:00Z",
    deliveryDate: "2024-07-29T15:00:00Z",
    paymentMethod: "Debit Card",
    specialInstructions: "Call upon arrival.",
    trackingNumber: "TRACK6677889900",
  },
  {
    orderId: "ORD006",
    userId: "USER678",
    customerName: "Liam Wilson",
    customerMobile: "+1-555-678-9012",
    items: [
      {
        itemId: "ITEM012",
        name: "Avocados",
        quantity: 5,
        price: 1.29,
        total: 6.45,
      },
      {
        itemId: "ITEM013",
        name: "Sourdough Bread",
        quantity: 1,
        price: 3.49,
        total: 3.49,
      },
    ],
    totalPrice: 9.94,
    deliveryAddress: {
      street: "987 Cedar St",
      city: "Portland",
      state: "OR",
      postalCode: "97201",
      country: "USA",
      latitude: 45.5152,
      longitude: -122.6784,
    },
    status: "Processing",
    orderDate: "2024-07-29T10:00:00Z",
    deliveryDate: "2024-07-31T10:00:00Z",
    paymentMethod: "Debit Card",
    specialInstructions: "Leave at side door.",
    trackingNumber: "TRACK7788990011",
  },
  {
    orderId: "ORD007",
    userId: "USER901",
    customerName: "Sophia Martinez",
    customerMobile: "+1-555-789-0123",
    items: [
      {
        itemId: "ITEM014",
        name: "Lemons",
        quantity: 6,
        price: 0.89,
        total: 5.34,
      },
      {
        itemId: "ITEM015",
        name: "Parsley",
        quantity: 1,
        price: 1.49,
        total: 1.49,
      },
    ],
    totalPrice: 6.83,
    deliveryAddress: {
      street: "135 Maple Ave",
      city: "Denver",
      state: "CO",
      postalCode: "80201",
      country: "USA",
      latitude: 39.7392,
      longitude: -104.9903,
    },
    status: "Pending",
    orderDate: "2024-07-30T11:00:00Z",
    deliveryDate: "2024-08-01T11:00:00Z",
    paymentMethod: "UPI",
    specialInstructions: "Leave at back door.",
    trackingNumber: "TRACK8899001122",
  },
  {
    orderId: "ORD008",
    userId: "USER234",
    customerName: "Mia Thompson",
    customerMobile: "+1-555-890-1234",
    items: [
      {
        itemId: "ITEM016",
        name: "Brown Rice",
        quantity: 2,
        price: 3.99,
        total: 7.98,
      },
      {
        itemId: "ITEM017",
        name: "Black Beans",
        quantity: 3,
        price: 1.89,
        total: 5.67,
      },
    ],
    totalPrice: 13.65,
    deliveryAddress: {
      street: "246 Birch St",
      city: "San Diego",
      state: "CA",
      postalCode: "92101",
      country: "USA",
      latitude: 32.7157,
      longitude: -117.1611,
    },
    status: "Shipped",
    orderDate: "2024-07-31T13:00:00Z",
    deliveryDate: "2024-08-02T13:00:00Z",
    paymentMethod: "UPI",
    specialInstructions: "Leave package at neighbor’s house if no one is home.",
    trackingNumber: "TRACK9900112233",
  },
  {
    orderId: "ORD009",
    userId: "USER234",
    customerName: "Lucas Martin",
    customerMobile: "+1-555-901-2345",
    items: [
      {
        itemId: "ITEM018",
        name: "Tofu",
        quantity: 2,
        price: 2.99,
        total: 5.98,
      },
      {
        itemId: "ITEM019",
        name: "Soy Sauce",
        quantity: 1,
        price: 1.89,
        total: 1.89,
      },
    ],
    totalPrice: 7.87,
    deliveryAddress: {
      street: "321 Oak St",
      city: "San Jose",
      state: "CA",
      postalCode: "95101",
      country: "USA",
      latitude: 37.3382,
      longitude: -121.8863,
    },
    status: "Processing",
    orderDate: "2024-08-01T12:00:00Z",
    deliveryDate: "2024-08-03T12:00:00Z",
    paymentMethod: "Credit Card",
    specialInstructions: "Leave at the side gate.",
    trackingNumber: "TRACK2233445566",
  },
  {
    orderId: "ORD010",
    userId: "USER567",
    customerName: "Emma White",
    customerMobile: "+1-555-012-3456",
    items: [
      {
        itemId: "ITEM020",
        name: "Chicken Breast",
        quantity: 3,
        price: 5.99,
        total: 17.97,
      },
      {
        itemId: "ITEM021",
        name: "Broccoli",
        quantity: 1,
        price: 2.49,
        total: 2.49,
      },
    ],
    totalPrice: 20.46,
    deliveryAddress: {
      street: "789 Pine St",
      city: "San Francisco",
      state: "CA",
      postalCode: "94102",
      country: "USA",
      latitude: 37.7749,
      longitude: -122.4194,
    },
    status: "Delivered",
    orderDate: "2024-08-02T14:00:00Z",
    deliveryDate: "2024-08-03T14:00:00Z",
    paymentMethod: "Debit Card",
    specialInstructions: "Please knock loudly.",
    trackingNumber: "TRACK3344556677",
  },
  {
    orderId: "ORD011",
    userId: "USER678",
    customerName: "Oliver Brown",
    customerMobile: "+1-555-123-4567",
    items: [
      {
        itemId: "ITEM022",
        name: "Quinoa",
        quantity: 2,
        price: 4.49,
        total: 8.98,
      },
      {
        itemId: "ITEM023",
        name: "Chia Seeds",
        quantity: 1,
        price: 5.99,
        total: 5.99,
      },
    ],
    totalPrice: 14.97,
    deliveryAddress: {
      street: "456 Maple Ave",
      city: "Seattle",
      state: "WA",
      postalCode: "98102",
      country: "USA",
      latitude: 47.6062,
      longitude: -122.3321,
    },
    status: "Shipped",
    orderDate: "2024-08-03T10:00:00Z",
    deliveryDate: "2024-08-05T10:00:00Z",
    paymentMethod: "Credit Card",
    specialInstructions: "Leave at the back porch.",
    trackingNumber: "TRACK4455667788",
  },
  {
    orderId: "ORD012",
    userId: "USER789",
    customerName: "Ava Green",
    customerMobile: "+1-555-234-5678",
    items: [
      {
        itemId: "ITEM024",
        name: "Oatmeal",
        quantity: 1,
        price: 3.49,
        total: 3.49,
      },
      {
        itemId: "ITEM025",
        name: "Almond Butter",
        quantity: 1,
        price: 6.49,
        total: 6.49,
      },
    ],
    totalPrice: 9.98,
    deliveryAddress: {
      street: "123 Birch St",
      city: "Portland",
      state: "OR",
      postalCode: "97202",
      country: "USA",
      latitude: 45.5152,
      longitude: -122.6784,
    },
    status: "Pending",
    orderDate: "2024-08-04T15:00:00Z",
    deliveryDate: "2024-08-06T15:00:00Z",
    paymentMethod: "COD",
    specialInstructions: "Please call when you arrive.",
    trackingNumber: "TRACK5566778899",
  },
  {
    orderId: "ORD013",
    userId: "USER890",
    customerName: "Isabella Harris",
    customerMobile: "+1-555-345-6789",
    items: [
      {
        itemId: "ITEM026",
        name: "Greek Yogurt",
        quantity: 3,
        price: 2.49,
        total: 7.47,
      },
      {
        itemId: "ITEM027",
        name: "Honey",
        quantity: 2,
        price: 5.99,
        total: 11.98,
      },
    ],
    totalPrice: 19.45,
    deliveryAddress: {
      street: "789 Oak St",
      city: "San Diego",
      state: "CA",
      postalCode: "92102",
      country: "USA",
      latitude: 32.7157,
      longitude: -117.1611,
    },
    status: "Processing",
    orderDate: "2024-08-05T09:00:00Z",
    deliveryDate: "2024-08-07T09:00:00Z",
    paymentMethod: "Debit Card",
    specialInstructions: "Please leave package on the patio.",
    trackingNumber: "TRACK6677889900",
  },
  {
    orderId: "ORD014",
    userId: "USER901",
    customerName: "Elijah Carter",
    customerMobile: "+1-555-456-7890",
    items: [
      {
        itemId: "ITEM028",
        name: "Apples",
        quantity: 6,
        price: 1.29,
        total: 7.74,
      },
      {
        itemId: "ITEM029",
        name: "Bananas",
        quantity: 3,
        price: 0.99,
        total: 2.97,
      },
    ],
    totalPrice: 10.71,
    deliveryAddress: {
      street: "135 Pine St",
      city: "Denver",
      state: "CO",
      postalCode: "80202",
      country: "USA",
      latitude: 39.7392,
      longitude: -104.9903,
    },
    status: "Delivered",
    orderDate: "2024-08-06T11:00:00Z",
    deliveryDate: "2024-08-07T11:00:00Z",
    paymentMethod: "UPI",
    specialInstructions: "Leave on the doorstep.",
    trackingNumber: "TRACK7788990011",
  },
  {
    orderId: "ORD015",
    userId: "USER234",
    customerName: "Mason Scott",
    customerMobile: "+1-555-567-8901",
    items: [
      {
        itemId: "ITEM030",
        name: "Frozen Berries",
        quantity: 2,
        price: 4.99,
        total: 9.98,
      },
      {
        itemId: "ITEM031",
        name: "Almonds",
        quantity: 1,
        price: 6.99,
        total: 6.99,
      },
    ],
    totalPrice: 16.97,
    deliveryAddress: {
      street: "246 Cedar St",
      city: "San Diego",
      state: "CA",
      postalCode: "92103",
      country: "USA",
      latitude: 32.7157,
      longitude: -117.1611,
    },
    status: "Shipped",
    orderDate: "2024-08-07T14:00:00Z",
    deliveryDate: "2024-08-09T14:00:00Z",
    paymentMethod: "Credit Card",
    specialInstructions: "Deliver between 3-5 PM.",
    trackingNumber: "TRACK8899001122",
  },
  {
    orderId: "ORD016",
    userId: "USER567",
    customerName: "Avery White",
    customerMobile: "+1-555-678-9012",
    items: [
      {
        itemId: "ITEM032",
        name: "Cashews",
        quantity: 1,
        price: 5.49,
        total: 5.49,
      },
      {
        itemId: "ITEM033",
        name: "Dates",
        quantity: 2,
        price: 3.99,
        total: 7.98,
      },
    ],
    totalPrice: 13.47,
    deliveryAddress: {
      street: "987 Birch St",
      city: "San Jose",
      state: "CA",
      postalCode: "95102",
      country: "USA",
      latitude: 37.3382,
      longitude: -121.8863,
    },
    status: "Pending",
    orderDate: "2024-08-08T16:00:00Z",
    deliveryDate: "2024-08-10T16:00:00Z",
    paymentMethod: "Credit Card",
    specialInstructions: "Leave package at the front door.",
    trackingNumber: "TRACK9900112233",
  },
  {
    orderId: "ORD017",
    userId: "USER678",
    customerName: "Ella Johnson",
    customerMobile: "+1-555-789-0123",
    items: [
      {
        itemId: "ITEM034",
        name: "Whole Wheat Flour",
        quantity: 5,
        price: 2.49,
        total: 12.45,
      },
      {
        itemId: "ITEM035",
        name: "Baking Powder",
        quantity: 1,
        price: 3.29,
        total: 3.29,
      },
    ],
    totalPrice: 15.74,
    deliveryAddress: {
      street: "654 Maple St",
      city: "Portland",
      state: "OR",
      postalCode: "97203",
      country: "USA",
      latitude: 45.5152,
      longitude: -122.6784,
    },
    status: "Shipped",
    orderDate: "2024-08-09T18:00:00Z",
    deliveryDate: "2024-08-11T18:00:00Z",
    paymentMethod: "Debit Card",
    specialInstructions: "Deliver before 6 PM.",
    trackingNumber: "TRACK1122334455",
  },
];

// Handle Latest Order Data
export const latestOrdersData = [
  {
    orderId: "ORD011",
    userId: "USER678",
    customerName: "Oliver Brown",
    customerMobile: "+1-555-123-4567",
    items: [
      {
        itemId: "ITEM022",
        name: "Quinoa",
        quantity: 2,
        price: 4.49,
        total: 8.98,
      },
      {
        itemId: "ITEM023",
        name: "Chia Seeds",
        quantity: 1,
        price: 5.99,
        total: 5.99,
      },
    ],
    totalPrice: 14.97,
    deliveryAddress: {
      street: "456 Maple Ave",
      city: "Seattle",
      state: "WA",
      postalCode: "98102",
      country: "USA",
      latitude: 47.6062,
      longitude: -122.3321,
    },
    status: "Shipped",
    orderDate: "2024-07-28T10:00:00Z",
    deliveryDate: "2024-07-28T10:00:00Z",
    paymentMethod: "Credit Card",
    specialInstructions: "Leave at the back porch.",
    trackingNumber: "TRACK4455667788",
  },
  {
    orderId: "ORD012",
    userId: "USER789",
    customerName: "Ava Green",
    customerMobile: "+1-555-234-5678",
    items: [
      {
        itemId: "ITEM024",
        name: "Oatmeal",
        quantity: 1,
        price: 3.49,
        total: 3.49,
      },
      {
        itemId: "ITEM025",
        name: "Almond Butter",
        quantity: 1,
        price: 6.49,
        total: 6.49,
      },
    ],
    totalPrice: 9.98,
    deliveryAddress: {
      street: "123 Birch St",
      city: "Portland",
      state: "OR",
      postalCode: "97202",
      country: "USA",
      latitude: 45.5152,
      longitude: -122.6784,
    },
    status: "Pending",
    orderDate: "2024-07-28T15:00:00Z",
    deliveryDate: "2024-07-28T15:00:00Z",
    paymentMethod: "COD",
    specialInstructions: "Please call when you arrive.",
    trackingNumber: "TRACK5566778899",
  },
  {
    orderId: "ORD013",
    userId: "USER890",
    customerName: "Isabella Harris",
    customerMobile: "+1-555-345-6789",
    items: [
      {
        itemId: "ITEM026",
        name: "Greek Yogurt",
        quantity: 3,
        price: 2.49,
        total: 7.47,
      },
      {
        itemId: "ITEM027",
        name: "Honey",
        quantity: 2,
        price: 5.99,
        total: 11.98,
      },
    ],
    totalPrice: 19.45,
    deliveryAddress: {
      street: "789 Oak St",
      city: "San Diego",
      state: "CA",
      postalCode: "92102",
      country: "USA",
      latitude: 32.7157,
      longitude: -117.1611,
    },
    status: "Processing",
    orderDate: "2024-07-28T09:00:00Z",
    deliveryDate: "2024-07-28T09:00:00Z",
    paymentMethod: "Debit Card",
    specialInstructions: "Please leave package on the patio.",
    trackingNumber: "TRACK6677889900",
  },
  {
    orderId: "ORD014",
    userId: "USER901",
    customerName: "Elijah Carter",
    customerMobile: "+1-555-456-7890",
    items: [
      {
        itemId: "ITEM028",
        name: "Apples",
        quantity: 6,
        price: 1.29,
        total: 7.74,
      },
      {
        itemId: "ITEM029",
        name: "Bananas",
        quantity: 3,
        price: 0.99,
        total: 2.97,
      },
    ],
    totalPrice: 10.71,
    deliveryAddress: {
      street: "135 Pine St",
      city: "Denver",
      state: "CO",
      postalCode: "80202",
      country: "USA",
      latitude: 39.7392,
      longitude: -104.9903,
    },
    status: "Delivered",
    orderDate: "2024-07-28T11:00:00Z",
    deliveryDate: "2024-07-28T11:00:00Z",
    paymentMethod: "UPI",
    specialInstructions: "Leave on the doorstep.",
    trackingNumber: "TRACK7788990011",
  },
  {
    orderId: "ORD015",
    userId: "USER234",
    customerName: "Mason Scott",
    customerMobile: "+1-555-567-8901",
    items: [
      {
        itemId: "ITEM030",
        name: "Frozen Berries",
        quantity: 2,
        price: 4.99,
        total: 9.98,
      },
      {
        itemId: "ITEM031",
        name: "Almonds",
        quantity: 1,
        price: 6.99,
        total: 6.99,
      },
    ],
    totalPrice: 16.97,
    deliveryAddress: {
      street: "246 Cedar St",
      city: "San Diego",
      state: "CA",
      postalCode: "92103",
      country: "USA",
      latitude: 32.7157,
      longitude: -117.1611,
    },
    status: "Shipped",
    orderDate: "2024-07-28T14:00:00Z",
    deliveryDate: "2024-07-28T14:00:00Z",
    paymentMethod: "Credit Card",
    specialInstructions: "Deliver between 3-5 PM.",
    trackingNumber: "TRACK8899001122",
  },
  {
    orderId: "ORD016",
    userId: "USER567",
    customerName: "Avery White",
    customerMobile: "+1-555-678-9012",
    items: [
      {
        itemId: "ITEM032",
        name: "Cashews",
        quantity: 1,
        price: 5.49,
        total: 5.49,
      },
      {
        itemId: "ITEM033",
        name: "Dates",
        quantity: 2,
        price: 3.99,
        total: 7.98,
      },
    ],
    totalPrice: 13.47,
    deliveryAddress: {
      street: "987 Birch St",
      city: "San Jose",
      state: "CA",
      postalCode: "95102",
      country: "USA",
      latitude: 37.3382,
      longitude: -121.8863,
    },
    status: "Pending",
    orderDate: "2024-07-28T16:00:00Z",
    deliveryDate: "2024-07-28T16:00:00Z",
    paymentMethod: "Credit Card",
    specialInstructions: "Leave package at the front door.",
    trackingNumber: "TRACK9900112233",
  },
  {
    orderId: "ORD017",
    userId: "USER678",
    customerName: "Ella Johnson",
    customerMobile: "+1-555-789-0123",
    items: [
      {
        itemId: "ITEM034",
        name: "Whole Wheat Flour",
        quantity: 5,
        price: 2.49,
        total: 12.45,
      },
      {
        itemId: "ITEM035",
        name: "Baking Powder",
        quantity: 1,
        price: 3.29,
        total: 3.29,
      },
    ],
    totalPrice: 15.74,
    deliveryAddress: {
      street: "654 Maple St",
      city: "Portland",
      state: "OR",
      postalCode: "97203",
      country: "USA",
      latitude: 45.5152,
      longitude: -122.6784,
    },
    status: "Shipped",
    orderDate: "2024-07-28T18:00:00Z",
    deliveryDate: "2024-07-28T18:00:00Z",
    paymentMethod: "Debit Card",
    specialInstructions: "Deliver before 6 PM.",
    trackingNumber: "TRACK1122334455",
  },
];

export const userData = [
  {
    userId: "user1",
    name: "Sandeep Kumar",
    email: "sandeep@example.com",
    phone: "1234567890",
    addresses: [
      {
        street: "987 Birch St",
        city: "San Jose",
        state: "CA",
        postalCode: "95102",
        country: "USA",
        latitude: 37.3382,
        longitude: -121.8863,
      },
    ],
    role: "user",
    isBlocked: false,
  },
  {
    userId: "user2",
    name: "Ravi Patel",
    email: "ravi.patel@example.com",
    phone: "2345678901",
    addresses: [
      {
        street: "123 Oak Ave",
        city: "Los Angeles",
        state: "CA",
        postalCode: "90001",
        country: "USA",
        latitude: 34.0522,
        longitude: -118.2437,
      },
      {
        street: "456 Maple Dr",
        city: "Beverly Hills",
        state: "CA",
        postalCode: "90210",
        country: "USA",
        latitude: 34.0697,
        longitude: -118.4053,
      },
    ],
    role: "user",
    isBlocked: true,
  },
  {
    userId: "user3",
    name: "Anita Sharma",
    email: "anita.sharma@example.com",
    phone: "3456789012",
    addresses: [
      {
        street: "789 Pine St",
        city: "New York",
        state: "NY",
        postalCode: "10001",
        country: "USA",
        latitude: 40.7128,
        longitude: -74.006,
      },
    ],
    role: "user",
    isBlocked: false,
  },
  {
    userId: "user4",
    name: "Deepak Singh",
    email: "deepak.singh@example.com",
    phone: "4567890123",
    addresses: [
      {
        street: "101 Elm St",
        city: "Chicago",
        state: "IL",
        postalCode: "60601",
        country: "USA",
        latitude: 41.8781,
        longitude: -87.6298,
      },
    ],
    role: "user",
    isBlocked: true,
  },
  {
    userId: "user5",
    name: "Priya Desai",
    email: "priya.desai@example.com",
    phone: "5678901234",
    addresses: [
      {
        street: "202 Birch St",
        city: "Houston",
        state: "TX",
        postalCode: "77001",
        country: "USA",
        latitude: 29.7604,
        longitude: -95.3698,
      },
      {
        street: "303 Cedar Ln",
        city: "Dallas",
        state: "TX",
        postalCode: "75201",
        country: "USA",
        latitude: 32.7767,
        longitude: -96.797,
      },
    ],
    role: "user",
    isBlocked: false,
  },
  {
    userId: "user6",
    name: "Raj Patel",
    email: "raj.patel@example.com",
    phone: "6789012345",
    addresses: [
      {
        street: "404 Oak St",
        city: "San Francisco",
        state: "CA",
        postalCode: "94101",
        country: "USA",
        latitude: 37.7749,
        longitude: -122.4194,
      },
    ],
    role: "user",
    isBlocked: true,
  },
  {
    userId: "user7",
    name: "Sonia Gupta",
    email: "sonia.gupta@example.com",
    phone: "7890123456",
    addresses: [
      {
        street: "505 Maple St",
        city: "Seattle",
        state: "WA",
        postalCode: "98101",
        country: "USA",
        latitude: 47.6062,
        longitude: -122.3321,
      },
    ],
    role: "user",
    isBlocked: false,
  },
  {
    userId: "user8",
    name: "Vikram Mehta",
    email: "vikram.mehta@example.com",
    phone: "8901234567",
    addresses: [
      {
        street: "606 Pine St",
        city: "Boston",
        state: "MA",
        postalCode: "02101",
        country: "USA",
        latitude: 42.3601,
        longitude: -71.0589,
      },
    ],
    role: "user",
    isBlocked: true,
  },
  {
    userId: "user9",
    name: "Neha Reddy",
    email: "neha.reddy@example.com",
    phone: "9012345678",
    addresses: [
      {
        street: "707 Cedar St",
        city: "Atlanta",
        state: "GA",
        postalCode: "30301",
        country: "USA",
        latitude: 33.749,
        longitude: -84.388,
      },
    ],
    role: "user",
    isBlocked: false,
  },
  {
    userId: "user10",
    name: "Amit Kumar",
    email: "amit.kumar@example.com",
    phone: "0123456789",
    addresses: [
      {
        street: "808 Elm St",
        city: "Denver",
        state: "CO",
        postalCode: "80201",
        country: "USA",
        latitude: 39.7392,
        longitude: -104.9903,
      },
    ],
    role: "user",
    isBlocked: false,
  },
  {
    userId: "user11",
    name: "Rina Singh",
    email: "rina.singh@example.com",
    phone: "1234567891",
    addresses: [
      {
        street: "909 Birch St",
        city: "San Diego",
        state: "CA",
        postalCode: "92101",
        country: "USA",
        latitude: 32.7157,
        longitude: -117.1611,
      },
    ],
    role: "user",
    isBlocked: false,
  },
  {
    userId: "user12",
    name: "Gaurav Sharma",
    email: "gaurav.sharma@example.com",
    phone: "2345678902",
    addresses: [
      {
        street: "1010 Maple St",
        city: "Philadelphia",
        state: "PA",
        postalCode: "19101",
        country: "USA",
        latitude: 39.9526,
        longitude: -75.1652,
      },
    ],
    role: "user",
    isBlocked: true,
  },
  {
    userId: "user13",
    name: "Rita Kapoor",
    email: "rita.kapoor@example.com",
    phone: "3456789013",
    addresses: [
      {
        street: "111 Walnut St",
        city: "Austin",
        state: "TX",
        postalCode: "73301",
        country: "USA",
        latitude: 30.2672,
        longitude: -97.7431,
      },
    ],
    role: "user",
    isBlocked: false,
  },
  {
    userId: "user14",
    name: "Karan Gupta",
    email: "karan.gupta@example.com",
    phone: "4567890124",
    addresses: [
      {
        street: "222 Oakwood Ave",
        city: "Phoenix",
        state: "AZ",
        postalCode: "85001",
        country: "USA",
        latitude: 33.4484,
        longitude: -112.074,
      },
    ],
    role: "user",
    isBlocked: false,
  },
  {
    userId: "user15",
    name: "Meera Joshi",
    email: "meera.joshi@example.com",
    phone: "5678901235",
    addresses: [
      {
        street: "333 Maplewood Dr",
        city: "San Antonio",
        state: "TX",
        postalCode: "78201",
        country: "USA",
        latitude: 29.4241,
        longitude: -98.4936,
      },
    ],
    role: "user",
    isBlocked: false,
  },
  {
    userId: "user16",
    name: "Amitabh Bachchan",
    email: "amitabh.bachchan@example.com",
    phone: "6789012346",
    addresses: [
      {
        street: "444 Elmwood St",
        city: "San Jose",
        state: "CA",
        postalCode: "95101",
        country: "USA",
        latitude: 37.3382,
        longitude: -121.8863,
      },
    ],
    role: "user",
    isBlocked: false,
  },
  {
    userId: "user17",
    name: "Kavita Sharma",
    email: "kavita.sharma@example.com",
    phone: "7890123457",
    addresses: [
      {
        street: "555 Cedar Ave",
        city: "Columbus",
        state: "OH",
        postalCode: "43201",
        country: "USA",
        latitude: 39.9612,
        longitude: -82.9988,
      },
    ],
    role: "user",
    isBlocked: true,
  },
  {
    userId: "user18",
    name: "Rajesh Mehta",
    email: "rajesh.mehta@example.com",
    phone: "8901234568",
    addresses: [
      {
        street: "666 Pine Ave",
        city: "Indianapolis",
        state: "IN",
        postalCode: "46201",
        country: "USA",
        latitude: 39.7684,
        longitude: -86.1581,
      },
    ],
    role: "user",
    isBlocked: true,
  },
  {
    userId: "user19",
    name: "Anju Desai",
    email: "anju.desai@example.com",
    phone: "9012345679",
    addresses: [
      {
        street: "777 Birchwood Ln",
        city: "Charlotte",
        state: "NC",
        postalCode: "28201",
        country: "USA",
        latitude: 35.2271,
        longitude: -80.8431,
      },
    ],
    role: "user",
    isBlocked: true,
  },
  {
    userId: "user20",
    name: "Vikrant Singh",
    email: "vikrant.singh@example.com",
    phone: "0123456780",
    addresses: [
      {
        street: "888 Maplewood St",
        city: "San Francisco",
        state: "CA",
        postalCode: "94102",
        country: "USA",
        latitude: 37.7749,
        longitude: -122.4194,
      },
    ],
    role: "user",
    isBlocked: false,
  },
];

export const deliveryPartnersData = [
  {
    name: "John Doe",
    contact: {
      phone: "123-456-7890",
      email: "johndoe@example.com",
    },
    address: {
      street: "123 Elm Street",
      city: "Bangalore",
      state: "Karnataka",
      zip: "560001",
    },
    vehicle: "Honda Activa",
    licenseNumber: "KA-01-AB-1234",
    status: "Active",
    availability: "Available",
  },
  {
    name: "Jane Smith",
    contact: {
      phone: "234-567-8901",
      email: "janesmith@example.com",
    },
    address: {
      street: "456 Oak Avenue",
      city: "Mumbai",
      state: "Maharashtra",
      zip: "400001",
    },
    vehicle: "Bajaj Pulsar",
    licenseNumber: "MH-02-CD-5678",
    status: "Inactive",
    availability: "Busy",
  },
  {
    name: "Ali Khan",
    contact: {
      phone: "345-678-9012",
      email: "alikhan@example.com",
    },
    address: {
      street: "789 Pine Road",
      city: "Delhi",
      state: "Delhi",
      zip: "110001",
    },
    vehicle: "Hero Splendor",
    licenseNumber: "DL-03-EF-9012",
    status: "Active",
    availability: "Available",
  },
  {
    name: "Rita Patel",
    contact: {
      phone: "456-789-0123",
      email: "ritapatel@example.com",
    },
    address: {
      street: "321 Maple Lane",
      city: "Ahmedabad",
      state: "Gujarat",
      zip: "380001",
    },
    vehicle: "TVS Jupiter",
    licenseNumber: "GJ-04-GH-3456",
    status: "Active",
    availability: "Busy",
  },
  {
    name: "Vikram Singh",
    contact: {
      phone: "567-890-1234",
      email: "vikramsingh@example.com",
    },
    address: {
      street: "654 Cedar Street",
      city: "Pune",
      state: "Maharashtra",
      zip: "411001",
    },
    vehicle: "Yamaha FZ",
    licenseNumber: "PN-05-IJ-7890",
    status: "Inactive",
    availability: "Available",
  },
  {
    name: "Priya Sharma",
    contact: {
      phone: "678-901-2345",
      email: "priyasharma@example.com",
    },
    address: {
      street: "987 Birch Avenue",
      city: "Chennai",
      state: "Tamil Nadu",
      zip: "600001",
    },
    vehicle: "Suzuki Access",
    licenseNumber: "TN-06-KL-1234",
    status: "Active",
    availability: "Busy",
  },
  {
    name: "Rajesh Kumar",
    contact: {
      phone: "789-012-3456",
      email: "rajeshkumar@example.com",
    },
    address: {
      street: "432 Willow Street",
      city: "Hyderabad",
      state: "Telangana",
      zip: "500001",
    },
    vehicle: "KTM Duke",
    licenseNumber: "TS-07-MN-5678",
    status: "Active",
    availability: "Busy",
  },
  {
    name: "Anita Desai",
    contact: {
      phone: "890-123-4567",
      email: "anitadesai@example.com",
    },
    address: {
      street: "876 Chestnut Road",
      city: "Kolkata",
      state: "West Bengal",
      zip: "700001",
    },
    vehicle: "Royal Enfield Bullet",
    licenseNumber: "WB-08-OP-9012",
    status: "Inactive",
    availability: "Available",
  },
  {
    name: "Sunil Mehta",
    contact: {
      phone: "901-234-5678",
      email: "sunilmehta@example.com",
    },
    address: {
      street: "543 Elm Drive",
      city: "Jaipur",
      state: "Rajasthan",
      zip: "302001",
    },
    vehicle: "Hero Passion",
    licenseNumber: "RJ-09-QR-3456",
    status: "Active",
    availability: "Available",
  },
  {
    name: "Sneha Gupta",
    contact: {
      phone: "012-345-6789",
      email: "snehagupta@example.com",
    },
    address: {
      street: "210 Ash Lane",
      city: "Lucknow",
      state: "Uttar Pradesh",
      zip: "226001",
    },
    vehicle: "Honda CB Shine",
    licenseNumber: "UP-10-ST-7890",
    status: "Active",
    availability: "Busy",
  },
  {
    name: "Manish Verma",
    contact: {
      phone: "111-222-3333",
      email: "manishverma@example.com",
    },
    address: {
      street: "1234 Silver Lane",
      city: "Noida",
      state: "Uttar Pradesh",
      zip: "201301",
    },
    vehicle: "Kawasaki Ninja",
    licenseNumber: "UP-11-UV-5678",
    status: "Active",
    availability: "Available",
  },
  {
    name: "Aarti Mehta",
    contact: {
      phone: "222-333-4444",
      email: "aartimehta@example.com",
    },
    address: {
      street: "5678 Gold Street",
      city: "Gurgaon",
      state: "Haryana",
      zip: "122018",
    },
    vehicle: "Scooty Pep+",
    licenseNumber: "HR-12-WX-9012",
    status: "Inactive",
    availability: "Busy",
  },
  {
    name: "Ravi Kumar",
    contact: {
      phone: "333-444-5555",
      email: "ravikumar@example.com",
    },
    address: {
      street: "9101 Diamond Drive",
      city: "Faridabad",
      state: "Haryana",
      zip: "121001",
    },
    vehicle: "Hero Glamour",
    licenseNumber: "HR-13-YZ-3456",
    status: "Active",
    availability: "Available",
  },
  {
    name: "Sonia Sharma",
    contact: {
      phone: "444-555-6666",
      email: "soniasharma@example.com",
    },
    address: {
      street: "2345 Ruby Road",
      city: "Ghaziabad",
      state: "Uttar Pradesh",
      zip: "201002",
    },
    vehicle: "TVS Apache",
    licenseNumber: "UP-14-AB-7890",
    status: "Active",
    availability: "Busy",
  },
  {
    name: "Arjun Singh",
    contact: {
      phone: "555-666-7777",
      email: "arjunsingh@example.com",
    },
    address: {
      street: "6789 Emerald Lane",
      city: "Patna",
      state: "Bihar",
      zip: "800001",
    },
    vehicle: "Royal Enfield Meteor",
    licenseNumber: "BR-15-CD-1234",
    status: "Inactive",
    availability: "Busy",
  },
  {
    name: "Neha Kapoor",
    contact: {
      phone: "666-777-8888",
      email: "nehakapoor@example.com",
    },
    address: {
      street: "3456 Topaz Street",
      city: "Indore",
      state: "Madhya Pradesh",
      zip: "452001",
    },
    vehicle: "Suzuki Burgman",
    licenseNumber: "MP-16-DE-5678",
    status: "Active",
    availability: "Available",
  },
  {
    name: "Pankaj Jain",
    contact: {
      phone: "777-888-9999",
      email: "pankajjain@example.com",
    },
    address: {
      street: "7890 Sapphire Road",
      city: "Bhopal",
      state: "Madhya Pradesh",
      zip: "462001",
    },
    vehicle: "Honda Dio",
    licenseNumber: "MP-17-FG-9012",
    status: "Active",
    availability: "Busy",
  },
  {
    name: "Preeti Rani",
    contact: {
      phone: "888-999-0000",
      email: "preetirani@example.com",
    },
    address: {
      street: "1230 Jade Lane",
      city: "Kanpur",
      state: "Uttar Pradesh",
      zip: "208001",
    },
    vehicle: "Bajaj Chetak",
    licenseNumber: "UP-18-HI-3456",
    status: "Inactive",
    availability: "Available",
  },
  {
    name: "Manoj Choudhury",
    contact: {
      phone: "999-000-1111",
      email: "manojchoudhury@example.com",
    },
    address: {
      street: "4567 Amethyst Road",
      city: "Kolkata",
      state: "West Bengal",
      zip: "700002",
    },
    vehicle: "TVS Ntorq",
    licenseNumber: "WB-19-JK-7890",
    status: "Active",
    availability: "Available",
  },
  {
    name: "Kavita Arora",
    contact: {
      phone: "000-111-2222",
      email: "kavitaarora@example.com",
    },
    address: {
      street: "8912 Quartz Drive",
      city: "Jaipur",
      state: "Rajasthan",
      zip: "302002",
    },
    vehicle: "Yamaha Ray ZR",
    licenseNumber: "RJ-20-LM-1234",
    status: "Active",
    availability: "Busy",
  },
];
