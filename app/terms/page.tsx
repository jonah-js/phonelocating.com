import type { Metadata } from "next";

export const metadata: Metadata = { title: "Terms", description: "Terms and conditions." };

export default function TermsPage() {
  return (
    <article className="mx-auto max-w-3xl px-6 py-20 leading-8 text-slate-600 lg:px-8">
      <h1 className="text-4xl font-semibold tracking-tight text-slate-950">Terms</h1>
      <p className="mt-6">
        PhoneTracking provides individual digital reports. Use is limited to lawful purposes. Availability, data
        sources and accuracy can vary by provider. Replace these placeholder terms with legally reviewed terms before
        production launch.
      </p>
    </article>
  );
}
