/*
  CategoryPage.tsx - Diagon Alley Digital Emporium
  This page displays products filtered by a specific category.
  It shows category-specific information and filtered products.
*/

import React, { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { useAppContext } from '@/context/AppContext';
import ProductCard from '@/components/ProductCard';
import { Search, Filter, ArrowLeft } from 'lucide-react';

interface CategoryPageProps {
  category: string;
  navigateTo: (path: string) => void;
}

const CategoryPage: React.FC<CategoryPageProps> = ({ category, navigateTo }) => {
  const { products } = useAppContext();
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('name');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 3000]);

  // Filter products by category
  const categoryProducts = products.filter(product => product.category === category);
  
  // Get category info
  const getCategoryInfo = (category: string) => {
    switch (category) {
      case 'Wands':
        return {
          title: 'Wands',
          subtitle: 'Ollivanders Fine Wands',
          description: 'The finest selection of magical wands, each uniquely crafted to choose its perfect wizard or witch.'
        };
      case 'Potions':
        return {
          title: 'Potions',
          subtitle: 'Slughorn\'s Potions Emporium',
          description: 'Expertly brewed potions and complete brewing kits for all your magical needs.'
        };
      case 'Flying Equipment':
        return {
          title: 'Flying Equipment',
          subtitle: 'Quality Quidditch Supplies',
          description: 'Professional-grade broomsticks and Quidditch equipment for players of all skill levels.'
        };
      case 'Magical Foods':
        return {
          title: 'Magical Foods',
          subtitle: 'Honeydukes Sweet Shop',
          description: 'Delightful magical sweets and treats that bring joy to witches and wizards everywhere.'
        };
      case 'Magical Accessories':
        return {
          title: 'Magical Accessories',
          subtitle: 'Magical Menagerie & More',
          description: 'Essential magical accessories and rare artifacts for the discerning wizard.'
        };
      case 'Dark Arts Defense':
        return {
          title: 'Dark Arts Defense',
          subtitle: 'Protective Magical Items',
          description: 'Professional-grade protective equipment and defensive magical items.'
        };
      default:
        return {
          title: category,
          subtitle: 'Magical Items',
          description: 'A curated selection of magical items for your wizarding needs.'
        };
    }
  };

  const categoryInfo = getCategoryInfo(category);

  // Apply filters and sorting
  const filteredProducts = categoryProducts
    .filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1];
      return matchesSearch && matchesPrice;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'rating':
          return b.rating - a.rating;
        case 'name':
        default:
          return a.name.localeCompare(b.name);
      }
    });

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const maxPrice = Math.max(...categoryProducts.map(p => p.price), 100);

  return (
    <div className="space-y-8">
      {/* Back Button */}
      <Button 
        variant="ghost" 
        onClick={() => navigateTo('/products')} 
        className="flex items-center gap-2 text-textSecondary hover:text-primary"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to All Products
      </Button>

      {/* Category Header */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-display text-primary">{categoryInfo.title}</h1>
        <h2 className="text-xl font-display text-textSecondary">{categoryInfo.subtitle}</h2>
        <p className="text-lg text-textSecondary font-body max-w-2xl mx-auto">
          {categoryInfo.description}
        </p>
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-surface p-6 rounded-lg shadow-professional">
        {/* Search */}
        <div className="flex-1 w-full md:w-auto flex items-center gap-2">
          <Search className="h-5 w-5 text-textSecondary" />
          <Input
            type="text"
            placeholder={`Search ${category.toLowerCase()}...`}
            value={searchTerm}
            onChange={handleSearchChange}
            className="flex-1 bg-background border-border focus:border-primary font-body"
          />
        </div>

        <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
          {/* Sort */}
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-full sm:w-[180px] bg-background border-border focus:border-primary">
              <Filter className="h-4 w-4 mr-2 text-textSecondary" />
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent className="bg-background border-border">
              <SelectItem value="name">Name A-Z</SelectItem>
              <SelectItem value="price-low">Price: Low to High</SelectItem>
              <SelectItem value="price-high">Price: High to Low</SelectItem>
              <SelectItem value="rating">Highest Rated</SelectItem>
            </SelectContent>
          </Select>

          {/* Price Range */}
          <div className="flex flex-col gap-2 w-full sm:w-[200px]">
            <Label htmlFor="price-range" className="text-textSecondary font-body">
              Max Price: ${priceRange[1].toFixed(0)}
            </Label>
            <Input
              id="price-range"
              type="range"
              min={0}
              max={maxPrice + 100}
              value={priceRange[1]}
              onChange={(e) => setPriceRange([0, parseFloat(e.target.value)])}
              className="w-full"
            />
          </div>
        </div>
      </div>

      {/* Results Count */}
      <div className="text-center">
        <p className="text-textSecondary font-body">
          Showing {filteredProducts.length} of {categoryProducts.length} products
        </p>
      </div>

      {/* Products Grid */}
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} navigateTo={navigateTo} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <p className="text-xl text-textSecondary font-body">No products found matching your criteria.</p>
          <Button
            onClick={() => {
              setSearchTerm('');
              setPriceRange([0, maxPrice + 100]);
            }}
            className="mt-4 professional-button font-body"
          >
            Clear Filters
          </Button>
        </div>
      )}
    </div>
  );
};

export default CategoryPage;