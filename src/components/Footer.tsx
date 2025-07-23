/*
  Footer.tsx - Diagon Alley Digital Emporium
  This component renders the professional footer of the wizarding store.
  It includes copyright information, navigation links, and company information.
*/

import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="border-t border-border bg-background py-12 mt-16">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Store Info */}
          <div className="text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-3 mb-4">
              <div>
                <h3 className="text-xl font-display text-primary">Diagon Alley</h3>
                <p className="text-sm text-textSecondary font-body">Digital Emporium</p>
              </div>
            </div>
            <p className="text-textSecondary font-body leading-relaxed">
              Your premier destination for the finest magical supplies, 
              enchanted artifacts, and wizarding essentials. 
              Serving the magical community since 1692.
            </p>
          </div>

          {/* Navigation */}
          <div className="text-center">
            <h4 className="text-lg font-display text-primary mb-4">
              Shop Categories
            </h4>
            <nav className="flex flex-col gap-3">
              <a href="#" className="text-textSecondary hover:text-primary transition-colors duration-200 font-body">
                Wands & Magical Tools
              </a>
              <a href="#" className="text-textSecondary hover:text-primary transition-colors duration-200 font-body">
                Potions & Ingredients
              </a>
              <a href="#" className="text-textSecondary hover:text-primary transition-colors duration-200 font-body">
                Flying Equipment
              </a>
              <a href="#" className="text-textSecondary hover:text-primary transition-colors duration-200 font-body">
                Magical Foods & Sweets
              </a>
            </nav>
          </div>

          {/* Services */}
          <div className="text-center md:text-right">
            <h4 className="text-lg font-display text-primary mb-4">
              Customer Service
            </h4>
            <nav className="flex flex-col gap-3">
              <a href="#" className="text-textSecondary hover:text-primary transition-colors duration-200 font-body">
                Shipping Information
              </a>
              <a href="#" className="text-textSecondary hover:text-primary transition-colors duration-200 font-body">
                Returns & Exchanges
              </a>
              <a href="#" className="text-textSecondary hover:text-primary transition-colors duration-200 font-body">
                Size Guide
              </a>
              <a href="#" className="text-textSecondary hover:text-primary transition-colors duration-200 font-body">
                Contact Support
              </a>
            </nav>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-border mb-8"></div>

        {/* Copyright and Links */}
        <div className="text-center space-y-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-textSecondary font-body">
              &copy; {new Date().getFullYear()} Diagon Alley Digital Emporium. All rights reserved.
            </p>
            <div className="flex items-center gap-4 text-sm text-textSecondary font-body">
              <a href="#" className="hover:text-primary transition-colors duration-200">Privacy Policy</a>
              <span>•</span>
              <a href="#" className="hover:text-primary transition-colors duration-200">Terms of Service</a>
              <span>•</span>
              <a href="#" className="hover:text-primary transition-colors duration-200">Contact Us</a>
            </div>
          </div>
          
          <div className="text-xs text-textSecondary font-body bg-surface rounded-lg p-4 border border-border">
            <p className="mb-2">
              <strong>Disclaimer:</strong> All products are for entertainment purposes. 
              No actual magic guaranteed. Side effects may include: temporary levitation, 
              spontaneous spell-casting, and an irresistible urge to attend Hogwarts.
            </p>
            <p>
              <strong>Delivery Notice:</strong> Standard delivery times may vary depending on location. 
              Express delivery available for urgent orders.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;