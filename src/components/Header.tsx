import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "../components/ui/button";
import { Menu, X, Upload, LogOut, User } from "lucide-react";
import { useState } from "react";
import { cn } from "../lib/utils";
import logo from "../assets/Final_Logo_IPWAS.png";
import ThemeToggle from "../components/ThemeToggle";
import { useToast } from "../hooks/use-toast";

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  const isAdminLoggedIn = localStorage.getItem("adminLoggedIn") === "true";
  const isVendorLoggedIn = localStorage.getItem("vendorLoggedIn") === "true";
  const isLoggedIn = isAdminLoggedIn || isVendorLoggedIn;
  const isAdminRoute = location.pathname.startsWith("/admin") && isAdminLoggedIn && !isVendorLoggedIn;
  const isVendorRoute = location.pathname.startsWith("/vendor") &&
    !location.pathname.startsWith("/vendor/login") &&
    isVendorLoggedIn && !isAdminLoggedIn;

  const handleAdminLogout = () => {
    setMobileMenuOpen(false);
    localStorage.removeItem("adminLoggedIn");
    localStorage.removeItem("adminEmail");
    localStorage.removeItem("loggedin");
    localStorage.removeItem("loginType");
    toast({ title: "Logged out", description: "Admin session ended" });
    navigate("/");
  };

  const handleVendorLogout = () => {
    setMobileMenuOpen(false);
    localStorage.removeItem("vendorLoggedIn");
    localStorage.removeItem("vendorEmail");
    localStorage.removeItem("vendorName");
    localStorage.removeItem("loginType");
    toast({ title: "Logged out", description: "You have been logged out successfully" });
    navigate("/");
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass-strong">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <img src={logo} alt="OTT WORLD" className="h-12 w-auto" />
          </Link>


          {/* Actions */}
          <div className="flex items-center gap-2">
            {isAdminRoute && (
              <>
                <Button variant="outline" size="sm" onClick={handleAdminLogout} className="hidden sm:flex">
                  <LogOut className="h-4 w-4 mr-1" />
                  Logout
                </Button>
              </>
            )}
            {isVendorRoute && (
              <>
                <Link to="/vendor/upload" className="hidden sm:block">
                  <Button variant="gradient" size="sm">
                    <Upload className="h-4 w-4 mr-1" />
                    Upload App
                  </Button>
                </Link>
                <Button variant="outline" size="sm" onClick={handleVendorLogout} className="hidden sm:flex">
                  <LogOut className="h-4 w-4 mr-1" />
                  Logout
                </Button>
              </>
            )}
            {!isLoggedIn && (
              <Link to="/vendor/login" className="hidden sm:block">
                <Button variant="outline" size="sm">
                  <User className="h-4 w-4 mr-1" />
                  Sign in as Vendor
                </Button>
              </Link>
            )}
            <ThemeToggle />
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={cn(
          "md:hidden overflow-hidden transition-all duration-300 glass-strong border-t border-border/50",
          mobileMenuOpen ? "max-h-64" : "max-h-0"
        )}
      >
        <nav className="container mx-auto px-4 py-4 space-y-2">
          {isAdminRoute && (
            <>
              <Button variant="outline" size="sm" onClick={handleAdminLogout} className="w-full">
                <LogOut className="h-4 w-4 mr-1" />
                Logout
              </Button>
            </>
          )}
          {isVendorRoute && (
            <>
              <Link to="/vendor/upload" onClick={() => setMobileMenuOpen(false)}>
                <Button variant="gradient" size="sm" className="w-full">
                  <Upload className="h-4 w-4 mr-1" />
                  Upload App
                </Button>
              </Link>
              <Button variant="outline" size="sm" onClick={handleVendorLogout} className="w-full">
                <LogOut className="h-4 w-4 mr-1" />
                Logout
              </Button>
            </>
          )}
          {!isLoggedIn && (
            <Link to="/vendor/login" onClick={() => setMobileMenuOpen(false)}>
              <Button variant="outline" size="sm" className="w-full">
                <User className="h-4 w-4 mr-1" />
                Sign in as Vendor
              </Button>
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;