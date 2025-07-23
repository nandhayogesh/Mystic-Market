/*
  AppContext.tsx
  This file defines the global application context using React's Context API.
  It manages the core state of the application, including products, shopping cart,
  current user, and orders. It also provides functions for authentication,
  cart management, and order placement.
*/

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import {
  MOCK_PRODUCTS,
  MOCK_USERS,
  MOCK_ORDERS,
  Product,
  CartItem,
  User,
  Order,
  Address,
  PaymentMethod,
} from '@/data/mockData';
import { toast } from '@/hooks/use-toast'; // Using Shadcn UI's toast for user feedback
import { format } from 'date-fns'; // For date formatting in orders

interface AppContextType {
  products: Product[];
  cart: CartItem[];
  currentUser: User | null;
  orders: Order[];
  login: (email: string, password: string) => boolean;
  signup: (name: string, email: string, password: string) => boolean;
  logout: () => void;
  addToCart: (product: Product, quantity: number) => void;
  updateCartQuantity: (productId: string, quantity: number) => void;
  removeFromCart: (productId: string) => void;
  clearCart: () => void;
  placeOrder: (
    deliveryAddress: Address,
    deliverySlot: { date: string; time: string },
    paymentMethod: PaymentMethod['type']
  ) => boolean;
  updateUserAddresses: (addresses: Address[]) => void;
  updateUserPaymentMethods: (paymentMethods: PaymentMethod[]) => void;
}

// Create the context with an undefined default value, to be provided by AppProvider
const AppContext = createContext<AppContextType | undefined>(undefined);

// AppProvider component to wrap the application and provide context values
export const AppProvider = ({ children }: { children: ReactNode }) => {
  // State variables for global application data
  const [products, setProducts] = useState<Product[]>(MOCK_PRODUCTS);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [orders, setOrders] = useState<Order[]>(MOCK_ORDERS);

  // Simulate user session persistence using localStorage
  useEffect(() => {
    try {
      const storedUser = localStorage.getItem('currentUser');
      if (storedUser) {
        setCurrentUser(JSON.parse(storedUser));
      }
    } catch (error) {
      console.error("Failed to parse stored user from localStorage:", error);
      localStorage.removeItem('currentUser'); // Clear invalid data
    }
  }, []);

  /**
   * Handles user login.
   * @param email - The user's email.
   * @param password - The user's password.
   * @returns True if login is successful, false otherwise.
   */
  const login = (email: string, password: string): boolean => {
    const user = MOCK_USERS.find(
      (u) => u.email === email && u.password === password
    );
    if (user) {
      setCurrentUser(user);
      localStorage.setItem('currentUser', JSON.stringify(user));
      toast({
        title: 'Login Successful',
        description: `Welcome back, ${user.name}!`,
        variant: 'default',
      });
      return true;
    }
    toast({
      title: 'Login Failed',
      description: 'Invalid email or password.',
      variant: 'destructive',
    });
    return false;
  };

  /**
   * Handles user signup.
   * @param name - The user's name.
   * @param email - The user's email.
   * @param password - The user's password.
   * @returns True if signup is successful, false otherwise.
   */
  const signup = (name: string, email: string, password: string): boolean => {
    if (MOCK_USERS.some((u) => u.email === email)) {
      toast({
        title: 'Signup Failed',
        description: 'User with this email already exists.',
        variant: 'destructive',
      });
      return false;
    }
    const newUser: User = {
      id: crypto.randomUUID(), // Generate a unique ID for the new user
      name,
      email,
      password, // In a real application, this password should be hashed and never stored in plain text!
      addresses: [],
      paymentMethods: [],
      loyaltyStatus: 'Bronze Member', // Default loyalty status for new users
      autoReplenishment: [],
    };
    MOCK_USERS.push(newUser); // Add new user to the mock data array
    setCurrentUser(newUser);
    localStorage.setItem('currentUser', JSON.stringify(newUser));
    toast({
      title: 'Signup Successful',
      description: `Welcome, ${newUser.name}!`,
      variant: 'default',
    });
    return true;
  };

  /**
   * Handles user logout. Clears current user and cart.
   */
  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem('currentUser');
    setCart([]); // Clear cart on logout for a clean session
    toast({
      title: 'Logged Out',
      description: 'You have been successfully logged out.',
      variant: 'default',
    });
  };

  /**
   * Adds a product to the shopping cart or updates its quantity if already present.
   * @param product - The product to add.
   * @param quantity - The quantity to add.
   */
  const addToCart = (product: Product, quantity: number) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === product.id);
      if (existingItem) {
        // If item exists, update its quantity, ensuring it doesn't exceed stock
        const newQuantity = Math.min(existingItem.cartQuantity + quantity, product.quantity);
        return prevCart.map((item) =>
          item.id === product.id
            ? { ...item, cartQuantity: newQuantity }
            : item
        );
      } else {
        // If item is new, add it to cart, ensuring quantity doesn't exceed stock
        const newQuantity = Math.min(quantity, product.quantity);
        return [...prevCart, { ...product, cartQuantity: newQuantity }];
      }
    });
    toast({
      title: 'Item Added to Cart',
      description: `${quantity} x ${product.name} added.`,
      variant: 'default',
    });
  };

  /**
   * Updates the quantity of a specific product in the cart.
   * @param productId - The ID of the product to update.
   * @param quantity - The new quantity for the product.
   */
  const updateCartQuantity = (productId: string, quantity: number) => {
    setCart((prevCart) => {
      const productInStock = products.find(p => p.id === productId);
      if (!productInStock) return prevCart; // Product not found in main list

      if (quantity <= 0) {
        // Remove item if quantity is 0 or less
        return prevCart.filter((item) => item.id !== productId);
      }
      // Ensure quantity does not exceed available stock
      const safeQuantity = Math.min(quantity, productInStock.quantity);
      return prevCart.map((item) =>
        item.id === productId ? { ...item, cartQuantity: safeQuantity } : item
      );
    });
  };

  /**
   * Removes a product from the shopping cart.
   * @param productId - The ID of the product to remove.
   */
  const removeFromCart = (productId: string) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
    toast({
      title: 'Item Removed',
      description: 'Product removed from cart.',
      variant: 'default',
    });
  };

  /**
   * Clears all items from the shopping cart.
   */
  const clearCart = () => {
    setCart([]);
    toast({
      title: 'Cart Cleared',
      description: 'Your shopping cart is now empty.',
      variant: 'default',
    });
  };

  /**
   * Places a new order.
   * @param deliveryAddress - The selected delivery address.
   * @param deliverySlot - The selected delivery date and time slot.
   * @param paymentMethod - The selected payment method.
   * @returns True if the order is placed successfully, false otherwise.
   */
  const placeOrder = (
    deliveryAddress: Address,
    deliverySlot: { date: string; time: string },
    paymentMethod: PaymentMethod['type']
  ): boolean => {
    if (!currentUser) {
      toast({
        title: 'Order Failed',
        description: 'Please log in to place an order.',
        variant: 'destructive',
      });
      return false;
    }
    if (cart.length === 0) {
      toast({
        title: 'Order Failed',
        description: 'Your cart is empty. Add items before placing an order.',
        variant: 'destructive',
      });
      return false;
    }

    const orderItems = cart.map((item) => ({
      productId: item.id,
      name: item.name,
      price: item.price,
      quantity: item.cartQuantity,
      image: item.image,
    }));

    const subtotal = cart.reduce(
      (sum, item) => sum + item.price * item.cartQuantity,
      0
    );
    const estimatedTaxRate = 0.08; // 8% mock tax
    const estimatedTax = subtotal * estimatedTaxRate;
    const total = subtotal + estimatedTax;

    const newOrder: Order = {
      id: crypto.randomUUID(), // Unique ID for the order
      userId: currentUser.id,
      items: orderItems,
      total,
      status: 'Pending', // Initial status
      orderDate: format(new Date(), 'yyyy-MM-dd'), // Current date
      deliveryAddress,
      deliverySlot,
      paymentMethod,
    };

    setOrders((prevOrders) => [...prevOrders, newOrder]); // Add new order to state
    setCart([]); // Clear cart after successful order placement
    toast({
      title: 'Order Placed Successfully!',
      description: `Your order #${newOrder.id.substring(0, 8)} is ${newOrder.status}.`,
      variant: 'success',
    });
    return true;
  };

  /**
   * Updates the current user's saved addresses.
   * @param addresses - An array of updated addresses.
   */
  const updateUserAddresses = (addresses: Address[]) => {
    if (currentUser) {
      const updatedUser = { ...currentUser, addresses };
      setCurrentUser(updatedUser);
      localStorage.setItem('currentUser', JSON.stringify(updatedUser)); // Persist update
      // Also update the MOCK_USERS array for consistency in this mock setup
      const userIndex = MOCK_USERS.findIndex(u => u.id === currentUser.id);
      if (userIndex !== -1) {
        MOCK_USERS[userIndex] = updatedUser;
      }
    }
  };

  /**
   * Updates the current user's saved payment methods.
   * @param paymentMethods - An array of updated payment methods.
   */
  const updateUserPaymentMethods = (paymentMethods: PaymentMethod[]) => {
    if (currentUser) {
      const updatedUser = { ...currentUser, paymentMethods };
      setCurrentUser(updatedUser);
      localStorage.setItem('currentUser', JSON.stringify(updatedUser)); // Persist update
      // Also update the MOCK_USERS array for consistency in this mock setup
      const userIndex = MOCK_USERS.findIndex(u => u.id === currentUser.id);
      if (userIndex !== -1) {
        MOCK_USERS[userIndex] = updatedUser;
      }
    }
  };

  return (
    <AppContext.Provider
      value={{
        products,
        cart,
        currentUser,
        orders,
        login,
        signup,
        logout,
        addToCart,
        updateCartQuantity,
        removeFromCart,
        clearCart,
        placeOrder,
        updateUserAddresses,
        updateUserPaymentMethods,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

/**
 * Custom hook to consume the AppContext.
 * Throws an error if used outside of an AppProvider.
 */
export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};
