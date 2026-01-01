import React from 'react';
import { cn } from '../../lib/utils';

export const Button = ({ children, variant = 'primary', className, ...props }) => {
    const variants = {
        primary: 'btn-primary',
        secondary: 'btn-secondary',
        ghost: 'hover:bg-white/5 text-slate-300',
        danger: 'bg-red-500/20 text-red-400 border border-red-500/50 hover:bg-red-500/30'
    };

    return (
        <button
            className={cn(
                "inline-flex items-center justify-center gap-2 transition-all disabled:opacity-50 disabled:pointer-events-none",
                variants[variant] || variants.primary,
                className
            )}
            {...props}
        >
            {children}
        </button>
    );
};
