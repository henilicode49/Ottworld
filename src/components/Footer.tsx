import { Link } from "react-router-dom";
import { Shield, FileText, Lock, Mail } from "lucide-react";
import logo from "@/assets/Final_Logo_IPWAS.png";

const Footer = () => {
  return (
    <footer className="border-t border-border/50 mt-16">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-2">
              <img src={logo} alt="OTT WORLD" className="h-12 w-auto" />
            </Link>
            <p className="text-sm text-muted-foreground">
              The premier marketplace for independent app creators and developers.
            </p>
          </div>

          {/* Explore */}
          <div>
            <h4 className="font-display font-semibold mb-4">Explore</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  All Apps
                </Link>
              </li>
              <li>
                <Link to="/?category=games" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Games
                </Link>
              </li>
              <li>
                <Link to="/?category=productivity" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Productivity
                </Link>
              </li>
              <li>
                <Link to="/?category=creative" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Creative Tools
                </Link>
              </li>
            </ul>
          </div>

          {/* For Creators */}
          <div>
            <h4 className="font-display font-semibold mb-4">For Creators</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/upload" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Upload Your App
                </Link>
              </li>
              <li>
                <Link to="/policies?tab=support" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Creator Guidelines
                </Link>
              </li>
              <li>
                <Link to="/policies?tab=support" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Monetization
                </Link>
              </li>
              <li>
                <Link to="/policies?tab=support" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Creator Support
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-display font-semibold mb-4">Legal & Safety</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/policies?tab=safety" className="text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2">
                  <Shield className="h-4 w-4" />
                  Safety Policy
                </Link>
              </li>
              <li>
                <Link to="/policies?tab=terms" className="text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2">
                  <FileText className="h-4 w-4" />
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link to="/policies?tab=privacy" className="text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2">
                  <Lock className="h-4 w-4" />
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/policies?tab=support" className="text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2">
                  <Mail className="h-4 w-4" />
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border/50 mt-8 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            © 2024 OTT WORLD. All rights reserved.
          </p>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <span>Privacy-first</span>
            <span>•</span>
            <span>Creator-friendly</span>
            <span>•</span>
            <span>Safe distribution</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
