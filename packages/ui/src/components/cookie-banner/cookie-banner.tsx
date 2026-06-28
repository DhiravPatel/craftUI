"use client";

import * as React from "react";
import { cn } from "../../lib/cn";

export interface CookieBannerCategory {
  /** Stable id used as the key in the prefs map. */
  id: string;
  /** Human-readable label (e.g. "Analytics"). */
  label: string;
  /** Short explanation of what this category covers. */
  description?: React.ReactNode;
  /** Locked on (e.g. essential cookies). User can't toggle it off. */
  required?: boolean;
  /** Initial state in the customize panel. Required ones are always on. */
  defaultEnabled?: boolean;
}

export interface CookieBannerProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Headline at the top of the banner. */
  title?: string;
  /** Body copy under the headline. */
  description?: React.ReactNode;
  /** Cookie categories surfaced in the customize panel. */
  categories?: CookieBannerCategory[];
  /** Optional link to the full privacy policy. */
  privacyHref?: string;
  /** Label for the privacy link. Default "Privacy policy". */
  privacyLabel?: string;
  /** Label for the Accept-all CTA. Default "Accept all". */
  acceptLabel?: string;
  /** Label for the Reject-all CTA. Default "Reject all". */
  rejectLabel?: string;
  /** Label for the Customize CTA. Default "Customize". */
  customizeLabel?: string;
  /** Label for the Save-preferences CTA. Default "Save preferences". */
  saveLabel?: string;
  /** Fires on Accept-all or Save-preferences with the resolved prefs map. */
  onAccept?: (prefs: Record<string, boolean>) => void;
  /** Fires on Reject all — prefs are forced to required-only. */
  onReject?: () => void;
  /** Controlled visibility. */
  open?: boolean;
  /** Uncontrolled initial visibility. Default true. */
  defaultOpen?: boolean;
  /** Fires when the visibility flips. */
  onOpenChange?: (open: boolean) => void;
  /** Accent color used for the primary CTA + focus rings. Default sky-300. */
  accentColor?: string;
}

const DEFAULT_ACCENT = "rgb(125, 211, 252)";
const DEFAULT_CATEGORIES: CookieBannerCategory[] = [
  {
    id: "essential",
    label: "Essential",
    description: "Required for the site to load, authenticate, and stay secure.",
    required: true,
  },
  {
    id: "analytics",
    label: "Analytics",
    description: "Anonymous usage data so we can improve the product.",
    defaultEnabled: true,
  },
  {
    id: "marketing",
    label: "Marketing",
    description: "Personalized ads and re-engagement campaigns.",
    defaultEnabled: false,
  },
];

const ENTER_MS = 380;
const EXIT_MS = 260;

/**
 * CookieBanner — a GDPR-style consent banner that slides up from the bottom
 * of the viewport on mount. The default panel surfaces Accept all / Reject
 * all / Customize CTAs; Customize expands into a per-category panel with
 * inline switches (required categories are locked on). On accept it emits
 * the resolved prefs map keyed by category id; on reject it forces
 * required-only consent. Fully self-contained — pure React + Tailwind, no
 * dependencies, controlled or uncontrolled visibility.
 */
const CookieBanner = React.forwardRef<HTMLDivElement, CookieBannerProps>(
  (
    {
      title = "We use cookies",
      description,
      categories = DEFAULT_CATEGORIES,
      privacyHref,
      privacyLabel = "Privacy policy",
      acceptLabel = "Accept all",
      rejectLabel = "Reject all",
      customizeLabel = "Customize",
      saveLabel = "Save preferences",
      onAccept,
      onReject,
      open,
      defaultOpen = true,
      onOpenChange,
      accentColor = DEFAULT_ACCENT,
      className,
      style,
      ...props
    },
    ref
  ) => {
    const isControlled = open !== undefined;
    const [internalOpen, setInternalOpen] = React.useState(defaultOpen);
    const desiredOpen = isControlled ? open : internalOpen;

    // Two-phase mount so we can drive the slide on enter AND exit.
    const [mounted, setMounted] = React.useState(desiredOpen);
    const [visible, setVisible] = React.useState(false);
    const [customizing, setCustomizing] = React.useState(false);

    const initialPrefs = React.useMemo(() => {
      const out: Record<string, boolean> = {};
      for (const c of categories) {
        out[c.id] = c.required ? true : Boolean(c.defaultEnabled);
      }
      return out;
    }, [categories]);

    const [prefs, setPrefs] = React.useState<Record<string, boolean>>(
      initialPrefs
    );

    // Keep prefs in sync if the consumer swaps the categories prop.
    React.useEffect(() => {
      setPrefs(initialPrefs);
    }, [initialPrefs]);

    // Drive the enter / exit transitions.
    React.useEffect(() => {
      if (desiredOpen) {
        setMounted(true);
        // Next frame so the initial translated-down state paints first.
        const raf = requestAnimationFrame(() => {
          requestAnimationFrame(() => setVisible(true));
        });
        return () => cancelAnimationFrame(raf);
      }
      setVisible(false);
      const t = window.setTimeout(() => {
        setMounted(false);
        setCustomizing(false);
      }, EXIT_MS);
      return () => window.clearTimeout(t);
    }, [desiredOpen]);

    const setOpen = (next: boolean) => {
      if (!isControlled) setInternalOpen(next);
      onOpenChange?.(next);
    };

    const resolveAcceptAll = () => {
      const out: Record<string, boolean> = {};
      for (const c of categories) out[c.id] = true;
      return out;
    };

    const resolveReject = () => {
      const out: Record<string, boolean> = {};
      for (const c of categories) out[c.id] = Boolean(c.required);
      return out;
    };

    const handleAcceptAll = () => {
      const next = resolveAcceptAll();
      setPrefs(next);
      onAccept?.(next);
      setOpen(false);
    };

    const handleReject = () => {
      const next = resolveReject();
      setPrefs(next);
      onReject?.();
      setOpen(false);
    };

    const handleSave = () => {
      const next: Record<string, boolean> = { ...prefs };
      for (const c of categories) {
        if (c.required) next[c.id] = true;
      }
      setPrefs(next);
      onAccept?.(next);
      setOpen(false);
    };

    const togglePref = (id: string) => {
      setPrefs((p) => ({ ...p, [id]: !p[id] }));
    };

    if (!mounted) return null;

    const titleId = "craftui-cookie-banner-title";
    const descId = "craftui-cookie-banner-desc";

    return (
      <div
        ref={ref}
        role="dialog"
        aria-modal="false"
        aria-labelledby={titleId}
        aria-describedby={description ? descId : undefined}
        className={cn(
          "fixed inset-x-0 bottom-0 z-50 mx-auto w-full max-w-3xl px-4 pb-4 sm:pb-6",
          "transition-all ease-[cubic-bezier(0.22,1,0.36,1)]",
          visible
            ? "translate-y-0 opacity-100"
            : "translate-y-[120%] opacity-0",
          className
        )}
        style={
          {
            transitionDuration: visible ? `${ENTER_MS}ms` : `${EXIT_MS}ms`,
            ...style,
          } as React.CSSProperties
        }
        {...props}
      >
        <div
          className={cn(
            "relative overflow-hidden rounded-2xl bg-neutral-950 text-white",
            "ring-1 ring-white/10 shadow-[0_30px_80px_-30px_rgba(0,0,0,0.8)]"
          )}
        >
          {/* ambient accent glow */}
          <div
            aria-hidden
            className="pointer-events-none absolute -top-24 left-8 h-40 w-64 opacity-30 blur-3xl"
            style={{
              background: `radial-gradient(closest-side, ${accentColor}, transparent)`,
            }}
          />

          <div className="relative flex flex-col gap-4 p-5 sm:flex-row sm:items-start sm:gap-5 sm:p-6">
            <div
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ring-1 ring-white/10"
              style={{
                background: `linear-gradient(135deg, ${accentColor}33, transparent)`,
              }}
              aria-hidden
            >
              <svg
                width={20}
                height={20}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={1.7}
                strokeLinecap="round"
                strokeLinejoin="round"
                style={{ color: accentColor }}
              >
                <path d="M12 2a10 10 0 1 0 10 10 4 4 0 0 1-5-5 4 4 0 0 1-5-5Z" />
                <path d="M8.5 8.5h.01" />
                <path d="M15.5 12.5h.01" />
                <path d="M9 14h.01" />
                <path d="M14 17h.01" />
              </svg>
            </div>

            <div className="min-w-0 flex-1">
              <h2 id={titleId} className="text-base font-semibold leading-tight">
                {title}
              </h2>
              <p
                id={description ? descId : undefined}
                className="mt-1.5 text-sm leading-relaxed text-white/65"
              >
                {description ??
                  "We use cookies to keep the site running, measure performance, and personalize content. You can accept all, reject non-essential, or pick what to share."}
              </p>
              {privacyHref ? (
                <a
                  href={privacyHref}
                  className="mt-1.5 inline-flex items-center gap-1 text-xs font-medium underline-offset-2 hover:underline"
                  style={{ color: accentColor }}
                >
                  {privacyLabel}
                  <svg
                    width={11}
                    height={11}
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden
                  >
                    <path d="M7 17 17 7" />
                    <path d="M8 7h9v9" />
                  </svg>
                </a>
              ) : null}
            </div>

            <button
              type="button"
              onClick={handleReject}
              aria-label="Dismiss cookie banner"
              className="absolute right-3 top-3 flex h-7 w-7 items-center justify-center rounded-md text-white/45 transition-colors hover:bg-white/[0.06] hover:text-white sm:static sm:order-3 sm:hidden"
            >
              <svg width={14} height={14} viewBox="0 0 24 24" fill="none" aria-hidden>
                <path
                  d="M6 6l12 12M6 18L18 6"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                />
              </svg>
            </button>
          </div>

          {/* Customize panel */}
          <div
            className={cn(
              "relative grid transition-[grid-template-rows,opacity] duration-300 ease-out",
              customizing
                ? "grid-rows-[1fr] opacity-100"
                : "grid-rows-[0fr] opacity-0"
            )}
          >
            <div className="min-h-0 overflow-hidden">
              <div className="border-t border-white/[0.06] px-5 py-4 sm:px-6">
                <ul className="flex flex-col gap-2">
                  {categories.map((cat) => {
                    const enabled = cat.required ? true : Boolean(prefs[cat.id]);
                    const inputId = `craftui-cookie-banner-cat-${cat.id}`;
                    return (
                      <li
                        key={cat.id}
                        className="flex items-start gap-4 rounded-xl bg-white/[0.025] p-3 ring-1 ring-white/[0.04]"
                      >
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center gap-2">
                            <label
                              htmlFor={inputId}
                              className="text-sm font-medium text-white/90"
                            >
                              {cat.label}
                            </label>
                            {cat.required ? (
                              <span className="rounded-full bg-white/[0.06] px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider text-white/55">
                                Required
                              </span>
                            ) : null}
                          </div>
                          {cat.description ? (
                            <p className="mt-0.5 text-xs leading-snug text-white/55">
                              {cat.description}
                            </p>
                          ) : null}
                        </div>
                        <button
                          id={inputId}
                          type="button"
                          role="switch"
                          aria-checked={enabled}
                          aria-label={`${cat.label} cookies`}
                          disabled={cat.required}
                          onClick={() => !cat.required && togglePref(cat.id)}
                          className={cn(
                            "relative inline-flex h-5 w-9 shrink-0 items-center rounded-full transition-colors",
                            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-950",
                            enabled ? "" : "bg-white/[0.08]",
                            cat.required ? "cursor-not-allowed opacity-70" : "cursor-pointer"
                          )}
                          style={
                            {
                              "--tw-ring-color": accentColor,
                              background: enabled ? accentColor : undefined,
                            } as React.CSSProperties
                          }
                        >
                          <span
                            aria-hidden
                            className={cn(
                              "inline-block h-4 w-4 transform rounded-full bg-neutral-950 shadow-sm transition-transform duration-200 ease-out",
                              enabled ? "translate-x-[18px]" : "translate-x-0.5"
                            )}
                            style={{
                              background: enabled ? "rgb(10,10,10)" : "rgb(229,231,235)",
                            }}
                          />
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          </div>

          {/* Action row */}
          <div className="flex flex-col-reverse gap-2 border-t border-white/[0.06] bg-white/[0.015] px-5 py-3 sm:flex-row sm:items-center sm:justify-end sm:px-6">
            {customizing ? (
              <button
                type="button"
                onClick={() => setCustomizing(false)}
                className="h-9 rounded-lg px-3 text-sm font-medium text-white/65 transition-colors hover:bg-white/[0.05] hover:text-white"
              >
                Back
              </button>
            ) : (
              <button
                type="button"
                onClick={handleReject}
                className="h-9 rounded-lg px-3 text-sm font-medium text-white/65 transition-colors hover:bg-white/[0.05] hover:text-white"
              >
                {rejectLabel}
              </button>
            )}

            {customizing ? null : (
              <button
                type="button"
                onClick={() => setCustomizing(true)}
                className="h-9 rounded-lg bg-white/[0.06] px-3 text-sm font-medium text-white/85 transition-colors hover:bg-white/[0.1]"
              >
                {customizeLabel}
              </button>
            )}

            {customizing ? (
              <button
                type="button"
                onClick={handleSave}
                className="h-9 rounded-lg bg-white/[0.06] px-3 text-sm font-medium text-white/85 transition-colors hover:bg-white/[0.1]"
              >
                {saveLabel}
              </button>
            ) : null}

            <button
              type="button"
              onClick={handleAcceptAll}
              className="h-9 rounded-lg px-4 text-sm font-semibold text-neutral-950 transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-950"
              style={
                {
                  background: accentColor,
                  "--tw-ring-color": accentColor,
                } as React.CSSProperties
              }
            >
              {acceptLabel}
            </button>
          </div>
        </div>

        <style>{`
          @keyframes craftui-cookie-banner-rise {
            from { transform: translateY(120%); opacity: 0; }
            to { transform: translateY(0); opacity: 1; }
          }
        `}</style>
      </div>
    );
  }
);
CookieBanner.displayName = "CookieBanner";

export { CookieBanner };
