import React, { useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';
import { GlassCard } from '../../components/ui/GlassCard';
import { Badge } from '../../components/ui/Badge';
import { AppCard } from '../../components/AppCard';
import axios from 'axios';

export const VendorDashboard = () => {
    const { user } = useAuth();
    const { getVendorApps } = useData();

    const myApps = getVendorApps(user.id);
    const approvedCount = myApps.filter(a => a.status === 'approved').length;
    const pendingCount = myApps.filter(a => a.status === 'pending').length;
    const totalDownloads = myApps.length * 1234; // Mock stat
    // const [userData, setUserData] = useState(null)

    // useEffect(() => {
    //     (async () => {
    //         const resultdata = await axios.post("http://122.167.187.175:4001/api/restaurant_login", { username: "priyank.icode49@gmail.com", password: "VP1VMXbj" })
    //         console.log("resultdata", resultdata);
    //         setUserData(resultdata?.data)
    //     })()


    // }, []);
    return (
        <div>
            <div className="mb-8">
                <h1 className="text-3xl font-bold mb-2">Hello, {user.name}</h1>
                <p className="text-slate-400">Here's what's happening with your apps today.</p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-6 mb-8 md:mb-10">
                <GlassCard className="p-4 md:p-6 bg-blue-500/10 border-blue-500/20">
                    <p className="text-xs md:text-base text-slate-400 mb-1 md:mb-2">Total Apps</p>
                    <div className="text-2xl md:text-4xl font-bold">{myApps.length}</div>
                </GlassCard>
                <GlassCard className="p-4 md:p-6 bg-green-500/10 border-green-500/20">
                    <p className="text-xs md:text-base text-slate-400 mb-1 md:mb-2">Live Apps</p>
                    <div className="text-2xl md:text-4xl font-bold text-green-400">{approvedCount}</div>
                </GlassCard>
                <GlassCard className="col-span-2 md:col-span-1 p-4 md:p-6 bg-purple-500/10 border-purple-500/20">
                    <p className="text-xs md:text-base text-slate-400 mb-1 md:mb-2">Total Downloads (Est.)</p>
                    <div className="text-2xl md:text-4xl font-bold text-purple-400">{totalDownloads.toLocaleString()}</div>
                </GlassCard>
            </div>

            <h2 className="text-2xl font-bold mb-6">Recent Status</h2>
            {myApps.length > 0 ? (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {myApps.slice(0, 4).map(app => (
                        <div key={app.id} className="glass-panel p-4 rounded-xl flex items-center gap-4">
                            <img src={app.iconUrl} alt="" className="w-12 h-12 rounded-lg bg-slate-800" />
                            <div className="flex-1">
                                <h4 className="font-bold text-slate-200">{app.name}</h4>
                                <p className="text-xs text-slate-500">v{app.version} • {new Date(app.createdAt).toLocaleDateString()}</p>
                            </div>
                            <Badge status={app.status} />
                        </div>
                    ))}
                </div>
            ) : (
                <div className="text-center py-10 text-slate-500">
                    You haven't uploaded any apps yet.
                </div>
            )}
        </div>
    );
};
