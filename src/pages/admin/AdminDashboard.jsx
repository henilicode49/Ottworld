import React from 'react';
import { Link } from 'react-router-dom';
import { useData } from '../../context/DataContext';
import { GlassCard } from '../../components/ui/GlassCard';
import { ShieldAlert, CheckCircle, XCircle, Grid, Users, Download, Box, TrendingUp, ArrowUpRight, ArrowRight } from 'lucide-react';
import { AnalyticsChart } from '../../components/ui/AnalyticsChart';

export const AdminDashboard = () => {
    const { apps, vendors } = useData();

    // --- Metrics Calculations ---
    const pendingCount = apps.filter(a => a.status === 'pending').length;
    const approvedCount = apps.filter(a => a.status === 'approved').length;
    const rejectedCount = apps.filter(a => a.status === 'rejected').length;

    // Simulate Total Downloads Calculation
    const totalDownloads = apps.reduce((acc, app) => {
        let count = 0;
        if (!app.downloads) return acc;

        const val = app.downloads.toLowerCase();
        if (val.includes('m')) {
            count = parseFloat(val) * 1000000;
        } else if (val.includes('k')) {
            count = parseFloat(val) * 1000;
        } else {
            count = parseFloat(val) || 0;
        }
        return acc + count;
    }, 0);

    const formatNumber = (num) => {
        return new Intl.NumberFormat('en-US', { notation: "compact", maximumFractionDigits: 1 }).format(num);
    };

    // --- Chart Data (Mocked) ---
    const downloadTrendData = [4000, 3000, 2000, 2800, 1800, 2400, 3500];
    const maxDownload = Math.max(...downloadTrendData);
    const downloadBars = downloadTrendData.map(val => (val / maxDownload) * 100);

    const userGrowthData = [1000, 1500, 2200, 3500, 5000, 7000, 10000];
    const maxUsers = 10000;
    const points = userGrowthData.map((val, i) => {
        const x = (i / (userGrowthData.length - 1)) * 100;
        const y = 100 - ((val / maxUsers) * 100);
        return `${x},${y}`;
    }).join(' ');


    return (
        <div className="animate-fade-in space-y-6">
            <div className="flex justify-between items-end mb-4">
                <div>
                    <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">
                        Admin Overview
                    </h1>
                    <p className="text-slate-400 text-sm">Welcome back, Administrator.</p>
                </div>
                <div className="text-xs font-mono text-slate-500 bg-white/5 px-2 py-1 rounded">
                    SYS.V.3.0
                </div>
            </div>

            {/* --- Bento Grid Layout --- */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6">

                {/* Hero Metric: Downloads (Span 8) */}
                <div className="md:col-span-8">
                    <GlassCard className="h-full relative overflow-hidden bg-gradient-to-br from-blue-600/20 to-indigo-900/40 border-blue-500/20 p-0">
                        <div className="absolute right-0 top-0 w-64 h-64 bg-blue-500/20 blur-[100px] rounded-full -mr-16 -mt-16 pointer-events-none" />

                        <div className="grid grid-cols-1 lg:grid-cols-2 h-full">
                            {/* Left: Stats & Chart */}
                            <div className="p-6 flex flex-col justify-between relative z-10">
                                <div>
                                    <h2 className="text-lg font-medium text-blue-100/80 mb-1 flex items-center gap-2">
                                        <Download className="w-5 h-5" /> Total Downloads
                                    </h2>
                                    <div className="text-5xl font-bold text-white tracking-tight mb-2">{formatNumber(totalDownloads)}</div>
                                    <div className="inline-flex px-3 py-1 bg-white/10 rounded-full text-xs font-bold text-white backdrop-blur-md border border-white/10 mb-8">
                                        +8.5% This Week
                                    </div>
                                </div>

                                <div className="h-32 flex items-end gap-2 opacity-80">
                                    {downloadBars.map((height, i) => (
                                        <div key={i} className="flex-1 flex flex-col justify-end group cursor-pointer">
                                            <div
                                                className="w-full bg-blue-400/80 rounded-t-sm transition-all duration-300 group-hover:bg-blue-300"
                                                style={{ height: `${height}%` }}
                                            />
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Right: Top Apps List */}
                            <div className="border-l border-white/10 bg-black/20 overflow-y-auto max-h-[400px] lg:max-h-none no-scrollbar backdrop-blur-sm">
                                <div className="p-4 border-b border-white/10 sticky top-0 bg-slate-900/50 backdrop-blur-md z-10 flex justify-between items-center">
                                    <h3 className="font-bold text-sm text-slate-300">Top Performing Apps</h3>
                                    <Link to="/admin/apps" className="text-xs text-blue-400 hover:text-blue-300">View All</Link>
                                </div>
                                <div className="divide-y divide-white/5">
                                    {apps
                                        .filter(a => a.downloads && a.downloads !== '0')
                                        .sort((a, b) => {
                                            const getVal = (v) => v.toLowerCase().includes('m') ? parseFloat(v) * 1000000 : v.toLowerCase().includes('k') ? parseFloat(v) * 1000 : parseFloat(v);
                                            return getVal(b.downloads) - getVal(a.downloads);
                                        })
                                        .slice(0, 5)
                                        .map(app => (
                                            <div key={app.id} className="p-4 hover:bg-white/5 transition-colors flex items-center gap-3">
                                                <img src={app.iconUrl} alt={app.name} className="w-10 h-10 rounded-lg shadow-sm" />
                                                <div className="flex-1 min-w-0">
                                                    <div className="font-bold text-sm text-slate-200 truncate">{app.name}</div>
                                                    <div className="text-xs text-slate-500">{app.category}</div>
                                                </div>
                                                <div className="text-right">
                                                    <div className="font-bold text-sm text-white">{app.downloads}</div>
                                                    <div className="text-[10px] text-slate-400 uppercase tracking-wider">Downloads</div>
                                                </div>
                                                <div className="text-right pl-4 border-l border-white/10 ml-2">
                                                    <div className="font-bold text-sm text-green-400">{app.activeUsers || 'N/A'}</div>
                                                    <div className="text-[10px] text-slate-500 uppercase tracking-wider">Active</div>
                                                </div>
                                            </div>
                                        ))}
                                </div>
                            </div>
                        </div>
                    </GlassCard>
                </div>

                {/* Secondary Metric: Users (Span 4) */}
                {/* Secondary Metric: Users Chart (Span 12 for full width or 4 if compact? Let's go big) */}
                <div className="md:col-span-4 flex flex-col gap-6">
                    <Link to="/admin/vendors" className="block w-full">
                        <GlassCard className="h-full flex items-center justify-between hover:bg-white/5 transition-colors cursor-pointer group border-slate-700/50 p-6">
                            <div>
                                <h2 className="text-sm font-medium text-slate-400">Total Vendors</h2>
                                <div className="text-2xl font-bold text-white">{vendors.length}</div>
                            </div>
                            <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center group-hover:bg-primary group-hover:text-black transition-colors">
                                <Box className="w-5 h-5" />
                            </div>
                        </GlassCard>
                    </Link>

                    {/* Small Stat Card for Users (Summary) */}
                    <GlassCard className="bg-gradient-to-br from-purple-600/10 to-transparent border-purple-500/20 p-6">
                        <div className="flex justify-between items-start">
                            <div>
                                <h2 className="text-sm font-medium text-slate-400 mb-2">Total Active Users</h2>
                                <div className="text-3xl font-bold text-white mb-2">12,543</div>
                                <div className="flex items-center gap-2 text-green-400 text-xs">
                                    <TrendingUp className="w-4 h-4" /> <span>+12% All Time</span>
                                </div>
                            </div>
                            <Users className="w-10 h-10 text-purple-500/20" />
                        </div>
                    </GlassCard>
                </div>

                {/* Status Strips (Span 12 - split into 3) */}
                <div className="md:col-span-12 grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Pending Actions */}
                    <Link to="/admin/apps?status=pending">
                        <GlassCard className={`h-full border-l-4 border-l-yellow-500 hover:bg-white/5 transition-colors cursor-pointer flex items-center justify-between ${pendingCount > 0 ? 'bg-yellow-500/5' : ''}`}>
                            <div className="flex items-center gap-4">
                                <div className="p-3 bg-yellow-500/10 rounded-lg text-yellow-500">
                                    <ShieldAlert className="w-6 h-6" />
                                </div>
                                <div>
                                    <div className="text-2xl font-bold text-white">{pendingCount}</div>
                                    <div className="text-xs text-slate-400 uppercase tracking-wider font-bold">Pending Review</div>
                                </div>
                            </div>
                            <ArrowUpRight className="w-5 h-5 text-slate-600" />
                        </GlassCard>
                    </Link>

                    {/* Live Apps */}
                    <Link to="/admin/apps?status=approved">
                        <GlassCard className="h-full border-l-4 border-l-green-500 hover:bg-white/5 transition-colors cursor-pointer flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <div className="p-3 bg-green-500/10 rounded-lg text-green-500">
                                    <CheckCircle className="w-6 h-6" />
                                </div>
                                <div>
                                    <div className="text-2xl font-bold text-white">{approvedCount}</div>
                                    <div className="text-xs text-slate-400 uppercase tracking-wider font-bold">Live Apps</div>
                                </div>
                            </div>
                            <ArrowRight className="w-5 h-5 text-slate-600" />
                        </GlassCard>
                    </Link>

                    {/* Rejected Apps */}
                    <Link to="/admin/apps?status=rejected">
                        <GlassCard className="h-full border-l-4 border-l-red-500 hover:bg-white/5 transition-colors cursor-pointer flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <div className="p-3 bg-red-500/10 rounded-lg text-red-500">
                                    <XCircle className="w-6 h-6" />
                                </div>
                                <div>
                                    <div className="text-2xl font-bold text-white">{rejectedCount}</div>
                                    <div className="text-xs text-slate-400 uppercase tracking-wider font-bold">Rejected</div>
                                </div>
                            </div>
                            <ArrowRight className="w-5 h-5 text-slate-600" />
                        </GlassCard>
                    </Link>
                </div>

                {/* Full Width Analytics Chart (New Row) */}
                <div className="md:col-span-12">
                    <AnalyticsChart
                        title="User Growth Trends"
                        color="#A855F7" // Purple
                        dataMap={{
                            'Last 7 Days': [
                                { label: 'Mon', value: 120 },
                                { label: 'Tue', value: 132 },
                                { label: 'Wed', value: 101 },
                                { label: 'Thu', value: 134 },
                                { label: 'Fri', value: 190 },
                                { label: 'Sat', value: 230 },
                                { label: 'Sun', value: 210 },
                            ],
                            'Last Month': [
                                { label: 'W1', value: 800 },
                                { label: 'W2', value: 950 },
                                { label: 'W3', value: 1100 },
                                { label: 'W4', value: 1250 },
                            ],
                            'Last Year': [
                                { label: 'Q1', value: 3000 },
                                { label: 'Q2', value: 4500 },
                                { label: 'Q3', value: 6000 },
                                { label: 'Q4', value: 8500 },
                            ],
                            'Lifetime': [
                                { label: '2021', value: 100 },
                                { label: '2022', value: 2500 },
                                { label: '2023', value: 8900 },
                                { label: '2024', value: 12543 },
                            ]
                        }}
                    />
                </div>
            </div>
        </div>
    );
};
