/*
  CheckoutPage.tsx
  This page implements the multi-step checkout process for the grocery store.
  It guides the user through selecting a delivery address, choosing a delivery slot,
  and selecting a payment method. It uses Shadcn UI components like Card, Input,
  Label, RadioGroup, Calendar, and Button.
*/

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Separator } from '@/components/ui/separator';
import { Calendar } from '@/components/ui/calendar'; // Shadcn Calendar component
import { useAppContext } from '@/context/AppContext';
import { Address, PaymentMethod } from '@/data/mockData';
import { format } from 'date-fns'; // For date formatting
import { MapPin, Calendar as CalendarIcon, CreditCard, CheckCircle } from 'lucide-react'; // Icons for steps
import { toast } from '@/hooks/use-toast'; // For user feedback

interface CheckoutPageProps {
  navigateTo: (path: string) => void; // Function to handle client-side navigation
}

const CheckoutPage: React.FC<CheckoutPageProps> = ({ navigateTo }) => {
  const { currentUser, cart, placeOrder, updateUserAddresses } = useAppContext();
  const [currentStep, setCurrentStep] = useState(1); // Current step in the checkout flow

  // --- Step 1: Delivery Address State ---
  const [selectedAddressId, setSelectedAddressId] = useState<string | null>(
    currentUser?.addresses[0]?.id || null // Pre-select first saved address if available
  );
  const [newAddress, setNewAddress] = useState<Omit<Address, 'id'>>({
    street: '', city: '', state: '', zip: '', country: ''
  });
  const [addressErrors, setAddressErrors] = useState<{ [key: string]: string }>({});

  // --- Step 2: Delivery Slot State ---
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date()); // Default to today
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string | null>(null);
  const timeSlots = ['09:00 AM - 11:00 AM', '11:00 AM - 01:00 PM', '02:00 PM - 04:00 PM', '04:00 PM - 06:00 PM'];
  const [deliverySlotError, setDeliverySlotError] = useState<string | null>(null);

  // --- Step 3: Payment State ---
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<PaymentMethod['type'] | null>(null);
  const [paymentError, setPaymentError] = useState<string | null>(null);

  // Calculate order summary totals (re-calculated on every render for simplicity)
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.cartQuantity, 0);
  const estimatedTaxRate = 0.08; // 8% mock tax
  const estimatedTax = subtotal * estimatedTaxRate;
  const grandTotal = subtotal + estimatedTax;

  // Redirect if user is not logged in or cart is empty
  if (!currentUser) {
    toast({
      title: 'Authentication Required',
      description: 'Please log in to proceed with checkout.',
      variant: 'destructive',
    });
    navigateTo('/auth');
    return null;
  }

  if (cart.length === 0) {
    toast({
      title: 'Cart Empty',
      description: 'Your cart is empty. Please add items before checking out.',
      variant: 'destructive',
    });
    navigateTo('/cart');
    return null;
  }

  /**
   * Handles moving to the next step in the checkout process.
   * Includes validation for the current step's inputs.
   */
  const handleNextStep = () => {
    if (currentStep === 1) {
      let valid = true;
      const errors: { [key: string]: string } = {};
      if (selectedAddressId === 'new') {
        // Validate new address fields
        if (!newAddress.street) errors.street = 'Street is required.';
        if (!newAddress.city) errors.city = 'City is required.';
        if (!newAddress.state) errors.state = 'State is required.';
        if (!newAddress.zip) errors.zip = 'Zip code is required.';
        if (!newAddress.country) errors.country = 'Country is required.';
        if (Object.keys(errors).length > 0) {
          valid = false;
          setAddressErrors(errors);
          toast({ title: 'Validation Error', description: 'Please fill in all address fields.', variant: 'destructive' });
        } else {
          // If new address is valid, add it to user's saved addresses
          const newAddr: Address = { id: crypto.randomUUID(), ...newAddress };
          const updatedAddresses = [...currentUser.addresses, newAddr];
          updateUserAddresses(updatedAddresses); // Update context and localStorage
          setSelectedAddressId(newAddr.id); // Select the newly added address
          setAddressErrors({}); // Clear errors
        }
      } else if (!selectedAddressId) {
        // No address selected
        valid = false;
        toast({ title: 'Validation Error', description: 'Please select or add a delivery address.', variant: 'destructive' });
      }
      if (valid) setCurrentStep(2); // Move to next step if valid
    } else if (currentStep === 2) {
      // Validate delivery date and time slot
      if (!selectedDate || !selectedTimeSlot) {
        setDeliverySlotError('Please select both a date and a time slot.');
        toast({ title: 'Validation Error', description: 'Please select a delivery date and time.', variant: 'destructive' });
      } else {
        setDeliverySlotError(null); // Clear error
        setCurrentStep(3); // Move to next step if valid
      }
    }
  };

  /**
   * Handles moving to the previous step in the checkout process.
   */
  const handlePrevStep = () => {
    setCurrentStep((prev) => Math.max(1, prev - 1)); // Go back, but not below step 1
  };

  /**
   * Handles placing the final order.
   * Performs final validation and calls the placeOrder function from context.
   */
  const handlePlaceOrder = () => {
    if (!selectedPaymentMethod) {
      setPaymentError('Please select a payment method.');
      toast({ title: 'Validation Error', description: 'Please select a payment method.', variant: 'destructive' });
      return;
    }

    // Determine the final delivery address
    const finalAddress = selectedAddressId === 'new'
      ? currentUser.addresses.find(addr => addr.street === newAddress.street && addr.city === newAddress.city) // Find the newly added address
      : currentUser.addresses.find(addr => addr.id === selectedAddressId);

    if (!finalAddress || !selectedDate || !selectedTimeSlot) {
      toast({ title: 'Order Error', description: 'Missing delivery details. Please review your selections.', variant: 'destructive' });
      return;
    }

    // Place the order via context
    const orderSuccess = placeOrder(
      finalAddress,
      { date: format(selectedDate, 'yyyy-MM-dd'), time: selectedTimeSlot },
      selectedPaymentMethod
    );

    if (orderSuccess) {
      navigateTo('/dashboard'); // Redirect to dashboard after successful order
    }
  };

  /**
   * Renders the content for the current checkout step.
   */
  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6 animate-fade-in">
            <h2 className="text-2xl font-bold text-foreground flex items-center gap-2">
              <MapPin className="h-6 w-6 text-primary" /> Delivery Address
            </h2>
            {/* Radio group for selecting existing or new address */}
            <RadioGroup value={selectedAddressId || ''} onValueChange={setSelectedAddressId} className="space-y-4">
              {currentUser?.addresses.map((addr) => (
                <div key={addr.id} className="flex items-center space-x-3 p-4 border border-border rounded-md bg-surface hover:bg-surface/80 transition-colors duration-300">
                  <RadioGroupItem value={addr.id} id={`address-${addr.id}`} />
                  <Label htmlFor={`address-${addr.id}`} className="flex flex-col cursor-pointer">
                    <span className="font-semibold text-foreground">{addr.street}, {addr.city}</span>
                    <span className="text-textSecondary">{addr.state}, {addr.zip}, {addr.country}</span>
                  </Label>
                </div>
              ))}
              <div className="flex items-center space-x-3 p-4 border border-border rounded-md bg-surface hover:bg-surface/80 transition-colors duration-300">
                <RadioGroupItem value="new" id="address-new" />
                <Label htmlFor="address-new" className="font-semibold text-foreground cursor-pointer">Add New Address</Label>
              </div>
            </RadioGroup>

            {/* Form for adding a new address, shown if "Add New Address" is selected */}
            {selectedAddressId === 'new' && (
              <Card className="p-6 bg-card border-border shadow-md animate-slide-in-bottom">
                <CardTitle className="text-xl font-semibold mb-4 text-foreground">New Address Details</CardTitle>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="street" className="text-textSecondary">Street</Label>
                    <Input id="street" value={newAddress.street} onChange={(e) => { setNewAddress({ ...newAddress, street: e.target.value }); setAddressErrors({}); }} className={`bg-background border-border focus:border-primary focus:ring-primary ${addressErrors.street ? 'border-error' : ''}`} />
                    {addressErrors.street && <p className="text-error text-sm mt-1">{addressErrors.street}</p>}
                  </div>
                  <div>
                    <Label htmlFor="city" className="text-textSecondary">City</Label>
                    <Input id="city" value={newAddress.city} onChange={(e) => { setNewAddress({ ...newAddress, city: e.target.value }); setAddressErrors({}); }} className={`bg-background border-border focus:border-primary focus:ring-primary ${addressErrors.city ? 'border-error' : ''}`} />
                    {addressErrors.city && <p className="text-error text-sm mt-1">{addressErrors.city}</p>}
                  </div>
                  <div>
                    <Label htmlFor="state" className="text-textSecondary">State</Label>
                    <Input id="state" value={newAddress.state} onChange={(e) => { setNewAddress({ ...newAddress, state: e.target.value }); setAddressErrors({}); }} className={`bg-background border-border focus:border-primary focus:ring-primary ${addressErrors.state ? 'border-error' : ''}`} />
                    {addressErrors.state && <p className="text-error text-sm mt-1">{addressErrors.state}</p>}
                  </div>
                  <div>
                    <Label htmlFor="zip" className="text-textSecondary">Zip Code</Label>
                    <Input id="zip" value={newAddress.zip} onChange={(e) => { setNewAddress({ ...newAddress, zip: e.target.value }); setAddressErrors({}); }} className={`bg-background border-border focus:border-primary focus:ring-primary ${addressErrors.zip ? 'border-error' : ''}`} />
                    {addressErrors.zip && <p className="text-error text-sm mt-1">{addressErrors.zip}</p>}
                  </div>
                  <div className="md:col-span-2">
                    <Label htmlFor="country" className="text-textSecondary">Country</Label>
                    <Input id="country" value={newAddress.country} onChange={(e) => { setNewAddress({ ...newAddress, country: e.target.value }); setAddressErrors({}); }} className={`bg-background border-border focus:border-primary focus:ring-primary ${addressErrors.country ? 'border-error' : ''}`} />
                    {addressErrors.country && <p className="text-error text-sm mt-1">{addressErrors.country}</p>}
                  </div>
                </div>
              </Card>
            )}
          </div>
        );
      case 2:
        return (
          <div className="space-y-6 animate-fade-in">
            <h2 className="text-2xl font-bold text-foreground flex items-center gap-2">
              <CalendarIcon className="h-6 w-6 text-primary" /> Delivery Slot Selection
            </h2>
            <div className="flex flex-col lg:flex-row gap-8">
              {/* Date Picker */}
              <Card className="p-4 bg-card border-border shadow-md flex-1">
                <CardTitle className="text-xl font-semibold mb-4 text-foreground">Select Date</CardTitle>
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={setSelectedDate}
                  initialFocus
                  className="rounded-md border bg-background mx-auto"
                />
              </Card>
              {/* Time Slot Selector */}
              <Card className="p-4 bg-card border-border shadow-md flex-1">
                <CardTitle className="text-xl font-semibold mb-4 text-foreground">Select Time Slot</CardTitle>
                <RadioGroup value={selectedTimeSlot || ''} onValueChange={setSelectedTimeSlot} className="space-y-3">
                  {timeSlots.map((slot) => (
                    <div key={slot} className="flex items-center space-x-3 p-3 border border-border rounded-md bg-surface hover:bg-surface/80 transition-colors duration-300">
                      <RadioGroupItem value={slot} id={`time-slot-${slot}`} />
                      <Label htmlFor={`time-slot-${slot}`} className="font-semibold text-foreground cursor-pointer">{slot}</Label>
                    </div>
                  ))}
                </RadioGroup>
                {deliverySlotError && <p className="text-error text-sm mt-2">{deliverySlotError}</p>}
              </Card>
            </div>
          </div>
        );
      case 3:
        return (
          <div className="space-y-6 animate-fade-in">
            <h2 className="text-2xl font-bold text-foreground flex items-center gap-2">
              <CreditCard className="h-6 w-6 text-primary" /> Payment Method
            </h2>
            {/* Payment Method Options */}
            <RadioGroup value={selectedPaymentMethod || ''} onValueChange={setSelectedPaymentMethod} className="space-y-4">
              <div className="flex items-center space-x-3 p-4 border border-border rounded-md bg-surface hover:bg-surface/80 transition-colors duration-300">
                <RadioGroupItem value="Credit Card" id="payment-credit" />
                <Label htmlFor="payment-credit" className="font-semibold text-foreground cursor-pointer">Credit Card</Label>
              </div>
              <div className="flex items-center space-x-3 p-4 border border-border rounded-md bg-surface hover:bg-surface/80 transition-colors duration-300">
                <RadioGroupItem value="Debit Card" id="payment-debit" />
                <Label htmlFor="payment-debit" className="font-semibold text-foreground cursor-pointer">Debit Card</Label>
              </div>
              <div className="flex items-center space-x-3 p-4 border border-border rounded-md bg-surface hover:bg-surface/80 transition-colors duration-300">
                <RadioGroupItem value="Net Banking" id="payment-netbanking" />
                <Label htmlFor="payment-netbanking" className="font-semibold text-foreground cursor-pointer">Net Banking</Label>
              </div>
              <div className="flex items-center space-x-3 p-4 border border-border rounded-md bg-surface hover:bg-surface/80 transition-colors duration-300">
                <RadioGroupItem value="Cash on Delivery" id="payment-cod" />
                <Label htmlFor="payment-cod" className="font-semibold text-foreground cursor-pointer">Cash on Delivery</Label>
              </div>
            </RadioGroup>
            {/* Mock Payment Details form (shown for card/net banking) */}
            {selectedPaymentMethod && selectedPaymentMethod !== 'Cash on Delivery' && (
              <Card className="p-6 bg-card border-border shadow-md animate-slide-in-bottom">
                <CardTitle className="text-xl font-semibold mb-4 text-foreground">Mock Payment Details</CardTitle>
                <p className="text-textSecondary mb-4">
                  This is a mock payment page. No actual payment will be processed.
                </p>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="card-number" className="text-textSecondary">Card Number</Label>
                    <Input id="card-number" placeholder="**** **** **** ****" className="bg-background border-border focus:border-primary focus:ring-primary" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="expiry-date" className="text-textSecondary">Expiry Date</Label>
                      <Input id="expiry-date" placeholder="MM/YY" className="bg-background border-border focus:border-primary focus:ring-primary" />
                    </div>
                    <div>
                      <Label htmlFor="cvv" className="text-textSecondary">CVV</Label>
                      <Input id="cvv" placeholder="***" className="bg-background border-border focus:border-primary focus:ring-primary" />
                    </div>
                  </div>
                </div>
              </Card>
            )}
            {paymentError && <p className="text-error text-sm mt-2">{paymentError}</p>}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="space-y-8">
      <h1 className="text-4xl font-bold text-center text-primary animate-fade-in-up">Checkout</h1>

      {/* Progress Indicator for Checkout Steps */}
      <div className="flex justify-between items-center mb-8">
        <div className="flex flex-col items-center flex-1">
          <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg ${currentStep >= 1 ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'} transition-colors duration-300`}>
            {currentStep > 1 ? <CheckCircle className="h-5 w-5" /> : '1'}
          </div>
          <span className="text-sm mt-2 text-textSecondary">Address</span>
        </div>
        <Separator className={`flex-1 h-0.5 ${currentStep > 1 ? 'bg-primary' : 'bg-muted'} transition-colors duration-300`} />
        <div className="flex flex-col items-center flex-1">
          <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg ${currentStep >= 2 ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'} transition-colors duration-300`}>
            {currentStep > 2 ? <CheckCircle className="h-5 w-5" /> : '2'}
          </div>
          <span className="text-sm mt-2 text-textSecondary">Delivery Slot</span>
        </div>
        <Separator className={`flex-1 h-0.5 ${currentStep > 2 ? 'bg-primary' : 'bg-muted'} transition-colors duration-300`} />
        <div className="flex flex-col items-center flex-1">
          <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg ${currentStep >= 3 ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'} transition-colors duration-300`}>
            3
          </div>
          <span className="text-sm mt-2 text-textSecondary">Payment</span>
        </div>
      </div>

      {/* Main Checkout Content Card */}
      <Card className="p-8 bg-card border-border shadow-xl">
        <CardContent className="p-0">
          {renderStepContent()} {/* Renders content based on current step */}
        </CardContent>
        <CardFooter className="p-0 mt-8 flex justify-between">
          {/* Previous Button (hidden on step 1) */}
          {currentStep > 1 && (
            <Button variant="outline" onClick={handlePrevStep} className="hover:bg-accent/20 transition-colors duration-300">
              Previous
            </Button>
          )}
          {/* Next Button (hidden on last step) */}
          {currentStep < 3 && (
            <Button onClick={handleNextStep} className="ml-auto bg-primary hover:bg-primary/90 transition-colors duration-300">
              Next
            </Button>
          )}
          {/* Place Order Button (only on last step) */}
          {currentStep === 3 && (
            <Button onClick={handlePlaceOrder} className="ml-auto bg-success hover:bg-success/90 transition-colors duration-300">
              Place Order (${grandTotal.toFixed(2)})
            </Button>
          )}
        </CardFooter>
      </Card>

      {/* Order Summary (always visible at the bottom) */}
      <Card className="p-6 bg-card border-border shadow-md">
        <CardHeader className="p-0 mb-4">
          <CardTitle className="text-2xl font-bold text-foreground">Order Summary</CardTitle>
        </CardHeader>
        <CardContent className="p-0 space-y-3">
          {cart.map((item) => (
            <div key={item.id} className="flex justify-between text-textSecondary">
              <span>{item.name} x {item.cartQuantity}</span>
              <span>${(item.price * item.cartQuantity).toFixed(2)}</span>
            </div>
          ))}
          <Separator className="my-4 bg-border" />
          <div className="flex justify-between text-textSecondary">
            <span>Subtotal:</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-textSecondary">
            <span>Estimated Tax:</span>
            <span>${estimatedTax.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-xl font-bold text-primary">
            <span>Grand Total:</span>
            <span>${grandTotal.toFixed(2)}</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CheckoutPage;
