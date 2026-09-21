import type { Metadata } from "next";
import FeatureCard from "@/components/FeatureCard";
import { features } from "@/lib/content";

export const metadata: Metadata = {
  title: "Features",
  description: "PhoneLocating report capabilities.",
};

export default function FeaturesPage() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
      <h1 className="text-4xl font-semibold tracking-tight text-slate-950">Features for professional reports</h1>
      <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-600">
        PhoneLocating combines validation, carrier context, location confidence and license-gated risk data in a
        structured report system.
      </p>
      <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {features.map((feature) => (
          <FeatureCard key={feature.title} {...feature} />
        ))}
      </div>
    </section>
  );
}
