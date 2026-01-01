import React from 'react';
import { Link } from 'react-router-dom';
import { GlassCard } from "./ui/GlassCard";

export const FeaturedStoryCard = ({ story }) => {
    return (
        <Link to={`/app/${story.appId}`} className="block group h-full">
            <div className="relative h-[450px] rounded-3xl overflow-hidden shadow-2xl transition-all duration-300 hover:scale-[1.01] hover:shadow-primary/20">
                <img
                    src={story.imageUrl}
                    alt={story.title}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent opacity-90" />

                <div className="absolute top-0 left-0 p-8 w-full h-full flex flex-col justify-end">
                    <span className="text-primary font-bold tracking-widest text-xs uppercase mb-3 drop-shadow-md">
                        {story.subtitle}
                    </span>
                    <h3 className="text-3xl md:text-4xl font-bold text-white mb-3 leading-tight drop-shadow-lg">
                        {story.title}
                    </h3>
                    <p className="text-slate-200 text-lg font-medium drop-shadow-md line-clamp-3">
                        {story.description}
                    </p>
                </div>
            </div>
        </Link>
    );
};
