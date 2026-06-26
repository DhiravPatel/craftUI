"use client";

import * as React from "react";
import { cn } from "../../lib/cn";

export interface ReviewCardProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "title" | "content"> {
  /** Star rating between 0 and `maxRating`. Supports .5 granularity. */
  rating: number;
  /** Maximum rating. Default 5. */
  maxRating?: number;
  /** Reviewer name. */
  author: string;
  /** Optional avatar image URL. Falls back to author initial. */
  authorAvatar?: string;
  /** Date string shown next to the author. */
  date?: string;
  /** Review headline. */
  title?: React.ReactNode;
  /** Body content of the review. */
  content?: React.ReactNode;
  /** Render the "Verified purchase" emerald pill. */
  verified?: boolean;
  /** Number of helpful votes. Drives the count next to the button. */
  helpful?: number;
  /** Controlled — has the current user marked this review helpful? */
  isHelpful?: boolean;
  /** Called when the helpful button toggles. */
  onHelpful?: (next: boolean) => void;
  /** Optional pros bullets. Each is rendered with a green check. */
  pros?: string[];
  /** Optional cons bullets. Each is rendered with a rose x. */
  cons?: string[];
  /** Slot rendered at the bottom of the card (alongside the helpful button). */
  footer?: React.ReactNode;
}

const STAR_GOLD = "rgb(251, 191, 36)";
const STAR_DIM = "rgba(255, 255, 255, 0.14)";

/**
 * ReviewCard — a product review card for storefronts and SaaS marketplaces.
 * Shows a half-star SVG rating row, the reviewer's name and avatar with an
 * optional emerald "Verified purchase" pill, a bold title and body, optional
 * pros/cons columns with iconified bullets, and a "Helpful" voting button.
 * The helpful button works fully uncontrolled or controlled via `isHelpful`
 * + `onHelpful`. Self-contained — pure React + Tailwind, no dependencies.
 */
const ReviewCard = React.forwardRef<HTMLDivElement, ReviewCardProps>(
  (
    {
      rating,
      maxRating = 5,
      author,
      authorAvatar,
      date,
      title,
      content,
      verified = false,
      helpful,
      isHelpful,
      onHelpful,
      pros,
      cons,
      footer,
      className,
      style,
      ...props
    },
    ref
  ) => {
    const isControlled = isHelpful !== undefined;
    const [internalHelpful, setInternalHelpful] = React.useState(false);
    const helpfulOn = isControlled ? isHelpful : internalHelpful;

    // Internal counter so the count visibly ticks in uncontrolled mode.
    const baseCount = helpful ?? 0;
    const [internalDelta, setInternalDelta] = React.useState(0);
    const displayCount = isControlled
      ? baseCount
      : Math.max(0, baseCount + internalDelta);

    const toggleHelpful = () => {
      const next = !helpfulOn;
      if (!isControlled) {
        setInternalHelpful(next);
        setInternalDelta((d) => (next ? d + 1 : d - 1));
      }
      onHelpful?.(next);
    };

    const clamped = Math.max(0, Math.min(rating, maxRating));
    const ratingLabel = `${clamped.toFixed(clamped % 1 === 0 ? 0 : 1)} out of ${maxRating} stars`;
    const initial = author.trim().charAt(0).toUpperCase() || "?";

    return (
      <div
        ref={ref}
        className={cn(
          "relative w-full max-w-md overflow-hidden rounded-2xl border border-white/10 bg-neutral-950 p-5 text-white shadow-[0_20px_60px_-30px_rgba(0,0,0,0.7)]",
          className
        )}
        style={style}
        {...props}
      >
        {/* subtle gold halo behind the stars */}
        <div
          aria-hidden
          className="pointer-events-none absolute -top-16 left-6 h-32 w-32 rounded-full opacity-30 blur-3xl"
          style={{
            background: `radial-gradient(closest-side, ${STAR_GOLD}, transparent)`,
          }}
        />

        {/* Header: avatar + author + date + verified */}
        <div className="relative flex items-start gap-3">
          <Avatar src={authorAvatar} initial={initial} author={author} />
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
              <span className="truncate text-sm font-semibold leading-tight">
                {author}
              </span>
              {verified ? <VerifiedBadge /> : null}
            </div>
            <div className="mt-1 flex items-center gap-2">
              <StarRow
                rating={clamped}
                maxRating={maxRating}
                label={ratingLabel}
              />
              {date ? (
                <>
                  <span aria-hidden className="text-white/25">
                    ·
                  </span>
                  <span className="text-[11px] text-white/50">{date}</span>
                </>
              ) : null}
            </div>
          </div>
        </div>

        {/* Title + body */}
        {title || content ? (
          <div className="mt-4 space-y-1.5">
            {title ? (
              <h3 className="text-base font-semibold leading-snug">{title}</h3>
            ) : null}
            {content ? (
              <div className="text-sm leading-relaxed text-white/70">
                {content}
              </div>
            ) : null}
          </div>
        ) : null}

        {/* Pros / cons */}
        {(pros && pros.length > 0) || (cons && cons.length > 0) ? (
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {pros && pros.length > 0 ? (
              <ProConsList tone="pro" items={pros} heading="Pros" />
            ) : null}
            {cons && cons.length > 0 ? (
              <ProConsList tone="con" items={cons} heading="Cons" />
            ) : null}
          </div>
        ) : null}

        {/* Footer: helpful button + custom footer */}
        <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-white/[0.06] pt-4">
          <button
            type="button"
            onClick={toggleHelpful}
            aria-pressed={helpfulOn}
            className={cn(
              "group/helpful inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-medium transition-all duration-200",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-300/40 focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-950",
              helpfulOn
                ? "border-sky-300/40 bg-sky-300/10 text-sky-200"
                : "border-white/10 bg-white/[0.03] text-white/70 hover:border-white/20 hover:bg-white/[0.06] hover:text-white"
            )}
          >
            <ThumbsUpIcon active={helpfulOn} />
            <span>
              {helpfulOn ? "Marked helpful" : "Helpful"}
              {displayCount > 0 ? (
                <span className="ml-1.5 tabular-nums text-white/55">
                  ({displayCount})
                </span>
              ) : null}
            </span>
          </button>
          {footer ? (
            <div className="flex items-center gap-2 text-xs text-white/55">
              {footer}
            </div>
          ) : null}
        </div>

        <style>{`
          @keyframes craftui-review-card-pop {
            0% { transform: scale(1); }
            45% { transform: scale(1.25); }
            100% { transform: scale(1); }
          }
          .craftui-review-card-pop {
            animation: craftui-review-card-pop 320ms cubic-bezier(0.22, 1, 0.36, 1) both;
          }
          @keyframes craftui-review-card-star-in {
            0% { opacity: 0; transform: translateY(2px) scale(0.85); }
            100% { opacity: 1; transform: translateY(0) scale(1); }
          }
          .craftui-review-card-star {
            animation: craftui-review-card-star-in 360ms cubic-bezier(0.22, 1, 0.36, 1) both;
          }
        `}</style>
      </div>
    );
  }
);
ReviewCard.displayName = "ReviewCard";

function Avatar({
  src,
  initial,
  author,
}: {
  src?: string;
  initial: string;
  author: string;
}) {
  if (src) {
    return (
      <img
        src={src}
        alt={author}
        className="h-10 w-10 shrink-0 rounded-full border border-white/10 object-cover"
      />
    );
  }
  return (
    <div
      aria-hidden
      className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/10 bg-gradient-to-br from-sky-300/20 to-fuchsia-400/20 text-sm font-semibold text-white"
    >
      {initial}
    </div>
  );
}

function VerifiedBadge() {
  return (
    <span className="inline-flex items-center gap-1 rounded-full bg-emerald-400/15 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-emerald-300 ring-1 ring-inset ring-emerald-400/25">
      <svg width={10} height={10} viewBox="0 0 24 24" fill="none" aria-hidden>
        <path
          d="M5 12l4 4L19 6"
          stroke="currentColor"
          strokeWidth={3}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      Verified
    </span>
  );
}

function StarRow({
  rating,
  maxRating,
  label,
}: {
  rating: number;
  maxRating: number;
  label: string;
}) {
  const stars: React.ReactNode[] = [];
  for (let i = 0; i < maxRating; i++) {
    // Fill fraction for star i: clamp(rating - i, 0, 1)
    const fill = Math.max(0, Math.min(1, rating - i));
    stars.push(<Star key={i} index={i} fill={fill} />);
  }
  return (
    <span
      role="img"
      aria-label={label}
      className="inline-flex items-center gap-0.5"
    >
      {stars}
    </span>
  );
}

function Star({ index, fill }: { index: number; fill: number }) {
  const gradientId = `craftui-review-card-star-${index}`;
  const stopOffset = `${fill * 100}%`;
  const delay = `${index * 60}ms`;
  return (
    <svg
      width={14}
      height={14}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden
      className="craftui-review-card-star"
      style={{ animationDelay: delay }}
    >
      <defs>
        <linearGradient id={gradientId} x1="0" y1="0" x2="1" y2="0">
          <stop offset={stopOffset} stopColor={STAR_GOLD} />
          <stop offset={stopOffset} stopColor={STAR_DIM} />
        </linearGradient>
      </defs>
      <path
        d="M12 2.6l2.95 5.98 6.6.96-4.78 4.66 1.13 6.57L12 17.77 6.1 20.77l1.13-6.57L2.45 9.54l6.6-.96L12 2.6z"
        fill={`url(#${gradientId})`}
        stroke={STAR_GOLD}
        strokeWidth={0.6}
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ProConsList({
  tone,
  items,
  heading,
}: {
  tone: "pro" | "con";
  items: string[];
  heading: string;
}) {
  const isPro = tone === "pro";
  return (
    <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-3">
      <p
        className={cn(
          "mb-2 text-[10px] font-semibold uppercase tracking-widest",
          isPro ? "text-emerald-300/80" : "text-rose-300/80"
        )}
      >
        {heading}
      </p>
      <ul className="space-y-1.5">
        {items.map((item, i) => (
          <li
            key={`${tone}-${i}`}
            className="flex items-start gap-2 text-xs leading-snug text-white/75"
          >
            <span
              aria-hidden
              className={cn(
                "mt-0.5 flex h-3.5 w-3.5 shrink-0 items-center justify-center rounded-full",
                isPro
                  ? "bg-emerald-400/15 text-emerald-300"
                  : "bg-rose-400/15 text-rose-300"
              )}
            >
              {isPro ? (
                <svg
                  width={9}
                  height={9}
                  viewBox="0 0 24 24"
                  fill="none"
                  aria-hidden
                >
                  <path
                    d="M5 12l4 4L19 6"
                    stroke="currentColor"
                    strokeWidth={3.5}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              ) : (
                <svg
                  width={8}
                  height={8}
                  viewBox="0 0 24 24"
                  fill="none"
                  aria-hidden
                >
                  <path
                    d="M6 6l12 12M6 18L18 6"
                    stroke="currentColor"
                    strokeWidth={3.5}
                    strokeLinecap="round"
                  />
                </svg>
              )}
            </span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function ThumbsUpIcon({ active }: { active: boolean }) {
  return (
    <svg
      width={14}
      height={14}
      viewBox="0 0 24 24"
      fill={active ? "currentColor" : "none"}
      aria-hidden
      className={cn(active && "craftui-review-card-pop")}
    >
      <path
        d="M7 10v10H4a1 1 0 0 1-1-1v-8a1 1 0 0 1 1-1h3zm0 0l4.6-7.2a1.5 1.5 0 0 1 2.7 1.1L13.5 9h5.7a2 2 0 0 1 2 2.3l-1.3 7a2 2 0 0 1-2 1.7H7"
        stroke="currentColor"
        strokeWidth={1.6}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export { ReviewCard };
