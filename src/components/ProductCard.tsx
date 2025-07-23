/*
  ProductCard.tsx - Diagon Alley Digital Emporium
  This component displays a single magical product in an enchanted card format.
  It shows the product image, name, price, magical properties, spell level,
  and a "Cast into Cauldron" button with magical animations and effects.
*/

import React from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ShoppingCart, Star, Sparkles, Wand2, Zap } from 'lucide-react';
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
      case 'Advanced': return 'text-accent bg-accent/20';
      case 'Master': return 'text-primary bg-primary/20';
      default: return 'text-textSecondary bg-muted/20';
    }
  };

  // Get category icon
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Wands': return <Wand2 className="h-4 w-4" />;
      case 'Potions': return <Zap className="h-4 w-4" />;
      case 'Flying Equipment': return <Sparkles className="h-4 w-4" />;
      default: return <Star className="h-4 w-4" />;
    }
  };

  return (
    <Card
      className="magical-card group flex flex-col overflow-hidden rounded-xl shadow-magical hover:shadow-magical-lg transition-all duration-500 transform hover:-translate-y-2 hover:scale-105 cursor-pointer bg-card border-border relative"
      onClick={() => navigateTo(`/product/${product.id}`)}
    >
      {/* Magical floating particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500">
        <div className="absolute top-2 left-2 w-1 h-1 bg-primary rounded-full animate-sparkle"></div>
        <div className="absolute top-4 right-4 w-1 h-1 bg-secondary rounded-full animate-sparkle" style={{ animationDelay: '0.5s' }}></div>
        <div className="absolute bottom-4 left-4 w-1 h-1 bg-warning rounded-full animate-sparkle" style={{ animationDelay: '1s' }}></div>
      </div>

      <CardHeader className="p-0 relative overflow-hidden">
        {/* Product Image with magical overlay */}
        <div className="relative">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
          />
          {/* Magical overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          
          {/* Price Badge with magical glow */}
          <div className="absolute top-3 right-3 bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm font-bold shadow-glow animate-magical-pulse">
            {product.price >= 1000 ? `${(product.price / 1000).toFixed(1)}K Galleons` : `${product.price} Galleons`}
          </div>

          {/* Category Badge */}
          <div className="absolute top-3 left-3 bg-surface/90 backdrop-blur text-primary px-2 py-1 rounded-full text-xs font-cinzel flex items-center gap-1">
            {getCategoryIcon(product.category)}
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
        <CardTitle className="text-lg font-magical text-foreground mb-2 line-clamp-2 group-hover:text-primary transition-colors duration-300">
          {product.name}
        </CardTitle>

        {/* Magical Properties */}
        {product.magicalProperties && (
          <p className="text-sm text-textSecondary italic font-cinzel line-clamp-2">
            ✨ {product.magicalProperties}
          </p>
        )}

        {/* Available Quantity */}
        <div className="flex items-center justify-between text-sm">
          <span className="text-textSecondary font-cinzel">
            In Stock: <span className="font-bold text-foreground">{product.quantity}</span>
          </span>
          
          {/* Product Rating */}
          <div className="flex items-center text-textSecondary">
            <Star className="h-4 w-4 text-warning fill-warning mr-1" />
            <span className="font-cinzel">{product.rating.toFixed(1)}</span>
            <span className="ml-1 text-xs">({product.reviews.length})</span>
          </div>
        </div>
      </CardContent>

      <CardFooter className="p-4 pt-0">
        {/* Cast into Cauldron Button */}
        <Button
          onClick={handleAddToCart}
          className="w-full magical-button bg-primary hover:bg-primary/90 transition-all duration-300 flex items-center gap-2 font-cinzel font-bold group-hover:animate-magical-glow"
          disabled={product.quantity === 0}
        >
          <div className="flex items-center gap-2">
            <ShoppingCart className="h-4 w-4 group-hover:animate-cauldron-bubble" />
            <span>{product.quantity === 0 ? 'Out of Magical Stock' : 'Cast into Cauldron'}</span>
            <Sparkles className="h-4 w-4 animate-sparkle" />
          </div>
        </Button>
      </CardFooter>

      {/* Magical glow effect on hover */}
      <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
        <div className="absolute inset-0 rounded-xl shadow-glow-lg"></div>
      </div>
    </Card>
  );
};

export default ProductCard;