import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState, useMemo } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ArrowLeft,
  Package,
  Download,
  Heart,
  CheckCircle,
  Clock,
  XCircle,
  ExternalLink,
  User,
  Eye,
  DollarSign
} from "lucide-react";
import { useApp } from "@/context/AppContext";

const AdminAppDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { apps, vendors, updateAppStatus } = useApp();

  // Find app and vendor from global state
  const app = useMemo(() => apps.find(a => a.id === id), [apps, id]);
  const vendor = useMemo(() =>
    app ? vendors.find(v => v.id === app.vendorId) : null,
    [app, vendors]);

  useEffect(() => {
    window.scrollTo(0, 0);
    const isLoggedIn = localStorage.getItem("adminLoggedIn");
    if (!isLoggedIn) {
      navigate("/admin/login");
      return;
    }
  }, [navigate]);

  const handleStatusUpdate = (status: 'approved' | 'rejected') => {
    if (app) {
      updateAppStatus(app.id, status);
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "approved": return <CheckCircle className="h-5 w-5 text-green-500" />;
      case "review": return <Clock className="h-5 w-5 text-yellow-500" />;
      case "rejected": return <XCircle className="h-5 w-5 text-red-500" />;
      default: return null;
    }
  };

  if (!app || !vendor) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="pt-24 pb-16 container mx-auto px-4">
          <div className="text-center py-16 glass rounded-2xl">
            <div className="text-5xl mb-4">😕</div>
            <h2 className="font-display font-semibold text-2xl mb-2">App Not Found</h2>
            <p className="text-muted-foreground mb-6">
              The app you're looking for doesn't exist or vendor data is missing.
            </p>
            <Button variant="gradient" onClick={() => navigate("/admin/dashboard")}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Dashboard
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="pt-20 pb-12">
        <div className="container mx-auto px-4 max-w-5xl">
          {/* Back button */}
          <Button
            variant="ghost"
            size="sm"
            className="mb-4 h-8 px-2 text-muted-foreground hover:text-foreground"
            onClick={() => navigate("/admin/dashboard")}
          >
            <ArrowLeft className="h-4 w-4 mr-1.5" />
            Back to Dashboard
          </Button>

          {/* App Header */}
          <Card className="glass mb-6 overflow-hidden border-border/50">
            <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
              <Package className="w-64 h-64 text-primary" />
            </div>
            <CardHeader className="p-6 relative z-10">
              <div className="flex flex-col sm:flex-row gap-5 items-start">
                {/* App Icon */}
                <div className="w-20 h-20 rounded-xl bg-primary/10 flex items-center justify-center shrink-0 border border-primary/20 text-4xl">
                  {app.icon}
                </div>

                {/* App Info */}
                <div className="flex-1 w-full">
                  <div className="flex flex-wrap items-center justify-between gap-4 mb-2">
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-2">
                        {getStatusIcon(app.status)}
                        <Badge
                          variant={app.status === "approved" ? "default" : app.status === "rejected" ? "destructive" : "secondary"}
                          className="text-xs py-0.5 uppercase"
                        >
                          {app.status}
                        </Badge>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      {/* Verify Buttons */}
                      {app.status !== 'rejected' && (
                        <Button
                          variant="destructive"
                          size="sm"
                          className="h-8 text-xs"
                          onClick={() => handleStatusUpdate('rejected')}
                        >
                          Reject App
                        </Button>
                      )}

                      {app.status !== 'approved' && (
                        <Button
                          variant="default"
                          size="sm"
                          className="h-8 text-xs bg-green-600 hover:bg-green-700"
                          onClick={() => handleStatusUpdate('approved')}
                        >
                          Approve App
                        </Button>
                      )}

                      {app.status === "approved" && (
                        <Button variant="outline" size="sm" className="h-8 text-xs" onClick={() => navigate(`/app/${id}`)}>
                          <ExternalLink className="h-3 w-3 mr-1.5" />
                          View Public Page
                        </Button>
                      )}
                    </div>
                  </div>

                  <CardTitle className="font-display font-bold text-2xl sm:text-3xl mb-1 leading-tight">
                    {app.name}
                  </CardTitle>
                  <p className="text-muted-foreground mb-4">{app.shortDescription}</p>

                  {/* Vendor & Stats Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
                    {/* Vendor Info */}
                    <div className="flex items-center gap-3 p-2.5 rounded-lg bg-muted/40 border border-border/40">
                      <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center shrink-0">
                        <User className="h-4 w-4 text-muted-foreground" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-[10px] uppercase text-muted-foreground font-semibold">Vendor</p>
                        <p className="font-medium text-sm truncate">{vendor.businessName}</p>
                      </div>
                    </div>

                    {/* Downloads */}
                    <div className="flex items-center gap-3 p-2.5 rounded-lg bg-muted/40 border border-border/40">
                      <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                        <Download className="h-4 w-4 text-primary" />
                      </div>
                      <div>
                        <p className="text-[10px] uppercase text-muted-foreground font-semibold">Downloads</p>
                        <p className="font-bold text-sm">{app.metrics.downloads.toLocaleString()}</p>
                      </div>
                    </div>

                    {/* Likes */}
                    <div className="flex items-center gap-3 p-2.5 rounded-lg bg-muted/40 border border-border/40">
                      <div className="h-8 w-8 rounded-full bg-secondary/10 flex items-center justify-center shrink-0">
                        <Heart className="h-4 w-4 text-secondary" />
                      </div>
                      <div>
                        <p className="text-[10px] uppercase text-muted-foreground font-semibold">Likes</p>
                        <p className="font-bold text-sm">{app.metrics.likes.toLocaleString()}</p>
                      </div>
                    </div>

                    {/* Revenue */}
                    <div className="flex items-center gap-3 p-2.5 rounded-lg bg-muted/40 border border-border/40">
                      <div className="h-8 w-8 rounded-full bg-green-500/10 flex items-center justify-center shrink-0">
                        <DollarSign className="h-4 w-4 text-green-500" />
                      </div>
                      <div>
                        <p className="text-[10px] uppercase text-muted-foreground font-semibold">Revenue</p>
                        <p className="font-bold text-sm">${app.metrics.revenue.toLocaleString()}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardHeader>
          </Card>

          <div className="grid md:grid-cols-3 gap-6">
            {/* Main Content */}
            <div className="md:col-span-2 space-y-6">
              {/* Description */}
              <Card className="glass p-5 border-border/50">
                <h2 className="font-display font-semibold text-lg mb-3 flex items-center gap-2">
                  About this app
                </h2>
                <p className="text-sm text-muted-foreground leading-relaxed text-justify">
                  {app.description}
                </p>
              </Card>

              {/* Tags */}
              <Card className="glass p-5 border-border/50">
                <h2 className="font-display font-semibold text-lg mb-3">Tags</h2>
                <div className="flex flex-wrap gap-1.5">
                  {app.tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="text-xs font-normal py-0.5 px-2 bg-muted hover:bg-muted/80 text-foreground">
                      #{tag}
                    </Badge>
                  ))}
                </div>
              </Card>
            </div>

            {/* Sidebar Info */}
            <div className="space-y-4">
              <Card className="glass p-4 border-border/50">
                <h3 className="font-display font-semibold text-sm uppercase tracking-wider text-muted-foreground mb-3">Subscription Details</h3>
                <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                  <span className="text-sm font-medium">Plan Type</span>
                  <Badge
                    variant={vendor.subscription === "premium" ? "default" : vendor.subscription === "standard" ? "secondary" : "outline"}
                    className="capitalize"
                  >
                    {vendor.subscription}
                  </Badge>
                </div>
              </Card>

              <Card className="glass p-4 border-border/50">
                <h3 className="font-display font-semibold text-sm uppercase tracking-wider text-muted-foreground mb-3">App Info</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between py-1 border-b border-border/40">
                    <span className="text-muted-foreground">Category</span>
                    <span className="font-medium">{app.category}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-border/40">
                    <span className="text-muted-foreground">Version</span>
                    <span className="font-medium">{app.version}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-border/40">
                    <span className="text-muted-foreground">Last Updated</span>
                    <span className="font-medium">{app.lastUpdated}</span>
                  </div>
                  <div className="flex justify-between py-1">
                    <span className="text-muted-foreground">Price</span>
                    <span className="font-medium">{app.price === 'free' ? 'Free' : `$${app.price}`}</span>
                  </div>
                </div>
              </Card>

              <Card className="glass p-4 border-border/50">
                <h3 className="font-display font-semibold text-sm uppercase tracking-wider text-muted-foreground mb-3">Vendor Info</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between py-1 border-b border-border/40">
                    <span className="text-muted-foreground">Joined</span>
                    <span className="font-medium">{vendor.joinedDate}</span>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default AdminAppDetails;

