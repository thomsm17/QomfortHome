import { useEffect, useRef, useState } from 'react';

type HeroVideoProps = {
  src: string;
  poster: string;
};

export default function HeroVideo({ src, poster }: HeroVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Set the DOM properties too: mobile Safari must see a muted, inline
    // video before the first play attempt.
    video.defaultMuted = true;
    video.muted = true;
    video.playsInline = true;

    const tryPlaying = () => {
      if (document.hidden || !video.paused) return;
      // Autoplay is not guaranteed (for example in low-power mode).
      // Keep the separate poster visible if the browser refuses playback.
      void video.play().catch(() => {});
    };

    video.addEventListener('canplay', tryPlaying);
    document.addEventListener('visibilitychange', tryPlaying);
    document.addEventListener('pointerdown', tryPlaying, { passive: true });
    document.addEventListener('touchend', tryPlaying, { passive: true });
    document.addEventListener('keydown', tryPlaying);
    window.addEventListener('pageshow', tryPlaying);
    tryPlaying();

    return () => {
      video.removeEventListener('canplay', tryPlaying);
      document.removeEventListener('visibilitychange', tryPlaying);
      document.removeEventListener('pointerdown', tryPlaying);
      document.removeEventListener('touchend', tryPlaying);
      document.removeEventListener('keydown', tryPlaying);
      window.removeEventListener('pageshow', tryPlaying);
    };
  }, [src]);

  return (
    <video
      ref={videoRef}
      className="hero-background-video absolute inset-0 -z-10 h-full w-full object-cover"
      style={{ opacity: playing ? 1 : 0 }}
      src={src}
      poster={poster}
      autoPlay
      muted
      loop
      playsInline
      controls={false}
      disablePictureInPicture
      disableRemotePlayback
      preload="auto"
      aria-hidden="true"
      tabIndex={-1}
      onPlaying={() => setPlaying(true)}
      onPause={() => setPlaying(false)}
      onError={() => setPlaying(false)}
    />
  );
}
