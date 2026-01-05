import React from 'react';
import { useData } from '../../context/DataContext';
import { GlassCard } from '../../components/ui/GlassCard';
import { Button } from '../../components/ui/Button';
import { Eye, Check, X } from 'lucide-react';
import { Link } from 'react-router-dom';

export const ModerationQueue = () => {
    const { apps, updateAppStatus } = useData();
    // Get both pending and review status apps
    const pendingApps = apps.filter(app => app.status === 'pending' || app.status === 'review');

    const handleAction = (appId, action) => {
        // Simulate API delay
        const status = action === 'approve' ? 'approved' : 'rejected';
        updateAppStatus(appId, status);
    };

    return (
        <div>
            <h1 className="text-2xl font-bold mb-6">Moderation Queue</h1>

            <div className="space-y-4 md:hidden">
                {pendingApps.map(app => (
                    <GlassCard key={app.id} className="p-4">
                        <div className="flex items-start justify-between mb-4">
                            <div className="flex items-center gap-3">
                                <img src={app.iconUrl} className="w-12 h-12 rounded-lg bg-slate-800" />
                                <div>
                                    <div className="font-bold text-slate-200">{app.name}</div>
                                    <div className="text-sm text-slate-400">{app.vendorName}</div>
                                    <div className="text-xs text-slate-500">{new Date(app.createdAt).toLocaleDateString()}</div>
                                    {/* Update indicator */}
                                    {app.updateChanges && (
                                        <span className="inline-block mt-1 px-2 py-0.5 rounded-full text-xs font-bold bg-blue-500/20 text-blue-400">
                                            Update
                                        </span>
                                    )}
                                </div>
                            </div>
                            <Link to={`/app/${app.id}`} target="_blank">
                                <Button variant="secondary" className="h-8 w-8 p-0" title="View Details">
                                    <Eye className="w-4 h-4" />
                                </Button>
                            </Link>
                        </div>
                        <div className="flex gap-2">
                            <Link to={`/admin/apps/${app.id}`} className="flex-1">
                                <Button
                                    variant="secondary"
                                    className="w-full h-9 px-3 text-xs"
                                >
                                    Review
                                </Button>
                            </Link>
                        </div>
                        <div className="flex gap-2 mt-2">
                            <Button
                                onClick={() => handleAction(app.id, 'approve')}
                                className="flex-1 bg-green-600 hover:bg-green-500 h-9 px-3 text-xs"
                            >
                                <Check className="w-3 h-3 mr-1" /> Approve
                            </Button>
                            <Button
                                onClick={() => handleAction(app.id, 'reject')}
                                className="flex-1 btn-danger h-9 px-3 text-xs bg-red-500/20 text-red-400 hover:bg-red-500/30"
                            >
                                <X className="w-3 h-3 mr-1" /> Reject
                            </Button>
                        </div>
                    </GlassCard>
                ))}
                {pendingApps.length === 0 && (
                    <div className="p-10 text-center text-slate-500 glass-panel rounded-xl">
                        <div className="flex flex-col items-center justify-center">
                            <Check className="w-10 h-10 text-green-500/50 mb-4" />
                            <p>All caught up! No pending apps.</p>
                        </div>
                    </div>
                )}
            </div>

            <GlassCard className="hidden md:block p-0 overflow-hidden">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-white/5 border-b border-white/10 text-slate-400 text-sm">
                            <th className="p-4">App</th>
                            <th className="p-4">Vendor</th>
                            <th className="p-4">Submitted</th>
                            <th className="p-4 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-white/10">
                        {pendingApps.map(app => (
                            <tr key={app.id} className="hover:bg-white/5 transition-colors">
                                <td className="p-4">
                                    <div className="flex items-center gap-3">
                                        <img src={app.iconUrl} className="w-10 h-10 rounded bg-slate-800" />
                                        <div>
                                            <div className="font-bold text-slate-200 flex items-center gap-2">
                                                {app.name}
                                                {/* Update indicator */}
                                                {app.updateChanges && (
                                                    <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-blue-500/20 text-blue-400">
                                                        Update
                                                    </span>
                                                )}
                                            </div>
                                            <div className="text-xs text-slate-500">{app.category}</div>
                                        </div>
                                    </div>
                                </td>
                                <td className="p-4 text-slate-300">{app.vendorName}</td>
                                <td className="p-4 text-slate-400">{new Date(app.createdAt).toLocaleDateString()}</td>
                                <td className="p-4 text-right">
                                    <div className="flex items-center justify-end gap-2">
                                        <Link to={`/admin/apps/${app.id}`}>
                                            <Button variant="secondary" className="h-8 px-3 text-xs">
                                                Review
                                            </Button>
                                        </Link>
                                        <Button
                                            onClick={() => handleAction(app.id, 'approve')}
                                            className="bg-green-600 hover:bg-green-500 h-8 px-3 text-xs"
                                        >
                                            <Check className="w-3 h-3 mr-1" /> Approve
                                        </Button>
                                        <Button
                                            onClick={() => handleAction(app.id, 'reject')}
                                            className="btn-danger h-8 px-3 text-xs bg-red-500/20 text-red-400 hover:bg-red-500/30"
                                        >
                                            <X className="w-3 h-3 mr-1" /> Reject
                                        </Button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                        {pendingApps.length === 0 && (
                            <tr>
                                <td colSpan="4" className="p-10 text-center text-slate-500">
                                    <div className="flex flex-col items-center justify-center">
                                        <Check className="w-10 h-10 text-green-500/50 mb-4" />
                                        <p>All caught up! No pending apps.</p>
                                    </div>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </GlassCard>
        </div>
    );
};
