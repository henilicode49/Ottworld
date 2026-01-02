import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import { GlassCard } from '../../components/ui/GlassCard';
import { Badge } from '../../components/ui/Badge';
import { Input } from '../../components/ui/Input';
import { Search, ArrowUpDown } from 'lucide-react';
import { useSearchParams, Link } from 'react-router-dom';

export const AllApps = () => {
    const { apps } = useData();
    const [searchParams] = useSearchParams();
    const [search, setSearch] = useState('');
    const [sortConfig, setSortConfig] = useState({ key: 'createdAt', direction: 'desc' });

    const statusFilter = searchParams.get('status');

    const parseMetric = (val) => {
        if (!val) return 0;
        const str = val.toString().toLowerCase();
        if (str.includes('m')) return parseFloat(str) * 1000000;
        if (str.includes('k')) return parseFloat(str) * 1000;
        return parseFloat(str) || 0;
    };

    const handleSort = (key) => {
        setSortConfig(current => ({
            key,
            direction: current.key === key && current.direction === 'asc' ? 'desc' : 'asc'
        }));
    };

    const filteredApps = apps
        .filter(app => {
            const matchesSearch = app.name.toLowerCase().includes(search.toLowerCase()) ||
                app.vendorName.toLowerCase().includes(search.toLowerCase());
            const matchesStatus = statusFilter ? app.status === statusFilter : true;
            return matchesSearch && matchesStatus;
        })
        .sort((a, b) => {
            const { key, direction } = sortConfig;
            let valA = a[key];
            let valB = b[key];

            if (key === 'downloads' || key === 'activeUsers') {
                valA = parseMetric(valA);
                valB = parseMetric(valB);
            } else if (key === 'createdAt') {
                valA = new Date(valA).getTime();
                valB = new Date(valB).getTime();
            }

            if (valA < valB) return direction === 'asc' ? -1 : 1;
            if (valA > valB) return direction === 'asc' ? 1 : -1;
            return 0;
        });

    const SortIcon = ({ column }) => (
        <ArrowUpDown
            className={`w-4 h-4 inline-block ml-1 transition-opacity ${sortConfig.key === column ? 'opacity-100 text-primary' : 'opacity-30'}`}
        />
    );

    return (
        <div>
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                <h1 className="text-2xl font-bold flex items-center gap-2">
                    {statusFilter ? (
                        <>
                            <span className="capitalize">{statusFilter}</span> Apps
                            <Link to="/admin/apps" className="text-sm font-normal text-slate-400 bg-white/5 px-2 py-1 rounded hover:bg-white/10 ml-2">Clear Filter</Link>
                        </>
                    ) : 'All Applications'}
                </h1>
                <div className="relative w-full md:w-64">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                    <Input
                        placeholder="Search..."
                        className="pl-10 h-10"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>
            </div>

            {/* Mobile List View */}
            <div className="space-y-4 md:hidden">
                {filteredApps.map(app => (
                    <GlassCard key={app.id} className="p-4">
                        <div className="flex items-start justify-between mb-3">
                            <div className="flex items-center gap-3">
                                <img src={app.iconUrl} alt="" className="w-12 h-12 rounded bg-slate-800" />
                                <div>
                                    <div className="font-bold text-slate-200">{app.name}</div>
                                    <div className="text-xs text-slate-400">{app.vendorName}</div>
                                </div>
                            </div>
                            <Badge status={app.status} />
                        </div>
                        <div className="grid grid-cols-2 gap-4 py-3 border-t border-b border-white/5 mb-3">
                            <div>
                                <div className="text-[10px] uppercase text-slate-500 font-bold">Downloads</div>
                                <div className="text-sm font-mono text-slate-300">{app.downloads || '-'}</div>
                            </div>
                            <div>
                                <div className="text-[10px] uppercase text-slate-500 font-bold">Active Users</div>
                                <div className="text-sm font-mono text-slate-300">{app.activeUsers || '-'}</div>
                            </div>
                        </div>
                        <div className="flex items-center justify-between mt-2">
                            <div className="text-xs text-slate-500">{new Date(app.createdAt).toLocaleDateString()}</div>
                            <Link to={`/admin/apps/${app.id}`} className="text-primary hover:underline text-sm font-medium">View Details</Link>
                        </div>
                    </GlassCard>
                ))}
                {filteredApps.length === 0 && (
                    <div className="p-8 text-center text-slate-500 glass-panel rounded-xl">
                        No apps found.
                    </div>
                )}
            </div>

            {/* Desktop Table View */}
            <GlassCard className="hidden md:block p-0 overflow-hidden">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-white/5 border-b border-white/10 text-slate-400 text-sm">
                            <th className="p-4 cursor-pointer hover:text-white" onClick={() => handleSort('name')}>
                                App <SortIcon column="name" />
                            </th>
                            <th className="p-4">Vendor</th>
                            <th className="p-4">Status</th>
                            <th className="p-4 cursor-pointer hover:text-white" onClick={() => handleSort('downloads')}>
                                Downloads <SortIcon column="downloads" />
                            </th>
                            <th className="p-4 cursor-pointer hover:text-white" onClick={() => handleSort('activeUsers')}>
                                Active Users <SortIcon column="activeUsers" />
                            </th>
                            <th className="p-4 cursor-pointer hover:text-white" onClick={() => handleSort('createdAt')}>
                                Date <SortIcon column="createdAt" />
                            </th>
                            <th className="p-4">View</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-white/10">
                        {filteredApps.map(app => (
                            <tr key={app.id} className="hover:bg-white/5 transition-colors">
                                <td className="p-4 font-medium text-slate-200">
                                    <div className="flex items-center gap-3">
                                        <img src={app.iconUrl} alt="" className="w-8 h-8 rounded bg-slate-800" />
                                        {app.name}
                                    </div>
                                </td>
                                <td className="p-4 text-slate-400">{app.vendorName}</td>
                                <td className="p-4"><Badge status={app.status} /></td>
                                <td className="p-4 text-slate-300 font-mono text-xs">{app.downloads || '-'}</td>
                                <td className="p-4 text-slate-300 font-mono text-xs">{app.activeUsers || '-'}</td>
                                <td className="p-4 text-slate-500 text-sm">{new Date(app.createdAt).toLocaleDateString()}</td>
                                <td className="p-4">
                                    <Link to={`/admin/apps/${app.id}`} className="text-primary hover:underline text-sm">View</Link>
                                </td>
                            </tr>
                        ))}
                        {filteredApps.length === 0 && (
                            <tr>
                                <td colSpan="7" className="p-8 text-center text-slate-500">
                                    No apps found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </GlassCard>
        </div>
    );
};
