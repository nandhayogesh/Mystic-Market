/*
  App.tsx
  This is the main application component. It sets up the global context provider,
  implements a simple client-side routing mechanism using window.location.pathname,
  and renders the appropriate page component based on the current URL.
  It wraps all content within the Layout component for consistent header and footer.
*/

import React, { useState, useEffect } from 'react';
import Layout from '@/components/Layout'; // Main layout component
import HomePage from '@/pages/HomePage';
import ProductsPage from '@/pages/ProductsPage';
import ProductDetailPage from '@/pages/ProductDetailPage';
import CategoryPage from '@/pages/CategoryPage';
import CartPage from '@/pages/CartPage';
import AuthPage from '@/pages/AuthPage';
import CheckoutPage from '@/pages/CheckoutPage';
import DashboardPage from '@/pages/DashboardPage';
import { AppProvider } from '@/context/AppContext'; // Global state provider
import { Button } from '@/components/ui/button'; // For 404 page button
import './App.css'; // General app-wide CSS (can be minimal with Tailwind)

function App() {
  // State to keep track of the current URL path for routing
  const [currentPath, setCurrentPath] = useState(window.location.pathname);

  // Effect to listen for browser history changes (e.g., back/forward buttons)
  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname);
    };

    window.addEventListener('popstate', handlePopState);

    // Cleanup listener on component unmount
    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, []); // Empty dependency array ensures this runs once on mount

  /**
   * Custom navigation function to update the URL and trigger a re-render.
   * This simulates client-side routing without external libraries.
   * @param path The new URL path to navigate to.
   */
  const navigateTo = (path: string) => {
    window.history.pushState({}, '', path); // Update browser history
    setCurrentPath(path); // Update state to trigger re-render
  };

  /**
   * Renders the appropriate page component based on the current URL path.
   * Uses a switch statement for routing logic.
   */
  const renderPage = () => {
    // Split the path to handle dynamic routes like /product/:id
    const pathSegments = currentPath.split('/').filter(Boolean); // Removes empty strings from split

    // Handle Category Page route: /category/:categoryName
    if (pathSegments[0] === 'category' && pathSegments[1]) {
      const categoryName = decodeURIComponent(pathSegments[1]);
      return <CategoryPage category={categoryName} navigateTo={navigateTo} />;
    }

    // Handle Product Detail Page route: /product/:id
    if (pathSegments[0] === 'product' && pathSegments[1]) {
      const productId = pathSegments[1];
      return <ProductDetailPage productId={productId} navigateTo={navigateTo} />;
    }

    // Handle other static routes
    switch (currentPath) {
      case '/':
        return <HomePage navigateTo={navigateTo} />;
      case '/products':
        return <ProductsPage navigateTo={navigateTo} />;
      case '/cart':
        return <CartPage navigateTo={navigateTo} />;
      case '/auth':
        return <AuthPage navigateTo={navigateTo} />;
      case '/checkout':
        return <CheckoutPage navigateTo={navigateTo} />;
      case '/dashboard':
        return <DashboardPage navigateTo={navigateTo} />;
      default:
        // Fallback for any unmatched routes (404 Not Found)
        return (
          <div className="flex flex-col items-center justify-center h-[calc(100vh-200px)] text-center">
            <h1 className="text-4xl font-bold text-primary mb-4">404 - Page Not Found</h1>
            <p className="text-lg text-textSecondary mb-8">The page you are looking for does not exist.</p>
            <Button onClick={() => navigateTo('/')} className="hover:bg-primary/90 transition-colors duration-300">
              Go to Homepage
            </Button>
          </div>
        );
    }
  };

  return (
    // AppProvider wraps the entire application to provide global state
    <AppProvider>
      {/* Layout component provides consistent header and footer */}
      <Layout navigateTo={navigateTo}>
        {renderPage()} {/* Render the current page content */}
      </Layout>    </AppProvider>
  );
}

export default App;
