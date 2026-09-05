import Link from "next/link";
import { footerLinks } from "@/lib/content";

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white/70">
      <div className="mx-auto grid max-w-7xl gap-8 px-6 py-10 md:grid-cols-[1fr_auto] lg:px-8">
        <div>
          <p className="font-semibold text-slate-950">PhoneTracking</p>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600">
            Phone intelligence reports are technical information products and do not replace legal, governmental or
            safety-critical review.
          </p>
          <p className="mt-4 text-sm text-slate-500">© 2026 PhoneTracking. All rights reserved.</p>
        </div>
        <nav className="flex flex-wrap gap-x-5 gap-y-3 text-sm text-slate-600" aria-label="Footer">
          {footerLinks.map((link) => (
            <Link key={link.href} href={link.href} className="transition hover:text-blue-700">
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </footer>
  );
}
