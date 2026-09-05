import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Payment cancelled",
  description: "Stripe Checkout was cancelled.",
};

export default function CancelPage() {
  return (
    <section className="mx-auto flex min-h-[70vh] max-w-3xl flex-col items-center justify-center px-6 text-center">
      <h1 className="text-4xl font-semibold tracking-tight text-slate-950">Checkout cancelled</h1>
      <p className="mt-4 text-lg text-slate-600">The preview report remains available. You can unlock it again at any time.</p>
      <Link href="/#report" className="mt-8 rounded-full bg-blue-600 px-6 py-3 text-sm font-semibold text-white">
        Back to report
      </Link>
    </section>
  );
}
