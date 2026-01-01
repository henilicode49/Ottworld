import React from 'react';
import { Star, StarHalf } from 'lucide-react';
import { cn } from '../../lib/utils';

export const StarRating = ({ rating, count, className, showCount = true }) => {
    return (
        <div className={cn("flex items-center gap-1", className)}>
            <div className="flex">
                {[1, 2, 3, 4, 5].map((star) => {
                    const isFull = star <= Math.floor(rating);
                    const isHalf = star === Math.ceil(rating) && rating % 1 !== 0;

                    if (isHalf) {
                        return <StarHalf key={star} className="w-4 h-4 text-yellow-400 fill-yellow-400" />;
                    }

                    return (
                        <Star
                            key={star}
                            className={cn(
                                "w-4 h-4",
                                isFull
                                    ? "text-yellow-400 fill-yellow-400"
                                    : "text-slate-600"
                            )}
                        />
                    );
                })}
            </div>
            {showCount && count !== undefined && (
                <span className="text-xs text-slate-500 ml-1">({count})</span>
            )}
        </div>
    );
};
