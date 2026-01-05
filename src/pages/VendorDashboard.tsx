import { useNavigate } from "react-router-dom";
import { useEffect, useMemo } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from "recharts";
import {
  Plus,
  Download,
  Star,
  TrendingUp,
  Package,
  ArrowRight,
  MoreVertical,
  Activity
} from "lucide-react";
import { useApp } from "@/context/AppContext";

const COLORS = ['#8b5cf6', '#ec4899', '#3b82f6', '#10b981'];

const VendorDashboard = () => {
  const navigate = useNavigate();
  const { apps, currentUser, currentVendor, vendors, logout } = useApp();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("vendorLoggedIn");
    if (!isLoggedIn) {
      navigate("/vendor/login");
    }
  }, [navigate]);

  // Filter apps for this vendor
  const myApps = useMemo(() => {
    if (!currentVendor) return [];
    return apps.filter(app => app.vendorId === currentVendor.id);
  }, [apps, currentVendor]);

  // Calculate Vendor Stats
  const stats = useMemo(() => {
    const totalDownloads = myApps.reduce((acc, app) => acc + app.metrics.downloads, 0);
    const totalLikes = myApps.reduce((acc, app) => acc + app.metrics.likes, 0);
    const avgRating = 4.5; // Mock for now, would be aggregate of app ratings
    const totalRevenue = myApps.reduce((acc, app) => acc + app.metrics.revenue, 0);

    return { totalDownloads, totalLikes, avgRating, totalRevenue };
  }, [myApps]);

  const chartData = [
    { name: "Apr", downloads: 4000 },
    { name: "May", downloads: 3000 },
    { name: "Jun", downloads: 2000 },
    { name: "Jul", downloads: 2780 },
    { name: "Aug", downloads: 1890 },
    { name: "Sep", downloads: 2390 },
  ];

  const pieData = [
    { name: "Games", value: 400 },
    { name: "Apps", value: 300 },
    { name: "Themes", value: 300 },
    { name: "Tools", value: 200 },
  ];

  if (!currentVendor) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <Header />
        <main className="flex-1 flex items-center justify-center pt-24 pb-12">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading vendor profile...</p>
            <Button variant="link" onClick={() => window.location.reload()} className="mt-2">
              Refresh Page
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <main className="flex-1 pt-24 pb-12 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto space-y-6">

          {/* Dashboard Header */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h1 className="text-3xl font-display font-bold">Welcome back, {currentVendor.businessName}</h1>
              <p className="text-muted-foreground">Here's what's happening with your apps today.</p>
            </div>
            <div className="flex gap-3">
              <Button onClick={handleLogout} variant="outline" className="border-red-500/20 hover:bg-red-500/10 hover:text-red-500">
                Logout
              </Button>
              <Button onClick={() => navigate(`/${currentVendor.businessName}/${currentVendor.id}/upload`)} className="bg-primary hover:bg-primary/90">
                <Plus className="mr-2 h-4 w-4" /> New App
              </Button>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <Card className="glass border-primary/20 bg-primary/5">
              <CardContent className="p-5">
                <div className="flex justify-between items-start mb-2">
                  <div className="p-2 bg-primary/20 rounded-lg">
                    <Download className="h-5 w-5 text-primary" />
                  </div>
                  <span className="text-xs font-medium text-green-500 flex items-center bg-green-500/10 px-1.5 py-0.5 rounded-full">
                    <TrendingUp className="h-3 w-3 mr-1" /> +12%
                  </span>
                </div>
                <div className="space-y-1">
                  <h3 className="text-2xl font-bold">{stats.totalDownloads.toLocaleString()}</h3>
                  <p className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">Total Downloads</p>
                </div>
              </CardContent>
            </Card>

            <Card className="glass border-secondary/20 bg-secondary/5">
              <CardContent className="p-5">
                <div className="flex justify-between items-start mb-2">
                  <div className="p-2 bg-secondary/20 rounded-lg">
                    <Star className="h-5 w-5 text-secondary" />
                  </div>
                  <span className="text-xs font-medium text-green-500 flex items-center bg-green-500/10 px-1.5 py-0.5 rounded-full">
                    <TrendingUp className="h-3 w-3 mr-1" /> +5%
                  </span>
                </div>
                <div className="space-y-1">
                  <h3 className="text-2xl font-bold">{stats.avgRating}</h3>
                  <p className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">Avg Rating</p>
                </div>
              </CardContent>
            </Card>

            <Card className="glass border-purple-500/20 bg-purple-500/5">
              <CardContent className="p-5">
                <div className="flex justify-between items-start mb-2">
                  <div className="p-2 bg-purple-500/20 rounded-lg">
                    <Package className="h-5 w-5 text-purple-500" />
                  </div>
                </div>
                <div className="space-y-1">
                  <h3 className="text-2xl font-bold">{myApps.length}</h3>
                  <p className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">Live Apps</p>
                </div>
              </CardContent>
            </Card>

            <Card className="glass border-blue-500/20 bg-blue-500/5">
              <CardContent className="p-5">
                <div className="flex justify-between items-start mb-2">
                  <div className="p-2 bg-blue-500/20 rounded-lg">
                    <Activity className="h-5 w-5 text-blue-500" />
                  </div>
                </div>
                <div className="space-y-1">
                  <h3 className="text-2xl font-bold">${stats.totalRevenue.toLocaleString()}</h3>
                  <p className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">Revenue</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Charts Area */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="glass lg:col-span-2">
              <CardHeader>
                <CardTitle>Performance Overview</CardTitle>
              </CardHeader>
              <CardContent className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.1} />
                    <XAxis dataKey="name" fontSize={12} tickLine={false} axisLine={false} />
                    <YAxis fontSize={12} tickLine={false} axisLine={false} />
                    <Tooltip
                      contentStyle={{ backgroundColor: '#1a1a2e', border: 'none', borderRadius: '8px' }}
                      itemStyle={{ color: '#fff' }}
                    />
                    <Bar dataKey="downloads" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card className="glass">
              <CardHeader>
                <CardTitle>Downloads by Category</CardTitle>
              </CardHeader>
              <CardContent className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={pieData}
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {pieData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{ backgroundColor: '#1a1a2e', border: 'none', borderRadius: '8px' }}
                      itemStyle={{ color: '#fff' }}
                    />
                  </PieChart>
                </ResponsiveContainer>
                <div className="flex justify-center gap-4 mt-4 text-xs text-muted-foreground">
                  {pieData.map((entry, index) => (
                    <div key={entry.name} className="flex items-center gap-1">
                      <div className="w-2 h-2 rounded-full" style={{ backgroundColor: COLORS[index % COLORS.length] }} />
                      {entry.name}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Apps List */}
          <Card className="glass">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Your Apps</CardTitle>
              <Button variant="ghost" className="text-sm" onClick={() => navigate("/vendor/my-apps")}>
                View All <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {myApps.slice(0, 5).map((app) => (
                  <div
                    key={app.id}
                    onClick={() => navigate(`/vendor/app/${app.id}`)}
                    className="flex items-center justify-between p-3 rounded-lg hover:bg-white/5 transition-colors border border-transparent hover:border-white/10 group cursor-pointer"
                  >
                    <div className="flex items-center gap-4">
                      <div className="text-2xl w-10 h-10 flex items-center justify-center bg-muted/30 rounded-lg">
                        {app.icon}
                      </div>
                      <div>
                        <h4 className="font-semibold text-sm">{app.name}</h4>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge
                            variant={app.status === "approved" ? "default" : app.status === "rejected" ? "destructive" : "secondary"}
                            className="text-[10px] px-1.5 py-0 h-5"
                          >
                            {app.status}
                          </Badge>
                          <span className="text-xs text-muted-foreground">{app.category}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-6">
                      <div className="text-right hidden sm:block">
                        <p className="text-sm font-bold">{app.metrics.downloads.toLocaleString()}</p>
                        <p className="text-[10px] text-muted-foreground">Downloads</p>
                      </div>
                      <div className="text-right hidden sm:block">
                        <p className="text-sm font-bold">${app.price === "free" ? "0.00" : app.price}</p>
                        <p className="text-[10px] text-muted-foreground">Price</p>
                      </div>
                      <Button size="icon" variant="ghost" className="opacity-0 group-hover:opacity-100 transition-opacity">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
                {myApps.length === 0 && (
                  <div className="text-center py-10 text-muted-foreground">
                    You haven't uploaded any apps yet.
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default VendorDashboard;
