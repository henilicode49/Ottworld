import React, { useState } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';
import { GlassCard } from '../../components/ui/GlassCard';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { User, Shield, Briefcase, Mail, Lock, ArrowLeft, ArrowRight } from 'lucide-react';

// --- Sub-Components defined outside to prevent re-renders ---

const SelectionView = ({ setMode, quickLogin }) => (
    <div className="grid gap-4 w-full">
        <h2 className="text-xl font-bold text-center mb-6">Choose Login Type</h2>

        <button
            onClick={() => setMode('login-vendor')}
            className="group flex items-center p-4 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 hover:border-purple-500/50 transition-all text-left"
        >
            <div className="p-3 rounded-lg bg-purple-500/20 text-purple-400 mr-4 group-hover:scale-110 transition-transform">
                <Briefcase className="w-6 h-6" />
            </div>
            <div>
                <h3 className="font-bold text-slate-200">Vendor Portal</h3>
                <p className="text-sm text-slate-500">Manage your apps</p>
            </div>
            <ArrowRight className="w-5 h-5 ml-auto text-slate-600 group-hover:text-purple-400 transition-colors" />
        </button>

        <button
            onClick={() => setMode('login-admin')}
            className="group flex items-center p-4 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 hover:border-red-500/50 transition-all text-left"
        >
            <div className="p-3 rounded-lg bg-red-500/20 text-red-400 mr-4 group-hover:scale-110 transition-transform">
                <Shield className="w-6 h-6" />
            </div>
            <div>
                <h3 className="font-bold text-slate-200">Admin Console</h3>
                <p className="text-sm text-slate-500">System administration</p>
            </div>
            <ArrowRight className="w-5 h-5 ml-auto text-slate-600 group-hover:text-red-400 transition-colors" />
        </button>

        <button
            onClick={quickLogin}
            className="group flex items-center p-4 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 hover:border-blue-500/50 transition-all text-left mt-4"
        >
            <div className="p-3 rounded-lg bg-blue-500/20 text-blue-400 mr-4 group-hover:scale-110 transition-transform">
                <User className="w-6 h-6" />
            </div>
            <div>
                <h3 className="font-bold text-slate-200">Public User</h3>
                <p className="text-sm text-slate-500">Just browsing?</p>
            </div>
        </button>
    </div>
);

const LoginForm = ({ title, subTitle, type, formData, handleChange, handleSubmit, error, setMode }) => (
    <form onSubmit={handleSubmit} className="w-full space-y-4">
        <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-white mb-1">{title}</h2>
            <p className="text-slate-400 text-sm">{subTitle}</p>
        </div>

        <div className="space-y-4">
            <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                <Input
                    name="email"
                    type="email"
                    placeholder="Email Address"
                    className="pl-10 h-10"
                    value={formData.email}
                    onChange={handleChange}
                    autoFocus
                    required
                />
            </div>
            <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                <Input
                    name="password"
                    type="password"
                    placeholder="Password"
                    className="pl-10 h-10"
                    value={formData.password}
                    onChange={handleChange}
                    required
                />
            </div>
        </div>

        {error && (
            <div className="p-3 rounded bg-red-500/10 border border-red-500/20 text-red-400 text-xs text-center">
                {error}
            </div>
        )}

        <Button className={`w-full ${type === 'admin' ? 'bg-red-600 hover:bg-red-700' : 'bg-purple-600 hover:bg-purple-700'}`}>
            Sign In
        </Button>

        {type === 'vendor' && (
            <div className="text-center text-xs text-slate-500 mt-4">
                New Vendor? <button type="button" onClick={() => setMode('signup-vendor')} className="text-purple-400 hover:underline">Register here</button>
            </div>
        )}

        {type === 'admin' && (
            <div className="bg-slate-900/50 p-3 rounded text-[10px] text-slate-500 font-mono mt-4 border border-white/5">
                Try: admin@pwa.com / admin123
            </div>
        )}

        {type === 'vendor' && (
            <div className="bg-slate-900/50 p-3 rounded text-[10px] text-slate-500 font-mono mt-4 border border-white/5">
                Try: contact@stellarsoft.com / 1234
            </div>
        )}
    </form>
);

const SignupForm = ({ formData, handleChange, handleSubmit, error, setMode }) => (
    <form onSubmit={handleSubmit} className="w-full space-y-4">
        <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-white mb-1">Vendor Registration</h2>
            <p className="text-slate-400 text-sm">Join our marketplace</p>
        </div>

        <div className="space-y-4">
            <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                <Input
                    name="name"
                    placeholder="Vendor / Company Name"
                    className="pl-10 h-10"
                    value={formData.name}
                    onChange={handleChange}
                    required
                />
            </div>
            <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                <Input
                    name="email"
                    type="email"
                    placeholder="Work Email"
                    className="pl-10 h-10"
                    value={formData.email}
                    onChange={handleChange}
                    required
                />
            </div>
            <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                <Input
                    name="password"
                    type="password"
                    placeholder="Choose Password"
                    className="pl-10 h-10"
                    value={formData.password}
                    onChange={handleChange}
                    required
                />
            </div>
        </div>

        {error && (
            <div className="p-3 rounded bg-red-500/10 border border-red-500/20 text-red-400 text-xs text-center">
                {error}
            </div>
        )}

        <Button className="w-full bg-purple-600 hover:bg-purple-700">
            Create Account
        </Button>

        <div className="text-center text-xs text-slate-500 mt-4">
            Already have an account? <button type="button" onClick={() => setMode('login-vendor')} className="text-purple-400 hover:underline">Sign In</button>
        </div>
    </form>
);

export const AuthPage = () => {
    const { user, login, signup } = useAuth();
    const { addVendor } = useData();
    const navigate = useNavigate();

    // 'selection' | 'login-admin' | 'login-vendor' | 'signup-vendor'
    const [mode, setMode] = useState('selection');

    // Form State
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        name: ''
    });
    const [error, setError] = useState('');

    // Redirect if already logged in
    if (user) {
        if (user.role === 'admin') return <Navigate to="/admin" replace />;
        if (user.role === 'vendor') return <Navigate to="/vendor" replace />;
        return <Navigate to="/store" replace />;
    }

    const handleChange = (e) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
        setError('');
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setError('');

        if (mode === 'login-admin' || mode === 'login-vendor') {
            const result = login(formData.email, formData.password);
            if (!result.success) {
                setError(result.message);
            }
        } else if (mode === 'signup-vendor') {
            const result = signup(formData.email, formData.password, formData.name, 'vendor');
            if (!result.success) {
                setError(result.message);
            } else {
                // Also add to global data context so Admin sees it
                addVendor({
                    id: result.user.id,
                    name: result.user.name,
                    email: result.user.email,
                    password: formData.password, // Required for subsequent logins
                    avatarUrl: result.user.avatar,
                    role: 'vendor'
                });
            }
        }
    };

    const handleBack = () => {
        setMode('selection');
        setError('');
        setFormData({ email: '', password: '', name: '' });
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-4 relative">
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[120px] opacity-50" />
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-[120px] opacity-50" />
            </div>

            <GlassCard className="max-w-md w-full relative z-10 py-8 px-6 min-h-[500px] flex flex-col items-center justify-center">
                {mode !== 'selection' && (
                    <button
                        onClick={handleBack}
                        className="absolute top-6 left-6 text-slate-400 hover:text-white transition-colors"
                    >
                        <ArrowLeft className="w-5 h-5" />
                    </button>
                )}

                <div className="mb-8">
                    <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400 tracking-tight">
                        PWAS
                    </h1>
                </div>

                {mode === 'selection' && (
                    <SelectionView
                        setMode={setMode}
                        quickLogin={() => login('user@user.com', 'password')}
                    />
                )}

                {mode === 'login-admin' && (
                    <LoginForm
                        title="Admin Login"
                        subTitle="Secure Area Access"
                        type="admin"
                        formData={formData}
                        handleChange={handleChange}
                        handleSubmit={handleSubmit}
                        error={error}
                        setMode={setMode}
                    />
                )}

                {mode === 'login-vendor' && (
                    <LoginForm
                        title="Vendor Portal"
                        subTitle="Manage your applications"
                        type="vendor"
                        formData={formData}
                        handleChange={handleChange}
                        handleSubmit={handleSubmit}
                        error={error}
                        setMode={setMode}
                    />
                )}

                {mode === 'signup-vendor' && (
                    <SignupForm
                        formData={formData}
                        handleChange={handleChange}
                        handleSubmit={handleSubmit}
                        error={error}
                        setMode={setMode}
                    />
                )}

            </GlassCard>

            <div className="absolute bottom-4 text-slate-500 text-xs text-center w-full">
                &copy; 2024 PWAS Inc.
                <button
                    onClick={() => {
                        if (confirm('Reset all demo data? This will clear all changes.')) {
                            localStorage.clear();
                            window.location.reload();
                        }
                    }}
                    className="ml-4 hover:text-red-400 underline decoration-dotted"
                >
                    Reset Data
                </button>
            </div>
        </div>
    );
};
