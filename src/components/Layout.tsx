/*
  Layout.tsx
  This component provides the overall layout structure for the application.
  It includes the Header, Footer, and a main content area.
  It also renders the Shadcn UI Toaster for global notifications.
*/

import React, { ReactNode } from 'react';
import Header from './Header';
import Footer from './Footer';
import { Toaster } from '@/components/ui/toaster'; // Import the Toaster component for global notifications

interface LayoutProps {
  children: ReactNode; // The content to be rendered within the layout
  navigateTo: (path: string) => void; // Function to handle client-side navigation
}

const Layout: React.FC<LayoutProps> = ({ children, navigateTo }) => {
  return (
    // Main container for the entire application, setting min-height and default text styles
    <div className="min-h-screen flex flex-col bg-background text-foreground font-inter">
      {/* Header component, passed the navigateTo function */}
      <Header navigateTo={navigateTo} />

      {/* Main content area, flex-grow ensures it takes available space */}
      <main className="flex-grow container mx-auto px-4 md:px-6 py-8">
        {children}
      </main>

      {/* Footer component */}
      <Footer />

      {/* Toaster component for displaying notifications.
          It should be placed at a high level in the component tree. */}
      <Toaster />
    </div>
  );
};

export default Layout;
