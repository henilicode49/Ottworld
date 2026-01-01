import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useApp } from "@/context/AppContext";
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
  Eye,
  Calendar,
  ExternalLink
} from "lucide-react";

const VendorAppDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { apps, currentVendor } = useApp();

  // Find app from global state
  const app = apps.find((a) => a.id === id);

  // Check authorization
  const isAuthorized = app && currentVendor && app.vendorId === currentVendor.id;

  useEffect(() => {
    window.scrollTo(0, 0);
    const isLoggedIn = localStorage.getItem("vendorLoggedIn");

    if (!isLoggedIn) {
      navigate("/vendor/login");
      return;
    }
  }, [navigate]);

  // Handle various states
  if (!app) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center pt-24 pb-16 px-4">
          <div className="text-center py-16 glass rounded-2xl max-w-lg w-full">
            <div className="text-5xl mb-4">😕</div>
            <h2 className="font-display font-semibold text-2xl mb-2">App Not Found</h2>
            <p className="text-muted-foreground mb-6">
              The app you're looking for doesn't exist.
            </p>
            <Button variant="gradient" onClick={() => navigate("/vendor/dashboard")}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Dashboard
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!isAuthorized) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center pt-24 pb-16 px-4">
          <div className="text-center py-16 glass rounded-2xl max-w-lg w-full border-red-500/20 bg-red-500/5">
            <div className="text-5xl mb-4">🚫</div>
            <h2 className="font-display font-semibold text-2xl mb-2 text-red-500">Unauthorized Access</h2>
            <p className="text-muted-foreground mb-6">
              You do not have permission to view or manage this app.
            </p>
            <Button variant="outline" onClick={() => navigate("/vendor/dashboard")}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Return to Safe Zone
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />

      <main className="flex-1 pt-24 pb-16 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          {/* Back button */}
          <Button
            variant="ghost"
            className="mb-6 hover:bg-primary/10"
            onClick={() => navigate("/vendor/dashboard")}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Dashboard
          </Button>

          {/* App Header */}
          <Card className="glass mb-8 border-primary/20">
            <CardHeader>
              <div className="flex flex-col md:flex-row gap-8 items-start">
                {/* App Icon */}
                <div className="w-24 h-24 md:w-32 md:h-32 rounded-2xl bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center shrink-0 border border-white/10 shadow-xl">
                  <span className="text-4xl md:text-5xl">{app.icon}</span>
                </div>

                {/* App Info */}
                <div className="flex-1 space-y-4">
                  <div className="flex flex-wrap items-center gap-3">
                    <Badge
                      variant={app.status === "approved" ? "default" : app.status === "rejected" ? "destructive" : "secondary"}
                      className="capitalize px-3 py-1"
                    >
                      {app.status}
                    </Badge>
                    <span className="text-sm text-muted-foreground border-l pl-3 border-white/10">v{app.version}</span>
                    <span className="text-sm text-muted-foreground border-l pl-3 border-white/10">{app.category}</span>
                  </div>

                  <div>
                    <CardTitle className="font-display font-bold text-3xl md:text-4xl mb-2">
                      {app.name}
                    </CardTitle>
                    <p className="text-muted-foreground text-lg max-w-2xl">{app.shortDescription}</p>
                  </div>

                  {/* Stats */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4">
                    <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/5">
                      <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
                        <Download className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground uppercase tracking-wider">Downloads</p>
                        <p className="text-lg font-bold">{app.metrics.downloads.toLocaleString()}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/5">
                      <div className="h-10 w-10 rounded-full bg-secondary/20 flex items-center justify-center shrink-0">
                        <Heart className="h-5 w-5 text-secondary" />
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground uppercase tracking-wider">Likes</p>
                        <p className="text-lg font-bold">{app.metrics.likes.toLocaleString()}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/5">
                      <div className="h-10 w-10 rounded-full bg-blue-500/20 flex items-center justify-center shrink-0">
                        <Eye className="h-5 w-5 text-blue-500" />
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground uppercase tracking-wider">Views</p>
                        <p className="text-lg font-bold">{app.metrics.views.toLocaleString()}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardHeader>
          </Card>

          {/* Additional Info */}
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="glass md:col-span-2">
              <CardHeader>
                <CardTitle className="font-display uppercase text-lg flex items-center gap-2">
                  <Package className="h-5 w-5 text-primary" />
                  App Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground mb-2">Description</h4>
                  <p className="leading-relaxed whitespace-pre-wrap">{app.description}</p>
                </div>
                <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/5">
                  <div>
                    <h4 className="text-sm font-medium text-muted-foreground mb-1">Price</h4>
                    <p className="font-semibold">{app.price === 'free' ? 'Free' : `$${app.price}`}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-muted-foreground mb-1">Size</h4>
                    <p className="font-semibold">{app.size}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-muted-foreground mb-1">Last Updated</h4>
                    <p className="font-semibold">{app.lastUpdated}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-muted-foreground mb-1">Tags</h4>
                    <div className="flex flex-wrap gap-1">
                      {app.tags.map(tag => (
                        <span key={tag} className="text-xs bg-white/10 px-2 py-0.5 rounded-full">{tag}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="glass h-fit">
              <CardHeader>
                <CardTitle className="font-display uppercase text-lg flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-primary" />
                  Status & Actions
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 rounded-xl bg-white/5 border border-white/5 text-center">
                  <p className="text-sm text-muted-foreground mb-2">Current Status</p>
                  <Badge
                    variant={app.status === "approved" ? "default" : app.status === "rejected" ? "destructive" : "secondary"}
                    className="text-sm px-4 py-1.5"
                  >
                    {app.status.toUpperCase()}
                  </Badge>
                </div>

                {app.status === "approved" && (
                  <Button variant="gradient" className="w-full" onClick={() => navigate(`/app/${id}`)}>
                    <ExternalLink className="h-4 w-4 mr-2" />
                    View Public Page
                  </Button>
                )}

                {app.status === "review" && (
                  <div className="text-center p-4 bg-yellow-500/10 rounded-xl border border-yellow-500/20">
                    <p className="text-sm text-yellow-500">
                      Your app is currently undefined review. Updates will be reflected here.
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default VendorAppDetails;

