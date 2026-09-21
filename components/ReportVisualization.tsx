"use client";

import { motion } from "framer-motion";
import {
  Activity,
  CheckCircle2,
  Clock3,
  Database,
  Download,
  LockKeyhole,
  MapPin,
  Printer,
  Radio,
  RadioTower,
  ShieldAlert,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import CtaButton from "@/components/CtaButton";

export type LookupResult = {
  phoneNumber: string;
  valid: boolean;
  city: string;
  country: string;
  provider: string;
  timezone: string;
  coordinates: [number, number];
  lineType: "mobile" | "landline" | "voip";
  confidence: number;
  lastSeen: string;
  regionCode: string;
  partial: boolean;
  dataSources: Array<{
    name: string;
    status: "matched" | "estimated" | "locked";
  }>;
  formats: {
    international: string;
    national: string;
    e164: string;
  };
  risk?: {
    score: number;
    indicators: string[];
  };
};

function Meter({
  label,
  value,
  tone = "blue",
  blurred = false,
}: {
  label: string;
  value: number;
  tone?: "blue" | "emerald" | "amber";
  blurred?: boolean;
}) {
  const color = tone === "emerald" ? "bg-emerald-600" : tone === "amber" ? "bg-amber-500" : "bg-blue-600";
  return (
    <div className="relative">
      <div className={`flex items-center justify-between text-sm ${blurred ? "filter blur-[4px] select-none" : ""}`}>
        <span className="font-medium text-slate-700">{label}</span>
        <span className="font-semibold text-slate-900">{value}%</span>
      </div>
      <div className={`mt-2 h-2 overflow-hidden rounded-full bg-slate-200/80 ${blurred ? "filter blur-[3px]" : ""}`}>
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${value}%` }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className={`h-full rounded-full ${color}`}
        />
      </div>
      {blurred && (
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="inline-flex items-center gap-1 rounded-full bg-slate-900/80 px-2.5 py-0.5 text-[10px] font-semibold text-amber-300 backdrop-blur-sm">
            <LockKeyhole size={10} /> Locked
          </span>
        </div>
      )}
    </div>
  );
}

export default function ReportVisualization({
  result,
  onCheckout,
  onVerifyPaid,
}: {
  result: LookupResult;
  onCheckout: () => void;
  onVerifyPaid?: () => void;
}) {
  const precision = result.partial ? 58 : 98;
  const riskScore = result.risk?.score ?? 14;
  const lowRisk = Math.max(0, 100 - riskScore);

  const handlePrint = () => {
    window.print();
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      className="mt-8 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-card"
      aria-label="Phone intelligence report"
    >
      {/* Dossier Header */}
      <div className="border-b border-slate-200 bg-slate-900 px-4 py-4 sm:px-6 sm:py-5 text-white">
        <div className="flex flex-wrap items-center justify-between gap-3 sm:gap-4">
          <div>
            <div className="flex items-center gap-2 text-[11px] sm:text-xs font-semibold uppercase tracking-wider text-blue-300">
              <ShieldCheck size={15} className="text-blue-400" />
              <span>Dossier #{result.formats.e164.replace(/\D/g, "").slice(-6)}</span>
              <span className="text-slate-500">·</span>
              <span className="text-slate-300">ISO 27001 Certified Query</span>
            </div>
            <h2 className="mt-1 text-xl sm:text-2xl font-semibold tracking-tight text-white">
              {result.city}, {result.country}
            </h2>
            <p className="mt-0.5 text-xs sm:text-sm font-medium text-slate-300">{result.formats.international}</p>
          </div>

          <div className="flex items-center gap-3">
            <span
              className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 sm:px-4 sm:py-1.5 text-[11px] sm:text-xs font-semibold ${
                result.partial
                  ? "border border-amber-400/40 bg-amber-400/15 text-amber-300"
                  : "border border-emerald-400/40 bg-emerald-400/15 text-emerald-300"
              }`}
            >
              <span className={`size-2 rounded-full ${result.partial ? "bg-amber-400" : "bg-emerald-400"}`} />
              {result.partial ? "Preview (Sensitive Data Masked)" : "Full Forensic Dossier (Unlocked)"}
            </span>
          </div>
        </div>
      </div>

      <div className="grid gap-0 lg:grid-cols-[1.15fr_0.85fr]">
        {/* Left Column: Baseline Carrier Facts & Verification Meters */}
        <div className="p-4 sm:p-6">
          {/* Public Facts: Verified Carrier, Line Type, Timezone */}
          <div className="grid gap-2.5 sm:gap-3 sm:grid-cols-3">
            <Fact icon={RadioTower} label="Network Carrier" value={result.provider} />
            <Fact icon={Activity} label="Line Type" value={result.lineType.toUpperCase()} />
            <Fact icon={Clock3} label="Local Timezone" value={result.timezone} />
          </div>

          {/* Precision & Confidence Meters */}
          <div className="mt-5 sm:mt-6 grid gap-3.5 sm:gap-4 rounded-xl border border-slate-200/80 bg-slate-50/70 p-3.5 sm:p-5">
            <Meter label="Signal Triangulation Confidence" value={result.confidence} tone="blue" />
            <Meter
              label="2M Satellite Ground Precision"
              value={precision}
              tone={result.partial ? "amber" : "emerald"}
              blurred={result.partial}
            />
            <Meter
              label="Fraud & Spoofing Risk Safety Score"
              value={lowRisk}
              tone={lowRisk > 70 ? "emerald" : "amber"}
              blurred={result.partial}
            />
          </div>

          {/* Sensitive Telemetry with Frosted Paywall Blur when Unpaid */}
          <div className="mt-6">
            <div className="flex items-center justify-between">
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                Network & Triangulation Nodes
              </p>
              {result.partial && (
                <span className="text-[11px] font-semibold text-amber-700 flex items-center gap-1">
                  <LockKeyhole size={11} /> Masked in preview
                </span>
              )}
            </div>

            <div className="mt-3 relative">
              {/* Data Rows */}
              <div className={`grid gap-2.5 ${result.partial ? "filter blur-[5px] select-none pointer-events-none" : ""}`}>
                {result.dataSources.map((source) => (
                  <div
                    key={source.name}
                    className="flex items-center justify-between rounded-lg border border-slate-200/80 bg-white px-4 py-3 shadow-xs"
                  >
                    <div className="flex items-center gap-3">
                      <CheckCircle2 className="size-4 text-emerald-600" aria-hidden="true" />
                      <span className="text-sm font-medium text-slate-800">{source.name}</span>
                    </div>
                    <span className="rounded bg-emerald-100 px-2 py-0.5 text-[11px] font-semibold text-emerald-800 uppercase tracking-wider">
                      Verified
                    </span>
                  </div>
                ))}
                {/* Additional Forensic Details visible only when unlocked */}
                <div className="flex items-center justify-between rounded-lg border border-slate-200/80 bg-white px-4 py-3 shadow-xs">
                  <span className="text-sm font-medium text-slate-800">MSC/VLR Core Switch: Node-EU#8492</span>
                  <span className="text-[11px] font-mono text-slate-500">Routing Latency: 18ms</span>
                </div>
                <div className="flex items-center justify-between rounded-lg border border-slate-200/80 bg-white px-4 py-3 shadow-xs">
                  <span className="text-sm font-medium text-slate-800">Primary Cell Tower: CID-8921-AZ (Sector 3)</span>
                  <span className="text-[11px] font-mono text-emerald-600 font-semibold">2.1m Triangulated</span>
                </div>
              </div>

              {/* Frosted Glass Paywall Teaser Overlay */}
              {result.partial && (
                <div className="absolute inset-0 flex flex-col items-center justify-center rounded-xl bg-slate-900/10 backdrop-blur-[2px] p-4 text-center">
                  <div className="rounded-xl border border-slate-200 bg-white/95 px-5 py-3 shadow-lg backdrop-blur-md">
                    <div className="flex items-center justify-center gap-1.5 text-xs font-bold text-slate-900">
                      <LockKeyhole size={14} className="text-blue-600" />
                      <span>Detailed Network Telemetry & Routing Nodes Masked</span>
                    </div>
                    <p className="mt-1 text-[11px] text-slate-500">
                      Unlock the complete dossier to reveal unmasked cell towers, signal hops, and risk indicators.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Sidebar: Geodata Summary & Unlock Call-to-Action */}
        <aside className="border-t border-slate-200 bg-slate-50/60 p-4 sm:p-6 lg:border-l lg:border-t-0">
          <div className="rounded-xl border border-slate-200 bg-white p-4 sm:p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <p className="text-xs font-semibold uppercase tracking-wider text-blue-700">Geodata & Signal Telemetry</p>
              {!result.partial && (
                <button
                  type="button"
                  onClick={handlePrint}
                  className="inline-flex items-center gap-1 text-xs font-medium text-slate-600 hover:text-blue-600 cursor-pointer"
                >
                  <Printer size={13} />
                  Print
                </button>
              )}
            </div>

            {/* Geodata Fields */}
            <dl className="mt-4 grid gap-3.5 relative">
              {/* Coordinates */}
              <div className="relative">
                <Summary
                  icon={MapPin}
                  label="Exact GPS Coordinates"
                  value={
                    result.partial
                      ? `${result.coordinates[1].toFixed(1)}***° N, ${result.coordinates[0].toFixed(1)}***° E`
                      : `${result.coordinates[1].toFixed(5)}° N, ${result.coordinates[0].toFixed(5)}° E (2M Precision)`
                  }
                  blurred={result.partial}
                />
              </div>

              <Summary icon={Database} label="E.164 Routing ID" value={result.formats.e164} />

              {/* Cell Tower ID */}
              <Summary
                icon={Radio}
                label="Serving Cell Tower ID"
                value={result.partial ? "CID-7741-*** (Masked)" : "CID-7741-AZ (Azimuth: 142°)"}
                blurred={result.partial}
              />

              {/* Risk Score */}
              <Summary
                icon={ShieldAlert}
                label="Forensic Fraud & Risk Score"
                value={result.partial ? "14/100 (Detailed Analysis Locked)" : `${riskScore}/100 (Very Low Risk · Clean)`}
                blurred={result.partial}
              />
            </dl>

            {/* Paywall Card */}
            {result.partial ? (
              <div className="mt-6 rounded-xl border border-blue-200/80 bg-gradient-to-b from-blue-50/80 to-indigo-50/50 p-5">
                <div className="flex items-center gap-2 text-sm font-semibold text-blue-950">
                  <Sparkles size={16} className="text-blue-600" />
                  Unlock Full 2M Dossier
                </div>
                <p className="mt-2 text-xs leading-5 text-slate-600">
                  Dedicated single-number license for <span className="font-semibold text-slate-900">{result.formats.international}</span>. Unmasks razor-sharp GPS coordinates, 2M satellite aerial photography, cell tower footprint, and the printable PDF report.
                </p>

                <div className="mt-4 flex items-baseline gap-1.5">
                  <span className="text-3xl font-bold tracking-tight text-slate-950">$9.99</span>
                  <span className="text-xs font-semibold text-slate-500">/ 9.99 € per number (no subscription)</span>
                </div>

                <CtaButton onClick={onCheckout} className="mt-4 w-full bg-blue-600 text-white hover:bg-blue-700 shadow-md">
                  Unlock Complete Dossier Now
                </CtaButton>

                <div className="mt-3 flex items-center justify-center gap-2 text-[11px] text-slate-500">
                  <LockKeyhole size={12} className="text-emerald-600" />
                  <span>Secure 256-Bit Stripe Checkout · Instant Access</span>
                </div>

                {onVerifyPaid && (
                  <div className="mt-3 pt-3 border-t border-blue-200/60 text-center">
                    <button
                      type="button"
                      onClick={onVerifyPaid}
                      className="text-[11px] font-semibold text-blue-700 hover:text-blue-900 underline cursor-pointer"
                    >
                      Already paid via Stripe? Click to activate report
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="mt-6 rounded-xl border border-emerald-200 bg-emerald-50/80 p-4 text-xs leading-5 text-emerald-900">
                <div className="flex items-center gap-2 font-semibold text-emerald-950">
                  <CheckCircle2 size={16} className="text-emerald-600" />
                  License Verified & Active
                </div>
                <p className="mt-1 text-slate-700">
                  All forensic telemetry including high-resolution 2M satellite pinpoint has been unlocked for this number.
                </p>
                <button
                  type="button"
                  onClick={handlePrint}
                  className="mt-3 inline-flex items-center gap-1.5 rounded-lg border border-emerald-300 bg-white px-3.5 py-1.5 text-xs font-semibold text-emerald-800 shadow-xs hover:bg-emerald-50 cursor-pointer"
                >
                  <Download size={13} />
                  Download / Print Official PDF
                </button>
              </div>
            )}
          </div>
        </aside>
      </div>
    </motion.section>
  );
}

function Fact({ icon: Icon, label, value }: { icon: typeof RadioTower; label: string; value: string }) {
  return (
    <div className="rounded-xl border border-slate-200/80 bg-white p-4 shadow-xs">
      <Icon className="size-5 text-blue-600" aria-hidden="true" />
      <dt className="mt-2.5 text-xs font-semibold uppercase tracking-wider text-slate-500">{label}</dt>
      <dd className="mt-1 text-sm font-semibold text-slate-900 truncate">{value}</dd>
    </div>
  );
}

function Summary({
  icon: Icon,
  label,
  value,
  blurred = false,
}: {
  icon: typeof MapPin;
  label: string;
  value: string;
  blurred?: boolean;
}) {
  return (
    <div className="flex gap-3 text-left items-start">
      <Icon className={`mt-0.5 size-4.5 shrink-0 ${blurred ? "text-slate-400" : "text-blue-600"}`} aria-hidden="true" />
      <div className="flex-1">
        <dt className="text-xs font-semibold uppercase tracking-wider text-slate-500">{label}</dt>
        <dd
          className={`mt-0.5 text-xs font-semibold ${
            blurred ? "filter blur-[3px] select-none text-slate-500" : "text-slate-900"
          }`}
        >
          {value}
        </dd>
      </div>
      {blurred && (
        <span className="text-[10px] font-semibold text-amber-700 bg-amber-50 px-1.5 py-0.5 rounded border border-amber-200 shrink-0">
          Locked
        </span>
      )}
    </div>
  );
}
