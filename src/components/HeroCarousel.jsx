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
        <div className="relative w-full h-[400px] md:h-[500px] overflow-hidden rounded-2xl mb-8 md:mb-12 group">
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
                    <div className="absolute bottom-0 left-0 p-6 md:p-10 max-w-2xl w-full">
                        <div className="mb-3 md:mb-4 inline-flex items-center gap-2 px-2 md:px-3 py-0.5 md:py-1 rounded-full bg-primary/20 text-primary border border-primary/20 backdrop-blur-md">
                            <span className="text-[10px] md:text-xs font-bold uppercase tracking-wider">Featured</span>
                        </div>
                        <div className="flex items-end gap-4 md:block mb-4 md:mb-6">
                            <img src={app.iconUrl} className="w-16 h-16 md:w-20 md:h-20 rounded-2xl shadow-2xl" />
                            <div className="md:hidden">
                                <h2 className="text-2xl font-bold text-white leading-tight">{app.name}</h2>
                                <StarRating rating={app.rating} showCount={false} />
                            </div>
                        </div>
                        <h2 className="hidden md:block text-5xl font-bold text-white mb-4 leading-tight">{app.name}</h2>
                        <p className="text-sm md:text-xl text-slate-300 mb-4 md:mb-6 line-clamp-2">{app.shortDescription}</p>
                        <div className="flex items-center gap-4 md:gap-6">
                            <Link to={`/app/${app.id}`} className="flex-1 md:flex-none">
                                <Button className="h-10 md:h-14 px-6 md:px-8 text-sm md:text-lg rounded-xl shadow-xl shadow-primary/20 w-full md:w-auto">
                                    {/* Mobile text vs Desktop text */}
                                    <span className="md:hidden">Get</span>
                                    <span className="hidden md:inline">View Details</span>
                                    <ChevronRight className="w-4 h-4 md:w-5 md:h-5 ml-1 inline" />
                                </Button>
                            </Link>
                            <div className="hidden md:flex flex-col">
                                <StarRating rating={app.rating} showCount={false} />
                                <span className="text-sm text-slate-400 mt-1">{app.downloads} downloads</span>
                            </div>
                        </div>
                    </div>
                </div>
            ))}

            {/* Indicators */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 md:left-auto md:translate-x-0 md:bottom-6 md:right-10 z-20 flex gap-2">
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
