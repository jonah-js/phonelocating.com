import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Check, Lock, ShieldCheck, Sparkles } from "lucide-react";

export const metadata: Metadata = {
  title: "Pricing & Plans",
  description: "Transparent one-time pricing for full 2M phone intelligence reports.",
};

const freeFeatures = [
  "Carrier & connection line type lookup",
  "International format verification & country routing",
  "Regional timezone & jurisdiction",
  "Rough continental sector on 3D Globe",
  "Basic syntax & validity audit",
];

const paidFeatures = [
  "Everything in the free preview",
  "High-precision GPS coordinates (latitude & longitude)",
  "2M High-Resolution Satellite Aerial Photography",
  "Interactive 3D Satellite Globe with target camera flight",
  "Cell tower triangulation footprint & CID identifier",
  "Comprehensive fraud & spoofing risk safety score",
  "Official printable PDF dossier & lifetime browser storage",
  "Direct SS7 / HLR carrier register verification",
];

export default function PricingPage() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-16 lg:px-8">
      <div className="text-center max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-1.5 rounded-full border border-blue-200 bg-blue-50 px-3.5 py-1 text-xs font-semibold text-blue-700">
          <Sparkles size={13} />
          Transparent One-Time Payment · Zero Subscriptions
        </div>
        <h1 className="mt-4 text-4xl font-bold tracking-tight text-slate-950 sm:text-5xl">
          One Honest Price. One Complete Dossier.
        </h1>
        <p className="mt-4 text-lg text-slate-600">
          The basic carrier check is always free. Unlock the full forensic intelligence dossier and unmasked 2M satellite
          aerial optics for a single, one-time payment of $9.99 / 9.99 € per number.
        </p>
      </div>

      <div className="mt-14 grid gap-8 lg:grid-cols-2 max-w-4xl mx-auto items-stretch">
        {/* Free Plan */}
        <div className="flex flex-col justify-between rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
          <div>
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-slate-950">Preview Report</h2>
              <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">Basic</span>
            </div>
            <p className="mt-2 text-sm text-slate-600">
              Quick verification of country, carrier, and phone number validity.
            </p>
            <div className="mt-6 flex items-baseline gap-1">
              <span className="text-4xl font-bold text-slate-950">$0.00</span>
              <span className="text-xs text-slate-500">free preview</span>
            </div>

            <ul className="mt-8 space-y-3 text-sm text-slate-700">
              {freeFeatures.map((feature) => (
                <li key={feature} className="flex items-center gap-3">
                  <Check size={16} className="text-slate-400 shrink-0" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          <Link
            href="/#report"
            className="mt-8 block rounded-full border border-slate-300 bg-slate-50 px-6 py-3 text-center text-sm font-semibold text-slate-800 transition hover:bg-slate-100"
          >
            Test Free Preview
          </Link>
        </div>

        {/* Complete Plan ($9.99) */}
        <div className="relative flex flex-col justify-between rounded-3xl border-2 border-blue-600 bg-white p-8 shadow-card">
          <div className="absolute -top-3.5 right-8 rounded-full bg-blue-600 px-3.5 py-1 text-xs font-semibold text-white shadow-sm">
            Recommended
          </div>

          <div>
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-slate-950">Full 2M Forensic Dossier</h2>
              <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">All-Inclusive</span>
            </div>
            <p className="mt-2 text-sm text-slate-600">
              Complete geolocation, 2M satellite aerial optics, cell tower identification, and forensic PDF export.
            </p>
            <div className="mt-6 flex items-baseline gap-1.5">
              <span className="text-4xl font-bold text-slate-950">$9.99</span>
              <span className="text-xs font-semibold text-slate-500">/ 9.99 € one-time (no recurring fees)</span>
            </div>

            <ul className="mt-8 space-y-3 text-sm text-slate-700">
              {paidFeatures.map((feature) => (
                <li key={feature} className="flex items-center gap-3">
                  <Check size={16} className="text-blue-600 shrink-0" />
                  <span className="font-medium text-slate-900">{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-8 space-y-3">
            <Link
              href="/#report"
              className="flex items-center justify-center gap-2 rounded-full bg-blue-600 px-6 py-3.5 text-sm font-semibold text-white shadow-md transition hover:bg-blue-700"
            >
              <span>Track Number Now</span>
              <ArrowRight size={16} />
            </Link>

            <div className="flex items-center justify-center gap-3 text-xs text-slate-500">
              <span className="flex items-center gap-1">
                <Lock size={12} className="text-emerald-600" /> Stripe Secure Checkout
              </span>
              <span>·</span>
              <span className="flex items-center gap-1">
                <ShieldCheck size={12} className="text-blue-600" /> Instant Access
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
