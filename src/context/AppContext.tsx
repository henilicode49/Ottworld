import React, { createContext, useContext, useState, useEffect } from 'react';
import { App, User, Vendor, mockApps, initialUsers, initialVendors } from '../data/apps';
import { toast } from 'sonner';

interface AppContextType {
    apps: App[];
    users: User[];
    vendors: Vendor[];
    currentUser: User | null;
    currentVendor: Vendor | null;
    loadUser: (role: 'admin' | 'vendor' | 'customer', email?: string) => void;
    login: (email: string, password: string) => Promise<boolean>;
    registerVendor: (name: string, email: string, password: string, companyName: string) => Promise<boolean>;
    logout: () => void;
    updateAppStatus: (appId: string, status: 'pending' | 'approved' | 'rejected' | 'review') => void;
    addApp: (app: Omit<App, 'id' | 'metrics'>) => void;
    getVendorById: (vendorId: string) => Vendor | undefined;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    // Initialize state from localStorage or initial data
    const [apps, setApps] = useState<App[]>(() => {
        const stored = localStorage.getItem('apps');
        return stored ? JSON.parse(stored) : mockApps;
    });

    const [vendors, setVendors] = useState<Vendor[]>(() => {
        const stored = localStorage.getItem('vendors');
        let parsedVendors: Vendor[] = stored ? JSON.parse(stored) : [];

        // Ensure initialVendors are always present (syncing new hardcoded vendors)
        const combinedVendors = [...parsedVendors];
        initialVendors.forEach(initVendor => {
            if (!combinedVendors.find(v => v.id === initVendor.id)) {
                combinedVendors.push(initVendor);
            }
        });

        return combinedVendors.length > 0 ? combinedVendors : initialVendors;
    });

    const [users, setUsers] = useState<User[]>(() => {
        const stored = localStorage.getItem('users');
        let parsedUsers: User[] = stored ? JSON.parse(stored) : [];

        // Ensure initialUsers are always present (syncing new hardcoded users)
        // This fixes the issue where old localStorage data doesn't have the new vendor accounts
        const combinedUsers = [...parsedUsers];
        initialUsers.forEach(initUser => {
            if (!combinedUsers.find(u => u.email === initUser.email)) {
                combinedUsers.push(initUser);
            }
        });

        return combinedUsers.length > 0 ? combinedUsers : initialUsers;
    });

    const [currentUser, setCurrentUser] = useState<User | null>(() => {
        const storedUser = localStorage.getItem('currentUser');
        return storedUser ? JSON.parse(storedUser) : null;
    });

    // Persist data to localStorage whenever it changes
    useEffect(() => {
        localStorage.setItem('apps', JSON.stringify(apps));
    }, [apps]);

    useEffect(() => {
        localStorage.setItem('vendors', JSON.stringify(vendors));
    }, [vendors]);

    useEffect(() => {
        localStorage.setItem('users', JSON.stringify(users));
    }, [users]);

    // Derived state
    const currentVendor = currentUser?.role === 'vendor'
        ? vendors.find(v => v.userId === currentUser.id) || null
        : null;

    const login = async (email: string, password: string): Promise<boolean> => {
        const user = users.find(u => u.email === email && u.password === password);

        if (user) {
            setCurrentUser(user);
            localStorage.setItem('currentUser', JSON.stringify(user));

            // Set legacy keys for compatibility
            localStorage.setItem('loginType', user.role);
            if (user.role === 'admin') localStorage.setItem('adminLoggedIn', 'true');
            if (user.role === 'vendor') {
                localStorage.setItem('vendorLoggedIn', 'true');
                localStorage.setItem('vendorEmail', user.email);
                const vendor = vendors.find(v => v.userId === user.id);
                if (vendor) localStorage.setItem('vendorName', vendor.businessName);
            }
            return true;
        }
        return false;
    };

    const registerVendor = async (name: string, email: string, password: string, companyName: string): Promise<boolean> => {
        // Check if user exists
        if (users.find(u => u.email === email)) {
            return false;
        }

        const userId = `u${Date.now()}`;
        const newUser: User = {
            id: userId,
            name,
            email,
            password,
            role: 'vendor',
            avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${name}`
        };

        const newVendor: Vendor = {
            id: `v${Date.now()}`,
            userId,
            businessName: companyName,
            logo: `https://api.dicebear.com/7.x/shapes/svg?seed=${companyName}`,
            bio: 'New vendor on the platform.',
            subscription: 'standard',
            joinedDate: new Date().toISOString().split('T')[0]
        };

        setUsers(prev => [...prev, newUser]);
        setVendors(prev => [...prev, newVendor]);

        // Auto login
        setCurrentUser(newUser);
        localStorage.setItem('currentUser', JSON.stringify(newUser));
        localStorage.setItem('loginType', 'vendor');
        localStorage.setItem('vendorLoggedIn', 'true');
        localStorage.setItem('vendorEmail', newUser.email);
        localStorage.setItem('vendorName', newVendor.businessName);

        return true;
    };

    const loadUser = (role: 'admin' | 'vendor' | 'customer', email?: string) => {
        // Legacy support
        let user = users.find(u => u.role === role);
        if (email) {
            const specificUser = users.find(u => u.email === email && u.role === role);
            if (specificUser) user = specificUser;
        }

        if (user) {
            setCurrentUser(user);
            localStorage.setItem('currentUser', JSON.stringify(user));
        }
    }

    const logout = () => {
        setCurrentUser(null);
        localStorage.removeItem('currentUser');
        localStorage.removeItem('loginType');
        localStorage.removeItem('adminLoggedIn');
        localStorage.removeItem('vendorLoggedIn');
        localStorage.removeItem('vendorEmail');
        localStorage.removeItem('vendorName');
        // Do not clear apps/vendors/users data
    };

    const updateAppStatus = (appId: string, status: 'pending' | 'approved' | 'rejected' | 'review') => {
        setApps(prev => prev.map(app =>
            app.id === appId ? { ...app, status } : app
        ));
        toast.success(`App status updated to ${status}`);
    };

    const addApp = (newApp: Omit<App, 'id' | 'metrics'>) => {
        const id = (Math.max(...apps.map(a => Number(a.id)), 0) + 1).toString();
        const app: App = {
            ...newApp,
            id,
            metrics: { downloads: 0, revenue: 0, likes: 0, views: 0 }
        };
        setApps(prev => [...prev, app]);
    };

    const getVendorById = (vendorId: string) => {
        return vendors.find(v => v.id === vendorId);
    };

    return (
        <AppContext.Provider value={{
            apps,
            users,
            vendors,
            currentUser,
            currentVendor,
            loadUser,
            login,
            registerVendor,
            logout,
            updateAppStatus,
            addApp,
            getVendorById
        }}>
            {children}
        </AppContext.Provider>
    );
};

export const useApp = () => {
    const context = useContext(AppContext);
    if (!context) {
        throw new Error('useApp must be used within an AppProvider');
    }
    return context;
};
