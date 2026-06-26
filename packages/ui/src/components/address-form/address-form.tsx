"use client";

import * as React from "react";
import { cn } from "../../lib/cn";

/** The shape of the address object the form reads and writes. */
export interface AddressFormValue {
  /** Optional recipient full name (only rendered when `showName` is true). */
  name?: string;
  /** Optional company name (only rendered when `showCompany` is true). */
  company?: string;
  /** Street address line 1. Required at submit time. */
  line1?: string;
  /** Apartment, suite, unit, floor, etc. */
  line2?: string;
  /** City / locality. Required at submit time. */
  city?: string;
  /** State / province / county / region. */
  region?: string;
  /** Postal / ZIP code. Required at submit time. */
  postalCode?: string;
  /** ISO 3166-1 alpha-2 country code (e.g. `"US"`). Required at submit time. */
  country?: string;
}

/** Which field on the address triggered the change. */
export type AddressFormField = keyof AddressFormValue;

/** Country entry rendered in the country picker. */
export interface AddressFormCountry {
  /** ISO 3166-1 alpha-2 code. */
  iso: string;
  /** Localized country name shown in the dropdown. */
  name: string;
  /** Emoji flag (optional — falls back to the iso code). */
  flag?: string;
}

/** Map of field-name -> inline error message returned by the form's validator. */
export type AddressFormErrors = Partial<Record<AddressFormField, string>>;

export interface AddressFormProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange" | "onSubmit" | "title" | "defaultValue"> {
  /** Controlled value. */
  value?: AddressFormValue;
  /** Initial value when uncontrolled. */
  defaultValue?: AddressFormValue;
  /** Fires on every keystroke / picker change with the full address object. */
  onChange?: (value: AddressFormValue) => void;
  /**
   * Submit handler. Can return a promise — the Save button shows
   * "Saving…" while it resolves. Throw to surface an inline error.
   */
  onSubmit?: (value: AddressFormValue) => void | Promise<void>;
  /** Header title. Default `"Shipping address"`. */
  title?: React.ReactNode;
  /** Optional one-line description under the title. */
  description?: React.ReactNode;
  /** Override the built-in compact country list. */
  countries?: AddressFormCountry[];
  /**
   * Map ISO code -> region label ("State", "Province", "County", …).
   * Used to swap the region field's label based on the picked country.
   */
  regionLabel?: (countryIso: string) => string;
  /** Render a Full name field at the top. Default `false`. */
  showName?: boolean;
  /** Render a Company field below the name. Default `false`. */
  showCompany?: boolean;
  /** Submit button label. Default `"Save address"`. */
  submitLabel?: string;
  /** Hide the submit button entirely. Default `true` (shown). */
  showSubmit?: boolean;
  /** Accent color used for focus rings and the submit button. */
  accentColor?: string;
}

const DEFAULT_ACCENT = "rgb(125, 211, 252)";

/** Compact country list — same set we use for the PhoneInput picker. */
const DEFAULT_COUNTRIES: AddressFormCountry[] = [
  { iso: "US", name: "United States", flag: "🇺🇸" },
  { iso: "CA", name: "Canada", flag: "🇨🇦" },
  { iso: "GB", name: "United Kingdom", flag: "🇬🇧" },
  { iso: "IE", name: "Ireland", flag: "🇮🇪" },
  { iso: "DE", name: "Germany", flag: "🇩🇪" },
  { iso: "FR", name: "France", flag: "🇫🇷" },
  { iso: "ES", name: "Spain", flag: "🇪🇸" },
  { iso: "IT", name: "Italy", flag: "🇮🇹" },
  { iso: "NL", name: "Netherlands", flag: "🇳🇱" },
  { iso: "SE", name: "Sweden", flag: "🇸🇪" },
  { iso: "NO", name: "Norway", flag: "🇳🇴" },
  { iso: "DK", name: "Denmark", flag: "🇩🇰" },
  { iso: "FI", name: "Finland", flag: "🇫🇮" },
  { iso: "PT", name: "Portugal", flag: "🇵🇹" },
  { iso: "CH", name: "Switzerland", flag: "🇨🇭" },
  { iso: "AT", name: "Austria", flag: "🇦🇹" },
  { iso: "PL", name: "Poland", flag: "🇵🇱" },
  { iso: "BR", name: "Brazil", flag: "🇧🇷" },
  { iso: "MX", name: "Mexico", flag: "🇲🇽" },
  { iso: "AR", name: "Argentina", flag: "🇦🇷" },
  { iso: "AU", name: "Australia", flag: "🇦🇺" },
  { iso: "NZ", name: "New Zealand", flag: "🇳🇿" },
  { iso: "JP", name: "Japan", flag: "🇯🇵" },
  { iso: "KR", name: "South Korea", flag: "🇰🇷" },
  { iso: "SG", name: "Singapore", flag: "🇸🇬" },
  { iso: "IN", name: "India", flag: "🇮🇳" },
  { iso: "AE", name: "United Arab Emirates", flag: "🇦🇪" },
  { iso: "ZA", name: "South Africa", flag: "🇿🇦" },
];

/** Default region label per country. Falls back to "State / Region". */
const DEFAULT_REGION_LABEL = (iso: string): string => {
  switch (iso) {
    case "US":
    case "MX":
    case "BR":
    case "IN":
    case "AU":
      return "State";
    case "CA":
    case "IE":
    case "ZA":
    case "AR":
      return "Province";
    case "GB":
      return "County";
    case "JP":
      return "Prefecture";
    case "DE":
    case "AT":
    case "CH":
      return "State";
    case "NL":
    case "FR":
    case "ES":
    case "IT":
      return "Region";
    default:
      return "State / Region";
  }
};

const REQUIRED_FIELDS: AddressFormField[] = ["line1", "city", "postalCode", "country"];

/**
 * AddressForm — a self-contained multi-field address form for billing,
 * shipping, contract, and KYC flows. Wires every field to a single
 * `AddressFormValue` object so callers don't have to manage state for each
 * input. Includes a sleek dark-themed country picker (matches our
 * PhoneInput's style), keyboard-navigable with type-ahead filtering, that
 * automatically swaps the region field's label between "State", "Province",
 * "Prefecture", etc. based on the selected country.
 *
 * Validates on submit (line1, city, postal code, country are required) and
 * surfaces inline errors per field. `onSubmit` can return a promise — the
 * Save button shows "Saving…" while it resolves. Throw inside `onSubmit` to
 * surface a top-level error toast inside the form.
 */
const AddressForm = React.forwardRef<HTMLDivElement, AddressFormProps>(
  (
    {
      value,
      defaultValue,
      onChange,
      onSubmit,
      title = "Shipping address",
      description,
      countries,
      regionLabel,
      showName = false,
      showCompany = false,
      submitLabel = "Save address",
      showSubmit = true,
      accentColor = DEFAULT_ACCENT,
      className,
      style,
      ...props
    },
    ref
  ) => {
    const isControlled = value !== undefined;
    const [internalValue, setInternalValue] = React.useState<AddressFormValue>(
      () => defaultValue ?? {}
    );
    const current: AddressFormValue = isControlled ? value : internalValue;

    const [errors, setErrors] = React.useState<AddressFormErrors>({});
    const [formError, setFormError] = React.useState<string | null>(null);
    const [saving, setSaving] = React.useState(false);

    const list = countries && countries.length > 0 ? countries : DEFAULT_COUNTRIES;
    const resolveRegionLabel = regionLabel ?? DEFAULT_REGION_LABEL;
    const currentCountry = list.find((c) => c.iso === current.country);
    const regionFieldLabel = current.country
      ? resolveRegionLabel(current.country)
      : "State / Region";

    const update = (patch: Partial<AddressFormValue>) => {
      const next: AddressFormValue = { ...current, ...patch };
      if (!isControlled) setInternalValue(next);
      onChange?.(next);
      // Clear errors for any field the user just touched.
      const cleared: AddressFormErrors = { ...errors };
      let changed = false;
      for (const k of Object.keys(patch) as AddressFormField[]) {
        if (cleared[k]) {
          delete cleared[k];
          changed = true;
        }
      }
      if (changed) setErrors(cleared);
      if (formError) setFormError(null);
    };

    const validate = (v: AddressFormValue): AddressFormErrors => {
      const next: AddressFormErrors = {};
      for (const f of REQUIRED_FIELDS) {
        const raw = v[f];
        if (!raw || raw.trim().length === 0) {
          next[f] =
            f === "line1"
              ? "Street address is required."
              : f === "city"
              ? "City is required."
              : f === "postalCode"
              ? "Postal code is required."
              : "Country is required.";
        }
      }
      return next;
    };

    const handleSubmit = async (e?: React.FormEvent) => {
      e?.preventDefault();
      if (saving) return;
      const next = validate(current);
      setErrors(next);
      if (Object.keys(next).length > 0) return;
      if (!onSubmit) return;
      try {
        setSaving(true);
        setFormError(null);
        await onSubmit(current);
      } catch (err) {
        setFormError(err instanceof Error ? err.message : "Could not save address.");
      } finally {
        setSaving(false);
      }
    };

    return (
      <div
        ref={ref}
        className={cn(
          "w-full max-w-md rounded-2xl border border-white/10 bg-neutral-950 p-5 text-white shadow-[0_20px_60px_-20px_rgba(0,0,0,0.6)]",
          className
        )}
        style={style}
        {...props}
      >
        <div className="mb-4 flex items-start justify-between gap-3">
          <div className="min-w-0">
            <h3 className="truncate text-base font-semibold leading-tight text-white">
              {title}
            </h3>
            {description ? (
              <p className="mt-0.5 truncate text-xs text-white/55">{description}</p>
            ) : null}
          </div>
        </div>

        <form
          noValidate
          onSubmit={handleSubmit}
          className="flex flex-col gap-3"
          aria-describedby={formError ? "craftui-address-form-error" : undefined}
        >
          {showName ? (
            <Field
              id="craftui-address-form-name"
              label="Full name"
              value={current.name ?? ""}
              onChange={(v) => update({ name: v })}
              autoComplete="name"
              accentColor={accentColor}
            />
          ) : null}

          {showCompany ? (
            <Field
              id="craftui-address-form-company"
              label="Company"
              value={current.company ?? ""}
              onChange={(v) => update({ company: v })}
              autoComplete="organization"
              accentColor={accentColor}
            />
          ) : null}

          <Field
            id="craftui-address-form-line1"
            label="Street address"
            value={current.line1 ?? ""}
            onChange={(v) => update({ line1: v })}
            autoComplete="address-line1"
            error={errors.line1}
            required
            accentColor={accentColor}
          />

          <Field
            id="craftui-address-form-line2"
            label="Apt, suite, etc."
            value={current.line2 ?? ""}
            onChange={(v) => update({ line2: v })}
            autoComplete="address-line2"
            optional
            accentColor={accentColor}
          />

          <div className="grid grid-cols-2 gap-3">
            <Field
              id="craftui-address-form-city"
              label="City"
              value={current.city ?? ""}
              onChange={(v) => update({ city: v })}
              autoComplete="address-level2"
              error={errors.city}
              required
              accentColor={accentColor}
            />
            <Field
              id="craftui-address-form-region"
              label={regionFieldLabel}
              value={current.region ?? ""}
              onChange={(v) => update({ region: v })}
              autoComplete="address-level1"
              accentColor={accentColor}
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <Field
              id="craftui-address-form-postal"
              label="Postal code"
              value={current.postalCode ?? ""}
              onChange={(v) => update({ postalCode: v })}
              autoComplete="postal-code"
              error={errors.postalCode}
              required
              accentColor={accentColor}
            />
            <CountryPicker
              id="craftui-address-form-country"
              countries={list}
              value={currentCountry}
              onChange={(iso) => update({ country: iso })}
              error={errors.country}
              accentColor={accentColor}
            />
          </div>

          {formError ? (
            <p
              id="craftui-address-form-error"
              role="alert"
              className="rounded-md border border-rose-400/30 bg-rose-500/10 px-3 py-2 text-[12px] text-rose-200"
            >
              {formError}
            </p>
          ) : null}

          {showSubmit ? (
            <div className="mt-2 flex justify-end">
              <button
                type="submit"
                disabled={saving}
                className="inline-flex h-9 items-center justify-center rounded-lg px-4 text-sm font-medium text-neutral-950 transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-950"
                style={{
                  background: accentColor,
                  boxShadow: `0 6px 18px -6px ${accentColor}`,
                  ["--tw-ring-color" as string]: accentColor,
                } as React.CSSProperties}
              >
                {saving ? "Saving…" : submitLabel}
              </button>
            </div>
          ) : null}
        </form>

        <style>{`
          @keyframes craftui-address-form-pop-in {
            0% { opacity: 0; transform: translateY(-2px) scale(0.98); }
            100% { opacity: 1; transform: translateY(0) scale(1); }
          }
          .craftui-address-form-popover {
            animation: craftui-address-form-pop-in 140ms cubic-bezier(0.22, 1, 0.36, 1) both;
          }
        `}</style>
      </div>
    );
  }
);
AddressForm.displayName = "AddressForm";

/* ---------------- internals ---------------- */

interface FieldProps {
  id: string;
  label: string;
  value: string;
  onChange: (next: string) => void;
  autoComplete?: string;
  error?: string;
  required?: boolean;
  optional?: boolean;
  accentColor: string;
}

function Field({
  id,
  label,
  value,
  onChange,
  autoComplete,
  error,
  required,
  optional,
  accentColor,
}: FieldProps) {
  const errorId = `${id}-error`;
  return (
    <div className="flex flex-col gap-1.5">
      <label
        htmlFor={id}
        className="flex items-center justify-between text-[11px] font-medium uppercase tracking-wide text-white/55"
      >
        <span>{label}</span>
        {optional ? (
          <span className="font-normal normal-case tracking-normal text-white/30">
            optional
          </span>
        ) : null}
      </label>
      <input
        id={id}
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        autoComplete={autoComplete}
        aria-required={required || undefined}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? errorId : undefined}
        className={cn(
          "h-9 w-full rounded-lg border bg-neutral-900 px-3 text-sm text-white placeholder:text-white/30 outline-none transition-colors",
          error
            ? "border-rose-400/60 focus:border-rose-400/80 focus:ring-2 focus:ring-rose-400/30"
            : "border-white/10 hover:border-white/20 focus:border-white/30"
        )}
        style={
          !error
            ? ({
                ["--tw-ring-color" as string]: accentColor,
              } as React.CSSProperties)
            : undefined
        }
        onFocus={(e) => {
          if (!error) {
            e.currentTarget.style.boxShadow = `0 0 0 2px ${accentColor}40`;
          }
        }}
        onBlur={(e) => {
          e.currentTarget.style.boxShadow = "";
        }}
      />
      {error ? (
        <p id={errorId} className="text-[11px] text-rose-300">
          {error}
        </p>
      ) : null}
    </div>
  );
}

interface CountryPickerProps {
  id: string;
  countries: AddressFormCountry[];
  value?: AddressFormCountry;
  onChange: (iso: string) => void;
  error?: string;
  accentColor: string;
}

function CountryPicker({
  id,
  countries,
  value,
  onChange,
  error,
  accentColor,
}: CountryPickerProps) {
  const [open, setOpen] = React.useState(false);
  const [query, setQuery] = React.useState("");
  const [activeIdx, setActiveIdx] = React.useState(0);
  const wrapRef = React.useRef<HTMLDivElement | null>(null);
  const searchRef = React.useRef<HTMLInputElement | null>(null);
  const errorId = `${id}-error`;

  const filtered = React.useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return countries;
    return countries.filter(
      (c) =>
        c.name.toLowerCase().includes(q) ||
        c.iso.toLowerCase().includes(q)
    );
  }, [countries, query]);

  React.useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      if (!wrapRef.current) return;
      if (!wrapRef.current.contains(e.target as Node)) {
        setOpen(false);
        setQuery("");
      }
    };
    document.addEventListener("mousedown", onDown);
    return () => document.removeEventListener("mousedown", onDown);
  }, [open]);

  React.useEffect(() => {
    if (open) {
      // Focus the search after the popover animates in.
      const t = setTimeout(() => searchRef.current?.focus(), 30);
      setActiveIdx(0);
      return () => clearTimeout(t);
    }
    return;
  }, [open]);

  const commit = (iso: string) => {
    onChange(iso);
    setOpen(false);
    setQuery("");
  };

  const handleKey = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIdx((i) => Math.min(filtered.length - 1, i + 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIdx((i) => Math.max(0, i - 1));
    } else if (e.key === "Enter") {
      e.preventDefault();
      const pick = filtered[activeIdx];
      if (pick) commit(pick.iso);
    } else if (e.key === "Escape") {
      e.preventDefault();
      setOpen(false);
      setQuery("");
    }
  };

  return (
    <div ref={wrapRef} className="relative flex flex-col gap-1.5">
      <label
        htmlFor={id}
        className="text-[11px] font-medium uppercase tracking-wide text-white/55"
      >
        Country
      </label>
      <button
        id={id}
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? errorId : undefined}
        className={cn(
          "flex h-9 w-full items-center justify-between gap-2 rounded-lg border bg-neutral-900 px-3 text-sm text-white outline-none transition-colors focus-visible:ring-2 focus-visible:ring-offset-1 focus-visible:ring-offset-neutral-950",
          error
            ? "border-rose-400/60"
            : "border-white/10 hover:border-white/20"
        )}
        style={
          {
            ["--tw-ring-color" as string]: error ? "rgb(251, 113, 133)" : accentColor,
          } as React.CSSProperties
        }
      >
        <span className="flex min-w-0 items-center gap-2">
          {value ? (
            <>
              <span aria-hidden className="text-base leading-none">
                {value.flag ?? value.iso}
              </span>
              <span className="truncate">{value.name}</span>
            </>
          ) : (
            <span className="text-white/35">Select country</span>
          )}
        </span>
        <svg
          width={12}
          height={12}
          viewBox="0 0 24 24"
          fill="none"
          aria-hidden
          className={cn(
            "shrink-0 text-white/50 transition-transform",
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

      {open ? (
        <div
          role="dialog"
          className="craftui-address-form-popover absolute left-0 right-0 top-full z-30 mt-1 overflow-hidden rounded-xl border border-white/10 bg-neutral-950 shadow-[0_20px_60px_-20px_rgba(0,0,0,0.8)]"
        >
          <div className="border-b border-white/10 p-2">
            <input
              ref={searchRef}
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setActiveIdx(0);
              }}
              onKeyDown={handleKey}
              placeholder="Search…"
              className="h-8 w-full rounded-md border border-white/10 bg-neutral-900 px-2 text-xs text-white placeholder:text-white/30 outline-none focus:border-white/25"
            />
          </div>
          <ul
            role="listbox"
            aria-label="Country"
            className="craftui-address-form-list max-h-56 overflow-y-auto py-1"
          >
            {filtered.length === 0 ? (
              <li className="px-3 py-2 text-xs text-white/45">No matches.</li>
            ) : (
              filtered.map((c, i) => {
                const selected = value?.iso === c.iso;
                const active = i === activeIdx;
                return (
                  <li key={c.iso}>
                    <button
                      type="button"
                      role="option"
                      aria-selected={selected}
                      onMouseEnter={() => setActiveIdx(i)}
                      onClick={() => commit(c.iso)}
                      className={cn(
                        "flex w-full items-center gap-2 px-3 py-1.5 text-left text-sm transition-colors",
                        active
                          ? "bg-white/[0.06] text-white"
                          : "text-white/85 hover:bg-white/[0.04]"
                      )}
                    >
                      <span aria-hidden className="text-base leading-none">
                        {c.flag ?? c.iso}
                      </span>
                      <span className="flex-1 truncate">{c.name}</span>
                      <span className="font-mono text-[10px] tabular-nums text-white/35">
                        {c.iso}
                      </span>
                      {selected ? (
                        <svg
                          width={12}
                          height={12}
                          viewBox="0 0 24 24"
                          fill="none"
                          aria-hidden
                          style={{ color: accentColor }}
                        >
                          <path
                            d="M5 12l5 5L20 7"
                            stroke="currentColor"
                            strokeWidth={2.5}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      ) : null}
                    </button>
                  </li>
                );
              })
            )}
          </ul>
        </div>
      ) : null}

      {error ? (
        <p id={errorId} className="text-[11px] text-rose-300">
          {error}
        </p>
      ) : null}
    </div>
  );
}

export { AddressForm };
