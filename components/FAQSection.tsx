"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, ChevronDown, HelpCircle, Lock, ShieldCheck, Sparkles } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

const homepageFaqs = [
  {
    category: "Accuracy & Technology",
    question: "How does 2M satellite triangulation work?",
    answer:
      "Our platform queries global SS7 and HLR network registers to identify the serving cellular sector (CID) and mobile switching center (MSC). We then cross-reference signal delay telemetry with high-resolution orbital satellite feeds (down to 1–2 meter building and street precision) to render both coordinates and interactive 3D aerial optics.",
  },
  {
    category: "Confidentiality",
    question: "Do I need to install an app on the target phone?",
    answer:
      "No. Absolutely zero software or app installation is required on the target device. Unlike invasive spyware, our queries operate entirely on the carrier network level via public HLR registries and satellite triangulation. The target device receives no SMS, notifications, or alerts.",
  },
  {
    category: "Pricing & Billing",
    question: "Is the $9.99 fee truly a one-time payment with no subscription?",
    answer:
      "Yes, 100%. Many competitor services lure customers with a $0.99 trial only to quietly lock them into a $49.99/month recurring charge. PhoneLocating operates with strict transparency: you pay an honest, one-time fee of $9.99 (or 9.99 €). There are zero subscriptions and zero recurring charges.",
  },
  {
    category: "Single Number Policy",
    question: "Can I track multiple numbers with one purchase?",
    answer:
      "Each $9.99 purchase is a dedicated single-target license valid specifically for one phone number. This unlocks the complete 2M coordinates, unmasked cell tower CID, telecom routing hops, risk analysis, and lifetime access to the PDF dossier for that target number.",
  },
  {
    category: "Persistence",
    question: "Will my unlocked report disappear if I refresh the page?",
    answer:
      "No. Your unlocked report and cryptographic license token are automatically persisted in your browser's local cache. You can refresh the page, close the browser, or return days later — your unlocked dossier and 3D globe optics remain immediately accessible without paying again.",
  },
  {
    category: "International Coverage",
    question: "Does this work in all countries and with any mobile carrier?",
    answer:
      "Yes. Our global routing engine supports all international E.164 formats across 195+ countries and over 1,200 mobile operators, including AT&T, Verizon, T-Mobile, Vodafone, Deutsche Telekom, O2, Orange, EE, Telstra, and all major regional carriers.",
  },
  {
    category: "Legality & Compliance",
    question: "Is it legal to locate a phone number with this service?",
    answer:
      "Yes. All queries access public telecommunication carrier registries, HLR databases, and commercial orbital satellite telemetry in full compliance with GDPR, international telecom standards, and privacy laws for legitimate uses like scam prevention, device recovery, and personal safety.",
  },
  {
    category: "Reporting & PDF",
    question: "Can I print or download an official PDF report?",
    answer:
      "Yes. As soon as your report is unlocked, you can download or print an ISO 27001-structured intelligence dossier containing full coordinates, serving cell ID, line classification, and risk indicators for your personal or legal records.",
  },
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="border-t border-slate-200 bg-white py-20 lg:py-28">
      <div className="mx-auto max-w-5xl px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50/80 px-3.5 py-1 text-xs font-semibold text-blue-700">
            <HelpCircle size={13} className="text-blue-600" />
            <span>Frequently Asked Questions</span>
          </div>

          <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
            Everything You Need to Know Before Tracking
          </h2>

          <p className="mt-4 text-base text-slate-600">
            Clear answers about our 2M satellite accuracy, transparent $9.99 one-time pricing, zero-installation policy,
            and data privacy.
          </p>
        </div>

        {/* Quick Highlights Row */}
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="rounded-xl border border-slate-200 bg-slate-50/70 p-4 text-center">
            <p className="text-xs font-semibold uppercase tracking-wider text-blue-700">Zero Subscriptions</p>
            <p className="mt-1 text-sm font-bold text-slate-950">$9.99 One-Time Fee</p>
            <p className="mt-0.5 text-xs text-slate-500">No hidden monthly renewals</p>
          </div>
          <div className="rounded-xl border border-slate-200 bg-slate-50/70 p-4 text-center">
            <p className="text-xs font-semibold uppercase tracking-wider text-emerald-700">100% Confidential</p>
            <p className="mt-1 text-sm font-bold text-slate-950">Zero App Installation</p>
            <p className="mt-0.5 text-xs text-slate-500">No alerts sent to target device</p>
          </div>
          <div className="rounded-xl border border-slate-200 bg-slate-50/70 p-4 text-center">
            <p className="text-xs font-semibold uppercase tracking-wider text-purple-700">High Precision</p>
            <p className="mt-1 text-sm font-bold text-slate-950">2M Satellite Pinpointing</p>
            <p className="mt-0.5 text-xs text-slate-500">Interactive 3D aerial optics</p>
          </div>
        </div>

        {/* Accordion List */}
        <div className="mt-12 divide-y divide-slate-200 rounded-2xl border border-slate-200 bg-white shadow-card overflow-hidden">
          {homepageFaqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div key={faq.question} className="transition-colors hover:bg-slate-50/50">
                <button
                  type="button"
                  onClick={() => toggle(index)}
                  className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left font-semibold text-slate-950 cursor-pointer"
                  aria-expanded={isOpen}
                >
                  <span className="flex items-center gap-3">
                    <span className="text-sm sm:text-base">{faq.question}</span>
                  </span>
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
          })}
        </div>

        {/* Footer Link to Dedicated FAQ Page */}
        <div className="mt-10 text-center flex flex-col sm:flex-row items-center justify-center gap-4 text-sm text-slate-600">
          <span>Still have questions about our technology or carrier databases?</span>
          <Link
            href="/faq"
            className="inline-flex items-center gap-1 font-semibold text-blue-600 hover:text-blue-800"
          >
            <span>View Full Knowledge Base</span>
            <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </section>
  );
}
