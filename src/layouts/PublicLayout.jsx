import React from 'react';
import { Outlet } from 'react-router-dom';
import { Navbar } from '../components/Navbar';

export const PublicLayout = () => {
    return (
        <div className="min-h-screen flex flex-col">
            <Navbar />
            <main className="flex-1">
                <Outlet />
            </main>
            <footer className="glass-panel border-t border-white/5 py-8 mt-12">
                <div className="max-w-7xl mx-auto px-6 text-center text-slate-500 text-sm">
                    &copy; {new Date().getFullYear()} PWAS Store. All mock rights reserved.
                    <button
                        onClick={() => {
                            if (confirm('Reset all demo data? This will log you out and clear changes.')) {
                                localStorage.clear();
                                window.location.href = '/';
                            }
                        }}
                        className="ml-4 hover:text-red-400 underline decoration-dotted"
                    >
                        Reset Data
                    </button>
                </div>
            </footer>
        </div>
    );
};
