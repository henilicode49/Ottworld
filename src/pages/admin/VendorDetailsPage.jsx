import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useData } from '../../context/DataContext';
import { GlassCard } from '../../components/ui/GlassCard';
import { Button } from '../../components/ui/Button';
import { Mail, Box, ShieldCheck, ChevronLeft } from 'lucide-react';
import { AppCard } from '../../components/AppCard';

export const VendorDetailsPage = () => {
    const { id } = useParams();
    const { vendors, getVendorApps } = useData();
    const vendor = vendors.find(v => v.id === id);

    if (!vendor) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[50vh] animate-fade-in">
                <ShieldCheck className="w-16 h-16 text-slate-600 mb-4" />
                <h2 className="text-2xl font-bold mb-2">Vendor not found</h2>
                <Link to="/admin/vendors">
                    <Button variant="secondary">Back to Vendors</Button>
                </Link>
            </div>
        );
    }

    const vendorApps = getVendorApps(vendor.id);

    return (
        <div className="animate-fade-in max-w-5xl mx-auto py-8">
            <Link to="/admin/vendors" className="inline-flex items-center text-slate-400 hover:text-white mb-6 transition-colors">
                <ChevronLeft className="w-4 h-4 mr-1" /> Back to Vendors
            </Link>

            <GlassCard className="mb-8 p-8">
                <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
                    <img
                        src={vendor.avatarUrl}
                        alt={vendor.name}
                        className="w-32 h-32 rounded-full border-4 border-primary/20 shadow-xl"
                    />
                    <div className="flex-1 text-center md:text-left">
                        <h1 className="text-4xl font-bold mb-2">{vendor.name}</h1>
                        <div className="flex flex-col md:flex-row items-center gap-4 text-slate-400 mb-6">
                            <span className="flex items-center gap-2">
                                <Mail className="w-4 h-4" /> {vendor.email}
                            </span>
                            <span className="hidden md:inline">•</span>
                            <span className="font-mono bg-white/5 px-2 py-0.5 rounded text-xs">ID: {vendor.id}</span>
                        </div>

                        <div className="flex gap-3 justify-center md:justify-start">
                            <div className="px-4 py-2 rounded-lg bg-primary/10 border border-primary/20 text-primary font-bold">
                                Verified Vendor
                            </div>
                            <div className="px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-slate-200 font-bold">
                                {vendorApps.length} Apps Submitted
                            </div>
                        </div>
                    </div>
                </div>
            </GlassCard>

            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <Box className="w-6 h-6 text-primary" />
                Submitted Applications
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {vendorApps.length > 0 ? (
                    vendorApps.map(app => (
                        <div key={app.id}>
                            <AppCard app={app} />
                            <div className="mt-2 text-center">
                                <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold uppercase ${app.status === 'approved' ? 'bg-green-500/20 text-green-400' :
                                        app.status === 'rejected' ? 'bg-red-500/20 text-red-400' :
                                            'bg-yellow-500/20 text-yellow-400'
                                    }`}>
                                    {app.status}
                                </span>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="col-span-full p-12 text-center text-slate-500 bg-white/5 rounded-2xl border border-white/5 border-dashed">
                        No apps submitted yet.
                    </div>
                )}
            </div>
        </div>
    );
};
