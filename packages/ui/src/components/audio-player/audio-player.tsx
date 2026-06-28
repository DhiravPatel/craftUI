"use client";

import * as React from "react";
import { cn } from "../../lib/cn";

export interface AudioPlayerProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
  /** Audio file URL. When omitted the component is display-only (controls won't seek). */
  src?: string;
  /** Track title — bold primary label. */
  title: React.ReactNode;
  /** Artist / subtitle line under the title. */
  artist: React.ReactNode;
  /** Album-art image URL. Renders as a 56px square. */
  artwork?: string;
  /** Start playback as soon as the source loads. Default false. */
  autoplay?: boolean;
  /** Show the volume slider on the right. Default true. */
  showVolume?: boolean;
  /** Show prev / next skip buttons. Default true. */
  showSkip?: boolean;
  /** Fires when playback starts (audio `play` event). */
  onPlay?: () => void;
  /** Fires when playback pauses (audio `pause` event). */
  onPause?: () => void;
  /** Fires when the track reaches the end. */
  onEnded?: () => void;
  /** Fires when the user clicks the next button. */
  onNext?: () => void;
  /** Fires when the user clicks the prev button. */
  onPrev?: () => void;
  /** Accent color for the play button, progress fill, focus ring. */
  accentColor?: string;
}

const DEFAULT_ACCENT = "rgb(125, 211, 252)";

function formatTime(seconds: number): string {
  if (!Number.isFinite(seconds) || seconds < 0) return "0:00";
  const total = Math.floor(seconds);
  const m = Math.floor(total / 60);
  const s = total % 60;
  return `${m}:${s.toString().padStart(2, "0")}`;
}

/**
 * AudioPlayer — a compact music / podcast player card with album art, track
 * title and artist, play/pause, prev/next skip, a seek slider with mm:ss
 * labels, and an optional volume slider. A hidden native `<audio>` element
 * does the actual playback when `src` is provided; when it isn't, the
 * component still renders fully (useful for previewing layouts). Wire the
 * skip buttons via `onNext` / `onPrev` to drive a parent playlist.
 */
const AudioPlayer = React.forwardRef<HTMLDivElement, AudioPlayerProps>(
  (
    {
      src,
      title,
      artist,
      artwork,
      autoplay = false,
      showVolume = true,
      showSkip = true,
      onPlay,
      onPause,
      onEnded,
      onNext,
      onPrev,
      accentColor = DEFAULT_ACCENT,
      className,
      style,
      ...props
    },
    ref
  ) => {
    const audioRef = React.useRef<HTMLAudioElement | null>(null);
    const [playing, setPlaying] = React.useState(false);
    const [currentTime, setCurrentTime] = React.useState(0);
    const [duration, setDuration] = React.useState(0);
    const [volume, setVolume] = React.useState(0.8);
    const [muted, setMuted] = React.useState(false);

    // Bind audio events.
    React.useEffect(() => {
      const el = audioRef.current;
      if (!el) return;

      const handleLoaded = () => {
        setDuration(Number.isFinite(el.duration) ? el.duration : 0);
      };
      const handleTime = () => setCurrentTime(el.currentTime);
      const handlePlay = () => {
        setPlaying(true);
        onPlay?.();
      };
      const handlePause = () => {
        setPlaying(false);
        onPause?.();
      };
      const handleEnded = () => {
        setPlaying(false);
        onEnded?.();
      };

      el.addEventListener("loadedmetadata", handleLoaded);
      el.addEventListener("timeupdate", handleTime);
      el.addEventListener("play", handlePlay);
      el.addEventListener("pause", handlePause);
      el.addEventListener("ended", handleEnded);

      // initialize volume on element
      el.volume = volume;
      el.muted = muted;

      return () => {
        el.removeEventListener("loadedmetadata", handleLoaded);
        el.removeEventListener("timeupdate", handleTime);
        el.removeEventListener("play", handlePlay);
        el.removeEventListener("pause", handlePause);
        el.removeEventListener("ended", handleEnded);
      };
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [src, onPlay, onPause, onEnded]);

    // Sync volume / mute changes to the audio element.
    React.useEffect(() => {
      const el = audioRef.current;
      if (!el) return;
      el.volume = volume;
      el.muted = muted;
    }, [volume, muted]);

    // When src changes, reset state.
    React.useEffect(() => {
      setCurrentTime(0);
      setDuration(0);
      setPlaying(false);
    }, [src]);

    const togglePlay = () => {
      const el = audioRef.current;
      if (!el || !src) return;
      if (el.paused) {
        void el.play().catch(() => {
          // Autoplay / user-gesture restrictions — swallow.
        });
      } else {
        el.pause();
      }
    };

    const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
      const next = Number(e.target.value);
      setCurrentTime(next);
      const el = audioRef.current;
      if (el && Number.isFinite(next)) {
        el.currentTime = next;
      }
    };

    const handleVolume = (e: React.ChangeEvent<HTMLInputElement>) => {
      const next = Number(e.target.value);
      setVolume(next);
      if (muted && next > 0) setMuted(false);
    };

    const toggleMute = () => setMuted((m) => !m);

    const safeDuration = duration > 0 ? duration : 0;
    const progressPct =
      safeDuration > 0 ? Math.min(100, (currentTime / safeDuration) * 100) : 0;
    const effectiveVolume = muted ? 0 : volume;
    const volumePct = Math.round(effectiveVolume * 100);

    const sliderStyle = (pct: number): React.CSSProperties => ({
      background: `linear-gradient(to right, ${accentColor} 0%, ${accentColor} ${pct}%, rgba(255,255,255,0.12) ${pct}%, rgba(255,255,255,0.12) 100%)`,
    });

    return (
      <div
        ref={ref}
        className={cn(
          "w-full max-w-md rounded-2xl border border-white/10 bg-neutral-950 p-4 text-white shadow-[0_20px_60px_-20px_rgba(0,0,0,0.6)]",
          className
        )}
        style={style}
        {...props}
      >
        {src ? (
          <audio
            ref={audioRef}
            src={src}
            autoPlay={autoplay}
            preload="metadata"
            className="hidden"
          />
        ) : null}

        {/* Top row: artwork | meta | play */}
        <div className="flex items-center gap-3">
          <div
            className="relative flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-xl"
            style={
              artwork
                ? undefined
                : {
                    background:
                      "linear-gradient(135deg, rgb(125, 211, 252) 0%, rgb(167, 139, 250) 100%)",
                  }
            }
          >
            {artwork ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={artwork}
                alt=""
                className="h-full w-full object-cover"
                draggable={false}
              />
            ) : (
              <svg
                width={22}
                height={22}
                viewBox="0 0 24 24"
                fill="none"
                aria-hidden
                className="text-neutral-950/70"
              >
                <path
                  d="M9 18V6l11-2v12"
                  stroke="currentColor"
                  strokeWidth={1.8}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <circle cx={6} cy={18} r={3} stroke="currentColor" strokeWidth={1.8} />
                <circle cx={17} cy={16} r={3} stroke="currentColor" strokeWidth={1.8} />
              </svg>
            )}
            {playing ? (
              <span
                aria-hidden
                className="pointer-events-none absolute inset-0 ring-1 ring-inset"
                style={{
                  boxShadow: `inset 0 0 0 1px ${accentColor}40, 0 0 16px ${accentColor}30`,
                  borderRadius: 12,
                }}
              />
            ) : null}
          </div>

          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-semibold leading-tight text-white">
              {title}
            </p>
            <p className="mt-0.5 truncate text-xs leading-snug text-white/55">
              {artist}
            </p>
          </div>

          <div className="flex shrink-0 items-center gap-1">
            {showSkip ? (
              <button
                type="button"
                onClick={onPrev}
                aria-label="Previous track"
                className="flex h-8 w-8 items-center justify-center rounded-full text-white/70 transition-colors hover:bg-white/[0.06] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-950"
                style={{ ["--tw-ring-color" as string]: accentColor } as React.CSSProperties}
              >
                <svg width={16} height={16} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                  <path d="M6 5h2v14H6V5zm14 0v14L10 12l10-7z" />
                </svg>
              </button>
            ) : null}

            <button
              type="button"
              onClick={togglePlay}
              aria-label={playing ? "Pause" : "Play"}
              aria-pressed={playing}
              disabled={!src}
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-neutral-950 transition-transform hover:scale-105 active:scale-95 disabled:cursor-not-allowed disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-950"
              style={{
                background: accentColor,
                boxShadow: `0 6px 18px -6px ${accentColor}`,
                ["--tw-ring-color" as string]: accentColor,
              } as React.CSSProperties}
            >
              {playing ? (
                <svg width={14} height={14} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                  <rect x={6} y={5} width={4} height={14} rx={1} />
                  <rect x={14} y={5} width={4} height={14} rx={1} />
                </svg>
              ) : (
                <svg width={14} height={14} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                  <path d="M8 5v14l12-7L8 5z" />
                </svg>
              )}
            </button>

            {showSkip ? (
              <button
                type="button"
                onClick={onNext}
                aria-label="Next track"
                className="flex h-8 w-8 items-center justify-center rounded-full text-white/70 transition-colors hover:bg-white/[0.06] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-950"
                style={{ ["--tw-ring-color" as string]: accentColor } as React.CSSProperties}
              >
                <svg width={16} height={16} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                  <path d="M16 5h2v14h-2V5zM4 5l10 7-10 7V5z" />
                </svg>
              </button>
            ) : null}
          </div>
        </div>

        {/* Progress slider with time labels */}
        <div className="mt-4 flex items-center gap-2">
          <span className="w-10 shrink-0 text-right font-mono text-[10px] tabular-nums text-white/55">
            {formatTime(currentTime)}
          </span>
          <input
            type="range"
            min={0}
            max={safeDuration || 0}
            step={0.01}
            value={Math.min(currentTime, safeDuration || 0)}
            onChange={handleSeek}
            disabled={!src || safeDuration === 0}
            aria-label="Seek"
            className="craftui-audio-player-slider h-1 flex-1 cursor-pointer appearance-none rounded-full bg-white/10 disabled:cursor-not-allowed disabled:opacity-60"
            style={sliderStyle(progressPct)}
          />
          <span className="w-10 shrink-0 font-mono text-[10px] tabular-nums text-white/55">
            {formatTime(safeDuration)}
          </span>
        </div>

        {/* Volume row */}
        {showVolume ? (
          <div className="mt-3 flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={toggleMute}
              aria-label={muted || volume === 0 ? "Unmute" : "Mute"}
              aria-pressed={muted}
              className="flex h-7 w-7 items-center justify-center rounded-md text-white/55 transition-colors hover:bg-white/[0.06] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-950"
              style={{ ["--tw-ring-color" as string]: accentColor } as React.CSSProperties}
            >
              {muted || effectiveVolume === 0 ? (
                <svg width={14} height={14} viewBox="0 0 24 24" fill="none" aria-hidden>
                  <path
                    d="M11 5L6 9H3v6h3l5 4V5z"
                    fill="currentColor"
                  />
                  <path
                    d="M16 9l5 6M21 9l-5 6"
                    stroke="currentColor"
                    strokeWidth={1.6}
                    strokeLinecap="round"
                  />
                </svg>
              ) : effectiveVolume < 0.5 ? (
                <svg width={14} height={14} viewBox="0 0 24 24" fill="none" aria-hidden>
                  <path d="M11 5L6 9H3v6h3l5 4V5z" fill="currentColor" />
                  <path
                    d="M15 9a4 4 0 0 1 0 6"
                    stroke="currentColor"
                    strokeWidth={1.6}
                    strokeLinecap="round"
                  />
                </svg>
              ) : (
                <svg width={14} height={14} viewBox="0 0 24 24" fill="none" aria-hidden>
                  <path d="M11 5L6 9H3v6h3l5 4V5z" fill="currentColor" />
                  <path
                    d="M15 9a4 4 0 0 1 0 6M18 6a8 8 0 0 1 0 12"
                    stroke="currentColor"
                    strokeWidth={1.6}
                    strokeLinecap="round"
                  />
                </svg>
              )}
            </button>
            <input
              type="range"
              min={0}
              max={1}
              step={0.01}
              value={effectiveVolume}
              onChange={handleVolume}
              aria-label="Volume"
              aria-valuetext={`${volumePct} percent`}
              className="craftui-audio-player-slider h-1 w-24 cursor-pointer appearance-none rounded-full bg-white/10"
              style={sliderStyle(volumePct)}
            />
          </div>
        ) : null}

        <style>{`
          .craftui-audio-player-slider::-webkit-slider-thumb {
            -webkit-appearance: none;
            appearance: none;
            width: 12px;
            height: 12px;
            border-radius: 9999px;
            background: #fff;
            box-shadow: 0 0 0 1px rgba(0,0,0,0.25), 0 2px 6px rgba(0,0,0,0.3);
            cursor: pointer;
            border: 0;
            transition: transform 120ms ease-out;
          }
          .craftui-audio-player-slider::-webkit-slider-thumb:hover {
            transform: scale(1.15);
          }
          .craftui-audio-player-slider:disabled::-webkit-slider-thumb {
            background: rgba(255,255,255,0.5);
            cursor: not-allowed;
          }
          .craftui-audio-player-slider::-moz-range-thumb {
            width: 12px;
            height: 12px;
            border-radius: 9999px;
            background: #fff;
            box-shadow: 0 0 0 1px rgba(0,0,0,0.25), 0 2px 6px rgba(0,0,0,0.3);
            cursor: pointer;
            border: 0;
          }
          .craftui-audio-player-slider::-moz-range-track {
            background: transparent;
          }
          .craftui-audio-player-slider:focus-visible {
            outline: none;
            box-shadow: 0 0 0 2px rgba(10,10,10,1), 0 0 0 4px ${accentColor};
          }
        `}</style>
      </div>
    );
  }
);
AudioPlayer.displayName = "AudioPlayer";

export { AudioPlayer };
