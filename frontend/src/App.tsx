import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "@/lib/auth";
import LoadingScreen from "@/components/LoadingScreen";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import BudgetPage from "./pages/BudgetPage";
import GoalsPage from "./pages/GoalsPage";
import SafetyPage from "./pages/SafetyPage";
import ChildrenPage from "./pages/ChildrenPage";
import MarriagePage from "./pages/MarriagePage";
import SettingsPage from "./pages/SettingsPage";
import HelpPage from "./pages/HelpPage";
import Login from "./pages/Login";
import Register from "./pages/Register";

const queryClient = new QueryClient();

// Protected route component to check authentication
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, loading } = useAuth();
  
  if (loading) {
    return <LoadingScreen />;
  }
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  return <>{children}</>;
};

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      
      {/* Protected routes */}
      <Route path="/" element={
        <ProtectedRoute>
          <Index />
        </ProtectedRoute>
      } />
      <Route path="/budget" element={
        <ProtectedRoute>
          <BudgetPage />
        </ProtectedRoute>
      } />
      <Route path="/goals" element={
        <ProtectedRoute>
          <GoalsPage />
        </ProtectedRoute>
      } />
      <Route path="/safety" element={
        <ProtectedRoute>
          <SafetyPage />
        </ProtectedRoute>
      } />
      <Route path="/children" element={
        <ProtectedRoute>
          <ChildrenPage />
        </ProtectedRoute>
      } />
      <Route path="/marriage" element={
        <ProtectedRoute>
          <MarriagePage />
        </ProtectedRoute>
      } />
      <Route path="/settings" element={
        <ProtectedRoute>
          <SettingsPage />
        </ProtectedRoute>
      } />
      <Route path="/help" element={
        <ProtectedRoute>
          <HelpPage />
        </ProtectedRoute>
      } />
      
      {/* Catch-all route */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <AppRoutes />
        </TooltipProvider>
      </AuthProvider>
    </BrowserRouter>
  </QueryClientProvider>
);

export default App;
