import React from 'react';
import { Link } from 'react-router-dom';
import { useData } from '../../context/DataContext';
import { AppCard } from '../../components/AppCard';
import { Button } from '../../components/ui/Button';
import { HeroCarousel } from '../../components/HeroCarousel';
import { TopCharts } from '../../components/ui/TopCharts';
import { ArrowRight, Sparkles, TrendingUp, Trophy } from 'lucide-react';

export const HomePage = () => {
    const { getPublicApps } = useData();
    const approvedApps = getPublicApps();

    // Group apps
    const editorsChoice = approvedApps.filter(a => a.tags?.includes('Editors Choice') || a.rating >= 4.5);
    const trending = approvedApps.filter(a => a.tags?.includes('Trending') || a.rating >= 4.0);
    const newReleases = approvedApps.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).slice(0, 5);

    // Sort apps by downloads (simulated string sort or just length)
    // For Top Charts, we'll just take the top 5 trending/approved
    const topApps = [...approvedApps].sort((a, b) => b.rating - a.rating).slice(0, 5);

    const Swimlane = ({ title, icon: Icon, apps }) => (
        <section className="mb-12">
            <div className="flex items-center justify-between mb-6 px-6 max-w-7xl mx-auto">
                <h2 className="text-2xl font-bold flex items-center gap-2">
                    {Icon && <Icon className="w-6 h-6 text-primary" />}
                    {title}
                </h2>
                <Link to="/store" className="text-primary hover:text-primary/80 font-medium text-sm flex items-center gap-1">
                    View all <ArrowRight className="w-4 h-4" />
                </Link>
            </div>
            <div className="px-6 max-w-7xl mx-auto overflow-x-auto pb-4 no-scrollbar -mx-6 md:mx-auto md:overflow-visible">
                <div className="flex gap-6 w-max md:w-full md:grid md:grid-cols-2 lg:grid-cols-4">
                    {apps.map(app => (
                        <div key={app.id} className="w-[280px] md:w-auto">
                            <AppCard app={app} />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );

    return (
        <div className="pb-20">
            {/* Hero Section */}
            <div className="max-w-7xl mx-auto px-6 py-8">
                <HeroCarousel featuredApps={editorsChoice} />
            </div>

            <div className="max-w-7xl mx-auto px-6 mb-16">
                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Main Content: Trending Apps Grid (Replaces Stories) */}
                    <div className="flex-1">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-2xl font-bold flex items-center gap-2">
                                <TrendingUp className="w-6 h-6 text-primary" />
                                Trending Now
                            </h2>
                            <Link to="/store" className="text-primary hover:text-primary/80 font-medium text-sm flex items-center gap-1">
                                View all <ArrowRight className="w-4 h-4" />
                            </Link>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {trending.slice(0, 6).map(app => (
                                <AppCard key={app.id} app={app} />
                            ))}
                        </div>
                    </div>

                    {/* Top Charts Sidebar */}
                    <div className="w-full lg:w-96">
                        <div className="bg-white/5 border border-white/5 rounded-3xl p-6 sticky top-24 backdrop-blur-sm">
                            <div className="flex items-center gap-2 mb-6">
                                <Trophy className="w-5 h-5 text-yellow-500" />
                                <h3 className="text-xl font-bold">Top Charts</h3>
                            </div>
                            <TopCharts apps={topApps} />
                        </div>
                    </div>
                </div>
            </div>

            {/* Swimlanes */}
            <Swimlane title="New & Updated" icon={Sparkles} apps={newReleases} />
        </div>
    );
};

