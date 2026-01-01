import React from 'react';
import { cn } from '../../lib/utils';

export const Input = ({ className, ...props }) => {
    return (
        <input
            className={cn("glass-input w-full", className)}
            {...props}
        />
    );
};

export const TextArea = ({ className, ...props }) => {
    return (
        <textarea
            className={cn("glass-input w-full min-h-[100px]", className)}
            {...props}
        />
    );
};
