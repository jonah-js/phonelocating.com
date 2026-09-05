"use client";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en">
      <body className="flex min-h-screen flex-col items-center justify-center bg-slate-950 px-6 text-center text-white">
        <h2 className="text-3xl font-semibold">Something went wrong</h2>
        <p className="mt-3 text-slate-400">An unexpected error occurred.</p>
        <button
          onClick={() => reset()}
          className="mt-6 rounded-full bg-blue-600 px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700"
        >
          Try again
        </button>
      </body>
    </html>
  );
}
