import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useData } from '../../context/DataContext';
import { Button } from '../../components/ui/Button';
import { GlassCard } from '../../components/ui/GlassCard';
import { Badge } from '../../components/ui/Badge';
import { InstallButton } from '../../components/ui/InstallButton';
import { StarRating } from '../../components/ui/StarRating';
import { Share2, AlertCircle, ChevronLeft, UserIcon } from 'lucide-react';
import { AppCard } from '../../components/AppCard';
import { VersionHistory } from '../../components/ui/VersionHistory';

export const AppDetailsPage = () => {
    const { id } = useParams();
    const { apps, getVendorApps, incrementDownloads } = useData();

    const app = apps.find(a => a.id === id);

    if (!app) {
        return (
            <div className="min-h-[60vh] flex flex-col items-center justify-center">
                <h2 className="text-2xl font-bold mb-4">App not found</h2>
                <Link to="/store">
                    <Button variant="secondary">Back to Store</Button>
                </Link>
            </div>
        );
    }

    // Check if approved or viewing as generic public user (in a real app, we'd check user role too)
    // For this mock, we'll just show a restricted view if not approved
    if (app.status !== 'approved') {
        return (
            <div className="min-h-[60vh] flex flex-col items-center justify-center p-6 text-center">
                <AlertCircle className="w-16 h-16 text-yellow-500 mb-4" />
                <h2 className="text-3xl font-bold mb-2">App Under Review</h2>
                <p className="text-slate-400 max-w-md mx-auto mb-8">
                    This application is currently being reviewed by our moderation team.
                </p>
                <Link to="/store">
                    <Button>Browse other apps</Button>
                </Link>
            </div>
        );
    }

    const moreApps = getVendorApps(app.vendorId).filter(a => a.id !== app.id && a.status === 'approved');

    return (
        <div className="max-w-7xl mx-auto px-6 py-10">
            <Link to="/store" className="inline-flex items-center text-slate-400 hover:text-white mb-6">
                <ChevronLeft className="w-4 h-4 mr-1" /> Back to Store
            </Link>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left Column: Icon & Info */}
                <div className="space-y-6">
                    <GlassCard className="text-center relative overflow-hidden group">
                        {/* Glow effect behind icon */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-primary/20 blur-[50px] rounded-full group-hover:bg-primary/30 transition-all" />

                        <img
                            src={app.iconUrl}
                            alt={app.name}
                            className="w-40 h-40 rounded-[2.5rem] mx-auto mb-6 shadow-2xl relative z-10"
                        />

                        <div className="mb-6 flex justify-center">
                            <StarRating rating={app.rating || 0} count={app.downloads} showCount={false} className="scale-125" />
                        </div>

                        <InstallButton
                            className="w-full h-12 text-lg mb-3 shadow-lg shadow-primary/20"
                            onInstall={() => incrementDownloads(app.id)}
                        />
                        <div className="text-xs text-slate-500 mt-4">{app.size} • v{app.version} • {app.downloads || '0'} Downloads</div>
                    </GlassCard>

                    <GlassCard>
                        <h3 className="font-bold text-slate-300 mb-4">Information</h3>
                        <div className="space-y-4 text-sm">
                            <div className="flex justify-between">
                                <span className="text-slate-500">Provider</span>
                                <span className="text-slate-200">{app.vendorName}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-slate-500">Category</span>
                                <span className="text-slate-200">{app.category}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-slate-500">Rating</span>
                                <span className="text-slate-200 flex items-center gap-1">
                                    {app.rating} <StarRating rating={app.rating} showCount={false} />
                                </span>
                            </div>
                            <div className="pt-4 border-t border-white/5">
                                <p className="text-slate-500 mb-2">Tags</p>
                                <div className="flex flex-wrap gap-2">
                                    {app.tags.map(tag => (
                                        <span key={tag} className="px-2 py-1 rounded bg-white/5 text-xs text-slate-300">
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </GlassCard>
                </div>

                {/* Right Column: Main Details */}
                <div className="lg:col-span-2 space-y-8">
                    <div>
                        <h1 className="text-5xl font-bold mb-4 tracking-tight">{app.name}</h1>
                        <p className="text-xl text-slate-400 mb-8 max-w-2xl">{app.shortDescription}</p>

                        {/* Simulated Screenshots */}
                        {app.screenshots.length > 0 && (
                            <div className="flex gap-4 overflow-x-auto pb-6 mb-8 no-scrollbar snap-x">
                                {app.screenshots.map((shot, i) => (
                                    <img
                                        key={i}
                                        src={shot}
                                        alt={`Screenshot ${i + 1} `}
                                        className="h-72 rounded-2xl border border-white/10 shadow-lg flex-shrink-0 snap-center"
                                    />
                                ))}
                            </div>
                        )}



                        <div className="prose prose-invert max-w-none mb-12">
                            <h3 className="text-2xl font-bold mb-4">About this app</h3>
                            <p className="text-slate-300 leading-relaxed whitespace-pre-wrap text-lg">
                                {app.fullDescription}
                            </p>
                        </div>

                        {/* Version History */}
                        <VersionHistory history={app.versionHistory} />


                    </div>

                    {/* More from Vendor */}
                    {moreApps.length > 0 && (
                        <div className="pt-10 border-t border-white/10">
                            <h3 className="text-2xl font-bold mb-6">More from {app.vendorName}</h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                {moreApps.slice(0, 2).map(a => (
                                    <AppCard key={a.id} app={a} />
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
