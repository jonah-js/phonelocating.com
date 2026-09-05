import type { Metadata } from "next";

export const metadata: Metadata = { title: "Privacy", description: "Privacy information for PhoneTracking." };

export default function PrivacyPage() {
  return (
    <article className="mx-auto max-w-3xl px-6 py-20 leading-8 text-slate-600 lg:px-8">
      <h1 className="text-4xl font-semibold tracking-tight text-slate-950">Privacy</h1>
      <p className="mt-6">
        This placeholder privacy notice describes the processing of contact, payment and report data. Payments are
        processed by Stripe. Phone numbers are processed server-side for report generation and are never combined with
        secret keys in the browser. A legal review is required before production launch.
      </p>
    </article>
  );
}
