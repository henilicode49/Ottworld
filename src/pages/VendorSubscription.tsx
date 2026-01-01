import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Check, Crown, Package, Infinity, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useToast } from "@/hooks/use-toast";

const plans = [
  {
    id: "standard",
    name: "STANDARD",
    price: 999,
    description: "Perfect for individual vendors",
    features: [
      "Upload up to 3 apps",
      "Basic analytics dashboard",
      "Email support",
      "Lifetime validity",
      "App performance tracking",
      "Download & likes statistics",
    ],
    icon: Package,
    popular: false,
  },
  {
    id: "premium",
    name: "PREMIUM",
    price: 1999,
    description: "For professional vendors & studios",
    features: [
      "Unlimited app uploads",
      "Advanced analytics & insights",
      "Priority support 24/7",
      "Lifetime validity",
      "Featured app placement",
      "Custom branding options",
      "API access",
      "Team collaboration tools",
    ],
    icon: Crown,
    popular: true,
  },
];

const VendorSubscription = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [currentPlan, setCurrentPlan] = useState<"none" | "standard" | "premium">("none");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const loggedIn = localStorage.getItem("vendorLoggedIn") === "true";
    setIsLoggedIn(loggedIn);
    const sub = (localStorage.getItem("subscription") as "none" | "standard" | "premium") || "none";
    setCurrentPlan(sub);
  }, []);

  const handlePurchase = (planId: string) => {
    if (!isLoggedIn) {
      toast({ title: "Login Required", description: "Please login to purchase a subscription" });
      navigate("/vendor/login");
      return;
    }

    // Mock purchase - store in localStorage
    localStorage.setItem("subscription", planId);
    setCurrentPlan(planId as "standard" | "premium");
    toast({
      title: "Purchase Successful!",
      description: `You are now subscribed to the ${planId.toUpperCase()} plan`
    });
    navigate("/vendor/dashboard");
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <main className="flex-1 flex flex-col justify-center py-8 px-4 pt-20">
        <div className="w-full max-w-5xl mx-auto">
          {/* Back Button */}
          {isLoggedIn && (
            <Button
              variant="ghost"
              size="sm"
              className="mb-4"
              onClick={() => navigate("/vendor/dashboard")}
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
          )}

          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-display font-bold uppercase tracking-wide mb-2">
              Choose Your Plan
            </h1>
            <Badge variant="secondary" className="text-xs py-1 px-3 mb-2">
              <Infinity className="h-3 w-3 mr-1.5" />
              Lifetime Validity
            </Badge>
          </div>

          {/* Plans Grid */}
          <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto items-stretch">
            {plans.map((plan) => {
              const Icon = plan.icon;
              const isCurrentPlan = currentPlan === plan.id;

              return (
                <Card
                  key={plan.id}
                  className={`relative overflow-hidden transition-all duration-300 hover:shadow-hover flex flex-col ${plan.popular ? "border-primary/50 shadow-glow bg-card/50" : "glass"
                    }`}
                >
                  {plan.popular && (
                    <div className="absolute top-0 right-0 bg-primary/90 text-primary-foreground px-3 py-0.5 text-[10px] font-bold uppercase tracking-wider">
                      Popular
                    </div>
                  )}

                  <CardHeader className="text-center pb-2 pt-6">
                    <div className={`h-12 w-12 mx-auto rounded-xl flex items-center justify-center mb-3 ${plan.popular ? "bg-primary/20 text-primary" : "bg-muted text-muted-foreground"
                      }`}>
                      <Icon className="h-6 w-6" />
                    </div>
                    <CardTitle className="text-xl font-display font-bold">{plan.name}</CardTitle>
                    <div className="mt-2">
                      <span className="text-4xl font-display font-bold">${plan.price}</span>
                      <span className="text-muted-foreground ml-1 text-sm">/ life</span>
                    </div>
                    <CardDescription className="text-xs mt-1">{plan.description}</CardDescription>
                  </CardHeader>

                  <CardContent className="flex-1 flex flex-col">
                    <div className="flex-1">
                      <ul className="space-y-2 mb-6 text-left">
                        {plan.features.map((feature, index) => (
                          <li key={index} className="flex items-start gap-2.5">
                            <Check className={`h-4 w-4 shrink-0 mt-0.5 ${plan.popular ? "text-primary" : "text-muted-foreground"}`} />
                            <span className="text-sm text-foreground/80">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {isCurrentPlan ? (
                      <Button variant="outline" className="w-full" disabled>
                        Current Plan
                      </Button>
                    ) : (
                      <Button
                        variant={plan.popular ? "gradient" : "outline"}
                        className="w-full"
                        onClick={() => handlePurchase(plan.id)}
                      >
                        {currentPlan !== "none" && plan.id === "premium" ? "Upgrade" : "Get Started"}
                      </Button>
                    )}
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Footer Links */}
          <div className="flex justify-center gap-6 mt-8 text-xs text-muted-foreground">
            <span className="flex items-center gap-1"><Check className="h-3 w-3" /> Secure Payment</span>
            <span className="flex items-center gap-1"><Check className="h-3 w-3" /> Instant Access</span>
            <span className="flex items-center gap-1"><Check className="h-3 w-3" /> No Hidden Fees</span>
          </div>
        </div>
      </main>
    </div>
  );
};

export default VendorSubscription;

