import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, CheckCircle2, Cookie, HardDrive, ShieldCheck, Trash2 } from "lucide-react";

export const metadata: Metadata = {
  title: "Cookie & Storage Policy | PhoneLocating",
  description: "Learn how PhoneLocating utilizes essential local storage and privacy-focused storage technologies.",
};

export default function CookiesPage() {
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
        <Cookie size={16} />
        Storage & Data Disclosure
      </div>

      <h1 className="mt-3 text-3xl sm:text-4xl font-bold tracking-tight text-slate-950">
        Cookie & Storage Policy
      </h1>
      <p className="mt-2 text-sm text-slate-500">
        Last reviewed: {new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
      </p>

      <div className="mt-8 space-y-8 text-base leading-7">
        {/* Core Guarantee */}
        <section className="rounded-2xl border border-emerald-200 bg-emerald-50/60 p-6">
          <div className="flex items-center gap-2 font-semibold text-emerald-950 text-lg">
            <ShieldCheck size={20} className="text-emerald-600" />
            <h2>Zero Third-Party Tracking Cookies</h2>
          </div>
          <p className="mt-2 text-sm text-emerald-900/90 leading-6">
            PhoneLocating respects your online privacy. We <strong>do not use invasive marketing cookies</strong>, behavioral tracking pixels, or cross-site commercial trackers. We do not sell your browsing patterns to advertisers.
          </p>
        </section>

        {/* What We Use */}
        <section>
          <div className="flex items-center gap-2 font-bold text-slate-950 text-xl">
            <HardDrive size={18} className="text-blue-600" />
            <h2>1. Essential Functional Local Storage</h2>
          </div>
          <p className="mt-3 text-sm text-slate-600">
            Instead of tracking cookies, PhoneLocating utilizes HTML5 standard browser local storage (localStorage)
            strictly for essential functionality. This storage remains entirely on your personal device and is never
            shared with external advertising networks:
          </p>
          <ul className="mt-4 space-y-3 text-sm text-slate-600">
            <li className="flex items-start gap-3">
              <CheckCircle2 size={18} className="text-blue-600 shrink-0 mt-0.5" />
              <span>
                <strong>License & Dossier Recovery Token:</strong> When you purchase an intelligence report for $9.99, a cryptographic validation token is stored locally in your browser. This ensures that if you reload the page, switch tabs, or return later, your unlocked report and satellite coordinates remain accessible without requiring another payment.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 size={18} className="text-blue-600 shrink-0 mt-0.5" />
              <span>
                <strong>Active Query State:</strong> Stores the most recent target phone number you looked up so you can export your PDF report without re-typing the digits.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 size={18} className="text-blue-600 shrink-0 mt-0.5" />
              <span>
                <strong>Stripe Secure Checkout Verification:</strong> Temporary session cookies utilized by Stripe during the payment window to authenticate SSL security and prevent fraudulent transactions.
              </span>
            </li>
          </ul>
        </section>

        {/* Why No Consent Banner is Needed */}
        <section>
          <h2 className="text-xl font-bold text-slate-950">2. Regulatory Exemption for Strictly Necessary Storage</h2>
          <p className="mt-3 text-sm text-slate-600">
            Under the EU ePrivacy Directive (Article 5(3)) and GDPR guidelines, technical storage elements that are
            strictly necessary to provide a service explicitly requested by the user (such as fulfilling a digital report
            purchase and preserving session licenses) are exempt from requiring disruptive tracking consent pop-ups.
          </p>
        </section>

        {/* How to Delete */}
        <section className="rounded-2xl border border-slate-200 bg-slate-50/70 p-6">
          <div className="flex items-center gap-2 font-semibold text-slate-950 text-base">
            <Trash2 size={18} className="text-slate-600" />
            <h3>3. Managing and Deleting Local Storage</h3>
          </div>
          <p className="mt-2 text-sm text-slate-600">
            You retain absolute control over data stored on your device. You can erase all cached phone numbers and report
            licenses at any time directly through your web browser:
          </p>
          <ul className="mt-3 list-disc pl-5 space-y-1 text-xs text-slate-600">
            <li><strong>Chrome / Brave / Edge:</strong> Settings &gt; Privacy and security &gt; Delete browsing data &gt; Cookies and other site data.</li>
            <li><strong>Safari:</strong> Settings &gt; Safari &gt; Advanced &gt; Website Data &gt; Remove All.</li>
            <li><strong>Firefox:</strong> Options &gt; Privacy &amp; Security &gt; Cookies and Site Data &gt; Clear Data.</li>
          </ul>
        </section>
      </div>
    </article>
  );
}
