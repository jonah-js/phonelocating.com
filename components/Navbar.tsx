"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Menu, Radar, Sparkles, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const headerNavLinks = [
  { href: "/#satellite-3d", label: "3D Satellite" },
  { href: "/#use-cases", label: "Use Cases" },
  { href: "/#reviews", label: "Reviews" },
  { href: "/pricing", label: "Pricing" },
  { href: "/blog", label: "Blog" },
  { href: "/faq", label: "FAQ" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [solid, setSolid] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="sticky top-0 z-50 px-4 py-3">
      <motion.nav
        animate={{
          backgroundColor: solid ? "rgba(255, 255, 255, 0.95)" : "rgba(255, 255, 255, 0.85)",
          boxShadow: solid ? "0 10px 30px -10px rgba(15, 23, 42, 0.08)" : "0 2px 8px -2px rgba(15, 23, 42, 0.03)",
        }}
        className="mx-auto flex max-w-7xl items-center justify-between rounded-full border border-slate-200/90 px-5 py-3 backdrop-blur-xl transition-colors"
      >
        <Link href="/" className="flex items-center gap-2.5 font-bold tracking-tight text-slate-950">
          <span className="grid size-9 place-items-center rounded-full bg-blue-600 text-white shadow-xs">
            <Radar size={19} aria-hidden="true" />
          </span>
          <span className="text-base tracking-tight font-semibold">
            Phone<span className="text-blue-600">Locating</span>
          </span>
          <span className="hidden sm:inline-flex items-center gap-1 rounded-full bg-blue-50 px-2 py-0.5 text-[10px] font-semibold text-blue-700">
            <Sparkles size={11} /> 2M GPS
          </span>
        </Link>

        <div className="hidden items-center gap-1.5 md:flex">
          {headerNavLinks.map((link) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`rounded-full px-4 py-1.5 text-sm font-medium transition hover:bg-slate-100 hover:text-slate-900 ${
                  active ? "bg-slate-100 text-blue-700 font-semibold" : "text-slate-600"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
          <Link
            href="/#report"
            className="ml-3 rounded-full bg-blue-600 px-5 py-2 text-sm font-semibold text-white shadow-xs transition hover:bg-blue-700"
          >
            Track Number
          </Link>
        </div>

        <button
          type="button"
          className="grid size-10 place-items-center rounded-full border border-slate-200 bg-white md:hidden"
          onClick={() => setOpen((value) => !value)}
          aria-label="Open menu"
        >
          {open ? <X size={18} /> : <Menu size={18} />}
        </button>
      </motion.nav>

      <AnimatePresence>
        {open ? (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="mx-auto mt-2 flex max-w-7xl flex-col rounded-2xl border border-slate-200 bg-white p-4 shadow-xl md:hidden"
          >
            {headerNavLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="rounded-xl px-4 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/#report"
              onClick={() => setOpen(false)}
              className="mt-2 rounded-xl bg-blue-600 px-4 py-2.5 text-center text-sm font-semibold text-white"
            >
              Track Number Now
            </Link>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
