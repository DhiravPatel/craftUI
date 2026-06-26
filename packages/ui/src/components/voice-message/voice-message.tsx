"use client";

import * as React from "react";
import { cn } from "../../lib/cn";

export interface VoiceMessageProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
  /** Audio source URL. Required for actual playback. */
  src: string;
  /**
   * Total clip length in seconds. Required to render the waveform without
   * waiting on `loadedmetadata`; once metadata loads, the real duration
   * supersedes this value.
   */
  duration?: number;
  /**
   * Pre-computed amplitude values (0..1), one per bar. If omitted, a
   * deterministic shape is derived from `src` + `duration` so the same
   * message always looks the same — no `Math.random` at render time.
   */
  waveform?: number[];
  /** Number of bars rendered across the bubble. Default 40. */
  bars?: number;
  /** Bubble alignment + color scheme. Default "incoming". */
  variant?: "incoming" | "outgoing";
  /** Sender avatar image URL. */
  avatar?: string;
  /** Initials shown when no avatar image is available. */
  avatarFallback?: string;
  /** Render the avatar bubble alongside the message. Default true. */
  showAvatar?: boolean;
  /** Right-aligned time / read-status caption beneath the bubble. */
  timestamp?: React.ReactNode;
  /** Accent color used for the played portion of the waveform + play button. */
  accentColor?: string;
  /** Fires when audio playback starts. */
  onPlay?: () => void;
  /** Fires when audio playback pauses. */
  onPause?: () => void;
  /** Fires when the audio reaches the end. */
  onEnded?: () => void;
}

const DEFAULT_ACCENT = "rgb(125, 211, 252)";
const DEFAULT_BARS = 40;

function formatTime(seconds: number): string {
  if (!Number.isFinite(seconds) || seconds < 0) return "0:00";
  const total = Math.floor(seconds);
  const m = Math.floor(total / 60);
  const s = total % 60;
  return `${m}:${s.toString().padStart(2, "0")}`;
}

/**
 * Build a deterministic 0..1 amplitude array from a string seed + length.
 * Uses a tiny mulberry-style hash so the shape is stable across renders
 * without relying on `Math.random`.
 */
function deriveWaveform(seed: string, length: number): number[] {
  let h = 0;
  for (let i = 0; i < seed.length; i++) {
    h = (h * 31 + seed.charCodeAt(i)) | 0;
  }
  // Seed cannot be zero — that would collapse the LCG.
  let state = (h ^ 0x9e3779b9) >>> 0;
  if (state === 0) state = 0x6d2b79f5;

  const out: number[] = new Array(length);
  for (let i = 0; i < length; i++) {
    state = (state + 0x6d2b79f5) >>> 0;
    let t = state;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    const r = ((t ^ (t >>> 14)) >>> 0) / 4294967296;

    // Shape it like speech: gentler at the edges, livelier in the middle.
    const x = i / Math.max(1, length - 1);
    const envelope = Math.sin(x * Math.PI) * 0.7 + 0.3;
    const amplitude = 0.28 + r * 0.72;
    out[i] = Math.max(0.12, Math.min(1, amplitude * envelope));
  }
  return out;
}

/**
 * VoiceMessage — a voice / audio-message bubble for chat surfaces. Renders
 * a play/pause button, an SVG waveform with a moving playhead that fills
 * the played bars in the accent color, and an mm:ss time readout. Clicking
 * any bar seeks the underlying `<audio>` element. Two visual variants:
 * `incoming` (left, neutral) and `outgoing` (right, sky gradient). If no
 * waveform is supplied, a deterministic shape is generated from `src` so
 * the bubble looks consistent across renders — zero external dependencies.
 */
const VoiceMessage = React.forwardRef<HTMLDivElement, VoiceMessageProps>(
  (
    {
      src,
      duration: durationProp,
      waveform,
      bars = DEFAULT_BARS,
      variant = "incoming",
      avatar,
      avatarFallback,
      showAvatar = true,
      timestamp,
      accentColor = DEFAULT_ACCENT,
      onPlay,
      onPause,
      onEnded,
      className,
      style,
      ...props
    },
    ref
  ) => {
    const audioRef = React.useRef<HTMLAudioElement | null>(null);
    const [playing, setPlaying] = React.useState(false);
    const [currentTime, setCurrentTime] = React.useState(0);
    const [metaDuration, setMetaDuration] = React.useState(0);

    // Effective duration: prefer metadata once it lands; fall back to the prop.
    const effectiveDuration =
      metaDuration > 0 ? metaDuration : durationProp ?? 0;

    // Build / memoize the waveform shape.
    const amplitudes = React.useMemo<number[]>(() => {
      if (waveform && waveform.length > 0) {
        // Down/upsample provided values into `bars` slots.
        const out: number[] = new Array(bars);
        for (let i = 0; i < bars; i++) {
          const idx = Math.floor((i / bars) * waveform.length);
          const v = waveform[idx] ?? 0;
          out[i] = Math.max(0.06, Math.min(1, v));
        }
        return out;
      }
      const seed = `${src ?? ""}|${durationProp ?? 0}|${bars}`;
      return deriveWaveform(seed, bars);
    }, [waveform, src, durationProp, bars]);

    // Bind audio element events.
    React.useEffect(() => {
      const el = audioRef.current;
      if (!el) return;

      const handleLoaded = () => {
        setMetaDuration(Number.isFinite(el.duration) ? el.duration : 0);
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
        setCurrentTime(0);
        onEnded?.();
      };

      el.addEventListener("loadedmetadata", handleLoaded);
      el.addEventListener("timeupdate", handleTime);
      el.addEventListener("play", handlePlay);
      el.addEventListener("pause", handlePause);
      el.addEventListener("ended", handleEnded);

      return () => {
        el.removeEventListener("loadedmetadata", handleLoaded);
        el.removeEventListener("timeupdate", handleTime);
        el.removeEventListener("play", handlePlay);
        el.removeEventListener("pause", handlePause);
        el.removeEventListener("ended", handleEnded);
      };
    }, [src, onPlay, onPause, onEnded]);

    // Reset when src changes.
    React.useEffect(() => {
      setCurrentTime(0);
      setMetaDuration(0);
      setPlaying(false);
    }, [src]);

    const togglePlay = () => {
      const el = audioRef.current;
      if (!el || !src) return;
      if (el.paused) {
        void el.play().catch(() => {
          // Autoplay / gesture restrictions — swallow silently.
        });
      } else {
        el.pause();
      }
    };

    const seekToFraction = (fraction: number) => {
      const el = audioRef.current;
      const dur = effectiveDuration;
      if (!el || dur <= 0) return;
      const next = Math.max(0, Math.min(1, fraction)) * dur;
      el.currentTime = next;
      setCurrentTime(next);
    };

    const handleWaveClick = (e: React.MouseEvent<HTMLDivElement>) => {
      const rect = e.currentTarget.getBoundingClientRect();
      if (rect.width <= 0) return;
      const fraction = (e.clientX - rect.left) / rect.width;
      seekToFraction(fraction);
    };

    const handleWaveKey = (e: React.KeyboardEvent<HTMLDivElement>) => {
      if (effectiveDuration <= 0) return;
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        seekToFraction((currentTime - 2) / effectiveDuration);
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        seekToFraction((currentTime + 2) / effectiveDuration);
      } else if (e.key === "Home") {
        e.preventDefault();
        seekToFraction(0);
      } else if (e.key === "End") {
        e.preventDefault();
        seekToFraction(1);
      }
    };

    const progress =
      effectiveDuration > 0
        ? Math.max(0, Math.min(1, currentTime / effectiveDuration))
        : 0;

    const isOutgoing = variant === "outgoing";

    // Waveform geometry.
    const waveWidth = 156;
    const waveHeight = 28;
    const gap = 1.5;
    const barWidth = Math.max(
      1,
      (waveWidth - gap * (bars - 1)) / Math.max(1, bars)
    );
    const playedBars = Math.round(progress * bars);

    // Color tokens differ slightly per variant for AA contrast on the gradient.
    const playedFill = isOutgoing ? "rgb(10, 10, 10)" : accentColor;
    const unplayedFill = isOutgoing
      ? "rgba(10, 10, 10, 0.32)"
      : "rgba(255, 255, 255, 0.4)";

    const remainingTime = Math.max(
      0,
      effectiveDuration - (playing ? currentTime : 0)
    );

    const avatarEl = showAvatar ? (
      <div
        className={cn(
          "relative flex h-8 w-8 shrink-0 select-none items-center justify-center overflow-hidden rounded-full text-[11px] font-semibold uppercase",
          isOutgoing
            ? "bg-white/10 text-white"
            : "bg-white/[0.08] text-white/80"
        )}
        aria-hidden
      >
        {avatar ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={avatar}
            alt=""
            className="h-full w-full object-cover"
            draggable={false}
          />
        ) : (
          <span>{(avatarFallback ?? "U").slice(0, 2)}</span>
        )}
      </div>
    ) : null;

    const playButton = (
      <button
        type="button"
        onClick={togglePlay}
        aria-label={playing ? "Pause voice message" : "Play voice message"}
        aria-pressed={playing}
        disabled={!src}
        className={cn(
          "flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition-transform hover:scale-105 active:scale-95 disabled:cursor-not-allowed disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
          isOutgoing
            ? "bg-neutral-950 text-white focus-visible:ring-offset-sky-400"
            : "text-neutral-950 focus-visible:ring-offset-neutral-950"
        )}
        style={
          isOutgoing
            ? ({
                ["--tw-ring-color" as string]: "rgb(10,10,10)",
              } as React.CSSProperties)
            : ({
                background: accentColor,
                boxShadow: `0 4px 14px -4px ${accentColor}`,
                ["--tw-ring-color" as string]: accentColor,
              } as React.CSSProperties)
        }
      >
        {playing ? (
          <svg
            width={12}
            height={12}
            viewBox="0 0 24 24"
            fill="currentColor"
            aria-hidden
          >
            <rect x={6} y={5} width={4} height={14} rx={1} />
            <rect x={14} y={5} width={4} height={14} rx={1} />
          </svg>
        ) : (
          <svg
            width={12}
            height={12}
            viewBox="0 0 24 24"
            fill="currentColor"
            aria-hidden
          >
            <path d="M8 5v14l12-7L8 5z" />
          </svg>
        )}
      </button>
    );

    const bubble = (
      <div className="flex min-w-0 flex-col">
        <div
          className={cn(
            "flex items-center gap-3 rounded-2xl px-3 py-2.5",
            isOutgoing
              ? "text-neutral-950"
              : "bg-white/[0.06] text-white backdrop-blur-sm"
          )}
          style={
            isOutgoing
              ? {
                  background: `linear-gradient(135deg, ${accentColor} 0%, rgb(165, 220, 255) 100%)`,
                  boxShadow: `0 10px 24px -16px ${accentColor}`,
                }
              : undefined
          }
        >
          {playButton}

          <div
            role="slider"
            tabIndex={src ? 0 : -1}
            aria-label="Seek voice message"
            aria-valuemin={0}
            aria-valuemax={Math.max(0, Math.floor(effectiveDuration))}
            aria-valuenow={Math.floor(currentTime)}
            aria-valuetext={`${formatTime(currentTime)} of ${formatTime(
              effectiveDuration
            )}`}
            onClick={handleWaveClick}
            onKeyDown={handleWaveKey}
            className={cn(
              "relative -my-1 flex-1 cursor-pointer select-none rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
              isOutgoing
                ? "focus-visible:ring-offset-sky-400"
                : "focus-visible:ring-offset-neutral-950"
            )}
            style={
              {
                ["--tw-ring-color" as string]: isOutgoing
                  ? "rgb(10,10,10)"
                  : accentColor,
              } as React.CSSProperties
            }
          >
            <svg
              width={waveWidth}
              height={waveHeight}
              viewBox={`0 0 ${waveWidth} ${waveHeight}`}
              className="block w-full"
              preserveAspectRatio="none"
              aria-hidden
            >
              {amplitudes.map((amp, i) => {
                const h = Math.max(2, amp * waveHeight);
                const x = i * (barWidth + gap);
                const y = (waveHeight - h) / 2;
                const isPlayed = i < playedBars;
                return (
                  <rect
                    key={i}
                    x={x}
                    y={y}
                    width={barWidth}
                    height={h}
                    rx={Math.min(1.5, barWidth / 2)}
                    fill={isPlayed ? playedFill : unplayedFill}
                    className="craftui-voice-message-bar"
                  />
                );
              })}
            </svg>

            {/* Playhead — a thin vertical accent line at the current position. */}
            {effectiveDuration > 0 ? (
              <span
                aria-hidden
                className="pointer-events-none absolute top-1/2 -translate-y-1/2"
                style={{
                  left: `calc(${progress * 100}% - 1px)`,
                  width: 2,
                  height: waveHeight + 4,
                  background: isOutgoing
                    ? "rgb(10,10,10)"
                    : "rgba(255,255,255,0.9)",
                  borderRadius: 2,
                  opacity: progress > 0 ? 1 : 0,
                  transition: "opacity 160ms ease-out",
                }}
              />
            ) : null}
          </div>

          <span
            className={cn(
              "shrink-0 font-mono text-[10px] tabular-nums",
              isOutgoing ? "text-neutral-950/70" : "text-white/55"
            )}
          >
            {playing ? formatTime(currentTime) : formatTime(remainingTime)}
          </span>
        </div>

        {timestamp ? (
          <div
            className={cn(
              "mt-1 px-1 text-[10px] text-white/45",
              isOutgoing ? "text-right" : "text-left"
            )}
          >
            {timestamp}
          </div>
        ) : null}
      </div>
    );

    return (
      <div
        ref={ref}
        className={cn(
          "flex w-full max-w-[300px] items-end gap-2",
          isOutgoing ? "ml-auto flex-row-reverse" : "mr-auto",
          className
        )}
        style={style}
        {...props}
      >
        {src ? (
          <audio
            ref={audioRef}
            src={src}
            preload="metadata"
            className="hidden"
          />
        ) : null}

        {avatarEl}
        {bubble}

        <style>{`
          .craftui-voice-message-bar {
            transition: fill 160ms ease-out;
          }
        `}</style>
      </div>
    );
  }
);
VoiceMessage.displayName = "VoiceMessage";

export { VoiceMessage };
