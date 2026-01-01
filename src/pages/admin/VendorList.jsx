import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useData } from '../../context/DataContext';
import { Search, Mail, ShieldCheck, ChevronRight } from 'lucide-react';

export const VendorList = () => {
    const { vendors, getVendorApps } = useData();
    const [searchTerm, setSearchTerm] = useState('');

    const filteredVendors = vendors.filter(v =>
        v.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        v.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="space-y-8 animate-fade-in max-w-5xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-bold mb-2">Vendor Management</h1>
                    <p className="text-slate-400">View and manage registered vendors.</p>
                </div>
                <div className="relative w-full md:w-72">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                        type="text"
                        placeholder="Search vendors..."
                        className="w-full bg-white/5 border border-white/10 rounded-lg pl-10 pr-4 py-2 text-sm focus:outline-none focus:border-primary/50 transition-colors"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
                <div className="p-6 border-b border-white/10 flex justify-between items-center bg-white/5">
                    <h2 className="text-lg font-bold flex items-center gap-2">
                        <ShieldCheck className="w-5 h-5 text-primary" />
                        Registered Vendors
                    </h2>
                    <span className="text-xs bg-white/10 px-2 py-1 rounded text-slate-300">
                        Total: {filteredVendors.length}
                    </span>
                </div>

                <div className="divide-y divide-white/5">
                    {filteredVendors.map(vendor => (
                        <Link
                            key={vendor.id}
                            to={`/admin/vendors/${vendor.id}`}
                            className="flex items-center gap-4 p-4 hover:bg-white/5 transition-colors group"
                        >
                            <img
                                src={vendor.avatarUrl}
                                alt={vendor.name}
                                className="w-12 h-12 rounded-full border border-white/10 group-hover:border-primary/50 transition-colors"
                            />
                            <div className="flex-1 min-w-0">
                                <h3 className="font-bold text-slate-200 group-hover:text-primary transition-colors text-lg">{vendor.name}</h3>
                                <div className="flex items-center gap-2 text-sm text-slate-400">
                                    <Mail className="w-3 h-3" />
                                    {vendor.email}
                                </div>
                            </div>

                            <div className="hidden sm:flex items-center gap-6 mr-4">
                                <div className="text-right">
                                    <div className="text-xl font-bold text-slate-200">{getVendorApps(vendor.id).length}</div>
                                    <div className="text-xs text-slate-500 uppercase tracking-wider">Apps</div>
                                </div>
                            </div>

                            <ChevronRight className="w-5 h-5 text-slate-600 group-hover:text-white transition-colors" />
                        </Link>
                    ))}

                    {filteredVendors.length === 0 && (
                        <div className="text-center p-12 text-slate-500">
                            No vendors found matching "{searchTerm}".
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
