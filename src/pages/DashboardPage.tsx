/*
  DashboardPage.tsx
  This page provides a personalized dashboard for logged-in users.
  It displays their order history, saved addresses, saved payment methods,
  and placeholders for loyalty program and auto-replenishment settings.
  It uses Shadcn UI Card, Button, Separator, and Lucide React icons.
*/

import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { useAppContext } from '@/context/AppContext';
import { Package, MapPin, CreditCard, Award, Repeat } from 'lucide-react'; // Icons for dashboard sections
import { toast } from '@/hooks/use-toast'; // For user feedback
import { MOCK_PRODUCTS } from '@/data/mockData'; // Import MOCK_PRODUCTS to resolve the reference

interface DashboardPageProps {
  navigateTo: (path: string) => void; // Function to handle client-side navigation
}

const DashboardPage: React.FC<DashboardPageProps> = ({ navigateTo }) => {
  const { currentUser, orders, logout } = useAppContext();

  // Redirect if user is not logged in
  if (!currentUser) {
    toast({
      title: 'Authentication Required',
      description: 'Please log in to view your dashboard.',
      variant: 'destructive',
    });
    navigateTo('/auth');
    return null;
  }

  // Filter and sort orders for the current user
  const userOrders = orders
    .filter(order => order.userId === currentUser.id)
    .sort((a, b) => new Date(b.orderDate).getTime() - new Date(a.orderDate).getTime()); // Sort by most recent first

  return (
    <div className="space-y-12">
      <h1 className="text-4xl font-bold text-center text-primary animate-fade-in-up">Welcome, {currentUser.name}!</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Order History Section */}
        <Card className="lg:col-span-2 p-6 bg-card border-border shadow-xl animate-fade-in-left">
          <CardHeader className="p-0 mb-4 flex flex-row items-center justify-between">
            <CardTitle className="text-2xl font-bold text-foreground flex items-center gap-2">
              <Package className="h-6 w-6 text-primary" /> Order History
            </CardTitle>
            <Button variant="outline" onClick={() => navigateTo('/products')} className="hover:bg-accent/20 transition-colors duration-300">
              Shop More
            </Button>
          </CardHeader>
          <CardContent className="p-0 space-y-4">
            {userOrders.length > 0 ? (
              userOrders.map((order) => (
                <div key={order.id} className="border border-border rounded-md p-4 bg-surface shadow-sm">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="font-semibold text-lg text-foreground">Order #{order.id.substring(0, 8)}</h3>
                    {/* Order Status Badge */}
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                      order.status === 'Delivered' ? 'bg-success/20 text-success' :
                      order.status === 'Processing' ? 'bg-warning/20 text-warning' :
                      'bg-muted/20 text-textSecondary'
                    }`}>
                      {order.status}
                    </span>
                  </div>
                  <p className="text-textSecondary text-sm mb-2">Date: {order.orderDate}</p>
                  <p className="text-textSecondary text-sm mb-2">Total: <span className="font-bold text-primary">${order.total.toFixed(2)}</span></p>
                  <p className="text-textSecondary text-sm mb-2">Payment: {order.paymentMethod}</p>
                  <p className="text-textSecondary text-sm mb-2">Delivery: {order.deliverySlot.date} at {order.deliverySlot.time}</p>
                  <Separator className="my-3 bg-border" />
                  <div className="space-y-2">
                    <p className="font-medium text-foreground">Items:</p>
                    {order.items.map((item) => (
                      <div key={item.productId} className="flex items-center gap-3 text-sm text-textSecondary">
                        <img src={item.image} alt={item.name} className="w-10 h-10 object-cover rounded-md" />
                        <span>{item.name} x {item.quantity} (${item.price.toFixed(2)} each)</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))
            ) : (
              <p className="text-textSecondary text-center py-8">You haven't placed any orders yet.</p>
            )}
          </CardContent>
        </Card>

        {/* User Information & Settings Column */}
        <div className="lg:col-span-1 space-y-8">
          {/* Saved Addresses Section */}
          <Card className="p-6 bg-card border-border shadow-md animate-fade-in-right">
            <CardHeader className="p-0 mb-4">
              <CardTitle className="text-xl font-bold text-foreground flex items-center gap-2">
                <MapPin className="h-5 w-5 text-primary" /> Saved Addresses
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0 space-y-3">
              {currentUser.addresses.length > 0 ? (
                currentUser.addresses.map((addr) => (
                  <div key={addr.id} className="border border-border rounded-md p-3 bg-surface text-textSecondary">
                    <p className="font-semibold text-foreground">{addr.street}, {addr.city}</p>
                    <p>{addr.state}, {addr.zip}, {addr.country}</p>
                  </div>
                ))
              ) : (
                <p className="text-textSecondary">No saved addresses.</p>
              )}
              <Button variant="outline" onClick={() => navigateTo('/checkout')} className="w-full mt-4 hover:bg-accent/20 transition-colors duration-300">
                Add New Address
              </Button>
            </CardContent>
          </Card>

          {/* Saved Payment Methods Section */}
          <Card className="p-6 bg-card border-border shadow-md animate-fade-in-right">
            <CardHeader className="p-0 mb-4">
              <CardTitle className="text-xl font-bold text-foreground flex items-center gap-2">
                <CreditCard className="h-5 w-5 text-primary" /> Saved Payment Methods
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0 space-y-3">
              {currentUser.paymentMethods.length > 0 ? (
                currentUser.paymentMethods.map((pm) => (
                  <div key={pm.id} className="border border-border rounded-md p-3 bg-surface text-textSecondary">
                    <p className="font-semibold text-foreground">{pm.type}</p>
                    {pm.last4 && <p>Card ending in: {pm.last4}</p>}
                    {pm.bankName && <p>Bank: {pm.bankName}</p>}
                  </div>
                ))
              ) : (
                <p className="text-textSecondary">No saved payment methods.</p>
              )}
              <Button variant="outline" onClick={() => navigateTo('/checkout')} className="w-full mt-4 hover:bg-accent/20 transition-colors duration-300">
                Add Payment Method
              </Button>
            </CardContent>
          </Card>

          {/* Loyalty Program Section (Placeholder) */}
          <Card className="p-6 bg-card border-border shadow-md animate-fade-in-right">
            <CardHeader className="p-0 mb-4">
              <CardTitle className="text-xl font-bold text-foreground flex items-center gap-2">
                <Award className="h-5 w-5 text-primary" /> Loyalty Program
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0 text-textSecondary">
              <p>Your current status: <span className="font-semibold text-primary">{currentUser.loyaltyStatus}</span></p>
              <p className="mt-2">Earn points with every purchase and unlock exclusive rewards!</p>
              <Button variant="outline" className="w-full mt-4 hover:bg-accent/20 transition-colors duration-300">
                Learn More
              </Button>
            </CardContent>
          </Card>

          {/* Auto-Replenishment Section (Placeholder) */}
          <Card className="p-6 bg-card border-border shadow-md animate-fade-in-right">
            <CardHeader className="p-0 mb-4">
              <CardTitle className="text-xl font-bold text-foreground flex items-center gap-2">
                <Repeat className="h-5 w-5 text-primary" /> Auto-Replenishment
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0 text-textSecondary">
              <p>Manage your recurring orders for essential items.</p>
              {currentUser.autoReplenishment.length > 0 ? (
                <ul className="list-disc list-inside mt-2">
                  {currentUser.autoReplenishment.map((setting, index) => (
                    <li key={index}>{setting.quantity}x {
                      // Find product name from MOCK_PRODUCTS
                      MOCK_PRODUCTS.find(p => p.id === setting.productId)?.name || 'Unknown Product'
                    } - {setting.frequency}</li>
                  ))}
                </ul>
              ) : (
                <p className="mt-2">No auto-replenishment settings configured.</p>
              )}
              <Button variant="outline" className="w-full mt-4 hover:bg-accent/20 transition-colors duration-300">
                Set Up Auto-Replenishment
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
