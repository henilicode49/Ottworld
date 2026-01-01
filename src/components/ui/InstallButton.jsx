import React, { useState } from 'react';
import { Button } from './Button';
import { Download, Check, Loader2 } from 'lucide-react';

export const InstallButton = ({ className, onInstall }) => {
    const [state, setState] = useState('idle'); // idle, installing, installed

    const handleInstall = (e) => {
        e.preventDefault();
        if (state !== 'idle') return;

        setState('installing');

        // Simulate install
        setTimeout(() => {
            setState('installed');
            if (onInstall) onInstall();
        }, 2500);
    };

    if (state === 'installed') {
        return (
            <Button
                className={`bg-white/10 text-green-400 border-green-500/20 hover:bg-white/20 ${className}`}
                onClick={(e) => e.preventDefault()}
            >
                <Check className="w-4 h-4 mr-2" /> Open
            </Button>
        );
    }

    return (
        <Button
            onClick={handleInstall}
            disabled={state === 'installing'}
            className={`relative overflow-hidden transition-all ${className}`}
        >
            {state === 'installing' ? (
                <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" /> Installing...
                    {/* Progress Bar Background */}
                    <div className="absolute bottom-0 left-0 h-1 bg-white/30 animate-[width_2s_ease-in-out_forwards]" style={{ width: '0%' }} />
                </>
            ) : (
                <>
                    <Download className="w-4 h-4 mr-2" /> Install
                </>
            )}
        </Button>
    );
};
