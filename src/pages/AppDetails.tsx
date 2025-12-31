import { useParams, Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useApp } from "@/context/AppContext";
import {
  Star,
  Download,
  ArrowLeft,
  Calendar,
  HardDrive,
  User,
  ShieldAlert,
  Clock
} from "lucide-react";
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

const AppDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { apps } = useApp();
  const app = apps.find((a) => a.id === id);

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!app) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="pt-24 pb-16 container mx-auto px-4">
          <div className="text-center py-16 glass rounded-2xl">
            <div className="text-5xl mb-4">😕</div>
            <h2 className="font-display font-semibold text-2xl mb-2">App Not Found</h2>
            <p className="text-muted-foreground mb-6">
              The app you're looking for doesn't exist or has been removed.
            </p>
            <Button variant="gradient" onClick={() => navigate("/")}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Marketplace
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const handleDownload = () => {
    if (!app.downloadUrl) {
      toast.error("Download Unavailable", {
        description: "No file was added by the vendor for this app.",
      });
      return;
    }

    toast.success(`Starting download: ${app.name}`, {
      description: `Version ${app.version} • ${app.size}`,
    });

    // Trigger download
    const link = document.createElement('a');
    link.href = app.downloadUrl;
    link.download = `${app.name.replace(/\s+/g, '_')}_v${app.version}.zip`; // Default name
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="pt-20 pb-12">
        <div className="container mx-auto px-4 max-w-5xl">
          {/* Back button */}
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground hover:text-primary mb-4 transition-colors"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Back to Marketplace
          </Link>

          {/* App Header */}
          <div className="glass rounded-xl p-5 mb-6 border border-border/50 shadow-sm relative overflow-hidden">
            {/* Background Glow */}
            <div className="absolute top-0 right-0 -tralslate-y-1/2 translate-x-1/2 w-64 h-64 bg-primary/5 blur-3xl rounded-full pointer-events-none"></div>

            <div className="flex flex-col sm:flex-row gap-5 items-start relative z-10">
              {/* App Icon */}
              <div className="w-24 h-24 rounded-xl bg-muted flex items-center justify-center text-4xl shrink-0 border border-border/50 shadow-inner">
                {app.icon}
              </div>

              {/* App Info */}
              <div className="flex-1 min-w-0 w-full">
                <div className="flex flex-wrap items-center gap-2 mb-1.5">
                  {app.isFeatured &&
                    <Badge variant="featured" className="py-0 px-2 h-5 text-[10px] uppercase tracking-wider">
                      Featured
                    </Badge>
                  }
                  <Badge variant="category" className="py-0 px-2 h-5 text-[10px] uppercase tracking-wider bg-secondary/10 text-secondary border-secondary/20">
                    {app.category}
                  </Badge>
                  {app.isMature && (
                    <Badge variant="destructive" className="py-0 px-2 h-5 text-[10px] uppercase tracking-wider">
                      <ShieldAlert className="h-3 w-3 mr-1" />
                      18+
                    </Badge>
                  )}
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <h1 className="font-display font-bold text-2xl sm:text-3xl mb-1 leading-tight">
                      {app.name}
                    </h1>
                    <Link
                      to={`/vendor/${encodeURIComponent(app.vendorName)}`}
                      className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center gap-1.5 w-fit"
                    >
                      <User className="h-3.5 w-3.5" />
                      {app.vendorName}
                    </Link>
                  </div>

                  <div className="flex items-center gap-3 mt-2 sm:mt-0">
                    <Button variant="gradient" size="sm" className="h-9 px-6 shadow-md shadow-primary/20" onClick={handleDownload}>
                      <Download className="h-4 w-4 mr-2" />
                      Download
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            {/* Key Stats Bar */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6 pt-4 border-t border-border/40">
              <div className="flex items-center gap-2.5">
                <div className="p-1.5 rounded-md bg-primary/10 text-primary">
                  <Download className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-[10px] text-muted-foreground uppercase font-semibold">Downloads</p>
                  <p className="text-sm font-bold">{formatDownloads(app.metrics.downloads)}</p>
                </div>
              </div>
              <div className="flex items-center gap-2.5">
                <div className="p-1.5 rounded-md bg-warning/10 text-warning">
                  <Star className="h-4 w-4 fill-current" />
                </div>
                <div>
                  <p className="text-[10px] text-muted-foreground uppercase font-semibold">Rating</p>
                  <p className="text-sm font-bold">4.8 <span className="text-[10px] text-muted-foreground font-normal">(12k)</span></p>
                </div>
              </div>
              <div className="flex items-center gap-2.5">
                <div className="p-1.5 rounded-md bg-muted text-foreground">
                  <HardDrive className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-[10px] text-muted-foreground uppercase font-semibold">Size</p>
                  <p className="text-sm font-bold">{app.size}</p>
                </div>
              </div>
              <div className="flex items-center gap-2.5">
                <div className="p-1.5 rounded-md bg-muted text-foreground">
                  <Clock className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-[10px] text-muted-foreground uppercase font-semibold">Version</p>
                  <p className="text-sm font-bold">{app.version}</p>
                </div>
              </div>
            </div>
          </div>

          {/* App Details Content */}
          <div className="grid md:grid-cols-3 gap-6">
            {/* Main Content */}
            <div className="md:col-span-2 space-y-6">
              <div className="glass rounded-xl p-5 border border-border/50">
                <h2 className="font-display font-semibold text-lg mb-3 flex items-center gap-2">
                  About this app
                </h2>
                <p className="text-sm text-muted-foreground leading-relaxed text-justify">
                  {app.description}
                </p>
              </div>

              {/* Tags */}
              <div className="glass rounded-xl p-5 border border-border/50">
                <h2 className="font-display font-semibold text-lg mb-3">Tags</h2>
                <div className="flex flex-wrap gap-1.5">
                  {app.tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="text-xs font-normal py-0.5 px-2 bg-muted hover:bg-muted/80 text-foreground">
                      #{tag}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar Info */}
            <div className="space-y-4">
              <div className="glass rounded-xl p-5 border border-border/50">
                <h3 className="font-display font-semibold text-sm uppercase tracking-wider text-muted-foreground mb-4">Information</h3>
                <div className="space-y-4 text-sm">
                  <div className="flex justify-between items-center py-1 border-b border-border/40 pb-2">
                    <span className="text-muted-foreground">Provider</span>
                    <Link to={`/vendor/${encodeURIComponent(app.vendorName)}`} className="font-medium hover:text-primary truncate max-w-[120px]">
                      {app.vendorName}
                    </Link>
                  </div>
                  <div className="flex justify-between items-center py-1 border-b border-border/40 pb-2">
                    <span className="text-muted-foreground">Category</span>
                    <span className="font-medium">{app.category}</span>
                  </div>
                  <div className="flex justify-between items-center py-1 border-b border-border/40 pb-2">
                    <span className="text-muted-foreground">Updated</span>
                    <span className="font-medium">{app.lastUpdated}</span>
                  </div>
                  <div className="flex justify-between items-center py-1">
                    <span className="text-muted-foreground">Version</span>
                    <span className="font-medium">{app.version}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default AppDetails;
