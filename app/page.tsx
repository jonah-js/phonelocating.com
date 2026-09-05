import FeatureCard from "@/components/FeatureCard";
import Hero from "@/components/Hero";
import TrustSection from "@/components/TrustSection";
import { features } from "@/lib/content";

export default function Home() {
  return (
    <>
      <Hero />
      <TrustSection />
      <section id="features" className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-blue-700">Report modules</p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-slate-950 md:text-4xl">
            Built for clear decisions, not noisy lookups.
          </h2>
          <p className="mt-4 text-lg leading-8 text-slate-600">
            Each signal is separated, scored and explained so the report stays useful for reviews, support and compliance workflows.
          </p>
        </div>
        <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <FeatureCard key={feature.title} {...feature} />
          ))}
        </div>
      </section>
    </>
  );
}
