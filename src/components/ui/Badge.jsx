import React from 'react';
import { cn } from '../../lib/utils';

export const Badge = ({ status, className }) => {
    const styles = {
        approved: 'bg-green-500/20 text-green-400 border-green-500/30 border',
        pending: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30 border',
        rejected: 'bg-red-500/20 text-red-400 border-red-500/30 border',
        default: 'bg-slate-700/50 text-slate-300'
    };

    return (
        <span className={cn("badge", styles[status] || styles.default, className)}>
            {status}
        </span>
    );
};
