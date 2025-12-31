import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Shield, FileText, Lock, HeadphonesIcon } from "lucide-react";
import { useSearchParams } from "react-router-dom";

const Policies = () => {
  const [searchParams] = useSearchParams();
  const defaultTab = searchParams.get("tab") || "terms";

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h1 className="font-display font-bold text-3xl md:text-4xl mb-2 text-center">
              Policies & <span className="text-gradient">Support</span>
            </h1>
            <p className="text-muted-foreground text-center mb-8">
              Everything you need to know about using OTT WORLD
            </p>

            <Tabs defaultValue={defaultTab} className="w-full">
              <TabsList className="grid w-full grid-cols-4 mb-8">
                <TabsTrigger value="terms" className="flex items-center gap-2">
                  <FileText className="h-4 w-4" />
                  <span className="hidden sm:inline">Terms</span>
                </TabsTrigger>
                <TabsTrigger value="privacy" className="flex items-center gap-2">
                  <Lock className="h-4 w-4" />
                  <span className="hidden sm:inline">Privacy</span>
                </TabsTrigger>
                <TabsTrigger value="safety" className="flex items-center gap-2">
                  <Shield className="h-4 w-4" />
                  <span className="hidden sm:inline">Safety</span>
                </TabsTrigger>
                <TabsTrigger value="support" className="flex items-center gap-2">
                  <HeadphonesIcon className="h-4 w-4" />
                  <span className="hidden sm:inline">Support</span>
                </TabsTrigger>
              </TabsList>

              <TabsContent value="terms" className="glass rounded-2xl p-6 md:p-8">
                <h2 className="font-display font-bold text-2xl mb-6 flex items-center gap-2">
                  <FileText className="h-6 w-6 text-primary" />
                  Terms of Service
                </h2>
                <div className="space-y-6 text-muted-foreground">
                  <section>
                    <h3 className="font-semibold text-foreground mb-2">1. Acceptance of Terms</h3>
                    <p>By accessing or using OTT WORLD, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our platform.</p>
                  </section>
                  <section>
                    <h3 className="font-semibold text-foreground mb-2">2. User Accounts</h3>
                    <p>You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account. You must provide accurate and complete information when creating an account.</p>
                  </section>
                  <section>
                    <h3 className="font-semibold text-foreground mb-2">3. App Distribution</h3>
                    <p>Creators who upload apps to OTT WORLD retain ownership of their content but grant us a license to distribute and display their apps. All apps must comply with our content guidelines and legal requirements.</p>
                  </section>
                  <section>
                    <h3 className="font-semibold text-foreground mb-2">4. Prohibited Content</h3>
                    <p>Apps containing malware, illegal content, or content that violates intellectual property rights are strictly prohibited. We reserve the right to remove any content that violates these terms.</p>
                  </section>
                  <section>
                    <h3 className="font-semibold text-foreground mb-2">5. Liability</h3>
                    <p>OTT WORLD provides the platform "as is" and makes no warranties regarding the apps distributed through our marketplace. Users download and use apps at their own risk.</p>
                  </section>
                  <section>
                    <h3 className="font-semibold text-foreground mb-2">6. Changes to Terms</h3>
                    <p>We may update these terms from time to time. Continued use of the platform after changes constitutes acceptance of the new terms.</p>
                  </section>
                </div>
              </TabsContent>

              <TabsContent value="privacy" className="glass rounded-2xl p-6 md:p-8">
                <h2 className="font-display font-bold text-2xl mb-6 flex items-center gap-2">
                  <Lock className="h-6 w-6 text-primary" />
                  Privacy Policy
                </h2>
                <div className="space-y-6 text-muted-foreground">
                  <section>
                    <h3 className="font-semibold text-foreground mb-2">Information We Collect</h3>
                    <p>We collect information you provide directly, such as account details and uploaded content. We also collect usage data to improve our services.</p>
                  </section>
                  <section>
                    <h3 className="font-semibold text-foreground mb-2">How We Use Your Information</h3>
                    <p>Your information is used to provide and improve our services, communicate with you, and ensure platform security. We do not sell your personal data to third parties.</p>
                  </section>
                  <section>
                    <h3 className="font-semibold text-foreground mb-2">Data Security</h3>
                    <p>We implement industry-standard security measures to protect your data. However, no method of transmission over the internet is 100% secure.</p>
                  </section>
                  <section>
                    <h3 className="font-semibold text-foreground mb-2">Cookies</h3>
                    <p>We use cookies and similar technologies to enhance your experience, analyze usage patterns, and provide personalized content.</p>
                  </section>
                  <section>
                    <h3 className="font-semibold text-foreground mb-2">Your Rights</h3>
                    <p>You have the right to access, correct, or delete your personal data. Contact us to exercise these rights.</p>
                  </section>
                </div>
              </TabsContent>

              <TabsContent value="safety" className="glass rounded-2xl p-6 md:p-8">
                <h2 className="font-display font-bold text-2xl mb-6 flex items-center gap-2">
                  <Shield className="h-6 w-6 text-primary" />
                  Safety Policy
                </h2>
                <div className="space-y-6 text-muted-foreground">
                  <section>
                    <h3 className="font-semibold text-foreground mb-2">Our Commitment to Safety</h3>
                    <p>OTT WORLD is committed to providing a safe platform for both creators and users. We actively monitor and review all uploaded content.</p>
                  </section>
                  <section>
                    <h3 className="font-semibold text-foreground mb-2">Content Review Process</h3>
                    <p>All apps undergo a review process before being published. We check for malware, inappropriate content, and compliance with our guidelines.</p>
                  </section>
                  <section>
                    <h3 className="font-semibold text-foreground mb-2">Age-Restricted Content</h3>
                    <p>Apps containing mature content are clearly labeled and require age verification. We take measures to prevent minors from accessing inappropriate content.</p>
                  </section>
                  <section>
                    <h3 className="font-semibold text-foreground mb-2">Reporting Issues</h3>
                    <p>Users can report apps that violate our policies. We investigate all reports and take appropriate action, including removal of content and suspension of accounts.</p>
                  </section>
                  <section>
                    <h3 className="font-semibold text-foreground mb-2">Creator Accountability</h3>
                    <p>Creators are responsible for ensuring their apps comply with all applicable laws and our guidelines. Violations may result in removal from the platform.</p>
                  </section>
                </div>
              </TabsContent>

              <TabsContent value="support" className="glass rounded-2xl p-6 md:p-8">
                <h2 className="font-display font-bold text-2xl mb-6 flex items-center gap-2">
                  <HeadphonesIcon className="h-6 w-6 text-primary" />
                  Creator Support
                </h2>
                <div className="space-y-6 text-muted-foreground">
                  <section>
                    <h3 className="font-semibold text-foreground mb-2">Getting Started</h3>
                    <p>New to OTT WORLD? Check out our creator guides to learn how to upload your first app, optimize your listing, and reach more users.</p>
                  </section>
                  <section>
                    <h3 className="font-semibold text-foreground mb-2">App Submission Guidelines</h3>
                    <p>Ensure your app meets our quality standards: provide clear descriptions, high-quality screenshots, and accurate categorization. Apps should be free of bugs and security vulnerabilities.</p>
                  </section>
                  <section>
                    <h3 className="font-semibold text-foreground mb-2">Monetization Options</h3>
                    <p>OTT WORLD supports various monetization models including free apps, one-time purchases, and subscription-based models. Contact us to learn more about revenue sharing.</p>
                  </section>
                  <section>
                    <h3 className="font-semibold text-foreground mb-2">Technical Support</h3>
                    <p>Having issues with uploading or managing your apps? Our technical support team is here to help. Reach out via email at support@ottworld.com.</p>
                  </section>
                  <section>
                    <h3 className="font-semibold text-foreground mb-2">Contact Us</h3>
                    <p className="mb-4">Have questions? We're here to help!</p>
                    <div className="space-y-2">
                      <p>Email: support@ottworld.com</p>
                      <p>Response Time: Within 24-48 hours</p>
                    </div>
                  </section>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Policies;
