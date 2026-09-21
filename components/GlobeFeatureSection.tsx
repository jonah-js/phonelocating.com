"use client";

import dynamic from "next/dynamic";
import { useState } from "react";
import { Compass, Globe2, Layers, MapPin, Radio, Satellite, ShieldCheck, Sparkles, ZoomIn } from "lucide-react";

const Globe = dynamic(() => import("@/components/Globe"), {
  ssr: false,
  loading: () => (
    <div className="flex h-[320px] sm:h-[440px] w-full flex-col items-center justify-center rounded-2xl border border-slate-200 bg-slate-900 text-slate-400">
      <Globe2 size={36} className="animate-spin text-blue-500" />
      <span className="mt-3 text-xs font-medium">Initializing 3D Satellite Optics...</span>
    </div>
  ),
});

const DEMO_LOCATIONS: Array<{
  name: string;
  coords: [number, number];
  city: string;
  country: string;
}> = [
  { name: "New York", coords: [-74.006, 40.7128], city: "New York", country: "United States" },
  { name: "London", coords: [-0.1278, 51.5074], city: "London", country: "United Kingdom" },
  { name: "Tokyo", coords: [139.6917, 35.6895], city: "Tokyo", country: "Japan" },
  { name: "Paris", coords: [2.3522, 48.8566], city: "Paris", country: "France" },
  { name: "Berlin", coords: [13.405, 52.52], city: "Berlin", country: "Germany" },
  { name: "Sydney", coords: [151.2093, -33.8688], city: "Sydney", country: "Australia" },
];

export default function GlobeFeatureSection() {
  const [selectedLoc, setSelectedLoc] = useState(DEMO_LOCATIONS[0]);

  return (
    <section id="satellite-3d" className="border-t border-slate-200 bg-slate-50/70 py-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-[0.95fr_1.05fr]">
          {/* Left Column: Description & Controls */}
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-3.5 py-1 text-xs font-semibold text-blue-700">
              <Satellite size={14} />
              <span>Interactive 3D Orbital & 2M Aerial Imagery</span>
            </div>

            <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
              Precision Geolocation on the 3D Satellite Globe Accurate to 2M.
            </h2>

            <p className="mt-4 text-base leading-7 text-slate-600">
              As soon as you track a phone number, our platform interrogates global SS7 routing nodes and triangulates
              carrier cell clusters, executing a camera flight directly to the target with meter-level ground imagery.
            </p>

            {/* Feature Highlights */}
            <div className="mt-8 space-y-4">
              <div className="flex items-start gap-3.5 rounded-xl border border-slate-200/80 bg-white p-4 shadow-xs">
                <span className="grid size-9 shrink-0 place-items-center rounded-lg bg-blue-50 text-blue-600">
                  <ZoomIn size={18} />
                </span>
                <div>
                  <h4 className="text-sm font-semibold text-slate-900">2M High-Resolution Satellite Optics</h4>
                  <p className="mt-0.5 text-xs text-slate-600">
                    Zoom down to individual city blocks, streets, and building footprints with real satellite aerial tiles.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3.5 rounded-xl border border-slate-200/80 bg-white p-4 shadow-xs">
                <span className="grid size-9 shrink-0 place-items-center rounded-lg bg-blue-50 text-blue-600">
                  <Compass size={18} />
                </span>
                <div>
                  <h4 className="text-sm font-semibold text-slate-900">Full 3D Orbit Control</h4>
                  <p className="mt-0.5 text-xs text-slate-600">
                    Freely drag with mouse or touch to rotate the globe in 3D. Zoom seamlessly from continental view to regional cluster.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3.5 rounded-xl border border-slate-200/80 bg-white p-4 shadow-xs">
                <span className="grid size-9 shrink-0 place-items-center rounded-lg bg-blue-50 text-blue-600">
                  <Radio size={18} />
                </span>
                <div>
                  <h4 className="text-sm font-semibold text-slate-900">Pulsing Sonar Radar Reticle</h4>
                  <p className="mt-0.5 text-xs text-slate-600">
                    Live target indicator with animated radar ping, crosshairs, and real-time telemetry HUD.
                  </p>
                </div>
              </div>
            </div>

            {/* Test Location Selector Buttons */}
            <div className="mt-8 pt-6 border-t border-slate-200">
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                Test global targets on the 3D Satellite Globe:
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                {DEMO_LOCATIONS.map((loc) => (
                  <button
                    key={loc.name}
                    type="button"
                    onClick={() => setSelectedLoc(loc)}
                    className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium transition cursor-pointer ${
                      selectedLoc.name === loc.name
                        ? "bg-blue-600 text-white shadow-xs font-semibold"
                        : "border border-slate-200 bg-white text-slate-700 hover:bg-blue-50 hover:text-blue-700"
                    }`}
                  >
                    <MapPin size={12} className={selectedLoc.name === loc.name ? "text-white" : "text-blue-600"} />
                    <span>{loc.name}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Interactive 3D Globe & 2M Aerial Viewer */}
          <div>
            <Globe
              target={selectedLoc.coords}
              active={true}
              locationName={`${selectedLoc.city}, ${selectedLoc.country}`}
              hasLicense={true}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
