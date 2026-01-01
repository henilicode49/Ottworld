import React from 'react';
import { Clock } from 'lucide-react';

export const VersionHistory = ({ history }) => {
    if (!history || history.length === 0) return null;

    const latest = history[0];

    return (
        <div className="mb-10 animate-fade-in">
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-2xl font-bold flex items-center gap-2">
                    What's New
                </h3>
                <span className="text-primary font-medium text-sm">Version {latest.version}</span>
            </div>

            <div className="bg-white/5 border border-white/5 rounded-2xl p-6">
                <div className="flex items-center justify-between mb-3">
                    <span className="text-xs text-slate-400 font-mono bg-white/5 px-2 py-1 rounded">
                        {latest.date}
                    </span>
                </div>
                <p className="text-slate-200 leading-relaxed text-base">
                    {latest.notes}
                </p>

                {history.length > 1 && (
                    <details className="mt-4 group">
                        <summary className="text-sm text-primary cursor-pointer hover:underline list-none font-medium flex items-center gap-1">
                            Version History
                        </summary>
                        <div className="mt-4 space-y-4 pt-4 border-t border-white/5 pl-2 border-l-2 border-primary/20 bg-gradient-to-r from-primary/5 to-transparent rounded-r-xl">
                            {history.slice(1).map((ver, i) => (
                                <div key={i} className="py-2 pr-4">
                                    <div className="flex items-center gap-3 mb-1">
                                        <span className="text-xs font-bold text-slate-300">v{ver.version}</span>
                                        <span className="text-xs text-slate-500">{ver.date}</span>
                                    </div>
                                    <p className="text-sm text-slate-400">{ver.notes}</p>
                                </div>
                            ))}
                        </div>
                    </details>
                )}
            </div>
        </div>
    );
};
