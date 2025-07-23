/*
  Header.tsx
  This component renders the responsive header of the application.
  It includes the store logo, navigation links, a search bar,
  and dynamic links for authentication/dashboard based on user login status.
  It uses Shadcn UI components and Lucide React icons.
*/

import React, { useState } from 'react';
import { ShoppingCart, User, Home, Package, Search, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { useAppContext } from '@/context/AppContext';

interface HeaderProps {
  navigateTo: (path: string) => void; // Function to handle client-side navigation
}

const Header: React.FC<HeaderProps> = ({ navigateTo }) => {
  const { currentUser, cart, logout } = useAppContext();
  const [searchTerm, setSearchTerm] = useState('');

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
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
        {/* Logo - Clickable to navigate to homepage */}
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            onClick={() => navigateTo('/')}
            className="text-lg font-bold text-primary hover:text-primary-foreground transition-colors duration-300"
          >
            <Package className="h-6 w-6 mr-2" /> {/* Lucide icon for logo */}
            BoltGrocer
          </Button>
        </div>

        {/* Desktop Navigation - Hidden on small screens */}
        <nav className="hidden md:flex items-center space-x-4">
          <Button variant="ghost" onClick={() => navigateTo('/')} className="hover:text-primary-foreground transition-colors duration-300">
            Home
          </Button>
          <Button variant="ghost" onClick={() => navigateTo('/products')} className="hover:text-primary-foreground transition-colors duration-300">
            Products
          </Button>
          <Button variant="ghost" onClick={() => navigateTo('/cart')} className="relative hover:text-primary-foreground transition-colors duration-300">
            <ShoppingCart className="h-5 w-5 mr-1" /> Cart
            {/* Cart item count badge */}
            {cart.length > 0 && (
              <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-accent text-xs text-white">
                {cart.length}
              </span>
            )}
          </Button>
          {/* Conditional rendering for Login/Dashboard/Logout */}
          {currentUser ? (
            <>
              <Button variant="ghost" onClick={() => navigateTo('/dashboard')} className="hover:text-primary-foreground transition-colors duration-300">
                Dashboard
              </Button>
              <Button variant="secondary" onClick={logout} className="hover:bg-secondary/80 transition-colors duration-300">
                Logout
              </Button>
            </>
          ) : (
            <Button variant="secondary" onClick={() => navigateTo('/auth')} className="hover:bg-secondary/80 transition-colors duration-300">
              Login / Signup
            </Button>
          )}
        </nav>

        {/* Search Bar (Desktop) - Hidden on small screens */}
        <form onSubmit={handleSearch} className="hidden md:flex items-center gap-2">
          <Input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-64 bg-surface border-border focus:border-primary focus:ring-primary transition-all duration-300"
          />
          <Button type="submit" size="icon" className="hover:bg-primary/90 transition-colors duration-300">
            <Search className="h-4 w-4" />
          </Button>
        </form>

        {/* Mobile Menu (Sheet component) - Visible on small screens */}
        <Sheet>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon">
              <Menu className="h-6 w-6" />
              <span className="sr-only">Toggle navigation menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-3/4 sm:max-w-xs bg-background border-l border-border">
            <div className="flex flex-col gap-4 pt-6">
              {/* Mobile Navigation Links */}
              <Button variant="ghost" onClick={() => { navigateTo('/'); }} className="justify-start hover:text-primary-foreground transition-colors duration-300">
                <Home className="mr-2 h-5 w-5" /> Home
              </Button>
              <Button variant="ghost" onClick={() => { navigateTo('/products'); }} className="justify-start hover:text-primary-foreground transition-colors duration-300">
                <Package className="mr-2 h-5 w-5" /> Products
              </Button>
              <Button variant="ghost" onClick={() => { navigateTo('/cart'); }} className="justify-start relative hover:text-primary-foreground transition-colors duration-300">
                <ShoppingCart className="mr-2 h-5 w-5" /> Cart
                {cart.length > 0 && (
                  <span className="absolute top-1 right-4 flex h-4 w-4 items-center justify-center rounded-full bg-accent text-xs text-white">
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
                  className="flex-1 bg-surface border-border focus:border-primary focus:ring-primary transition-all duration-300"
                />
                <Button type="submit" size="icon" className="hover:bg-primary/90 transition-colors duration-300">
                  <Search className="h-4 w-4" />
                </Button>
              </form>
              {/* Mobile Auth/Dashboard Links */}
              <div className="border-t border-border pt-4 mt-4">
                {currentUser ? (
                  <>
                    <Button variant="ghost" onClick={() => { navigateTo('/dashboard'); }} className="justify-start hover:text-primary-foreground transition-colors duration-300">
                      <User className="mr-2 h-5 w-5" /> Dashboard
                    </Button>
                    <Button variant="secondary" onClick={logout} className="w-full mt-2 hover:bg-secondary/80 transition-colors duration-300">
                      Logout
                    </Button>
                  </>
                ) : (
                  <Button variant="secondary" onClick={() => { navigateTo('/auth'); }} className="w-full hover:bg-secondary/80 transition-colors duration-300">
                    Login / Signup
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
