/*
  CartPage.tsx
  This page displays the user's shopping cart. It lists all items added,
  allows users to adjust quantities, remove items, and view a summary
  of the order including subtotal, estimated tax, and grand total.
  It uses Shadcn UI Card, Button, Input, and Separator components.
*/

import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { Trash2, ShoppingCart } from 'lucide-react'; // Icons for remove and empty cart
import { useAppContext } from '@/context/AppContext'; // Context for cart state and actions

interface CartPageProps {
  navigateTo: (path: string) => void; // Function to handle client-side navigation
}

const CartPage: React.FC<CartPageProps> = ({ navigateTo }) => {
  const { cart, updateCartQuantity, removeFromCart, clearCart } = useAppContext();

  // Calculate order summary totals
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.cartQuantity, 0);
  const estimatedTaxRate = 0.08; // Example: 8% tax rate
  const estimatedTax = subtotal * estimatedTaxRate;
  const grandTotal = subtotal + estimatedTax;

  return (
    <div className="space-y-8">
      <h1 className="text-4xl font-bold text-center text-primary animate-fade-in-up">Your Shopping Cart</h1>

      {cart.length === 0 ? (
        // Display for empty cart
        <div className="flex flex-col items-center justify-center h-64 text-center bg-card rounded-xl shadow-md p-8">
          <ShoppingCart className="h-16 w-16 text-textSecondary mb-4" />
          <p className="text-xl text-textSecondary mb-4">Your cart is empty.</p>
          <Button onClick={() => navigateTo('/products')} className="hover:bg-primary/90 transition-colors duration-300">
            Start Shopping
          </Button>
        </div>
      ) : (
        // Display for cart with items
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items List */}
          <div className="lg:col-span-2 space-y-6">
            {cart.map((item) => (
              <Card key={item.id} className="flex flex-col sm:flex-row items-center p-4 bg-card border-border shadow-md animate-fade-in-left">
                {/* Product Image */}
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-24 h-24 object-cover rounded-md mr-4 flex-shrink-0"
                />
                <div className="flex-grow text-center sm:text-left mt-4 sm:mt-0">
                  {/* Product Name */}
                  <h3 className="text-lg font-semibold text-foreground">{item.name}</h3>
                  {/* Individual Item Price */}
                  <p className="text-textSecondary">Price: ${item.price.toFixed(2)}</p>
                  {/* Quantity Selector */}
                  <div className="flex items-center justify-center sm:justify-start mt-2 gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => updateCartQuantity(item.id, item.cartQuantity - 1)}
                      disabled={item.cartQuantity <= 1} // Disable decrement if quantity is 1
                      className="hover:bg-accent/20 transition-colors duration-300"
                    >
                      -
                    </Button>
                    <Input
                      type="number"
                      value={item.cartQuantity}
                      onChange={(e) => updateCartQuantity(item.id, parseInt(e.target.value) || 1)}
                      min="1"
                      max={item.quantity} // Max quantity is available stock
                      className="w-16 text-center bg-background border-border focus:border-primary focus:ring-primary transition-all duration-300"
                    />
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => updateCartQuantity(item.id, item.cartQuantity + 1)}
                      disabled={item.cartQuantity >= item.quantity} // Disable increment if quantity reaches stock
                      className="hover:bg-accent/20 transition-colors duration-300"
                    >
                      +
                    </Button>
                  </div>
                  {/* Total Price per Item */}
                  <p className="text-foreground font-semibold mt-2">
                    Total: ${(item.price * item.cartQuantity).toFixed(2)}
                  </p>
                </div>
                {/* Remove Item Button */}
                <Button
                  variant="destructive"
                  size="icon"
                  onClick={() => removeFromCart(item.id)}
                  className="mt-4 sm:mt-0 sm:ml-auto hover:bg-destructive/90 transition-colors duration-300"
                >
                  <Trash2 className="h-5 w-5" />
                  <span className="sr-only">Remove item</span>
                </Button>
              </Card>
            ))}
            {/* Clear Cart Button */}
            <Button variant="outline" onClick={clearCart} className="w-full mt-4 hover:bg-accent/20 transition-colors duration-300">
              Clear Cart
            </Button>
          </div>

          {/* Order Summary Card */}
          <Card className="lg:col-span-1 p-6 bg-card border-border shadow-md h-fit animate-fade-in-right">
            <CardHeader className="p-0 mb-4">
              <CardTitle className="text-2xl font-bold text-foreground">Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="p-0 space-y-3">
              <div className="flex justify-between text-textSecondary">
                <span>Subtotal:</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-textSecondary">
                <span>Estimated Tax ({(estimatedTaxRate * 100).toFixed(0)}%):</span>
                <span>${estimatedTax.toFixed(2)}</span>
              </div>
              <Separator className="my-4 bg-border" />
              <div className="flex justify-between text-xl font-bold text-primary">
                <span>Grand Total:</span>
                <span>${grandTotal.toFixed(2)}</span>
              </div>
            </CardContent>
            <CardFooter className="p-0 mt-6">
              {/* Proceed to Checkout Button */}
              <Button
                onClick={() => navigateTo('/checkout')}
                className="w-full bg-accent hover:bg-accent/90 transition-colors duration-300 text-lg py-3"
              >
                Proceed to Checkout
              </Button>
            </CardFooter>
          </Card>
        </div>
      )}
    </div>
  );
};

export default CartPage;
