"use client";

import { useEffect } from "react";
import { AlertCircle, RotateCcw } from "lucide-react";

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("App error:", error);
  }, [error]);

  return (
    <div className="mx-auto flex min-h-[60vh] max-w-xl flex-col items-center justify-center px-6 text-center">
      <div className="grid size-14 place-items-center rounded-2xl bg-red-50 text-red-600">
        <AlertCircle size={28} />
      </div>
      <h2 className="mt-4 text-2xl font-bold tracking-tight text-slate-900">Ein unerwarteter Fehler ist aufgetreten</h2>
      <p className="mt-2 text-sm text-slate-600">
        Die Seite konnte nicht korrekt geladen werden. Bitte versuchen Sie es erneut.
      </p>
      <button
        type="button"
        onClick={() => reset()}
        className="mt-6 inline-flex items-center gap-2 rounded-full bg-blue-600 px-6 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-blue-700 cursor-pointer"
      >
        <RotateCcw size={15} />
        Erneut versuchen
      </button>
    </div>
  );
}
