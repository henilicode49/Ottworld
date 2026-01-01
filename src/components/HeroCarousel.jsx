import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from './ui/Button';
import { StarRating } from './ui/StarRating';
import { ChevronRight } from 'lucide-react';

export const HeroCarousel = ({ featuredApps }) => {
    const [current, setCurrent] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrent(prev => (prev + 1) % featuredApps.length);
        }, 5000);
        return () => clearInterval(timer);
    }, [featuredApps.length]);

    if (featuredApps.length === 0) return null;

    return (
        <div className="relative w-full h-[500px] overflow-hidden rounded-2xl mb-12 group">
            {featuredApps.map((app, index) => (
                <div
                    key={app.id}
                    className={`absolute inset-0 transition-opacity duration-1000 ${index === current ? 'opacity-100 z-10' : 'opacity-0 z-0'
                        }`}
                >
                    {/* Background Image */}
                    <div className="absolute inset-0">
                        <img
                            src={app.screenshots[0] || app.iconUrl}
                            alt="Hero"
                            className="w-full h-full object-cover"
                        />
                        {/* Gradient adjusted for better brightness - reduced opacity */}
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
                        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/80 via-slate-950/10 to-transparent" />
                    </div>

                    {/* Content */}
                    <div className="absolute bottom-0 left-0 p-10 max-w-2xl">
                        <div className="mb-4 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/20 text-primary border border-primary/20 backdrop-blur-md">
                            <span className="text-xs font-bold uppercase tracking-wider">Featured</span>
                        </div>
                        <img src={app.iconUrl} className="w-20 h-20 rounded-2xl mb-6 shadow-2xl" />
                        <h2 className="text-5xl font-bold text-white mb-4 leading-tight">{app.name}</h2>
                        <p className="text-xl text-slate-300 mb-6 line-clamp-2">{app.shortDescription}</p>
                        <div className="flex items-center gap-6">
                            <Link to={`/app/${app.id}`}>
                                <Button className="h-14 px-8 text-lg rounded-xl shadow-xl shadow-primary/20">
                                    View Details <ChevronRight className="w-5 h-5 ml-1" />
                                </Button>
                            </Link>
                            <div className="flex flex-col">
                                <StarRating rating={app.rating} showCount={false} />
                                <span className="text-sm text-slate-400 mt-1">{app.downloads} downloads</span>
                            </div>
                        </div>
                    </div>
                </div>
            ))}

            {/* Indicators */}
            <div className="absolute bottom-6 right-10 z-20 flex gap-2">
                {featuredApps.map((_, idx) => (
                    <button
                        key={idx}
                        onClick={() => setCurrent(idx)}
                        className={`h-1.5 rounded-full transition-all duration-300 ${idx === current ? 'w-8 bg-white' : 'w-2 bg-white/30 hover:bg-white/50'
                            }`}
                    />
                ))}
            </div>
        </div>
    );
};
