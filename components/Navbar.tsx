"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Menu, Radar, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { navLinks } from "@/lib/content";

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
          backgroundColor: solid ? "rgba(255,255,255,0.82)" : "rgba(255,255,255,0.48)",
          boxShadow: solid ? "0 16px 50px rgba(15,23,42,0.08)" : "0 0 0 rgba(0,0,0,0)",
        }}
        className="mx-auto flex max-w-7xl items-center justify-between rounded-full border border-white/60 px-4 py-3 backdrop-blur-xl"
      >
        <Link href="/" className="flex items-center gap-2 font-semibold text-slate-950">
          <span className="grid size-9 place-items-center rounded-full bg-blue-600 text-white">
            <Radar size={18} aria-hidden="true" />
          </span>
          PhoneTracking
        </Link>

        <div className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`rounded-full px-4 py-2 text-sm font-medium transition hover:bg-slate-100 ${
                  active ? "bg-slate-100 text-blue-700" : "text-slate-700"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
          <Link
            href="/#report"
            className="ml-2 rounded-full bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-blue-400"
          >
            Generate report
          </Link>
        </div>

        <button
          type="button"
          className="grid size-10 place-items-center rounded-full border border-slate-200 bg-white md:hidden"
          onClick={() => setOpen((value) => !value)}
          aria-label="Open navigation"
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
            className="mx-auto mt-2 flex max-w-7xl flex-col rounded-lg border border-slate-200 bg-white p-3 shadow-soft md:hidden"
          >
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href} className="rounded-md px-3 py-3 text-sm font-medium text-slate-700">
                {link.label}
              </Link>
            ))}
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
