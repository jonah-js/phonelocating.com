import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Building2, Globe, Mail, Scale, ShieldAlert } from "lucide-react";

export const metadata: Metadata = {
  title: "Legal Notice & Impressum | PhoneLocating",
  description: "Official Legal Notice, Provider Information, and Regulatory Disclosures for PhoneLocating.",
};

export default function LegalNoticePage() {
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
        <Scale size={16} />
        Official Company Disclosure
      </div>

      <h1 className="mt-3 text-3xl sm:text-4xl font-bold tracking-tight text-slate-950">
        Legal Notice (Impressum)
      </h1>
      <p className="mt-2 text-sm text-slate-500">
        Information in accordance with international commercial disclosure regulations and the EU Digital Services Act (DSA).
      </p>

      <div className="mt-8 space-y-8 text-base leading-7">
        {/* Company Information Box */}
        <section className="rounded-2xl border border-slate-200 bg-slate-50/70 p-6">
          <div className="flex items-center gap-2.5 font-semibold text-slate-900 text-lg">
            <Building2 size={20} className="text-blue-600" />
            <h2>Service Provider & Operating Entity</h2>
          </div>
          <div className="mt-4 space-y-1.5 text-sm text-slate-600">
            <p className="font-semibold text-slate-900">PhoneLocating Global Operations</p>
            <p>International Telecommunication Intelligence Systems</p>
            <p>Digital Data Routing & Forensic Analysis Services</p>
            <p className="pt-2">Registration: International Business Registry & Operating Standards</p>
            <p>Managing Director: Intelligence Desk & Technical Operations Directorate</p>
          </div>
        </section>

        {/* Contact Information */}
        <section>
          <div className="flex items-center gap-2 font-bold text-slate-950 text-xl">
            <Mail size={18} className="text-blue-600" />
            <h2>Contact & Communication</h2>
          </div>
          <div className="mt-3 space-y-2 text-sm text-slate-600">
            <p>
              <strong>General Inquiries:</strong>{" "}
              <a href="mailto:contact@phonelocating.com" className="text-blue-600 hover:underline">
                contact@phonelocating.com
              </a>
            </p>
            <p>
              <strong>Technical & Billing Support:</strong>{" "}
              <a href="mailto:support@phonelocating.com" className="text-blue-600 hover:underline">
                support@phonelocating.com
              </a>
            </p>
            <p>
              <strong>Customer Service Portal:</strong> Available via our online{" "}
              <Link href="/contact" className="text-blue-600 hover:underline font-medium">
                Contact Form
              </Link>
            </p>
            <p>Operating Hours: 24/7 Digital Processing & Server Monitored Routing</p>
          </div>
        </section>

        {/* Responsible for Content */}
        <section>
          <div className="flex items-center gap-2 font-bold text-slate-950 text-xl">
            <Globe size={18} className="text-blue-600" />
            <h2>Responsible for Content</h2>
          </div>
          <p className="mt-3 text-sm text-slate-600">
            Responsible for editorial and informational content published across PhoneLocating.com:
            <br />
            PhoneLocating Editorial & Geolocation Analysis Directorate.
          </p>
        </section>

        {/* Dispute Resolution */}
        <section>
          <h2 className="text-xl font-bold text-slate-950">Consumer Dispute Resolution</h2>
          <p className="mt-3 text-sm text-slate-600">
            The European Commission provides an Online Dispute Resolution (ODR) platform for out-of-court settlements:{" "}
            <a
              href="https://ec.europa.eu/consumers/odr"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              https://ec.europa.eu/consumers/odr
            </a>
            . We strive to resolve any customer questions or billing inquiries directly and promptly through our customer
            support desk at{" "}
            <a href="mailto:support@phonelocating.com" className="text-blue-600 hover:underline">
              support@phonelocating.com
            </a>
            .
          </p>
        </section>

        {/* Liability for Technical Data */}
        <section>
          <div className="flex items-center gap-2 font-bold text-slate-950 text-xl">
            <ShieldAlert size={18} className="text-amber-600" />
            <h2>Technical Data & Registry Disclaimer</h2>
          </div>
          <p className="mt-3 text-sm text-slate-600">
            The intelligence reports generated by PhoneLocating are synthesized from international telecom signalling
            frameworks (including SS7, HLR/VLR register queries), public telecommunications registries, and orbital
            satellite optical feeds. While our technology operates with high precision algorithms accurate up to 2
            meters under optimal network conditions, telecommunication signals are subject to external atmospheric
            interference, cellular tower density, roaming carrier policies, and handset power states. Reports are
            provided for lawful analytical, investigative, and security verification purposes only.
          </p>
        </section>

        {/* Copyright */}
        <section>
          <h2 className="text-xl font-bold text-slate-950">Copyright & Intellectual Property</h2>
          <p className="mt-3 text-sm text-slate-600">
            All proprietary software code, 3D WebGL globe visualizations, UI layouts, graphics, database schemas, and
            compiled analytical content hosted on PhoneLocating.com are protected by international copyright and intellectual
            property laws. Any unauthorized reproduction, reverse-engineering, automated data scraping, or commercial
            distribution without express written authorization is strictly prohibited.
          </p>
        </section>
      </div>
    </article>
  );
}
