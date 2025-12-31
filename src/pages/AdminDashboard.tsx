import { useNavigate } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
} from "recharts";
import {
  Download,
  Users,
  Search,
  Filter,
  MoreVertical,
  CheckCircle,
  XCircle,
  AlertCircle,
  ArrowUpRight,
  TrendingUp,
  Package
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useApp } from "@/context/AppContext";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { apps, vendors, updateAppStatus } = useApp();
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("adminLoggedIn");
    if (!isLoggedIn) {
      navigate("/admin/login");
    }
  }, [navigate]);

  // Aggregate stats from global data
  const stats = useMemo(() => {
    const totalUsers = 12543; // Mock for now or add to context if needed
    const totalDownloads = apps.reduce((sum, app) => sum + app.metrics.downloads, 0);
    const activeVendors = vendors.length;
    const pendingApps = apps.filter(app => app.status === 'pending' || app.status === 'review').length;

    return {
      totalUsers,
      totalDownloads,
      activeVendors,
      pendingApps
    };
  }, [apps, vendors]);

  // Filter apps
  const filteredApps = useMemo(() => {
    return apps.filter(app => {
      const matchesSearch = app.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        app.vendorName.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = filterStatus === "all" || app.status === filterStatus || (filterStatus === 'pending' && app.status === 'review');
      return matchesSearch && matchesStatus;
    });
  }, [apps, searchTerm, filterStatus]);

  // Transform data for charts (Mock for visual implementation as we don't have historical data store yet)
  const downloadsData = [
    { name: "Mon", value: 4000 },
    { name: "Tue", value: 3000 },
    { name: "Wed", value: 2000 },
    { name: "Thu", value: 2780 },
    { name: "Fri", value: 1890 },
    { name: "Sat", value: 2390 },
    { name: "Sun", value: 3490 },
  ];

  const userGrowthData = [
    { name: "Jan", users: 1000 },
    { name: "Feb", users: 2000 },
    { name: "Mar", users: 3500 },
    { name: "Apr", users: 5000 },
    { name: "May", users: 7000 },
    { name: "Jun", users: 10000 },
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "published":
      case "approved":
        return <Badge className="bg-green-500 hover:bg-green-600">Active</Badge>;
      case "pending":
      case "review":
        return <Badge variant="secondary" className="bg-yellow-500/10 text-yellow-500 hover:bg-yellow-500/20">Pending</Badge>;
      case "rejected":
        return <Badge variant="destructive">Rejected</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background py-5 pb-5">
      <Header />

      <main className="flex-1 pt-20 pb-8 px-4">
        <div className="max-w-7xl mx-auto space-y-6">
          {/* Header */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h1 className="text-3xl font-display font-bold">Admin Dashboard</h1>
              <p className="text-muted-foreground">Overview of system performance and app approvals</p>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card className="glass">
              <CardContent className="p-6">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Total Users</p>
                    <h3 className="text-2xl font-bold mt-2">{stats.totalUsers.toLocaleString()}</h3>
                  </div>
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <Users className="h-5 w-5 text-primary" />
                  </div>
                </div>
                <div className="flex items-center gap-1 mt-4 text-sm text-green-500">
                  <TrendingUp className="h-4 w-4" />
                  <span>+12% from last month</span>
                </div>
              </CardContent>
            </Card>

            <Card className="glass">
              <CardContent className="p-6">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Total Downloads</p>
                    <h3 className="text-2xl font-bold mt-2">{stats.totalDownloads.toLocaleString()}</h3>
                  </div>
                  <div className="p-2 bg-blue-500/10 rounded-lg">
                    <Download className="h-5 w-5 text-blue-500" />
                  </div>
                </div>
                <div className="flex items-center gap-1 mt-4 text-sm text-green-500">
                  <ArrowUpRight className="h-4 w-4" />
                  <span>+8.5% this week</span>
                </div>
              </CardContent>
            </Card>

            <Card className="glass">
              <CardContent className="p-6">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Active Vendors</p>
                    <h3 className="text-2xl font-bold mt-2">{stats.activeVendors}</h3>
                  </div>
                  <div className="p-2 bg-purple-500/10 rounded-lg">
                    <Package className="h-5 w-5 text-purple-500" />
                  </div>
                </div>
                <div className="flex items-center gap-1 mt-4 text-sm text-green-500">
                  <ArrowUpRight className="h-4 w-4" />
                  <span>+2 new this week</span>
                </div>
              </CardContent>
            </Card>

            <Card className="glass">
              <CardContent className="p-6">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Pending Reviews</p>
                    <h3 className="text-2xl font-bold mt-2">{stats.pendingApps}</h3>
                  </div>
                  <div className="p-2 bg-yellow-500/10 rounded-lg">
                    <AlertCircle className="h-5 w-5 text-yellow-500" />
                  </div>
                </div>
                <p className="mt-4 text-sm text-muted-foreground">Requires attention</p>
              </CardContent>
            </Card>
          </div>

          {/* Charts Row */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="glass">
              <CardHeader>
                <CardTitle>Download Trends</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={downloadsData}>
                      <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.1} />
                      <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                      <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `${value}`} />
                      <Tooltip
                        contentStyle={{ backgroundColor: 'rgba(0,0,0,0.8)', border: 'none', borderRadius: '8px' }}
                        itemStyle={{ color: '#fff' }}
                      />
                      <Bar dataKey="value" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card className="glass">
              <CardHeader>
                <CardTitle>User Growth</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={userGrowthData}>
                      <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.1} />
                      <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                      <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                      <Tooltip
                        contentStyle={{ backgroundColor: 'rgba(0,0,0,0.8)', border: 'none', borderRadius: '8px' }}
                        itemStyle={{ color: '#fff' }}
                      />
                      <Line type="monotone" dataKey="users" stroke="hsl(var(--secondary))" strokeWidth={2} dot={false} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Apps Table */}
          <Card className="glass">
            <CardHeader>
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <CardTitle>Recent App Submissions</CardTitle>
                <div className="flex gap-2 w-full md:w-auto">
                  <div className="relative flex-1 md:w-64">
                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search apps or vendors..."
                      className="pl-8"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" size="icon">
                        <Filter className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => setFilterStatus("all")}>All Status</DropdownMenuItem>
                      <DropdownMenuItem onClick={() => setFilterStatus("pending")}>Pending</DropdownMenuItem>
                      <DropdownMenuItem onClick={() => setFilterStatus("approved")}>Active</DropdownMenuItem>
                      <DropdownMenuItem onClick={() => setFilterStatus("rejected")}>Rejected</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <div className="grid grid-cols-12 gap-4 p-4 border-b bg-muted/50 font-medium text-sm">
                  <div className="col-span-4">App Name</div>
                  <div className="col-span-3">Vendor</div>
                  <div className="col-span-2">Date</div>
                  <div className="col-span-2">Status</div>
                  <div className="col-span-1">Action</div>
                </div>
                <div className="divide-y">
                  {filteredApps.map((app) => (
                    <div key={app.id} className="grid grid-cols-12 gap-4 p-4 items-center text-sm hover:bg-muted/50 transition-colors">
                      <div className="col-span-4 font-medium flex items-center gap-2">
                        <span className="text-xl">{app.icon}</span>
                        {app.name}
                      </div>
                      <div className="col-span-3 text-muted-foreground">{app.vendorName}</div>
                      <div className="col-span-2 text-muted-foreground">{app.lastUpdated}</div>
                      <div className="col-span-2">
                        {getStatusBadge(app.status)}
                      </div>
                      <div className="col-span-1 flex items-center gap-2">
                        {(app.status === 'pending' || app.status === 'review') ? (
                          <>
                            <Button
                              size="icon"
                              variant="ghost"
                              className="h-8 w-8 text-green-500 hover:text-green-600 hover:bg-green-100"
                              onClick={() => updateAppStatus(app.id, 'approved')}
                              title="Approve"
                            >
                              <CheckCircle className="h-4 w-4" />
                            </Button>
                            <Button
                              size="icon"
                              variant="ghost"
                              className="h-8 w-8 text-red-500 hover:text-red-600 hover:bg-red-100"
                              onClick={() => updateAppStatus(app.id, 'rejected')}
                              title="Reject"
                            >
                              <XCircle className="h-4 w-4" />
                            </Button>
                          </>
                        ) : (
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon" className="h-8 w-8">
                                <MoreVertical className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem onClick={() => navigate(`/admin/app/${app.id}`)}>
                                View Details
                              </DropdownMenuItem>
                              {app.status !== 'approved' && (
                                <DropdownMenuItem onClick={() => updateAppStatus(app.id, 'approved')}>
                                  Approve App
                                </DropdownMenuItem>
                              )}
                              {app.status !== 'rejected' && (
                                <DropdownMenuItem className="text-destructive" onClick={() => updateAppStatus(app.id, 'rejected')}>
                                  Reject App
                                </DropdownMenuItem>
                              )}
                            </DropdownMenuContent>
                          </DropdownMenu>
                        )}
                      </div>
                    </div>
                  ))}
                  {filteredApps.length === 0 && (
                    <div className="p-8 text-center text-muted-foreground">
                      No apps found matching your criteria
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default AdminDashboard;
