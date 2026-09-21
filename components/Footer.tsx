import Link from "next/link";
import { Lock, Radar, Shield } from "lucide-react";
import { footerLinks } from "@/lib/content";

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white py-12">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-[1.2fr_0.8fr]">
          <div>
            <div className="flex items-center gap-2.5 font-bold text-slate-950">
              <span className="grid size-8 place-items-center rounded-full bg-blue-600 text-white">
                <Radar size={16} aria-hidden="true" />
              </span>
              <span>PhoneLocating.com</span>
            </div>

            <p className="mt-4 max-w-xl text-sm leading-6 text-slate-600">
              High-precision global phone number intelligence and satellite tracking accurate to 2M. Verified reports
              leveraging international SS7/HLR network nodes, telecommunication registries, and orbital imagery.
            </p>

            <div className="mt-5 flex flex-wrap items-center gap-4 text-xs text-slate-500">
              <span className="flex items-center gap-1.5">
                <Lock size={13} className="text-emerald-600" />
                256-Bit SSL Encrypted
              </span>
              <span>·</span>
              <span className="flex items-center gap-1.5">
                <Shield size={13} className="text-blue-600" />
                Stripe Payments Verified
              </span>
              <span>·</span>
              <span className="text-slate-400">GDPR & Privacy Compliant</span>
            </div>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">Legal & Navigation</p>
            <nav className="mt-4 flex flex-wrap gap-x-6 gap-y-3 text-sm text-slate-600" aria-label="Footer">
              {footerLinks.map((link) => (
                <Link key={link.href} href={link.href} className="transition hover:text-blue-600">
                  {link.label}
                </Link>
              ))}
            </nav>

            <p className="mt-8 text-xs text-slate-400">
              © {new Date().getFullYear()} PhoneLocating.com. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
