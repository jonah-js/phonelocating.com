import fs from "node:fs/promises";
import path from "node:path";
import type { LicensePayload } from "@/utils/license";

export type StoredLicense = LicensePayload & {
  token: string;
  revoked?: boolean;
};

const storePath = path.join(process.cwd(), "data", "licenses.json");

async function readStore(): Promise<StoredLicense[]> {
  try {
    const raw = await fs.readFile(storePath, "utf8");
    return JSON.parse(raw) as StoredLicense[];
  } catch {
    return [];
  }
}

async function writeStore(licenses: StoredLicense[]) {
  await fs.mkdir(path.dirname(storePath), { recursive: true });
  await fs.writeFile(storePath, JSON.stringify(licenses, null, 2));
}

export async function saveLicense(license: StoredLicense) {
  const licenses = await readStore();
  const existing = licenses.findIndex((item) => item.sessionId === license.sessionId);
  if (existing >= 0) licenses[existing] = license;
  else licenses.push(license);
  await writeStore(licenses);
}

export async function findLicenseBySession(sessionId: string) {
  const licenses = await readStore();
  return licenses.find((license) => license.sessionId === sessionId && !license.revoked) || null;
}

export async function isLicenseActive(id: string) {
  const licenses = await readStore();
  return licenses.some((license) => license.id === id && !license.revoked);
}
