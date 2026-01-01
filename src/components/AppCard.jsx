import React from 'react';
import { Link } from 'react-router-dom';
import { GlassCard } from './ui/GlassCard';
import { Badge } from './ui/Badge';
import { Download } from 'lucide-react';

import { StarRating } from './ui/StarRating';

export const AppCard = ({ app }) => {
    return (
        <Link to={`/app/${app.id}`}>
            <GlassCard className="h-full hover:-translate-y-1 hover:shadow-primary/10 transition-all duration-300 group p-5 flex flex-col">
                <div className="flex items-start justify-between mb-4">
                    <img
                        src={app.iconUrl}
                        alt={app.name}
                        className="w-16 h-16 rounded-2xl bg-slate-800 object-cover shadow-lg group-hover:shadow-primary/20 transition-all"
                    />
                    {app.status !== 'approved' && <Badge status={app.status} />}
                </div>

                <h3 className="font-bold text-lg text-slate-100 mb-1 group-hover:text-primary transition-colors">
                    {app.name}
                </h3>
                <p className="text-sm text-slate-400 mb-1">{app.vendorName}</p>

                {/* Rating */}
                <div className="mb-2">
                    {app.rating ? <StarRating rating={app.rating} showCount={false} /> : <div className="h-4" />}
                </div>

                <p className="text-xs text-slate-500 line-clamp-2 mb-4 h-10">
                    {app.shortDescription}
                </p>

                <div className="flex items-center justify-between mt-auto pt-4 border-t border-white/5">
                    <span className="text-xs px-2 py-1 rounded bg-white/5 text-slate-300">
                        {app.category}
                    </span>
                    <div className="p-2 rounded-full bg-white/5 group-hover:bg-primary group-hover:text-white transition-colors">
                        <Download className="w-4 h-4" />
                    </div>
                </div>
            </GlassCard>
        </Link>
    );
};
