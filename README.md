# PhoneLocating.com – Telefonnummer-Tracker mit 3D-Satelliten-Globus

Professionelle Telefonnummer-Intelligence-Plattform mit interaktivem 3D-Satelliten-Globus, Stripe-Checkout (9,99 € Einmalzahlung) und detaillierten Dossier-Reports.

---

## Projektübersicht

| Bereich | Technologie |
|---|---|
| Framework | Next.js 16 (App Router + Pages Router API) |
| Sprache | TypeScript |
| Styling | Tailwind CSS v4 |
| 3D-Globus | Three.js + OrbitControls (Satellitentexturen) |
| Animationen | Framer Motion |
| Icons | Lucide React |
| Zahlung | Stripe Checkout (EUR 9,99 Einmalzahlung) |
| Authentifizierung | HMAC-SHA256 signierte Lizenz-Tokens |

---

## Verzeichnisstruktur

```
numberlocating.com/
├── app/                          # Next.js App Router (Seiten & Layouts)
│   ├── layout.tsx                # Root-Layout mit Navbar, Footer, Metadata
│   ├── page.tsx                  # Landing Page (Hero, Trust, Globe, Reviews, Features)
│   ├── globals.css               # Globale Styles (helles Corporate-Design)
│   ├── error.tsx                 # Client Error Boundary
│   ├── global-error.tsx          # Root Error Boundary
│   ├── not-found.tsx             # 404 Seite
│   ├── pricing/page.tsx          # Preise & Tarife (Kostenlos vs. 9,99 €)
│   ├── success/page.tsx          # Stripe Erfolgsseite nach Zahlung
│   ├── cancel/page.tsx           # Stripe Abbruchseite
│   ├── about/page.tsx            # Über uns
│   ├── contact/page.tsx          # Kontaktformular
│   ├── faq/page.tsx              # Häufige Fragen
│   ├── features/page.tsx         # Feature-Details
│   ├── privacy/page.tsx          # Datenschutzerklärung
│   ├── terms/page.tsx            # Nutzungsbedingungen
│   ├── legal-notice/page.tsx     # Impressum
│   ├── cookies/page.tsx          # Cookie-Richtlinie
│   └── refund/page.tsx           # Widerrufsbelehrung
│
├── components/                   # Wiederverwendbare UI-Komponenten
│   ├── Hero.tsx                  # Hauptsektion: Nummerneingabe, Video, Scan-Animation
│   ├── Globe.tsx                 # ⭐ Interaktiver 3D-Satelliten-Globus (Three.js)
│   ├── GlobeFeatureSection.tsx   # Eigenständige Globe-Demo-Sektion auf Landing Page
│   ├── VideoHero.tsx             # Satellit-Zoom-Video (/videos/google-earth.mp4)
│   ├── ReportVisualization.tsx   # Intelligence-Dossier mit Metern & Datenquellen
│   ├── ReviewsSection.tsx        # Kundenbewertungen (1.100+ Kunden, 4,89 Sterne)
│   ├── TrustSection.tsx          # Vertrauens-Badges (HLR, SSL, DSGVO)
│   ├── Navbar.tsx                # Sticky Navigation mit Glasmorphismus
│   ├── Footer.tsx                # Footer mit Rechtlichem & Sicherheitshinweisen
│   ├── PhoneInput.tsx            # Telefonnummer-Eingabefeld
│   ├── CtaButton.tsx             # Animierter Call-to-Action Button
│   ├── FeatureCard.tsx           # Feature-Karte mit Icon
│   ├── FAQAccordion.tsx          # Akkordeon für FAQ-Seite
│   ├── ContactForm.tsx           # Kontaktformular
│   └── SuccessClient.tsx         # Client-seitige Lizenz-Aktivierung nach Zahlung
│
├── pages/api/                    # Next.js Pages Router API-Endpunkte
│   ├── lookup.ts                 # POST: Telefonnummer-Lookup (Mock-Provider)
│   ├── contact.ts                # POST: Kontaktformular absenden
│   ├── stripe/
│   │   ├── create-session.ts     # POST: Stripe Checkout Session erstellen (9,99 €)
│   │   └── webhook.ts            # POST: Stripe Webhook Listener
│   └── license/
│       └── validate.ts           # POST: Lizenz validieren (+ Stripe-Fallback)
│
├── lib/                          # Serverlogik & Konfiguration
│   ├── stripe.ts                 # Stripe SDK Instance + isStripeConfigured()
│   ├── license-store.ts          # JSON-Datei-basierter Lizenz-Speicher
│   ├── rate-limit.ts             # IP-basiertes Rate-Limiting
│   ├── content.ts                # Navigation, Footer-Links, Feature-Daten
│   └── providers/
│       └── mock.ts               # Mock-Lookup-Provider (DE/AT/CH/US/UK/FR/IT/JP/AU)
│
├── utils/
│   └── license.ts                # HMAC-SHA256 Token-Erzeugung & Verifikation
│
├── data/
│   └── licenses.json             # Gespeicherte Lizenzen (automatisch erzeugt)
│
├── public/
│   ├── textures/
│   │   ├── earth-satellite.jpg   # NASA Erdtextur für 3D-Globus
│   │   └── earth-clouds.png      # Wolkenschicht-Textur
│   └── videos/
│       └── google-earth.mp4      # Satelliten-Zoom-Video (16 MB)
│
├── .env.local                    # Umgebungsvariablen (Stripe-Keys, Secrets)
├── next.config.ts                # Next.js Konfiguration mit Turbopack-Root
├── tsconfig.json                 # TypeScript-Konfiguration (@/* → ./*)
├── package.json                  # Abhängigkeiten & Scripts
├── tailwind.config.ts            # Tailwind CSS Konfiguration (v4)
└── postcss.config.mjs            # PostCSS Konfiguration
```

---

## Schnellstart

```bash
# 1. Abhängigkeiten installieren
npm install

# 2. Umgebungsvariablen konfigurieren
cp .env.example .env.local
# → Stripe-Keys eintragen (optional – ohne funktioniert der Demo-Modus)

# 3. Entwicklungsserver starten
npm run dev

# 4. Im Browser öffnen
# → http://localhost:3000
```

---

## Umgebungsvariablen (.env.local)

```env
# Stripe (optional für Demo-Betrieb)
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...

# Lizenz-Signierung
LICENSE_SECRET=ein_sicherer_32_zeichen_string

# App-URL
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

> **Hinweis:** Solange `STRIPE_SECRET_KEY` Platzhalter enthält (`sk_test_YOURSECRET`),
> schaltet das System automatisch in den **Demo-/Sandbox-Modus**. Dort wird die
> Zahlung simuliert und die Lizenz sofort freigeschaltet.

---

## Benutzerablauf

1. **Nummer eingeben** → Startseite, Feld mit Beispiel-Nummern-Chips
2. **Echtzeit-Scan** → Multi-Step Fortschrittsanzeige (HLR, SS7, Triangulation)
3. **Vorschau-Report** → Netzbetreiber, Land, Zeitzone, 3D-Globus-Zielflug (kostenlos)
4. **Dossier freischalten** → „9,99 € via Stripe" Button → Stripe Checkout
5. **Zahlung bestätigt** → `/success` Seite → Lizenz-Token wird in `localStorage` gespeichert
6. **Vollständiger Report** → Exakte GPS-Koordinaten, Risikoscore, PDF-Export

---

## Architektur-Entscheidungen

### Warum Pages Router für API-Endpunkte?
Next.js 16 unterstützt sowohl App Router als auch Pages Router. Die API-Routes
(`/pages/api/...`) nutzen den Pages Router, da dieser stabile `NextApiRequest`-
und `NextApiResponse`-Typen bietet, die gut mit Stripe Webhooks funktionieren
(insbesondere das Deaktivieren des Body-Parsers für die Webhook-Signatur-Verifikation).

### Warum Mock-Provider?
Der aktuelle Lookup nutzt einen **Mock-Provider** (`lib/providers/mock.ts`),
der für jede Vorwahl realistische, aber fiktive Daten zurückgibt. Das Interface
`PhoneLookupProvider` ist so gestaltet, dass echte Provider (z. B. Twilio Lookup,
Numverify, Abstract API) als Drop-in-Ersatz implementiert werden können.

### Warum JSON-Datei statt Datenbank?
Für den MVP reicht `data/licenses.json` als einfacher Speicher. Für Produktion
sollte eine Datenbank (z. B. Vercel KV, PostgreSQL, MongoDB) verwendet werden.

### 3D-Globus (Three.js)
Der Globus in `components/Globe.tsx` nutzt Three.js direkt (ohne React Three Fiber),
um die Bundle-Größe klein zu halten. Features:
- **OrbitControls** für Maus-/Touch-Interaktion
- **Satelliten-Erdtextur** aus `/public/textures/`
- **Sonar-Radar-Pins** als animierte Zielmarkierungen
- **Kameraflug** (Cubic Ease) zum Zielort nach Lookup

---

## Weiterentwicklung

### Echten Telefon-Lookup integrieren
```typescript
// lib/providers/twilio.ts (Beispiel)
import { PhoneLookupProvider, LookupReport } from "./mock";

export const twilioProvider: PhoneLookupProvider = {
  async lookup(phoneNumber: string): Promise<LookupReport> {
    // Twilio Lookup API aufrufen
    // Ergebnis in LookupReport-Format transformieren
  }
};
```

### Datenbank anbinden
Ersetze `lib/license-store.ts` durch einen Datenbank-Adapter
(z. B. Prisma, Drizzle ORM).

### Stripe Live-Keys aktivieren
1. Stripe Dashboard → API Keys → Live-Schlüssel kopieren
2. In `.env.local` eintragen
3. Webhook-Endpunkt in Stripe registrieren: `https://yourdomain.com/api/stripe/webhook`

---

## Scripts

| Script | Beschreibung |
|---|---|
| `npm run dev` | Startet den Entwicklungsserver (Turbopack) |
| `npm run build` | Erstellt den Produktions-Build |
| `npm start` | Startet den Produktionsserver |
| `npm run lint` | ESLint-Prüfung |

---

## Lizenz

Privates Projekt. Alle Rechte vorbehalten.
