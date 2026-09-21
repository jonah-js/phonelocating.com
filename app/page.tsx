import Link from "next/link";
import { ArrowRight, Smartphone, Globe2, Lock, ShieldCheck, Sparkles } from "lucide-react";
import FeatureCard from "@/components/FeatureCard";
import GlobeFeatureSection from "@/components/GlobeFeatureSection";
import Hero from "@/components/Hero";
import ReviewsSection from "@/components/ReviewsSection";
import TrustSection from "@/components/TrustSection";
import UseCasesSection from "@/components/UseCasesSection";
import FAQSection from "@/components/FAQSection";
import { features } from "@/lib/content";

const steps = [
  {
    step: "01",
    title: "Enter Phone Number",
    description: "Input any domestic or international number (e.g. +1 US, +44 UK, +49 DE, +61 AU).",
    icon: Smartphone,
  },
  {
    step: "02",
    title: "Real-Time Scan & 3D Globe",
    description: "Our engine queries HLR network registers and flies the 3D Satellite Globe directly to the target region.",
    icon: Globe2,
  },
  {
    step: "03",
    title: "Unlock 2M Forensic Dossier",
    description: "For a one-time $9.99 / 9.99 € payment via Stripe, unlock unmasked 2M aerial satellite optics and exact GPS coordinates.",
    icon: Lock,
  },
  {
    step: "04",
    title: "Print & Export PDF",
    description: "Download the complete official intelligence dossier as a verifiable PDF report for your records.",
    icon: ShieldCheck,
  },
];

export default function Home() {
  return (
    <>
      {/* Hero with search input & satellite zoom-in video */}
      <Hero />

      {/* Trust badges row */}
      <TrustSection />

      {/* Dedicated Interactive 3D Satellite & 2M Aerial Optics Section */}
      <GlobeFeatureSection />

      {/* Customer Reviews Section: 1,100+ customers & 4.89 rating */}
      <ReviewsSection />

      {/* Real-World Use Cases & Applications: Why You Need NumberLocating */}
      <UseCasesSection />

      {/* How It Works Section */}
      <section className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
        <div className="text-center max-w-3xl mx-auto">
          <p className="text-xs font-semibold uppercase tracking-wider text-blue-700">Simple 4-Step Process</p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
            From Number Input to Full Dossier in Under 60 Seconds
          </h2>
          <p className="mt-4 text-base text-slate-600">
            Transparent pricing with zero subscription traps. You pay only a one-time $9.99 / 9.99 € fee per dossier.
          </p>
        </div>

        <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map(({ step, title, description, icon: Icon }) => (
            <div
              key={step}
              className="relative flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-6 shadow-card transition hover:shadow-lg"
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className="grid size-10 place-items-center rounded-xl bg-blue-50 text-blue-600 ring-1 ring-blue-100">
                    <Icon size={20} />
                  </span>
                  <span className="font-mono text-2xl font-bold text-slate-200">{step}</span>
                </div>
                <h3 className="mt-5 text-base font-bold text-slate-950">{title}</h3>
                <p className="mt-2 text-xs leading-5 text-slate-600">{description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="border-t border-slate-200 bg-slate-50/60 py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-wider text-blue-700">Technology & Data Sources</p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
              Engineered for Precision Telecom Verification and Actionable Insight.
            </h2>
            <p className="mt-4 text-base leading-7 text-slate-600">
              Every signal is cross-referenced with telecommunication registries, HLR gateways, and satellite feeds.
            </p>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {features.map((feature) => (
              <FeatureCard key={feature.title} {...feature} />
            ))}
          </div>
        </div>
      </section>

      {/* Frequently Asked Questions Section */}
      <FAQSection />

      {/* Bottom CTA Banner */}
      <section className="mx-auto max-w-7xl px-6 pb-20 lg:px-8">
        <div className="rounded-3xl border border-blue-200 bg-gradient-to-r from-blue-600 to-indigo-700 p-8 text-white shadow-xl sm:p-12">
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1 text-xs font-semibold backdrop-blur-sm">
              <Sparkles size={13} />
              Get Started
            </span>
            <h3 className="mt-4 text-2xl font-bold sm:text-3xl">Ready to Locate Your First Phone Number?</h3>
            <p className="mt-3 text-sm leading-6 text-blue-100">
              Enter any domestic or international phone number above and preview instant carrier data and the 3D Satellite Globe.
            </p>
            <div className="mt-6 flex flex-wrap gap-4">
              <Link
                href="/#report"
                className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-blue-700 shadow-md transition hover:bg-blue-50"
              >
                <span>Track Number Now</span>
                <ArrowRight size={16} />
              </Link>
              <Link
                href="/pricing"
                className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-6 py-3 text-sm font-semibold text-white backdrop-blur-sm transition hover:bg-white/20"
              >
                <span>View Pricing ($9.99)</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
