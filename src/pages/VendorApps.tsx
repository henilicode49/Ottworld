import { useParams, Link } from "react-router-dom";
import { useEffect, useMemo } from "react";
import { mockApps } from "@/data/apps";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AppCard from "@/components/AppCard";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Building2, Download, Star, Package } from "lucide-react";
import { toast } from "sonner";

const formatDownloads = (downloads: number): string => {
  if (downloads >= 1000000) {
    return `${(downloads / 1000000).toFixed(1)}M`;
  }
  if (downloads >= 1000) {
    return `${(downloads / 1000).toFixed(0)}K`;
  }
  return downloads.toString();
};

const VendorApps = () => {
  const { vendorName } = useParams();
  const decodedName = decodeURIComponent(vendorName || "");

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [vendorName]);

  const vendorApps = useMemo(() => {
    return mockApps.filter((app) => app.vendorName === decodedName);
  }, [decodedName]);

  const stats = useMemo(() => {
    const totalDownloads = vendorApps.reduce((sum, app) => sum + app.metrics.downloads, 0);
    const avgRating = vendorApps.length > 0
      ? 4.5
      : 0;
    return { totalDownloads, avgRating: avgRating.toFixed(1) };
  }, [vendorApps]);

  const handleDownload = (app: typeof mockApps[0]) => {
    toast.success(`Starting download: ${app.name}`, {
      description: `Version ${app.version} • ${app.size}`,
    });
  };

  if (vendorApps.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="pt-24 pb-16 container mx-auto px-4">
          <div className="text-center py-16 glass rounded-2xl">
            <div className="text-5xl mb-4">😕</div>
            <h2 className="font-display font-semibold text-2xl mb-2">Vendor Not Found</h2>
            <p className="text-muted-foreground mb-6">
              No apps found for this vendor.
            </p>
            <Link to="/">
              <Button variant="gradient">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Marketplace
              </Button>
            </Link>
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
        <div className="container mx-auto px-4 max-w-6xl">
          {/* Back button */}
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground hover:text-primary mb-4 transition-colors"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Back to Marketplace
          </Link>

          {/* Vendor Header */}
          <div className="glass rounded-xl p-5 mb-8 border border-border/50 shadow-sm">
            <div className="flex flex-col sm:flex-row gap-5 items-center sm:items-start text-center sm:text-left">
              {/* Vendor Icon */}
              <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center shrink-0 border border-border/50 shadow-inner">
                <Building2 className="w-8 h-8 text-primary" />
              </div>

              {/* Vendor Info */}
              <div className="flex-1 min-w-0">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div>
                    <h1 className="font-display font-bold text-xl sm:text-2xl mb-1 uppercase tracking-tight text-foreground">
                      {decodedName}
                    </h1>
                    <p className="text-xs text-muted-foreground font-medium">
                      Verified App Publisher
                    </p>
                  </div>

                  {/* Stats */}
                  <div className="flex items-center gap-3 sm:gap-6 bg-card/40 rounded-lg p-2 sm:px-4 sm:py-2 border border-border/30">
                    <div className="text-center px-2">
                      <div className="flex items-center justify-center gap-1.5 text-foreground mb-0.5">
                        <Package className="h-4 w-4 text-primary" />
                        <span className="font-bold text-sm">{vendorApps.length}</span>
                      </div>
                      <span className="text-[10px] text-muted-foreground uppercase tracking-wider font-semibold">Apps</span>
                    </div>
                    <div className="w-px h-8 bg-border/50 hidden sm:block"></div>
                    <div className="text-center px-2">
                      <div className="flex items-center justify-center gap-1.5 text-foreground mb-0.5">
                        <Download className="h-4 w-4 text-primary" />
                        <span className="font-bold text-sm">{formatDownloads(stats.totalDownloads)}</span>
                      </div>
                      <span className="text-[10px] text-muted-foreground uppercase tracking-wider font-semibold">Downloads</span>
                    </div>
                    <div className="w-px h-8 bg-border/50 hidden sm:block"></div>
                    <div className="text-center px-2">
                      <div className="flex items-center justify-center gap-1.5 text-foreground mb-0.5">
                        <Star className="h-4 w-4 fill-warning text-warning" />
                        <span className="font-bold text-sm">{stats.avgRating}</span>
                      </div>
                      <span className="text-[10px] text-muted-foreground uppercase tracking-wider font-semibold">Rating</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Apps Section */}
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              <h2 className="font-display font-semibold text-lg">
                Apps by {decodedName}
              </h2>
              <span className="text-xs text-muted-foreground bg-muted px-2 py-0.5 rounded-full font-medium">
                {vendorApps.length}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {vendorApps.map((app) => (
                <div key={app.id} className="transform transition-all duration-300 hover:-translate-y-1">
                  <AppCard
                    app={app}
                    onDownload={handleDownload}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default VendorApps;
