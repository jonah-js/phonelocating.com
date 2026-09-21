import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, CheckCircle2, HelpCircle, ShieldCheck } from "lucide-react";

export const metadata: Metadata = {
  title: "Refund Policy | PhoneLocating",
  description: "Official Refund Policy for PhoneLocating digital phone intelligence and satellite reports.",
};

export default function RefundPage() {
  return (
    <article className="mx-auto max-w-3xl px-6 py-16 sm:py-20 text-slate-700 lg:px-8">
      <Link
        href="/"
        className="inline-flex items-center gap-2 text-xs font-semibold text-blue-600 hover:text-blue-700 mb-8 transition"
      >
        <ArrowLeft size={14} />
        Back to PhoneLocating Home
      </Link>

      <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-blue-600">
        <ShieldCheck size={16} />
        Official Billing & Refund Terms
      </div>

      <h1 className="mt-3 text-3xl sm:text-4xl font-bold tracking-tight text-slate-950">
        Refund Policy
      </h1>
      <p className="mt-2 text-sm text-slate-500">
        Last updated: {new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
      </p>

      <div className="mt-8 space-y-8 text-base leading-7">
        {/* Section 1 */}
        <section className="rounded-2xl border border-slate-200 bg-slate-50/50 p-6">
          <h2 className="text-lg font-semibold text-slate-900">1. Nature of the Service & One-Time Billing</h2>
          <p className="mt-2 text-sm text-slate-600">
            PhoneLocating provides digital telecommunication reports, HLR network scans, and 2M satellite visual
            dossiers on an individual basis. Every report is unlocked via a <strong>one-time payment of $9.99 / 9.99 €</strong>.
            We <strong>do not operate any subscriptions</strong>, recurring billing memberships, or recurring monthly fees.
          </p>
        </section>

        {/* Section 2 */}
        <section>
          <h2 className="text-xl font-bold text-slate-950">2. Immediate Digital Fulfillment</h2>
          <p className="mt-3">
            Because intelligence dossiers and satellite coordinates are compiled and delivered digitally in real time
            upon successful payment through Stripe, access is granted immediately.
          </p>
          <p className="mt-3">
            Under international consumer law and EU statutory regulations for digital content, you acknowledge that
            digital services provided immediately upon purchase are non-tangible goods. However, to ensure complete
            customer satisfaction, we honor fair and generous refund procedures in qualifying scenarios outlined below.
          </p>
        </section>

        {/* Section 3 */}
        <section>
          <h2 className="text-xl font-bold text-slate-950">3. Eligible Refund Scenarios</h2>
          <p className="mt-3">
            We are committed to delivering accurate data. You are entitled to an immediate 100% full refund under the
            following conditions:
          </p>
          <ul className="mt-4 space-y-3 text-sm text-slate-600">
            <li className="flex items-start gap-3">
              <CheckCircle2 size={18} className="text-emerald-600 shrink-0 mt-0.5" />
              <span>
                <strong>Technical Delivery Failure:</strong> If a payment was processed but our server or network
                experienced an outage that prevented your full dossier from rendering or downloading.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 size={18} className="text-emerald-600 shrink-0 mt-0.5" />
              <span>
                <strong>Duplicate Transactions:</strong> If network latency or multiple button submissions caused your
                card to be charged more than once for the same phone number lookup.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 size={18} className="text-emerald-600 shrink-0 mt-0.5" />
              <span>
                <strong>Unresolvable Gateway Error:</strong> In the rare event that international SS7/HLR gateways
                cannot route the number and our engine cannot generate valid telecom data for your requested target.
              </span>
            </li>
          </ul>
        </section>

        {/* Section 4 */}
        <section>
          <h2 className="text-xl font-bold text-slate-950">4. Non-Refundable Circumstances</h2>
          <p className="mt-3 text-sm text-slate-600">
            Refunds cannot be granted once the dossier has been fully unlocked, displayed on screen, and delivered if
            the information accurately reflects the active telecommunication and registry status of the queried number
            at the time of search. This includes cases where the target phone number is powered off, out of cell
            coverage, or registered to an unlisted private prepaid SIM.
          </p>
        </section>

        {/* Section 5 */}
        <section>
          <h2 className="text-xl font-bold text-slate-950">5. How to Request a Refund</h2>
          <p className="mt-3">
            If your request meets our refund criteria, contacting our support desk is fast and simple:
          </p>
          <ol className="mt-4 list-decimal pl-6 space-y-2 text-sm text-slate-600">
            <li>
              Submit a ticket through our{" "}
              <Link href="/contact" className="font-semibold text-blue-600 hover:underline">
                Contact Page
              </Link>{" "}
              or email our team directly at{" "}
              <a href="mailto:support@phonelocating.com" className="font-semibold text-blue-600 hover:underline">
                support@phonelocating.com
              </a>
              .
            </li>
            <li>
              Include your <strong>phone number searched</strong>, the approximate time of lookup, and your Stripe
              receipt or transaction reference.
            </li>
            <li>
              Our billing team reviews all requests within <strong>12 to 24 hours</strong>.
            </li>
          </ol>
        </section>

        {/* Section 6 */}
        <section>
          <h2 className="text-xl font-bold text-slate-950">6. Refund Processing Timeline</h2>
          <p className="mt-3 text-sm text-slate-600">
            Approved refunds are credited directly back to the original payment method (Credit Card, Debit Card, Apple
            Pay, or Google Pay) via Stripe. Funds typically reflect in your account within <strong>3 to 5 business days</strong>,
            depending on your bank or card issuer.
          </p>
        </section>

        {/* Support Box */}
        <div className="mt-10 rounded-2xl border border-blue-200 bg-blue-50/70 p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-start gap-3">
            <HelpCircle size={22} className="text-blue-600 shrink-0 mt-0.5" />
            <div>
              <h3 className="text-sm font-semibold text-blue-950">Have a question about a charge?</h3>
              <p className="text-xs text-blue-800/80 mt-0.5">
                Our support desk is available 7 days a week to review transactions or assist with technical lookups.
              </p>
            </div>
          </div>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center rounded-xl bg-blue-600 px-5 py-2.5 text-xs font-semibold text-white shadow-xs hover:bg-blue-700 transition shrink-0"
          >
            Contact Billing Support
          </Link>
        </div>
      </div>
    </article>
  );
}
