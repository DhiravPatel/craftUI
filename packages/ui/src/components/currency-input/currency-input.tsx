"use client";

import * as React from "react";
import { cn } from "../../lib/cn";

export interface CurrencyInputProps
  extends Omit<
    React.InputHTMLAttributes<HTMLInputElement>,
    "value" | "defaultValue" | "onChange" | "type"
  > {
  /** Controlled numeric value. Pass `null` for empty. */
  value?: number | null;
  /** Initial numeric value (uncontrolled). */
  defaultValue?: number | null;
  /** Fires whenever the parsed numeric value changes. */
  onValueChange?: (value: number | null) => void;
  /** ISO 4217 currency code, e.g. "USD". Default "USD". */
  currency?: string;
  /** Fires when the user picks a different currency from the selector. */
  onCurrencyChange?: (currency: string) => void;
  /** BCP-47 locale tag used for formatting. Default "en-US". */
  locale?: string;
  /** Minimum allowed numeric value. */
  min?: number;
  /** Maximum allowed numeric value. */
  max?: number;
  /** Show a small dropdown on the right to pick the currency. */
  showCurrencySelector?: boolean;
  /** Currencies available in the selector. */
  currencies?: string[];
  /** Placeholder text for the input. */
  placeholder?: string;
}

const DEFAULT_CURRENCIES = ["USD", "EUR", "GBP", "JPY", "CAD", "AUD"];

interface FormatParts {
  symbol: string;
  group: string;
  decimal: string;
  fractionDigits: number;
}

function getFormatParts(locale: string, currency: string): FormatParts {
  try {
    const fmt = new Intl.NumberFormat(locale, {
      style: "currency",
      currency,
      currencyDisplay: "symbol",
    });
    const parts = fmt.formatToParts(1234567.89);
    let symbol = "";
    let group = ",";
    let decimal = ".";
    for (const p of parts) {
      if (p.type === "currency") symbol = p.value;
      else if (p.type === "group") group = p.value;
      else if (p.type === "decimal") decimal = p.value;
    }
    const resolved = fmt.resolvedOptions();
    const fractionDigits =
      typeof resolved.maximumFractionDigits === "number"
        ? resolved.maximumFractionDigits
        : 2;
    return { symbol, group, decimal, fractionDigits };
  } catch {
    return { symbol: currency, group: ",", decimal: ".", fractionDigits: 2 };
  }
}

function clamp(n: number, min?: number, max?: number): number {
  let out = n;
  if (typeof min === "number" && out < min) out = min;
  if (typeof max === "number" && out > max) out = max;
  return out;
}

/**
 * Parse a user-typed string into a number, given the locale's decimal /
 * group separators. Keeps only digits, the first decimal separator, and a
 * single leading minus sign. Returns `null` for empty / unparseable input.
 */
function parseTyped(
  raw: string,
  parts: FormatParts,
  allowNegative: boolean
): number | null {
  if (!raw) return null;
  let negative = false;
  let body = raw;
  if (allowNegative && body.trim().startsWith("-")) {
    negative = true;
    body = body.replace("-", "");
  }
  // Drop currency symbol, spaces, and group separators.
  body = body.split(parts.symbol).join("");
  body = body.replace(/\s+/g, "");
  body = body.split(parts.group).join("");

  // Keep only digits + first occurrence of the decimal sep.
  let seenDecimal = false;
  let cleaned = "";
  for (const ch of body) {
    if (ch >= "0" && ch <= "9") {
      cleaned += ch;
    } else if (ch === parts.decimal && !seenDecimal) {
      cleaned += ".";
      seenDecimal = true;
    }
  }
  if (!cleaned || cleaned === ".") return null;
  const n = Number(cleaned);
  if (!Number.isFinite(n)) return null;
  return negative ? -n : n;
}

/**
 * Format a number for display *while typing* — grouped digits, locale
 * decimal separator, but never with a trailing zero-padded fractional part
 * (so "12" stays "12", not "12.00", until the user blurs).
 */
function formatTyping(n: number, parts: FormatParts): string {
  const negative = n < 0;
  const abs = Math.abs(n);
  const str = String(abs);
  const dot = str.indexOf(".");
  const intPart = dot === -1 ? str : str.slice(0, dot);
  const fracPart = dot === -1 ? "" : str.slice(dot + 1);
  const grouped = intPart.replace(/\B(?=(\d{3})+(?!\d))/g, parts.group);
  const out = fracPart ? `${grouped}${parts.decimal}${fracPart}` : grouped;
  return negative ? `-${out}` : out;
}

/**
 * Format a number for display on blur — uses Intl.NumberFormat for the
 * locale's preferred grouping + fraction digits, then strips the currency
 * symbol (we render the symbol as a prefix inside the input).
 */
function formatBlurred(
  n: number,
  locale: string,
  currency: string,
  parts: FormatParts
): string {
  try {
    const formatted = new Intl.NumberFormat(locale, {
      style: "currency",
      currency,
      currencyDisplay: "symbol",
    }).format(n);
    // Strip the symbol and any non-breaking spaces around it.
    return formatted
      .split(parts.symbol)
      .join("")
      .replace(/ /g, " ")
      .trim();
  } catch {
    return formatTyping(n, parts);
  }
}

/**
 * CurrencyInput — a locale-aware money field. Numbers are grouped as the
 * user types, the locale's decimal separator is respected, and on blur the
 * value re-formats with the currency's natural fraction digits. The
 * currency symbol is rendered as a prefix *inside* the input, derived from
 * `Intl.NumberFormat.formatToParts`, so the input stays a clean numeric
 * editor. Optional right-side dropdown lets the user switch currency.
 * Works controlled (`value` + `onValueChange`) or uncontrolled.
 * Self-contained — no external dependencies.
 */
const CurrencyInput = React.forwardRef<HTMLInputElement, CurrencyInputProps>(
  (
    {
      value,
      defaultValue = null,
      onValueChange,
      currency: currencyProp,
      onCurrencyChange,
      locale = "en-US",
      min,
      max,
      showCurrencySelector = false,
      currencies = DEFAULT_CURRENCIES,
      placeholder = "0.00",
      className,
      disabled,
      readOnly,
      onFocus,
      onBlur,
      id,
      "aria-label": ariaLabel,
      ...rest
    },
    ref
  ) => {
    // Controlled / uncontrolled currency.
    const isCurrencyControlled = currencyProp !== undefined;
    const [internalCurrency, setInternalCurrency] = React.useState<string>(
      currencyProp ?? "USD"
    );
    const currency = isCurrencyControlled
      ? (currencyProp as string)
      : internalCurrency;

    // Controlled / uncontrolled numeric value.
    const isValueControlled = value !== undefined;
    const [internalValue, setInternalValue] = React.useState<number | null>(
      defaultValue ?? null
    );
    const numericValue = isValueControlled
      ? (value as number | null)
      : internalValue;

    const parts = React.useMemo(
      () => getFormatParts(locale, currency),
      [locale, currency]
    );

    const allowNegative = typeof min === "number" ? min < 0 : true;

    const [focused, setFocused] = React.useState(false);
    const [display, setDisplay] = React.useState<string>(() =>
      numericValue == null
        ? ""
        : formatBlurred(numericValue, locale, currency, parts)
    );

    // Re-derive display from numericValue when not focused (e.g. parent
    // updates value, or currency / locale changes).
    React.useEffect(() => {
      if (focused) return;
      setDisplay(
        numericValue == null
          ? ""
          : formatBlurred(numericValue, locale, currency, parts)
      );
    }, [numericValue, locale, currency, parts, focused]);

    // Selector open state.
    const [selectorOpen, setSelectorOpen] = React.useState(false);
    const selectorRef = React.useRef<HTMLDivElement | null>(null);
    React.useEffect(() => {
      if (!selectorOpen) return;
      const onDocPointer = (e: PointerEvent) => {
        if (
          selectorRef.current &&
          !selectorRef.current.contains(e.target as Node)
        ) {
          setSelectorOpen(false);
        }
      };
      const onKey = (e: KeyboardEvent) => {
        if (e.key === "Escape") setSelectorOpen(false);
      };
      document.addEventListener("pointerdown", onDocPointer);
      document.addEventListener("keydown", onKey);
      return () => {
        document.removeEventListener("pointerdown", onDocPointer);
        document.removeEventListener("keydown", onKey);
      };
    }, [selectorOpen]);

    const commitValue = (next: number | null) => {
      if (!isValueControlled) setInternalValue(next);
      onValueChange?.(next);
    };

    const handleInput: React.ChangeEventHandler<HTMLInputElement> = (e) => {
      const raw = e.target.value;
      // Empty → null.
      if (raw.trim() === "") {
        setDisplay("");
        commitValue(null);
        return;
      }
      const parsed = parseTyped(raw, parts, allowNegative);
      if (parsed === null) {
        // Allow lone separator while typing (e.g. "0." → keep showing it).
        setDisplay(raw);
        return;
      }
      const clamped = clamp(parsed, min, max);
      // Re-display with grouped formatting, but preserve the user's
      // trailing decimal separator if they just typed it.
      const endsWithSep = raw.trimEnd().endsWith(parts.decimal);
      const formatted = endsWithSep
        ? formatTyping(Math.trunc(clamped), parts) + parts.decimal
        : formatTyping(clamped, parts);
      setDisplay(formatted);
      commitValue(clamped);
    };

    const handleFocus: React.FocusEventHandler<HTMLInputElement> = (e) => {
      setFocused(true);
      if (numericValue != null) {
        // Show grouped (no padded zeros) — feels nicer to edit than the
        // blurred form, but still readable.
        setDisplay(formatTyping(numericValue, parts));
      }
      onFocus?.(e);
    };

    const handleBlur: React.FocusEventHandler<HTMLInputElement> = (e) => {
      setFocused(false);
      if (numericValue == null) {
        setDisplay("");
      } else {
        setDisplay(formatBlurred(numericValue, locale, currency, parts));
      }
      onBlur?.(e);
    };

    const pickCurrency = (next: string) => {
      setSelectorOpen(false);
      if (next === currency) return;
      if (!isCurrencyControlled) setInternalCurrency(next);
      onCurrencyChange?.(next);
    };

    const showSymbol = parts.symbol && parts.symbol !== currency;

    return (
      <div
        className={cn(
          "group/cu relative inline-flex w-full items-stretch rounded-lg border bg-neutral-900 transition-colors",
          focused
            ? "border-sky-300/50 ring-2 ring-sky-300/20"
            : "border-white/10 hover:border-white/15",
          disabled && "cursor-not-allowed opacity-60",
          className
        )}
      >
        <div className="pointer-events-none flex select-none items-center pl-3.5 pr-1 text-sm font-medium text-white/55 tabular-nums">
          {showSymbol ? parts.symbol : currency}
        </div>
        <input
          ref={ref}
          id={id}
          type="text"
          inputMode="decimal"
          autoComplete="off"
          spellCheck={false}
          aria-label={ariaLabel ?? `Amount in ${currency}`}
          {...rest}
          disabled={disabled}
          readOnly={readOnly}
          value={display}
          onChange={handleInput}
          onFocus={handleFocus}
          onBlur={handleBlur}
          placeholder={placeholder}
          className={cn(
            "min-w-0 flex-1 bg-transparent py-2.5 pl-1 pr-2 text-sm text-white tabular-nums outline-none placeholder:text-white/30"
          )}
        />
        {showCurrencySelector ? (
          <div
            ref={selectorRef}
            className="relative flex items-center pr-1.5"
          >
            <button
              type="button"
              onClick={() => !disabled && setSelectorOpen((o) => !o)}
              disabled={disabled || readOnly}
              aria-haspopup="listbox"
              aria-expanded={selectorOpen}
              aria-label={`Currency: ${currency}`}
              className={cn(
                "flex h-7 items-center gap-1 rounded-md px-2 text-[11px] font-medium tabular-nums transition-colors",
                "border border-white/10 bg-white/[0.04] text-white/85",
                "hover:bg-white/[0.08] hover:text-white",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-300/40",
                (disabled || readOnly) && "cursor-not-allowed opacity-60"
              )}
            >
              <span>{currency}</span>
              <svg
                width={10}
                height={10}
                viewBox="0 0 24 24"
                fill="none"
                aria-hidden
                className={cn(
                  "shrink-0 text-white/45 transition-transform duration-200",
                  selectorOpen ? "rotate-180" : "rotate-0"
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
            {selectorOpen ? (
              <ul
                role="listbox"
                aria-label="Currencies"
                className={cn(
                  "absolute right-0 top-[calc(100%+6px)] z-30 w-32 overflow-hidden rounded-lg border border-white/10",
                  "bg-neutral-950/95 p-1 shadow-[0_20px_60px_-20px_rgba(0,0,0,0.8)] backdrop-blur",
                  "animate-craftui-currency-input-pop"
                )}
              >
                {currencies.map((c) => {
                  const selected = c === currency;
                  return (
                    <li key={c} role="presentation">
                      <button
                        type="button"
                        role="option"
                        aria-selected={selected}
                        onClick={() => pickCurrency(c)}
                        className={cn(
                          "flex w-full items-center justify-between rounded-md px-2 py-1.5 text-left text-xs transition-colors",
                          selected
                            ? "bg-white/[0.07] text-white"
                            : "text-white/80 hover:bg-white/[0.05] hover:text-white"
                        )}
                      >
                        <span className="font-medium tabular-nums">{c}</span>
                        <span className="text-white/45">
                          {getFormatParts(locale, c).symbol}
                        </span>
                      </button>
                    </li>
                  );
                })}
              </ul>
            ) : null}
          </div>
        ) : null}

        <style>{`
          @keyframes craftui-currency-input-pop {
            0% { opacity: 0; transform: translateY(-4px) scale(0.98); }
            100% { opacity: 1; transform: translateY(0) scale(1); }
          }
          .animate-craftui-currency-input-pop {
            animation: craftui-currency-input-pop 140ms cubic-bezier(0.22,1,0.36,1) both;
            transform-origin: top right;
          }
        `}</style>
      </div>
    );
  }
);
CurrencyInput.displayName = "CurrencyInput";

export { CurrencyInput };
