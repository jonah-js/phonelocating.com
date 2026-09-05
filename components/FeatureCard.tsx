"use client";

import { motion } from "framer-motion";
import { Clock3, Database, FileCheck2, LockKeyhole, MapPinned, ShieldCheck } from "lucide-react";

const icons = {
  shield: ShieldCheck,
  map: MapPinned,
  database: Database,
  lock: LockKeyhole,
  clock: Clock3,
  file: FileCheck2,
};

type FeatureCardProps = {
  icon: keyof typeof icons;
  title: string;
  description: string;
};

export default function FeatureCard({ icon, title, description }: FeatureCardProps) {
  const Icon = icons[icon];

  return (
    <motion.article
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.45 }}
      className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm"
    >
      <div className="grid size-11 place-items-center rounded-md bg-blue-50 text-blue-700">
        <Icon size={22} aria-hidden="true" />
      </div>
      <h3 className="mt-5 text-lg font-semibold text-slate-950">{title}</h3>
      <p className="mt-3 leading-7 text-slate-600">{description}</p>
    </motion.article>
  );
}
