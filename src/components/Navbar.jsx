import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Button } from './ui/button';
import { Search, ShoppingBag, User, LogOut } from 'lucide-react';
import { cn } from '../lib/utils';
import { motion, AnimatePresence } from 'framer-motion';

export const Navbar = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <motion.nav
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ type: 'spring', stiffness: 100, damping: 20 }}
            className={cn(
                "sticky top-0 z-50 w-full px-6 py-4 transition-all duration-300",
                scrolled
                    ? "bg-slate-900/80 backdrop-blur-xl border-b border-white/10 shadow-lg py-3"
                    : "bg-transparent border-b border-transparent"
            )}
        >
            <div className="max-w-7xl mx-auto flex items-center justify-between">
                <Link to="/" className="flex items-center gap-2 group">
                    <img src="/logo.png" alt="PWAS Logo" className="h-12 w-auto object-contain group-hover:scale-105 transition-transform" />
                </Link>

                <div className="flex items-center gap-6">
                    <Link to="/store" className="text-sm font-medium text-slate-300 hover:text-white transition-colors relative group">
                        Store
                        <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full" />
                    </Link>

                    {user ? (
                        <div className="flex items-center gap-4">
                            <div className="flex items-center gap-3 pl-4 border-l border-white/10">
                                {user.role === 'vendor' && (
                                    <Link to="/vendor">
                                        <Button variant="ghost" className="text-sm">Dashboard</Button>
                                    </Link>
                                )}
                                {user.role === 'admin' && (
                                    <Link to="/admin">
                                        <Button variant="ghost" className="text-sm">Admin Panel</Button>
                                    </Link>
                                )}

                                <div className="flex items-center gap-2">
                                    <span className="text-sm text-slate-400 hidden sm:block font-medium">{user.name}</span>
                                    <img src={user.avatar || 'https://github.com/shadcn.png'} className="w-8 h-8 rounded-full border border-white/10 ring-2 ring-transparent group-hover:ring-primary/50 transition-all" alt="Avatar" />
                                </div>

                                <button
                                    onClick={() => { logout(); navigate('/'); }}
                                    className="p-2 hover:bg-white/5 rounded-full text-slate-400 hover:text-red-400 transition-colors"
                                >
                                    <LogOut className="w-5 h-5" />
                                </button>
                            </div>
                        </div>
                    ) : (
                        <Link to="/auth">
                            <Button className="rounded-full px-6 shadow-md shadow-primary/20 hover:shadow-primary/40 transition-shadow">Login</Button>
                        </Link>
                    )}
                </div>
            </div>
        </motion.nav>
    );
};
