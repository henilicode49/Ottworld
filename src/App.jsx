import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { DataProvider } from './context/DataContext';

// Layouts
import { PublicLayout } from './layouts/PublicLayout';
import { DashboardLayout } from './layouts/DashboardLayout';

// Pages
import { HomePage } from './pages/public/HomePage';
import { StorePage } from './pages/public/StorePage';
import { AppDetailsPage } from './pages/public/AppDetailsPage';
import { AuthPage } from './pages/auth/AuthPage';

// Vendor Pages
import { VendorDashboard } from './pages/vendor/VendorDashboard';
import { AddApp } from './pages/vendor/AddApp';
import { MyApps } from './pages/vendor/MyApps';

// Admin Pages
import { AdminDashboard } from './pages/admin/AdminDashboard';
import { ModerationQueue } from './pages/admin/ModerationQueue';
import { AllApps } from './pages/admin/AllApps';
import { VendorList } from './pages/admin/VendorList';
import { VendorDetailsPage } from './pages/admin/VendorDetailsPage';
import { AdminAppDetailsPage } from './pages/admin/AdminAppDetailsPage';
import { VendorAppDetails } from './pages/VendorAppDetails';

import { Analytics } from "@vercel/analytics/react";

function App() {
  return (
    <AuthProvider>
      <DataProvider>
        <BrowserRouter>
          <Routes>
            {/* Public Routes */}
            <Route element={<PublicLayout />}>
              <Route path="/" element={<HomePage />} />
              <Route path="/store" element={<StorePage />} />
              <Route path="/app/:id" element={<AppDetailsPage />} />
              <Route path="/auth" element={<AuthPage />} />
            </Route>

            {/* Vendor Routes */}
            <Route path="/vendor" element={<DashboardLayout allowedRoles={['vendor']} />}>
              <Route index element={<VendorDashboard />} />
              <Route path="add" element={<AddApp />} />
              <Route path="apps" element={<MyApps />} />
              <Route path="app/edit/:id" element={<AddApp />} />
              {/* <Route path="app/details/:id" element={<VendorAppDetails />} /> */}
              <Route path="app/details/:id" element={<VendorAppDetails />} />

            </Route>

            {/* Admin Routes */}
            <Route path="/admin" element={<DashboardLayout allowedRoles={['admin']} />}>
              <Route index element={<AdminDashboard />} />
              <Route path="moderation" element={<ModerationQueue />} />
              <Route path="apps" element={<AllApps />} />
              <Route path="apps/:id" element={<AdminAppDetailsPage />} />
              <Route path="vendors" element={<VendorList />} />
              <Route path="vendors/:id" element={<VendorDetailsPage />} />


            </Route>

            {/* Fallback */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </BrowserRouter>
        <Analytics />
      </DataProvider>
    </AuthProvider>
  );
}

export default App;
