"use client";

import { motion } from "framer-motion";
import { Activity, CheckCircle2, Clock3, Database, LockKeyhole, MapPin, RadioTower, ShieldAlert } from "lucide-react";
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

function Meter({ label, value, tone = "blue" }: { label: string; value: number; tone?: "blue" | "emerald" | "amber" }) {
  const color = tone === "emerald" ? "bg-emerald-500" : tone === "amber" ? "bg-amber-500" : "bg-blue-600";
  return (
    <div>
      <div className="flex items-center justify-between text-sm">
        <span className="font-medium text-slate-600">{label}</span>
        <span className="font-semibold text-slate-950">{value}%</span>
      </div>
      <div className="mt-2 h-2 overflow-hidden rounded-full bg-slate-100">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${value}%` }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className={`h-full rounded-full ${color}`}
        />
      </div>
    </div>
  );
}

export default function ReportVisualization({
  result,
  onCheckout,
}: {
  result: LookupResult;
  onCheckout: () => void;
}) {
  const precision = result.partial ? 62 : 94;
  const riskScore = result.risk?.score ?? 42;
  const lowRisk = Math.max(0, 100 - riskScore);

  return (
    <motion.section
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      className="mt-8 overflow-hidden rounded-lg border border-slate-200 bg-white shadow-soft"
      aria-label="Phone intelligence report"
    >
      <div className="border-b border-slate-200 bg-slate-950 px-5 py-5 text-white">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-sm font-medium text-blue-200">{result.formats.international}</p>
            <h2 className="mt-1 text-2xl font-semibold">
              {result.city}, {result.country}
            </h2>
          </div>
          <span className={`rounded-full px-4 py-2 text-sm font-semibold ${result.partial ? "bg-amber-400 text-slate-950" : "bg-emerald-400 text-slate-950"}`}>
            {result.partial ? "Preview report" : "Complete report"}
          </span>
        </div>
      </div>

      <div className="grid gap-0 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="p-5">
          <div className="grid gap-4 sm:grid-cols-3">
            <Fact icon={RadioTower} label="Carrier" value={result.provider} />
            <Fact icon={Activity} label="Line type" value={result.lineType.toUpperCase()} />
            <Fact icon={Clock3} label="Timezone" value={result.timezone} />
          </div>

          <div className="mt-6 grid gap-5 rounded-lg bg-slate-50 p-5">
            <Meter label="Identity confidence" value={result.confidence} tone="blue" />
            <Meter label="Location precision" value={precision} tone={result.partial ? "amber" : "emerald"} />
            <Meter label="Low-risk signal" value={lowRisk} tone={lowRisk > 70 ? "emerald" : "amber"} />
          </div>

          <div className="mt-6 grid gap-3">
            {result.dataSources.map((source) => (
              <div key={source.name} className="flex items-center justify-between rounded-md border border-slate-200 px-4 py-3">
                <div className="flex items-center gap-3">
                  {source.status === "locked" && result.partial ? (
                    <LockKeyhole className="size-5 text-slate-400" aria-hidden="true" />
                  ) : (
                    <CheckCircle2 className="size-5 text-emerald-600" aria-hidden="true" />
                  )}
                  <span className="text-sm font-medium text-slate-700">{source.name}</span>
                </div>
                <span className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">
                  {source.status === "locked" && result.partial ? "locked" : source.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        <aside className="border-t border-slate-200 bg-slate-50 p-5 lg:border-l lg:border-t-0">
          <div className="rounded-lg border border-slate-200 bg-white p-5">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-blue-700">Signal summary</p>
            <dl className="mt-5 grid gap-4">
              <Summary icon={MapPin} label="Region" value={`${result.regionCode} · ${result.coordinates[1].toFixed(2)}, ${result.coordinates[0].toFixed(2)}`} />
              <Summary icon={Database} label="E.164 format" value={result.formats.e164} />
              <Summary icon={ShieldAlert} label="Risk score" value={result.partial ? "Locked until payment" : `${riskScore}/100`} locked={result.partial} />
            </dl>
            {result.partial ? (
              <div className="mt-6 rounded-lg border border-amber-200 bg-amber-50 p-4">
                <p className="text-sm leading-6 text-amber-950">
                  The preview hides precise location confidence, risk indicators and export-ready intelligence.
                </p>
                <CtaButton onClick={onCheckout} className="mt-4 w-full">
                  Unlock complete report - EUR 9.99
                </CtaButton>
              </div>
            ) : (
              <div className="mt-6 rounded-lg border border-emerald-200 bg-emerald-50 p-4 text-sm leading-6 text-emerald-950">
                License verified. Full intelligence data is available for this number.
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
    <div className="rounded-lg border border-slate-200 bg-white p-4">
      <Icon className="size-5 text-blue-700" aria-hidden="true" />
      <dt className="mt-3 text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">{label}</dt>
      <dd className="mt-1 text-sm font-semibold text-slate-950">{value}</dd>
    </div>
  );
}

function Summary({
  icon: Icon,
  label,
  value,
  locked = false,
}: {
  icon: typeof MapPin;
  label: string;
  value: string;
  locked?: boolean;
}) {
  return (
    <div className="flex gap-3">
      <Icon className={`mt-1 size-5 ${locked ? "text-slate-400" : "text-blue-700"}`} aria-hidden="true" />
      <div>
        <dt className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">{label}</dt>
        <dd className="mt-1 text-sm font-semibold text-slate-950">{value}</dd>
      </div>
    </div>
  );
}
