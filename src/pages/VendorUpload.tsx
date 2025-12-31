import { useEffect, useState, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Upload,
  ArrowLeft,
  Package,
  Image as ImageIcon,
  FileText,
  Tag,
  Globe,
  Crown,
  ShieldCheck,
  AlertCircle,
  DollarSign
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useToast } from "@/hooks/use-toast";
import { useApp } from "@/context/AppContext";

const categories = [
  "Social",
  "Productivity",
  "Entertainment",
  "Games",
  "Education",
  "Lifestyle",
  "Utilities",
  "Health & Fitness",
];

interface FormData {
  appName: string;
  description: string;
  category: string;
  websiteUrl: string;
  version: string;
  price: string;
  tags: string;
  isMature: boolean;
  termsAccepted: boolean;
  iconPreview: string | null;
  packageFile: File | null;
}

const VendorUpload = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { addApp, currentVendor, apps } = useApp();

  const iconInputRef = useRef<HTMLInputElement>(null);
  const packageInputRef = useRef<HTMLInputElement>(null);

  const [subscription, setSubscription] = useState<"none" | "standard" | "premium">("none");
  const [appsUploaded, setAppsUploaded] = useState(0);

  const [formData, setFormData] = useState<FormData>({
    appName: "",
    description: "",
    category: "",
    websiteUrl: "",
    version: "",
    price: "",
    tags: "",
    isMature: false,
    termsAccepted: false,
    iconPreview: null,
    packageFile: null
  });

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("vendorLoggedIn");
    if (!isLoggedIn) {
      navigate("/vendor/login");
      return;
    }

    // In a real app we'd get subscription from currentVendor, 
    // for now we trust localStorage or fallback to standard for demo
    const sub = (localStorage.getItem("subscription") as "none" | "standard" | "premium") || "standard";
    setSubscription(sub);

    // Calculate uploaded apps for this vendor
    if (currentVendor) {
      const count = apps.filter(a => a.vendorId === currentVendor.id).length;
      setAppsUploaded(count);
    }

    if (sub === "none") {
      toast({
        title: "Subscription Required",
        description: "Please purchase a subscription to upload apps",
        variant: "destructive"
      });
      navigate("/vendor/subscription");
    }
  }, [navigate, toast, currentVendor, apps]);

  const canUpload = subscription === "premium" || (subscription === "standard" && appsUploaded < 3);

  const handleIconChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        toast({ title: "Error", description: "Icon size must be less than 2MB", variant: "destructive" });
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({ ...prev, iconPreview: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handlePackageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 100 * 1024 * 1024) {
        toast({ title: "Error", description: "Package size must be less than 100MB", variant: "destructive" });
        return;
      }
      setFormData(prev => ({ ...prev, packageFile: file }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.appName || !formData.description || !formData.category) {
      toast({ title: "Error", description: "Please fill in all required fields", variant: "destructive" });
      return;
    }

    if (!formData.iconPreview) {
      toast({ title: "Error", description: "Please upload an app icon", variant: "destructive" });
      return;
    }

    if (!formData.packageFile) {
      toast({ title: "Error", description: "Please upload an app package file", variant: "destructive" });
      return;
    }

    if (!formData.termsAccepted) {
      toast({ title: "Error", description: "Please accept the terms and conditions", variant: "destructive" });
      return;
    }

    if (!canUpload) {
      toast({ title: "Limit Reached", description: "You have reached your upload limit.", variant: "destructive" });
      return;
    }

    // Create new app object
    const newApp = {
      vendorId: currentVendor?.id || "v1",
      vendorName: currentVendor?.businessName || "Unknown Vendor",
      name: formData.appName,
      category: formData.category,
      price: formData.price ? parseFloat(formData.price) : ("free" as const),
      status: "review" as const,
      description: formData.description,
      shortDescription: formData.description.slice(0, 100) + (formData.description.length > 100 ? "..." : ""),
      icon: "📱", // Fallback emoji if image rendering fails elsewhere, but in real app we'd use the URL
      // In a real app, we would upload the file to storage and get a return URL.
      // Here we will use the base64 string for the icon demo if supported by the display component,
      // or just keep the generic emoji for list views if they strictly expect emoji/string.
      // Let's assume for now we use a generic emoji for the list view but logically we have the file.
      version: formData.version || "1.0.0",
      size: `${(formData.packageFile.size / (1024 * 1024)).toFixed(1)} MB`,
      lastUpdated: new Date().toISOString().split('T')[0],
      isFeatured: false,
      isMature: formData.isMature,
      tags: formData.tags.split(',').map(t => t.trim()).filter(Boolean),
      screenshots: []
    };

    addApp(newApp);

    toast({ title: "Success!", description: "Your app has been submitted for review" });
    navigate(`/${currentVendor?.businessName || 'vendor'}/dashboard`);
  };

  if (!canUpload && subscription === "standard") {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <Header />
        <main className="flex-1 flex items-center justify-center py-12 px-4">
          <Card className="max-w-md glass text-center border-border/50">
            <CardHeader>
              <div className="h-16 w-16 mx-auto rounded-full bg-warning/10 flex items-center justify-center mb-4 ring-8 ring-warning/5">
                <AlertCircle className="h-8 w-8 text-warning" />
              </div>
              <CardTitle className="font-display uppercase text-xl">Upload Limit Reached</CardTitle>
              <CardDescription>
                You've reached your 3 app upload limit on the Standard plan.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">
                Upgrade to Premium for unlimited app uploads and additional features.
              </p>
              <Button variant="gradient" className="w-full shadow-lg shadow-primary/20" onClick={() => navigate("/vendor/subscription")}>
                <Crown className="h-4 w-4 mr-2" />
                Upgrade to Premium
              </Button>
              <Button variant="outline" className="w-full" onClick={() => navigate("/vendor/dashboard")}>
                Back to Dashboard
              </Button>
            </CardContent>
          </Card>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <main className="flex-1 py-20 px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header Section */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
            <div>
              <Button
                variant="ghost"
                size="sm"
                className="mb-2 -ml-2 text-muted-foreground hover:text-foreground"
                onClick={() => navigate(`/${currentVendor?.businessName || 'vendor'}/dashboard`)}
              >
                <ArrowLeft className="h-4 w-4 mr-1.5" />
                Back to Dashboard
              </Button>
              <h1 className="text-3xl font-display font-bold">Upload New App</h1>
              <p className="text-muted-foreground mt-1">Submit your application for review and publication.</p>
            </div>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="grid lg:grid-cols-3 gap-8">

              {/* Left Column: Main Info */}
              <div className="lg:col-span-2 space-y-6">
                <Card className="glass border-border/50">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Package className="h-5 w-5 text-primary" />
                      App Details
                    </CardTitle>
                    <CardDescription>Basic information about your application.</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* App Name */}
                    <div className="space-y-2">
                      <Label htmlFor="appName">App Name <span className="text-destructive">*</span></Label>
                      <Input
                        id="appName"
                        placeholder="e.g. Super Task Manager"
                        value={formData.appName}
                        onChange={(e) => setFormData({ ...formData, appName: e.target.value })}
                        className="bg-background/50"
                      />
                    </div>

                    {/* Description */}
                    <div className="space-y-2">
                      <Label htmlFor="description">Description <span className="text-destructive">*</span></Label>
                      <Textarea
                        id="description"
                        placeholder="Describe your app features, benefits, and usage..."
                        rows={6}
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        className="bg-background/50 resize-y min-h-[120px]"
                      />
                    </div>

                    <div className="grid sm:grid-cols-2 gap-6">
                      {/* Category */}
                      <div className="space-y-2">
                        <Label htmlFor="category">Category <span className="text-destructive">*</span></Label>
                        <Select
                          value={formData.category}
                          onValueChange={(value) => setFormData({ ...formData, category: value })}
                        >
                          <SelectTrigger className="bg-background/50">
                            <SelectValue placeholder="Select category" />
                          </SelectTrigger>
                          <SelectContent>
                            {categories.map((cat) => (
                              <SelectItem key={cat} value={cat}>
                                {cat}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      {/* Price */}
                      <div className="space-y-2">
                        <Label htmlFor="price">Price (USD)</Label>
                        <div className="relative">
                          <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                          <Input
                            id="price"
                            type="number"
                            min="0"
                            step="0.01"
                            placeholder="0.00 (Leave empty for Free)"
                            className="pl-9 bg-background/50"
                            value={formData.price}
                            onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-6">
                      {/* Version */}
                      <div className="space-y-2">
                        <Label htmlFor="version">Version</Label>
                        <Input
                          id="version"
                          placeholder="e.g. 1.0.0"
                          value={formData.version}
                          onChange={(e) => setFormData({ ...formData, version: e.target.value })}
                          className="bg-background/50"
                        />
                      </div>

                      {/* Website URL */}
                      <div className="space-y-2">
                        <Label htmlFor="websiteUrl">Website URL</Label>
                        <div className="relative">
                          <Globe className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                          <Input
                            id="websiteUrl"
                            type="url"
                            placeholder="https://example.com"
                            className="pl-9 bg-background/50"
                            value={formData.websiteUrl}
                            onChange={(e) => setFormData({ ...formData, websiteUrl: e.target.value })}
                          />
                        </div>
                      </div>
                    </div>

                    {/* Tags */}
                    <div className="space-y-2">
                      <Label htmlFor="tags">Tags</Label>
                      <div className="relative">
                        <Tag className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="tags"
                          placeholder="productivity, tools, free (comma separated)"
                          className="pl-9 bg-background/50"
                          value={formData.tags}
                          onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                        />
                      </div>
                      <p className="text-[10px] text-muted-foreground">Used for search and filtering. Max 5 tags.</p>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Right Column: Media, Files & Compliance */}
              <div className="space-y-6">
                {/* Media & Files */}
                <Card className="glass border-border/50">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-lg">
                      <ImageIcon className="h-4 w-4 text-primary" />
                      Media & Files
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {/* Icon Upload */}
                    <div className="space-y-2">
                      <Label>App Icon <span className="text-destructive">*</span></Label>
                      <input
                        type="file"
                        accept="image/png, image/jpeg"
                        className="hidden"
                        ref={iconInputRef}
                        onChange={handleIconChange}
                      />
                      <div
                        onClick={() => iconInputRef.current?.click()}
                        className="border-2 border-dashed border-border/60 rounded-xl p-4 text-center cursor-pointer hover:border-primary/50 hover:bg-muted/30 transition-all group relative overflow-hidden"
                      >
                        {formData.iconPreview ? (
                          <div className="relative z-10">
                            <img src={formData.iconPreview} alt="App Icon" className="w-16 h-16 mx-auto rounded-xl object-cover shadow-md mb-2" />
                            <p className="text-xs text-primary font-medium">Click to change icon</p>
                          </div>
                        ) : (
                          <>
                            <div className="h-10 w-10 mx-auto rounded-full bg-muted group-hover:bg-primary/10 flex items-center justify-center mb-2 transition-colors">
                              <ImageIcon className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
                            </div>
                            <p className="text-xs text-muted-foreground group-hover:text-foreground">Click to upload icon</p>
                            <p className="text-[10px] text-muted-foreground/60 mt-1">PNG, JPG (512x512)</p>
                          </>
                        )}
                      </div>
                    </div>

                    {/* App File Upload */}
                    <div className="space-y-2">
                      <Label>App Package <span className="text-destructive">*</span></Label>
                      <input
                        type="file"
                        accept=".apk,.ipa,.zip"
                        className="hidden"
                        ref={packageInputRef}
                        onChange={handlePackageChange}
                      />
                      <div
                        onClick={() => packageInputRef.current?.click()}
                        className="border-2 border-dashed border-border/60 rounded-xl p-4 text-center cursor-pointer hover:border-primary/50 hover:bg-muted/30 transition-all group"
                      >
                        {formData.packageFile ? (
                          <>
                            <div className="h-10 w-10 mx-auto rounded-full bg-green-500/10 flex items-center justify-center mb-2">
                              <FileText className="h-5 w-5 text-green-500" />
                            </div>
                            <p className="text-xs font-medium text-foreground truncate max-w-[200px] mx-auto">{formData.packageFile.name}</p>
                            <p className="text-[10px] text-muted-foreground mt-1">{(formData.packageFile.size / (1024 * 1024)).toFixed(1)} MB</p>
                          </>
                        ) : (
                          <>
                            <div className="h-10 w-10 mx-auto rounded-full bg-muted group-hover:bg-primary/10 flex items-center justify-center mb-2 transition-colors">
                              <FileText className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
                            </div>
                            <p className="text-xs text-muted-foreground group-hover:text-foreground">Click to upload APK/IPA</p>
                            <p className="text-[10px] text-muted-foreground/60 mt-1">Max size 100MB</p>
                          </>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Compliance */}
                <Card className="glass border-border/50">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-lg">
                      <ShieldCheck className="h-4 w-4 text-primary" />
                      Compliance
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-start space-x-3 p-3 rounded-lg bg-muted/20 border border-border/30">
                      <Checkbox
                        id="mature"
                        checked={formData.isMature}
                        onCheckedChange={(checked) => setFormData({ ...formData, isMature: checked as boolean })}
                        className="mt-0.5"
                      />
                      <div className="grid gap-0.5">
                        <Label htmlFor="mature" className="text-sm font-medium cursor-pointer">
                          Mature Content (18+)
                        </Label>
                        <p className="text-xs text-muted-foreground">
                          Check if this app contains mature themes or content.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-3 p-3 rounded-lg bg-muted/20 border border-border/30">
                      <Checkbox
                        id="terms"
                        checked={formData.termsAccepted}
                        onCheckedChange={(checked) => setFormData({ ...formData, termsAccepted: checked as boolean })}
                        className="mt-0.5"
                      />
                      <div className="grid gap-0.5">
                        <Label htmlFor="terms" className="text-sm font-medium cursor-pointer">
                          Terms & Guidelines <span className="text-destructive">*</span>
                        </Label>
                        <p className="text-xs text-muted-foreground">
                          I agree to the Terms of Service and Vendor Guidelines.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Action Buttons */}
                <div className="grid grid-cols-2 gap-3 pt-2">
                  <Button type="button" variant="outline" onClick={() => navigate("/vendor/dashboard")}>
                    Cancel
                  </Button>
                  <Button type="submit" variant="gradient" className="shadow-lg shadow-primary/20">
                    <Upload className="h-4 w-4 mr-2" />
                    Submit App
                  </Button>
                </div>

              </div>
            </div>
          </form>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default VendorUpload;

