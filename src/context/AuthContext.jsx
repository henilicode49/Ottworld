import { createContext, useContext, useState, useEffect } from 'react';
import { MOCK_VENDORS } from '../mockData';


const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Check local storage for persisted session
        const storedUser = localStorage.getItem('pwa_user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
        setLoading(false);
    }, []);

    const login = (email, password) => {
        // Mock Auth Logic

        // 1. Admin Login
        if (email === 'admin@pwa.com' && password === 'admin123') {
            const adminUser = {
                id: 'admin1',
                name: 'Super Admin',
                email: email,
                role: 'admin',
                avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Admin'
            };
            setUser(adminUser);
            localStorage.setItem('pwa_user', JSON.stringify(adminUser));
            return { success: true };
        }

        // 2. Vendor Login
        // 2. Vendor Login
        // Check local storage dynamic vendors first (Source of Truth for new signups)
        const storedVendors = JSON.parse(localStorage.getItem('pwa_store_vendors') || '[]');
        const dynamicVendor = storedVendors.find(v => v.email === email && v.password === password);

        if (dynamicVendor) {
            const vendorUser = {
                id: dynamicVendor.id,
                name: dynamicVendor.name,
                email: dynamicVendor.email,
                role: 'vendor',
                avatar: dynamicVendor.avatarUrl
            };
            setUser(vendorUser);
            localStorage.setItem('pwa_user', JSON.stringify(vendorUser));
            return { success: true };
        }

        // Check against Mock Data (Fallbacks if not in local storage yet)
        const foundVendor = MOCK_VENDORS.find(v => v.email === email && v.password === password);

        if (foundVendor) {
            const vendorUser = {
                id: foundVendor.id,
                name: foundVendor.name,
                email: foundVendor.email,
                role: 'vendor',
                avatar: foundVendor.avatarUrl
            };
            setUser(vendorUser);
            localStorage.setItem('appSphere_user', JSON.stringify(vendorUser));
            return { success: true };
        }

        // Legacy/Test Pattern: {vendorname}@app.com / 1234
        if (email.endsWith('@app.com') && password === '1234') {
            const vendorName = email.split('@')[0];
            // Capitalize first letter
            const formattedName = vendorName.charAt(0).toUpperCase() + vendorName.slice(1);

            const vendorUser = {
                id: `v-${Date.now()}`,
                name: formattedName,
                email: email,
                role: 'vendor',
                avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${vendorName}`
            };
            setUser(vendorUser);
            localStorage.setItem('appSphere_user', JSON.stringify(vendorUser));
            return { success: true };
        }

        // 3. Public User (Generic fallback for demo if needed, or specific credeintials)
        // For now, if it's not the above, we fail or allow a "user" login
        if (email.endsWith('@user.com')) {
            const publicUser = {
                id: `u-${Date.now()}`,
                name: 'Public User',
                email: email,
                role: 'user',
                avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=User'
            };
            setUser(publicUser);
            localStorage.setItem('pwa_user', JSON.stringify(publicUser));
            return { success: true };
        }

        return { success: false, message: 'Invalid credentials' };
    };

    const signup = (email, password, name, role = 'user') => {
        // Mock Signup
        const newUser = {
            id: `${role}-${Date.now()}`,
            name: name,
            email: email,
            role: role,
            avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${name}`
        };
        setUser(newUser);
        localStorage.setItem('pwa_user', JSON.stringify(newUser));
        return { success: true, user: newUser };
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('pwa_user');
    };

    return (
        <AuthContext.Provider value={{ user, login, signup, logout, loading }}>
            {!loading && children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
