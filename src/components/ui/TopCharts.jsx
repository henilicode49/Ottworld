import React from 'react';
import { Link } from 'react-router-dom';
import { GlassCard } from './GlassCard';

export const TopCharts = ({ apps }) => {
    // Sort by downloads (simulated by parsing '1.2M', '850k' etc strictly for mock purposes or just taking the top 5 passed in)
    // For this mock we assume 'apps' is already the top list

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between mb-2">
                <h3 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">
                    Top Charts
                </h3>
                <Link to="/store" className="text-sm text-primary hover:underline">See All</Link>
            </div>

            <div className="space-y-3">
                {apps.slice(0, 5).map((app, index) => (
                    <Link key={app.id} to={`/app/${app.id}`} className="block group">
                        <div className="flex items-center gap-4 p-2 rounded-xl hover:bg-white/5 transition-colors">
                            <span className="text-lg font-bold text-slate-500 w-6 text-center group-hover:text-white transition-colors">
                                {index + 1}
                            </span>
                            <img
                                src={app.iconUrl}
                                alt={app.name}
                                className="w-14 h-14 rounded-xl shadow-md group-hover:scale-105 transition-transform"
                            />
                            <div className="flex-1 min-w-0">
                                <div className="font-bold text-slate-200 truncate group-hover:text-primary transition-colors">
                                    {app.name}
                                </div>
                                <div className="text-xs text-slate-500 truncate">
                                    {app.category}
                                </div>
                            </div>
                            <button className="px-4 py-1.5 rounded-full bg-white/10 text-xs font-bold text-primary hover:bg-white/20 transition-colors">
                                GET
                            </button>
                        </div>
                        {index < 4 && <div className="h-px bg-white/5 ml-14 mt-3" />}
                    </Link>
                ))}
            </div>
        </div>
    );
};
