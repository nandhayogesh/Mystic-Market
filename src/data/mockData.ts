/*
  This file contains all the mock data structures and sample data
  for the grocery store application. This data is used for in-memory
  state management via React Context.
*/

// Using crypto.randomUUID() for unique IDs, available in modern browsers.
// No need for external 'uuid' package.

export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  quantity: number; // Available quantity in stock
  image: string;
  description: string;
  rating: number;
  reviews: { user: string; comment: string; rating: number }[];
}

export interface CartItem extends Product {
  cartQuantity: number; // Quantity of this product in the user's cart
}

export interface User {
  id: string;
  name: string;
  email: string;
  password?: string; // For mock authentication purposes only. In a real app, passwords should be hashed.
  addresses: Address[];
  paymentMethods: PaymentMethod[];
  loyaltyStatus: string;
  autoReplenishment: AutoReplenishmentSetting[];
}

export interface Address {
  id: string;
  street: string;
  city: string;
  state: string;
  zip: string;
  country: string;
}

export interface PaymentMethod {
  id: string;
  type: 'Credit Card' | 'Debit Card' | 'Net Banking' | 'Cash on Delivery';
  last4?: string; // For card types, last 4 digits
  bankName?: string; // For net banking
}

export interface Order {
  id: string;
  userId: string;
  items: { productId: string; name: string; price: number; quantity: number; image: string }[];
  total: number;
  status: 'Pending' | 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled';
  orderDate: string; // YYYY-MM-DD format
  deliveryAddress: Address;
  deliverySlot: { date: string; time: string };
  paymentMethod: PaymentMethod['type'];
}

export interface AutoReplenishmentSetting {
  productId: string;
  frequency: 'weekly' | 'bi-weekly' | 'monthly';
  quantity: number;
}

// --- Mock Data ---

export const MOCK_PRODUCTS: Product[] = [
  {
    id: crypto.randomUUID(),
    name: 'Organic Gala Apples (1kg)',
    category: 'Fruits & Vegetables',
    price: 3.99,
    quantity: 50,
    image: 'https://images.pexels.com/photos/102104/pexels-photo-102104.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    description: 'Fresh, crisp organic Gala apples, perfect for snacking or baking. Sourced from local farms, ensuring peak freshness and flavor.',
    rating: 4.8,
    reviews: [
      { user: 'Alice W.', comment: 'Very fresh and tasty! My kids love them.', rating: 5 },
      { user: 'Bob M.', comment: 'Good quality, a bit pricey but worth it for organic.', rating: 4 },
    ],
  },
  {
    id: crypto.randomUUID(),
    name: 'Artisan Whole Wheat Bread',
    category: 'Bakery',
    price: 4.50,
    quantity: 30,
    image: 'https://images.pexels.com/photos/1775043/pexels-photo-1775043.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    description: 'Freshly baked artisan whole wheat bread, with a hearty crust and soft interior. Ideal for sandwiches or toast.',
    rating: 4.5,
    reviews: [
      { user: 'Charlie P.', comment: 'Soft and delicious! Tastes homemade.', rating: 5 },
      { user: 'Diana R.', comment: 'A bit dense, but good for a healthy option.', rating: 4 },
    ],
  },
  {
    id: crypto.randomUUID(),
    name: 'Farm Fresh Milk (1 Liter)',
    category: 'Dairy & Eggs',
    price: 1.80,
    quantity: 100,
    image: 'https://images.pexels.com/photos/248412/pexels-photo-248412.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    description: 'Pasteurized and homogenized full-fat milk from local dairies. Rich in calcium and vitamins.',
    rating: 4.7,
    reviews: [
      { user: 'David L.', comment: 'Essential for my coffee and cereals. Always fresh.', rating: 4 },
      { user: 'Emily S.', comment: 'Great taste, good value for money.', rating: 5 },
    ],
  },
  {
    id: crypto.randomUUID(),
    name: 'Premium Basmati Rice (5kg)',
    category: 'Grains & Pasta',
    price: 12.00,
    quantity: 20,
    image: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    description: 'Premium long-grain Basmati rice, known for its aromatic fragrance and fluffy texture when cooked. Perfect for various cuisines.',
    rating: 4.9,
    reviews: [
      { user: 'Eve K.', comment: 'Best rice for biryani! Highly recommend.', rating: 5 },
      { user: 'Frank G.', comment: 'Consistently good quality. Cooks perfectly every time.', rating: 5 },
    ],
  },
  {
    id: crypto.randomUUID(),
    name: 'Boneless Chicken Breast (500g)',
    category: 'Meat & Seafood',
    price: 7.50,
    quantity: 40,
    image: 'https://images.pexels.com/photos/616335/pexels-photo-616335.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    description: 'Fresh, boneless, skinless chicken breast. Lean and versatile, ideal for grilling, baking, or stir-frying.',
    rating: 4.6,
    reviews: [
      { user: 'Grace H.', comment: 'Always fresh and tender. A staple in my kitchen.', rating: 5 },
      { user: 'Henry J.', comment: 'Good portion size for the price.', rating: 4 },
    ],
  },
  {
    id: crypto.randomUUID(),
    name: 'Fresh Atlantic Salmon Fillet (200g)',
    category: 'Meat & Seafood',
    price: 9.99,
    quantity: 15,
    image: 'https://images.pexels.com/photos/1566837/pexels-photo-1566837.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    description: 'High-quality Atlantic salmon fillet, rich in Omega-3 fatty acids. Perfect for a healthy and delicious meal.',
    rating: 4.8,
    reviews: [
      { user: 'Isabel L.', comment: 'Perfect for grilling! Tastes amazing.', rating: 5 },
      { user: 'Jack M.', comment: 'Very fresh, no fishy smell.', rating: 5 },
    ],
  },
  {
    id: crypto.randomUUID(),
    name: 'Organic Brown Eggs (1 Dozen)',
    category: 'Dairy & Eggs',
    price: 4.20,
    quantity: 60,
    image: 'https://images.pexels.com/photos/162712/egg-yolk-chicken-egg-egg-white-162712.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    description: 'Farm-fresh organic brown eggs, large size. Sourced from free-range hens.',
    rating: 4.7,
    reviews: [
      { user: 'Karen N.', comment: 'Great for breakfast, always reliable.', rating: 4 },
      { user: 'Leo O.', comment: 'Good quality and taste.', rating: 5 },
    ],
  },
  {
    id: crypto.randomUUID(),
    name: 'Fresh Baby Spinach (500g)',
    category: 'Fruits & Vegetables',
    price: 2.10,
    quantity: 70,
    image: 'https://images.pexels.com/photos/1435735/pexels-photo-1435735.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    description: 'Fresh baby spinach, pre-washed and ready to use. Ideal for salads, smoothies, or cooking.',
    rating: 4.6,
    reviews: [
      { user: 'Mia P.', comment: 'Good for smoothies and salads. Very convenient.', rating: 5 },
      { user: 'Noah Q.', comment: 'Always fresh and vibrant.', rating: 4 },
    ],
  },
  {
    id: crypto.randomUUID(),
    name: 'Extra Virgin Olive Oil (1 Liter)',
    category: 'Pantry Staples',
    price: 15.00,
    quantity: 25,
    image: 'https://images.pexels.com/photos/533280/pexels-photo-533280.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    description: 'Premium extra virgin olive oil, cold-pressed from the finest olives. Perfect for cooking, dressings, and dipping.',
    rating: 4.9,
    reviews: [
      { user: 'Olivia R.', comment: 'High quality, worth the price. Excellent flavor.', rating: 5 },
      { user: 'Paul S.', comment: 'My go-to olive oil for everything.', rating: 5 },
    ],
  },
  {
    id: crypto.randomUUID(),
    name: 'Artisan Coffee Beans (250g)',
    category: 'Beverages',
    price: 8.75,
    quantity: 35,
    image: 'https://images.pexels.com/photos/302899/pexels-photo-302899.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    description: 'Medium roast Arabica coffee beans, ethically sourced. Delivers a rich, smooth flavor with notes of chocolate and nuts.',
    rating: 4.7,
    reviews: [
      { user: 'Quinn T.', comment: 'Great aroma and taste. Perfect start to my day.', rating: 4 },
      { user: 'Rachel U.', comment: 'Love the freshness of these beans.', rating: 5 },
    ],
  },
  {
    id: crypto.randomUUID(),
    name: 'Sharp Cheddar Cheese (200g)',
    category: 'Dairy & Eggs',
    price: 5.50,
    quantity: 45,
    image: 'https://images.pexels.com/photos/145933/pexels-photo-145933.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    description: 'Aged sharp cheddar cheese block, perfect for grating, slicing, or enjoying on its own.',
    rating: 4.6,
    reviews: [
      { user: 'Sam V.', comment: 'Perfect for mac and cheese. Melts beautifully.', rating: 5 },
      { user: 'Tina W.', comment: 'Great flavor, good for sandwiches.', rating: 4 },
    ],
  },
  {
    id: crypto.randomUUID(),
    name: 'Italian Spaghetti Pasta (500g)',
    category: 'Grains & Pasta',
    price: 1.99,
    quantity: 80,
    image: 'https://images.pexels.com/photos/128408/pexels-photo-128408.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    description: 'Classic Italian durum wheat spaghetti, cooks al dente every time. The foundation for countless delicious meals.',
    rating: 4.4,
    reviews: [
      { user: 'Uma X.', comment: 'Good basic pasta, always have it in my pantry.', rating: 4 },
      { user: 'Victor Y.', comment: 'Reliable and affordable.', rating: 5 },
    ],
  },
  {
    id: crypto.randomUUID(),
    name: 'Classic Tomato Ketchup (500g)',
    category: 'Condiments',
    price: 3.25,
    quantity: 55,
    image: 'https://images.pexels.com/photos/1028707/pexels-photo-1028707.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    description: 'The classic taste of ripe tomatoes, perfect for burgers, fries, and all your favorite dishes. Family size.',
    rating: 4.3,
    reviews: [
      { user: 'Wendy Z.', comment: 'Kids love it, can\'t go wrong with this.', rating: 4 },
      { user: 'Xavier A.', comment: 'Standard ketchup, good quality.', rating: 4 },
    ],
  },
  {
    id: crypto.randomUUID(),
    name: 'Organic Frozen Green Peas (1kg)',
    category: 'Frozen Foods',
    price: 2.75,
    quantity: 65,
    image: 'https://images.pexels.com/photos/1300975/pexels-photo-1300975.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    description: 'Quick frozen organic green peas, retaining their natural sweetness and nutrients. A convenient addition to any meal.',
    rating: 4.5,
    reviews: [
      { user: 'Yara B.', comment: 'Convenient and fresh, great for quick dinners.', rating: 5 },
      { user: 'Zane C.', comment: 'Always good to have in the freezer.', rating: 4 },
    ],
  },
  {
    id: crypto.randomUUID(),
    name: 'Freshly Squeezed Orange Juice (1 Liter)',
    category: 'Beverages',
    price: 3.00,
    quantity: 40,
    image: 'https://images.pexels.com/photos/1640774/pexels-photo-1640774.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    description: '100% pure squeezed orange juice, no added sugar or preservatives. A refreshing and healthy drink.',
    rating: 4.6,
    reviews: [
      { user: 'Anna D.', comment: 'Refreshing! Tastes like real oranges.', rating: 4 },
      { user: 'Ben E.', comment: 'My favorite orange juice.', rating: 5 },
    ],
  },
];

export const MOCK_USERS: User[] = [
  {
    id: crypto.randomUUID(),
    name: 'John Doe',
    email: 'john@example.com',
    password: 'password123', // For mock auth. NEVER store plain passwords in a real app!
    addresses: [
      { id: crypto.randomUUID(), street: '123 Main St', city: 'Anytown', state: 'CA', zip: '90210', country: 'USA' },
      { id: crypto.randomUUID(), street: '456 Oak Ave', city: 'Sometown', state: 'NY', zip: '10001', country: 'USA' },
    ],
    paymentMethods: [
      { id: crypto.randomUUID(), type: 'Credit Card', last4: '4242' },
      { id: crypto.randomUUID(), type: 'Cash on Delivery' },
    ],
    loyaltyStatus: 'Gold Member',
    autoReplenishment: [
      { productId: MOCK_PRODUCTS[2].id, frequency: 'weekly', quantity: 1 }, // Milk
    ],
  },
];

export const MOCK_CATEGORIES: string[] = [
  'Fruits & Vegetables',
  'Bakery',
  'Dairy & Eggs',
  'Grains & Pasta',
  'Meat & Seafood',
  'Pantry Staples',
  'Beverages',
  'Condiments',
  'Frozen Foods',
];

export const MOCK_ORDERS: Order[] = [
  {
    id: crypto.randomUUID(),
    userId: MOCK_USERS[0].id,
    items: [
      { productId: MOCK_PRODUCTS[0].id, name: MOCK_PRODUCTS[0].name, price: MOCK_PRODUCTS[0].price, quantity: 2, image: MOCK_PRODUCTS[0].image },
      { productId: MOCK_PRODUCTS[2].id, name: MOCK_PRODUCTS[2].name, price: MOCK_PRODUCTS[2].price, quantity: 1, image: MOCK_PRODUCTS[2].image },
    ],
    total: (MOCK_PRODUCTS[0].price * 2) + MOCK_PRODUCTS[2].price + ((MOCK_PRODUCTS[0].price * 2) + MOCK_PRODUCTS[2].price) * 0.08, // Including mock tax
    status: 'Delivered',
    orderDate: '2024-07-20',
    deliveryAddress: MOCK_USERS[0].addresses[0],
    deliverySlot: { date: '2024-07-21', time: '10:00 AM - 12:00 PM' },
    paymentMethod: 'Credit Card',
  },
  {
    id: crypto.randomUUID(),
    userId: MOCK_USERS[0].id,
    items: [
      { productId: MOCK_PRODUCTS[1].id, name: MOCK_PRODUCTS[1].name, price: MOCK_PRODUCTS[1].price, quantity: 1, image: MOCK_PRODUCTS[1].image },
      { productId: MOCK_PRODUCTS[3].id, name: MOCK_PRODUCTS[3].name, price: MOCK_PRODUCTS[3].price, quantity: 1, image: MOCK_PRODUCTS[3].image },
    ],
    total: MOCK_PRODUCTS[1].price + MOCK_PRODUCTS[3].price + (MOCK_PRODUCTS[1].price + MOCK_PRODUCTS[3].price) * 0.08, // Including mock tax
    status: 'Processing',
    orderDate: '2024-07-25',
    deliveryAddress: MOCK_USERS[0].addresses[0],
    deliverySlot: { date: '2024-07-26', time: '02:00 PM - 04:00 PM' },
    paymentMethod: 'Cash on Delivery',
  },
];
