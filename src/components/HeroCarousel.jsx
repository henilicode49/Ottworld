import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from './ui/button';
import { StarRating } from './ui/StarRating';
import { ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const HeroCarousel = ({ featuredApps }) => {
    const [current, setCurrent] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrent(prev => (prev + 1) % featuredApps.length);
        }, 6000);
        return () => clearInterval(timer);
    }, [featuredApps.length]);

    if (featuredApps.length === 0) return null;

    return (
        <div className="relative w-full h-[450px] md:h-[550px] overflow-hidden rounded-3xl mb-8 md:mb-12 group shadow-2xl shadow-black/50 ring-1 ring-white/10">
            <AnimatePresence mode="wait">
                <motion.div
                    key={current}
                    initial={{ opacity: 0, scale: 1.05 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.7 }}
                    className="absolute inset-0"
                >
                    {/* Background Image */}
                    <div className="absolute inset-0">
                        <img
                            src={featuredApps[current].screenshots[0] || featuredApps[current].iconUrl}
                            alt="Hero"
                            className="w-full h-full object-cover"
                        />
                        {/* Improved Gradient overlay for better text readability */}
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
                        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/80 via-transparent to-transparent" />
                    </div>

                    {/* Content */}
                    <div className="absolute bottom-0 left-0 p-8 md:p-12 max-w-3xl w-full z-10">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                            className="mb-4 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/20 text-primary border border-primary/20 backdrop-blur-md"
                        >
                            <span className="text-xs font-bold uppercase tracking-widest">Featured App</span>
                        </motion.div>

                        <div className="flex items-end gap-6 mb-6">
                            <motion.img
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.2 }}
                                src={featuredApps[current].iconUrl}
                                className="w-20 h-20 md:w-28 md:h-28 rounded-3xl shadow-2xl border border-white/10"
                            />
                            <div className="md:hidden">
                                <motion.h2
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.3 }}
                                    className="text-3xl font-bold text-white leading-tight"
                                >
                                    {featuredApps[current].name}
                                </motion.h2>
                                <StarRating rating={featuredApps[current].rating} showCount={false} />
                            </div>
                        </div>

                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                            className="hidden md:block text-6xl font-black text-white mb-4 leading-tight tracking-tight"
                        >
                            {featuredApps[current].name}
                        </motion.h2>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 }}
                            className="text-base md:text-xl text-slate-300 mb-8 line-clamp-2 max-w-xl font-medium"
                        >
                            {featuredApps[current].shortDescription}
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5 }}
                            className="flex items-center gap-8"
                        >
                            <Link to={`/app/${featuredApps[current].id}`}>
                                <Button className="h-14 px-10 text-lg rounded-2xl shadow-xl shadow-primary/25 bg-primary hover:bg-primary/90 transition-all hover:scale-105 active:scale-95">
                                    View Details
                                    <ChevronRight className="w-5 h-5 ml-2 inline" />
                                </Button>
                            </Link>
                            <div className="hidden md:flex flex-col border-l border-white/20 pl-6">
                                <StarRating rating={featuredApps[current].rating} showCount={false} />
                                <span className="text-sm text-slate-400 mt-1 font-medium">{featuredApps[current].downloads} downloads</span>
                            </div>
                        </motion.div>
                    </div>
                </motion.div>
            </AnimatePresence>

            {/* Indicators */}
            <div className="absolute bottom-6 right-6 md:right-12 z-20 flex gap-3 bg-black/20 backdrop-blur-md px-4 py-2 rounded-full border border-white/5">
                {featuredApps.map((_, idx) => (
                    <button
                        key={idx}
                        onClick={() => setCurrent(idx)}
                        className={`h-2 rounded-full transition-all duration-500 ease-out ${idx === current ? 'w-8 bg-white' : 'w-2 bg-white/30 hover:bg-white/50'
                            }`}
                    />
                ))}
            </div>
        </div>
    );
};
