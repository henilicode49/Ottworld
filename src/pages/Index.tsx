import { useState, useMemo, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { toast } from "sonner";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SearchBar from "@/components/SearchBar";
import CategorySidebar from "@/components/CategorySidebar";
import MobileCategoryFilter from "@/components/MobileCategoryFilter";
import AppCard, { AppCardSkeleton } from "@/components/AppCard";
import AgeVerificationModal from "@/components/AgeVerificationModal";
import { App, categories } from "@/data/apps";
import { TrendingUp, Clock } from "lucide-react";
import { useApp } from "@/context/AppContext";

const Index = () => {
  const { apps } = useApp();
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get("category") || "all");
  const [ageVerificationOpen, setAgeVerificationOpen] = useState(false);
  const [pendingMatureApp, setPendingMatureApp] = useState<App | null>(null);
  const [verifiedAge, setVerifiedAge] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Simulate loading state for smoother UX
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  // Sync category with URL params
  useEffect(() => {
    const categoryParam = searchParams.get("category");
    if (categoryParam) {
      setSelectedCategory(categoryParam);
    }
  }, [searchParams]);

  const filteredApps = useMemo(() => {
    return apps.filter((app) => {
      // Show ONLY approved apps
      if (app.status !== 'approved') {
        return false;
      }

      // Filter by category
      if (selectedCategory !== "all") {
        if (selectedCategory === "mature") {
          // Special case for mature content
          if (!app.isMature) return false;
        } else {
          // Standard category filtering (case-insensitive)
          if (app.category.toLowerCase() !== selectedCategory.toLowerCase()) {
            return false;
          }
        }
      }

      // Filter by search query
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        return (
          app.name.toLowerCase().includes(query) ||
          app.vendorName.toLowerCase().includes(query) ||
          app.tags.some((tag) => tag.toLowerCase().includes(query)) ||
          app.category.toLowerCase().includes(query)
        );
      }

      // Hide mature content by default unless explicitly viewing mature category or verified
      // If we are strictly in 'mature' category (handled above), we show them.
      // If we are in 'all' or specific category, we hide mature apps unless verified.
      if (app.isMature && selectedCategory !== "mature" && !verifiedAge) {
        return false;
      }

      return true;
    });
  }, [apps, searchQuery, selectedCategory, verifiedAge]);

  const trendingApps = useMemo(() => {
    return [...apps]
      .filter((app) => app.status === 'approved' && !app.isMature)
      .sort((a, b) => b.metrics.downloads - a.metrics.downloads)
      .slice(0, 4);
  }, [apps]);

  const handleDownload = (app: App) => {
    toast.success(`Starting download: ${app.name}`, {
      description: `Version ${app.version} • ${app.size}`,
    });
  };

  const handleMatureClick = (app: App) => {
    if (verifiedAge) {
      handleDownload(app);
    } else {
      setPendingMatureApp(app);
      setAgeVerificationOpen(true);
    }
  };

  const handleAgeVerified = () => {
    setVerifiedAge(true);
    setAgeVerificationOpen(false);
    if (pendingMatureApp) {
      toast.success(`Access granted: ${pendingMatureApp.name}`, {
        description: "Age verification complete",
      });
      setPendingMatureApp(null);
    }
  };

  const handleCategoryChange = (categoryId: string) => {
    setSelectedCategory(categoryId);
    if (categoryId === "all") {
      setSearchParams({});
    } else {
      setSearchParams({ category: categoryId });
    }
    if (categoryId === "mature" && !verifiedAge) {
      setAgeVerificationOpen(true);
    }
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const currentCategory = categories.find((c) => c.id === selectedCategory);

  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <Header />

      <main>
        {/* Hero Section with Full Screen Background Video */}
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
          {/* Background Video */}
          <div className="absolute inset-0 z-0">
            <video
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
              className="w-full h-full object-cover animate-ken-burns"
            >
              <source
                src="/videos/hero-video.mp4"
                type="video/mp4"
              />
              <source
                src="https://assets.mixkit.co/videos/preview/mixkit-digital-animation-of-a-city-11748-large.mp4"
                type="video/mp4"
              />
            </video>
            {/* Dark overlay for better text readability like icode49.ae */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />
          </div>

          <div className="container mx-auto px-4 relative z-10 w-full">
            <div className="text-center max-w-4xl mx-auto w-full">
              <h1 className="font-display font-bold text-3xl sm:text-4xl md:text-6xl lg:text-7xl mb-4 sm:mb-6 text-white uppercase tracking-wider animate-text-reveal px-2">
                <span className="inline-block animate-text-shimmer bg-gradient-to-r from-white via-primary to-white bg-[length:200%_100%] bg-clip-text text-transparent">
                  YOUR OWN STORE
                </span>
              </h1>
              <p className="text-base sm:text-lg md:text-xl text-white/80 mb-6 sm:mb-10 animate-fade-in-up px-2" style={{ animationDelay: "0.5s" }}>
                Explore a curated marketplace of apps from independent creators.
                Safe, secure, and privacy-focused distribution.
              </p>
              <div className="flex justify-center animate-fade-in-up w-full px-2" style={{ animationDelay: "0.8s" }}>
                <SearchBar
                  value={searchQuery}
                  onChange={handleSearch}
                  placeholder="Search apps, games, tools..."
                />
              </div>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <section className="container mx-auto px-4 py-8 md:py-16 pt-24 md:pt-16">
          <div className="flex flex-col lg:flex-row gap-4 lg:gap-8">
            <CategorySidebar
              selectedCategory={selectedCategory}
              onCategoryChange={handleCategoryChange}
            />

            <div className="flex-1 min-w-0 w-full">
              {/* Mobile Category Filter */}
              <MobileCategoryFilter
                selectedCategory={selectedCategory}
                onCategoryChange={handleCategoryChange}
              />

              {/* Section Header */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-4 mb-6 mt-4 lg:mt-0">
                <div className="flex flex-wrap items-center gap-2 min-w-0">
                  {selectedCategory === "all" ? (
                    <TrendingUp className="h-5 w-5 text-primary shrink-0" />
                  ) : (
                    <Clock className="h-5 w-5 text-primary shrink-0" />
                  )}
                  <h2 className="font-display font-semibold text-lg sm:text-xl truncate">
                    {searchQuery
                      ? `Search Results for "${searchQuery}"`
                      : currentCategory?.name || "All Apps"}
                  </h2>
                  <span className="text-muted-foreground text-sm shrink-0">
                    ({filteredApps.length} apps)
                  </span>
                </div>
              </div>

              {/* Trending Section (when viewing all without search) */}
              {!searchQuery && selectedCategory === "all" && (
                <div className="mb-8">
                  <div className="flex items-center gap-2 mb-4">
                    <TrendingUp className="h-4 w-4 text-warning" />
                    <h3 className="font-medium text-sm text-muted-foreground">Trending Now</h3>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                    {isLoading
                      ? Array.from({ length: 4 }).map((_, i) => (
                        <AppCardSkeleton key={i} />
                      ))
                      : trendingApps.map((app) => (
                        <AppCard
                          key={app.id}
                          app={app}
                          onDownload={handleDownload}
                          onMatureClick={handleMatureClick}
                        />
                      ))}
                  </div>
                </div>
              )}

              {/* Apps Grid */}
              {isLoading ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
                  {Array.from({ length: 6 }).map((_, i) => (
                    <AppCardSkeleton key={i} />
                  ))}
                </div>
              ) : filteredApps.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
                  {filteredApps.map((app) => (
                    <AppCard
                      key={app.id}
                      app={app}
                      onDownload={handleDownload}
                      onMatureClick={handleMatureClick}
                    />
                  ))}
                </div>
              ) : (
                <div className="text-center py-16 glass rounded-2xl">
                  <div className="text-5xl mb-4">🔍</div>
                  <h3 className="font-display font-semibold text-xl mb-2">No apps found</h3>
                  <p className="text-muted-foreground">
                    Try adjusting your search or browse a different category
                  </p>
                </div>
              )}
            </div>
          </div>
        </section>
      </main>

      <Footer />

      <AgeVerificationModal
        open={ageVerificationOpen}
        onOpenChange={setAgeVerificationOpen}
        onConfirm={handleAgeVerified}
      />
    </div>
  );
};

export default Index;
