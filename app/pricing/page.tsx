import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Pricing",
  description: "One-time pricing for unlocked phone intelligence reports.",
};

export default function PricingPage() {
  return (
    <section className="mx-auto max-w-5xl px-6 py-20 lg:px-8">
      <h1 className="text-4xl font-semibold tracking-tight text-slate-950">One price. One complete report.</h1>
      <p className="mt-4 max-w-2xl text-lg leading-8 text-slate-600">
        Preview reports are free. A complete report is unlocked with a one-time EUR 9.99 payment per phone number.
      </p>
      <div className="mt-10 rounded-lg border border-slate-200 bg-white p-8 shadow-soft">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-blue-700">Complete report</p>
        <p className="mt-4 text-5xl font-semibold text-slate-950">9,99 EUR</p>
        <p className="mt-4 text-slate-600">Includes precision metrics, risk indicators and export-ready report data.</p>
        <Link
          href="/#report"
          className="mt-8 inline-flex rounded-full bg-blue-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
        >
          Generate report
        </Link>
      </div>
    </section>
  );
}
