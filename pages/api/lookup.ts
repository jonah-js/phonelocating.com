import type { NextApiRequest, NextApiResponse } from "next";
import { checkRateLimit } from "@/lib/rate-limit";
import { mockProvider } from "@/lib/providers/mock";
import { isLicenseActive } from "@/lib/license-store";
import { verifyLicenseToken } from "@/utils/license";

const allowedOrigins = new Set(["http://localhost:3000", process.env.NEXT_PUBLIC_APP_URL].filter(Boolean));

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const origin = req.headers.origin;
  if (origin && allowedOrigins.has(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin);
    res.setHeader("Access-Control-Allow-Methods", "POST,OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  }
  if (req.method === "OPTIONS") return res.status(204).end();
  if (req.method !== "POST") return res.status(405).json({ error: "Nur POST ist erlaubt." });

  const ip = String(req.headers["x-forwarded-for"] || req.socket.remoteAddress || "unknown");
  if (!checkRateLimit(ip)) return res.status(429).json({ error: "Too many requests. Please try again later." });

  const { phoneNumber, licenseId } = req.body as { phoneNumber?: string; licenseId?: string };
  if (!phoneNumber || phoneNumber.trim().length < 4) {
    return res.status(400).json({ error: "Enter a valid phone number." });
  }

  const report = await mockProvider.lookup(phoneNumber);
  const payload = licenseId ? verifyLicenseToken(licenseId) : null;
  const validLicense = payload ? await isLicenseActive(payload.id) : false;

  if (!validLicense) {
    const partial = {
      phoneNumber: report.phoneNumber,
      valid: report.valid,
      city: report.city,
      country: report.country,
      provider: report.provider,
      timezone: report.timezone,
      lineType: report.lineType,
      confidence: report.confidence,
      lastSeen: report.lastSeen,
      regionCode: report.regionCode,
      dataSources: report.dataSources,
      formats: report.formats,
    };
    return res.status(200).json({
      ...partial,
      coordinates: [Number(report.coordinates[0].toFixed(1)), Number(report.coordinates[1].toFixed(1))],
      partial: true,
    });
  }

  return res.status(200).json({ ...report, partial: false });
}
