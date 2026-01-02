import React, { useState } from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Sidebar } from '../components/Sidebar';
import { Menu } from 'lucide-react';

export const DashboardLayout = ({ allowedRoles = [] }) => {
    const { user, loading } = useAuth();
    const [sidebarOpen, setSidebarOpen] = useState(false);

    if (loading) return <div className="p-10 text-center">Loading...</div>;

    if (!user || (allowedRoles.length > 0 && !allowedRoles.includes(user.role))) {
        return <Navigate to="/auth" replace />;
    }

    return (
        <div className="min-h-screen bg-slate-950">
            {/* Mobile Header */}
            <div className="md:hidden flex items-center justify-between p-4 border-b border-white/10 bg-slate-900/50 backdrop-blur-md sticky top-0 z-30">
                <button onClick={() => setSidebarOpen(true)} className="p-2 -ml-2 text-slate-400 hover:text-white">
                    <Menu className="w-6 h-6" />
                </button>
                <span className="font-bold text-lg">
                    {user?.role === 'admin' ? 'Admin Panel' : 'Vendor Portal'}
                </span>
                <div className="w-8" /> {/* Spacer for centering if needed */}
            </div>

            <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

            <main className="md:pl-64 min-h-screen transition-all duration-300">
                <div className="p-4 md:p-8 max-w-7xl mx-auto">
                    <Outlet />
                </div>
            </main>
        </div>
    );
};
