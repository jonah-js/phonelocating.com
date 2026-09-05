"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useState } from "react";

type Item = {
  question: string;
  answer: string;
};

export default function FAQAccordion({ items }: { items: Item[] }) {
  const [open, setOpen] = useState(0);

  return (
    <div className="divide-y divide-slate-200 rounded-lg border border-slate-200 bg-white">
      {items.map((item, index) => (
        <div key={item.question}>
          <button
            type="button"
            className="flex w-full items-center justify-between gap-4 px-5 py-5 text-left font-semibold text-slate-950"
            onClick={() => setOpen(open === index ? -1 : index)}
          >
            {item.question}
            <ChevronDown className={`size-5 transition ${open === index ? "rotate-180" : ""}`} aria-hidden="true" />
          </button>
          <AnimatePresence initial={false}>
            {open === index ? (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden"
              >
                <p className="px-5 pb-5 leading-7 text-slate-600">{item.answer}</p>
              </motion.div>
            ) : null}
          </AnimatePresence>
        </div>
      ))}
    </div>
  );
}
