import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, CheckCircle2, FileText, Gavel, ShieldCheck } from "lucide-react";

export const metadata: Metadata = {
  title: "Terms of Service | PhoneLocating",
  description: "Official Terms of Service and End-User Agreement for PhoneLocating intelligence services.",
};

export default function TermsPage() {
  return (
    <article className="mx-auto max-w-3xl px-6 py-16 sm:py-20 text-slate-700 lg:px-8">
      <Link
        href="/"
        className="inline-flex items-center gap-2 text-xs font-semibold text-blue-600 hover:text-blue-700 mb-8 transition"
      >
        <ArrowLeft size={14} />
        Back to PhoneLocating Home
      </Link>

      <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-blue-600">
        <FileText size={16} />
        Terms & Conditions
      </div>

      <h1 className="mt-3 text-3xl sm:text-4xl font-bold tracking-tight text-slate-950">
        Terms of Service
      </h1>
      <p className="mt-2 text-sm text-slate-500">
        Last updated: {new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
      </p>

      <div className="mt-8 space-y-8 text-base leading-7">
        {/* Intro */}
        <section className="rounded-2xl border border-slate-200 bg-slate-50/70 p-6">
          <h2 className="text-lg font-semibold text-slate-900">Agreement Overview</h2>
          <p className="mt-2 text-sm text-slate-600">
            By accessing or utilizing PhoneLocating.com (the &quot;Service&quot;), you enter into a legally binding agreement with
            PhoneLocating Global Operations (&quot;we,&quot; &quot;us,&quot; or &quot;our&quot;). If you do not accept these Terms in their entirety,
            you must not access or use the Service.
          </p>
        </section>

        {/* 1. Nature of Service & Pricing */}
        <section>
          <div className="flex items-center gap-2 font-bold text-slate-950 text-xl">
            <CheckCircle2 size={18} className="text-emerald-600" />
            <h2>1. Service Scope & One-Time Pricing</h2>
          </div>
          <p className="mt-3 text-sm text-slate-600">
            PhoneLocating is an advanced telecommunications intelligence and forensic analysis tool. Our system queries
            international telecommunication signalling protocols (including SS7, HLR/VLR registers) and orbital satellite
            imagery to generate technical dossiers.
          </p>
          <div className="mt-3 rounded-xl border border-emerald-200 bg-emerald-50/60 p-4 text-xs text-emerald-950">
            <strong>Strict One-Time Billing Policy:</strong> Each dossier is purchased as an individual, standalone report
            for a flat fee of <strong>$9.99 / 9.99 €</strong>. We do not sell monthly subscriptions, recurring memberships,
            or automated renewal plans. Each lookup is dedicated strictly to the single phone number requested.
          </div>
        </section>

        {/* 2. Acceptable & Lawful Use */}
        <section>
          <div className="flex items-center gap-2 font-bold text-slate-950 text-xl">
            <ShieldCheck size={18} className="text-blue-600" />
            <h2>2. Acceptable & Lawful Use Policy</h2>
          </div>
          <p className="mt-3 text-sm text-slate-600">
            Use of PhoneLocating is strictly contingent upon your agreement to utilize data solely for lawful, legitimate,
            and ethical purposes. You explicitly agree that you will NOT use the Service to:
          </p>
          <ul className="mt-3 space-y-2 text-sm text-slate-600 list-disc pl-5">
            <li>Harass, stalk, threaten, intimidate, or unlawfully surveil any person.</li>
            <li>Violate applicable local, state, national, or international privacy laws (including GDPR and CCPA).</li>
            <li>Conduct automated scraping, bulk data harvesting, or reverse-engineering of our API endpoints.</li>
            <li>Resell, sublicense, or commercially syndicate intelligence reports without prior contractual authorization.</li>
          </ul>
        </section>

        {/* 3. Data Precision & Technical Disclaimers */}
        <section>
          <h2 className="text-xl font-bold text-slate-950">3. Technical Capabilities & Accuracy Disclaimer</h2>
          <p className="mt-3 text-sm text-slate-600">
            PhoneLocating employs state-of-the-art multi-source triangulation algorithms capable of resolving ground
            locations up to 2 meters under optimal telecommunication network conditions. However, actual precision
            depends on third-party factors beyond our control, including cellular tower spacing, terrain, handset power
            status, SIM roaming state, and regional telecommunications registry latency. Intelligence dossiers are
            provided &quot;as is&quot; and &quot;as available&quot; as an analytical decision-support tool.
          </p>
        </section>

        {/* 4. Payment Terms & Refunds */}
        <section>
          <h2 className="text-xl font-bold text-slate-950">4. Payment Processing & Refund Procedures</h2>
          <p className="mt-3 text-sm text-slate-600">
            All credit card and digital wallet transactions are encrypted and processed through our authorized payment
            processor, Stripe Inc. Detailed terms regarding refund eligibility (such as technical failure to generate
            dossiers or duplicate transaction resolutions) are governed by our official{" "}
            <Link href="/refund" className="font-semibold text-blue-600 hover:underline">
              Refund Policy
            </Link>
            .
          </p>
        </section>

        {/* 5. Limitation of Liability */}
        <section>
          <div className="flex items-center gap-2 font-bold text-slate-950 text-xl">
            <Gavel size={18} className="text-slate-700" />
            <h2>5. Limitation of Liability</h2>
          </div>
          <p className="mt-3 text-sm text-slate-600">
            To the maximum extent permitted by applicable law, PhoneLocating and its officers, employees, agents, and
            infrastructure partners shall not be liable for any indirect, incidental, consequential, or punitive damages,
            or for any loss of profits, revenue, or data resulting from the use or inability to use the Service. In no
            event shall our aggregate liability exceed the total fee paid by you for the specific report in question ($9.99).
          </p>
        </section>

        {/* 6. Governing Law */}
        <section>
          <h2 className="text-xl font-bold text-slate-950">6. Governing Law & Dispute Resolution</h2>
          <p className="mt-3 text-sm text-slate-600">
            These Terms of Service are governed by and construed in accordance with international commercial law principles.
            Any disputes shall first be submitted in good faith to our technical support desk at{" "}
            <a href="mailto:support@phonelocating.com" className="text-blue-600 hover:underline">
              support@phonelocating.com
            </a>
            .
          </p>
        </section>
      </div>
    </article>
  );
}
