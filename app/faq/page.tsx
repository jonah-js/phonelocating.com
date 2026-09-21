"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight,
  ChevronDown,
  Globe2,
  HelpCircle,
  Lock,
  Mail,
  Receipt,
  Search,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";

type FAQItem = {
  category: "all" | "accuracy" | "pricing" | "privacy" | "coverage" | "support";
  question: string;
  answer: string;
};

const allFaqs: FAQItem[] = [
  // Accuracy & Tech
  {
    category: "accuracy",
    question: "How does the 2M satellite triangulation work?",
    answer:
      "Our platform queries global SS7 and HLR (Home Location Register) network registers to identify the serving cellular sector (CID) and mobile switching center (MSC). We then cross-reference signal delay telemetry with high-resolution orbital satellite feeds down to 1–2 meter building and street precision to render both exact coordinates and interactive 3D aerial optics.",
  },
  {
    category: "accuracy",
    question: "How accurate is the 2-meter satellite precision in practice?",
    answer:
      "In urban and suburban areas with active LTE/5G microcells, precision reaches 1–2 meters (pinpointing the exact building, driveway, or street sector). In more remote rural areas where cellular towers are widely spaced, the system identifies the primary serving tower sector and triangulation corridor with high confidence.",
  },
  {
    category: "accuracy",
    question: "Can I inspect the location with the interactive 3D satellite globe?",
    answer:
      "Yes. Once unlocked, the interactive 3D globe zooms into the exact target coordinates using high-resolution aerial imagery tiles (Esri World Imagery). You can freely pan, rotate, and zoom down to building and street level directly in your browser without installing any specialized software.",
  },

  // Pricing & License
  {
    category: "pricing",
    question: "Is the $9.99 fee truly a one-time payment with no subscription?",
    answer:
      "Yes, 100%. Many competitor sites advertise a '$0.99 trial' only to secretly enroll customers in a $49.99/month recurring auto-billing trap. PhoneLocating operates with total transparency: you pay an honest, one-time fee of $9.99 (or 9.99 €). There are zero recurring fees, zero memberships, and zero hidden charges.",
  },
  {
    category: "pricing",
    question: "How many phone numbers can I track with one purchase?",
    answer:
      "Each $9.99 purchase is a dedicated single-target license valid specifically for one phone number. This unlocks the complete 2M coordinates, unmasked cell tower CID, telecom routing hops, risk analysis, and lifetime access to the PDF dossier for that target number. If you need to track a different phone number, a separate license is generated for that number.",
  },
  {
    category: "pricing",
    question: "Will my unlocked report disappear if I refresh the page?",
    answer:
      "No. Your unlocked report and cryptographic license token are automatically saved to your browser's local cache. You can refresh the page, restart your device, or revisit the site days later — your unlocked dossier and 3D globe optics will remain fully accessible without paying again.",
  },
  {
    category: "pricing",
    question: "What payment methods are supported?",
    answer:
      "We process payments via Stripe, the world's most secure payment provider. We accept all major credit and debit cards (Visa, Mastercard, American Express, Discover), as well as Apple Pay and Google Pay. All transactions are protected with 256-bit SSL encryption.",
  },

  // Privacy & Confidentiality
  {
    category: "privacy",
    question: "Do I need to install any app on the target phone?",
    answer:
      "No. Absolutely zero software or app installation is required on the device you wish to locate. Unlike invasive spyware apps, our queries run entirely on the telecommunication carrier network level via public HLR registries and satellite triangulation.",
  },
  {
    category: "privacy",
    question: "Will the owner of the phone know that their number is being located?",
    answer:
      "No. The search is completely discreet and silent. No SMS, push notification, alert, or prompt is ever sent to the target phone during or after the lookup.",
  },
  {
    category: "privacy",
    question: "Is it legal to use this geolocation service?",
    answer:
      "Yes. All queries query public telecommunication carrier registries, HLR databases, and commercial orbital satellite telemetry in full compliance with GDPR, international telecom standards, and privacy laws. Our service is commonly used for anti-fraud verification, personal device recovery, and family safety.",
  },

  // Coverage & Detection
  {
    category: "coverage",
    question: "Does this work internationally in all countries?",
    answer:
      "Yes. Our global routing engine supports all international E.164 formats across 195+ countries and over 1,200 mobile operators, including AT&T, Verizon, T-Mobile, Vodafone, Deutsche Telekom, O2, Orange, EE, Telstra, and all major regional carriers.",
  },
  {
    category: "coverage",
    question: "Can this service detect whether a number is a VoIP or landline?",
    answer:
      "Yes. Our telecom intelligence distinguishes active mobile smartphones from fixed landlines and virtual VoIP trunks (e.g., Skype, Google Voice, burner phone apps). This is especially helpful for identifying marketplace scammers and fake businesses.",
  },
  {
    category: "coverage",
    question: "Can I locate a phone if it is turned off?",
    answer:
      "Yes. The system locates the last active cellular tower registration (last seen timestamp) and active HLR routing record, showing where the device was last connected before powering off.",
  },

  // Support & Reports
  {
    category: "support",
    question: "How do I download or print the official PDF report?",
    answer:
      "As soon as your report is unlocked, an official 'Download / Print Official PDF' button appears in the dossier header. Clicking it generates an ISO 27001-structured document complete with timestamps, coordinates, and network provider verification for your legal or personal records.",
  },
  {
    category: "support",
    question: "What if my payment went through but the dossier didn't unlock?",
    answer:
      "Your checkout includes an instant fallback activation link: simply click 'Already paid via Stripe? Click to activate report' in the report box, or return via your success URL. Our system will immediately verify your Stripe session and unlock your 2M dossier instantly.",
  },
  {
    category: "support",
    question: "What is your refund policy?",
    answer:
      "We stand behind the quality of our satellite intelligence. If our system is unable to return telecom carrier verification or if network registers for a valid number are unreachable, you are protected by our 14-day money-back guarantee. Contact support with your query details for immediate assistance.",
  },
];

const categoryTabs = [
  { id: "all", label: "All Questions" },
  { id: "accuracy", label: "Accuracy & Tech" },
  { id: "pricing", label: "Pricing & License" },
  { id: "privacy", label: "Privacy & Legal" },
  { id: "coverage", label: "Global Coverage" },
  { id: "support", label: "PDF & Support" },
] as const;

export default function FAQPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const filteredFaqs = allFaqs.filter((item) => {
    const matchesCategory = selectedCategory === "all" || item.category === selectedCategory;
    const matchesSearch =
      item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section className="mx-auto max-w-5xl px-6 py-16 lg:px-8 lg:py-24">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50/80 px-3.5 py-1 text-xs font-semibold text-blue-700">
          <HelpCircle size={13} className="text-blue-600" />
          <span>Knowledge Base & Support</span>
        </div>

        <h1 className="mt-4 text-4xl font-bold tracking-tight text-slate-950 sm:text-5xl">
          Frequently Asked Questions
        </h1>

        <p className="mt-4 text-base text-slate-600 sm:text-lg">
          Clear answers about 2M satellite accuracy, transparent $9.99 pricing, zero-app installation, and privacy compliance.
        </p>

        {/* Search Input */}
        <div className="mt-8 relative max-w-xl mx-auto">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 text-slate-400">
            <Search size={18} />
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search questions (e.g. accuracy, refund, Stripe, installation)..."
            className="w-full rounded-full border border-slate-200 bg-white py-3.5 pl-11 pr-4 text-sm text-slate-900 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100"
          />
        </div>

        {/* Category Filter Pills */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
          {categoryTabs.map((tab) => {
            const active = selectedCategory === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => {
                  setSelectedCategory(tab.id);
                  setOpenIndex(0);
                }}
                className={`rounded-full px-4 py-1.5 text-xs font-semibold transition cursor-pointer ${
                  active
                    ? "bg-blue-600 text-white shadow-xs"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900"
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Accordion Container */}
      <div className="mt-12 divide-y divide-slate-200 rounded-2xl border border-slate-200 bg-white shadow-card overflow-hidden">
        {filteredFaqs.length > 0 ? (
          filteredFaqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div key={faq.question} className="transition-colors hover:bg-slate-50/50">
                <button
                  type="button"
                  onClick={() => toggle(index)}
                  className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left font-semibold text-slate-950 cursor-pointer"
                  aria-expanded={isOpen}
                >
                  <span className="text-sm sm:text-base">{faq.question}</span>
                  <ChevronDown
                    className={`size-5 shrink-0 text-slate-400 transition-transform duration-200 ${
                      isOpen ? "rotate-180 text-blue-600" : ""
                    }`}
                    aria-hidden="true"
                  />
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <div className="border-t border-slate-100 bg-slate-50/50 px-6 py-5">
                        <p className="text-sm leading-7 text-slate-600">{faq.answer}</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })
        ) : (
          <div className="p-12 text-center text-slate-500">
            <p className="text-sm">No questions matched your search query &quot;{searchQuery}&quot;.</p>
            <button
              type="button"
              onClick={() => {
                setSearchQuery("");
                setSelectedCategory("all");
              }}
              className="mt-3 text-xs font-semibold text-blue-600 hover:underline cursor-pointer"
            >
              Reset Search Filter
            </button>
          </div>
        )}
      </div>

      {/* Support Box */}
      <div className="mt-14 rounded-2xl border border-slate-200 bg-slate-50/80 p-8 text-center sm:p-10">
        <div className="mx-auto grid size-12 place-items-center rounded-xl bg-blue-100/70 text-blue-700">
          <Mail size={22} />
        </div>
        <h3 className="mt-4 text-xl font-bold text-slate-950">Have a Question Not Listed Here?</h3>
        <p className="mt-2 text-sm text-slate-600 max-w-xl mx-auto">
          Our telecommunications support team is available 24/7 to answer questions regarding phone carrier lookups,
          Stripe billing, and API integration.
        </p>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 rounded-full bg-blue-600 px-6 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-blue-700 transition"
          >
            <span>Contact Support</span>
            <ArrowRight size={15} />
          </Link>
          <Link
            href="/#report"
            className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-6 py-2.5 text-sm font-semibold text-slate-700 shadow-xs hover:bg-slate-100 transition"
          >
            <span>Start Number Scan</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
