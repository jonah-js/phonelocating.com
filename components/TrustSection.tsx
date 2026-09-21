import { Globe2, Lock, RadioTower, ShieldCheck } from "lucide-react";

const items = [
  {
    icon: RadioTower,
    title: "Real-Time HLR / SS7 Query",
    description: "Direct interrogation of global carrier routing nodes and home location registries.",
  },
  {
    icon: Globe2,
    title: "3D Satellite Tracking (2M)",
    description: "High-resolution orbital satellite triangulation down to 2-meter ground accuracy.",
  },
  {
    icon: Lock,
    title: "Stripe & 256-Bit SSL",
    description: "Secure $9.99 / 9.99 € one-time payment with zero hidden subscriptions or recurring fees.",
  },
  {
    icon: ShieldCheck,
    title: "Global Privacy & GDPR",
    description: "Cryptographically signed dossier tokens with strict end-to-end anonymization.",
  },
];

export default function TrustSection() {
  return (
    <section className="border-y border-slate-200/80 bg-white/60 py-10">
      <div className="mx-auto grid max-w-7xl gap-6 px-6 sm:grid-cols-2 lg:grid-cols-4 lg:px-8">
        {items.map(({ icon: Icon, title, description }) => (
          <div key={title} className="flex items-start gap-3.5">
            <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-blue-50 text-blue-600 ring-1 ring-blue-100">
              <Icon size={20} aria-hidden="true" />
            </span>
            <div>
              <h3 className="text-sm font-semibold text-slate-900">{title}</h3>
              <p className="mt-1 text-xs leading-5 text-slate-500">{description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
