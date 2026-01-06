import React, { useState } from 'react';
import { Button } from './button';
import { Download, Check, Loader2 } from 'lucide-react';

export const InstallButton = ({ className, onInstall, url, filename, isWebsite }) => {
    const [state, setState] = useState('idle'); // idle, downloading, installing, installed, error
    const [progress, setProgress] = useState(0);
    const [downloadInfo, setDownloadInfo] = useState({ loaded: 0, total: 0 });

    const formatBytes = (bytes, decimals = 1) => {
        if (!bytes) return '0 B';
        const k = 1024;
        const dm = decimals < 0 ? 0 : decimals;
        const sizes = ['B', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
    };

    const handleInstall = async (e) => {
        e.preventDefault();
        if (state !== 'idle') return;

        // Verify URL
        if (!url || url === '#' || url.trim() === '') {
            console.warn("No valid URL provided for download.");
            // For demo purposes, we simulate if no URL
            // return;
        }

        if (isWebsite) {
            window.open(url, '_blank');
            if (onInstall) onInstall();
            return;
        }

        setState('downloading');
        setProgress(0);
        setDownloadInfo({ loaded: 0, total: 0 });

        try {
            // If it's a blob URL (local preview), fetches are instant but we can handle it.
            // If it's a remote URL, we try to fetch.
            // Note: CORS might block random URLs.

            const response = await fetch(url);
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

            const contentLength = response.headers.get('Content-Length');
            if (!contentLength && url !== '#') {
                // If no content length, we can't show %, so just indeterminate
                // Fallback to simple blob
                const blob = await response.blob();
                saveBlob(blob, filename);
                return;
            }

            const total = parseInt(contentLength, 10);
            let loaded = 0;

            const reader = response.body.getReader();
            const chunks = [];

            while (true) {
                const { done, value } = await reader.read();
                if (done) break;

                chunks.push(value);
                loaded += value.length;

                // Update progress
                // If total is 0 or NaN (mock?), pretend
                if (total) {
                    setProgress(Math.round((loaded / total) * 100));
                    setDownloadInfo({ loaded, total });
                } else {
                    // Fake progress if we can't determine total (e.g. gzip)
                    setProgress(prev => Math.min(prev + 10, 90));
                    setDownloadInfo({ loaded, total: 0 });
                }
            }

            // Combine chunks
            const blob = new Blob(chunks);
            saveBlob(blob, filename);

        } catch (error) {
            console.error("Download failed:", error);
            // Fallback for CORS errors on external links: just try to open/download directly
            console.log("Attempting direct download fallback...");
            const link = document.createElement('a');
            link.href = url;
            link.download = filename || 'app-download';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);

            finishInstall();
        }
    };

    const saveBlob = (blob, name) => {
        const objectUrl = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = objectUrl;
        link.download = name || 'app-download.apk';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(objectUrl);

        finishInstall();
    };

    const finishInstall = () => {
        setState('installing');
        setProgress(100);

        // Simulating "Installing" phase after download
        setTimeout(() => {
            setState('installed');
            if (onInstall) onInstall();
        }, 1500);
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
            disabled={state === 'downloading' || state === 'installing'}
            className={`relative overflow-hidden transition-all ${className}`}
        >
            {state === 'downloading' ? (
                <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    {downloadInfo.total ? (
                        <span className="text-xs">
                            {progress}% ({formatBytes(downloadInfo.loaded)} / {formatBytes(downloadInfo.total)})
                        </span>
                    ) : (
                        <>{progress > 0 ? `Downloading ${progress}%` : 'Downloading...'}</>
                    )}
                    <div className="absolute bottom-0 left-0 h-1 bg-white/30 transition-all duration-200" style={{ width: `${progress}%` }} />
                </>
            ) : state === 'installing' ? (
                <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" /> Installing...
                    <div className="absolute bottom-0 left-0 h-1 bg-green-500/50 w-full" />
                </>
            ) : (
                <>
                    <Download className="w-4 h-4 mr-2" /> {isWebsite ? 'Visit Website' : 'Install'}
                </>
            )}
        </Button>
    );
};
