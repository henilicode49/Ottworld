import { createContext, useContext, useState, useEffect } from 'react';
import { MOCK_APPS, MOCK_VENDORS, MOCK_STORIES } from '../mockData';

const DataContext = createContext();

export const DataProvider = ({ children }) => {
    const [apps, setApps] = useState(() => {
        const saved = localStorage.getItem('pwa_store_apps');
        return saved ? JSON.parse(saved) : MOCK_APPS;
    });
    const [vendors, setVendors] = useState(() => {
        const saved = localStorage.getItem('pwa_store_vendors');
        return saved ? JSON.parse(saved) : MOCK_VENDORS;
    });
    const [stories, setStories] = useState(() => {
        const saved = localStorage.getItem('pwa_store_stories');
        return saved ? JSON.parse(saved) : MOCK_STORIES;
    });

    // Persistence: Save to local storage whenever data changes
    useEffect(() => {
        localStorage.setItem('pwa_store_apps', JSON.stringify(apps));
        localStorage.setItem('pwa_store_vendors', JSON.stringify(vendors));
        localStorage.setItem('pwa_store_stories', JSON.stringify(stories));
    }, [apps, vendors, stories]);

    // Actions
    const addVendor = (newVendor) => {
        // Avoid adding duplicate IDs if already exists
        if (!vendors.find(v => v.id === newVendor.id)) {
            setVendors([...vendors, { ...newVendor, apps: [] }]);
        }
    };

    const addApp = (newApp) => {
        setApps([...apps, {
            ...newApp,
            id: Date.now().toString(),
            createdAt: new Date().toISOString(),
            status: 'pending'
        }]);
    };

    const updateAppStatus = (appId, status) => {
        setApps(apps.map(app => app.id === appId ? { ...app, status } : app));
    };

    const updateApp = (updatedApp) => {
        setApps(apps.map(app => app.id === updatedApp.id ? updatedApp : app));
    };

    const deleteApp = (appId) => {
        setApps(apps.filter(app => app.id !== appId));
    };

    const incrementDownloads = (appId) => {
        setApps(apps.map(app => {
            if (app.id !== appId) return app;

            // Helper to parse "1.2M", "850k", or "100" to number
            const parseCount = (str) => {
                if (!str) return 0;
                const s = str.toString().toUpperCase();
                if (s.endsWith('M')) return parseFloat(s) * 1000000;
                if (s.endsWith('K')) return parseFloat(s) * 1000;
                return parseInt(s.replace(/,/g, '')) || 0;
            };

            // Helper to format back to string
            const formatCount = (num) => {
                if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
                if (num >= 1000) return (num / 1000).toFixed(1) + 'k';
                return num.toString();
            };

            const currentDownloads = parseCount(app.downloads);
            const currentActive = parseCount(app.activeUsers);

            return {
                ...app,
                downloads: formatCount(currentDownloads + 1),
                activeUsers: formatCount(currentActive + 1) // Simply incrementing active users too for demo
            };
        }));
    };

    const getVendorApps = (vendorId) => {
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
            addApp,
            addVendor,
            updateAppStatus,
            updateApp,
            deleteApp,
            getVendorApps,
            getPublicApps,
            getPublicApps,
            getPendingApps,
            incrementDownloads
        }}>
            {children}
        </DataContext.Provider>
    );
};

export const useData = () => useContext(DataContext);
