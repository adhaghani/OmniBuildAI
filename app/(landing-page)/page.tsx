import Link from 'next/link';
import { Building2, FileCheck, Globe, MessageSquare, Sparkles, CheckCircle2, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { LandingNav } from '@/components/landing-nav';

export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <LandingNav />

      {/* Hero Section */}
      <section className="bg-linear-to-br from-primary/5 via-primary/10 to-secondary/5">
        <div className="container mx-auto px-4 py-20 md:py-32">
          <div className="max-w-4xl mx-auto text-center">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary">
              <Sparkles className="h-4 w-4" />
              AI-Powered Green Building Intelligence
            </div>
            <h1 className="mb-6 text-5xl font-bold tracking-tight text-foreground md:text-7xl">
              Build Greener, <br />
              <span className="text-primary">Build Smarter</span>
            </h1>
            <p className="mb-8 text-xl text-muted-foreground max-w-2xl mx-auto">
              Automate green building compliance, visualize carbon data in 3D, and optimize for sustainability with AI. Built for the China-ASEAN construction corridor.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/auth/signup">
                <Button size="lg" className="gap-2 text-lg h-12 px-8">
                  Get Started Free
                  <ArrowRight className="h-5 w-5" />
                </Button>
              </Link>
              <Link href="#features">
                <Button size="lg" variant="outline" className="gap-2 text-lg h-12 px-8">
                  <FileCheck className="h-5 w-5" />
                  View Features
                </Button>
              </Link>
            </div>
            <p className="mt-6 text-sm text-gray-500 dark:text-gray-400">
              No credit card required • Free trial • Cancel anytime
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="border-y bg-background">
        <div className="container mx-auto px-4 py-12">
          <div className="grid gap-8 md:grid-cols-4">
            <div className="text-center">
              <div className="mb-2 text-4xl font-bold text-primary">80%</div>
              <div className="text-sm text-muted-foreground">Faster Audit Time</div>
            </div>
            <div className="text-center">
              <div className="mb-2 text-4xl font-bold text-primary">4</div>
              <div className="text-sm text-muted-foreground">Major Standards Supported</div>
            </div>
            <div className="text-center">
              <div className="mb-2 text-4xl font-bold text-primary">1M+</div>
              <div className="text-sm text-muted-foreground">Token Context Window</div>
            </div>
            <div className="text-center">
              <div className="mb-2 text-4xl font-bold text-primary">100%</div>
              <div className="text-sm text-muted-foreground">Cloud-Native</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="container mx-auto px-4 py-20 md:py-28">
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-4xl font-bold text-foreground">
            Four Core Solutions
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Comprehensive AI-powered tools for green building excellence. From compliance checking to 3D visualization.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-2">
          {/* Feature 1: Compliance Auditor */}
          <Card className="group hover:shadow-xl transition-all duration-300 hover:border-primary/50">
            <CardHeader>
              <div className="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-lg bg-primary/10 group-hover:scale-110 transition-transform">
                <FileCheck className="h-7 w-7 text-primary" />
              </div>
              <CardTitle className="text-2xl">Automated Compliance Auditor</CardTitle>
              <CardDescription className="text-base">
                Upload bills of quantities and specs. AI cross-references against GBL, GBI, LEED, and BREEAM standards, auto-generating compliance scorecards.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                  <span className="text-sm text-muted-foreground">Document parsing with DeepSeek V3.2</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                  <span className="text-sm text-muted-foreground">VOC, GWP, recycled content verification</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                  <span className="text-sm text-muted-foreground">80% faster than manual audits</span>
                </li>
              </ul>
            </CardContent>
          </Card>

          {/* Feature 2: Green Heatmap */}
          <Card className="group hover:shadow-xl transition-all duration-300 hover:border-primary/50">
            <CardHeader>
              <div className="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-lg bg-secondary/10 group-hover:scale-110 transition-transform">
                <Building2 className="h-7 w-7 text-secondary" />
              </div>
              <CardTitle className="text-2xl">3D Green Heatmap</CardTitle>
              <CardDescription className="text-base">
                Visualize your BIM model with color-coded performance overlays. Identify thermal bridges, daylight deficiencies, and high-carbon zones instantly.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                  <span className="text-sm text-muted-foreground">IFC.js browser-based rendering</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                  <span className="text-sm text-muted-foreground">Real-time embodied carbon display</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                  <span className="text-sm text-muted-foreground">Interactive material inspection</span>
                </li>
              </ul>
            </CardContent>
          </Card>

          {/* Feature 3: Optimization Assistant */}
          <Card className="group hover:shadow-xl transition-all duration-300 hover:border-primary/50">
            <CardHeader>
              <div className="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-lg bg-primary/10 group-hover:scale-110 transition-transform">
                <MessageSquare className="h-7 w-7 text-primary" />
              </div>
              <CardTitle className="text-2xl">AI Optimization Assistant</CardTitle>
              <CardDescription className="text-base">
                Natural language queries like "How do I reach Gold certification?" Receive actionable suggestions with local supplier recommendations.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                  <span className="text-sm text-muted-foreground">Context-aware recommendations</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                  <span className="text-sm text-muted-foreground">Cost-benefit analysis</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                  <span className="text-sm text-muted-foreground">Alternative material suggestions</span>
                </li>
              </ul>
            </CardContent>
          </Card>

          {/* Feature 4: Cross-Border Translator */}
          <Card className="group hover:shadow-xl transition-all duration-300 hover:border-primary/50">
            <CardHeader>
              <div className="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-lg bg-secondary/10 group-hover:scale-110 transition-transform">
                <Globe className="h-7 w-7 text-secondary" />
              </div>
              <CardTitle className="text-2xl">Cross-Border Standard Translator</CardTitle>
              <CardDescription className="text-base">
                Toggle between China GBL and ASEAN standards. Instantly see compliance gaps and required adjustments for regional expansion.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                  <span className="text-sm text-muted-foreground">GBL ⇄ GBI ⇄ LEED mapping</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                  <span className="text-sm text-muted-foreground">Regional requirement analysis</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                  <span className="text-sm text-muted-foreground">Belt & Road Initiative support</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="bg-muted/30">
        <div className="container mx-auto px-4 py-20 md:py-28">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-4xl font-bold">How It Works</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Get started in minutes with our simple three-step process
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            <div className="text-center">
              <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-2xl font-bold text-primary">
                1
              </div>
              <h3 className="mb-2 text-xl font-semibold">Upload Your BIM Model</h3>
              <p className="text-muted-foreground">
                Simply drag and drop your IFC files or upload project documentation
              </p>
            </div>
            <div className="text-center">
              <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-2xl font-bold text-primary">
                2
              </div>
              <h3 className="mb-2 text-xl font-semibold">AI Analysis</h3>
              <p className="text-muted-foreground">
                Our DeepSeek V3.2 AI engine analyzes your project against international standards
              </p>
            </div>
            <div className="text-center">
              <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-2xl font-bold text-primary">
                3
              </div>
              <h3 className="mb-2 text-xl font-semibold">Get Actionable Insights</h3>
              <p className="text-muted-foreground">
                Receive detailed reports, 3D visualizations, and optimization recommendations
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-linear-to-br from-primary to-primary/80 text-primary-foreground">
        <div className="container mx-auto px-4 py-20 text-center">
          <h2 className="mb-4 text-4xl font-bold">Ready to Build Sustainably?</h2>
          <p className="mb-8 text-xl opacity-90 max-w-2xl mx-auto">
            Join leading construction firms in China and ASEAN leveraging AI for green building compliance
          </p>
          <Link href="/auth/signup">
            <Button size="lg" variant="secondary" className="gap-2 text-lg h-12 px-8">
              Start Free Trial
              <ArrowRight className="h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-12 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid gap-8 md:grid-cols-4">
            <div>
              <Link href="/" className="flex items-center gap-2 mb-4">
                <Building2 className="h-6 w-6 text-primary" />
                <span className="text-xl font-bold">OmniBuild AI</span>
              </Link>
              <p className="text-sm text-muted-foreground">
                AI-powered green building intelligence for the China-ASEAN corridor
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Product</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link href="#features" className="hover:text-foreground">Features</Link></li>
                <li><Link href="#pricing" className="hover:text-foreground">Pricing</Link></li>
                <li><Link href="#" className="hover:text-foreground">Documentation</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link href="#about" className="hover:text-foreground">About</Link></li>
                <li><Link href="#" className="hover:text-foreground">Blog</Link></li>
                <li><Link href="#" className="hover:text-foreground">Contact</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Legal</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link href="#" className="hover:text-foreground">Privacy</Link></li>
                <li><Link href="#" className="hover:text-foreground">Terms</Link></li>
              </ul>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t text-center text-sm text-muted-foreground">
            <p>© 2026 OmniBuild AI. Supporting the Double Carbon Goals and Digital Silk Road.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
