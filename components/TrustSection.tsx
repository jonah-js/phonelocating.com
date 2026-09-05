import { Lock, ScanLine, ShieldCheck } from "lucide-react";

const items = [
  { icon: ShieldCheck, label: "Server-side validation" },
  { icon: ScanLine, label: "Provider-ready API" },
  { icon: Lock, label: "No browser secrets" },
];

export default function TrustSection() {
  return (
    <section className="border-y border-slate-200 bg-white/70">
      <div className="mx-auto grid max-w-7xl gap-4 px-6 py-8 md:grid-cols-3 lg:px-8">
        {items.map(({ icon: Icon, label }) => (
          <div key={label} className="flex items-center gap-3 text-sm font-medium text-slate-700">
            <span className="grid size-9 place-items-center rounded-full bg-blue-50 text-blue-700">
              <Icon size={18} aria-hidden="true" />
            </span>
            {label}
          </div>
        ))}
      </div>
    </section>
  );
}
