import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import { AppCard } from '../../components/AppCard';
import { Input } from '../../components/ui/Input';
import { Search, Filter } from 'lucide-react';

const CATEGORIES = ['All', 'Games', 'Productivity', 'Social', 'Utilities', 'Design', 'Education'];

export const StorePage = () => {
    const { getPublicApps } = useData();
    const [search, setSearch] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');

    const apps = getPublicApps().filter(app => {
        const matchesSearch = app.name.toLowerCase().includes(search.toLowerCase()) ||
            app.tags.some(tag => tag.toLowerCase().includes(search.toLowerCase()));
        const matchesCategory = selectedCategory === 'All' || app.category === selectedCategory;
        return matchesSearch && matchesCategory;
    });

    return (
        <div className="max-w-7xl mx-auto px-6 py-10">
            <div className="flex flex-col md:flex-row gap-8">
                {/* Sidebar Filters */}
                <div className="w-full md:w-64 flex-shrink-0 space-y-8">
                    <div className="glass-panel p-6 rounded-2xl sticky top-24">
                        <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                            <Filter className="w-5 h-5 text-primary" /> Categories
                        </h3>
                        <div className="space-y-2">
                            {CATEGORIES.map(category => (
                                <button
                                    key={category}
                                    onClick={() => setSelectedCategory(category)}
                                    className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${selectedCategory === category
                                            ? 'bg-primary text-white'
                                            : 'text-slate-400 hover:bg-white/5 hover:text-slate-200'
                                        }`}
                                >
                                    {category}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Main Content */}
                <div className="flex-1">
                    {/* Search Bar */}
                    <div className="relative mb-8">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                        <Input
                            placeholder="Search apps, tags..."
                            className="pl-12 py-3 bg-slate-900/60 border-white/10"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>

                    <div className="mb-6 flex items-baseline justify-between">
                        <h2 className="text-2xl font-bold">
                            {selectedCategory} Apps
                            <span className="text-base font-normal text-slate-500 ml-3">({apps.length})</span>
                        </h2>
                    </div>

                    {apps.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {apps.map(app => (
                                <AppCard key={app.id} app={app} />
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-20">
                            <p className="text-slate-500 text-lg">No apps found matching your criteria.</p>
                            <button
                                onClick={() => { setSearch(''); setSelectedCategory('All'); }}
                                className="text-primary hover:underline mt-2"
                            >
                                Clear filters
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
