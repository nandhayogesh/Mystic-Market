/*
  ProductsPage.tsx
  This page displays a grid of all available grocery items.
  It includes search functionality and basic filtering options by category and price range.
  It uses Shadcn UI Input, Button, Select, Label, and Lucide React icons.
*/

import React, { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label'; // Added Label for price range
import { useAppContext } from '@/context/AppContext';
import ProductCard from '@/components/ProductCard';
import { Search, Filter } from 'lucide-react'; // Icons for search and filter
import { MOCK_CATEGORIES } from '@/data/mockData'; // Mock categories for filtering

interface ProductsPageProps {
  navigateTo: (path: string) => void; // Function to handle client-side navigation
}

const ProductsPage: React.FC<ProductsPageProps> = ({ navigateTo }) => {
  const { products } = useAppContext();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  // Initialize price range based on actual product prices
  const initialMaxPrice = Math.max(...products.map(p => p.price), 100); // Ensure a default max
  const [priceRange, setPriceRange] = useState<[number, number]>([0, initialMaxPrice + 10]); // Add buffer for slider max

  // Effect to read search and category parameters from URL on component mount
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const search = params.get('search');
    const category = params.get('category');
    if (search) setSearchTerm(decodeURIComponent(search));
    if (category) setSelectedCategory(decodeURIComponent(category));
  }, []);

  // Filter products based on search term, category, and price range
  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1];
    return matchesSearch && matchesCategory && matchesPrice;
  });

  /**
   * Handles changes to the search input.
   * Updates the search term state and the URL query parameter.
   */
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newSearchTerm = e.target.value;
    setSearchTerm(newSearchTerm);
    // Update URL query parameter without full page reload
    const params = new URLSearchParams(window.location.search);
    if (newSearchTerm) {
      params.set('search', newSearchTerm);
    } else {
      params.delete('search');
    }
    window.history.replaceState({}, '', `${window.location.pathname}?${params.toString()}`);
  };

  /**
   * Handles changes to the category filter.
   * Updates the selected category state and the URL query parameter.
   */
  const handleCategoryChange = (value: string) => {
    setSelectedCategory(value);
    const params = new URLSearchParams(window.location.search);
    if (value !== 'all') {
      params.set('category', value);
    } else {
      params.delete('category');
    }
    window.history.replaceState({}, '', `${window.location.pathname}?${params.toString()}`);
  };

  // Determine min and max prices from mock data for the price range slider
  const minPrice = Math.min(...products.map(p => p.price), 0);

  return (
    <div className="space-y-8">
      <h1 className="text-4xl font-bold text-center text-primary animate-fade-in-up">Our Products</h1>

      {/* Search and Filter Section */}
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-surface p-6 rounded-xl shadow-md">
        {/* Search Input */}
        <div className="flex-1 w-full md:w-auto flex items-center gap-2">
          <Search className="h-5 w-5 text-textSecondary" />
          <Input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="flex-1 bg-background border-border focus:border-primary focus:ring-primary transition-all duration-300"
          />
        </div>

        <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
          {/* Category Filter */}
          <Select value={selectedCategory} onValueChange={handleCategoryChange}>
            <SelectTrigger className="w-full sm:w-[180px] bg-background border-border focus:border-primary focus:ring-primary transition-all duration-300">
              <Filter className="h-4 w-4 mr-2 text-textSecondary" />
              <SelectValue placeholder="Select Category" />
            </SelectTrigger>
            <SelectContent className="bg-card border-border">
              <SelectItem value="all">All Categories</SelectItem>
              {MOCK_CATEGORIES.map((category) => (
                <SelectItem key={category} value={category}>
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Price Range Slider */}
          <div className="flex flex-col gap-2 w-full sm:w-[200px]">
            <Label htmlFor="price-range" className="text-textSecondary">Price Range: ${priceRange[0].toFixed(2)} - ${priceRange[1].toFixed(2)}</Label>
            <Input
              id="price-range"
              type="range"
              min={minPrice}
              max={initialMaxPrice + 10} // Max value for the slider
              value={priceRange[1]} // Controls the upper bound of the range
              onChange={(e) => setPriceRange([minPrice, parseFloat(e.target.value)])}
              className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer accent-primary"
            />
          </div>
        </div>
      </div>

      {/* Product Grid Display */}
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} navigateTo={navigateTo} />
          ))}
        </div>
      ) : (
        // Display when no products match filters
        <div className="text-center py-16">
          <p className="text-xl text-textSecondary">No products found matching your criteria.</p>
          <Button
            onClick={() => {
              setSearchTerm('');
              setSelectedCategory('all');
              setPriceRange([0, initialMaxPrice + 10]);
              navigateTo('/products'); // Navigate to clear URL params
            }}
            className="mt-4 hover:bg-primary/90 transition-colors duration-300"
          >
            Clear Filters
          </Button>
        </div>
      )}
    </div>
  );
};

export default ProductsPage;
