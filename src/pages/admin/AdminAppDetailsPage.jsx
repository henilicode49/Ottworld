import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useData } from '../../context/DataContext';
import { GlassCard } from '../../components/ui/GlassCard';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/button';
import { ArrowLeft, CheckCircle, XCircle, Download, Calendar, Tag, Smartphone, ShieldAlert, AlertCircle } from 'lucide-react';

export const AdminAppDetailsPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { apps, updateAppStatus } = useData();
    const app = apps.find(a => a.id === id);

    const [isProcessing, setIsProcessing] = useState(false);

    if (!app) {
        return <div className="p-10 text-center text-slate-400">App not found</div>;
    }

    const handleStatusUpdate = async (newStatus) => {
        setIsProcessing(true);
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 500));

        if (updateAppStatus) {
            updateAppStatus(id, newStatus);
        } else {
            console.error("updateAppStatus function missing from context");
        }

        setIsProcessing(false);
        navigate('/admin/apps'); // Verify this route exists, or use /admin/dashboard
    };

    return (
        <div className="max-w-4xl mx-auto space-y-6 animate-fade-in">
            <Button
                variant="ghost"
                className="pl-0 gap-2 text-slate-400 hover:text-white"
                onClick={() => navigate('/admin/dashboard')}
            >
                <ArrowLeft className="w-4 h-4" /> Back to Dashboard
            </Button>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Left Column: App Icon & Actions */}
                <div className="md:col-span-1 space-y-6">
                    <GlassCard className="flex flex-col items-center text-center p-6">
                        {/* Use app.iconUrl for DataContext */}
                        <img src={app.iconUrl} alt={app.name} className="w-32 h-32 rounded-2xl shadow-lg mb-4 bg-slate-800" />
                        <h1 className="text-xl font-bold mb-1">{app.name}</h1>
                        <p className="text-sm text-slate-400 mb-4">{app.vendorName}</p>
                        <Badge status={app.status} className="mb-6" />

                        <div className="w-full space-y-3">
                            <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest text-left w-full mb-2">Moderation</h3>

                            {(app.status === 'pending' || app.status === 'review') && (
                                <>
                                    <Button
                                        className="w-full bg-green-500 hover:bg-green-600 border-none text-white gap-2"
                                        onClick={() => handleStatusUpdate('approved')}
                                        disabled={isProcessing}
                                    >
                                        <CheckCircle className="w-4 h-4" /> Approve App
                                    </Button>
                                    <Button
                                        className="w-full bg-red-500/10 text-red-400 hover:bg-red-500/20 border-red-500/50 gap-2"
                                        onClick={() => handleStatusUpdate('rejected')}
                                        disabled={isProcessing}
                                    >
                                        <XCircle className="w-4 h-4" /> Reject App
                                    </Button>
                                </>
                            )}

                            {app.status === 'approved' && (
                                <Button
                                    className="w-full bg-red-500/10 text-red-400 hover:bg-red-500/20 border-red-500/50 gap-2"
                                    onClick={() => handleStatusUpdate('rejected')}
                                    disabled={isProcessing}
                                >
                                    <ShieldAlert className="w-4 h-4" /> Revoke Approval
                                </Button>
                            )}

                            {app.status === 'rejected' && (
                                <Button
                                    className="w-full bg-green-500 hover:bg-green-600 border-none text-white gap-2"
                                    onClick={() => handleStatusUpdate('approved')}
                                    disabled={isProcessing}
                                >
                                    <CheckCircle className="w-4 h-4" /> Re-Approve
                                </Button>
                            )}
                        </div>
                    </GlassCard>

                    <GlassCard className="p-4 space-y-4">
                        <h3 className="text-sm font-bold text-slate-300">Metadata</h3>
                        <div className="space-y-3 text-sm">
                            <div className="flex justify-between">
                                <span className="text-slate-500 flex items-center gap-2"><Download className="w-4 h-4" /> Downloads</span>
                                <span className="text-white">{app.downloads || 0}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-slate-500 flex items-center gap-2"><Smartphone className="w-4 h-4" /> Current Version</span>
                                <span className="text-white">{app.version}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-slate-500 flex items-center gap-2"><Calendar className="w-4 h-4" /> Created</span>
                                <span className="text-white">{app.createdAt ? new Date(app.createdAt).toLocaleDateString() : 'N/A'}</span>
                            </div>
                        </div>
                    </GlassCard>
                </div>

                {/* Right Column: Details */}
                <div className="md:col-span-2 space-y-6">
                    <GlassCard>
                        <h2 className="text-lg font-bold mb-4">Description</h2>
                        <div className="prose prose-invert max-w-none">
                            <p className="text-slate-300 leading-relaxed whitespace-pre-line">
                                {app.fullDescription || app.description}
                            </p>
                        </div>
                    </GlassCard>

                    {/* Update Changes - Show if available */}
                    {app.updateChanges && (
                        <GlassCard className="border-blue-500/20 bg-blue-500/5">
                            <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
                                <AlertCircle className="w-5 h-5 text-blue-400" />
                                Update Changes
                            </h2>
                            <div className="prose prose-invert max-w-none">
                                <p className="text-slate-300 leading-relaxed whitespace-pre-line">
                                    {app.updateChanges}
                                </p>
                            </div>
                        </GlassCard>
                    )}

                    <GlassCard>
                        <h2 className="text-lg font-bold mb-4">Screenshots</h2>
                        <div className="grid grid-cols-2 gap-4">
                            {app.screenshots && app.screenshots.map((shot, i) => (
                                <img key={i} src={shot} alt={`Screenshot ${i + 1}`} className="rounded-lg border border-white/10 w-full" />
                            ))}
                        </div>
                    </GlassCard>

                    <GlassCard>
                        <h2 className="text-lg font-bold mb-4">Categories & Tags</h2>
                        <div className="flex flex-wrap gap-2">
                            <span className="px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 text-sm border border-blue-500/30">
                                {app.category}
                            </span>
                            {app.tags && app.tags.map(tag => (
                                <span key={tag} className="px-3 py-1 rounded-full bg-slate-700/50 text-slate-300 text-sm border border-white/5 flex items-center gap-1">
                                    <Tag className="w-3 h-3" /> {tag}
                                </span>
                            ))}
                        </div>
                    </GlassCard>
                </div>
            </div>
        </div>
    );
};

export default AdminAppDetailsPage;
