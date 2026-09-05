import type { NextApiRequest, NextApiResponse } from "next";
import { findLicenseBySession, isLicenseActive } from "@/lib/license-store";
import { verifyLicenseToken } from "@/utils/license";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") return res.status(405).json({ error: "Nur POST ist erlaubt." });

  const { licenseId, sessionId } = req.body as { licenseId?: string; sessionId?: string };
  if (sessionId) {
    const license = await findLicenseBySession(sessionId);
    if (!license) return res.status(404).json({ valid: false, error: "License is not available yet." });
    return res.status(200).json({ valid: true, licenseId: license.token, phoneNumber: license.phoneNumber });
  }

  if (!licenseId) return res.status(400).json({ valid: false, error: "License is missing." });
  const payload = verifyLicenseToken(licenseId);
  const active = payload ? await isLicenseActive(payload.id) : false;
  return res.status(200).json({ valid: active });
}
