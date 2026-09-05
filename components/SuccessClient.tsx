"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function SuccessClient() {
  const params = useSearchParams();
  const sessionId = params?.get("session_id");
  const [message, setMessage] = useState("Loading license...");

  useEffect(() => {
    if (!sessionId) return;
    fetch("/api/license/validate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ sessionId }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.licenseId) {
          window.localStorage.setItem("phonetracking_license", data.licenseId);
          setMessage("License saved. The next lookup will show the complete report.");
        } else {
          setMessage(data.error || "License is not available yet. Check the Stripe webhook.");
        }
      })
      .catch(() => setMessage("License could not be saved."));
  }, [sessionId]);

  return (
    <section className="mx-auto flex min-h-[70vh] max-w-3xl flex-col items-center justify-center px-6 text-center">
      <h1 className="text-4xl font-semibold tracking-tight text-slate-950">Payment successful</h1>
      <p className="mt-4 text-lg text-slate-600">{sessionId ? message : "No checkout session found."}</p>
      <Link href="/#report" className="mt-8 rounded-full bg-blue-600 px-6 py-3 text-sm font-semibold text-white">
        View complete report
      </Link>
    </section>
  );
}
