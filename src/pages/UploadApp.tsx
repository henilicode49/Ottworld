import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { categories } from "@/data/apps";
import { toast } from "sonner";
import { Upload, User, Package, FileText, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const UploadApp = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  
  // Vendor Details
  const [vendorName, setVendorName] = useState("");
  const [vendorEmail, setVendorEmail] = useState("");
  const [vendorCompany, setVendorCompany] = useState("");
  const [vendorWebsite, setVendorWebsite] = useState("");

  // App Details
  const [appName, setAppName] = useState("");
  const [appDescription, setAppDescription] = useState("");
  const [appCategory, setAppCategory] = useState("");
  const [appPrice, setAppPrice] = useState("");
  const [appVersion, setAppVersion] = useState("");
  const [appTags, setAppTags] = useState("");
  const [isMature, setIsMature] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(false);

  const handleVendorSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!vendorName || !vendorEmail) {
      toast.error("Please fill in required fields");
      return;
    }
    setStep(2);
  };

  const handleAppSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!appName || !appDescription || !appCategory) {
      toast.error("Please fill in required fields");
      return;
    }
    if (!acceptTerms) {
      toast.error("Please accept the terms and conditions");
      return;
    }
    
    toast.success("App submitted successfully!", {
      description: "Your app is now under review. We'll notify you once it's approved.",
    });
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4 max-w-3xl">
          {/* Back button */}
          <Link 
            to="/" 
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Marketplace
          </Link>

          <div className="text-center mb-8">
            <h1 className="font-display font-bold text-3xl md:text-4xl mb-2">
              Upload Your App
            </h1>
            <p className="text-muted-foreground">
              Share your creation with the OTT WORLD community
            </p>
          </div>

          {/* Progress Steps */}
          <div className="flex items-center justify-center gap-4 mb-8">
            <div className={`flex items-center gap-2 ${step >= 1 ? "text-primary" : "text-muted-foreground"}`}>
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${step >= 1 ? "gradient-primary text-primary-foreground" : "glass"}`}>
                <User className="h-5 w-5" />
              </div>
              <span className="hidden sm:inline font-medium">Vendor Details</span>
            </div>
            <div className={`w-12 h-0.5 ${step >= 2 ? "bg-primary" : "bg-muted"}`} />
            <div className={`flex items-center gap-2 ${step >= 2 ? "text-primary" : "text-muted-foreground"}`}>
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${step >= 2 ? "gradient-primary text-primary-foreground" : "glass"}`}>
                <Package className="h-5 w-5" />
              </div>
              <span className="hidden sm:inline font-medium">App Details</span>
            </div>
          </div>

          {/* Step 1: Vendor Details */}
          {step === 1 && (
            <form onSubmit={handleVendorSubmit} className="glass rounded-2xl p-6 md:p-8">
              <div className="flex items-center gap-3 mb-6">
                <User className="h-6 w-6 text-primary" />
                <h2 className="font-display font-semibold text-xl">Vendor Information</h2>
              </div>

              <div className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="vendorName">Full Name *</Label>
                    <Input
                      id="vendorName"
                      value={vendorName}
                      onChange={(e) => setVendorName(e.target.value)}
                      placeholder="John Doe"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="vendorEmail">Email Address *</Label>
                    <Input
                      id="vendorEmail"
                      type="email"
                      value={vendorEmail}
                      onChange={(e) => setVendorEmail(e.target.value)}
                      placeholder="john@example.com"
                      required
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="vendorCompany">Company Name</Label>
                    <Input
                      id="vendorCompany"
                      value={vendorCompany}
                      onChange={(e) => setVendorCompany(e.target.value)}
                      placeholder="Your Company"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="vendorWebsite">Website</Label>
                    <Input
                      id="vendorWebsite"
                      type="url"
                      value={vendorWebsite}
                      onChange={(e) => setVendorWebsite(e.target.value)}
                      placeholder="https://yourwebsite.com"
                    />
                  </div>
                </div>

                <Button type="submit" variant="gradient" size="lg" className="w-full">
                  Continue to App Details
                </Button>
              </div>
            </form>
          )}

          {/* Step 2: App Details */}
          {step === 2 && (
            <form onSubmit={handleAppSubmit} className="glass rounded-2xl p-6 md:p-8">
              <div className="flex items-center gap-3 mb-6">
                <Package className="h-6 w-6 text-primary" />
                <h2 className="font-display font-semibold text-xl">App Information</h2>
              </div>

              <div className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="appName">App Name *</Label>
                  <Input
                    id="appName"
                    value={appName}
                    onChange={(e) => setAppName(e.target.value)}
                    placeholder="My Awesome App"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="appDescription">Description *</Label>
                  <Textarea
                    id="appDescription"
                    value={appDescription}
                    onChange={(e) => setAppDescription(e.target.value)}
                    placeholder="Describe what your app does..."
                    rows={4}
                    required
                  />
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="appCategory">Category *</Label>
                    <Select value={appCategory} onValueChange={setAppCategory}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories
                          .filter((c) => c.id !== "all")
                          .map((category) => (
                            <SelectItem key={category.id} value={category.id}>
                              {category.name}
                            </SelectItem>
                          ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="appPrice">Price (USD)</Label>
                    <Input
                      id="appPrice"
                      type="number"
                      step="0.01"
                      min="0"
                      value={appPrice}
                      onChange={(e) => setAppPrice(e.target.value)}
                      placeholder="0.00 (Free)"
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="appVersion">Version</Label>
                    <Input
                      id="appVersion"
                      value={appVersion}
                      onChange={(e) => setAppVersion(e.target.value)}
                      placeholder="1.0.0"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="appTags">Tags (comma separated)</Label>
                    <Input
                      id="appTags"
                      value={appTags}
                      onChange={(e) => setAppTags(e.target.value)}
                      placeholder="game, adventure, puzzle"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>App File</Label>
                  <div className="border-2 border-dashed border-border rounded-xl p-8 text-center hover:border-primary/50 transition-colors cursor-pointer">
                    <Upload className="h-10 w-10 mx-auto mb-3 text-muted-foreground" />
                    <p className="text-sm text-muted-foreground">
                      Drag and drop your app file here, or click to browse
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      Supported: APK, EXE, DMG, ZIP (Max 500MB)
                    </p>
                  </div>
                </div>

                <div className="space-y-4 pt-4 border-t border-border">
                  <div className="flex items-center gap-3">
                    <Checkbox
                      id="isMature"
                      checked={isMature}
                      onCheckedChange={(checked) => setIsMature(checked === true)}
                    />
                    <Label htmlFor="isMature" className="cursor-pointer">
                      This app contains mature content (18+)
                    </Label>
                  </div>

                  <div className="flex items-center gap-3">
                    <Checkbox
                      id="acceptTerms"
                      checked={acceptTerms}
                      onCheckedChange={(checked) => setAcceptTerms(checked === true)}
                    />
                    <Label htmlFor="acceptTerms" className="cursor-pointer">
                      I agree to the <Link to="/terms" className="text-primary hover:underline">Terms of Service</Link> and <Link to="/policies" className="text-primary hover:underline">Content Policies</Link>
                    </Label>
                  </div>
                </div>

                <div className="flex gap-3">
                  <Button 
                    type="button" 
                    variant="outline" 
                    size="lg" 
                    className="flex-1"
                    onClick={() => setStep(1)}
                  >
                    Back
                  </Button>
                  <Button type="submit" variant="gradient" size="lg" className="flex-1">
                    <FileText className="h-5 w-5 mr-2" />
                    Submit for Review
                  </Button>
                </div>
              </div>
            </form>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default UploadApp;
