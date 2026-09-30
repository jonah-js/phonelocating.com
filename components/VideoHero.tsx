"use client";

import { useEffect, useRef, useState } from "react";
import { Play, RotateCcw, Satellite } from "lucide-react";

export default function VideoHero() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [hasEnded, setHasEnded] = useState(false);
  const [missing, setMissing] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const playPromise = video.play();
    playPromise?.catch(() => {
      setIsPlaying(false);
    });
  }, []);

  const handleTogglePlay = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      video.play();
      setIsPlaying(true);
      setHasEnded(false);
    } else {
      video.pause();
      setIsPlaying(false);
    }
  };

  const handleRestart = () => {
    const video = videoRef.current;
    if (!video) return;
    video.currentTime = 0;
    video.play();
    setIsPlaying(true);
    setHasEnded(false);
  };

  return (
    <div className="relative overflow-hidden rounded-2xl border border-slate-200 bg-slate-950 shadow-card">
      {/* Telemetry Header */}
      <div className="absolute left-0 right-0 top-0 z-10 flex items-center justify-between border-b border-white/10 bg-slate-950/75 px-4 py-2 text-xs text-white backdrop-blur-md">
        <div className="flex items-center gap-2">
          <span className="flex size-2">
            <span className="inline-flex size-2 animate-ping rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex size-2 rounded-full bg-emerald-500" />
          </span>
          <span className="font-semibold uppercase tracking-wider text-slate-200 flex items-center gap-1.5">
            <Satellite size={13} className="text-blue-400" />
            Satellite Zoom Flyover
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[11px] text-slate-300">Orbital Earth Engine</span>
        </div>
      </div>

      {missing ? (
        <div className="grid aspect-video place-items-center bg-slate-950 px-8 text-center text-sm text-slate-300">
          Satellite feed video not found at /public/videos/google-earth.mp4.
        </div>
      ) : (
        <div className="relative aspect-video w-full bg-slate-950">
          <video
            ref={videoRef}
            poster="/videos/google-earth-poster.webp"
            autoPlay
            muted
            loop
            playsInline
            controls={false}
            preload="auto"
            aria-label="Satellite zoom-in flyover for phone number intelligence"
            onEnded={() => {
              setHasEnded(true);
              setIsPlaying(false);
            }}
            onError={() => setMissing(true)}
            className="size-full object-cover"
          >
            <source src="/videos/google-earth.webm" type="video/webm" />
            <source src="/videos/google-earth.mp4" type="video/mp4" />
          </video>

          {/* Bottom Floating Controls */}
          <div className="absolute bottom-3 right-3 z-10 flex items-center gap-1.5 rounded-lg border border-white/15 bg-slate-900/80 p-1 backdrop-blur-md">
            <button
              type="button"
              onClick={handleRestart}
              title="Restart Video"
              aria-label="Restart Video"
              className="grid size-7 place-items-center rounded-md text-slate-200 transition hover:bg-white/15 hover:text-white cursor-pointer"
            >
              <RotateCcw size={14} />
            </button>
            <button
              type="button"
              onClick={handleTogglePlay}
              title={isPlaying ? "Pause" : "Play"}
              aria-label={isPlaying ? "Pause" : "Play"}
              className="grid size-7 place-items-center rounded-md text-slate-200 transition hover:bg-white/15 hover:text-white cursor-pointer"
            >
              <Play size={14} className={isPlaying ? "opacity-60" : "text-emerald-400"} />
            </button>
          </div>
        </div>
      )}

      {/* Bottom Info Bar */}
      <div className="flex items-center justify-between border-t border-white/10 bg-slate-950/80 px-4 py-2 text-[11px] text-slate-400">
        <span>High-resolution orbital zoom descent</span>
        <span className="text-blue-400 font-medium">Interactive 3D Globe & 2M Optics below ↓</span>
      </div>
    </div>
  );
}
