import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { MOCK_APPS, MOCK_VENDORS, MOCK_STORIES } from '../mockData';

// --- Interfaces ---

export interface Review {
    id: number | string;
    user: string;
    rating: number;
    comment: string;
    date: string;
}

export interface VersionHistoryItem {
    version: string;
    date: string;
    notes: string;
}

export interface App {
    id: string;
    name: string;
    slug: string;
    shortDescription: string;
    fullDescription: string;
    category: string;
    iconUrl: string;
    screenshots: string[];
    apkUrl: string;
    version: string;
    size: string;
    supportedPlatforms: string[];
    tags: string[];
    vendorId: string;
    vendorName: string;
    status: 'pending' | 'approved' | 'rejected' | 'review';
    createdAt: string;
    rating: number;
    activeUsers: string; // e.g. "850k"
    downloads: string;   // e.g. "1.2M"
    reviews: Review[];
    versionHistory?: VersionHistoryItem[];
    price: number | 'free';
    isMature: boolean;
    updateChanges?: string; // Description of what changed in this update
    lastUpdatedDate?: string; // Date when the app was last updated by vendor
    downloadHistory?: { date: string; count: number }[]; // Track downloads by date
}

export interface Vendor {
    id: string;
    name: string;
    email: string;
    password?: string;
    avatarUrl: string;
    apps: string[]; // List of App IDs
}

export interface Story {
    id: string;
    title: string;
    subtitle: string;
    description: string;
    imageUrl: string;
    appId: string;
    type: 'featured' | 'collection' | 'game_of_day'; // extended as per usage
}

interface DataContextType {
    apps: App[];
    vendors: Vendor[];
    stories: Story[];
    isLoading: boolean;
    error: string | null;
    addApp: (newApp: Partial<App>) => void;
    addVendor: (newVendor: Vendor) => void;
    updateAppStatus: (appId: string, status: App['status']) => void;
    updateApp: (updatedApp: App) => void;
    deleteApp: (appId: string) => void;
    getVendorApps: (vendorId: string) => App[];
    getPublicApps: () => App[];
    getPendingApps: () => App[];
    incrementDownloads: (appId: string) => void;
}

// --- Context ---

const DataContext = createContext<DataContextType | undefined>(undefined);

// --- Provider ---

export const DataProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [apps, setApps] = useState<App[]>([]);
    const [vendors, setVendors] = useState<Vendor[]>([]);
    const [stories, setStories] = useState<Story[]>([]);

    // New States
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Initial Data Load
    useEffect(() => {
        const loadData = () => {
            try {
                // Simulate loading delay
                // In a real app, this would be an async fetch
                const savedApps = localStorage.getItem('pwa_store_apps');
                const savedVendors = localStorage.getItem('pwa_store_vendors');
                const savedStories = localStorage.getItem('pwa_store_stories');

                // Fallback to MOCK data if local storage is empty, casting roughly to our types
                setApps(savedApps ? JSON.parse(savedApps) : (MOCK_APPS as unknown as App[]));
                setVendors(savedVendors ? JSON.parse(savedVendors) : (MOCK_VENDORS as unknown as Vendor[]));
                setStories(savedStories ? JSON.parse(savedStories) : (MOCK_STORIES as unknown as Story[]));

                setIsLoading(false);
            } catch (err) {
                console.error("Failed to load data:", err);
                setError("Failed to load application data.");
                setIsLoading(false);
            }
        };

        loadData();
    }, []);

    // Persistence: Save to local storage whenever data changes
    // Only save if we are NOT loading, to avoid overwriting with empty state during init
    useEffect(() => {
        if (!isLoading) {
            localStorage.setItem('pwa_store_apps', JSON.stringify(apps));
            localStorage.setItem('pwa_store_vendors', JSON.stringify(vendors));
            localStorage.setItem('pwa_store_stories', JSON.stringify(stories));
        }
    }, [apps, vendors, stories, isLoading]);

    // Actions
    const addVendor = (newVendor: Vendor) => {
        // Avoid adding duplicate IDs if already exists
        if (!vendors.find(v => v.id === newVendor.id)) {
            setVendors(prev => [...prev, { ...newVendor, apps: [] }]);
        }
    };

    const addApp = (newApp: Partial<App>) => {
        const app: App = {
            ...newApp,
            id: Date.now().toString(), // ensuring ID is string
            createdAt: new Date().toISOString(),
            status: 'pending',
            // Default fields to ensure type safety
            name: newApp.name || 'Untitled App',
            slug: newApp.slug || '',
            shortDescription: newApp.shortDescription || '',
            fullDescription: newApp.fullDescription || '',
            category: newApp.category || 'Utilities',
            iconUrl: newApp.iconUrl || '',
            screenshots: newApp.screenshots || [],
            apkUrl: newApp.apkUrl || '#',
            version: newApp.version || '1.0.0',
            size: newApp.size || '0 MB',
            supportedPlatforms: newApp.supportedPlatforms || ['Web'],
            tags: newApp.tags || [],
            vendorId: newApp.vendorId || '',
            vendorName: newApp.vendorName || '',
            rating: 0,
            activeUsers: '0',
            downloads: '0',
            reviews: [],
            versionHistory: [],
            price: newApp.price !== undefined ? newApp.price : 'free',
            isMature: newApp.isMature || false
        };
        setApps(prev => [...prev, app]);
    };

    const updateAppStatus = (appId: string, status: App['status']) => {
        setApps(prev => prev.map(app => app.id === appId ? { ...app, status } : app));
    };

    const updateApp = (id: string, updatedData: Partial<App>) => {
        setApps(prev => prev.map(app =>
            app.id === id
                ? { ...app, ...updatedData, status: 'review', lastUpdatedDate: new Date().toISOString(), downloads: app.downloads, rating: app.rating, reviews: app.reviews, activeUsers: app.activeUsers } // Always set to review when vendor updates, preserve metrics
                : app
        ));
    };

    const deleteApp = (appId: string) => {
        setApps(prev => prev.filter(app => app.id !== appId));
    };

    const incrementDownloads = (appId: string) => {
        setApps(prev => prev.map(app => {
            if (app.id !== appId) return app;

            // Helper to parse "1.2M", "850k", or "100" to number
            const parseCount = (str: string | undefined): number => {
                if (!str) return 0;
                const s = str.toString().toUpperCase();
                if (s.endsWith('M')) return parseFloat(s) * 1000000;
                if (s.endsWith('K')) return parseFloat(s) * 1000;
                // Remove commas and parse
                const val = parseInt(s.replace(/,/g, ''), 10);
                return isNaN(val) ? 0 : val;
            };

            // Helper to format back to string
            const formatCount = (num: number): string => {
                if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
                if (num >= 1000) return (num / 1000).toFixed(1) + 'k';
                return num.toString();
            };

            const currentDownloads = parseCount(app.downloads);
            const currentActive = parseCount(app.activeUsers);

            // Get today's date in YYYY-MM-DD format
            const today = new Date().toISOString().split('T')[0];

            // Initialize downloadHistory if it doesn't exist
            const history = app.downloadHistory || [];

            // Find today's entry
            const todayIndex = history.findIndex(h => h.date === today);

            let updatedHistory;
            if (todayIndex >= 0) {
                // Update existing entry
                updatedHistory = [...history];
                updatedHistory[todayIndex] = {
                    date: today,
                    count: history[todayIndex].count + 1
                };
            } else {
                // Add new entry for today
                updatedHistory = [...history, { date: today, count: 1 }];
            }

            return {
                ...app,
                downloads: formatCount(currentDownloads + 1),
                activeUsers: formatCount(currentActive + 1), // Simply incrementing active users too for demo
                downloadHistory: updatedHistory
            };
        }));
    };

    const getVendorApps = (vendorId: string) => {
        return apps.filter(app => app.vendorId === vendorId);
    };

    const getPublicApps = () => {
        return apps.filter(app => app.status === 'approved');
    };

    const getPendingApps = () => {
        return apps.filter(app => app.status === 'pending');
    };

    return (
        <DataContext.Provider value={{
            apps,
            vendors,
            stories,
            isLoading,
            error,
            addApp,
            addVendor,
            updateAppStatus,
            updateApp,
            deleteApp,
            getVendorApps,
            getPublicApps,
            getPendingApps,
            incrementDownloads
        }}>
            {children}
        </DataContext.Provider>
    );
};

export const useData = () => {
    const context = useContext(DataContext);
    if (context === undefined) {
        throw new Error('useData must be used within a DataProvider');
    }
    return context;
};
