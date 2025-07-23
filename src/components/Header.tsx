/*
  Header.tsx - Diagon Alley Digital Emporium
  This component renders the professional header of the wizarding store.
  It includes the store logo, navigation links, search bar,
  and dynamic links for authentication/dashboard based on user login status.
*/

import React, { useState } from 'react';
import { ShoppingCart, User, Home, Package, Search, Menu } from 'lucide-react';
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
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            onClick={() => navigateTo('/')}
            className="text-xl font-display font-bold text-primary hover:text-primary/80 transition-colors duration-200"
          >
            <div className="flex items-center gap-3">
              <div className="flex flex-col items-start">
                <span className="text-2xl leading-tight">Diagon Alley</span>
                <span className="text-sm text-textSecondary font-body">Digital Emporium</span>
              </div>
            </div>
          </Button>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-2">
          <Button 
            variant="ghost" 
            onClick={() => navigateTo('/')} 
            className="font-body hover:text-primary hover:bg-surface transition-colors duration-200"
          >
            <Home className="h-4 w-4 mr-2" />
            Home
          </Button>
          <Button 
            variant="ghost" 
            onClick={() => navigateTo('/products')} 
            className="font-body hover:text-primary hover:bg-surface transition-colors duration-200"
          >
            <Package className="h-4 w-4 mr-2" />
            Products
          </Button>
          <Button 
            variant="ghost" 
            onClick={() => navigateTo('/cart')} 
            className="font-body hover:text-primary hover:bg-surface transition-colors duration-200 relative"
          >
            <div className="relative">
              <ShoppingCart className="h-5 w-5 mr-2" />
              {cart.length > 0 && (
                <span className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground font-bold">
                  {cart.length}
                </span>
              )}
            </div>
            Cart
          </Button>
          
          {/* Authentication/Dashboard Links */}
          {currentUser ? (
            <>
              <Button 
                variant="ghost" 
                onClick={() => navigateTo('/dashboard')} 
                className="font-body hover:text-primary hover:bg-surface transition-colors duration-200"
              >
                <User className="h-4 w-4 mr-2" />
                Dashboard
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
                variant="outline" 
                onClick={logout} 
                className="font-body border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-colors duration-200"
              >
                Logout
              </Button>
            </>
          ) : (
            <Button 
              onClick={() => navigateTo('/auth')} 
              className="professional-button font-body"
            >
              Login
            </Button>
          )}
        </nav>

        {/* Search Bar (Desktop) */}
        <form onSubmit={handleSearch} className="hidden md:flex items-center gap-2">
          <div className="relative">
            <Input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-64 bg-background border-border focus:border-primary transition-colors duration-200 font-body"
            />
            <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-textSecondary" />
          </div>
          <Button 
            type="submit" 
            size="icon" 
            className="professional-button"
          >
            <Search className="h-4 w-4" />
          </Button>
        </form>

        {/* Mobile Menu */}
        <Sheet>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon" className="hover:bg-surface transition-colors duration-200">
              <Menu className="h-6 w-6 text-primary" />
              <span className="sr-only">Toggle navigation menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-3/4 sm:max-w-xs bg-background border-l border-border">
            <div className="flex flex-col gap-6 pt-6">
              {/* Mobile Navigation Links */}
              <Button 
                variant="ghost" 
                onClick={() => { navigateTo('/'); }} 
                className="justify-start font-body hover:text-primary hover:bg-surface transition-colors duration-200"
              >
                <Home className="mr-3 h-5 w-5" /> Home
              </Button>
              <Button 
                variant="ghost" 
                onClick={() => { navigateTo('/products'); }} 
                className="justify-start font-body hover:text-primary hover:bg-surface transition-colors duration-200"
              >
                <Package className="mr-3 h-5 w-5" /> Products
              </Button>
              <Button 
                variant="ghost" 
                onClick={() => { navigateTo('/cart'); }} 
                className="justify-start relative font-body hover:text-primary hover:bg-surface transition-colors duration-200"
              >
                <ShoppingCart className="mr-3 h-5 w-5" /> Cart
                {cart.length > 0 && (
                  <span className="absolute top-1 right-4 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground font-bold">
                    {cart.length}
                  </span>
                )}
              </Button>
              
              {/* Mobile Search Bar */}
              <form onSubmit={handleSearch} className="flex items-center gap-2">
                <Input
                  type="text"
                  placeholder="Search..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="flex-1 bg-background border-border focus:border-primary transition-colors duration-200 font-body"
                />
                <Button 
                  type="submit" 
                  size="icon" 
                  className="professional-button"
                >
                  <Search className="h-4 w-4" />
                </Button>
              </form>
              
              {/* Mobile Auth/Dashboard Links */}
              <div className="border-t border-border pt-4 mt-4">
                {currentUser ? (
                  <>
                    <Button 
                      variant="ghost" 
                      onClick={() => { navigateTo('/dashboard'); }} 
                      className="justify-start w-full font-body hover:text-primary hover:bg-surface transition-colors duration-200 mb-3"
                    >
                      <User className="mr-3 h-5 w-5" /> Dashboard
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
                      variant="outline" 
                      onClick={logout} 
                      className="w-full border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-colors duration-200 font-body"
                    >
                      Logout
                    </Button>
                  </>
                ) : (
                  <Button 
                    onClick={() => { navigateTo('/auth'); }} 
                    className="w-full professional-button font-body"
                  >
                    Login
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