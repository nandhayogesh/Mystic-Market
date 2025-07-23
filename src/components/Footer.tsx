/*
  Footer.tsx - Diagon Alley Digital Emporium
  This component renders the magical footer of the wizarding store.
  It includes enchanted copyright information, mystical navigation links,
  and magical elements with Harry Potter theming.
*/

import React from 'react';
import { Wand2, Sparkles, Castle, Scroll } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="border-t border-border bg-background/95 backdrop-blur py-12 mt-16 relative overflow-hidden">
      {/* Magical background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute bottom-4 left-1/4 w-2 h-2 bg-primary rounded-full animate-sparkle"></div>
        <div className="absolute bottom-8 right-1/3 w-1 h-1 bg-secondary rounded-full animate-sparkle" style={{ animationDelay: '1.5s' }}></div>
        <div className="absolute bottom-6 left-2/3 w-1 h-1 bg-warning rounded-full animate-sparkle" style={{ animationDelay: '3s' }}></div>
      </div>

      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Magical Store Info */}
          <div className="text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-3 mb-4">
              <div className="relative">
                <Wand2 className="h-6 w-6 text-primary animate-float" />
                <Sparkles className="absolute -top-1 -right-1 h-3 w-3 text-warning animate-sparkle" />
              </div>
              <div>
                <h3 className="text-xl font-magical text-primary">Diagon Alley</h3>
                <p className="text-sm text-textSecondary font-cinzel">Digital Emporium</p>
              </div>
            </div>
            <p className="text-textSecondary font-cinzel leading-relaxed">
              Your premier destination for the finest magical supplies, 
              enchanted artifacts, and wizarding essentials. 
              Serving the magical community since 1692.
            </p>
          </div>

          {/* Magical Navigation */}
          <div className="text-center">
            <h4 className="text-lg font-magical text-primary mb-4 flex items-center justify-center gap-2">
              <Castle className="h-5 w-5" />
              Magical Locations
            </h4>
            <nav className="flex flex-col gap-3">
              <a href="#" className="text-textSecondary hover:text-primary transition-colors duration-300 font-cinzel hover:scale-105 transform inline-block">
                Ollivanders Wand Shop
              </a>
              <a href="#" className="text-textSecondary hover:text-secondary transition-colors duration-300 font-cinzel hover:scale-105 transform inline-block">
                Slughorn's Potions Emporium
              </a>
              <a href="#" className="text-textSecondary hover:text-warning transition-colors duration-300 font-cinzel hover:scale-105 transform inline-block">
                Quality Quidditch Supplies
              </a>
              <a href="#" className="text-textSecondary hover:text-accent transition-colors duration-300 font-cinzel hover:scale-105 transform inline-block">
                Honeydukes Sweet Shop
              </a>
            </nav>
          </div>

          {/* Magical Services */}
          <div className="text-center md:text-right">
            <h4 className="text-lg font-magical text-primary mb-4 flex items-center justify-center md:justify-end gap-2">
              <Scroll className="h-5 w-5" />
              Magical Services
            </h4>
            <nav className="flex flex-col gap-3">
              <a href="#" className="text-textSecondary hover:text-primary transition-colors duration-300 font-cinzel hover:scale-105 transform inline-block">
                Owl Post Delivery
              </a>
              <a href="#" className="text-textSecondary hover:text-secondary transition-colors duration-300 font-cinzel hover:scale-105 transform inline-block">
                Phoenix Express Shipping
              </a>
              <a href="#" className="text-textSecondary hover:text-warning transition-colors duration-300 font-cinzel hover:scale-105 transform inline-block">
                Floo Network Transport
              </a>
              <a href="#" className="text-textSecondary hover:text-accent transition-colors duration-300 font-cinzel hover:scale-105 transform inline-block">
                Magical Customer Support
              </a>
            </nav>
          </div>
        </div>

        {/* Magical Divider */}
        <div className="relative mb-8">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-border"></div>
          </div>
          <div className="relative flex justify-center">
            <div className="bg-background px-4">
              <Sparkles className="h-6 w-6 text-primary animate-sparkle" />
            </div>
          </div>
        </div>

        {/* Copyright and Magical Disclaimer */}
        <div className="text-center space-y-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-textSecondary font-cinzel">
              &copy; {new Date().getFullYear()} Diagon Alley Digital Emporium. All magical rights reserved.
            </p>
            <div className="flex items-center gap-4 text-sm text-textSecondary font-cinzel">
              <a href="#" className="hover:text-primary transition-colors duration-300">Magical Privacy Policy</a>
              <span>•</span>
              <a href="#" className="hover:text-primary transition-colors duration-300">Wizarding Terms</a>
              <span>•</span>
              <a href="#" className="hover:text-primary transition-colors duration-300">Contact the Ministry</a>
            </div>
          </div>
          
          <div className="text-xs text-textSecondary font-cinzel italic bg-surface/30 rounded-lg p-4 border border-border">
            <p className="mb-2">
              ⚡ <strong>Magical Disclaimer:</strong> All products are for entertainment purposes. 
              No actual magic guaranteed. Side effects may include: temporary levitation, 
              spontaneous spell-casting, and an irresistible urge to attend Hogwarts.
            </p>
            <p>
              🦉 <strong>Delivery Notice:</strong> Owl post delivery times may vary depending on weather conditions, 
              Quidditch matches, and the occasional dragon sighting. Phoenix Express available for urgent orders.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;