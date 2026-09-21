export type LookupReport = {
  phoneNumber: string;
  valid: boolean;
  city: string;
  country: string;
  provider: string;
  timezone: string;
  coordinates: [number, number]; // [longitude, latitude]
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
  let cleaned = phoneNumber.replace(/[^\d+]/g, "");
  if (cleaned.startsWith("00")) {
    cleaned = "+" + cleaned.slice(2);
  }
  return cleaned;
}

type CountryPreset = {
  country: string;
  city: string;
  coordinates: [number, number]; // [lng, lat]
  provider: string;
  timezone: string;
  regionCode: string;
  lineType: "mobile" | "landline" | "voip";
};

export const mockProvider: PhoneLookupProvider = {
  async lookup(phoneNumber: string) {
    const raw = normalize(phoneNumber);
    let num = raw;

    let preset: CountryPreset = {
      country: "Germany",
      city: "Berlin",
      coordinates: [13.405, 52.52],
      provider: "Deutsche Telekom AG",
      timezone: "Europe/Berlin",
      regionCode: "DE-BE",
      lineType: "mobile",
    };

    if (num.startsWith("+49") || num.startsWith("49") || num.startsWith("0")) {
      const stripped = num.replace(/^(\+49|49|0)/, "");
      if (stripped.startsWith("89")) {
        preset = { country: "Germany", city: "München", coordinates: [11.582, 48.1351], provider: "Vodafone Deutschland", timezone: "Europe/Berlin", regionCode: "DE-BY", lineType: "landline" };
      } else if (stripped.startsWith("40")) {
        preset = { country: "Germany", city: "Hamburg", coordinates: [9.9937, 53.5511], provider: "Telefónica Germany (O2)", timezone: "Europe/Berlin", regionCode: "DE-HH", lineType: "landline" };
      } else if (stripped.startsWith("69")) {
        preset = { country: "Germany", city: "Frankfurt am Main", coordinates: [8.6821, 50.1109], provider: "Deutsche Telekom AG", timezone: "Europe/Berlin", regionCode: "DE-HE", lineType: "landline" };
      } else if (stripped.startsWith("221")) {
        preset = { country: "Germany", city: "Köln", coordinates: [6.9603, 50.9375], provider: "1&1 Telecom GmbH", timezone: "Europe/Berlin", regionCode: "DE-NW", lineType: "landline" };
      } else if (stripped.startsWith("17") || stripped.startsWith("15") || stripped.startsWith("16")) {
        preset = { country: "Germany", city: "Berlin (Mobilfunknetz)", coordinates: [13.405, 52.52], provider: "Deutsche Telekom Mobilfunk", timezone: "Europe/Berlin", regionCode: "DE-BE", lineType: "mobile" };
      } else {
        preset = { country: "Germany", city: "Berlin", coordinates: [13.405, 52.52], provider: "Deutsche Telekom AG", timezone: "Europe/Berlin", regionCode: "DE-BE", lineType: "mobile" };
      }
    } else if (num.startsWith("+43") || num.startsWith("43")) {
      preset = { country: "Austria", city: "Wien", coordinates: [16.3738, 48.2082], provider: "A1 Telekom Austria", timezone: "Europe/Vienna", regionCode: "AT-9", lineType: "mobile" };
    } else if (num.startsWith("+41") || num.startsWith("41")) {
      preset = { country: "Switzerland", city: "Zürich", coordinates: [8.5417, 47.3769], provider: "Swisscom AG", timezone: "Europe/Zurich", regionCode: "CH-ZH", lineType: "mobile" };
    } else if (num.startsWith("+44") || num.startsWith("44")) {
      preset = { country: "United Kingdom", city: "London", coordinates: [-0.1278, 51.5074], provider: "EE / BT Group", timezone: "Europe/London", regionCode: "GB-LND", lineType: "mobile" };
    } else if (num.startsWith("+33") || num.startsWith("33")) {
      preset = { country: "France", city: "Paris", coordinates: [2.3522, 48.8566], provider: "Orange SA", timezone: "Europe/Paris", regionCode: "FR-IDF", lineType: "mobile" };
    } else if (num.startsWith("+34") || num.startsWith("34")) {
      preset = { country: "Spain", city: "Madrid", coordinates: [-3.7038, 40.4168], provider: "Telefónica Móviles España", timezone: "Europe/Madrid", regionCode: "ES-MD", lineType: "mobile" };
    } else if (num.startsWith("+39") || num.startsWith("39")) {
      preset = { country: "Italy", city: "Rom", coordinates: [12.4964, 41.9028], provider: "TIM Telecom Italia", timezone: "Europe/Rome", regionCode: "IT-62", lineType: "mobile" };
    } else if (num.startsWith("+1") || num.startsWith("1")) {
      preset = { country: "United States", city: "New York", coordinates: [-74.006, 40.7128], provider: "Verizon Wireless", timezone: "America/New_York", regionCode: "US-NY", lineType: "mobile" };
    } else if (num.startsWith("+81") || num.startsWith("81")) {
      preset = { country: "Japan", city: "Tokyo", coordinates: [139.6917, 35.6895], provider: "NTT DOCOMO", timezone: "Asia/Tokyo", regionCode: "JP-13", lineType: "mobile" };
    } else if (num.startsWith("+61") || num.startsWith("61")) {
      preset = { country: "Australia", city: "Sydney", coordinates: [151.2093, -33.8688], provider: "Telstra Corporation", timezone: "Australia/Sydney", regionCode: "AU-NSW", lineType: "mobile" };
    }

    const digitsOnly = raw.replace(/\D/g, "");
    const isValid = digitsOnly.length >= 7 && digitsOnly.length <= 15;

    return {
      phoneNumber: raw,
      valid: isValid,
      city: preset.city,
      country: preset.country,
      provider: preset.provider,
      timezone: preset.timezone,
      coordinates: preset.coordinates,
      lineType: preset.lineType,
      confidence: 94,
      lastSeen: new Date().toISOString(),
      regionCode: preset.regionCode,
      dataSources: [
        { name: "HLR / SS7 Network Routing Registry", status: "matched" },
        { name: "Carrier Infrastructure Table", status: "matched" },
        { name: "Orbital Satellite Cell Triangulation", status: "estimated" },
        { name: "Fraud & Spam Risk Scoring Feed", status: "locked" },
      ],
      formats: {
        international: raw.startsWith("+") ? raw : `+${raw}`,
        national: digitsOnly.length > 5 ? digitsOnly.slice(-10) : digitsOnly,
        e164: raw.startsWith("+") ? raw : `+${raw}`,
      },
      risk: {
        score: 14,
        indicators: [
          "Verified Network Operator Infrastructure",
          "No Known Phishing, Spoofing or Spam Reports",
          "Active SIM Routing Registry Confirmation",
        ],
      },
    };
  },
};
