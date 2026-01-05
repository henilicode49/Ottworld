
import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';
import { GlassCard } from '../../components/ui/GlassCard';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { Edit, Eye, Upload } from 'lucide-react';
import { Link } from 'react-router-dom';


export const MyApps = () => {
    const { user } = useAuth();
    const { getVendorApps } = useData();
    const apps = getVendorApps(user.id);


    return (
        <div>
            <div className="flex items-center justify-between mb-8">
                <h1 className="text-2xl font-bold">My Applications</h1>
                <Link to="/vendor/add">
                    <Button className="w-10 h-10 p-0 flex items-center justify-center rounded-full">
                        <Upload className="w-5 h-5" />
                    </Button>
                </Link>
            </div>


            <GlassCard className="p-0 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-white/5 border-b border-white/10 text-slate-400 text-sm">
                                <th className="p-4">App</th>
                                <th className="p-4">Status</th>
                                <th className="p-4">Version</th>
                                <th className="p-4">Downloads</th>
                                <th className="p-4 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/10">
                            {apps.map(app => (
                                <tr key={app.id} className="hover:bg-white/5 transition-colors">
                                    <td className="p-4">
                                        <div className="flex items-center gap-3">
                                            <img src={app.iconUrl} className="w-10 h-10 rounded bg-slate-800" />
                                            <div>
                                                <div className="font-bold text-slate-200">{app.name}</div>
                                                <div className="text-xs text-slate-500">{app.category}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="p-4">
                                        <Link to={`/vendor/app/details?id=${app.id}`}>
                                            <Badge status={app.status} />
                                        </Link>
                                    </td>
                                    <td className="p-4 text-slate-400">{app.version}</td>
                                    <td className="p-4 text-slate-400">{app.downloads || '0'}</td>
                                    <td className="p-4 text-right">
                                        <div className="flex items-center justify-end gap-2">
                                            <Link to={`/vendor/app/details/${app.id}`}>
                                                <button className="p-2 hover:bg-white/10 rounded-lg text-slate-400 hover:text-white" title="View">
                                                    <Eye className="w-4 h-4" />
                                                </button>
                                            </Link>
                                            <Link to={`/vendor/app/edit/${app.id}`}>
                                                <button className="p-2 hover:bg-white/10 rounded-lg text-slate-400 hover:text-primary" title="Edit">
                                                    <Edit className="w-4 h-4" />
                                                </button>
                                            </Link>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            {apps.length === 0 && (
                                <tr>
                                    <td colSpan="5" className="p-8 text-center text-slate-500">
                                        No apps found. Start by uploading one!
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </GlassCard>
        </div>
    );
};