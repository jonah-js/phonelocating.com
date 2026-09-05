import type { Metadata } from "next";

export const metadata: Metadata = { title: "Refund", description: "Rueckerstattungsinformationen." };

export default function RefundPage() {
  return (
    <article className="mx-auto max-w-3xl px-6 py-20 leading-8 text-slate-600 lg:px-8">
      <h1 className="text-4xl font-semibold tracking-tight text-slate-950">Refund</h1>
      <p className="mt-6">
        Digital reports are unlocked immediately after successful payment. Courtesy refunds and exceptional cases can be
        reviewed through support. Replace this placeholder with a binding refund policy before launch.
      </p>
    </article>
  );
}
