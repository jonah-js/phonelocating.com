import type { Metadata } from "next";

export const metadata: Metadata = { title: "Cookies", description: "Cookie-Hinweise." };

export default function CookiesPage() {
  return (
    <article className="mx-auto max-w-3xl px-6 py-20 leading-8 text-slate-600 lg:px-8">
      <h1 className="text-4xl font-semibold tracking-tight text-slate-950">Cookies</h1>
      <p className="mt-6">
        This demo uses functional localStorage for report licenses. Analytics and marketing cookies are not enabled.
        Add consent management before introducing tracking or marketing technologies.
      </p>
    </article>
  );
}
