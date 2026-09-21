import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ShieldAlert } from "lucide-react";

export const metadata: Metadata = {
  title: "Payment Cancelled",
  description: "The Stripe checkout session was cancelled.",
};

export default function CancelPage() {
  return (
    <section className="mx-auto flex min-h-[75vh] max-w-2xl flex-col items-center justify-center px-6 py-16 text-center">
      <div className="w-full rounded-3xl border border-slate-200 bg-white p-8 shadow-card sm:p-12">
        <div className="mx-auto grid size-16 place-items-center rounded-full bg-slate-100 text-slate-600">
          <ShieldAlert size={32} />
        </div>
        <h1 className="mt-6 text-3xl font-bold tracking-tight text-slate-950">Payment Cancelled</h1>
        <p className="mt-3 text-base text-slate-600 max-w-md mx-auto">
          The checkout process was not completed. No charges were made to your account. Your preview report remains saved.
        </p>
        <div className="mt-8">
          <Link
            href="/#report"
            className="inline-flex items-center gap-2 rounded-full bg-blue-600 px-7 py-3 text-sm font-semibold text-white shadow-md transition hover:bg-blue-700"
          >
            <ArrowLeft size={16} />
            <span>Return to Report</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
