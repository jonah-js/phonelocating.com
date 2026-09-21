"use client";

import { useEffect } from "react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Global root error:", error);
  }, [error]);

  return (
    <html lang="de">
      <body className="flex min-h-screen flex-col items-center justify-center bg-slate-50 px-6 text-center text-slate-900 font-sans">
        <h2 className="text-3xl font-bold">Systemfehler</h2>
        <p className="mt-3 text-sm text-slate-600">Ein unerwarteter Fehler ist aufgetreten.</p>
        <button
          type="button"
          onClick={() => reset()}
          className="mt-6 rounded-full bg-blue-600 px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700"
        >
          Erneut versuchen
        </button>
      </body>
    </html>
  );
}
