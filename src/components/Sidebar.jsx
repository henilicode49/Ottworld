import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
    LayoutDashboard,
    Upload,
    List,
    ShieldAlert,
    LogOut,
    Store,
    Settings,
    User
} from 'lucide-react';
import { cn } from '../lib/utils'; // Assuming cn utility is in lib/utils

export const Sidebar = ({ isOpen, onClose }) => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const vendorLinks = [
        { to: '/vendor', icon: LayoutDashboard, label: 'Overview', end: true },
        { to: '/vendor/add', icon: Upload, label: 'New App' },
        { to: '/vendor/apps', icon: List, label: 'My Apps' },
    ];

    const adminLinks = [
        { to: '/admin', icon: LayoutDashboard, label: 'Dashboard', end: true },
        { to: '/admin/moderation', icon: ShieldAlert, label: 'Moderation' },
        { to: '/admin/apps', icon: List, label: 'All Apps' },
        { to: '/admin/vendors', icon: User, label: 'Vendors' },
    ];

    const links = user?.role === 'admin' ? adminLinks : vendorLinks;

    return (
        <>
            {/* Mobile Overlay */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 md:hidden animate-fade-in"
                    onClick={onClose}
                />
            )}

            <aside className={cn(
                "fixed left-0 top-0 h-screen w-64 glass-panel border-r border-white/10 flex flex-col z-50 transition-transform duration-300 md:translate-x-0 bg-slate-950",
                isOpen ? "translate-x-0" : "-translate-x-full"
            )}>
                <div className="p-6">
                    <div className="flex items-center justify-between mb-8">
                        <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded bg-primary/20 flex items-center justify-center">
                                <span className="text-primary font-bold">
                                    {user?.role === 'admin' ? 'A' : 'V'}
                                </span>
                            </div>
                            <span className="text-lg font-bold">
                                {user?.role === 'admin' ? 'Admin Panel' : 'Vendor Portal'}
                            </span>
                        </div>
                        {/* Mobile Close Button */}
                        <button onClick={onClose} className="md:hidden p-1 hover:bg-white/10 rounded-lg">
                            <div className="w-5 h-5 flex items-center justify-center">✕</div>
                        </button>
                    </div>

                    <div className="space-y-1">
                        {links.map((link) => (
                            <NavLink
                                key={link.to}
                                to={link.to}
                                end={link.end}
                                onClick={() => onClose && onClose()}
                                className={({ isActive }) => cn(
                                    "flex items-center gap-3 px-4 py-3 rounded-xl transition-all",
                                    isActive
                                        ? "bg-primary text-white shadow-lg shadow-primary/20"
                                        : "text-slate-400 hover:bg-white/5 hover:text-slate-200"
                                )}
                            >
                                <link.icon className="w-5 h-5" />
                                <span className="font-medium">{link.label}</span>
                            </NavLink>
                        ))}
                    </div>
                </div>

                <div className="mt-auto p-6 border-t border-white/10">
                    <NavLink
                        to="/store"
                        className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-400 hover:bg-white/5 hover:text-slate-200 mb-2"
                    >
                        <Store className="w-5 h-5" />
                        <span className="font-medium">Public Store</span>
                    </NavLink>

                    <button
                        onClick={() => { logout(); navigate('/'); }}
                        className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-400 hover:bg-red-500/10 transition-colors"
                    >
                        <LogOut className="w-5 h-5" />
                        <span className="font-medium">Logout</span>
                    </button>
                </div>
            </aside>
        </>
    );
};
