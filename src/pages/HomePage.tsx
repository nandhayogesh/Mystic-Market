/*
  HomePage.tsx - Diagon Alley Digital Emporium
  This component renders the professional landing page of the wizarding store.
  It features a hero section, displays featured products,
  top categories, and new arrivals.
*/

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardTitle } from '@/components/ui/card';
import { useAppContext } from '@/context/AppContext';
import ProductCard from '@/components/ProductCard';
import { Search, Package, Star, Zap, Wand2 } from 'lucide-react';

interface HomePageProps {
  navigateTo: (path: string) => void;
}

const HomePage: React.FC<HomePageProps> = ({ navigateTo }) => {
  const { products } = useAppContext();
  const [searchTerm, setSearchTerm] = useState('');

  // Featured products
  const featuredProducts = products.slice(0, 4);
  const newArrivals = products.slice(4, 8);
  const topCategories = Array.from(new Set(products.map(p => p.category))).slice(0, 4);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigateTo(`/products?search=${encodeURIComponent(searchTerm.trim())}`);
    }
  };

  // Get category icon and info
  const getCategoryInfo = (category: string) => {
    switch (category) {
      case 'Wands':
        return { icon: <Wand2 className="w-12 h-12 text-primary" />, description: 'Ollivanders Fine Wands' };
      case 'Potions':
        return { icon: <Zap className="w-12 h-12 text-primary" />, description: 'Slughorn\'s Potions Emporium' };
      case 'Flying Equipment':
        return { icon: <Package className="w-12 h-12 text-primary" />, description: 'Quality Quidditch Supplies' };
      case 'Magical Foods':
        return { icon: <Star className="w-12 h-12 text-primary" />, description: 'Honeydukes Sweet Shop' };
      default:
        return { icon: <Package className="w-12 h-12 text-primary" />, description: 'Magical Items' };
    }
  };

  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <section className="relative h-[500px] bg-gradient-to-br from-surface to-background rounded-lg overflow-hidden shadow-professional-lg">
        <div className="absolute inset-0 bg-gradient-to-r from-background/90 via-background/70 to-background/90 flex items-center justify-center p-8">
          <div className="text-center max-w-4xl space-y-8">
            <h1 className="text-5xl md:text-6xl font-display text-primary leading-tight animate-fade-in-up">
              Welcome to Diagon Alley
            </h1>
            
            <h2 className="text-2xl md:text-3xl font-display text-textSecondary animate-fade-in-up">
              Digital Emporium
            </h2>
            
            <p className="text-lg text-textSecondary font-body leading-relaxed max-w-2xl mx-auto animate-fade-in-up">
              Discover the finest magical supplies, enchanted artifacts, and wizarding essentials. 
              From Ollivanders' wands to Honeydukes' sweets, everything a witch or wizard needs.
            </p>

            {/* Search Bar */}
            <form onSubmit={handleSearch} className="flex gap-3 max-w-lg mx-auto animate-fade-in-up">
              <div className="relative flex-1">
                <Input
                  type="text"
                  placeholder="Search for magical items..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="bg-background border-border focus:border-primary font-body text-base py-3 pl-12"
                />
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-textSecondary" />
              </div>
              <Button 
                type="submit" 
                className="professional-button px-6 py-3 text-base font-body"
              >
                Search
              </Button>
            </form>

            {/* Call to Action */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-in-up">
              <Button
                onClick={() => navigateTo('/products')}
                className="professional-button px-8 py-3 text-base font-body"
              >
                <Package className="h-5 w-5 mr-2" />
                Shop Now
              </Button>
              <Button
                variant="outline"
                onClick={() => navigateTo('/auth')}
                className="border-primary text-primary hover:bg-primary hover:text-primary-foreground px-8 py-3 text-base font-body"
              >
                Create Account
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-display text-primary animate-fade-in-up mb-4">
            Featured Products
          </h2>
          <p className="text-lg text-textSecondary font-body">
            Handpicked by our experts for exceptional quality and value
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map((product, index) => (
            <div key={product.id} className="animate-fade-in-up" style={{ animationDelay: `${index * 0.1}s` }}>
              <ProductCard product={product} navigateTo={navigateTo} />
            </div>
          ))}
        </div>
      </section>

      {/* Categories */}
      <section className="py-16 bg-surface rounded-lg shadow-professional">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-display text-primary animate-fade-in-up mb-4">
            Shop by Category
          </h2>
          <p className="text-lg text-textSecondary font-body">
            Browse our curated collections from the finest magical establishments
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 px-4">
          {topCategories.map((category, index) => {
            const categoryInfo = getCategoryInfo(category);
            return (
              <Card
                key={category}
                className="professional-card cursor-pointer group"
                onClick={() => navigateTo(`/products?category=${encodeURIComponent(category)}`)}
              >
                <CardContent className="flex flex-col items-center justify-center p-8 text-center space-y-4">
                  <div className="group-hover:scale-110 transition-transform duration-200">
                    {categoryInfo.icon}
                  </div>
                  <CardTitle className="text-xl font-display text-foreground group-hover:text-primary transition-colors duration-200">
                    {category}
                  </CardTitle>
                  <p className="text-sm text-textSecondary font-body">
                    {categoryInfo.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>

      {/* New Arrivals */}
      <section className="py-16">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-display text-primary animate-fade-in-up mb-4">
            New Arrivals
          </h2>
          <p className="text-lg text-textSecondary font-body">
            Fresh from the most renowned magical craftsmen and enchanters
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {newArrivals.map((product, index) => (
            <div key={product.id} className="animate-fade-in-up" style={{ animationDelay: `${index * 0.1}s` }}>
              <ProductCard product={product} navigateTo={navigateTo} />
            </div>
          ))}
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="py-16 bg-gradient-to-r from-primary/10 to-primary/5 rounded-lg shadow-professional">
        <div className="text-center max-w-2xl mx-auto space-y-6">
          <h3 className="text-3xl font-display text-primary">
            Stay Updated
          </h3>
          <p className="text-lg text-textSecondary font-body">
            Subscribe to our newsletter for the latest magical arrivals and exclusive offers
          </p>
          <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <Input
              type="email"
              placeholder="Enter your email address..."
              className="flex-1 bg-background border-border focus:border-primary font-body"
            />
            <Button className="professional-button font-body">
              Subscribe
            </Button>
          </form>
        </div>
      </section>
    </div>
  );
};

export default HomePage;