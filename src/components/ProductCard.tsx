/*
  ProductCard.tsx
  This component displays a single product item in a card format.
  It shows the product image, name, price, available quantity, rating,
  and an "Add to Cart" button. It's designed to be reusable across
  product listings and featured sections.
  It uses Shadcn UI Card, Button, and Lucide React icons.
*/

import React from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ShoppingCart, Star } from 'lucide-react'; // Icons for cart and rating
import { Product } from '@/data/mockData'; // Product interface
import { useAppContext } from '@/context/AppContext'; // Context for cart actions

interface ProductCardProps {
  product: Product;
  navigateTo: (path: string) => void; // Function to navigate to product detail page
}

const ProductCard: React.FC<ProductCardProps> = ({ product, navigateTo }) => {
  const { addToCart } = useAppContext(); // Access addToCart function from context

  /**
   * Handles adding the product to the cart.
   * Prevents navigation to the detail page when clicking the button.
   */
  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation(); // Stop event propagation to prevent card's onClick from firing
    addToCart(product, 1); // Add 1 unit of the product to the cart
  };

  return (
    <Card
      className="group flex flex-col overflow-hidden rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer bg-card border-border"
      onClick={() => navigateTo(`/product/${product.id}`)} // Navigate to product detail on card click
    >
      <CardHeader className="p-0 relative">
        {/* Product Image */}
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300 rounded-t-xl"
        />
        {/* Price Badge */}
        <div className="absolute top-2 right-2 bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm font-semibold shadow-md">
          ${product.price.toFixed(2)}
        </div>
      </CardHeader>
      <CardContent className="flex-grow p-4">
        {/* Product Name */}
        <CardTitle className="text-lg font-semibold text-foreground mb-2 line-clamp-2">
          {product.name}
        </CardTitle>
        {/* Available Quantity */}
        <p className="text-sm text-textSecondary mb-2">
          Available: <span className="font-medium text-foreground">{product.quantity}</span> units
        </p>
        {/* Product Rating */}
        <div className="flex items-center text-sm text-textSecondary">
          <Star className="h-4 w-4 text-yellow-500 mr-1 fill-yellow-500" />
          <span>{product.rating.toFixed(1)} ({product.reviews.length} reviews)</span>
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0 flex justify-end">
        {/* Add to Cart Button */}
        <Button
          onClick={handleAddToCart}
          className="w-full bg-primary hover:bg-primary/90 transition-colors duration-300 flex items-center gap-2"
          disabled={product.quantity === 0} // Disable if out of stock
        >
          <ShoppingCart className="h-4 w-4" />
          {product.quantity === 0 ? 'Out of Stock' : 'Add to Cart'}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
