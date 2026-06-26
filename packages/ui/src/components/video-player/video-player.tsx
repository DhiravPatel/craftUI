"use client";

import * as React from "react";
import { cn } from "../../lib/cn";

export interface VideoPlayerProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "title" | "onTimeUpdate"> {
  /** Video URL. When omitted the component renders the chrome but controls won't seek. */
  src?: string;
  /** Bold primary label rendered in the control bar. */
  title?: React.ReactNode;
  /** Optional channel / author line under the title. */
  subtitle?: React.ReactNode;
  /** Poster image URL shown before the video plays. */
  poster?: string;
  /** Optional WebVTT captions track URL. */
  captionsSrc?: string;
  /** Label used for the captions track. Default "English". */
  captionsLabel?: string;
  /** Start playback as soon as the source loads. Default false. */
  autoplay?: boolean;
  /** Loop playback. Default false. */
  loop?: boolean;
  /** Start muted. Default false. */
  muted?: boolean;
  /** Show the volume slider + mute toggle. Default true. */
  showVolume?: boolean;
  /** Show the fullscreen button. Default true. */
  showFullscreen?: boolean;
  /** Show the captions toggle. Defaults to true when `captionsSrc` is provided. */
  showCaptionsToggle?: boolean;
  /** Aspect ratio for the video frame. Default 16 / 9. */
  aspectRatio?: number;
  /** Fires when playback starts. */
  onPlay?: () => void;
  /** Fires when playback pauses. */
  onPause?: () => void;
  /** Fires when the video reaches the end. */
  onEnded?: () => void;
  /** Fires on every timeupdate. */
  onTimeUpdate?: (currentTime: number, duration: number) => void;
  /** Accent color for the play button, progress fill, focus ring. Default sky-300. */
  accentColor?: string;
}

const DEFAULT_ACCENT = "rgb(125, 211, 252)";
const CONTROLS_HIDE_DELAY = 2500;

function formatTime(seconds: number): string {
  if (!Number.isFinite(seconds) || seconds < 0) return "0:00";
  const total = Math.floor(seconds);
  const h = Math.floor(total / 3600);
  const m = Math.floor((total % 3600) / 60);
  const s = total % 60;
  if (h > 0) {
    return `${h}:${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  }
  return `${m}:${s.toString().padStart(2, "0")}`;
}

/**
 * VideoPlayer — a native `<video>`-backed player card with a custom control
 * overlay. Renders a big centered play button when paused, and a bottom
 * gradient control bar with a progress scrubber (mm:ss / HH:MM:SS labels),
 * an optional volume slider with mute toggle, an optional fullscreen
 * toggle, and an optional captions toggle (when a VTT `captionsSrc` is
 * provided). The control bar auto-hides 2.5s after the cursor stops moving
 * while playback is active. Sky-accented, dark, dependency-free, and the
 * visual counterpart to AudioPlayer.
 */
const VideoPlayer = React.forwardRef<HTMLDivElement, VideoPlayerProps>(
  (
    {
      src,
      title,
      subtitle,
      poster,
      captionsSrc,
      captionsLabel = "English",
      autoplay = false,
      loop = false,
      muted: mutedProp = false,
      showVolume = true,
      showFullscreen = true,
      showCaptionsToggle,
      aspectRatio = 16 / 9,
      onPlay,
      onPause,
      onEnded,
      onTimeUpdate,
      accentColor = DEFAULT_ACCENT,
      className,
      style,
      ...props
    },
    ref
  ) => {
    const wrapperRef = React.useRef<HTMLDivElement | null>(null);
    const videoRef = React.useRef<HTMLVideoElement | null>(null);
    const hideTimerRef = React.useRef<number | null>(null);

    const [playing, setPlaying] = React.useState(false);
    const [currentTime, setCurrentTime] = React.useState(0);
    const [duration, setDuration] = React.useState(0);
    const [volume, setVolume] = React.useState(0.8);
    const [muted, setMuted] = React.useState(mutedProp);
    const [fullscreen, setFullscreen] = React.useState(false);
    const [captionsOn, setCaptionsOn] = React.useState(false);
    const [controlsVisible, setControlsVisible] = React.useState(true);

    // Merge the forwarded ref with our internal wrapper ref.
    const setWrapperRef = React.useCallback(
      (node: HTMLDivElement | null) => {
        wrapperRef.current = node;
        if (typeof ref === "function") ref(node);
        else if (ref) (ref as React.MutableRefObject<HTMLDivElement | null>).current = node;
      },
      [ref]
    );

    // Bind video media events.
    React.useEffect(() => {
      const el = videoRef.current;
      if (!el) return;

      const handleLoaded = () => {
        setDuration(Number.isFinite(el.duration) ? el.duration : 0);
      };
      const handleTime = () => {
        setCurrentTime(el.currentTime);
        onTimeUpdate?.(el.currentTime, Number.isFinite(el.duration) ? el.duration : 0);
      };
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
    }, [src, onPlay, onPause, onEnded, onTimeUpdate]);

    // Sync volume + mute changes onto the underlying element.
    React.useEffect(() => {
      const el = videoRef.current;
      if (!el) return;
      el.volume = volume;
      el.muted = muted;
    }, [volume, muted]);

    // Reset transient state when src changes.
    React.useEffect(() => {
      setCurrentTime(0);
      setDuration(0);
      setPlaying(false);
    }, [src]);

    // Track fullscreen state on the document.
    React.useEffect(() => {
      const handle = () => {
        setFullscreen(document.fullscreenElement === wrapperRef.current);
      };
      document.addEventListener("fullscreenchange", handle);
      return () => document.removeEventListener("fullscreenchange", handle);
    }, []);

    // Toggle the captions track when state changes.
    React.useEffect(() => {
      const el = videoRef.current;
      if (!el) return;
      const track = el.textTracks[0];
      if (track) {
        track.mode = captionsOn ? "showing" : "hidden";
      }
    }, [captionsOn, captionsSrc]);

    // Controls auto-hide logic.
    const scheduleHide = React.useCallback(() => {
      if (hideTimerRef.current !== null) {
        window.clearTimeout(hideTimerRef.current);
      }
      hideTimerRef.current = window.setTimeout(() => {
        setControlsVisible(false);
      }, CONTROLS_HIDE_DELAY);
    }, []);

    const revealControls = React.useCallback(() => {
      setControlsVisible(true);
      if (playing) scheduleHide();
    }, [playing, scheduleHide]);

    React.useEffect(() => {
      if (!playing) {
        if (hideTimerRef.current !== null) {
          window.clearTimeout(hideTimerRef.current);
          hideTimerRef.current = null;
        }
        setControlsVisible(true);
      } else {
        scheduleHide();
      }
      return () => {
        if (hideTimerRef.current !== null) {
          window.clearTimeout(hideTimerRef.current);
          hideTimerRef.current = null;
        }
      };
    }, [playing, scheduleHide]);

    const togglePlay = () => {
      const el = videoRef.current;
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
      const el = videoRef.current;
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

    const toggleFullscreen = () => {
      const node = wrapperRef.current;
      if (!node) return;
      if (document.fullscreenElement === node) {
        void document.exitFullscreen().catch(() => undefined);
      } else {
        void node.requestFullscreen().catch(() => undefined);
      }
    };

    const toggleCaptions = () => setCaptionsOn((c) => !c);

    const safeDuration = duration > 0 ? duration : 0;
    const progressPct =
      safeDuration > 0 ? Math.min(100, (currentTime / safeDuration) * 100) : 0;
    const effectiveVolume = muted ? 0 : volume;
    const volumePct = Math.round(effectiveVolume * 100);
    const captionsAvailable = Boolean(captionsSrc);
    const captionsToggleVisible =
      showCaptionsToggle === undefined ? captionsAvailable : showCaptionsToggle;

    const sliderStyle = (pct: number): React.CSSProperties => ({
      background: `linear-gradient(to right, ${accentColor} 0%, ${accentColor} ${pct}%, rgba(255,255,255,0.18) ${pct}%, rgba(255,255,255,0.18) 100%)`,
    });

    return (
      <div
        ref={setWrapperRef}
        className={cn(
          "group/video relative w-full overflow-hidden rounded-2xl border border-white/10 bg-neutral-950 text-white shadow-[0_20px_60px_-20px_rgba(0,0,0,0.6)]",
          fullscreen && "h-screen w-screen rounded-none border-0",
          className
        )}
        style={{
          aspectRatio: fullscreen ? undefined : aspectRatio,
          ...style,
        }}
        onMouseMove={revealControls}
        onMouseLeave={() => {
          if (playing) setControlsVisible(false);
        }}
        {...props}
      >
        {/* Video element */}
        {src ? (
          <video
            ref={videoRef}
            src={src}
            poster={poster}
            autoPlay={autoplay}
            loop={loop}
            playsInline
            preload="metadata"
            onClick={togglePlay}
            className="absolute inset-0 h-full w-full cursor-pointer bg-black object-contain"
          >
            {captionsSrc ? (
              <track
                kind="subtitles"
                src={captionsSrc}
                label={captionsLabel}
                srcLang="en"
                default={captionsOn}
              />
            ) : null}
          </video>
        ) : poster ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={poster}
            alt=""
            className="absolute inset-0 h-full w-full object-cover"
            draggable={false}
          />
        ) : (
          <div
            aria-hidden
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(120% 80% at 50% 30%, rgba(125,211,252,0.12), transparent 60%), linear-gradient(180deg, rgb(20,20,22), rgb(8,8,10))",
            }}
          />
        )}

        {/* Big centered play overlay when paused */}
        {!playing ? (
          <button
            type="button"
            onClick={togglePlay}
            disabled={!src}
            aria-label="Play video"
            className="absolute inset-0 flex items-center justify-center focus-visible:outline-none"
          >
            <span
              className="flex h-16 w-16 items-center justify-center rounded-full shadow-[0_12px_36px_-12px_rgba(0,0,0,0.7)] transition-transform duration-200 hover:scale-110 active:scale-95"
              style={{
                background: accentColor,
                boxShadow: `0 12px 36px -12px ${accentColor}`,
              }}
            >
              <svg width={22} height={22} viewBox="0 0 24 24" aria-hidden>
                <path d="M8 5v14l12-7L8 5z" fill="rgb(10,10,10)" />
              </svg>
            </span>
          </button>
        ) : null}

        {/* Control bar */}
        <div
          className={cn(
            "pointer-events-none absolute inset-x-0 bottom-0 z-10 flex flex-col gap-2 px-4 pb-3 pt-10 transition-opacity duration-300",
            controlsVisible ? "opacity-100" : "opacity-0"
          )}
          style={{
            background:
              "linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,0.55) 60%, rgba(0,0,0,0.8) 100%)",
          }}
        >
          {/* Title + subtitle */}
          {title || subtitle ? (
            <div className="pointer-events-auto min-w-0">
              {title ? (
                <p className="truncate text-sm font-semibold leading-tight text-white drop-shadow">
                  {title}
                </p>
              ) : null}
              {subtitle ? (
                <p className="mt-0.5 truncate text-xs leading-snug text-white/65">
                  {subtitle}
                </p>
              ) : null}
            </div>
          ) : null}

          {/* Progress row */}
          <div className="pointer-events-auto flex items-center gap-2">
            <span className="w-10 shrink-0 text-right font-mono text-[10px] tabular-nums text-white/70">
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
              className="craftui-video-player-slider h-1 flex-1 cursor-pointer appearance-none rounded-full bg-white/15 disabled:cursor-not-allowed disabled:opacity-60"
              style={sliderStyle(progressPct)}
            />
            <span className="w-12 shrink-0 font-mono text-[10px] tabular-nums text-white/70">
              {formatTime(safeDuration)}
            </span>
          </div>

          {/* Action row */}
          <div className="pointer-events-auto flex items-center gap-1">
            <button
              type="button"
              onClick={togglePlay}
              aria-label={playing ? "Pause" : "Play"}
              aria-pressed={playing}
              disabled={!src}
              className="flex h-8 w-8 items-center justify-center rounded-full text-white/85 transition-colors hover:bg-white/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-950 disabled:cursor-not-allowed disabled:opacity-50"
              style={{ ["--tw-ring-color" as string]: accentColor } as React.CSSProperties}
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

            {showVolume ? (
              <div className="ml-1 flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={toggleMute}
                  aria-label={muted || effectiveVolume === 0 ? "Unmute" : "Mute"}
                  aria-pressed={muted}
                  className="flex h-7 w-7 items-center justify-center rounded-md text-white/75 transition-colors hover:bg-white/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-950"
                  style={{ ["--tw-ring-color" as string]: accentColor } as React.CSSProperties}
                >
                  {muted || effectiveVolume === 0 ? (
                    <svg width={14} height={14} viewBox="0 0 24 24" fill="none" aria-hidden>
                      <path d="M11 5L6 9H3v6h3l5 4V5z" fill="currentColor" />
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
                  className="craftui-video-player-slider h-1 w-20 cursor-pointer appearance-none rounded-full bg-white/15"
                  style={sliderStyle(volumePct)}
                />
              </div>
            ) : null}

            <div className="ml-auto flex items-center gap-1">
              {captionsToggleVisible ? (
                <button
                  type="button"
                  onClick={toggleCaptions}
                  disabled={!captionsAvailable}
                  aria-label={captionsOn ? "Hide captions" : "Show captions"}
                  aria-pressed={captionsOn}
                  className={cn(
                    "flex h-7 items-center rounded-md px-2 font-mono text-[10px] font-semibold tracking-wider transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-950 disabled:cursor-not-allowed disabled:opacity-40",
                    captionsOn
                      ? "text-neutral-950"
                      : "text-white/75 hover:bg-white/10 hover:text-white"
                  )}
                  style={
                    captionsOn
                      ? ({
                          background: accentColor,
                          ["--tw-ring-color" as string]: accentColor,
                        } as React.CSSProperties)
                      : ({
                          ["--tw-ring-color" as string]: accentColor,
                        } as React.CSSProperties)
                  }
                >
                  CC
                </button>
              ) : null}

              {showFullscreen ? (
                <button
                  type="button"
                  onClick={toggleFullscreen}
                  aria-label={fullscreen ? "Exit fullscreen" : "Enter fullscreen"}
                  aria-pressed={fullscreen}
                  className="flex h-7 w-7 items-center justify-center rounded-md text-white/75 transition-colors hover:bg-white/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-950"
                  style={{ ["--tw-ring-color" as string]: accentColor } as React.CSSProperties}
                >
                  {fullscreen ? (
                    <svg width={14} height={14} viewBox="0 0 24 24" fill="none" aria-hidden>
                      <path
                        d="M9 4v5H4M15 4v5h5M9 20v-5H4M15 20v-5h5"
                        stroke="currentColor"
                        strokeWidth={1.8}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  ) : (
                    <svg width={14} height={14} viewBox="0 0 24 24" fill="none" aria-hidden>
                      <path
                        d="M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5"
                        stroke="currentColor"
                        strokeWidth={1.8}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  )}
                </button>
              ) : null}
            </div>
          </div>
        </div>

        <style>{`
          .craftui-video-player-slider::-webkit-slider-thumb {
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
          .craftui-video-player-slider::-webkit-slider-thumb:hover {
            transform: scale(1.15);
          }
          .craftui-video-player-slider:disabled::-webkit-slider-thumb {
            background: rgba(255,255,255,0.5);
            cursor: not-allowed;
          }
          .craftui-video-player-slider::-moz-range-thumb {
            width: 12px;
            height: 12px;
            border-radius: 9999px;
            background: #fff;
            box-shadow: 0 0 0 1px rgba(0,0,0,0.25), 0 2px 6px rgba(0,0,0,0.3);
            cursor: pointer;
            border: 0;
          }
          .craftui-video-player-slider::-moz-range-track {
            background: transparent;
          }
          .craftui-video-player-slider:focus-visible {
            outline: none;
            box-shadow: 0 0 0 2px rgba(10,10,10,1), 0 0 0 4px ${accentColor};
          }
          .group\\/video video::cue {
            background: rgba(0,0,0,0.7);
            color: #fff;
            font-family: ui-sans-serif, system-ui, sans-serif;
          }
        `}</style>
      </div>
    );
  }
);
VideoPlayer.displayName = "VideoPlayer";

export { VideoPlayer };
