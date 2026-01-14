import Link from 'next/link';
import { Building2, FileCheck, Globe, MessageSquare, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Hero Section */}
      <header className="border-b bg-linear-to-br from-emerald-50 to-teal-50 dark:from-emerald-950 dark:to-teal-950">
        <div className="container mx-auto px-4 py-16 md:py-24">
          <div className="max-w-3xl">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-emerald-100 dark:bg-emerald-900 px-4 py-1.5 text-sm font-medium text-emerald-700 dark:text-emerald-300">
              <Sparkles className="h-4 w-4" />
              AI-Powered Green Building Intelligence
            </div>
            <h1 className="mb-6 text-5xl font-bold tracking-tight text-gray-900 dark:text-white md:text-6xl">
              OmniBuild AI
            </h1>
            <p className="mb-8 text-xl text-gray-600 dark:text-gray-300">
              Automate green building compliance, visualize carbon data in 3D, and optimize for sustainability with AI. Built for the China-ASEAN construction corridor.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/dashboard">
                <Button size="lg" className="gap-2">
                  <Building2 className="h-5 w-5" />
                  Get Started
                </Button>
              </Link>
              <Button size="lg" variant="outline" className="gap-2">
                <FileCheck className="h-5 w-5" />
                View Demo
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Features Grid */}
      <section className="container mx-auto px-4 py-16 md:py-24">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold text-gray-900 dark:text-white">
            Four Core Solutions
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Comprehensive AI-powered tools for green building excellence
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-2">
          {/* Feature 1: Compliance Auditor */}
          <div className="group rounded-xl border bg-card p-8 shadow-sm transition-all hover:shadow-lg">
            <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100 dark:bg-blue-900">
              <FileCheck className="h-6 w-6 text-blue-600 dark:text-blue-300" />
            </div>
            <h3 className="mb-2 text-xl font-semibold">Automated Compliance Auditor</h3>
            <p className="mb-4 text-gray-600 dark:text-gray-400">
              Upload bills of quantities and specs. AI cross-references against GBL, GBI, LEED, and BREEAM standards, auto-generating compliance scorecards.
            </p>
            <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
              <li>✓ Document parsing with Gemini 1.5 Pro</li>
              <li>✓ VOC, GWP, recycled content verification</li>
              <li>✓ 80% faster than manual audits</li>
            </ul>
          </div>

          {/* Feature 2: Green Heatmap */}
          <div className="group rounded-xl border bg-card p-8 shadow-sm transition-all hover:shadow-lg">
            <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-green-100 dark:bg-green-900">
              <Building2 className="h-6 w-6 text-green-600 dark:text-green-300" />
            </div>
            <h3 className="mb-2 text-xl font-semibold">3D Green Heatmap</h3>
            <p className="mb-4 text-gray-600 dark:text-gray-400">
              Visualize your BIM model with color-coded performance overlays. Identify thermal bridges, daylight deficiencies, and high-carbon zones instantly.
            </p>
            <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
              <li>✓ IFC.js browser-based rendering</li>
              <li>✓ Real-time embodied carbon display</li>
              <li>✓ Interactive material inspection</li>
            </ul>
          </div>

          {/* Feature 3: Optimization Assistant */}
          <div className="group rounded-xl border bg-card p-8 shadow-sm transition-all hover:shadow-lg">
            <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-purple-100 dark:bg-purple-900">
              <MessageSquare className="h-6 w-6 text-purple-600 dark:text-purple-300" />
            </div>
            <h3 className="mb-2 text-xl font-semibold">AI Optimization Assistant</h3>
            <p className="mb-4 text-gray-600 dark:text-gray-400">
              Natural language queries like &quot;How do I reach Gold certification?&quot; Receive actionable suggestions with local supplier recommendations.
            </p>
            <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
              <li>✓ Context-aware recommendations</li>
              <li>✓ Cost-benefit analysis</li>
              <li>✓ Alternative material suggestions</li>
            </ul>
          </div>

          {/* Feature 4: Cross-Border Translator */}
          <div className="group rounded-xl border bg-card p-8 shadow-sm transition-all hover:shadow-lg">
            <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-orange-100 dark:bg-orange-900">
              <Globe className="h-6 w-6 text-orange-600 dark:text-orange-300" />
            </div>
            <h3 className="mb-2 text-xl font-semibold">Cross-Border Standard Translator</h3>
            <p className="mb-4 text-gray-600 dark:text-gray-400">
              Toggle between China GBL and ASEAN standards. Instantly see compliance gaps and required adjustments for regional expansion.
            </p>
            <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
              <li>✓ GBL ⇄ GBI ⇄ LEED mapping</li>
              <li>✓ Regional requirement analysis</li>
              <li>✓ Belt & Road Initiative support</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="border-t bg-muted/30">
        <div className="container mx-auto px-4 py-16">
          <div className="grid gap-8 md:grid-cols-3">
            <div className="text-center">
              <div className="mb-2 text-4xl font-bold text-emerald-600">80%</div>
              <div className="text-gray-600 dark:text-gray-400">Faster Audit Time</div>
            </div>
            <div className="text-center">
              <div className="mb-2 text-4xl font-bold text-emerald-600">4</div>
              <div className="text-gray-600 dark:text-gray-400">Major Standards Supported</div>
            </div>
            <div className="text-center">
              <div className="mb-2 text-4xl font-bold text-emerald-600">1M+</div>
              <div className="text-gray-600 dark:text-gray-400">Token Context Window</div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-8">
        <div className="container mx-auto px-4 text-center text-sm text-gray-600 dark:text-gray-400">
          <p>© 2026 OmniBuild AI. Supporting the Double Carbon Goals and Digital Silk Road.</p>
        </div>
      </footer>
    </div>
  );
}
