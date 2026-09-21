"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import {
  Compass,
  Crosshair,
  Layers,
  LockKeyhole,
  Minus,
  Pause,
  Play,
  Plus,
  Radio,
  Satellite,
  Sparkles,
  ZoomIn,
} from "lucide-react";

function latLngToVector3([lng, lat]: [number, number], radius = 1.6) {
  const phi = THREE.MathUtils.degToRad(90 - lat);
  const theta = THREE.MathUtils.degToRad(lng + 180);
  return new THREE.Vector3(
    -(radius * Math.sin(phi) * Math.cos(theta)),
    radius * Math.cos(phi),
    radius * Math.sin(phi) * Math.sin(theta)
  );
}

// Convert coordinates to Web Mercator tile index
function latLngToTile(lat: number, lng: number, zoom: number) {
  const n = Math.pow(2, zoom);
  const x = Math.floor(((lng + 180) / 360) * n);
  const latRad = (lat * Math.PI) / 180;
  const y = Math.floor(((1 - Math.log(Math.tan(latRad) + 1 / Math.cos(latRad)) / Math.PI) / 2) * n);
  return { x, y };
}

export default function Globe({
  target,
  active = false,
  locationName,
  hasLicense = false,
  onUnlock,
}: {
  target?: [number, number];
  active?: boolean;
  locationName?: string;
  hasLicense?: boolean;
  onUnlock?: () => void;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const controlsRef = useRef<OrbitControls | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const autoRotateRef = useRef(true);
  const [isAutoRotating, setIsAutoRotating] = useState(true);
  const [zoomLevel, setZoomLevel] = useState<number>(65);
  const [webGlSupported, setWebGlSupported] = useState(true);
  const [touchOrbitActive, setTouchOrbitActive] = useState(false);

  // View mode: "3d-orbit" (Three.js globe) or "satellite-2m" (High-Res Aerial Imagery)
  const [viewMode, setViewMode] = useState<"3d-orbit" | "satellite-2m">("3d-orbit");
  const [satelliteZoom, setSatelliteZoom] = useState<number>(16); // 14 to 18

  // Communication refs
  const updateTargetRef = useRef<((coords: [number, number], fly: boolean) => void) | null>(null);
  const focusOnTargetRef = useRef<(() => void) | null>(null);

  const activeCoords: [number, number] = target || [13.405, 52.52];
  const lng = activeCoords[0];
  const lat = activeCoords[1];

  const formattedLat = `${Math.abs(lat).toFixed(4)}° ${lat >= 0 ? "N" : "S"}`;
  const formattedLng = `${Math.abs(lng).toFixed(4)}° ${lng >= 0 ? "E" : "W"}`;

  // Initialize Three.js 3D Globe
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    try {
      const testCanvas = document.createElement("canvas");
      const gl = testCanvas.getContext("webgl") || testCanvas.getContext("experimental-webgl");
      if (!gl) {
        setWebGlSupported(false);
        return;
      }
    } catch {
      setWebGlSupported(false);
      return;
    }

    const width = container.clientWidth || 500;
    const height = container.clientHeight || 340;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 1000);
    camera.position.set(0, 0.8, 5.0);
    cameraRef.current = camera;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: "high-performance" });
    } catch {
      setWebGlSupported(false);
      return;
    }

    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    container.innerHTML = "";
    container.appendChild(renderer.domElement);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.06;
    controls.rotateSpeed = 0.65;
    controls.zoomSpeed = 0.8;
    controls.minDistance = 2.1;
    controls.maxDistance = 8.0;
    controls.autoRotate = autoRotateRef.current;
    controls.autoRotateSpeed = 0.6;
    controlsRef.current = controls;

    // Mobile scroll-trap fix:
    // By default on touch devices, single-finger swipes scroll the webpage without getting trapped.
    // Two fingers can still pinch/rotate in 3D anytime.
    controls.touches = {
      ONE: -1 as unknown as THREE.TOUCH,
      TWO: THREE.TOUCH.DOLLY_PAN,
    };
    renderer.domElement.style.touchAction = "pan-y";

    const updateZoomHUD = () => {
      const dist = camera.position.distanceTo(controls.target);
      const zoomPct = Math.round(((8.0 - dist) / (8.0 - 2.1)) * 100);
      setZoomLevel(Math.max(10, Math.min(100, zoomPct)));
    };
    controls.addEventListener("change", updateZoomHUD);

    // Lights
    scene.add(new THREE.AmbientLight(0xffffff, 1.4));
    const sunLight = new THREE.DirectionalLight(0xffffff, 2.5);
    sunLight.position.set(5, 3, 5);
    scene.add(sunLight);

    const fillLight = new THREE.DirectionalLight(0x93c5fd, 0.9);
    fillLight.position.set(-5, -2, -4);
    scene.add(fillLight);

    const earthGroup = new THREE.Group();
    scene.add(earthGroup);

    // Earth Sphere
    const earthGeo = new THREE.SphereGeometry(1.6, 64, 64);
    const earthMat = new THREE.MeshStandardMaterial({
      color: 0x1d4ed8,
      roughness: 0.65,
      metalness: 0.1,
    });
    const earthMesh = new THREE.Mesh(earthGeo, earthMat);
    earthGroup.add(earthMesh);

    const textureLoader = new THREE.TextureLoader();
    textureLoader.load(
      "/textures/earth-satellite.jpg",
      (texture) => {
        texture.colorSpace = THREE.SRGBColorSpace;
        texture.anisotropy = 8;
        earthMat.color.set(0xffffff);
        earthMat.map = texture;
        earthMat.needsUpdate = true;
      },
      undefined,
      (err) => {
        console.warn("Using fallback sphere color for earth:", err);
      }
    );

    // Clouds
    const cloudGeo = new THREE.SphereGeometry(1.615, 64, 64);
    const cloudMat = new THREE.MeshStandardMaterial({
      transparent: true,
      opacity: 0.35,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const cloudMesh = new THREE.Mesh(cloudGeo, cloudMat);
    earthGroup.add(cloudMesh);

    textureLoader.load(
      "/textures/earth-clouds.png",
      (texture) => {
        texture.colorSpace = THREE.SRGBColorSpace;
        cloudMat.map = texture;
        cloudMat.needsUpdate = true;
      },
      undefined,
      () => {
        cloudMesh.visible = false;
      }
    );

    // Atmosphere
    const atmosphereGeo = new THREE.SphereGeometry(1.64, 64, 64);
    const atmosphereMat = new THREE.MeshBasicMaterial({
      color: 0x60a5fa,
      transparent: true,
      opacity: 0.12,
      side: THREE.BackSide,
    });
    scene.add(new THREE.Mesh(atmosphereGeo, atmosphereMat));

    // Starfield
    const starCount = 350;
    const starPositions = new Float32Array(starCount * 3);
    for (let i = 0; i < starCount * 3; i += 3) {
      starPositions[i] = (Math.random() - 0.5) * 60;
      starPositions[i + 1] = (Math.random() - 0.5) * 60;
      starPositions[i + 2] = (Math.random() - 0.5) * 60;
    }
    const starGeo = new THREE.BufferGeometry();
    starGeo.setAttribute("position", new THREE.BufferAttribute(starPositions, 3));
    const starMat = new THREE.PointsMaterial({
      color: 0x94a3b8,
      size: 0.4,
      transparent: true,
      opacity: 0.45,
    });
    scene.add(new THREE.Points(starGeo, starMat));

    // Target Pin
    const markerGroup = new THREE.Group();
    earthGroup.add(markerGroup);
    let radarRings: THREE.Mesh[] = [];

    function updateMarker(coords: [number, number]) {
      markerGroup.clear();
      radarRings = [];

      const markerPos = latLngToVector3(coords, 1.602);
      const normal = markerPos.clone().normalize();

      const baseMesh = new THREE.Mesh(
        new THREE.SphereGeometry(0.032, 16, 16),
        new THREE.MeshStandardMaterial({
          color: 0xef4444,
          emissive: 0xef4444,
          emissiveIntensity: 0.8,
          roughness: 0.2,
        })
      );
      baseMesh.position.copy(markerPos);
      markerGroup.add(baseMesh);

      const stemHeight = 0.18;
      const stemMesh = new THREE.Mesh(
        new THREE.CylinderGeometry(0.006, 0.006, stemHeight, 8),
        new THREE.MeshBasicMaterial({ color: 0xffffff })
      );
      stemMesh.position.copy(markerPos.clone().add(normal.clone().multiplyScalar(stemHeight / 2)));
      stemMesh.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), normal);
      markerGroup.add(stemMesh);

      const headMesh = new THREE.Mesh(
        new THREE.SphereGeometry(0.042, 16, 16),
        new THREE.MeshStandardMaterial({
          color: 0xef4444,
          emissive: 0xff0000,
          emissiveIntensity: 1.2,
          roughness: 0.1,
        })
      );
      headMesh.position.copy(markerPos.clone().add(normal.clone().multiplyScalar(stemHeight)));
      markerGroup.add(headMesh);

      for (let i = 0; i < 2; i++) {
        const ringMesh = new THREE.Mesh(
          new THREE.RingGeometry(0.04, 0.07, 32),
          new THREE.MeshBasicMaterial({
            color: 0x38bdf8,
            transparent: true,
            opacity: 0.8,
            side: THREE.DoubleSide,
            depthWrite: false,
          })
        );
        ringMesh.position.copy(markerPos.clone().add(normal.clone().multiplyScalar(0.004)));
        ringMesh.quaternion.setFromUnitVectors(new THREE.Vector3(0, 0, 1), normal);
        (ringMesh as any).userData = { phase: i * 0.5 };
        markerGroup.add(ringMesh);
        radarRings.push(ringMesh);
      }
    }

    let isTransitioning = false;
    let transitionProgress = 0;
    const startCamPos = new THREE.Vector3();
    const targetCamPos = new THREE.Vector3();

    function flyToTarget(coords: [number, number], distance = 3.3) {
      const targetPos = latLngToVector3(coords, distance);
      startCamPos.copy(camera.position);
      targetCamPos.copy(targetPos);
      transitionProgress = 0;
      isTransitioning = true;
      controls.autoRotate = false;
      autoRotateRef.current = false;
      setIsAutoRotating(false);
    }

    updateTargetRef.current = (coords: [number, number], fly: boolean) => {
      updateMarker(coords);
      if (fly) flyToTarget(coords, 3.2);
    };

    focusOnTargetRef.current = () => {
      const coords = target || [13.405, 52.52];
      flyToTarget(coords, 3.2);
    };

    updateMarker(activeCoords);
    if (active && target) {
      flyToTarget(target, 3.2);
    }

    let animationFrameId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const delta = clock.getDelta();
      const elapsed = clock.getElapsedTime();

      cloudMesh.rotation.y += delta * 0.035;

      radarRings.forEach((ring) => {
        const ringData = (ring as any).userData;
        const cycle = (elapsed * 0.9 + ringData.phase) % 1;
        const scale = 1.0 + cycle * 3.5;
        ring.scale.set(scale, scale, scale);
        const mat = ring.material as THREE.MeshBasicMaterial;
        mat.opacity = Math.max(0, (1 - cycle) * 0.85);
      });

      if (isTransitioning) {
        transitionProgress += delta * 1.5;
        if (transitionProgress >= 1) {
          transitionProgress = 1;
          isTransitioning = false;
        }
        const t =
          transitionProgress < 0.5
            ? 4 * transitionProgress * transitionProgress * transitionProgress
            : 1 - Math.pow(-2 * transitionProgress + 2, 3) / 2;

        camera.position.lerpVectors(startCamPos, targetCamPos, t);
        controls.target.set(0, 0, 0);
      }

      controls.update();
      renderer.render(scene, camera);
    };

    animate();

    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const newWidth = entry.contentRect.width;
        const newHeight = entry.contentRect.height;
        if (newWidth > 0 && newHeight > 0) {
          camera.aspect = newWidth / newHeight;
          camera.updateProjectionMatrix();
          renderer.setSize(newWidth, newHeight);
        }
      }
    });
    resizeObserver.observe(container);

    return () => {
      cancelAnimationFrame(animationFrameId);
      resizeObserver.disconnect();
      controls.removeEventListener("change", updateZoomHUD);
      renderer.dispose();
      controls.dispose();
      earthGeo.dispose();
      earthMat.dispose();
      cloudGeo.dispose();
      cloudMat.dispose();
      atmosphereGeo.dispose();
      atmosphereMat.dispose();
      starGeo.dispose();
      starMat.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      updateTargetRef.current = null;
      focusOnTargetRef.current = null;
    };
  }, []);

  // Update touch interaction mode when user taps mobile toggle
  useEffect(() => {
    if (!controlsRef.current || !containerRef.current) return;
    const canvas = containerRef.current.querySelector("canvas");
    if (touchOrbitActive) {
      controlsRef.current.touches = {
        ONE: THREE.TOUCH.ROTATE,
        TWO: THREE.TOUCH.DOLLY_PAN,
      };
      if (canvas) canvas.style.touchAction = "none";
    } else {
      controlsRef.current.touches = {
        ONE: -1 as unknown as THREE.TOUCH,
        TWO: THREE.TOUCH.DOLLY_PAN,
      };
      if (canvas) canvas.style.touchAction = "pan-y";
    }
  }, [touchOrbitActive]);

  // Update target when props change
  useEffect(() => {
    if (updateTargetRef.current && target) {
      updateTargetRef.current(target, Boolean(active));
    }
  }, [target, active]);

  // Compute 3x3 high-resolution satellite tiles for the current lat/lng
  const centerTile = latLngToTile(lat, lng, satelliteZoom);
  const tileOffsets = [
    { dx: -1, dy: -1 }, { dx: 0, dy: -1 }, { dx: 1, dy: -1 },
    { dx: -1, dy: 0 },  { dx: 0, dy: 0 },  { dx: 1, dy: 0 },
    { dx: -1, dy: 1 },  { dx: 0, dy: 1 },  { dx: 1, dy: 1 },
  ];
  const satelliteTiles = tileOffsets.map(({ dx, dy }) => {
    const x = centerTile.x + dx;
    const y = centerTile.y + dy;
    return `https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/${satelliteZoom}/${y}/${x}.jpg`;
  });

  // Toolbar handlers for 3D Globe
  const handleZoomIn = () => {
    if (viewMode === "satellite-2m") {
      setSatelliteZoom((z) => Math.min(18, z + 1));
      return;
    }
    if (!cameraRef.current || !controlsRef.current) return;
    const camera = cameraRef.current;
    const controls = controlsRef.current;
    const dir = new THREE.Vector3().subVectors(controls.target, camera.position).normalize();
    const newPos = camera.position.clone().add(dir.multiplyScalar(0.7));
    if (newPos.distanceTo(controls.target) >= 2.1) {
      camera.position.copy(newPos);
    }
  };

  const handleZoomOut = () => {
    if (viewMode === "satellite-2m") {
      setSatelliteZoom((z) => Math.max(13, z - 1));
      return;
    }
    if (!cameraRef.current || !controlsRef.current) return;
    const camera = cameraRef.current;
    const controls = controlsRef.current;
    const dir = new THREE.Vector3().subVectors(camera.position, controls.target).normalize();
    const newPos = camera.position.clone().add(dir.multiplyScalar(0.7));
    if (newPos.distanceTo(controls.target) <= 8.0) {
      camera.position.copy(newPos);
    }
  };

  const handleToggleAutoRotate = () => {
    if (!controlsRef.current) return;
    const nextState = !isAutoRotating;
    controlsRef.current.autoRotate = nextState;
    autoRotateRef.current = nextState;
    setIsAutoRotating(nextState);
  };

  const handleFocus = () => {
    if (focusOnTargetRef.current) {
      focusOnTargetRef.current();
    }
  };

  if (!webGlSupported) {
    return (
      <div className="relative flex h-[440px] w-full flex-col items-center justify-center rounded-2xl border border-slate-200 bg-slate-900 p-6 text-center text-white shadow-card">
        <Satellite size={36} className="text-blue-400" />
        <h4 className="mt-3 text-base font-bold">Satellite Location Stream</h4>
        <p className="mt-1 font-mono text-xs text-blue-300">
          {formattedLat}, {formattedLng}
        </p>
        <p className="mt-2 max-w-xs text-xs text-slate-400">
          WebGL is currently disabled in your browser. Geolocation coordinates remain fully accessible.
        </p>
      </div>
    );
  }

  return (
    <div className="relative overflow-hidden rounded-2xl border border-slate-200/90 bg-slate-950 shadow-card">
      {/* Top HUD Header */}
      <div className="absolute left-0 right-0 top-0 z-20 flex items-center justify-between border-b border-white/10 bg-slate-950/80 px-4 py-2.5 text-xs text-white backdrop-blur-md">
        <div className="flex items-center gap-2">
          <span className="flex size-2">
            <span className="inline-flex size-2 animate-ping rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex size-2 rounded-full bg-emerald-500" />
          </span>
          <span className="font-semibold uppercase tracking-wider text-slate-200 flex items-center gap-1.5">
            <Satellite size={14} className="text-blue-400" />
            {viewMode === "satellite-2m" ? "High-Res 2M Satellite Aerial" : "3D Orbital Satellite Feed"}
          </span>
        </div>

        {/* View Mode Toggle Switch */}
        <div className="flex items-center gap-1 rounded-full bg-white/10 p-0.5 text-[11px] font-medium">
          <button
            type="button"
            onClick={() => setViewMode("3d-orbit")}
            className={`rounded-full px-2.5 py-0.5 transition ${
              viewMode === "3d-orbit"
                ? "bg-blue-600 text-white font-semibold shadow-xs"
                : "text-slate-300 hover:text-white"
            }`}
          >
            3D Globe
          </button>
          <button
            type="button"
            onClick={() => setViewMode("satellite-2m")}
            className={`rounded-full px-2.5 py-0.5 transition flex items-center gap-1 ${
              viewMode === "satellite-2m"
                ? "bg-blue-600 text-white font-semibold shadow-xs"
                : "text-slate-300 hover:text-white"
            }`}
          >
            <Sparkles size={11} className="text-amber-300" />
            2M Aerial
          </button>
        </div>

        <div className="hidden sm:flex items-center gap-3 text-slate-300">
          <span className="rounded bg-white/10 px-2 py-0.5 font-mono text-[11px] text-blue-300">
            {formattedLat}, {formattedLng}
          </span>
          <span className="text-slate-400 font-mono text-[11px]">
            {viewMode === "satellite-2m"
              ? `Optics: ${(2.1 / Math.pow(1.3, satelliteZoom - 16)).toFixed(1)}m/px`
              : `Zoom: ${zoomLevel}%`}
          </span>
        </div>
      </div>

      {/* Mobile Touch Orbit / Page Scroll Indicator & Switch */}
      {viewMode === "3d-orbit" && (
        <div className="absolute top-12 left-1/2 -translate-x-1/2 z-20 md:hidden">
          <button
            type="button"
            onClick={() => setTouchOrbitActive((v) => !v)}
            className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[11px] font-semibold shadow-lg transition backdrop-blur-md cursor-pointer ${
              touchOrbitActive
                ? "bg-emerald-600 text-white border border-emerald-400/50 ring-2 ring-emerald-500/30"
                : "bg-slate-900/85 text-blue-300 border border-white/20 hover:bg-slate-900"
            }`}
          >
            {touchOrbitActive ? (
              <span>✓ 3D Orbit Active (Tap for Scroll)</span>
            ) : (
              <span>🖐️ Tap to Orbit 3D (Scroll Safe)</span>
            )}
          </button>
        </div>
      )}

      {/* VIEW 1: 3D Three.js Orbital Globe */}
      <div
        ref={containerRef}
        className={`h-[320px] sm:h-[440px] w-full cursor-grab active:cursor-grabbing transition-opacity duration-300 ${
          viewMode === "3d-orbit" ? "opacity-100 relative" : "opacity-0 pointer-events-none absolute inset-0"
        }`}
        title="Drag with mouse to rotate, scroll to zoom"
      />

      {/* VIEW 2: High-Resolution Satellite Aerial View (Accurate to 2M) */}
      {viewMode === "satellite-2m" && (
        <div className="relative h-[320px] sm:h-[440px] w-full overflow-hidden bg-slate-900 select-none">
          {/* 3x3 Tile Satellite Grid */}
          <div
            className={`grid grid-cols-3 grid-rows-3 h-full w-full object-cover scale-110 transition-all duration-500 ${
              !hasLicense ? "filter blur-[7px] brightness-90 saturate-150" : ""
            }`}
          >
            {satelliteTiles.map((tileUrl, i) => (
              <img
                key={tileUrl}
                src={tileUrl}
                alt={`Satellite tile ${i + 1}`}
                className="w-full h-full object-cover select-none pointer-events-none"
                loading="eager"
              />
            ))}
          </div>

          {/* Grid Reticle & HUD Lines */}
          <div className="pointer-events-none absolute inset-0 z-10">
            {/* Center Crosshairs */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
              <div className="relative size-20 sm:size-24">
                {/* Outer animated target ring */}
                <div className="absolute inset-0 rounded-full border border-emerald-400/60 animate-ping opacity-50" />
                <div className="absolute inset-2 rounded-full border border-dashed border-emerald-400/80 animate-spin" />
                <div className="absolute inset-5 sm:inset-6 rounded-full border-2 border-emerald-400/90" />
                {/* Center cross dot */}
                <div className="absolute left-1/2 top-1/2 size-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-emerald-400 shadow-md shadow-emerald-500/50" />
                {/* Cross lines */}
                <div className="absolute left-0 top-1/2 h-[1px] w-5 sm:w-6 -translate-y-1/2 bg-emerald-400" />
                <div className="absolute right-0 top-1/2 h-[1px] w-5 sm:w-6 -translate-y-1/2 bg-emerald-400" />
                <div className="absolute left-1/2 top-0 h-5 sm:h-6 w-[1px] -translate-x-1/2 bg-emerald-400" />
                <div className="absolute left-1/2 bottom-0 h-5 sm:h-6 w-[1px] -translate-x-1/2 bg-emerald-400" />
              </div>
            </div>

            {/* Top / Bottom Radar Scanline Bar */}
            <div className="absolute inset-x-0 top-1/4 h-[2px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-60 animate-pulse" />
          </div>

          {/* PAYWALL BLUR OVERLAY (When unpaid) */}
          {!hasLicense && (
            <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-slate-950/40 p-3 sm:p-6 text-center backdrop-blur-[2px]">
              <div className="max-w-sm w-full rounded-2xl border border-white/20 bg-slate-900/95 p-4 sm:p-6 shadow-2xl backdrop-blur-xl">
                <div className="mx-auto grid size-10 sm:size-12 place-items-center rounded-2xl bg-blue-600/20 text-blue-400 ring-1 ring-blue-500/30">
                  <LockKeyhole size={20} className="sm:size-6" />
                </div>
                <h4 className="mt-2.5 text-base sm:text-lg font-bold text-white">2M Satellite View Masked</h4>
                <p className="mt-1 text-[11px] sm:text-xs leading-4 sm:leading-5 text-slate-300">
                  Carrier cell triangulation matched to a <strong className="text-emerald-400">2.1-meter radius</strong>.
                  Individual building footprint and unmasked satellite photography are locked.
                </p>

                <div className="mt-2.5 flex items-center justify-center gap-1.5 font-mono text-[10px] sm:text-[11px] text-blue-300 bg-white/5 py-1 px-2.5 rounded-lg border border-white/10">
                  <Radio size={11} className="animate-pulse text-emerald-400" />
                  <span>
                    Lat: {formattedLat.slice(0, 6)}*** · Lng: {formattedLng.slice(0, 6)}***
                  </span>
                </div>

                <button
                  type="button"
                  onClick={onUnlock}
                  className="mt-3 sm:mt-4 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 py-2 sm:py-2.5 px-3 text-[11px] sm:text-xs font-semibold text-white shadow-lg transition hover:bg-blue-500 cursor-pointer"
                >
                  <Sparkles size={13} />
                  <span>Unlock Full 2M Imagery & Dossier ($9.99)</span>
                </button>
                <p className="mt-1.5 text-[9px] sm:text-[10px] text-slate-400">One-time payment · Instant access · No recurring fees</p>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Floating Target Pin HUD badge */}
      <div className="pointer-events-none absolute bottom-3 left-3 z-20 rounded-xl border border-white/15 bg-slate-900/85 p-2 sm:p-3 text-white shadow-xl backdrop-blur-md max-w-[150px] sm:max-w-[240px]">
        <div className="flex items-center gap-1 text-[10px] sm:text-[11px] font-semibold uppercase tracking-wider text-emerald-400">
          <Crosshair size={11} />
          <span className="truncate">{active ? "Target (2M)" : "Anchor"}</span>
        </div>
        <p className="mt-0.5 text-xs sm:text-sm font-semibold truncate text-white">
          {locationName || (target ? "Triangulated Sector" : "Berlin, Germany")}
        </p>
        <p className="font-mono text-[10px] sm:text-[11px] text-slate-300 truncate">
          {formattedLat} · {formattedLng}
        </p>
      </div>

      {/* Interactive Controls Toolbar */}
      <div className="absolute bottom-3 right-3 z-20 flex flex-col gap-1 rounded-xl border border-white/15 bg-slate-900/85 p-1 sm:p-1.5 shadow-xl backdrop-blur-md">
        {viewMode === "3d-orbit" ? (
          <>
            <button
              type="button"
              onClick={() => setViewMode("satellite-2m")}
              title="Switch to 2M High-Resolution Aerial View"
              aria-label="Switch to 2M High-Resolution Aerial View"
              className="grid size-8 place-items-center rounded-lg text-amber-300 transition hover:bg-white/15 hover:text-white"
            >
              <ZoomIn size={17} />
            </button>
            <button
              type="button"
              onClick={handleFocus}
              title="Focus on target coordinate"
              aria-label="Focus on target coordinate"
              className="grid size-8 place-items-center rounded-lg text-slate-200 transition hover:bg-white/15 hover:text-white"
            >
              <Compass size={17} className="text-blue-400" />
            </button>
            <button
              type="button"
              onClick={handleZoomIn}
              title="Zoom in"
              aria-label="Zoom in"
              className="grid size-8 place-items-center rounded-lg text-slate-200 transition hover:bg-white/15 hover:text-white"
            >
              <Plus size={17} />
            </button>
            <button
              type="button"
              onClick={handleZoomOut}
              title="Zoom out"
              aria-label="Zoom out"
              className="grid size-8 place-items-center rounded-lg text-slate-200 transition hover:bg-white/15 hover:text-white"
            >
              <Minus size={17} />
            </button>
            <button
              type="button"
              onClick={handleToggleAutoRotate}
              title={isAutoRotating ? "Pause rotation" : "Start auto-rotation"}
              aria-label={isAutoRotating ? "Pause rotation" : "Start auto-rotation"}
              className="grid size-8 place-items-center rounded-lg text-slate-200 transition hover:bg-white/15 hover:text-white"
            >
              {isAutoRotating ? <Pause size={15} /> : <Play size={15} />}
            </button>
          </>
        ) : (
          <>
            <button
              type="button"
              onClick={() => setViewMode("3d-orbit")}
              title="Switch back to 3D Globe"
              aria-label="Switch back to 3D Globe"
              className="grid size-8 place-items-center rounded-lg text-blue-400 transition hover:bg-white/15 hover:text-white"
            >
              <Layers size={17} />
            </button>
            <button
              type="button"
              onClick={handleZoomIn}
              disabled={satelliteZoom >= 18}
              title="Zoom In (Meter level)"
              aria-label="Zoom in"
              className="grid size-8 place-items-center rounded-lg text-slate-200 transition hover:bg-white/15 hover:text-white disabled:opacity-40"
            >
              <Plus size={17} />
            </button>
            <button
              type="button"
              onClick={handleZoomOut}
              disabled={satelliteZoom <= 13}
              title="Zoom Out"
              aria-label="Zoom out"
              className="grid size-8 place-items-center rounded-lg text-slate-200 transition hover:bg-white/15 hover:text-white disabled:opacity-40"
            >
              <Minus size={17} />
            </button>
          </>
        )}
      </div>

      {/* Bottom Hint */}
      <div className="pointer-events-none absolute bottom-1 left-1/2 -translate-x-1/2 z-20 text-[10px] text-slate-400/80 font-medium hidden md:block">
        {viewMode === "3d-orbit"
          ? "3D Interactive: Drag to rotate · Scroll to zoom · Toggle 2M Aerial Optics above"
          : "2M Aerial Optics: Use +/- to zoom down to individual buildings and streets"}
      </div>
    </div>
  );
}
