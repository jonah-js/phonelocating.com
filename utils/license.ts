import crypto from "node:crypto";

export type LicensePayload = {
  id: string;
  phoneNumber: string;
  sessionId: string;
  issuedAt: number;
  expiresAt?: number;
};

function secret() {
  return process.env.LICENSE_SECRET || process.env.STRIPE_WEBHOOK_SECRET || "development-license-secret";
}

function base64url(input: string | Buffer) {
  return Buffer.from(input).toString("base64url");
}

function sign(payload: string) {
  return crypto.createHmac("sha256", secret()).update(payload).digest("base64url");
}

export function createLicenseToken(payload: Omit<LicensePayload, "id" | "issuedAt"> & { issuedAt?: number }) {
  const license: LicensePayload = {
    id: crypto.randomUUID(),
    issuedAt: payload.issuedAt || Date.now(),
    phoneNumber: payload.phoneNumber,
    sessionId: payload.sessionId,
  };
  const encoded = base64url(JSON.stringify(license));
  return `${encoded}.${sign(encoded)}`;
}

export function verifyLicenseToken(token: string): LicensePayload | null {
  const [encoded, signature] = token.split(".");
  if (!encoded || !signature) return null;
  const expected = sign(encoded);
  if (Buffer.byteLength(signature) !== Buffer.byteLength(expected)) return null;
  if (!crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expected))) return null;
  const payload = JSON.parse(Buffer.from(encoded, "base64url").toString("utf8")) as LicensePayload;
  if (payload.expiresAt && payload.expiresAt < Date.now()) return null;
  return payload;
}
