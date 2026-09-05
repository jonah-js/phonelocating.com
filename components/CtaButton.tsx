"use client";

import { motion } from "framer-motion";
import type { HTMLMotionProps } from "framer-motion";

type CtaButtonProps = HTMLMotionProps<"button"> & {
  variant?: "primary" | "secondary";
};

export default function CtaButton({ className = "", variant = "primary", ...props }: CtaButtonProps) {
  const styles =
    variant === "primary"
      ? "bg-blue-600 text-white shadow-soft hover:bg-blue-700"
      : "border border-slate-200 bg-white/75 text-slate-800 hover:bg-white";

  return (
    <motion.button
      whileHover={{ y: -1 }}
      whileTap={{ scale: 0.98 }}
      className={`inline-flex min-h-12 items-center justify-center rounded-full px-5 text-sm font-semibold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-400 ${styles} ${className}`}
      {...props}
    />
  );
}
