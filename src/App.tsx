import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Analytics } from "@vercel/analytics/react";
import { AppProvider } from "./context/AppContext";
import Index from "./pages/Index";
import AppDetails from "./pages/AppDetails";
import UploadApp from "./pages/UploadApp";
import Policies from "./pages/Policies";
import VendorApps from "./pages/VendorApps";
import VendorLogin from "./pages/VendorLogin";
import VendorDashboard from "./pages/VendorDashboard";
import VendorSubscription from "./pages/VendorSubscription";
import VendorUpload from "./pages/VendorUpload";
import VendorAppDetails from "./pages/VendorAppDetails";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import AdminAppDetails from "./pages/AdminAppDetails";
import NotFound from "./pages/NotFound";
import ProtectedRoute from "./components/ProtectedRoute";


const HomeRoute = () => {
  const isAdminLoggedIn = localStorage.getItem("adminLoggedIn") === "true";
  const isVendorLoggedIn = localStorage.getItem("vendorLoggedIn") === "true";
  const vendorName = localStorage.getItem("vendorName");


  if (isAdminLoggedIn) {
    return <Navigate to="/admin/dashboard" replace />;
  }
  if (isVendorLoggedIn && vendorName) {
    return <Navigate to={`/${vendorName}/dashboard`} replace />;
  }
  if (isVendorLoggedIn) {
    // Fallback if vendorName is missing for some reason
    return <Navigate to="/vendor/dashboard" replace />;
  }
  return <Index />;
};


const ProtectedAdminRoute = ({ children }: { children: React.ReactNode }) => {
  const isAdminLoggedIn = localStorage.getItem("adminLoggedIn") === "true";
  const isVendorLoggedIn = localStorage.getItem("vendorLoggedIn") === "true";


  if (isVendorLoggedIn) {
    return <Navigate to="/vendor/dashboard" replace />;
  }
  if (!isAdminLoggedIn) {
    return <Navigate to="/admin/login" replace />;
  }
  return <>{children}</>;
};


const AdminRoute = () => {
  const isAdminLoggedIn = localStorage.getItem("adminLoggedIn") === "true";
  const isVendorLoggedIn = localStorage.getItem("vendorLoggedIn") === "true";


  if (isVendorLoggedIn) {
    return <Navigate to="/vendor/dashboard" replace />;
  }
  if (isAdminLoggedIn) {
    return <Navigate to="/admin/dashboard" replace />;
  }
  return <Navigate to="/admin/login" replace />;
};


const ProtectedVendorRoute = ({ children }: { children: React.ReactNode }) => {
  const isAdminLoggedIn = localStorage.getItem("adminLoggedIn") === "true";
  const isVendorLoggedIn = localStorage.getItem("vendorLoggedIn") === "true";


  if (isAdminLoggedIn) {
    return <Navigate to="/admin/dashboard" replace />;
  }
  if (!isVendorLoggedIn) {
    return <Navigate to="/vendor/login" replace />;
  }
  return <>{children}</>;
};


const VendorRoute = () => {
  const isAdminLoggedIn = localStorage.getItem("adminLoggedIn") === "true";
  const isVendorLoggedIn = localStorage.getItem("vendorLoggedIn") === "true";
  const vendorName = localStorage.getItem("vendorName");


  if (isAdminLoggedIn) {
    return <Navigate to="/admin/dashboard" replace />;
  }
  if (isVendorLoggedIn && vendorName) {
    return <Navigate to={`/${vendorName}/dashboard`} replace />;
  }
  // Fallback
  return <Navigate to="/vendor/login" replace />;
};


const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AppProvider>
      <Analytics />

      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<HomeRoute />} />
            <Route path="/app/:id" element={<AppDetails />} />
            <Route path="/vendor" element={<VendorRoute />} />
            <Route path="/vendor/login" element={<VendorLogin />} />


            {/* New Dynamic Vendor Routes */}
            <Route path="/:vendorName/dashboard" element={<ProtectedVendorRoute><VendorDashboard /></ProtectedVendorRoute>} />
            <Route path="/:vendorName/:vendorId/upload" element={<ProtectedVendorRoute><VendorUpload /></ProtectedVendorRoute>} />


            {/* Legacy/Generic routes kept for backward compatibility or direct access */}
            <Route path="/vendor/:vendorName" element={<VendorApps />} /> {/* Public profile */}
            <Route path="/vendor/dashboard" element={<ProtectedVendorRoute><VendorDashboard /></ProtectedVendorRoute>} />
            <Route path="/vendor/subscription" element={<ProtectedVendorRoute><VendorSubscription /></ProtectedVendorRoute>} />
            <Route path="/vendor/upload" element={<ProtectedVendorRoute><VendorUpload /></ProtectedVendorRoute>} />
            <Route path={`/vendor/app/edit/:id`} element={<ProtectedVendorRoute><VendorUpload /></ProtectedVendorRoute>} />
            <Route path="/vendor/app/details/:id" element={<ProtectedVendorRoute><VendorAppDetails /></ProtectedVendorRoute>} />


            <Route path="/admin" element={<AdminRoute />} />
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin/dashboard" element={<ProtectedAdminRoute><AdminDashboard /></ProtectedAdminRoute>} />
            <Route path="/admin/app/:id" element={<ProtectedAdminRoute><AdminAppDetails /></ProtectedAdminRoute>} />
            <Route path="/upload" element={<ProtectedAdminRoute><UploadApp /></ProtectedAdminRoute>} />


            <Route path="/policies" element={<Policies />} />
            <Route path="/terms" element={<Policies />} />
            <Route path="/privacy" element={<Policies />} />
            <Route path="/support" element={<Policies />} />
            <Route path="/creator-guidelines" element={<Policies />} />
            <Route path="/monetization" element={<Policies />} />
            <Route path="/contact" element={<Policies />} />


            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AppProvider>
  </QueryClientProvider>
);


export default App; 