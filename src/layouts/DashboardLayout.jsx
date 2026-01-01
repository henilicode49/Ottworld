import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Sidebar } from '../components/Sidebar';

export const DashboardLayout = ({ allowedRoles = [] }) => {
    const { user, loading } = useAuth();

    if (loading) return <div className="p-10 text-center">Loading...</div>;

    if (!user || (allowedRoles.length > 0 && !allowedRoles.includes(user.role))) {
        return <Navigate to="/auth" replace />;
    }

    return (
        <div className="min-h-screen bg-slate-950">
            <Sidebar />
            <main className="pl-64 min-h-screen">
                <div className="p-8 max-w-7xl mx-auto">
                    <Outlet />
                </div>
            </main>
        </div>
    );
};
