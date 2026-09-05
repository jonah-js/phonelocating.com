export type LookupReport = {
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
  dataSources: Array<{
    name: string;
    status: "matched" | "estimated" | "locked";
  }>;
  formats: {
    international: string;
    national: string;
    e164: string;
  };
  risk: {
    score: number;
    indicators: string[];
  };
};

export interface PhoneLookupProvider {
  lookup(phoneNumber: string): Promise<LookupReport>;
}

function normalize(phoneNumber: string) {
  return phoneNumber.replace(/[^\d+]/g, "");
}

export const mockProvider: PhoneLookupProvider = {
  async lookup(phoneNumber) {
    const normalized = normalize(phoneNumber);
    const isGerman = normalized.startsWith("+49") || normalized.startsWith("49") || normalized.startsWith("0");
    return {
      phoneNumber: normalized,
      valid: normalized.replace(/\D/g, "").length >= 7,
      city: isGerman ? "Berlin" : "San Francisco",
      country: isGerman ? "Germany" : "United States",
      provider: isGerman ? "Deutsche Telekom Mock" : "Twilio Mock Carrier",
      timezone: isGerman ? "Europe/Berlin" : "America/Los_Angeles",
      coordinates: isGerman ? [13.405, 52.52] : [-122.4194, 37.7749],
      lineType: isGerman ? "landline" : "voip",
      confidence: isGerman ? 91 : 87,
      lastSeen: "2026-07-07T08:30:00.000Z",
      regionCode: isGerman ? "BE" : "CA",
      dataSources: [
        { name: "Number format registry", status: "matched" },
        { name: "Carrier routing table", status: "matched" },
        { name: "Location confidence model", status: "estimated" },
        { name: "Risk intelligence feed", status: "locked" },
      ],
      formats: {
        international: isGerman ? "+49 30 123456" : "+1 415 555 0199",
        national: isGerman ? "030 123456" : "(415) 555-0199",
        e164: isGerman ? "+4930123456" : "+14155550199",
      },
      risk: {
        score: isGerman ? 18 : 24,
        indicators: ["Mock-Datenquelle", "Keine aktuellen Missbrauchssignale"],
      },
    };
  },
};
