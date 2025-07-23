/*
  Footer.tsx
  This component renders the persistent footer of the application.
  It includes copyright information and mock navigation links.
  It uses Shadcn UI components and Lucide React icons.
*/

import React from 'react';
import { Package } from 'lucide-react'; // Using Package icon for the logo in the footer

const Footer: React.FC = () => {
  return (
    <footer className="border-t border-border bg-background py-8 mt-12">
      <div className="container mx-auto px-4 md:px-6 text-center text-textSecondary">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Store Logo */}
          <div className="flex items-center gap-2">
            <Package className="h-5 w-5 text-primary" />
            <span className="text-lg font-bold text-primary">BoltGrocer</span>
          </div>
          {/* Copyright Information */}
          <p>&copy; {new Date().getFullYear()} BoltGrocer. All rights reserved.</p>
          {/* Mock Navigation Links */}
          <nav className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm">
            <a href="#" className="hover:text-primary transition-colors duration-300">Privacy Policy</a>
            <a href="#" className="hover:text-primary transition-colors duration-300">Terms of Service</a>
            <a href="#" className="hover:text-primary transition-colors duration-300">Contact Us</a>
          </nav>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
