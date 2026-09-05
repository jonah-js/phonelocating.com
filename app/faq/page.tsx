import type { Metadata } from "next";
import FAQAccordion from "@/components/FAQAccordion";

export const metadata: Metadata = {
  title: "FAQ",
  description: "Frequently asked questions about PhoneTracking.",
};

const items = [
  {
    question: "What does a report include?",
    answer:
      "A report includes validation, normalized formats, carrier context, timezone, location confidence and, after unlock, risk indicators and export-ready data.",
  },
  {
    question: "Is payment one-time?",
    answer: "Yes. Unlocking applies to the requested phone number and costs EUR 9.99 once.",
  },
  {
    question: "Why validate licenses server-side?",
    answer:
      "Server-side validation enables revocation, reduces abuse and keeps signing secrets out of the browser.",
  },
  {
    question: "Are the current results real carrier data?",
    answer:
      "This implementation uses a mock provider behind a stable provider interface. Real data providers can be added in lib/providers.",
  },
];

export default function FAQPage() {
  return (
    <section className="mx-auto max-w-4xl px-6 py-20 lg:px-8">
      <h1 className="text-4xl font-semibold tracking-tight text-slate-950">Frequently asked questions</h1>
      <div className="mt-8">
        <FAQAccordion items={items} />
      </div>
    </section>
  );
}
