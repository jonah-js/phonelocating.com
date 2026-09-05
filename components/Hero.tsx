"use client";

import dynamic from "next/dynamic";
import { useState } from "react";
import CtaButton from "@/components/CtaButton";
import PhoneInput from "@/components/PhoneInput";
import ReportVisualization, { type LookupResult } from "@/components/ReportVisualization";
import VideoHero from "@/components/VideoHero";

const Globe = dynamic(() => import("@/components/Globe"), {
  ssr: false,
  loading: () => <div className="h-[320px] rounded-lg bg-slate-950" aria-label="Globus wird geladen" />,
});

export default function Hero() {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<LookupResult | null>(null);
  const [error, setError] = useState("");

  async function handleLookup() {
    setError("");
    setLoading(true);
    try {
      const licenseId = window.localStorage.getItem("phonetracking_license") || "";
      const response = await fetch("/api/lookup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phoneNumber, licenseId }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "The report could not be created.");
      setResult(data);
    } catch (lookupError) {
      setError(lookupError instanceof Error ? lookupError.message : "Unbekannter Fehler");
    } finally {
      setLoading(false);
    }
  }

  async function handleCheckout() {
    setError("");
    const response = await fetch("/api/stripe/create-session", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ phoneNumber: result?.phoneNumber || phoneNumber }),
    });
    const data = await response.json();
    if (data.url) {
      window.location.href = data.url;
      return;
    }
    setError(data.error || "Checkout konnte nicht gestartet werden.");
  }

  return (
    <section id="report" className="mx-auto grid max-w-7xl items-center gap-10 px-6 pb-20 pt-12 lg:grid-cols-[1fr_0.92fr] lg:px-8 lg:pt-20">
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-blue-700">Phone intelligence</p>
        <h1 className="mt-5 max-w-3xl text-5xl font-semibold tracking-tight text-slate-950 md:text-6xl">
          Professional phone number intelligence.
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">
          Generate a structured report with validation, carrier context, location confidence and risk signals.
        </p>

        <div className="mt-8 flex max-w-2xl flex-col gap-3 rounded-full bg-white p-2 shadow-soft ring-1 ring-slate-200 sm:flex-row">
          <PhoneInput value={phoneNumber} onChange={(event) => setPhoneNumber(event.target.value)} />
          <CtaButton onClick={handleLookup} disabled={loading || phoneNumber.trim().length < 4}>
            {loading ? "Analyzing..." : "Generate report"}
          </CtaButton>
        </div>
        {error ? <p className="mt-3 text-sm font-medium text-red-600">{error}</p> : null}

        {result ? <ReportVisualization result={result} onCheckout={handleCheckout} /> : null}
      </div>

      <div className="space-y-4">
        <VideoHero />
        <Globe target={result?.coordinates} active={loading || Boolean(result)} />
      </div>
    </section>
  );
}
