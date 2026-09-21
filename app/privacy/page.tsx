import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, CheckCircle2, Database, Lock, Mail, ShieldCheck, UserCheck } from "lucide-react";

export const metadata: Metadata = {
  title: "Privacy Policy | PhoneLocating",
  description: "Official Privacy Policy for PhoneLocating. Compliant with GDPR, CCPA, and international data protection standards.",
};

export default function PrivacyPage() {
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
        <ShieldCheck size={16} />
        Privacy by Design & Data Governance
      </div>

      <h1 className="mt-3 text-3xl sm:text-4xl font-bold tracking-tight text-slate-950">
        Privacy Policy
      </h1>
      <p className="mt-2 text-sm text-slate-500">
        Effective date: {new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
      </p>

      <div className="mt-8 space-y-8 text-base leading-7">
        {/* Core Guarantee */}
        <section className="rounded-2xl border border-blue-200 bg-blue-50/60 p-6">
          <div className="flex items-center gap-2.5 font-semibold text-blue-950 text-lg">
            <Lock size={20} className="text-blue-600" />
            <h2>Our Fundamental Privacy Commitment</h2>
          </div>
          <p className="mt-2 text-sm text-blue-900/90 leading-6">
            PhoneLocating is engineered as an anonymous, non-invasive intelligence gateway. We <strong>never install software or spyware</strong> on target devices, we <strong>never sell personal data to advertisers or data brokers</strong>, and we operate strictly under international privacy frameworks (including the EU General Data Protection Regulation GDPR and California Consumer Privacy Act CCPA).
          </p>
        </section>

        {/* Data Controller */}
        <section>
          <h2 className="text-xl font-bold text-slate-950">1. Data Controller</h2>
          <p className="mt-3 text-sm text-slate-600">
            The data controller responsible for the operation of PhoneLocating.com is:
            <br />
            <strong>PhoneLocating Data Protection & Security Directorate</strong>
            <br />
            Email:{" "}
            <a href="mailto:privacy@phonelocating.com" className="text-blue-600 hover:underline">
              privacy@phonelocating.com
            </a>
          </p>
        </section>

        {/* Categories of Data Processed */}
        <section>
          <div className="flex items-center gap-2 font-bold text-slate-950 text-xl">
            <Database size={18} className="text-blue-600" />
            <h2>2. Information We Process</h2>
          </div>
          <p className="mt-3 text-sm text-slate-600">
            We collect and process the minimum amount of technical information necessary to deliver our lookup reports:
          </p>
          <ul className="mt-4 space-y-3 text-sm text-slate-600">
            <li className="flex items-start gap-3">
              <CheckCircle2 size={18} className="text-emerald-600 shrink-0 mt-0.5" />
              <span>
                <strong>Queried Phone Numbers:</strong> When you input a phone number, it is processed server-side in real time to interrogate telecommunications HLR/SS7 registers. Phone numbers are stored ephemerally in server cache to compile the requested dossier.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 size={18} className="text-emerald-600 shrink-0 mt-0.5" />
              <span>
                <strong>Payment Information:</strong> Financial transactions are executed directly through Stripe Inc. PhoneLocating never receives, handles, or stores raw credit card numbers or CVV codes. We only receive a secure transaction token and receipt identifier confirming your one-time $9.99 payment.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 size={18} className="text-emerald-600 shrink-0 mt-0.5" />
              <span>
                <strong>Client-Side Local Storage:</strong> We use functional browser localStorage solely to preserve your purchased report license so you can refresh the browser or export your PDF without losing your paid results.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 size={18} className="text-emerald-600 shrink-0 mt-0.5" />
              <span>
                <strong>Technical Connection Data:</strong> Standard server access logs (masked IP address, request timestamp, browser user-agent) are retained temporarily for security, rate limiting, and DDoS prevention.
              </span>
            </li>
          </ul>
        </section>

        {/* Legal Bases */}
        <section>
          <h2 className="text-xl font-bold text-slate-950">3. Legal Bases for Processing (GDPR Art. 6)</h2>
          <div className="mt-3 space-y-2 text-sm text-slate-600">
            <p>
              <strong>Performance of a Contract (Art. 6(1)(b) GDPR):</strong> Processing is necessary to execute your lookup request, generate the intelligence report, and process the one-time $9.99 payment.
            </p>
            <p>
              <strong>Legitimate Interests (Art. 6(1)(f) GDPR):</strong> Maintaining server stability, preventing abusive automated queries, detecting payment fraud, and ensuring network security.
            </p>
          </div>
        </section>

        {/* Third-Party Service Providers */}
        <section>
          <h2 className="text-xl font-bold text-slate-950">4. Third-Party Infrastructure & Sub-Processors</h2>
          <p className="mt-3 text-sm text-slate-600">
            We partner exclusively with enterprise-grade, certified infrastructure providers:
          </p>
          <ul className="mt-3 list-disc pl-5 space-y-1.5 text-sm text-slate-600">
            <li>
              <strong>Stripe Payments Inc.:</strong> Payment processing, fraud detection, and checkout flow (PCI-DSS Level 1 compliant).
            </li>
            <li>
              <strong>Cloud Delivery & Edge Hosting:</strong> Secure content delivery, DNS routing, and 256-bit SSL encrypted transport.
            </li>
            <li>
              <strong>Telecom SS7/HLR Gateway Providers:</strong> Real-time telecommunication signalling queries for carrier routing validation.
            </li>
          </ul>
        </section>

        {/* Data Retention */}
        <section>
          <h2 className="text-xl font-bold text-slate-950">5. Data Retention & Erasure</h2>
          <p className="mt-3 text-sm text-slate-600">
            Search queries and temporary cache entries are retained only as long as necessary to facilitate report delivery. License verification tokens are retained in functional database memory to permit user access to reports and handle customer support inquiries. Users can clear their local browser history and saved report cache at any time via browser settings.
          </p>
        </section>

        {/* User Rights */}
        <section>
          <div className="flex items-center gap-2 font-bold text-slate-950 text-xl">
            <UserCheck size={18} className="text-blue-600" />
            <h2>6. Your Statutory Rights</h2>
          </div>
          <p className="mt-3 text-sm text-slate-600">
            Under international privacy regulations (GDPR and CCPA), you possess full legal rights regarding your data:
          </p>
          <div className="mt-3 grid gap-3 sm:grid-cols-2 text-xs text-slate-600">
            <div className="rounded-xl border border-slate-200 bg-white p-3.5 shadow-xs">
              <strong className="text-slate-900 block text-sm">Right of Access (Art. 15 GDPR)</strong>
              Request confirmation and copies of personal data processed.
            </div>
            <div className="rounded-xl border border-slate-200 bg-white p-3.5 shadow-xs">
              <strong className="text-slate-900 block text-sm">Right to Erasure (Art. 17 GDPR)</strong>
              Request the immediate deletion of cached numbers or transaction logs.
            </div>
            <div className="rounded-xl border border-slate-200 bg-white p-3.5 shadow-xs">
              <strong className="text-slate-900 block text-sm">Right to Restriction (Art. 18 GDPR)</strong>
              Limit the scope of processing under specific legal conditions.
            </div>
            <div className="rounded-xl border border-slate-200 bg-white p-3.5 shadow-xs">
              <strong className="text-slate-900 block text-sm">Right to Object (Art. 21 GDPR)</strong>
              Object to processing based on legitimate business interests.
            </div>
          </div>
        </section>

        {/* Privacy Contact */}
        <section className="rounded-2xl border border-slate-200 bg-slate-50/70 p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h3 className="text-base font-semibold text-slate-950 flex items-center gap-2">
              <Mail size={18} className="text-blue-600" />
              Privacy Officer Inquiries
            </h3>
            <p className="text-xs text-slate-600 mt-1">
              To exercise your GDPR/CCPA data rights or submit a data removal request, contact our privacy desk directly.
            </p>
          </div>
          <a
            href="mailto:privacy@phonelocating.com"
            className="inline-flex items-center justify-center rounded-xl bg-blue-600 px-5 py-2.5 text-xs font-semibold text-white shadow-xs hover:bg-blue-700 transition shrink-0"
          >
            Contact Privacy Desk
          </a>
        </section>
      </div>
    </article>
  );
}
