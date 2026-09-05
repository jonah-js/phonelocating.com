import type { Metadata } from "next";

export const metadata: Metadata = { title: "Legal Notice", description: "Legal notice for PhoneTracking." };

export default function LegalNoticePage() {
  return (
    <article className="mx-auto max-w-3xl px-6 py-20 leading-8 text-slate-600 lg:px-8">
      <h1 className="text-4xl font-semibold tracking-tight text-slate-950">Legal Notice</h1>
      <p className="mt-6">
        Provider information: Sample Company PhoneTracking GmbH, Sample Street 1, 10115 Berlin. Represented by
        management. Email: contact@example.com. Replace this placeholder with legally reviewed production information
        before launch.
      </p>
    </article>
  );
}
