import { useNavigate, Link } from "react-router-dom";
import { Star, Download, ShieldAlert } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { App } from "@/data/apps";
import { cn } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";

interface AppCardProps {
  app: App;
  onDownload: (app: App) => void;
  onMatureClick?: (app: App) => void;
}

const formatDownloads = (downloads: number): string => {
  if (downloads >= 1000000) {
    return `${(downloads / 1000000).toFixed(1)}M`;
  }
  if (downloads >= 1000) {
    return `${(downloads / 1000).toFixed(0)}K`;
  }
  return downloads.toString();
};

const AppCard = ({ app, onDownload, onMatureClick }: AppCardProps) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    if (app.isMature && onMatureClick) {
      onMatureClick(app);
    } else {
      navigate(`/app/${app.id}`);
    }
  };

  return (
    <div
      className={cn(
        "group glass rounded-2xl p-4 transition-all duration-300 hover:scale-[1.02] hover:bg-card/70 cursor-pointer animate-fade-in hover:shadow-[0_8px_40px_hsl(0_84%_45%_/_0.3)]",
        app.isFeatured && "ring-1 ring-primary/30"
      )}
      onClick={handleCardClick}
    >
      {/* Header */}
      <div className="flex items-start gap-4 mb-4">
        <div className="w-16 h-16 rounded-xl bg-muted flex items-center justify-center text-3xl shrink-0 group-hover:scale-105 transition-transform">
          {app.icon}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="font-display font-semibold text-base truncate">{app.name}</h3>
            {app.isFeatured && (
              <Badge variant="featured" className="text-[10px] px-1.5 py-0">
                Featured
              </Badge>
            )}
          </div>
          <Link
            to={`/vendor/${encodeURIComponent(app.vendorName)}`}
            onClick={(e) => e.stopPropagation()}
            className="text-sm text-primary hover:text-primary/80 hover:underline truncate block transition-colors"
          >
            {app.vendorName}
          </Link>
          <p className="text-xs text-muted-foreground/70 mt-1 line-clamp-2">
            {app.shortDescription}
          </p>
        </div>
      </div>

      {/* Tags */}
      <div className="flex flex-wrap gap-1.5 mb-4">
        {app.tags.slice(0, 3).map((tag) => (
          <Badge key={tag} variant="category" className="text-[10px]">
            {tag}
          </Badge>
        ))}
      </div>

      {/* Footer - Downloads and Get Button */}
      <div className="flex items-center justify-between pt-3 border-t border-border/50">
        <div className="flex items-center gap-4 text-sm">
          <div className="flex items-center gap-1 text-muted-foreground">
            <Download className="h-4 w-4" />
            <span>{formatDownloads(app.metrics.downloads)}</span>
          </div>
          {app.isMature && (
            <div className="flex items-center gap-1">
              <ShieldAlert className="h-4 w-4 text-destructive" />
              <span className="text-destructive text-xs font-medium">18+</span>
            </div>
          )}
        </div>
        <Button
          size="sm"
          variant={app.isMature ? "outline" : "gradient"}
          onClick={(e) => {
            e.stopPropagation();
            if (app.isMature && onMatureClick) {
              onMatureClick(app);
            } else {
              onDownload(app);
            }
          }}
          className="text-xs"
        >
          {app.isMature ? "Verify Age" : "Get"}
        </Button>
      </div>
    </div>
  );
};

export const AppCardSkeleton = () => {
  return (
    <div className="rounded-2xl p-4 border border-border/50 bg-card/40 h-full backdrop-blur-sm">
      <div className="flex items-start gap-4 mb-4">
        <Skeleton className="w-16 h-16 rounded-xl shrink-0" />
        <div className="flex-1 min-w-0">
          <Skeleton className="h-5 w-3/4 mb-2" />
          <Skeleton className="h-4 w-1/2 mb-2" />
          <Skeleton className="h-3 w-full" />
        </div>
      </div>
      <div className="flex gap-2 mb-4">
        <Skeleton className="h-5 w-12" />
        <Skeleton className="h-5 w-12" />
        <Skeleton className="h-5 w-12" />
      </div>
      <div className="flex items-center justify-between pt-3 border-t border-border/50">
        <Skeleton className="h-4 w-20" />
        <Skeleton className="h-8 w-16" />
      </div>
    </div>
  );
};

export default AppCard;
