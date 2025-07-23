/*
  ProductCard.tsx - Diagon Alley Digital Emporium
  This component displays a single product in a professional card format.
  It shows the product image, name, price, magical properties, spell level,
  and an "Add to Cart" button.
*/

import React from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ShoppingCart, Star } from 'lucide-react';
import { Product } from '@/data/mockData';
import { useAppContext } from '@/context/AppContext';

interface ProductCardProps {
  product: Product;
  navigateTo: (path: string) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, navigateTo }) => {
  const { addToCart } = useAppContext();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product, 1);
  };

  // Get spell level color
  const getSpellLevelColor = (level?: string) => {
    switch (level) {
      case 'Beginner': return 'text-success bg-success/20';
      case 'Intermediate': return 'text-warning bg-warning/20';
      case 'Advanced': return 'text-error bg-error/20';
      case 'Master': return 'text-primary bg-primary/20';
      default: return 'text-textSecondary bg-muted/20';
    }
  };

  return (
    <Card
      className="professional-card group flex flex-col overflow-hidden cursor-pointer"
      onClick={() => navigateTo(`/product/${product.id}`)}
    >
      <CardHeader className="p-0 relative overflow-hidden">
        {/* Product Image */}
        <div className="relative">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
          />
          
          {/* Price Badge */}
          <div className="absolute top-3 right-3 bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm font-bold">
            ${product.price.toFixed(2)}
          </div>

          {/* Category Badge */}
          <div className="absolute top-3 left-3 bg-background/90 backdrop-blur text-primary px-2 py-1 rounded-full text-xs font-body">
            {product.category}
          </div>

          {/* Spell Level Badge */}
          {product.spellLevel && (
            <div className={`absolute bottom-3 left-3 px-2 py-1 rounded-full text-xs font-bold ${getSpellLevelColor(product.spellLevel)}`}>
              {product.spellLevel} Level
            </div>
          )}
        </div>
      </CardHeader>

      <CardContent className="flex-grow p-4 space-y-3">
        {/* Product Name */}
        <CardTitle className="text-lg font-display text-foreground mb-2 line-clamp-2 group-hover:text-primary transition-colors duration-200">
          {product.name}
        </CardTitle>

        {/* Magical Properties */}
        {product.magicalProperties && (
          <p className="text-sm text-textSecondary font-body line-clamp-2">
            {product.magicalProperties}
          </p>
        )}

        {/* Available Quantity and Rating */}
        <div className="flex items-center justify-between text-sm">
          <span className="text-textSecondary font-body">
            In Stock: <span className="font-semibold text-foreground">{product.quantity}</span>
          </span>
          
          {/* Product Rating */}
          <div className="flex items-center text-textSecondary">
            <Star className="h-4 w-4 text-warning fill-warning mr-1" />
            <span className="font-body">{product.rating.toFixed(1)}</span>
            <span className="ml-1 text-xs">({product.reviews.length})</span>
          </div>
        </div>
      </CardContent>

      <CardFooter className="p-4 pt-0">
        {/* Add to Cart Button */}
        <Button
          onClick={handleAddToCart}
          className="w-full professional-button flex items-center gap-2 font-body"
          disabled={product.quantity === 0}
        >
          <ShoppingCart className="h-4 w-4" />
          <span>{product.quantity === 0 ? 'Out of Stock' : 'Add to Cart'}</span>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;