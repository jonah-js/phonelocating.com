import type { Metadata } from "next";
import { Suspense } from "react";
import SuccessClient from "@/components/SuccessClient";

export const metadata: Metadata = {
  title: "Payment successful",
  description: "The PhoneLocating report was unlocked.",
};

export default function SuccessPage() {
  return (
    <Suspense fallback={<div className="px-6 py-20 text-center text-slate-600">Loading license...</div>}>
      <SuccessClient />
    </Suspense>
  );
}
