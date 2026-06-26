"use client";

import * as React from "react";
import { cn } from "../../lib/cn";

export interface PhoneInputCountry {
  /** ISO-3166 alpha-2 code, e.g. "US". */
  iso: string;
  /** Human-readable country name. */
  name: string;
  /** Dial code WITHOUT the leading +, e.g. "1", "44", "91". */
  dialCode: string;
  /** Pre-computed flag emoji. If omitted it's derived from the ISO code. */
  flag?: string;
}

export interface PhoneInputProps
  extends Omit<
    React.InputHTMLAttributes<HTMLInputElement>,
    "value" | "defaultValue" | "onChange" | "type" | "size"
  > {
  /** Controlled E.164-ish value, e.g. "+14155551234". */
  value?: string;
  /** Uncontrolled initial value. */
  defaultValue?: string;
  /** Fires whenever the canonical value changes (`+<dial><digits>`). */
  onValueChange?: (value: string) => void;
  /** Default country ISO-2 used when no value can be parsed. Default "US". */
  defaultCountry?: string;
  /** Override the built-in country list. */
  countries?: PhoneInputCountry[];
  /** Fires when the user picks a different country from the dropdown. */
  onCountryChange?: (iso: string) => void;
  /** Placeholder for the number portion. */
  placeholder?: string;
}

/* ----- Built-in country list (about 30 of the most-used) ----- */

const DEFAULT_COUNTRIES: PhoneInputCountry[] = [
  { iso: "US", name: "United States", dialCode: "1" },
  { iso: "CA", name: "Canada", dialCode: "1" },
  { iso: "GB", name: "United Kingdom", dialCode: "44" },
  { iso: "AU", name: "Australia", dialCode: "61" },
  { iso: "DE", name: "Germany", dialCode: "49" },
  { iso: "FR", name: "France", dialCode: "33" },
  { iso: "ES", name: "Spain", dialCode: "34" },
  { iso: "IT", name: "Italy", dialCode: "39" },
  { iso: "NL", name: "Netherlands", dialCode: "31" },
  { iso: "SE", name: "Sweden", dialCode: "46" },
  { iso: "NO", name: "Norway", dialCode: "47" },
  { iso: "DK", name: "Denmark", dialCode: "45" },
  { iso: "FI", name: "Finland", dialCode: "358" },
  { iso: "IE", name: "Ireland", dialCode: "353" },
  { iso: "CH", name: "Switzerland", dialCode: "41" },
  { iso: "AT", name: "Austria", dialCode: "43" },
  { iso: "BE", name: "Belgium", dialCode: "32" },
  { iso: "PT", name: "Portugal", dialCode: "351" },
  { iso: "PL", name: "Poland", dialCode: "48" },
  { iso: "BR", name: "Brazil", dialCode: "55" },
  { iso: "MX", name: "Mexico", dialCode: "52" },
  { iso: "AR", name: "Argentina", dialCode: "54" },
  { iso: "IN", name: "India", dialCode: "91" },
  { iso: "JP", name: "Japan", dialCode: "81" },
  { iso: "KR", name: "South Korea", dialCode: "82" },
  { iso: "CN", name: "China", dialCode: "86" },
  { iso: "SG", name: "Singapore", dialCode: "65" },
  { iso: "HK", name: "Hong Kong", dialCode: "852" },
  { iso: "AE", name: "United Arab Emirates", dialCode: "971" },
  { iso: "ZA", name: "South Africa", dialCode: "27" },
];

/* ----- Helpers ----- */

const REGIONAL_INDICATOR_OFFSET = 0x1f1a5;

function isoToFlag(iso: string): string {
  if (!iso || iso.length !== 2) return "";
  const a = iso.toUpperCase().charCodeAt(0);
  const b = iso.toUpperCase().charCodeAt(1);
  if (a < 65 || a > 90 || b < 65 || b > 90) return "";
  return (
    String.fromCodePoint(a + REGIONAL_INDICATOR_OFFSET) +
    String.fromCodePoint(b + REGIONAL_INDICATOR_OFFSET)
  );
}

function getFlag(country: PhoneInputCountry): string {
  return country.flag ?? isoToFlag(country.iso);
}

function stripNonDigits(input: string): string {
  return input.replace(/\D+/g, "");
}

/**
 * Format a digit string into spaced groups.
 * 10 digits → 3-3-4; 7 digits → 3-4; otherwise 3-3-3-…
 */
function formatLocalDigits(digits: string): string {
  if (!digits) return "";
  const len = digits.length;
  if (len <= 3) return digits;
  if (len <= 6) return `${digits.slice(0, 3)} ${digits.slice(3)}`;
  if (len === 7) return `${digits.slice(0, 3)} ${digits.slice(3)}`;
  if (len <= 10) {
    return `${digits.slice(0, 3)} ${digits.slice(3, 6)} ${digits.slice(6)}`;
  }
  // 11+ — group in 3s after the first 3.
  let out = digits.slice(0, 3);
  let i = 3;
  while (i < len) {
    const chunk = digits.slice(i, Math.min(i + 3, len));
    out += ` ${chunk}`;
    i += 3;
  }
  return out;
}

/**
 * Try to parse a canonical "+<dial><digits>" string into the matching country
 * + local digits. Longest dial-code match wins so "+1242" → BS not US.
 */
function parseCanonical(
  canonical: string,
  countries: PhoneInputCountry[]
): { country: PhoneInputCountry | null; localDigits: string } {
  if (!canonical || !canonical.startsWith("+")) {
    return { country: null, localDigits: stripNonDigits(canonical) };
  }
  const all = canonical.slice(1).replace(/\D+/g, "");
  // Sort by dial-code length desc to do longest-prefix match.
  const sorted = [...countries].sort(
    (a, b) => b.dialCode.length - a.dialCode.length
  );
  for (const c of sorted) {
    if (all.startsWith(c.dialCode)) {
      return { country: c, localDigits: all.slice(c.dialCode.length) };
    }
  }
  return { country: null, localDigits: all };
}

/**
 * PhoneInput — international phone number input with a flag-emoji country
 * dropdown on the left and a number field on the right. The dropdown is a
 * searchable popover (filter by name OR dial code), and the input formats
 * digits into readable groups as the user types. Emits the canonical
 * `+<dialCode><digits>` form via `onValueChange`. Pure React + Tailwind,
 * no external phone-number libraries; ships with a small built-in country
 * list (about 30) that callers can fully override.
 */
const PhoneInput = React.forwardRef<HTMLInputElement, PhoneInputProps>(
  (
    {
      value,
      defaultValue,
      onValueChange,
      defaultCountry = "US",
      countries,
      onCountryChange,
      placeholder = "Phone number",
      className,
      style,
      disabled,
      id,
      ...inputProps
    },
    ref
  ) => {
    const countryList = React.useMemo(
      () => (countries && countries.length > 0 ? countries : DEFAULT_COUNTRIES),
      [countries]
    );

    const isControlled = value !== undefined;

    // Seed country + local digits from the initial value (controlled or not).
    const initial = React.useMemo(() => {
      const seed = isControlled ? value : defaultValue ?? "";
      if (seed && seed.length > 0) {
        const parsed = parseCanonical(seed, countryList);
        if (parsed.country) return parsed;
      }
      const fallback =
        countryList.find(
          (c) => c.iso.toUpperCase() === defaultCountry.toUpperCase()
        ) ?? countryList[0]!;
      return { country: fallback, localDigits: "" };
    }, [countryList, defaultCountry, isControlled, value, defaultValue]);

    const [selectedIso, setSelectedIso] = React.useState<string>(
      initial.country?.iso ?? countryList[0]!.iso
    );
    const [localDigits, setLocalDigits] = React.useState<string>(
      initial.localDigits
    );

    const selectedCountry: PhoneInputCountry = React.useMemo(() => {
      return (
        countryList.find((c) => c.iso === selectedIso) ??
        countryList[0]!
      );
    }, [countryList, selectedIso]);

    // Sync from controlled value.
    React.useEffect(() => {
      if (!isControlled) return;
      const parsed = parseCanonical(value ?? "", countryList);
      if (parsed.country && parsed.country.iso !== selectedIso) {
        setSelectedIso(parsed.country.iso);
      }
      setLocalDigits(parsed.localDigits);
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [value, isControlled]);

    const emit = React.useCallback(
      (country: PhoneInputCountry, digits: string) => {
        const canonical = digits ? `+${country.dialCode}${digits}` : "";
        onValueChange?.(canonical);
      },
      [onValueChange]
    );

    const handleDigitsChange = (raw: string) => {
      const digits = stripNonDigits(raw);
      if (!isControlled) setLocalDigits(digits);
      emit(selectedCountry, digits);
    };

    const handleCountrySelect = (next: PhoneInputCountry) => {
      setSelectedIso(next.iso);
      onCountryChange?.(next.iso);
      emit(next, localDigits);
      setOpen(false);
      setSearch("");
      // Refocus the number input after picking.
      window.setTimeout(() => inputElRef.current?.focus(), 0);
    };

    /* ----- Popover state ----- */

    const [open, setOpen] = React.useState(false);
    const [search, setSearch] = React.useState("");
    const [activeIdx, setActiveIdx] = React.useState(0);
    const popoverRef = React.useRef<HTMLDivElement | null>(null);
    const triggerRef = React.useRef<HTMLButtonElement | null>(null);
    const searchRef = React.useRef<HTMLInputElement | null>(null);
    const inputElRef = React.useRef<HTMLInputElement | null>(null);
    const listboxId = React.useId();

    React.useImperativeHandle(ref, () => inputElRef.current as HTMLInputElement);

    const filtered = React.useMemo(() => {
      const q = search.trim().toLowerCase();
      if (!q) return countryList;
      const qDigits = q.replace(/\D+/g, "");
      return countryList.filter((c) => {
        if (c.name.toLowerCase().includes(q)) return true;
        if (c.iso.toLowerCase().includes(q)) return true;
        if (qDigits && c.dialCode.includes(qDigits)) return true;
        return false;
      });
    }, [search, countryList]);

    React.useEffect(() => {
      setActiveIdx(0);
    }, [search, open]);

    // Click-outside / Escape to close.
    React.useEffect(() => {
      if (!open) return;
      const onDown = (e: MouseEvent) => {
        const t = e.target as Node | null;
        if (!t) return;
        if (popoverRef.current?.contains(t)) return;
        if (triggerRef.current?.contains(t)) return;
        setOpen(false);
      };
      const onKey = (e: KeyboardEvent) => {
        if (e.key === "Escape") {
          setOpen(false);
          triggerRef.current?.focus();
        }
      };
      document.addEventListener("mousedown", onDown);
      document.addEventListener("keydown", onKey);
      return () => {
        document.removeEventListener("mousedown", onDown);
        document.removeEventListener("keydown", onKey);
      };
    }, [open]);

    // Focus search when opening.
    React.useEffect(() => {
      if (open) {
        window.setTimeout(() => searchRef.current?.focus(), 0);
      }
    }, [open]);

    const handleListKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setActiveIdx((i) => Math.min(filtered.length - 1, i + 1));
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setActiveIdx((i) => Math.max(0, i - 1));
      } else if (e.key === "Enter") {
        e.preventDefault();
        const pick = filtered[activeIdx];
        if (pick) handleCountrySelect(pick);
      }
    };

    const displayValue = formatLocalDigits(localDigits);
    const flag = getFlag(selectedCountry);

    return (
      <div
        className={cn(
          "craftui-phone-input-root relative inline-flex w-full max-w-sm items-stretch overflow-hidden rounded-lg border border-white/10 bg-neutral-900 text-white shadow-[0_1px_0_rgba(255,255,255,0.04)_inset,0_8px_24px_-12px_rgba(0,0,0,0.5)] transition-colors focus-within:border-sky-300/40 focus-within:ring-2 focus-within:ring-sky-300/20",
          disabled && "cursor-not-allowed opacity-60",
          className
        )}
        style={style}
      >
        {/* Country trigger */}
        <button
          ref={triggerRef}
          type="button"
          onClick={() => !disabled && setOpen((o) => !o)}
          disabled={disabled}
          aria-haspopup="listbox"
          aria-expanded={open}
          aria-controls={listboxId}
          aria-label={`Country code: ${selectedCountry.name}, +${selectedCountry.dialCode}`}
          className={cn(
            "flex shrink-0 items-center gap-1.5 pl-3 pr-2 text-sm font-medium text-white/85 transition-colors hover:bg-white/[0.04] focus-visible:bg-white/[0.05] focus-visible:outline-none",
            disabled && "pointer-events-none"
          )}
        >
          <span aria-hidden className="text-base leading-none">
            {flag || "\u{1F3F3}"}
          </span>
          <span className="font-mono text-[12px] tabular-nums text-white/70">
            +{selectedCountry.dialCode}
          </span>
          <svg
            width={10}
            height={10}
            viewBox="0 0 24 24"
            fill="none"
            aria-hidden
            className={cn(
              "ml-0.5 shrink-0 text-white/40 transition-transform duration-200",
              open ? "rotate-180" : "rotate-0"
            )}
          >
            <path
              d="M6 9l6 6 6-6"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>

        {/* Vertical divider */}
        <span
          aria-hidden
          className="my-2 w-px shrink-0 bg-white/10"
        />

        {/* Number input */}
        <input
          ref={inputElRef}
          id={id}
          type="tel"
          inputMode="tel"
          autoComplete="tel"
          value={displayValue}
          onChange={(e) => handleDigitsChange(e.target.value)}
          placeholder={placeholder}
          disabled={disabled}
          className="min-w-0 flex-1 bg-transparent px-3 py-2 text-sm text-white placeholder:text-white/35 focus:outline-none disabled:cursor-not-allowed"
          {...inputProps}
        />

        {/* Popover */}
        {open ? (
          <div
            ref={popoverRef}
            className="craftui-phone-input-pop absolute left-0 top-full z-50 mt-1 w-72 overflow-hidden rounded-xl border border-white/10 bg-neutral-950 text-white shadow-[0_20px_50px_-20px_rgba(0,0,0,0.8)]"
            role="dialog"
          >
            <div className="border-b border-white/10 p-2">
              <div className="relative">
                <svg
                  width={13}
                  height={13}
                  viewBox="0 0 24 24"
                  fill="none"
                  aria-hidden
                  className="pointer-events-none absolute left-2 top-1/2 -translate-y-1/2 text-white/40"
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
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  onKeyDown={handleListKeyDown}
                  placeholder="Search country or code"
                  className="w-full rounded-md bg-white/[0.04] py-1.5 pl-7 pr-2 text-xs text-white placeholder:text-white/35 focus:bg-white/[0.06] focus:outline-none"
                  role="combobox"
                  aria-controls={listboxId}
                  aria-expanded={open}
                  aria-autocomplete="list"
                />
              </div>
            </div>
            <ul
              id={listboxId}
              role="listbox"
              aria-label="Countries"
              className="craftui-phone-input-list max-h-72 overflow-y-auto py-1"
            >
              {filtered.length === 0 ? (
                <li className="px-3 py-4 text-center text-xs text-white/45">
                  No countries found
                </li>
              ) : (
                filtered.map((c, i) => {
                  const isActive = i === activeIdx;
                  const isSelected = c.iso === selectedIso;
                  return (
                    <li
                      key={c.iso}
                      role="option"
                      aria-selected={isSelected}
                      onMouseEnter={() => setActiveIdx(i)}
                      onMouseDown={(e) => {
                        // Prevent input blur stealing the click.
                        e.preventDefault();
                        handleCountrySelect(c);
                      }}
                      className={cn(
                        "flex cursor-pointer items-center gap-2 px-3 py-1.5 text-sm transition-colors",
                        isActive
                          ? "bg-white/[0.06] text-white"
                          : "text-white/80 hover:bg-white/[0.04]"
                      )}
                    >
                      <span aria-hidden className="text-base leading-none">
                        {getFlag(c)}
                      </span>
                      <span className="flex-1 truncate">{c.name}</span>
                      <span className="font-mono text-[11px] tabular-nums text-white/45">
                        +{c.dialCode}
                      </span>
                      {isSelected ? (
                        <svg
                          width={12}
                          height={12}
                          viewBox="0 0 24 24"
                          fill="none"
                          aria-hidden
                          className="text-sky-300"
                        >
                          <path
                            d="M5 12l5 5L20 7"
                            stroke="currentColor"
                            strokeWidth={2.4}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      ) : null}
                    </li>
                  );
                })
              )}
            </ul>
          </div>
        ) : null}

        <style>{`
          .craftui-phone-input-list::-webkit-scrollbar {
            width: 8px;
          }
          .craftui-phone-input-list::-webkit-scrollbar-thumb {
            background: rgba(255,255,255,0.08);
            border-radius: 9999px;
          }
          .craftui-phone-input-list::-webkit-scrollbar-thumb:hover {
            background: rgba(255,255,255,0.16);
          }
          .craftui-phone-input-pop {
            animation: craftui-phone-input-in 140ms cubic-bezier(0.22,1,0.36,1) both;
          }
          @keyframes craftui-phone-input-in {
            from { opacity: 0; transform: translateY(-4px); }
            to { opacity: 1; transform: translateY(0); }
          }
        `}</style>
      </div>
    );
  }
);
PhoneInput.displayName = "PhoneInput";

export { PhoneInput };
