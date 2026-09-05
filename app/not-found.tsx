import Link from "next/link";

export default function NotFound() {
  return (
    <section className="mx-auto flex min-h-[70vh] max-w-3xl flex-col items-center justify-center px-6 text-center">
      <p className="text-sm font-semibold uppercase tracking-[0.18em] text-blue-700">404</p>
      <h1 className="mt-4 text-4xl font-semibold tracking-tight text-slate-950">This page was not found.</h1>
      <p className="mt-4 text-lg text-slate-600">
        The page may have been moved or does not exist.
      </p>
      <Link
        href="/"
        className="mt-8 rounded-full bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-soft transition hover:bg-blue-700"
      >
        Back to home
      </Link>
    </section>
  );
}
