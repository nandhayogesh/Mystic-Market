/*
  HomePage.tsx - Diagon Alley Digital Emporium
  This component renders the magical landing page of the wizarding store.
  It features an enchanted hero section with Hogwarts castle, displays featured magical products,
  top categories with house themes, and new magical arrivals with mystical animations.
*/

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardTitle } from '@/components/ui/card';
import { useAppContext } from '@/context/AppContext';
import ProductCard from '@/components/ProductCard';
import { Search, Wand2, Sparkles, Castle, Star, Zap } from 'lucide-react';

interface HomePageProps {
  navigateTo: (path: string) => void;
}

const HomePage: React.FC<HomePageProps> = ({ navigateTo }) => {
  const { products } = useAppContext();
  const [searchTerm, setSearchTerm] = useState('');

  // Featured magical products
  const featuredProducts = products.slice(0, 4);
  const newArrivals = products.slice(4, 8);
  const topCategories = Array.from(new Set(products.map(p => p.category))).slice(0, 4);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigateTo(`/products?search=${encodeURIComponent(searchTerm.trim())}`);
    }
  };

  // Get category icon and theme
  const getCategoryInfo = (category: string) => {
    switch (category) {
      case 'Wands':
        return { icon: <Wand2 className="w-16 h-16 text-primary" />, color: 'from-primary/20 to-warning/20', house: 'Ollivanders' };
      case 'Potions':
        return { icon: <Zap className="w-16 h-16 text-secondary" />, color: 'from-secondary/20 to-slytherinGreen/20', house: 'Slughorn\'s' };
      case 'Flying Equipment':
        return { icon: <Sparkles className="w-16 h-16 text-accent" />, color: 'from-accent/20 to-gryffindorRed/20', house: 'Quidditch' };
      case 'Magical Foods':
        return { icon: <Star className="w-16 h-16 text-warning" />, color: 'from-warning/20 to-hufflepuffYellow/20', house: 'Honeydukes' };
      default:
        return { icon: <Castle className="w-16 h-16 text-primary" />, color: 'from-primary/20 to-secondary/20', house: 'Magical' };
    }
  };

  return (
    <div className="space-y-16 magical-cursor">
      {/* Magical Hero Section */}
      <section className="relative h-[600px] bg-gradient-to-br from-background via-surface to-background rounded-2xl overflow-hidden shadow-magical-lg">
        {/* Magical background with floating elements */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Floating magical particles */}
          <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-primary rounded-full animate-float"></div>
          <div className="absolute top-1/3 right-1/3 w-1 h-1 bg-secondary rounded-full animate-sparkle" style={{ animationDelay: '1s' }}></div>
          <div className="absolute bottom-1/4 left-1/3 w-1 h-1 bg-warning rounded-full animate-sparkle" style={{ animationDelay: '2s' }}></div>
          <div className="absolute top-1/2 right-1/4 w-2 h-2 bg-accent rounded-full animate-float" style={{ animationDelay: '1.5s' }}></div>
          
          {/* Magical castle silhouette */}
          <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-surface/50 to-transparent"></div>
        </div>

        <div className="absolute inset-0 bg-gradient-to-r from-background/90 via-background/70 to-background/90 flex items-center justify-center p-8">
          <div className="text-center max-w-4xl space-y-8">
            {/* Magical title with floating elements */}
            <div className="relative">
              <h1 className="text-6xl md:text-7xl font-magical text-primary leading-tight drop-shadow-lg animate-fade-in-up magical-text">
                Welcome to Diagon Alley
              </h1>
              <div className="absolute -top-4 -right-4">
                <Sparkles className="h-8 w-8 text-warning animate-sparkle" />
              </div>
              <div className="absolute -bottom-2 -left-4">
                <Wand2 className="h-6 w-6 text-secondary animate-float" />
              </div>
            </div>
            
            <h2 className="text-3xl md:text-4xl font-cinzel text-secondary animate-fade-in-delay">
              Digital Emporium
            </h2>
            
            <p className="text-xl text-textSecondary drop-shadow-md animate-fade-in-delay font-cinzel leading-relaxed max-w-2xl mx-auto">
              Discover the finest magical supplies, enchanted artifacts, and wizarding essentials. 
              From Ollivanders' wands to Honeydukes' sweets, everything a witch or wizard needs.
            </p>

            {/* Magical Search Bar */}
            <form onSubmit={handleSearch} className="flex gap-3 max-w-lg mx-auto animate-zoom-in">
              <div className="relative flex-1">
                <Input
                  type="text"
                  placeholder="Search for magical items..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="bg-surface/90 backdrop-blur border-border focus:border-primary focus:ring-primary transition-all duration-300 font-cinzel text-lg py-6 pl-12"
                />
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-textSecondary" />
              </div>
              <Button 
                type="submit" 
                className="magical-button bg-primary hover:bg-primary/90 transition-all duration-300 px-8 py-6 text-lg font-cinzel"
              >
                <Wand2 className="h-5 w-5 mr-2" /> 
                Cast Search
              </Button>
            </form>

            {/* Magical Call to Action */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button
                onClick={() => navigateTo('/products')}
                className="magical-button bg-accent hover:bg-accent/90 transition-all duration-500 transform hover:scale-105 shadow-glow px-8 py-4 text-lg font-cinzel"
              >
                <Castle className="h-5 w-5 mr-2" />
                Enter the Emporium
              </Button>
              <Button
                variant="outline"
                onClick={() => navigateTo('/auth')}
                className="border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-300 px-8 py-4 text-lg font-cinzel"
              >
                <Sparkles className="h-5 w-5 mr-2" />
                Join the Wizarding World
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Magical Products */}
      <section className="py-16">
        <div className="text-center mb-12">
          <h2 className="text-5xl font-magical text-primary animate-fade-in-up mb-4 magical-text">
            Featured Magical Items
          </h2>
          <p className="text-xl text-textSecondary font-cinzel">
            Handpicked by our master wizards for exceptional quality and power
          </p>
          <div className="flex justify-center mt-4">
            <div className="flex items-center gap-2">
              <Sparkles className="h-6 w-6 text-warning animate-sparkle" />
              <div className="w-24 h-0.5 bg-gradient-to-r from-primary to-secondary"></div>
              <Star className="h-6 w-6 text-primary animate-float" />
              <div className="w-24 h-0.5 bg-gradient-to-r from-secondary to-primary"></div>
              <Sparkles className="h-6 w-6 text-warning animate-sparkle" style={{ animationDelay: '1s' }} />
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {featuredProducts.map((product, index) => (
            <div key={product.id} className="animate-fade-in-up" style={{ animationDelay: `${index * 0.2}s` }}>
              <ProductCard product={product} navigateTo={navigateTo} />
            </div>
          ))}
        </div>
      </section>

      {/* Magical Categories */}
      <section className="py-16 bg-surface/30 rounded-2xl shadow-magical">
        <div className="text-center mb-12">
          <h2 className="text-5xl font-magical text-primary animate-fade-in-up mb-4 magical-text">
            Magical Departments
          </h2>
          <p className="text-xl text-textSecondary font-cinzel">
            Explore our enchanted collections from the finest wizarding establishments
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 px-4">
          {topCategories.map((category, index) => {
            const categoryInfo = getCategoryInfo(category);
            return (
              <Card
                key={category}
                className={`magical-card group cursor-pointer hover:shadow-magical-lg transition-all duration-500 transform hover:-translate-y-4 hover:scale-105 bg-gradient-to-br ${categoryInfo.color} border-border relative overflow-hidden`}
                onClick={() => navigateTo(`/products?category=${encodeURIComponent(category)}`)}
              >
                {/* Magical particles for category cards */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div className="absolute top-2 right-2 w-1 h-1 bg-primary rounded-full animate-sparkle"></div>
                  <div className="absolute bottom-2 left-2 w-1 h-1 bg-secondary rounded-full animate-sparkle" style={{ animationDelay: '0.5s' }}></div>
                </div>

                <CardContent className="flex flex-col items-center justify-center p-8 text-center space-y-4 relative">
                  <div className="group-hover:animate-float transition-all duration-300">
                    {categoryInfo.icon}
                  </div>
                  <CardTitle className="text-2xl font-magical text-foreground group-hover:text-primary transition-colors duration-300">
                    {category}
                  </CardTitle>
                  <p className="text-sm text-textSecondary font-cinzel">
                    {categoryInfo.house}
                  </p>
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl"></div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>

      {/* New Magical Arrivals */}
      <section className="py-16">
        <div className="text-center mb-12">
          <h2 className="text-5xl font-magical text-primary animate-fade-in-up mb-4 magical-text">
            New Magical Arrivals
          </h2>
          <p className="text-xl text-textSecondary font-cinzel">
            Fresh from the most renowned magical craftsmen and enchanters
          </p>
          <div className="flex justify-center mt-4">
            <div className="flex items-center gap-2">
              <Wand2 className="h-6 w-6 text-accent animate-float" />
              <div className="w-32 h-0.5 bg-gradient-to-r from-accent to-warning"></div>
              <Zap className="h-6 w-6 text-secondary animate-sparkle" />
              <div className="w-32 h-0.5 bg-gradient-to-r from-warning to-accent"></div>
              <Wand2 className="h-6 w-6 text-accent animate-float" style={{ animationDelay: '1s' }} />
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {newArrivals.map((product, index) => (
            <div key={product.id} className="animate-fade-in-up" style={{ animationDelay: `${index * 0.2}s` }}>
              <ProductCard product={product} navigateTo={navigateTo} />
            </div>
          ))}
        </div>
      </section>

      {/* Magical Newsletter Signup */}
      <section className="py-16 bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10 rounded-2xl shadow-magical relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-4 left-1/4 w-2 h-2 bg-primary rounded-full animate-sparkle"></div>
          <div className="absolute bottom-4 right-1/3 w-1 h-1 bg-secondary rounded-full animate-float"></div>
          <div className="absolute top-1/2 right-1/4 w-1 h-1 bg-warning rounded-full animate-sparkle" style={{ animationDelay: '1.5s' }}></div>
        </div>
        
        <div className="text-center max-w-2xl mx-auto space-y-6">
          <h3 className="text-4xl font-magical text-primary magical-text">
            The Daily Prophet Magical Updates
          </h3>
          <p className="text-lg text-textSecondary font-cinzel">
            Stay informed about new magical arrivals, exclusive enchantments, and special wizarding events
          </p>
          <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <Input
              type="email"
              placeholder="Your magical owl post address..."
              className="flex-1 bg-surface/80 backdrop-blur border-border focus:border-primary focus:ring-primary transition-all duration-300 font-cinzel"
            />
            <Button className="magical-button bg-secondary hover:bg-secondary/90 transition-all duration-300 font-cinzel">
              <Sparkles className="h-4 w-4 mr-2" />
              Subscribe
            </Button>
          </form>
        </div>
      </section>
    </div>
  );
};

export default HomePage;