/*
  Header.tsx - Diagon Alley Digital Emporium
  This component renders the magical header of the wizarding store.
  It includes the enchanted store logo, mystical navigation links, a magical search bar,
  and dynamic links for authentication/dashboard based on wizard login status.
  Features magical animations, floating elements, and Harry Potter theming.
*/

import React, { useState } from 'react';
import { ShoppingCart, User, Home, Package, Search, Menu, Sparkles, Wand2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { useAppContext } from '@/context/AppContext';

interface HeaderProps {
  navigateTo: (path: string) => void;
}

const Header: React.FC<HeaderProps> = ({ navigateTo }) => {
  const { currentUser, cart, logout } = useAppContext();
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigateTo(`/products?search=${encodeURIComponent(searchTerm.trim())}`);
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 magical-cursor">
      {/* Magical floating particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-2 left-1/4 w-1 h-1 bg-primary rounded-full animate-sparkle"></div>
        <div className="absolute top-4 right-1/3 w-1 h-1 bg-secondary rounded-full animate-sparkle" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-3 left-2/3 w-1 h-1 bg-warning rounded-full animate-sparkle" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="container mx-auto flex h-20 items-center justify-between px-4 md:px-6">
        {/* Magical Logo */}
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            onClick={() => navigateTo('/')}
            className="text-xl font-magical font-bold text-primary hover:text-warning transition-all duration-500 hover:scale-105 group"
          >
            <div className="flex items-center gap-3">
              <div className="relative">
                <Wand2 className="h-8 w-8 text-primary group-hover:animate-wand-wave transition-all duration-300" />
                <Sparkles className="absolute -top-1 -right-1 h-4 w-4 text-warning animate-sparkle" />
              </div>
              <div className="flex flex-col items-start">
                <span className="text-2xl magical-text leading-tight">Diagon Alley</span>
                <span className="text-sm text-textSecondary font-cinzel">Digital Emporium</span>
              </div>
            </div>
          </Button>
        </div>

        {/* Desktop Navigation - Magical Spell Book Style */}
        <nav className="hidden md:flex items-center space-x-2">
          <Button 
            variant="ghost" 
            onClick={() => navigateTo('/')} 
            className="magical-button-nav font-cinzel hover:text-primary hover:bg-surface/50 transition-all duration-300 hover:scale-105"
          >
            <Home className="h-4 w-4 mr-2" />
            Castle Grounds
          </Button>
          <Button 
            variant="ghost" 
            onClick={() => navigateTo('/products')} 
            className="magical-button-nav font-cinzel hover:text-primary hover:bg-surface/50 transition-all duration-300 hover:scale-105"
          >
            <Package className="h-4 w-4 mr-2" />
            Magical Supplies
          </Button>
          <Button 
            variant="ghost" 
            onClick={() => navigateTo('/cart')} 
            className="magical-button-nav font-cinzel hover:text-primary hover:bg-surface/50 transition-all duration-300 hover:scale-105 relative group"
          >
            <div className="relative">
              <ShoppingCart className="h-5 w-5 mr-2 group-hover:animate-cauldron-bubble" />
              {cart.length > 0 && (
                <span className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-accent text-xs text-white font-bold animate-magical-pulse">
                  {cart.length}
                </span>
              )}
            </div>
            Magical Cauldron
          </Button>
          
          {/* Authentication/Dashboard Links */}
          {currentUser ? (
            <>
              <Button 
                variant="ghost" 
                onClick={() => navigateTo('/dashboard')} 
                className="magical-button-nav font-cinzel hover:text-primary hover:bg-surface/50 transition-all duration-300 hover:scale-105"
              >
                <User className="h-4 w-4 mr-2" />
                Wizard Profile
                {currentUser.hogwartsHouse && (
                  <span className={`ml-2 text-xs px-2 py-1 rounded-full ${
                    currentUser.hogwartsHouse === 'Gryffindor' ? 'bg-gryffindorRed/20 text-gryffindorRed' :
                    currentUser.hogwartsHouse === 'Slytherin' ? 'bg-slytherinGreen/20 text-slytherinGreen' :
                    currentUser.hogwartsHouse === 'Ravenclaw' ? 'bg-ravenclawBlue/20 text-ravenclawBlue' :
                    'bg-hufflepuffYellow/20 text-hufflepuffYellow'
                  }`}>
                    {currentUser.hogwartsHouse}
                  </span>
                )}
              </Button>
              <Button 
                variant="secondary" 
                onClick={logout} 
                className="magical-button font-cinzel bg-accent hover:bg-accent/80 transition-all duration-300 hover:scale-105"
              >
                Leave Wizarding World
              </Button>
            </>
          ) : (
            <Button 
              variant="secondary" 
              onClick={() => navigateTo('/auth')} 
              className="magical-button font-cinzel bg-primary hover:bg-primary/80 text-primary-foreground transition-all duration-300 hover:scale-105"
            >
              <Sparkles className="h-4 w-4 mr-2" />
              Enter Wizarding World
            </Button>
          )}
        </nav>

        {/* Magical Search Bar (Desktop) */}
        <form onSubmit={handleSearch} className="hidden md:flex items-center gap-2">
          <div className="relative">
            <Input
              type="text"
              placeholder="Search magical items..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-64 bg-surface/80 border-border focus:border-primary focus:ring-primary transition-all duration-300 font-cinzel placeholder:text-textSecondary"
            />
            <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-textSecondary" />
          </div>
          <Button 
            type="submit" 
            size="icon" 
            className="magical-button bg-primary hover:bg-primary/90 transition-all duration-300 hover:scale-105"
          >
            <Wand2 className="h-4 w-4" />
          </Button>
        </form>

        {/* Mobile Magical Menu */}
        <Sheet>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon" className="hover:bg-surface/50 transition-all duration-300">
              <Menu className="h-6 w-6 text-primary" />
              <span className="sr-only">Toggle magical navigation menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-3/4 sm:max-w-xs bg-background border-l border-border magical-form">
            <div className="flex flex-col gap-6 pt-6">
              {/* Mobile Navigation Links */}
              <Button 
                variant="ghost" 
                onClick={() => { navigateTo('/'); }} 
                className="justify-start font-cinzel hover:text-primary hover:bg-surface/50 transition-all duration-300"
              >
                <Home className="mr-3 h-5 w-5" /> Castle Grounds
              </Button>
              <Button 
                variant="ghost" 
                onClick={() => { navigateTo('/products'); }} 
                className="justify-start font-cinzel hover:text-primary hover:bg-surface/50 transition-all duration-300"
              >
                <Package className="mr-3 h-5 w-5" /> Magical Supplies
              </Button>
              <Button 
                variant="ghost" 
                onClick={() => { navigateTo('/cart'); }} 
                className="justify-start relative font-cinzel hover:text-primary hover:bg-surface/50 transition-all duration-300"
              >
                <ShoppingCart className="mr-3 h-5 w-5" /> Magical Cauldron
                {cart.length > 0 && (
                  <span className="absolute top-1 right-4 flex h-5 w-5 items-center justify-center rounded-full bg-accent text-xs text-white font-bold">
                    {cart.length}
                  </span>
                )}
              </Button>
              
              {/* Mobile Search Bar */}
              <form onSubmit={handleSearch} className="flex items-center gap-2">
                <Input
                  type="text"
                  placeholder="Search magic..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="flex-1 bg-surface/80 border-border focus:border-primary focus:ring-primary transition-all duration-300 font-cinzel"
                />
                <Button 
                  type="submit" 
                  size="icon" 
                  className="magical-button bg-primary hover:bg-primary/90 transition-all duration-300"
                >
                  <Wand2 className="h-4 w-4" />
                </Button>
              </form>
              
              {/* Mobile Auth/Dashboard Links */}
              <div className="border-t border-border pt-4 mt-4">
                {currentUser ? (
                  <>
                    <Button 
                      variant="ghost" 
                      onClick={() => { navigateTo('/dashboard'); }} 
                      className="justify-start w-full font-cinzel hover:text-primary hover:bg-surface/50 transition-all duration-300 mb-3"
                    >
                      <User className="mr-3 h-5 w-5" /> Wizard Profile
                    </Button>
                    {currentUser.hogwartsHouse && (
                      <div className={`text-center mb-3 px-3 py-2 rounded-lg ${
                        currentUser.hogwartsHouse === 'Gryffindor' ? 'bg-gryffindorRed/20 text-gryffindorRed' :
                        currentUser.hogwartsHouse === 'Slytherin' ? 'bg-slytherinGreen/20 text-slytherinGreen' :
                        currentUser.hogwartsHouse === 'Ravenclaw' ? 'bg-ravenclawBlue/20 text-ravenclawBlue' :
                        'bg-hufflepuffYellow/20 text-hufflepuffYellow'
                      }`}>
                        House {currentUser.hogwartsHouse}
                      </div>
                    )}
                    <Button 
                      variant="secondary" 
                      onClick={logout} 
                      className="w-full magical-button bg-accent hover:bg-accent/80 transition-all duration-300 font-cinzel"
                    >
                      Leave Wizarding World
                    </Button>
                  </>
                ) : (
                  <Button 
                    variant="secondary" 
                    onClick={() => { navigateTo('/auth'); }} 
                    className="w-full magical-button bg-primary hover:bg-primary/80 text-primary-foreground transition-all duration-300 font-cinzel"
                  >
                    <Sparkles className="mr-2 h-5 w-5" />
                    Enter Wizarding World
                  </Button>
                )}
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
};

export default Header;