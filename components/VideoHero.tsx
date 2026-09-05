"use client";

import { useEffect, useRef, useState } from "react";

export default function VideoHero() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [played, setPlayed] = useState(false);
  const [missing, setMissing] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || played) return;
    const playPromise = video.play();
    playPromise?.catch(() => undefined);
  }, [played]);

  return (
    <div className="glass overflow-hidden rounded-lg">
      {missing ? (
        <div className="grid aspect-video place-items-center bg-slate-950 px-8 text-center text-sm text-slate-300">
          Add the Google Earth video at /public/videos/google-earth.mp4
        </div>
      ) : (
        <video
          ref={videoRef}
          src="/videos/google-earth.mp4"
          autoPlay={!played}
          muted
          playsInline
          loop={false}
          controls={false}
          preload="metadata"
          aria-label="Animated satellite flyover for phone intelligence"
          onEnded={(event) => {
            event.currentTarget.pause();
            setPlayed(true);
          }}
          onError={() => setMissing(true)}
          className="aspect-video w-full bg-slate-950 object-cover"
        />
      )}
    </div>
  );
}
