"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import {
  Globe2,
  Lock,
  Radio,
  RotateCcw,
  Search,
  ShieldCheck,
  Smartphone,
  Sparkles,
} from "lucide-react";
import CtaButton from "@/components/CtaButton";
import PhoneInput from "@/components/PhoneInput";
import ReportVisualization, { type LookupResult } from "@/components/ReportVisualization";
import VideoHero from "@/components/VideoHero";

const Globe = dynamic(() => import("@/components/Globe"), {
  ssr: false,
  loading: () => (
    <div className="flex h-[320px] sm:h-[440px] w-full flex-col items-center justify-center rounded-2xl border border-slate-200 bg-slate-900 text-slate-400">
      <Globe2 size={36} className="animate-spin text-blue-500" />
      <span className="mt-3 text-xs font-medium">Loading 3D Satellite Optics...</span>
    </div>
  ),
});

const SCAN_STEPS = [
  "Validating E.164 number format & country routing...",
  "Interrogating SS7 & HLR carrier gateway registers...",
  "Triangulating satellite cell cluster & 2M ground coordinates...",
  "Compiling intelligence dossier & high-res optics...",
];

function normalizePhone(num: string) {
  let cleaned = num.replace(/[^\d+]/g, "");
  if (cleaned.startsWith("00")) cleaned = "+" + cleaned.slice(2);
  return cleaned;
}

function getLicenseForNumber(num: string): string {
  if (typeof window === "undefined" || !num) return "";
  try {
    const rawMap = window.localStorage.getItem("phonetracking_licenses_map");
    const map = rawMap ? JSON.parse(rawMap) : {};
    const norm = normalizePhone(num);
    if (map[norm]) return map[norm];
  } catch {}
  const legacyToken = window.localStorage.getItem("phonetracking_license") || "";
  const legacyPhone = window.localStorage.getItem("phonetracking_phone") || "";
  if (legacyToken && legacyPhone && normalizePhone(legacyPhone) === normalizePhone(num)) {
    return legacyToken;
  }
  return "";
}

function saveLicenseForNumber(num: string, token: string) {
  if (typeof window === "undefined" || !num || !token) return;
  try {
    const rawMap = window.localStorage.getItem("phonetracking_licenses_map");
    const map = rawMap ? JSON.parse(rawMap) : {};
    const norm = normalizePhone(num);
    map[norm] = token;
    window.localStorage.setItem("phonetracking_licenses_map", JSON.stringify(map));
  } catch {}
  window.localStorage.setItem("phonetracking_license", token);
  window.localStorage.setItem("phonetracking_phone", num);
}

export default function Hero() {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [loading, setLoading] = useState(false);
  const [scanStepIndex, setScanStepIndex] = useState(0);
  const [result, setResult] = useState<LookupResult | null>(null);
  const [error, setError] = useState("");

  // Restore persisted search or unlocked dossier on page load / reload
  useEffect(() => {
    if (typeof window === "undefined") return;

    const urlParams = new URLSearchParams(window.location.search);
    const queryPhone = urlParams.get("phone");
    const isUnlocked = urlParams.get("unlocked") === "true";

    const storedPhone = queryPhone || window.localStorage.getItem("phonetracking_phone") || "";
    const cachedResultRaw = window.localStorage.getItem("phonetracking_last_result");

    if (storedPhone) {
      setPhoneNumber(storedPhone);
    }

    if (cachedResultRaw) {
      try {
        const cached = JSON.parse(cachedResultRaw);
        if (cached && (!storedPhone || cached.phoneNumber === storedPhone)) {
          setResult(cached);
        }
      } catch {}
    }

    // Refresh dossier if returning from checkout or if a dedicated license exists for this specific number
    const licenseId = getLicenseForNumber(storedPhone);
    if (storedPhone && (isUnlocked || licenseId)) {
      handleLookup(storedPhone, true);
    }
  }, []);

  async function handleLookup(numToUse?: string, silent = false) {
    const targetNumber = numToUse || phoneNumber;
    if (!targetNumber || targetNumber.trim().length < 4) return;

    setError("");
    if (!silent) {
      setLoading(true);
      setScanStepIndex(0);
    }

    const interval = !silent
      ? setInterval(() => {
          setScanStepIndex((prev) => (prev < SCAN_STEPS.length - 1 ? prev + 1 : prev));
        }, 450)
      : null;

    try {
      // Strictly pass the license specific to this phone number
      const licenseId = getLicenseForNumber(targetNumber);
      const response = await fetch("/api/lookup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phoneNumber: targetNumber, licenseId }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Unable to compile phone intelligence report.");

      if (interval) clearInterval(interval);
      if (!silent) setScanStepIndex(SCAN_STEPS.length - 1);

      // Persist phone and result into localStorage so it survives page reloads
      if (typeof window !== "undefined") {
        window.localStorage.setItem("phonetracking_phone", targetNumber);
        window.localStorage.setItem("phonetracking_last_result", JSON.stringify(data));
      }

      setResult(data);
      setLoading(false);

      if (!silent) {
        setTimeout(() => {
          const el = document.getElementById("report-results");
          if (el) {
            el.scrollIntoView({ behavior: "smooth", block: "start" });
          }
        }, 300);
      }
    } catch (lookupError) {
      if (interval) clearInterval(interval);
      setError(lookupError instanceof Error ? lookupError.message : "Unknown error during intelligence lookup.");
      setLoading(false);
    }
  }

  async function handleCheckout() {
    setError("");
    const targetPhone = result?.phoneNumber || phoneNumber;
    if (!targetPhone) return;

    // Persist phone to localStorage before redirecting to payment
    if (typeof window !== "undefined") {
      window.localStorage.setItem("phonetracking_phone", targetPhone);
    }

    try {
      const response = await fetch("/api/stripe/create-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phoneNumber: targetPhone }),
      });
      const data = await response.json();
      if (data.url) {
        window.location.href = data.url;
        return;
      }
      setError(data.error || "Unable to initiate checkout session.");
    } catch {
      setError("Failed to connect to secure payment gateway.");
    }
  }

  async function handleVerifyPaid() {
    const targetPhone = result?.phoneNumber || phoneNumber;
    if (!targetPhone) return;

    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/license/validate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sessionId: `stripe_link_${Date.now()}`,
          phoneNumber: targetPhone,
        }),
      });
      const data = await res.json();
      if (data.valid && data.licenseId) {
        saveLicenseForNumber(targetPhone, data.licenseId);
        if (typeof window !== "undefined") {
          window.localStorage.setItem("phonetracking_unlocked", "true");
        }
        await handleLookup(targetPhone, true);
      } else {
        setError(data.error || "Unable to confirm license yet.");
      }
    } catch {
      setError("Failed to verify license.");
    } finally {
      setLoading(false);
    }
  }

  const handleResetSearch = () => {
    setResult(null);
    setPhoneNumber("");
    setError("");
    if (typeof window !== "undefined") {
      window.localStorage.removeItem("phonetracking_last_result");
      window.localStorage.removeItem("phonetracking_phone");
    }
  };

  const sampleNumbers = [
    { label: "+1 US", fullLabel: "New York (+1)", value: "+1 212 555 0199" },
    { label: "+44 UK", fullLabel: "London (+44)", value: "+44 7911 123456" },
    { label: "+49 DE", fullLabel: "Berlin (+49)", value: "+49 171 2345678" },
    { label: "+61 AU", fullLabel: "Sydney (+61)", value: "+61 412 345 678" },
  ];

  return (
    <section id="report" className="relative mx-auto max-w-7xl px-4 sm:px-6 pb-16 pt-3 sm:pt-6 lg:px-8 lg:pt-14">
      {/* Top Security & Status Banner: Hidden completely on mobile & narrow screens */}
      <div className="hidden md:flex mb-6 flex-wrap items-center justify-between gap-3 border-b border-slate-200/80 pb-4">
        <div className="flex items-center gap-2 text-[11px] sm:text-xs font-semibold uppercase tracking-wider text-slate-500">
          <span className="flex size-2 rounded-full bg-emerald-500" />
          <span>Real-Time Geolocation Network v2.4 Active</span>
        </div>
        <div className="flex items-center gap-3 sm:gap-5 text-[11px] sm:text-xs text-slate-500">
          <span className="flex items-center gap-1">
            <Lock size={12} className="text-emerald-600" /> 256-Bit SSL
          </span>
          <span className="flex items-center gap-1">
            <ShieldCheck size={12} className="text-blue-600" /> GDPR & SS7 Compliant
          </span>
        </div>
      </div>

      {/* Hero Grid: Responsive order puts Satellite Zoom-In Video immediately in view on mobile */}
      <div className="grid grid-cols-1 items-center gap-6 lg:gap-12 lg:grid-cols-[1.05fr_0.95fr]">
        {/* 1. Headline & Subtitle */}
        <div className="order-1 lg:order-none lg:col-start-1 lg:row-start-1">
          <div className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50/80 px-3 py-1 text-xs font-semibold text-blue-700">
            <Radio size={13} className="animate-pulse text-blue-600" />
            Global Phone Intelligence & Satellite Network
          </div>

          <h1 className="mt-3 sm:mt-4 text-3xl font-bold tracking-tight text-slate-950 sm:text-5xl lg:text-6xl">
            Track Phone Number <span className="text-blue-600">Accurate to 2M</span>
          </h1>

          <p className="mt-2.5 sm:mt-4 text-sm sm:text-base lg:text-lg leading-6 sm:leading-7 lg:leading-8 text-slate-600 max-w-2xl">
            Locate precision coordinates, telecom carrier, connection type, and risk metrics in seconds. Powered by
            orbital satellite triangulation and interactive 2M aerial optics.
          </p>
        </div>

        {/* 2. Search Box Block */}
        <div className="order-2 lg:order-none lg:col-start-1 lg:row-start-2">
          <div className="rounded-2xl border border-slate-200 bg-white p-2.5 sm:p-3 shadow-card ring-1 ring-slate-100">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleLookup();
              }}
              className="flex flex-col gap-2.5 sm:flex-row"
            >
              <div className="relative flex-1">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 sm:pl-4 text-slate-400">
                  <Smartphone size={19} />
                </div>
                <PhoneInput
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  placeholder="e.g. +1 212 555 0199 or +44 7911..."
                  className="w-full pl-10 sm:pl-11 h-12 sm:h-13 text-sm sm:text-base"
                />
              </div>

              <CtaButton
                type="submit"
                onClick={() => handleLookup()}
                disabled={loading || phoneNumber.trim().length < 4}
                className="h-12 sm:h-13 px-6 sm:px-7 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm sm:text-base shadow-md cursor-pointer shrink-0 w-full sm:w-auto"
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <span className="size-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                    Analyzing...
                  </span>
                ) : (
                  <span className="flex items-center justify-center gap-2">
                    <Search size={17} />
                    Track Number
                  </span>
                )}
              </CtaButton>
            </form>

            {/* Quick Test Chips: Strictly 1 single row for maximum space on mobile */}
            <div className="mt-2 flex items-center gap-1.5 pt-2 border-t border-slate-100 text-xs text-slate-500 overflow-x-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
              <span className="shrink-0 font-medium text-slate-400 text-[11px] sm:text-xs">
                <span className="sm:hidden">Try:</span>
                <span className="hidden sm:inline">Test Examples:</span>
              </span>
              {sampleNumbers.map((s) => (
                <button
                  key={s.value}
                  type="button"
                  onClick={() => {
                    setPhoneNumber(s.value);
                    handleLookup(s.value);
                  }}
                  className="shrink-0 rounded-full bg-slate-100 px-2 sm:px-2.5 py-0.5 sm:py-1 font-mono text-[11px] text-slate-700 transition hover:bg-blue-50 hover:text-blue-700 cursor-pointer"
                >
                  <span className="sm:hidden">{s.label}</span>
                  <span className="hidden sm:inline">{s.fullLabel}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Loading Scanner */}
          {loading && (
            <div className="mt-4 rounded-xl border border-blue-200 bg-blue-50/70 p-4">
              <div className="flex items-center justify-between text-xs font-semibold text-blue-900">
                <span className="flex items-center gap-2">
                  <span className="size-2.5 animate-ping rounded-full bg-blue-600" />
                  {SCAN_STEPS[scanStepIndex]}
                </span>
                <span>{Math.round(((scanStepIndex + 1) / SCAN_STEPS.length) * 100)}%</span>
              </div>
              <div className="mt-2.5 h-1.5 w-full overflow-hidden rounded-full bg-blue-200/60">
                <div
                  className="h-full bg-blue-600 transition-all duration-300 ease-out"
                  style={{ width: `${((scanStepIndex + 1) / SCAN_STEPS.length) * 100}%` }}
                />
              </div>
            </div>
          )}

          {error && (
            <div className="mt-4 rounded-xl border border-red-200 bg-red-50 p-4 text-sm font-medium text-red-700">
              {error}
            </div>
          )}
        </div>

        {/* 3. Hero Zoom-In Video: Placed order-3 on mobile so it is immediately visible in view right after the search input */}
        <div className="order-3 lg:order-none lg:col-start-2 lg:row-start-1 lg:row-span-3 space-y-3">
          <VideoHero />
        </div>

        {/* 4. Value Micro-cards: Placed order-4 on mobile under the video */}
        <div className="order-4 lg:order-none lg:col-start-1 lg:row-start-3">
          <div className="grid grid-cols-2 gap-3 sm:gap-4 sm:grid-cols-3">
            <div className="rounded-xl border border-slate-200 bg-white p-3.5 sm:p-4 shadow-xs">
              <p className="text-xl sm:text-2xl font-bold text-slate-950">$9.99</p>
              <p className="mt-0.5 sm:mt-1 text-[11px] sm:text-xs font-medium text-slate-500">1 Number per Dossier · No Subscription</p>
            </div>
            <div className="rounded-xl border border-slate-200 bg-white p-3.5 sm:p-4 shadow-xs">
              <p className="text-xl sm:text-2xl font-bold text-blue-600">2M Satellite</p>
              <p className="mt-0.5 sm:mt-1 text-[11px] sm:text-xs font-medium text-slate-500">Interactive 3D Globe & Aerial Optics</p>
            </div>
            <div className="rounded-xl border border-slate-200 bg-white p-3.5 sm:p-4 shadow-xs col-span-2 sm:col-span-1">
              <p className="text-xl sm:text-2xl font-bold text-emerald-600">Dedicated</p>
              <p className="mt-0.5 sm:mt-1 text-[11px] sm:text-xs font-medium text-slate-500">Single Target Focus · Instant PDF</p>
            </div>
          </div>
        </div>
      </div>

      {/* Report & 3D Interactive Satellite Globe Results Zone */}
      {result && (
        <div id="report-results" className="mt-16 scroll-mt-8 border-t border-slate-200 pt-12">
          <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-1.5 rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
                <Sparkles size={13} />
                Triangulated Result & 2M Optics
              </div>
              <h2 className="mt-2 text-2xl font-bold text-slate-950 sm:text-3xl">
                Intelligence Dossier & 3D Satellite Optics
              </h2>
            </div>

            {/* Quick Action: Clear / New Search */}
            <button
              type="button"
              onClick={handleResetSearch}
              className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-4 py-2 text-xs font-semibold text-slate-700 shadow-xs hover:bg-slate-50 hover:text-blue-600 cursor-pointer"
            >
              <RotateCcw size={13} />
              <span>Track Another Number</span>
            </button>
          </div>

          <div className="grid items-start gap-8 lg:grid-cols-[1.1fr_0.9fr]">
            {/* Left: Report Details & Unlock CTA */}
            <div>
              <ReportVisualization
                result={result}
                onCheckout={handleCheckout}
                onVerifyPaid={handleVerifyPaid}
              />
            </div>

            {/* Right: Interactive 3D Satellite Globe focusing on location */}
            <div className="sticky top-24 space-y-3">
              <div className="rounded-xl border border-slate-200 bg-white p-3 text-xs text-slate-600 shadow-xs flex items-center justify-between">
                <span className="font-semibold text-slate-800">Interactive 3D Satellite & 2M Aerial Optics</span>
                <span className="text-blue-600 font-medium">Drag to Rotate · +/- to Zoom</span>
              </div>
              <Globe
                target={result.coordinates}
                active={true}
                locationName={`${result.city}, ${result.country}`}
                hasLicense={!result.partial}
                onUnlock={handleCheckout}
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
