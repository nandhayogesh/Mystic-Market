/*
  ProductDetailPage.tsx
  This page displays detailed information for a single product.
  It includes a larger image, description, price, quantity selector,
  "Add to Cart" button, mock "Ratings & Reviews," and "Recommended Products."
  It uses Shadcn UI Card, Button, Input, Separator, and Lucide React icons.
*/

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { Star, ShoppingCart, ChevronLeft } from 'lucide-react'; // Icons for rating, cart, and back navigation
import { useAppContext } from '@/context/AppContext'; // Context for products and cart actions
import ProductCard from '@/components/ProductCard'; // Reusable product card for recommendations
import { Product } from '@/data/mockData'; // Product interface

interface ProductDetailPageProps {
  productId: string; // Product ID passed as a prop from the router logic
  navigateTo: (path: string) => void; // Function to handle client-side navigation
}

const ProductDetailPage: React.FC<ProductDetailPageProps> = ({ productId, navigateTo }) => {
  const { products, addToCart } = useAppContext();
  // Find the product based on the productId prop
  const product = products.find((p) => p.id === productId);
  const [quantity, setQuantity] = useState(1); // State for quantity to add to cart

  // Scroll to the top of the page when the component mounts or productId changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [productId]);

  // Handle case where product is not found
  if (!product) {
    return (
      <div className="flex flex-col items-center justify-center h-[calc(100vh-200px)] text-center">
        <h1 className="text-4xl font-bold text-primary mb-4">Product Not Found</h1>
        <p className="text-lg text-textSecondary mb-8">The product you are looking for does not exist.</p>
        <Button onClick={() => navigateTo('/products')} className="hover:bg-primary/90 transition-colors duration-300">
          Back to Products
        </Button>
      </div>
    );
  }

  /**
   * Handles adding the selected quantity of the product to the cart.
   */
  const handleAddToCart = () => {
    if (quantity > 0 && quantity <= product.quantity) {
      addToCart(product, quantity);
    } else {
      // Use toast for feedback instead of alert()
      // The addToCart function in context already handles toast notifications.
    }
  };

  // Filter for recommended products (same category, excluding current product)
  const recommendedProducts = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4); // Get up to 4 recommended products

  return (
    <div className="space-y-12">
      {/* Back to Products Button */}
      <Button variant="ghost" onClick={() => navigateTo('/products')} className="mb-6 flex items-center gap-2 text-textSecondary hover:text-primary transition-colors duration-300">
        <ChevronLeft className="h-5 w-5" /> Back to Products
      </Button>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        {/* Product Image Section */}
        <div className="relative overflow-hidden rounded-xl shadow-lg animate-fade-in">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-96 object-cover rounded-xl transition-transform duration-500 hover:scale-105"
          />
        </div>

        {/* Product Details Section */}
        <div className="space-y-6 animate-slide-in-right">
          <h1 className="text-4xl font-bold text-foreground">{product.name}</h1>
          {/* Product Rating Display */}
          <div className="flex items-center gap-2 text-textSecondary">
            <Star className="h-5 w-5 text-yellow-500 fill-yellow-500" />
            <span className="text-lg font-semibold">{product.rating.toFixed(1)}</span>
            <span className="text-sm">({product.reviews.length} reviews)</span>
          </div>
          {/* Product Price */}
          <p className="text-3xl font-extrabold text-primary">${product.price.toFixed(2)}</p>
          {/* Product Description */}
          <p className="text-textSecondary leading-relaxed">
            {product.description || 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'}
          </p>
          {/* Available Quantity */}
          <p className="text-lg font-medium text-foreground">
            Available: <span className="font-bold text-primary">{product.quantity}</span> units
          </p>

          {/* Quantity Selector and Add to Cart Button */}
          <div className="flex items-center gap-4">
            <Input
              type="number"
              min="1"
              max={product.quantity}
              value={quantity}
              onChange={(e) => setQuantity(Math.max(1, Math.min(product.quantity, parseInt(e.target.value) || 1)))}
              className="w-24 text-center bg-surface border-border focus:border-primary focus:ring-primary transition-all duration-300"
            />
            <Button
              onClick={handleAddToCart}
              className="flex-1 bg-primary hover:bg-primary/90 transition-colors duration-300 flex items-center gap-2"
              disabled={product.quantity === 0 || quantity > product.quantity} // Disable if out of stock or invalid quantity
            >
              <ShoppingCart className="h-5 w-5" />
              {product.quantity === 0 ? 'Out of Stock' : 'Add to Cart'}
            </Button>
          </div>
        </div>
      </div>

      {/* Ratings & Reviews Section */}
      <section className="py-8">
        <h2 className="text-3xl font-bold text-foreground mb-6">Ratings & Reviews</h2>
        {product.reviews.length > 0 ? (
          <div className="space-y-6">
            {product.reviews.map((review, index) => (
              <Card key={index} className="bg-card border-border shadow-md p-6">
                <div className="flex items-center mb-2">
                  <span className="font-semibold text-primary mr-2">{review.user}</span>
                  <div className="flex items-center">
                    {/* Star rating display */}
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${i < review.rating ? 'text-yellow-500 fill-yellow-500' : 'text-textSecondary'}`}
                      />
                    ))}
                  </div>
                </div>
                <p className="text-textSecondary">{review.comment}</p>
              </Card>
            ))}
          </div>
        ) : (
          <p className="text-textSecondary">No reviews yet. Be the first to review this product!</p>
        )}
      </section>

      {/* Recommended Products Section */}
      {recommendedProducts.length > 0 && (
        <section className="py-8">
          <h2 className="text-3xl font-bold text-foreground mb-6">Recommended Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {recommendedProducts.map((recProduct) => (
              <ProductCard key={recProduct.id} product={recProduct} navigateTo={navigateTo} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default ProductDetailPage;
