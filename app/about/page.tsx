import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description: "About PhoneTracking.",
};

export default function AboutPage() {
  return (
    <section className="mx-auto max-w-4xl px-6 py-20 lg:px-8">
      <h1 className="text-4xl font-semibold tracking-tight text-slate-950">About PhoneTracking</h1>
      <p className="mt-6 text-lg leading-8 text-slate-600">
        PhoneTracking is a technical report product for phone intelligence workflows. It focuses on traceable signals,
        clean license handling and a serious interface for interpreting results quickly.
      </p>
    </section>
  );
}
