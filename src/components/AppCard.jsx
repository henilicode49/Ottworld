import { motion } from 'framer-motion';
import React from 'react';
import { Link } from 'react-router-dom';
import { GlassCard } from './ui/GlassCard';
import { Badge } from './ui/Badge';
import { Download } from 'lucide-react';

import { StarRating } from './ui/StarRating';

export const AppCard = ({ app, variant = 'card', linkTo }) => {
    // Default link destination
    const destination = linkTo || `/app/${app.id}`;

    if (variant === 'list') {
        return (
            <Link to={destination}>
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="flex items-center gap-4 py-3 border-b border-white/5 last:border-0 group"
                >
                    <img
                        src={app.iconUrl}
                        alt={app.name}
                        className="w-14 h-14 rounded-2xl bg-slate-800 object-cover shadow-lg group-hover:scale-105 transition-transform"
                    />
                    <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-base text-slate-100 mb-0.5 truncate group-hover:text-primary transition-colors">
                            {app.name}
                        </h3>
                        <p className="text-xs text-slate-500 truncate">{app.shortDescription}</p>
                    </div>

                    <div className="flex flex-col items-end gap-1">
                        <button className="px-5 py-1.5 rounded-full bg-white/10 text-xs font-bold text-primary group-hover:bg-white/20 transition-colors uppercase tracking-wide">
                            Get
                        </button>
                        <span className="text-[10px] text-slate-500">In-App Purchases</span>
                    </div>
                </motion.div>
            </Link>
        );
    }

    return (
        <Link to={destination}>
            <motion.div
                whileHover={{ y: -4 }}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
                className="h-full"
            >
                <GlassCard className="h-full hover:shadow-xl hover:shadow-primary/10 transition-all duration-300 group p-5 flex flex-col">
                    <div className="flex items-start justify-between mb-4">
                        <img
                            src={app.iconUrl}
                            alt={app.name}
                            className="w-16 h-16 rounded-2xl bg-slate-800 object-cover shadow-lg group-hover:shadow-primary/20 transition-all duration-300"
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
            </motion.div>
        </Link>
    );
};
