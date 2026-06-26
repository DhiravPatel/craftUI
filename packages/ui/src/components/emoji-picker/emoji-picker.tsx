"use client";

import * as React from "react";
import { cn } from "../../lib/cn";

export type EmojiPickerCategory =
  | "smileys"
  | "people"
  | "animals"
  | "food"
  | "activities"
  | "travel"
  | "objects"
  | "symbols"
  | "flags";

export interface EmojiPickerEntry {
  /** The emoji character to insert. */
  emoji: string;
  /** Lowercase search keywords. The first one doubles as the hovered label. */
  keywords: string[];
}

export interface EmojiPickerCategoryDef {
  id: EmojiPickerCategory;
  label: string;
  /** Single-emoji glyph used in the tab strip. */
  icon: string;
  emojis: EmojiPickerEntry[];
}

export interface EmojiPickerProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onSelect"> {
  /** Fired when the user clicks (or Enters) an emoji. */
  onSelect?: (emoji: string) => void;
  /** Which category tab is open on first paint. Default "smileys". */
  defaultCategory?: EmojiPickerCategory;
  /** Restrict / reorder which category tabs appear. */
  categories?: EmojiPickerCategory[];
  /** Show the search input. Default true. */
  showSearch?: boolean;
  /** Number of columns in the emoji grid. Default 8. */
  columns?: number;
  /** Placeholder shown in the search box. */
  placeholder?: string;
  /** Accent color for the active tab underline and focus ring. */
  accentColor?: string;
}

const DEFAULT_ACCENT = "rgb(125, 211, 252)";

const EMOJI_DATA: EmojiPickerCategoryDef[] = [
  {
    id: "smileys",
    label: "Smileys",
    icon: "😀",
    emojis: [
      { emoji: "😀", keywords: ["grin", "happy", "smile"] },
      { emoji: "😃", keywords: ["smiley", "joy"] },
      { emoji: "😄", keywords: ["smile", "laugh"] },
      { emoji: "😁", keywords: ["beam", "grin"] },
      { emoji: "😆", keywords: ["laugh", "lol"] },
      { emoji: "🥹", keywords: ["holding", "tears"] },
      { emoji: "😅", keywords: ["sweat", "relief"] },
      { emoji: "😂", keywords: ["joy", "cry", "tears"] },
      { emoji: "🤣", keywords: ["rofl", "rolling"] },
      { emoji: "😊", keywords: ["blush", "happy"] },
      { emoji: "🙂", keywords: ["smile", "slight"] },
      { emoji: "😉", keywords: ["wink", "flirt"] },
      { emoji: "😍", keywords: ["heart", "love"] },
      { emoji: "🥰", keywords: ["love", "hearts"] },
      { emoji: "😘", keywords: ["kiss", "blow"] },
      { emoji: "🤩", keywords: ["star", "wow"] },
      { emoji: "🥳", keywords: ["party", "celebrate"] },
      { emoji: "😎", keywords: ["cool", "sunglasses"] },
      { emoji: "🤔", keywords: ["thinking", "hmm"] },
      { emoji: "😴", keywords: ["sleep", "tired"] },
    ],
  },
  {
    id: "people",
    label: "People",
    icon: "👋",
    emojis: [
      { emoji: "👋", keywords: ["wave", "hello"] },
      { emoji: "🤚", keywords: ["raised", "stop"] },
      { emoji: "✋", keywords: ["hand", "high-five"] },
      { emoji: "🖖", keywords: ["vulcan", "spock"] },
      { emoji: "👌", keywords: ["ok", "perfect"] },
      { emoji: "🤌", keywords: ["pinch", "italian"] },
      { emoji: "🤏", keywords: ["pinch", "small"] },
      { emoji: "✌️", keywords: ["peace", "victory"] },
      { emoji: "🤞", keywords: ["fingers", "luck"] },
      { emoji: "🤟", keywords: ["love", "rock"] },
      { emoji: "🤘", keywords: ["rock", "horns"] },
      { emoji: "👍", keywords: ["thumbs", "yes"] },
      { emoji: "👎", keywords: ["thumbs", "no"] },
      { emoji: "👏", keywords: ["clap", "applause"] },
      { emoji: "🙌", keywords: ["praise", "raised"] },
      { emoji: "🙏", keywords: ["thanks", "pray"] },
      { emoji: "💪", keywords: ["strong", "muscle"] },
      { emoji: "🧠", keywords: ["brain", "smart"] },
      { emoji: "👀", keywords: ["eyes", "look"] },
      { emoji: "👶", keywords: ["baby", "infant"] },
    ],
  },
  {
    id: "animals",
    label: "Animals",
    icon: "🐶",
    emojis: [
      { emoji: "🐶", keywords: ["dog", "puppy"] },
      { emoji: "🐱", keywords: ["cat", "kitten"] },
      { emoji: "🐭", keywords: ["mouse", "rodent"] },
      { emoji: "🐹", keywords: ["hamster", "pet"] },
      { emoji: "🐰", keywords: ["rabbit", "bunny"] },
      { emoji: "🦊", keywords: ["fox", "clever"] },
      { emoji: "🐻", keywords: ["bear", "teddy"] },
      { emoji: "🐼", keywords: ["panda", "bear"] },
      { emoji: "🐨", keywords: ["koala", "australia"] },
      { emoji: "🐯", keywords: ["tiger", "wild"] },
      { emoji: "🦁", keywords: ["lion", "king"] },
      { emoji: "🐮", keywords: ["cow", "moo"] },
      { emoji: "🐷", keywords: ["pig", "oink"] },
      { emoji: "🐸", keywords: ["frog", "ribbit"] },
      { emoji: "🐵", keywords: ["monkey", "ape"] },
      { emoji: "🐔", keywords: ["chicken", "hen"] },
      { emoji: "🐧", keywords: ["penguin", "antarctic"] },
      { emoji: "🐦", keywords: ["bird", "tweet"] },
      { emoji: "🦄", keywords: ["unicorn", "magic"] },
      { emoji: "🐝", keywords: ["bee", "honey"] },
    ],
  },
  {
    id: "food",
    label: "Food",
    icon: "🍔",
    emojis: [
      { emoji: "🍎", keywords: ["apple", "fruit"] },
      { emoji: "🍌", keywords: ["banana", "fruit"] },
      { emoji: "🍇", keywords: ["grapes", "wine"] },
      { emoji: "🍓", keywords: ["strawberry", "berry"] },
      { emoji: "🍑", keywords: ["peach", "fruit"] },
      { emoji: "🥝", keywords: ["kiwi", "green"] },
      { emoji: "🍅", keywords: ["tomato", "red"] },
      { emoji: "🥑", keywords: ["avocado", "toast"] },
      { emoji: "🌶️", keywords: ["pepper", "spicy"] },
      { emoji: "🌽", keywords: ["corn", "cob"] },
      { emoji: "🍔", keywords: ["burger", "fastfood"] },
      { emoji: "🍕", keywords: ["pizza", "slice"] },
      { emoji: "🌮", keywords: ["taco", "mexican"] },
      { emoji: "🍣", keywords: ["sushi", "japan"] },
      { emoji: "🍩", keywords: ["donut", "sweet"] },
      { emoji: "🍪", keywords: ["cookie", "snack"] },
      { emoji: "🍫", keywords: ["chocolate", "bar"] },
      { emoji: "🍰", keywords: ["cake", "slice"] },
      { emoji: "☕", keywords: ["coffee", "cup"] },
      { emoji: "🍺", keywords: ["beer", "drink"] },
    ],
  },
  {
    id: "activities",
    label: "Activities",
    icon: "⚽",
    emojis: [
      { emoji: "⚽", keywords: ["soccer", "football"] },
      { emoji: "🏀", keywords: ["basketball", "hoop"] },
      { emoji: "🏈", keywords: ["football", "nfl"] },
      { emoji: "⚾", keywords: ["baseball", "mlb"] },
      { emoji: "🎾", keywords: ["tennis", "racket"] },
      { emoji: "🏐", keywords: ["volleyball", "beach"] },
      { emoji: "🏉", keywords: ["rugby", "ball"] },
      { emoji: "🎱", keywords: ["billiards", "pool"] },
      { emoji: "🏓", keywords: ["pingpong", "paddle"] },
      { emoji: "🏸", keywords: ["badminton", "shuttle"] },
      { emoji: "🥅", keywords: ["goal", "net"] },
      { emoji: "⛳", keywords: ["golf", "hole"] },
      { emoji: "🎣", keywords: ["fishing", "rod"] },
      { emoji: "🤿", keywords: ["diving", "snorkel"] },
      { emoji: "🎽", keywords: ["jersey", "shirt"] },
      { emoji: "🎮", keywords: ["gaming", "controller"] },
      { emoji: "🎲", keywords: ["dice", "luck"] },
      { emoji: "🧩", keywords: ["puzzle", "jigsaw"] },
      { emoji: "🎯", keywords: ["target", "dart"] },
      { emoji: "🎤", keywords: ["mic", "karaoke"] },
    ],
  },
  {
    id: "travel",
    label: "Travel",
    icon: "✈️",
    emojis: [
      { emoji: "🚗", keywords: ["car", "drive"] },
      { emoji: "🚕", keywords: ["taxi", "cab"] },
      { emoji: "🚌", keywords: ["bus", "transit"] },
      { emoji: "🚎", keywords: ["trolley", "bus"] },
      { emoji: "🏎️", keywords: ["racecar", "fast"] },
      { emoji: "🚓", keywords: ["police", "cop"] },
      { emoji: "🚑", keywords: ["ambulance", "medic"] },
      { emoji: "🚒", keywords: ["firetruck", "engine"] },
      { emoji: "🚲", keywords: ["bike", "cycle"] },
      { emoji: "🛵", keywords: ["scooter", "vespa"] },
      { emoji: "🚂", keywords: ["train", "steam"] },
      { emoji: "✈️", keywords: ["plane", "flight"] },
      { emoji: "🚀", keywords: ["rocket", "launch"] },
      { emoji: "🛸", keywords: ["ufo", "alien"] },
      { emoji: "🚁", keywords: ["helicopter", "chopper"] },
      { emoji: "⛵", keywords: ["sailboat", "yacht"] },
      { emoji: "🚢", keywords: ["ship", "cruise"] },
      { emoji: "🏝️", keywords: ["island", "tropical"] },
      { emoji: "🗽", keywords: ["liberty", "newyork"] },
      { emoji: "🗼", keywords: ["tokyo", "tower"] },
    ],
  },
  {
    id: "objects",
    label: "Objects",
    icon: "💡",
    emojis: [
      { emoji: "💡", keywords: ["idea", "bulb"] },
      { emoji: "🔦", keywords: ["flashlight", "torch"] },
      { emoji: "🕯️", keywords: ["candle", "light"] },
      { emoji: "📱", keywords: ["phone", "mobile"] },
      { emoji: "💻", keywords: ["laptop", "computer"] },
      { emoji: "⌨️", keywords: ["keyboard", "typing"] },
      { emoji: "🖱️", keywords: ["mouse", "cursor"] },
      { emoji: "🖨️", keywords: ["printer", "office"] },
      { emoji: "📷", keywords: ["camera", "photo"] },
      { emoji: "🎧", keywords: ["headphones", "audio"] },
      { emoji: "📚", keywords: ["books", "library"] },
      { emoji: "✏️", keywords: ["pencil", "write"] },
      { emoji: "📌", keywords: ["pin", "tack"] },
      { emoji: "🔑", keywords: ["key", "lock"] },
      { emoji: "🔒", keywords: ["lock", "secure"] },
      { emoji: "💳", keywords: ["card", "credit"] },
      { emoji: "💰", keywords: ["money", "bag"] },
      { emoji: "🎁", keywords: ["gift", "present"] },
      { emoji: "🛒", keywords: ["cart", "shopping"] },
      { emoji: "⏰", keywords: ["clock", "alarm"] },
    ],
  },
  {
    id: "symbols",
    label: "Symbols",
    icon: "❤️",
    emojis: [
      { emoji: "❤️", keywords: ["heart", "love"] },
      { emoji: "🧡", keywords: ["orange", "heart"] },
      { emoji: "💛", keywords: ["yellow", "heart"] },
      { emoji: "💚", keywords: ["green", "heart"] },
      { emoji: "💙", keywords: ["blue", "heart"] },
      { emoji: "💜", keywords: ["purple", "heart"] },
      { emoji: "🖤", keywords: ["black", "heart"] },
      { emoji: "🤍", keywords: ["white", "heart"] },
      { emoji: "💔", keywords: ["broken", "heart"] },
      { emoji: "✨", keywords: ["sparkles", "shine"] },
      { emoji: "⭐", keywords: ["star", "favorite"] },
      { emoji: "🌟", keywords: ["glowing", "star"] },
      { emoji: "⚡", keywords: ["bolt", "lightning"] },
      { emoji: "🔥", keywords: ["fire", "lit"] },
      { emoji: "💧", keywords: ["drop", "water"] },
      { emoji: "✅", keywords: ["check", "yes"] },
      { emoji: "❌", keywords: ["cross", "no"] },
      { emoji: "❓", keywords: ["question", "ask"] },
      { emoji: "❗", keywords: ["exclamation", "alert"] },
      { emoji: "♻️", keywords: ["recycle", "green"] },
    ],
  },
  {
    id: "flags",
    label: "Flags",
    icon: "🏁",
    emojis: [
      { emoji: "🏁", keywords: ["checkered", "finish"] },
      { emoji: "🚩", keywords: ["triangular", "flag"] },
      { emoji: "🏳️", keywords: ["white", "surrender"] },
      { emoji: "🏴", keywords: ["black", "flag"] },
      { emoji: "🏳️‍🌈", keywords: ["rainbow", "pride"] },
      { emoji: "🏴‍☠️", keywords: ["pirate", "skull"] },
      { emoji: "🇺🇸", keywords: ["usa", "america"] },
      { emoji: "🇬🇧", keywords: ["uk", "britain"] },
      { emoji: "🇨🇦", keywords: ["canada", "north"] },
      { emoji: "🇲🇽", keywords: ["mexico", "latin"] },
      { emoji: "🇧🇷", keywords: ["brazil", "south"] },
      { emoji: "🇫🇷", keywords: ["france", "paris"] },
      { emoji: "🇩🇪", keywords: ["germany", "berlin"] },
      { emoji: "🇪🇸", keywords: ["spain", "madrid"] },
      { emoji: "🇮🇹", keywords: ["italy", "rome"] },
      { emoji: "🇯🇵", keywords: ["japan", "tokyo"] },
      { emoji: "🇰🇷", keywords: ["korea", "seoul"] },
      { emoji: "🇨🇳", keywords: ["china", "beijing"] },
      { emoji: "🇮🇳", keywords: ["india", "delhi"] },
      { emoji: "🇦🇺", keywords: ["australia", "sydney"] },
    ],
  },
];

const CATEGORY_LOOKUP = new Map(EMOJI_DATA.map((c) => [c.id, c]));

/**
 * EmojiPicker — a compact, categorized emoji picker with a tab strip, fuzzy
 * keyword search, and a roving keyboard grid. Bundles a curated ~180-emoji
 * inline dataset (no external library, no network call) organized into nine
 * categories. Use the arrow keys to navigate the grid, Enter to select, and
 * `/` to jump to the search box. Hovering an emoji reveals its primary
 * keyword in the footer so users always know what they're picking. Drop into
 * a chat composer, comment box, or reaction popover.
 */
const EmojiPicker = React.forwardRef<HTMLDivElement, EmojiPickerProps>(
  (
    {
      onSelect,
      defaultCategory = "smileys",
      categories,
      showSearch = true,
      columns = 8,
      placeholder = "Search emojis...",
      accentColor = DEFAULT_ACCENT,
      className,
      style,
      ...props
    },
    ref
  ) => {
    // Filter / order the bundled data based on the consumer's `categories` prop.
    const visibleCategories = React.useMemo<EmojiPickerCategoryDef[]>(() => {
      if (!categories || categories.length === 0) return EMOJI_DATA;
      const result: EmojiPickerCategoryDef[] = [];
      for (const id of categories) {
        const def = CATEGORY_LOOKUP.get(id);
        if (def) result.push(def);
      }
      return result.length > 0 ? result : EMOJI_DATA;
    }, [categories]);

    const initialCategory: EmojiPickerCategory =
      visibleCategories.find((c) => c.id === defaultCategory)?.id ??
      visibleCategories[0]?.id ??
      "smileys";

    const [activeCategory, setActiveCategory] =
      React.useState<EmojiPickerCategory>(initialCategory);
    const [query, setQuery] = React.useState("");
    const [hovered, setHovered] = React.useState<EmojiPickerEntry | null>(null);
    const [focusIndex, setFocusIndex] = React.useState(0);

    const searchRef = React.useRef<HTMLInputElement | null>(null);
    const gridRef = React.useRef<HTMLDivElement | null>(null);

    // Filter the visible emoji set: either the active tab, or a flat search list.
    const entries = React.useMemo<EmojiPickerEntry[]>(() => {
      const q = query.trim().toLowerCase();
      if (q.length === 0) {
        const def = visibleCategories.find((c) => c.id === activeCategory);
        return def?.emojis ?? [];
      }
      const seen = new Set<string>();
      const out: EmojiPickerEntry[] = [];
      for (const cat of visibleCategories) {
        for (const entry of cat.emojis) {
          if (seen.has(entry.emoji)) continue;
          if (
            entry.emoji.includes(q) ||
            entry.keywords.some((k) => k.includes(q))
          ) {
            seen.add(entry.emoji);
            out.push(entry);
          }
        }
      }
      return out;
    }, [activeCategory, query, visibleCategories]);

    // Reset focus when the visible list changes.
    React.useEffect(() => {
      setFocusIndex(0);
    }, [activeCategory, query]);

    // Grid keyboard nav.
    const onGridKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
      if (entries.length === 0) return;
      const cols = Math.max(1, columns);
      let next = focusIndex;
      if (e.key === "ArrowRight") next = Math.min(entries.length - 1, focusIndex + 1);
      else if (e.key === "ArrowLeft") next = Math.max(0, focusIndex - 1);
      else if (e.key === "ArrowDown")
        next = Math.min(entries.length - 1, focusIndex + cols);
      else if (e.key === "ArrowUp") next = Math.max(0, focusIndex - cols);
      else if (e.key === "Home") next = 0;
      else if (e.key === "End") next = entries.length - 1;
      else if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        const entry = entries[focusIndex];
        if (entry) {
          onSelect?.(entry.emoji);
        }
        return;
      } else {
        return;
      }
      e.preventDefault();
      setFocusIndex(next);
      const grid = gridRef.current;
      if (grid) {
        const target = grid.querySelectorAll<HTMLButtonElement>(
          "[data-emoji-cell]"
        )[next];
        target?.focus();
      }
    };

    // Container-level shortcuts: `/` focuses search.
    const onContainerKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
      if (
        e.key === "/" &&
        showSearch &&
        document.activeElement !== searchRef.current
      ) {
        e.preventDefault();
        searchRef.current?.focus();
        searchRef.current?.select();
      }
    };

    const footerEntry = hovered ?? entries[focusIndex] ?? null;

    return (
      <div
        ref={ref}
        className={cn(
          "w-[320px] select-none rounded-2xl border border-white/10 bg-neutral-950 p-3 text-white shadow-[0_20px_60px_-20px_rgba(0,0,0,0.6)]",
          className
        )}
        style={style}
        onKeyDown={onContainerKeyDown}
        role="dialog"
        aria-label="Emoji picker"
        {...props}
      >
        {/* Category tab strip */}
        <div
          role="tablist"
          aria-label="Emoji categories"
          className="-mx-1 flex items-center gap-0.5 overflow-x-auto px-1 pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {visibleCategories.map((cat) => {
            const isActive = !query && activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                role="tab"
                aria-selected={isActive}
                type="button"
                onClick={() => {
                  setQuery("");
                  setActiveCategory(cat.id);
                }}
                title={cat.label}
                aria-label={cat.label}
                className={cn(
                  "relative flex h-8 w-8 shrink-0 items-center justify-center rounded-md text-base leading-none transition-colors",
                  "hover:bg-white/[0.06] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-950",
                  isActive ? "text-white" : "text-white/55 hover:text-white"
                )}
                style={
                  {
                    "--tw-ring-color": accentColor,
                  } as React.CSSProperties
                }
              >
                <span aria-hidden>{cat.icon}</span>
                {isActive ? (
                  <span
                    aria-hidden
                    className="absolute -bottom-1.5 left-1/2 h-0.5 w-5 -translate-x-1/2 rounded-full"
                    style={{
                      background: accentColor,
                      boxShadow: `0 0 8px ${accentColor}`,
                    }}
                  />
                ) : null}
              </button>
            );
          })}
        </div>

        {/* Search */}
        {showSearch ? (
          <div className="relative mt-1.5">
            <svg
              width={14}
              height={14}
              viewBox="0 0 24 24"
              fill="none"
              aria-hidden
              className="pointer-events-none absolute left-2.5 top-1/2 -translate-y-1/2 text-white/40"
            >
              <circle
                cx={11}
                cy={11}
                r={7}
                stroke="currentColor"
                strokeWidth={1.8}
              />
              <path
                d="M20 20l-3.5-3.5"
                stroke="currentColor"
                strokeWidth={1.8}
                strokeLinecap="round"
              />
            </svg>
            <input
              ref={searchRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={placeholder}
              aria-label="Search emojis"
              className={cn(
                "w-full rounded-md border border-white/10 bg-white/[0.04] py-1.5 pl-8 pr-2 text-xs text-white placeholder:text-white/35",
                "outline-none transition-colors focus:border-white/20 focus:bg-white/[0.06]",
                "focus:ring-2 focus:ring-offset-0"
              )}
              style={
                {
                  "--tw-ring-color": `${accentColor}40`,
                } as React.CSSProperties
              }
            />
          </div>
        ) : null}

        {/* Grid */}
        <div
          ref={gridRef}
          role="grid"
          aria-label={
            query.trim()
              ? `Search results for ${query.trim()}`
              : visibleCategories.find((c) => c.id === activeCategory)?.label ??
                "Emojis"
          }
          onKeyDown={onGridKeyDown}
          className={cn(
            "mt-2 grid max-h-[200px] gap-0.5 overflow-y-auto pr-0.5",
            "craftui-emoji-picker-scroll"
          )}
          style={{
            gridTemplateColumns: `repeat(${Math.max(1, columns)}, minmax(0, 1fr))`,
          }}
        >
          {entries.length === 0 ? (
            <div
              className="col-span-full flex flex-col items-center gap-1 px-4 py-8 text-center"
              role="status"
            >
              <span aria-hidden className="text-2xl opacity-40">
                🫥
              </span>
              <p className="text-[11px] text-white/45">
                No emoji matches &ldquo;{query.trim()}&rdquo;
              </p>
            </div>
          ) : (
            entries.map((entry, i) => {
              const isFocused = i === focusIndex;
              return (
                <button
                  key={`${entry.emoji}-${i}`}
                  type="button"
                  role="gridcell"
                  data-emoji-cell
                  tabIndex={isFocused ? 0 : -1}
                  onClick={() => onSelect?.(entry.emoji)}
                  onFocus={() => {
                    setFocusIndex(i);
                    setHovered(entry);
                  }}
                  onMouseEnter={() => setHovered(entry)}
                  onMouseLeave={() =>
                    setHovered((h) => (h?.emoji === entry.emoji ? null : h))
                  }
                  aria-label={entry.keywords[0] ?? entry.emoji}
                  className={cn(
                    "flex aspect-square items-center justify-center rounded-md text-lg leading-none",
                    "transition-transform duration-150 hover:scale-[1.2] hover:bg-white/[0.06]",
                    "focus-visible:outline-none focus-visible:bg-white/[0.06] focus-visible:scale-[1.2]"
                  )}
                  style={
                    {
                      "--tw-ring-color": accentColor,
                    } as React.CSSProperties
                  }
                >
                  <span aria-hidden>{entry.emoji}</span>
                </button>
              );
            })
          )}
        </div>

        {/* Footer */}
        <div className="mt-2 flex items-center justify-between gap-2 border-t border-white/[0.06] pt-2">
          <div className="flex min-w-0 items-center gap-2">
            {footerEntry ? (
              <>
                <span aria-hidden className="text-base leading-none">
                  {footerEntry.emoji}
                </span>
                <span className="truncate text-[11px] text-white/55">
                  :{footerEntry.keywords[0] ?? "emoji"}:
                </span>
              </>
            ) : (
              <span className="text-[11px] text-white/35">
                Pick an emoji
              </span>
            )}
          </div>
          <span className="shrink-0 text-[10px] uppercase tracking-widest text-white/30">
            craftui
          </span>
        </div>

        <style>{`
          .craftui-emoji-picker-scroll::-webkit-scrollbar {
            width: 6px;
          }
          .craftui-emoji-picker-scroll::-webkit-scrollbar-track {
            background: transparent;
          }
          .craftui-emoji-picker-scroll::-webkit-scrollbar-thumb {
            background: rgba(255,255,255,0.08);
            border-radius: 9999px;
          }
          .craftui-emoji-picker-scroll::-webkit-scrollbar-thumb:hover {
            background: rgba(255,255,255,0.16);
          }
          @keyframes craftui-emoji-picker-pop {
            0% { transform: scale(0.9); opacity: 0.6; }
            100% { transform: scale(1); opacity: 1; }
          }
        `}</style>
      </div>
    );
  }
);
EmojiPicker.displayName = "EmojiPicker";

export { EmojiPicker };
