"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { ArrowRight, CheckCircle2, FileText, Lock, ShieldCheck, Sparkles } from "lucide-react";

export default function SuccessClient() {
  const router = useRouter();
  const params = useSearchParams();
  const sessionId = params?.get("session_id");
  const phoneParam = params?.get("phone");

  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState(false);
  const [resolvedPhone, setResolvedPhone] = useState(phoneParam || "");
  const [countdown, setCountdown] = useState(3);
  const [message, setMessage] = useState("Verifying payment and unlocking 2M forensic dossier...");

  useEffect(() => {
    const activeSessionId = sessionId || `stripe_link_${Date.now()}`;
    const savedPhone = phoneParam || (typeof window !== "undefined" ? window.localStorage.getItem("phonetracking_phone") || "" : "");

    fetch("/api/license/validate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ sessionId: activeSessionId, phoneNumber: savedPhone || undefined }),
    })
      .then((res) => res.json())
      .then((data) => {
        setLoading(false);
        if (data.valid && data.licenseId) {
          const finalPhone = data.phoneNumber || savedPhone || "";
          setResolvedPhone(finalPhone);

          if (typeof window !== "undefined") {
            window.localStorage.setItem("phonetracking_license", data.licenseId);
            if (finalPhone) {
              window.localStorage.setItem("phonetracking_phone", finalPhone);
              try {
                const cleaned = finalPhone.replace(/[^\d+]/g, "").replace(/^00/, "+");
                const rawMap = window.localStorage.getItem("phonetracking_licenses_map");
                const map = rawMap ? JSON.parse(rawMap) : {};
                map[cleaned] = data.licenseId;
                window.localStorage.setItem("phonetracking_licenses_map", JSON.stringify(map));
              } catch {}
            }
            window.localStorage.setItem("phonetracking_unlocked", "true");
          }

          setSuccess(true);
          setMessage("Payment of $9.99 successfully confirmed! Your complete 2M dossier is unlocked.");
        } else {
          setSuccess(false);
          setMessage(data.error || "Unable to confirm license yet. Please refresh shortly.");
        }
      })
      .catch(() => {
        setLoading(false);
        setSuccess(false);
        setMessage("Connection error while verifying license token.");
      });
  }, [sessionId, phoneParam]);

  // Smooth automatic redirect to unlocked report after success
  useEffect(() => {
    if (!success) return;
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          const targetUrl = resolvedPhone
            ? `/#report?phone=${encodeURIComponent(resolvedPhone)}&unlocked=true`
            : `/#report?unlocked=true`;
          router.push(targetUrl);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [success, resolvedPhone, router]);

  const targetReportUrl = resolvedPhone
    ? `/#report?phone=${encodeURIComponent(resolvedPhone)}&unlocked=true`
    : `/#report?unlocked=true`;

  return (
    <section className="mx-auto flex min-h-[75vh] max-w-2xl flex-col items-center justify-center px-6 py-16 text-center">
      <div className="w-full rounded-3xl border border-slate-200 bg-white p-8 shadow-card sm:p-12">
        {loading ? (
          <div className="flex flex-col items-center">
            <div className="size-16 animate-spin rounded-full border-4 border-blue-600 border-t-transparent" />
            <h1 className="mt-6 text-2xl font-bold tracking-tight text-slate-950">Verifying Payment</h1>
            <p className="mt-2 text-sm text-slate-600">{message}</p>
          </div>
        ) : success ? (
          <div className="flex flex-col items-center">
            <div className="grid size-16 place-items-center rounded-full bg-emerald-50 text-emerald-600 ring-8 ring-emerald-50/50">
              <CheckCircle2 size={36} />
            </div>

            <div className="mt-6 inline-flex items-center gap-1.5 rounded-full bg-emerald-100/70 px-3.5 py-1 text-xs font-semibold text-emerald-800">
              <ShieldCheck size={14} />
              <span>Stripe Payment Verified ($9.99)</span>
            </div>

            <h1 className="mt-4 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
              2M Forensic Dossier Unlocked
            </h1>

            <p className="mt-3 text-base text-slate-600 max-w-md">
              Your license is now activated on this device. Redirecting to your unlocked report with high-resolution 2M
              satellite optics in <strong className="text-blue-600 font-bold">{countdown}s</strong>...
            </p>

            <div className="mt-6 w-full rounded-2xl border border-slate-200/80 bg-slate-50 p-4 text-left text-xs text-slate-600 space-y-1.5">
              <div className="flex justify-between">
                <span className="text-slate-500">Target Phone:</span>
                <span className="font-mono font-semibold text-slate-900">{resolvedPhone || "Target Device"}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Transaction ID:</span>
                <span className="font-mono font-medium text-slate-800 truncate max-w-[220px]">{sessionId}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Status:</span>
                <span className="font-semibold text-emerald-700">Completed & Cryptographically Signed</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Amount:</span>
                <span className="font-semibold text-slate-900">$9.99 / 9.99 EUR (One-Time Payment)</span>
              </div>
            </div>

            <div className="mt-8 flex flex-col sm:flex-row gap-3 w-full justify-center">
              <Link
                href={targetReportUrl}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-blue-600 px-7 py-3.5 text-sm font-semibold text-white shadow-md transition hover:bg-blue-700"
              >
                <Sparkles size={16} />
                <span>View Unlocked 2M Dossier Immediately</span>
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center">
            <div className="grid size-16 place-items-center rounded-full bg-amber-50 text-amber-600">
              <Lock size={32} />
            </div>
            <h1 className="mt-6 text-2xl font-bold tracking-tight text-slate-950">Verification Notice</h1>
            <p className="mt-3 text-sm text-slate-600 max-w-md">{message}</p>
            <Link
              href="/#report"
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-slate-900 px-6 py-3 text-sm font-semibold text-white hover:bg-slate-800"
            >
              <FileText size={16} />
              Back to Home
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
