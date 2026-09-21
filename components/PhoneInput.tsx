"use client";

import type { ComponentProps } from "react";

export default function PhoneInput({ className = "", ...props }: ComponentProps<"input">) {
  return (
    <input
      type="tel"
      inputMode="tel"
      autoComplete="tel"
      placeholder="+49 30 123456"
      className={`h-12 w-full min-w-0 rounded-full border border-slate-200 bg-white px-5 text-base text-slate-950 shadow-sm transition placeholder:text-slate-400 focus:border-blue-400 focus:outline-none focus:ring-4 focus:ring-blue-100 ${className}`}
      {...props}
    />
  );
}
