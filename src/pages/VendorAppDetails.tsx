import { useParams, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useData } from "../context/DataContext";
import { useAuth } from "../context/AuthContext";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { GlassCard } from "../components/ui/GlassCard";
import { AnalyticsChart } from "../components/ui/AnalyticsChart";
import {
  ArrowLeft,
  Package,
  Download,
  Eye,
  Calendar,
  ExternalLink,
  Edit,
  Star,
  TrendingUp
} from "lucide-react";

export const VendorAppDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { apps } = useData();
  const { user } = useAuth();

  // Find app from global state
  const app = apps.find((a) => a.id === id);

  // Check authorization - vendor can only view their own apps
  const isAuthorized = app && user && app.vendorId === user.id;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Handle various states
  if (!app) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <GlassCard className="text-center py-16 max-w-lg w-full">
          <h2 className="font-bold text-2xl mb-4">App Not Found</h2>
          <p className="text-slate-400 mb-6">The app you're looking for doesn't exist.</p>
          <Button onClick={() => navigate("/vendor/apps")}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to My Apps
          </Button>
        </GlassCard>
      </div>
    );
  }

  if (!isAuthorized) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <GlassCard className="text-center py-16 max-w-lg w-full border-red-500/20 bg-red-500/5">
          <h2 className="font-bold text-2xl mb-4 text-red-400">Unauthorized Access</h2>
          <p className="text-slate-400 mb-6">You don't have permission to view this app.</p>
          <Button variant="outline" onClick={() => navigate("/vendor/apps")}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to My Apps
          </Button>
        </GlassCard>
      </div>
    );
  }

  const statusConfig = {
    approved: { label: 'Active', variant: 'success' as const },
    review: { label: 'In Review', variant: 'warning' as const },
    pending: { label: 'In Review', variant: 'warning' as const },
    rejected: { label: 'Inactive', variant: 'destructive' as const },
    suspended: { label: 'Inactive', variant: 'destructive' as const }
  };
  // @ts-ignore
  const currentStatus = statusConfig[app?.status] || { label: 'Inactive', variant: 'secondary' as const };

  return (
    <div>
      {/* Back button */}
      <Button
        variant="ghost"
        className="mb-6"
        onClick={() => navigate("/vendor/apps")}
      >
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back to My Apps
      </Button>

      {/* App Header */}
      <GlassCard className="mb-8">
        <div className="flex flex-col md:flex-row gap-8 items-start">
          {/* App Icon */}
          <img
            src={app.iconUrl}
            alt={app.name}
            className="w-24 h-24 md:w-32 md:h-32 rounded-2xl shadow-xl"
          />

          {/* App Info */}
          <div className="flex-1 space-y-4">
            <div className="flex flex-wrap items-center gap-3">
              <Badge
                variant={currentStatus.variant}
                className="capitalize px-3 py-1"
              >
                {currentStatus.label}
              </Badge>
              <span className="text-sm text-slate-500 border-l pl-3 border-white/10">v{app.version}</span>
              <span className="text-sm text-slate-500 border-l pl-3 border-white/10">{app.category}</span>
            </div>

            <div>
              <div className="flex items-center gap-4">
                <h1 className="font-bold text-3xl md:text-4xl mb-2">
                  {app.name}
                </h1>
                {app.status === 'approved' && (
                  <Button size="sm" variant="outline" onClick={() => navigate(`/vendor/app/edit/${id}`)}>
                    <Edit className="h-4 w-4 mr-2" />
                    Update App
                  </Button>
                )}
                {app.status === 'review' && (
                  <Button size="sm" variant="outline" onClick={() => navigate(`/vendor/app/edit/${id}`)}>
                    <Edit className="h-4 w-4 mr-2" />
                    Edit Submission
                  </Button>
                )}
              </div>
              <p className="text-slate-400 text-lg max-w-2xl">{app.shortDescription}</p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 pt-4">
              <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/5">
                <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
                  <Download className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-xs text-slate-500 uppercase tracking-wider">Downloads</p>
                  <p className="text-lg font-bold">{app.downloads || '0'}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/5">
                <div className="h-10 w-10 rounded-full bg-yellow-500/20 flex items-center justify-center shrink-0">
                  <Star className="h-5 w-5 text-yellow-500" />
                </div>
                <div>
                  <p className="text-xs text-slate-500 uppercase tracking-wider">Rating</p>
                  <p className="text-lg font-bold">{app.rating || 0}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/5">
                <div className="h-10 w-10 rounded-full bg-blue-500/20 flex items-center justify-center shrink-0">
                  <Eye className="h-5 w-5 text-blue-500" />
                </div>
                <div>
                  <p className="text-xs text-slate-500 uppercase tracking-wider">Active Users</p>
                  <p className="text-lg font-bold">{app.activeUsers || '0'}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </GlassCard>

      {/* Download Tracking Graph */}
      <div className="mb-8">
        <AnalyticsChart
          title="Download Trends"
          color="#3B82F6" // Blue
          dataMap={(() => {
            const history = app.downloadHistory || [];
            const today = new Date();

            // Helper to get downloads for a specific date
            const getDownloadsForDate = (date: string) => {
              const entry = history.find(h => h.date === date);
              return entry ? entry.count : 0;
            };

            // Last 7 Days
            const last7Days = [];
            const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
            for (let i = 6; i >= 0; i--) {
              const date = new Date(today);
              date.setDate(date.getDate() - i);
              const dateStr = date.toISOString().split('T')[0];
              const dayName = dayNames[date.getDay()];
              last7Days.push({
                label: dayName,
                value: getDownloadsForDate(dateStr)
              });
            }

            // Last Month (4 weeks)
            const lastMonth = [];
            for (let week = 3; week >= 0; week--) {
              let weekTotal = 0;
              for (let day = 0; day < 7; day++) {
                const date = new Date(today);
                date.setDate(date.getDate() - (week * 7 + day));
                const dateStr = date.toISOString().split('T')[0];
                weekTotal += getDownloadsForDate(dateStr);
              }
              lastMonth.unshift({
                label: `W${4 - week}`,
                value: weekTotal
              });
            }

            // Last Year (4 quarters)
            const lastYear = [];
            for (let quarter = 3; quarter >= 0; quarter--) {
              let quarterTotal = 0;
              const startDay = quarter * 90;
              const endDay = (quarter + 1) * 90;
              for (let day = startDay; day < endDay; day++) {
                const date = new Date(today);
                date.setDate(date.getDate() - day);
                const dateStr = date.toISOString().split('T')[0];
                quarterTotal += getDownloadsForDate(dateStr);
              }
              lastYear.unshift({
                label: `Q${4 - quarter}`,
                value: quarterTotal
              });
            }

            return {
              'Last 7 Days': last7Days,
              'Last Month': lastMonth,
              'Last Year': lastYear
            };
          })()}
        />
      </div>

      {/* Additional Info */}
      <div className="grid md:grid-cols-3 gap-6">
        <GlassCard className="md:col-span-2">
          <h3 className="font-bold uppercase text-lg flex items-center gap-2 mb-6">
            <Package className="h-5 w-5 text-primary" />
            App Details
          </h3>
          <div className="space-y-6">
            <div>
              <h4 className="text-sm font-medium text-slate-500 mb-2">Description</h4>
              <p className="leading-relaxed whitespace-pre-wrap">{app.fullDescription}</p>
            </div>
            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/5">
              <div>
                <h4 className="text-sm font-medium text-slate-500 mb-1">Price</h4>
                <p className="font-semibold">{app.price === 'free' ? 'Free' : `$${app.price}`}</p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-slate-500 mb-1">Size</h4>
                <p className="font-semibold">{app.size}</p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-slate-500 mb-1">Last Updated</h4>
                <p className="font-semibold">{app.createdAt ? new Date(app.createdAt).toLocaleDateString() : 'N/A'}</p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-slate-500 mb-1">Tags</h4>
                <div className="flex flex-wrap gap-1">
                  {app.tags.map(tag => (
                    <span key={tag} className="text-xs bg-white/10 px-2 py-0.5 rounded-full">{tag}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </GlassCard>

        <GlassCard className="h-fit">
          <h3 className="font-bold uppercase text-lg flex items-center gap-2 mb-6">
            <Calendar className="h-5 w-5 text-primary" />
            Status & Actions
          </h3>
          <div className="space-y-4">
            <div className="p-4 rounded-xl bg-white/5 border border-white/5 text-center">
              <p className="text-sm text-slate-500 mb-2">Current Status</p>
              <Badge
                variant={currentStatus.variant}
                className="text-sm px-4 py-1.5"
              >
                {currentStatus.label}
              </Badge>
            </div>

            {app.status === "approved" && (
              <Button className="w-full" onClick={() => navigate(`/app/${id}`)}>
                <ExternalLink className="h-4 w-4 mr-2" />
                View Public Page
              </Button>
            )}

            {app.status === "review" && (
              <div className="text-center p-4 bg-yellow-500/10 rounded-xl border border-yellow-500/20">
                <p className="text-sm text-yellow-500">
                  Your app is currently under review. Updates will be reflected here.
                </p>
              </div>
            )}
          </div>
        </GlassCard>
      </div>
    </div>
  );
};
export default VendorAppDetails;
