import React from 'react';
import { cn } from '../../lib/utils';

export const GlassCard = ({ children, className, ...props }) => {
    return (
        <div
            className={cn("glass-card p-6", className)}
            {...props}
        >
            {children}
        </div>
    );
};
