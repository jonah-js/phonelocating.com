import Link from "next/link";
import {
  ArrowRight,
  Briefcase,
  CheckCircle2,
  Compass,
  FileCheck2,
  HeartHandshake,
  Lock,
  PhoneOff,
  Radio,
  Search,
  ShieldAlert,
  ShieldCheck,
  ShoppingBag,
  Sparkles,
  Users,
} from "lucide-react";

const useCases = [
  {
    id: "scam-defense",
    icon: PhoneOff,
    badge: "Fraud & Spam Defense",
    badgeColor: "bg-red-50 text-red-700 border-red-200",
    title: "Unmask Unknown & Suspicious Callers",
    subtitle: "Stop wondering who is behind repetitive, harassing, or spoofed calls.",
    problem: "Scammers frequently spoof local area codes from overseas call centers to deceive victims.",
    solution:
      "Interrogates SS7 and HLR carrier gateways to expose the genuine originating operator, authentic geographical region, and spoof risk score.",
    highlight: "99.4% Carrier Detection",
    metric: "Instant Spoof Detection",
  },
  {
    id: "device-recovery",
    icon: Compass,
    badge: "Device & Asset Recovery",
    badgeColor: "bg-blue-50 text-blue-700 border-blue-200",
    title: "Locate Misplaced or Stolen Devices",
    subtitle: "Pinpoint devices when native 'Find My' apps fail or power is critical.",
    problem: "Built-in GPS trackers stop responding if GPS is switched off or battery drops below 5%.",
    solution:
      "Triangulates active cellular cluster towers and pairs them with 2M aerial satellite imagery down to the exact street or building perimeter.",
    highlight: "2M Ground Precision",
    metric: "Building-Level Optics",
  },
  {
    id: "marketplace-safety",
    icon: ShoppingBag,
    badge: "Marketplace Security",
    badgeColor: "bg-amber-50 text-amber-700 border-amber-200",
    title: "Verify Classifieds, Buyers & Sellers",
    subtitle: "Protect yourself against fraudulent marketplace transactions.",
    problem: "Fake sellers on Facebook Marketplace, Craigslist, or eBay often provide fake contact details.",
    solution:
      "Verify whether the seller's phone number actually matches their claimed location before you send payment or ship valuable goods.",
    highlight: "Zero Wire Risk",
    metric: "Cross-Border Verification",
  },
  {
    id: "family-safety",
    icon: HeartHandshake,
    badge: "Family Peace of Mind",
    badgeColor: "bg-emerald-50 text-emerald-700 border-emerald-200",
    title: "Ensure Safety of Loved Ones",
    subtitle: "Confirm family members have arrived safely during trips and emergencies.",
    problem: "Teenagers traveling independently or elderly relatives who become unreachable create urgent concern.",
    solution:
      "Confirm their current geographical sector and active network status discreetly without installing intrusive spyware on their phone.",
    highlight: "100% Non-Invasive",
    metric: "Zero App Install Required",
  },
  {
    id: "business-vetting",
    icon: Briefcase,
    badge: "Corporate Due Diligence",
    badgeColor: "bg-indigo-50 text-indigo-700 border-indigo-200",
    title: "Vet Remote Contractors & Partners",
    subtitle: "Eliminate phantom vendor fraud and verify international business partners.",
    problem: "Disposable VOIP numbers and virtual trunks make it easy for bad actors to fake company headquarters.",
    solution:
      "Differentiate real registered cellular/landline contracts from disposable VOIP proxies and verify corporate jurisdiction legitimacy.",
    highlight: "B2B Compliance",
    metric: "VOIP vs. Mobile Filter",
  },
  {
    id: "legal-evidence",
    icon: FileCheck2,
    badge: "Forensic Investigation",
    badgeColor: "bg-purple-50 text-purple-700 border-purple-200",
    title: "Skiptracing & Official PDF Evidence",
    subtitle: "Generate court-ready, timestamped intelligence dossiers.",
    problem: "Legal teams, private investigators, and fleet managers require verifiable proof of telecom interactions.",
    solution:
      "Export comprehensive, timestamped dossiers containing MSC/VLR switch nodes, CID cell towers, and coordinate logs formatted to ISO standards.",
    highlight: "ISO 27001 Query Standard",
    metric: "Downloadable PDF Dossier",
  },
];

const highlights = [
  {
    title: "100% Confidential",
    desc: "No app installation required on the target device. Everything runs through public carrier registers.",
    icon: Lock,
  },
  {
    title: "2M Aerial Resolution",
    desc: "Powered by modern orbital satellite feeds and 3D globe optics instead of coarse city estimations.",
    icon: Sparkles,
  },
  {
    title: "No Subscription Trap",
    desc: "Honest $9.99 / 9.99 € one-time fee per number. No recurring auto-debits, no hidden memberships.",
    icon: ShieldCheck,
  },
  {
    title: "Worldwide Coverage",
    desc: "Compatible with GSM, CDMA, LTE, and 5G networks across 195+ countries and 1,200+ mobile operators.",
    icon: Radio,
  },
];

export default function UseCasesSection() {
  return (
    <section id="use-cases" className="relative border-t border-slate-200 bg-slate-50/70 py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Section Header */}
        <div className="mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50/80 px-3.5 py-1 text-xs font-semibold text-blue-700">
            <Sparkles size={13} className="text-blue-600" />
            <span>Proven Real-World Applications</span>
          </div>

          <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl lg:text-5xl">
            Why You Need <span className="text-blue-600">PhoneLocating™</span>
          </h2>

          <p className="mt-4 text-base leading-7 text-slate-600 sm:text-lg">
            Whether you are uncovering a persistent scam caller, recovering a lost device, safeguarding your family, or
            closing an online marketplace deal — our 2M satellite triangulation delivers indisputable clarity in seconds.
          </p>
        </div>

        {/* Feature Value Badges Bar */}
        <div className="mt-12 grid grid-cols-2 gap-4 lg:grid-cols-4">
          {highlights.map(({ title, desc, icon: Icon }) => (
            <div
              key={title}
              className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-xs transition hover:border-blue-200 hover:shadow-sm"
            >
              <div className="flex items-center gap-2.5">
                <span className="grid size-8 place-items-center rounded-lg bg-blue-50 text-blue-600">
                  <Icon size={16} />
                </span>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900">{title}</h4>
              </div>
              <p className="mt-2 text-xs leading-5 text-slate-500">{desc}</p>
            </div>
          ))}
        </div>

        {/* Use Cases Grid */}
        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {useCases.map((uc) => {
            const Icon = uc.icon;
            return (
              <div
                key={uc.id}
                className="group relative flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-7 shadow-card transition-all duration-300 hover:-translate-y-1 hover:border-blue-300 hover:shadow-xl"
              >
                <div>
                  {/* Top Badge & Metric */}
                  <div className="flex items-center justify-between gap-2">
                    <span
                      className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-[11px] font-semibold ${uc.badgeColor}`}
                    >
                      {uc.badge}
                    </span>
                    <span className="text-[11px] font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-100">
                      {uc.metric}
                    </span>
                  </div>

                  {/* Icon & Title */}
                  <div className="mt-5 flex items-start gap-3.5">
                    <div className="grid size-11 shrink-0 place-items-center rounded-xl bg-slate-900 text-white shadow-xs group-hover:bg-blue-600 transition-colors">
                      <Icon size={22} />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold tracking-tight text-slate-950">{uc.title}</h3>
                      <p className="mt-0.5 text-xs font-medium text-slate-500">{uc.subtitle}</p>
                    </div>
                  </div>

                  {/* Problem / Pain Point */}
                  <div className="mt-5 rounded-xl border border-slate-100 bg-slate-50/80 p-3 text-xs leading-5 text-slate-600">
                    <span className="font-semibold text-slate-900">The Problem: </span>
                    {uc.problem}
                  </div>

                  {/* Solution */}
                  <p className="mt-3 text-xs leading-5 text-slate-600">
                    <span className="font-semibold text-blue-700">How We Solve It: </span>
                    {uc.solution}
                  </p>
                </div>

                {/* Bottom Result Callout */}
                <div className="mt-6 flex items-center justify-between border-t border-slate-100 pt-4">
                  <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-800">
                    <CheckCircle2 size={15} className="text-blue-600" />
                    <span>{uc.highlight}</span>
                  </div>

                  <Link
                    href="/#report"
                    className="inline-flex items-center gap-1 text-xs font-semibold text-blue-600 hover:text-blue-800"
                  >
                    <span>Test Now</span>
                    <ArrowRight size={13} />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Banner Call to Action */}
        <div className="mt-14 rounded-3xl border border-blue-200/80 bg-white p-8 shadow-card sm:p-10">
          <div className="flex flex-col items-center justify-between gap-6 text-center md:flex-row md:text-left">
            <div className="max-w-xl">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-100/70 px-3 py-1 text-xs font-semibold text-blue-800">
                <Search size={13} />
                Instant Telecommunication Intelligence
              </span>
              <h3 className="mt-3 text-2xl font-bold tracking-tight text-slate-950">
                Need to Verify a Phone Number Right Now?
              </h3>
              <p className="mt-2 text-sm text-slate-600">
                Enter any domestic or international number to run our real-time satellite scan and preview the 3D globe.
                Full forensic reports are unlocked for a single one-time payment of $9.99.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 shrink-0">
              <Link
                href="/#report"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-md transition hover:bg-blue-700"
              >
                <span>Track Number Now</span>
                <ArrowRight size={16} />
              </Link>
              <Link
                href="/features"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-6 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
              >
                <span>Explore Technical Specs</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
