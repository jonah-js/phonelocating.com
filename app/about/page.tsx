import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Globe2,
  Lock,
  Radio,
  Satellite,
  ShieldCheck,
  Zap,
} from "lucide-react";

export const metadata: Metadata = {
  title: "About Us | PhoneLocating",
  description:
    "Learn about PhoneLocating's mission, high-precision satellite telemetry, and transparent one-time pricing.",
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-4xl px-6 py-16 sm:py-20 text-slate-700 lg:px-8">
      <Link
        href="/"
        className="inline-flex items-center gap-2 text-xs font-semibold text-blue-600 hover:text-blue-700 mb-8 transition"
      >
        <ArrowLeft size={14} />
        Back to PhoneLocating Home
      </Link>

      <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-blue-600">
        <Satellite size={16} />
        Our Technology & Mission
      </div>

      <h1 className="mt-3 text-3xl sm:text-5xl font-bold tracking-tight text-slate-950">
        About PhoneLocating
      </h1>

      <p className="mt-4 text-lg sm:text-xl leading-8 text-slate-600 font-normal">
        We engineered PhoneLocating to eliminate the deceptive subscriptions and invasive spyware that dominate the
        telecom search industry. Our platform delivers instant, verifiable telecommunication intelligence and 2-meter
        satellite visuals for a transparent, one-time fee.
      </p>

      {/* 3 Pillars Grid */}
      <div className="mt-12 grid gap-6 sm:grid-cols-3">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-card">
          <span className="grid size-10 place-items-center rounded-xl bg-blue-50 text-blue-600 ring-1 ring-blue-100">
            <Radio size={20} />
          </span>
          <h3 className="mt-4 text-base font-bold text-slate-950">Multi-Signal Triangulation</h3>
          <p className="mt-2 text-xs leading-5 text-slate-600">
            Real-time querying across global SS7 and HLR carrier registries combined with cellular tower cluster
            telemetry.
          </p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-card">
          <span className="grid size-10 place-items-center rounded-xl bg-emerald-50 text-emerald-600 ring-1 ring-emerald-100">
            <ShieldCheck size={20} />
          </span>
          <h3 className="mt-4 text-base font-bold text-slate-950">100% Spyware Free</h3>
          <p className="mt-2 text-xs leading-5 text-slate-600">
            Zero app installation or target software required. Searches run non-invasively through global network routing
            channels.
          </p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-card">
          <span className="grid size-10 place-items-center rounded-xl bg-indigo-50 text-indigo-600 ring-1 ring-indigo-100">
            <Lock size={20} />
          </span>
          <h3 className="mt-4 text-base font-bold text-slate-950">$9.99 One-Time Fee</h3>
          <p className="mt-2 text-xs leading-5 text-slate-600">
            Strictly one payment per dossier. We never enrol customers into recurring subscription traps or hidden recurring
            charges.
          </p>
        </div>
      </div>

      {/* Main Narrative Sections */}
      <div className="mt-14 space-y-10 text-base leading-7">
        <section>
          <h2 className="text-2xl font-bold tracking-tight text-slate-950">The Problem We Solved</h2>
          <p className="mt-3">
            For years, individuals trying to locate a lost device, identify an aggressive unknown caller, or verify a
            suspicious foreign phone number were faced with two bad choices: shady spyware apps that compromise personal
            devices, or deceptive lookup directories that lure users with &quot;$1 trials&quot; and secretly bill them $49.99 every
            month thereafter.
          </p>
          <p className="mt-3">
            PhoneLocating was built from the ground up on honesty, transparency, and advanced telecommunication engineering.
            You search a single number, pay an honest one-time fee of <strong>$9.99 / 9.99 €</strong>, and immediately unlock
            an exhaustive intelligence dossier with high-resolution 2-meter satellite optics.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold tracking-tight text-slate-950">How Our Technology Works</h2>
          <p className="mt-3">
            When you initiate a lookup on PhoneLocating, our distributed server infrastructure executes a sequential four-tier
            analytical pipeline:
          </p>
          <ul className="mt-4 space-y-3 text-sm text-slate-600">
            <li className="flex items-start gap-3">
              <CheckCircle2 size={18} className="text-blue-600 shrink-0 mt-0.5" />
              <span>
                <strong>E.164 Format & Routing Validation:</strong> Confirms international telecom country codes, mobile
                switching centers (MSC), and telecommunication carrier allocation.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 size={18} className="text-blue-600 shrink-0 mt-0.5" />
              <span>
                <strong>HLR & VLR Register Query:</strong> Interrogates Home Location Register signals to determine active
                SIM state, IMSI prefixes, and carrier porting history.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 size={18} className="text-blue-600 shrink-0 mt-0.5" />
              <span>
                <strong>Cellular Tower Triangulation:</strong> Cross-references active cellular cluster identifiers
                (CID/LAC) with international tower mapping data to narrow the target perimeter.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 size={18} className="text-blue-600 shrink-0 mt-0.5" />
              <span>
                <strong>Orbital 2M Satellite Imagery:</strong> Synthesizes real-time coordinate data with high-resolution
                aerial optical satellite tiles, rendering an interactive 3D WebGL globe focusing directly on the target
                zone.
              </span>
            </li>
          </ul>
        </section>

        <section className="rounded-2xl border border-slate-200 bg-slate-50/70 p-6 sm:p-8">
          <div className="flex items-center gap-2 text-slate-900 font-bold text-lg">
            <Globe2 size={22} className="text-blue-600" />
            <h3>Our Privacy-First Architecture</h3>
          </div>
          <p className="mt-2 text-sm text-slate-600 leading-6">
            We hold ourselves to strict European General Data Protection Regulation (GDPR) standards. We never sell lookup
            queries to marketing brokers, we do not deploy invasive tracking cookies, and we operate strictly under
            lawful OSINT (Open-Source Intelligence) and telecom verification frameworks.
          </p>
        </section>

        {/* CTA */}
        <section className="rounded-3xl border border-blue-200 bg-gradient-to-r from-blue-600 to-indigo-700 p-8 text-white shadow-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-blue-200 uppercase tracking-wider">
              <Zap size={14} className="text-amber-300" />
              Ready to verify a number?
            </div>
            <h3 className="mt-2 text-2xl font-bold">Start an Intelligence Scan in 60 Seconds</h3>
            <p className="mt-1 text-sm text-blue-100 max-w-md">
              Enter any international or domestic phone number on our homepage to preview live carrier telemetry.
            </p>
          </div>
          <Link
            href="/#report"
            className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-blue-700 shadow-md transition hover:bg-blue-50 shrink-0"
          >
            <span>Track Number Now</span>
            <ArrowRight size={16} />
          </Link>
        </section>
      </div>
    </div>
  );
}
