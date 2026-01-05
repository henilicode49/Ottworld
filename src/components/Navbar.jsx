import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Button } from './ui/button';
import { Search, ShoppingBag, User, LogOut } from 'lucide-react';

export const Navbar = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    return (
        <nav className="sticky top-0 z-50 glass-panel border-b border-white/10 w-full px-6 py-4">
            <div className="max-w-7xl mx-auto flex items-center justify-between">
                <Link to="/" className="flex items-center gap-2 group">
                    <img src="/logo.png" alt="PWAS Logo" className="h-12 w-auto object-contain group-hover:scale-105 transition-transform" />
                </Link>

                <div className="flex items-center gap-6">
                    <Link to="/store" className="text-sm font-medium text-slate-300 hover:text-white transition-colors">
                        Store
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
                                    <span className="text-sm text-slate-400 hidden sm:block">{user.name}</span>
                                    <img src={user.avatar || 'https://github.com/shadcn.png'} className="w-8 h-8 rounded-full border border-white/10" alt="Avatar" />
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
                            <Button>Login</Button>
                        </Link>
                    )}
                </div>
            </div>
        </nav>
    );
};
