/*
  HomePage.tsx
  This component renders the main landing page of the grocery store application.
  It features a prominent hero section, displays featured products, top categories,
  and new arrivals, along with an integrated search bar.
  It uses Shadcn UI components like Button, Input, Card, and Lucide React icons.
*/

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useAppContext } from '@/context/AppContext';
import ProductCard from '@/components/ProductCard';
import { Search } from 'lucide-react'; // Icon for search

interface HomePageProps {
  navigateTo: (path: string) => void; // Function to handle client-side navigation
}

const HomePage: React.FC<HomePageProps> = ({ navigateTo }) => {
  const { products } = useAppContext();
  const [searchTerm, setSearchTerm] = useState('');

  // Mock data for sections (slice from all products and categories)
  const featuredProducts = products.slice(0, 4); // First 4 products as featured
  const newArrivals = products.slice(4, 8); // Next 4 products as new arrivals
  // Get unique categories and take the first 4
  const topCategories = Array.from(new Set(products.map(p => p.category))).slice(0, 4);

  /**
   * Handles the search form submission.
   * Navigates to the products page with the search term as a query parameter.
   */
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigateTo(`/products?search=${encodeURIComponent(searchTerm.trim())}`);
    }
  };

  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <section
        className="relative h-[500px] bg-cover bg-center rounded-xl overflow-hidden shadow-lg animate-fade-in"
        style={{ backgroundImage: 'url(https://images.pexels.com/photos/264537/pexels-photo-264537.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2)' }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-background/80 to-transparent flex items-center justify-center p-8">
          <div className="text-center max-w-2xl space-y-6">
            <h1 className="text-5xl font-extrabold text-white leading-tight drop-shadow-lg animate-slide-in-top">
              Fresh Groceries, Delivered to Your Door
            </h1>
            <p className="text-lg text-textSecondary drop-shadow-md animate-fade-in-delay">
              Discover a wide selection of high-quality produce, pantry staples, and more.
            </p>
            {/* Search Bar in Hero Section */}
            <form onSubmit={handleSearch} className="flex gap-2 max-w-md mx-auto animate-zoom-in">
              <Input
                type="text"
                placeholder="Search for products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="flex-1 bg-surface border-border focus:border-primary focus:ring-primary transition-all duration-300"
              />
              <Button type="submit" className="hover:bg-primary/90 transition-colors duration-300">
                <Search className="h-5 w-5 mr-2" /> Search
              </Button>
            </form>
            {/* Shop Now Call to Action */}
            <Button
              onClick={() => navigateTo('/products')}
              className="mt-6 px-8 py-3 text-lg font-semibold bg-accent hover:bg-accent/90 transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              Shop Now
            </Button>
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-12">
        <h2 className="text-4xl font-bold text-center mb-8 text-primary animate-fade-in-up">Featured Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} navigateTo={navigateTo} />
          ))}
        </div>
      </section>

      {/* Top Categories Section */}
      <section className="py-12 bg-surface rounded-xl shadow-lg">
        <h2 className="text-4xl font-bold text-center mb-8 text-primary animate-fade-in-up">Top Categories</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 px-4">
          {topCategories.map((category) => (
            <Card
              key={category}
              className="group cursor-pointer hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 bg-card border-border"
              onClick={() => navigateTo(`/products?category=${encodeURIComponent(category)}`)}
            >
              <CardContent className="flex flex-col items-center justify-center p-6 text-center">
                {/* Placeholder image for category, using category name for text */}
                <img
                  src={`https://placehold.co/100x100/262626/9E7FFF?text=${category.split(' ')[0]}`}
                  alt={category}
                  className="w-24 h-24 object-cover rounded-full mb-4 group-hover:scale-110 transition-transform duration-300"
                />
                <CardTitle className="text-xl font-semibold text-foreground group-hover:text-primary transition-colors duration-300">
                  {category}
                </CardTitle>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* New Arrivals Section */}
      <section className="py-12">
        <h2 className="text-4xl font-bold text-center mb-8 text-primary animate-fade-in-up">New Arrivals</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {newArrivals.map((product) => (
            <ProductCard key={product.id} product={product} navigateTo={navigateTo} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default HomePage;
