/*
  AuthPage.tsx
  This page provides user authentication functionalities: Login and Signup.
  It uses Shadcn UI Tabs for switching between forms, Card for layout,
  Input, Label, and Button for form elements.
  Client-side validation is implemented for form fields.
*/

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAppContext } from '@/context/AppContext';
import { Mail, Lock, User as UserIcon } from 'lucide-react'; // Icons for form fields

interface AuthPageProps {
  navigateTo: (path: string) => void; // Function to handle client-side navigation
}

const AuthPage: React.FC<AuthPageProps> = ({ navigateTo }) => {
  const { login, signup, currentUser } = useAppContext();

  // State for Login form fields
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  // State for Signup form fields
  const [signupName, setSignupName] = useState('');
  const [signupEmail, setSignupEmail] = useState('');
  const [signupPassword, setSignupPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  // State to control active tab (Login/Signup)
  const [activeTab, setActiveTab] = useState('login');

  // State for form validation errors
  const [loginErrors, setLoginErrors] = useState<{ email?: string; password?: string }>({});
  const [signupErrors, setSignupErrors] = useState<{ name?: string; email?: string; password?: string; confirmPassword?: string }>({});

  /**
   * Validates the login form fields.
   * @returns True if the form is valid, false otherwise.
   */
  const validateLoginForm = () => {
    const errors: typeof loginErrors = {};
    if (!loginEmail) errors.email = 'Email is required.';
    if (!loginPassword) errors.password = 'Password is required.';
    setLoginErrors(errors);
    return Object.keys(errors).length === 0;
  };

  /**
   * Validates the signup form fields.
   * @returns True if the form is valid, false otherwise.
   */
  const validateSignupForm = () => {
    const errors: typeof signupErrors = {};
    if (!signupName) errors.name = 'Name is required.';
    if (!signupEmail) errors.email = 'Email is required.';
    if (!signupPassword) errors.password = 'Password is required.';
    if (signupPassword.length < 6) errors.password = 'Password must be at least 6 characters.';
    if (signupPassword !== confirmPassword) errors.confirmPassword = 'Passwords do not match.';
    setSignupErrors(errors);
    return Object.keys(errors).length === 0;
  };

  /**
   * Handles the login form submission.
   * Performs client-side validation and then attempts to log in via context.
   */
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateLoginForm()) {
      if (login(loginEmail, loginPassword)) {
        navigateTo('/dashboard'); // Redirect to dashboard on successful login
      }
    }
  };

  /**
   * Handles the signup form submission.
   * Performs client-side validation and then attempts to sign up via context.
   */
  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateSignupForm()) {
      if (signup(signupName, signupEmail, signupPassword)) {
        navigateTo('/dashboard'); // Redirect to dashboard on successful signup
      }
    }
  };

  // If user is already logged in, redirect them to the dashboard immediately
  if (currentUser) {
    navigateTo('/dashboard');
    return null; // Render nothing while redirecting
  }

  return (
    <div className="flex justify-center items-center min-h-[calc(100vh-200px)] py-8">
      <Card className="w-full max-w-md bg-card border-border shadow-xl animate-fade-in">
        <CardHeader className="text-center pb-4">
          <CardTitle className="text-3xl font-bold text-primary">Welcome to BoltGrocer</CardTitle>
        </CardHeader>
        <CardContent>
          {/* Tabs for Login and Signup forms */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2 bg-muted/50 border border-border rounded-lg mb-6">
              <TabsTrigger value="login" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-md transition-all duration-300 rounded-md">
                Login
              </TabsTrigger>
              <TabsTrigger value="signup" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-md transition-all duration-300 rounded-md">
                Signup
              </TabsTrigger>
            </TabsList>

            {/* Login Form Content */}
            <TabsContent value="login" className="space-y-6 animate-slide-in-bottom">
              <form onSubmit={handleLogin} className="space-y-6">
                <div>
                  <Label htmlFor="login-email" className="text-textSecondary mb-2 block">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-textSecondary" />
                    <Input
                      id="login-email"
                      type="email"
                      placeholder="your@example.com"
                      value={loginEmail}
                      onChange={(e) => { setLoginEmail(e.target.value); setLoginErrors({}); }} // Clear errors on change
                      className={`pl-10 bg-background border-border focus:border-primary focus:ring-primary transition-all duration-300 ${loginErrors.email ? 'border-error' : ''}`}
                    />
                  </div>
                  {loginErrors.email && <p className="text-error text-sm mt-1">{loginErrors.email}</p>}
                </div>
                <div>
                  <Label htmlFor="login-password" className="text-textSecondary mb-2 block">Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-textSecondary" />
                    <Input
                      id="login-password"
                      type="password"
                      placeholder="••••••••"
                      value={loginPassword}
                      onChange={(e) => { setLoginPassword(e.target.value); setLoginErrors({}); }} // Clear errors on change
                      className={`pl-10 bg-background border-border focus:border-primary focus:ring-primary transition-all duration-300 ${loginErrors.password ? 'border-error' : ''}`}
                    />
                  </div>
                  {loginErrors.password && <p className="text-error text-sm mt-1">{loginErrors.password}</p>}
                </div>
                <Button type="submit" className="w-full bg-primary hover:bg-primary/90 transition-colors duration-300 py-2 text-lg">
                  Login
                </Button>
              </form>
            </TabsContent>

            {/* Signup Form Content */}
            <TabsContent value="signup" className="space-y-6 animate-slide-in-bottom">
              <form onSubmit={handleSignup} className="space-y-6">
                <div>
                  <Label htmlFor="signup-name" className="text-textSecondary mb-2 block">Name</Label>
                  <div className="relative">
                    <UserIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-textSecondary" />
                    <Input
                      id="signup-name"
                      type="text"
                      placeholder="John Doe"
                      value={signupName}
                      onChange={(e) => { setSignupName(e.target.value); setSignupErrors({}); }}
                      className={`pl-10 bg-background border-border focus:border-primary focus:ring-primary transition-all duration-300 ${signupErrors.name ? 'border-error' : ''}`}
                    />
                  </div>
                  {signupErrors.name && <p className="text-error text-sm mt-1">{signupErrors.name}</p>}
                </div>
                <div>
                  <Label htmlFor="signup-email" className="text-textSecondary mb-2 block">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-textSecondary" />
                    <Input
                      id="signup-email"
                      type="email"
                      placeholder="your@example.com"
                      value={signupEmail}
                      onChange={(e) => { setSignupEmail(e.target.value); setSignupErrors({}); }}
                      className={`pl-10 bg-background border-border focus:border-primary focus:ring-primary transition-all duration-300 ${signupErrors.email ? 'border-error' : ''}`}
                    />
                  </div>
                  {signupErrors.email && <p className="text-error text-sm mt-1">{signupErrors.email}</p>}
                </div>
                <div>
                  <Label htmlFor="signup-password" className="text-textSecondary mb-2 block">Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-textSecondary" />
                    <Input
                      id="signup-password"
                      type="password"
                      placeholder="••••••••"
                      value={signupPassword}
                      onChange={(e) => { setSignupPassword(e.target.value); setSignupErrors({}); }}
                      className={`pl-10 bg-background border-border focus:border-primary focus:ring-primary transition-all duration-300 ${signupErrors.password ? 'border-error' : ''}`}
                    />
                  </div>
                  {signupErrors.password && <p className="text-error text-sm mt-1">{signupErrors.password}</p>}
                </div>
                <div>
                  <Label htmlFor="confirm-password" className="text-textSecondary mb-2 block">Confirm Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-textSecondary" />
                    <Input
                      id="confirm-password"
                      type="password"
                      placeholder="••••••••"
                      value={confirmPassword}
                      onChange={(e) => { setConfirmPassword(e.target.value); setSignupErrors({}); }}
                      className={`pl-10 bg-background border-border focus:border-primary focus:ring-primary transition-all duration-300 ${signupErrors.confirmPassword ? 'border-error' : ''}`}
                    />
                  </div>
                  {signupErrors.confirmPassword && <p className="text-error text-sm mt-1">{signupErrors.confirmPassword}</p>}
                </div>
                <Button type="submit" className="w-full bg-accent hover:bg-accent/90 transition-colors duration-300 py-2 text-lg">
                  Signup
                </Button>
              </form>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default AuthPage;
