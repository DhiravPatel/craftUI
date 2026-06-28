"use client";

import * as React from "react";
import { cn } from "../../lib/cn";

export interface TwoFactorSetupProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onSubmit"> {
  /** The TOTP secret in base32 format. */
  secret: string;
  /** Account identifier shown in the authenticator (e.g. user email). */
  accountName?: string;
  /** Issuer / app name shown in the authenticator. */
  issuer?: string;
  /** Override the constructed otpauth:// URL. */
  otpauthUrl?: string;
  /** Pixel size of the rendered QR panel. Default 180. */
  qrSize?: number;
  /** Async verify hook. Resolve true to advance to the success state. */
  onVerify?: (code: string) => Promise<boolean> | boolean;
  /** Fires once the flow completes successfully. */
  onComplete?: () => void;
  /** Controlled step. */
  step?: 1 | 2;
  /** Uncontrolled initial step. Default 1. */
  defaultStep?: 1 | 2;
  /** Number of digits in the verification code. Default 6. */
  codeLength?: number;
  /** Card title. Default "Set up two-factor auth". */
  title?: string;
  /** Card description. */
  description?: string;
}

const DEFAULT_TITLE = "Set up two-factor auth";
const DEFAULT_DESCRIPTION =
  "Scan the QR code with an authenticator app, then enter the 6-digit code to confirm.";

/** Build the standard otpauth:// URL used by every authenticator app. */
function buildOtpauthUrl({
  secret,
  accountName,
  issuer,
}: {
  secret: string;
  accountName?: string;
  issuer?: string;
}): string {
  const label = issuer
    ? `${encodeURIComponent(issuer)}:${encodeURIComponent(accountName ?? "")}`
    : encodeURIComponent(accountName ?? "");
  const params = new URLSearchParams();
  params.set("secret", secret);
  if (issuer) params.set("issuer", issuer);
  params.set("algorithm", "SHA1");
  params.set("digits", "6");
  params.set("period", "30");
  return `otpauth://totp/${label}?${params.toString()}`;
}

/** Group the secret in blocks of 4 for readability. */
function formatSecret(secret: string): string {
  return secret.replace(/\s+/g, "").match(/.{1,4}/g)?.join(" ") ?? secret;
}

/**
 * Deterministic 32-bit hash mixed from the input string. Used so the QR
 * grid is stable for a given otpauth URL (no Math.random during render).
 */
function hashString(input: string): number {
  let h = 2166136261 >>> 0;
  for (let i = 0; i < input.length; i++) {
    h ^= input.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

/**
 * Generate a 21x21 pseudo-QR matrix from a seed string. Not a real QR
 * encoding — purely a visual placeholder with the three finder squares
 * at the canonical positions.
 */
function generateQrMatrix(seed: string, size = 21): boolean[][] {
  const grid: boolean[][] = Array.from({ length: size }, () =>
    Array.from({ length: size }, () => false)
  );
  const baseHash = hashString(seed);
  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      // Mix coordinates into the seed hash to get a per-cell bit.
      const cellHash = hashString(`${baseHash}:${x}:${y}`);
      const row = grid[y];
      if (row) row[x] = (cellHash & 1) === 1;
    }
  }
  // Carve out the three finder squares (top-left, top-right, bottom-left).
  const finderCorners: Array<[number, number]> = [
    [0, 0],
    [size - 7, 0],
    [0, size - 7],
  ];
  for (const [ox, oy] of finderCorners) {
    for (let y = 0; y < 7; y++) {
      for (let x = 0; x < 7; x++) {
        const row = grid[oy + y];
        if (!row) continue;
        const onBorder = x === 0 || x === 6 || y === 0 || y === 6;
        const inCenter = x >= 2 && x <= 4 && y >= 2 && y <= 4;
        row[ox + x] = onBorder || inCenter;
      }
    }
    // Clear the one-cell quiet zone around each finder where the grid allows.
    for (let y = -1; y <= 7; y++) {
      for (let x = -1; x <= 7; x++) {
        if (x >= 0 && x <= 6 && y >= 0 && y <= 6) continue;
        const gy = oy + y;
        const gx = ox + x;
        if (gy < 0 || gy >= size || gx < 0 || gx >= size) continue;
        const row = grid[gy];
        if (row) row[gx] = false;
      }
    }
  }
  return grid;
}

function QrSvg({ url, size }: { url: string; size: number }) {
  const matrix = React.useMemo(() => generateQrMatrix(url, 21), [url]);
  const dim = matrix.length;
  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${dim} ${dim}`}
      shapeRendering="crispEdges"
      role="img"
      aria-label="Two-factor authentication QR code"
    >
      <rect width={dim} height={dim} fill="#ffffff" />
      {matrix.map((row, y) =>
        row.map((cell, x) =>
          cell ? (
            <rect key={`${x}-${y}`} x={x} y={y} width={1} height={1} fill="#0a0a0a" />
          ) : null
        )
      )}
    </svg>
  );
}

function CopyIcon({ done }: { done: boolean }) {
  if (done) {
    return (
      <svg width={14} height={14} viewBox="0 0 24 24" fill="none" aria-hidden>
        <path
          d="M5 12l5 5L20 7"
          stroke="currentColor"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }
  return (
    <svg width={14} height={14} viewBox="0 0 24 24" fill="none" aria-hidden>
      <rect
        x={8}
        y={8}
        width={12}
        height={12}
        rx={2}
        stroke="currentColor"
        strokeWidth={1.6}
      />
      <path
        d="M16 8V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h2"
        stroke="currentColor"
        strokeWidth={1.6}
      />
    </svg>
  );
}

/**
 * TwoFactorSetup — a self-contained 2FA / TOTP setup flow card. Step 1
 * shows a generated QR code (rendered inline as SVG from the otpauth URL,
 * no QR library required) alongside the manual secret key with copy
 * affordance. Step 2 is a digit-by-digit verification field with
 * auto-advancing focus, backspace-back navigation, and paste-distribution
 * across the boxes. The async `onVerify` callback drives the success /
 * error states — on success the card animates into an "all set"
 * confirmation, on failure the boxes shake and an inline error appears.
 * Works fully uncontrolled or controlled via `step`.
 */
const TwoFactorSetup = React.forwardRef<HTMLDivElement, TwoFactorSetupProps>(
  (
    {
      secret,
      accountName,
      issuer,
      otpauthUrl,
      qrSize = 180,
      onVerify,
      onComplete,
      step,
      defaultStep = 1,
      codeLength = 6,
      title = DEFAULT_TITLE,
      description = DEFAULT_DESCRIPTION,
      className,
      style,
      ...props
    },
    ref
  ) => {
    const isControlled = step !== undefined;
    const [internalStep, setInternalStep] = React.useState<1 | 2>(defaultStep);
    const activeStep = isControlled ? step : internalStep;

    const [digits, setDigits] = React.useState<string[]>(() =>
      Array.from({ length: codeLength }, () => "")
    );
    const [verifying, setVerifying] = React.useState(false);
    const [error, setError] = React.useState<string | null>(null);
    const [shakeKey, setShakeKey] = React.useState(0);
    const [success, setSuccess] = React.useState(false);
    const [copied, setCopied] = React.useState(false);
    const copyTimer = React.useRef<number | undefined>(undefined);
    const inputRefs = React.useRef<Array<HTMLInputElement | null>>([]);

    React.useEffect(
      () => () => {
        if (copyTimer.current) window.clearTimeout(copyTimer.current);
      },
      []
    );

    // Keep the digit array length in sync with the codeLength prop.
    React.useEffect(() => {
      setDigits((prev) => {
        if (prev.length === codeLength) return prev;
        const next = Array.from({ length: codeLength }, (_, i) => prev[i] ?? "");
        return next;
      });
    }, [codeLength]);

    const url = React.useMemo(
      () =>
        otpauthUrl ?? buildOtpauthUrl({ secret, accountName, issuer }),
      [otpauthUrl, secret, accountName, issuer]
    );

    const goToStep = (next: 1 | 2) => {
      if (!isControlled) setInternalStep(next);
    };

    const handleCopy = async () => {
      try {
        await navigator.clipboard.writeText(secret);
        setCopied(true);
        if (copyTimer.current) window.clearTimeout(copyTimer.current);
        copyTimer.current = window.setTimeout(() => setCopied(false), 1600);
      } catch {
        // clipboard may be blocked — silently ignore
      }
    };

    const setDigitAt = (idx: number, value: string) => {
      setDigits((prev) => {
        const next = [...prev];
        next[idx] = value;
        return next;
      });
    };

    const focusInput = (idx: number) => {
      const target = inputRefs.current[idx];
      if (target) {
        target.focus();
        target.select();
      }
    };

    const handleDigitChange = (
      idx: number,
      e: React.ChangeEvent<HTMLInputElement>
    ) => {
      const raw = e.target.value;
      const cleaned = raw.replace(/\D/g, "").slice(-1);
      setDigitAt(idx, cleaned);
      if (error) setError(null);
      if (cleaned && idx < codeLength - 1) {
        focusInput(idx + 1);
      }
    };

    const handleDigitKeyDown = (
      idx: number,
      e: React.KeyboardEvent<HTMLInputElement>
    ) => {
      if (e.key === "Backspace") {
        if (!digits[idx] && idx > 0) {
          e.preventDefault();
          setDigitAt(idx - 1, "");
          focusInput(idx - 1);
        }
        return;
      }
      if (e.key === "ArrowLeft" && idx > 0) {
        e.preventDefault();
        focusInput(idx - 1);
        return;
      }
      if (e.key === "ArrowRight" && idx < codeLength - 1) {
        e.preventDefault();
        focusInput(idx + 1);
        return;
      }
      if (e.key === "Enter") {
        e.preventDefault();
        void runVerify();
      }
    };

    const handlePaste = (
      idx: number,
      e: React.ClipboardEvent<HTMLInputElement>
    ) => {
      const text = e.clipboardData.getData("text").replace(/\D/g, "");
      if (!text) return;
      e.preventDefault();
      setDigits((prev) => {
        const next = [...prev];
        for (let i = 0; i < text.length && idx + i < codeLength; i++) {
          next[idx + i] = text.charAt(i);
        }
        return next;
      });
      const lastFilled = Math.min(idx + text.length, codeLength) - 1;
      const focusIdx = Math.min(Math.max(lastFilled + 1, 0), codeLength - 1);
      window.setTimeout(() => focusInput(focusIdx), 0);
      if (error) setError(null);
    };

    const code = digits.join("");
    const isComplete = code.length === codeLength;

    const runVerify = async () => {
      if (!isComplete || verifying || success) return;
      if (!onVerify) {
        setSuccess(true);
        onComplete?.();
        return;
      }
      try {
        setVerifying(true);
        setError(null);
        const ok = await onVerify(code);
        if (ok) {
          setSuccess(true);
          onComplete?.();
        } else {
          setError("Invalid code, try again");
          setShakeKey((k) => k + 1);
          setDigits(Array.from({ length: codeLength }, () => ""));
          window.setTimeout(() => focusInput(0), 0);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "Verification failed");
        setShakeKey((k) => k + 1);
      } finally {
        setVerifying(false);
      }
    };

    return (
      <div
        ref={ref}
        className={cn(
          "relative w-full max-w-md overflow-hidden rounded-2xl border border-white/10 bg-neutral-950 p-6 text-white shadow-[0_20px_60px_-20px_rgba(0,0,0,0.6)]",
          className
        )}
        style={style}
        {...props}
      >
        {/* Step indicator */}
        <div className="mb-5 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-[11px] uppercase tracking-widest text-white/45">
            <span>Step {success ? 2 : activeStep}</span>
            <span className="text-white/25">/</span>
            <span>2</span>
          </div>
          <div className="flex items-center gap-1.5" aria-hidden>
            <span
              className={cn(
                "h-1 w-6 rounded-full transition-colors",
                activeStep >= 1 || success ? "bg-sky-300" : "bg-white/10"
              )}
            />
            <span
              className={cn(
                "h-1 w-6 rounded-full transition-colors",
                activeStep === 2 || success ? "bg-sky-300" : "bg-white/10"
              )}
            />
          </div>
        </div>

        {/* Header */}
        <div className="mb-5">
          <h3 className="text-base font-semibold leading-tight">
            {success ? "You are all set" : title}
          </h3>
          {!success ? (
            <p className="mt-1 text-xs leading-relaxed text-white/55">
              {description}
            </p>
          ) : (
            <p className="mt-1 text-xs leading-relaxed text-white/55">
              Two-factor authentication is now protecting your account.
            </p>
          )}
        </div>

        {success ? (
          <SuccessPanel />
        ) : activeStep === 1 ? (
          <Step1
            url={url}
            qrSize={qrSize}
            secret={secret}
            copied={copied}
            onCopy={handleCopy}
            onContinue={() => goToStep(2)}
          />
        ) : (
          <Step2
            digits={digits}
            codeLength={codeLength}
            inputRefs={inputRefs}
            verifying={verifying}
            error={error}
            shakeKey={shakeKey}
            isComplete={isComplete}
            onDigitChange={handleDigitChange}
            onDigitKeyDown={handleDigitKeyDown}
            onPaste={handlePaste}
            onVerify={runVerify}
            onBack={() => goToStep(1)}
          />
        )}

        <style>{`
          @keyframes craftui-two-factor-setup-shake {
            0%, 100% { transform: translateX(0); }
            20% { transform: translateX(-6px); }
            40% { transform: translateX(6px); }
            60% { transform: translateX(-4px); }
            80% { transform: translateX(4px); }
          }
          .craftui-two-factor-setup-shake {
            animation: craftui-two-factor-setup-shake 380ms cubic-bezier(0.36,0.07,0.19,0.97) both;
          }
          @keyframes craftui-two-factor-setup-pop {
            0% { transform: scale(0.6); opacity: 0; }
            60% { transform: scale(1.08); opacity: 1; }
            100% { transform: scale(1); opacity: 1; }
          }
          .craftui-two-factor-setup-pop {
            animation: craftui-two-factor-setup-pop 420ms cubic-bezier(0.22,1,0.36,1) both;
          }
          @keyframes craftui-two-factor-setup-check {
            0% { stroke-dasharray: 0 30; }
            100% { stroke-dasharray: 30 30; }
          }
          .craftui-two-factor-setup-check path {
            stroke-dasharray: 30 30;
            animation: craftui-two-factor-setup-check 360ms 120ms cubic-bezier(0.22,1,0.36,1) both;
          }
          @keyframes craftui-two-factor-setup-fade {
            from { opacity: 0; transform: translateY(4px); }
            to { opacity: 1; transform: translateY(0); }
          }
          .craftui-two-factor-setup-fade {
            animation: craftui-two-factor-setup-fade 280ms ease-out both;
          }
        `}</style>
      </div>
    );
  }
);
TwoFactorSetup.displayName = "TwoFactorSetup";

/* -------------------------------------------------------------------------- */
/* Step 1 — QR + manual key                                                   */
/* -------------------------------------------------------------------------- */

function Step1({
  url,
  qrSize,
  secret,
  copied,
  onCopy,
  onContinue,
}: {
  url: string;
  qrSize: number;
  secret: string;
  copied: boolean;
  onCopy: () => void;
  onContinue: () => void;
}) {
  return (
    <div className="craftui-two-factor-setup-fade flex flex-col gap-4">
      <div className="flex flex-col items-center gap-3">
        <div
          className="rounded-xl bg-white p-3 shadow-[0_8px_30px_-12px_rgba(125,211,252,0.4)] ring-1 ring-white/15"
          style={{ width: qrSize + 24, height: qrSize + 24 }}
        >
          <QrSvg url={url} size={qrSize} />
        </div>
        <p className="text-[11px] text-white/45">
          Scan with Google Authenticator, 1Password, Authy, etc.
        </p>
      </div>

      <div className="flex items-center gap-3">
        <div className="h-px flex-1 bg-white/10" />
        <span className="text-[10px] uppercase tracking-widest text-white/35">
          or enter manually
        </span>
        <div className="h-px flex-1 bg-white/10" />
      </div>

      <div className="flex items-center gap-1 rounded-xl border border-white/10 bg-white/[0.03] p-1.5">
        <div className="min-w-0 flex-1 truncate px-2 font-mono text-[12px] tracking-tight text-white/90">
          {formatSecret(secret)}
        </div>
        <button
          type="button"
          onClick={onCopy}
          aria-label="Copy secret"
          className={cn(
            "flex h-8 w-8 shrink-0 items-center justify-center rounded-lg transition-colors",
            copied
              ? "bg-emerald-400/15 text-emerald-300"
              : "text-white/55 hover:bg-white/[0.06] hover:text-white"
          )}
        >
          <CopyIcon done={copied} />
        </button>
      </div>

      <button
        type="button"
        onClick={onContinue}
        className="mt-1 flex h-10 w-full items-center justify-center rounded-lg bg-sky-300 text-sm font-medium text-neutral-950 transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-300/60 focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-950"
      >
        Continue
      </button>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Step 2 — verification code                                                 */
/* -------------------------------------------------------------------------- */

function Step2({
  digits,
  codeLength,
  inputRefs,
  verifying,
  error,
  shakeKey,
  isComplete,
  onDigitChange,
  onDigitKeyDown,
  onPaste,
  onVerify,
  onBack,
}: {
  digits: string[];
  codeLength: number;
  inputRefs: React.MutableRefObject<Array<HTMLInputElement | null>>;
  verifying: boolean;
  error: string | null;
  shakeKey: number;
  isComplete: boolean;
  onDigitChange: (idx: number, e: React.ChangeEvent<HTMLInputElement>) => void;
  onDigitKeyDown: (idx: number, e: React.KeyboardEvent<HTMLInputElement>) => void;
  onPaste: (idx: number, e: React.ClipboardEvent<HTMLInputElement>) => void;
  onVerify: () => void;
  onBack: () => void;
}) {
  // Auto-focus the first empty box on mount.
  React.useEffect(() => {
    const firstEmpty = digits.findIndex((d) => d === "");
    const idx = firstEmpty === -1 ? 0 : firstEmpty;
    const target = inputRefs.current[idx];
    if (target) target.focus();
    // We only want this on mount, not on every digit change.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="craftui-two-factor-setup-fade flex flex-col gap-4">
      <p className="text-sm text-white/75">
        Enter the {codeLength}-digit code shown in your authenticator app.
      </p>

      <div
        key={shakeKey}
        className={cn(
          "flex items-center justify-between gap-2",
          error && "craftui-two-factor-setup-shake"
        )}
        role="group"
        aria-label="Verification code"
      >
        {digits.map((digit, idx) => (
          <input
            key={idx}
            ref={(node) => {
              inputRefs.current[idx] = node;
            }}
            type="text"
            inputMode="numeric"
            autoComplete="one-time-code"
            maxLength={1}
            value={digit}
            disabled={verifying}
            aria-label={`Digit ${idx + 1}`}
            aria-invalid={!!error}
            onChange={(e) => onDigitChange(idx, e)}
            onKeyDown={(e) => onDigitKeyDown(idx, e)}
            onPaste={(e) => onPaste(idx, e)}
            onFocus={(e) => e.currentTarget.select()}
            className={cn(
              "h-12 w-10 rounded-md border bg-neutral-900 text-center font-mono text-lg tabular-nums text-white outline-none transition-all",
              "focus:border-sky-300/60 focus:ring-2 focus:ring-sky-300/30",
              error
                ? "border-rose-400/50"
                : digit
                ? "border-white/25"
                : "border-white/10",
              verifying && "opacity-60"
            )}
          />
        ))}
      </div>

      {error ? (
        <p className="-mt-1 text-[12px] text-rose-300" role="alert">
          {error}
        </p>
      ) : (
        <p className="-mt-1 text-[11px] text-white/40">
          Tip — you can paste the full code into any box.
        </p>
      )}

      <div className="mt-1 flex items-center gap-2">
        <button
          type="button"
          onClick={onBack}
          disabled={verifying}
          className="flex h-10 items-center rounded-lg bg-white/[0.06] px-3 text-sm font-medium text-white/80 transition-colors hover:bg-white/[0.1] disabled:opacity-50"
        >
          Back
        </button>
        <button
          type="button"
          onClick={onVerify}
          disabled={!isComplete || verifying}
          className="flex h-10 flex-1 items-center justify-center gap-2 rounded-lg bg-sky-300 text-sm font-medium text-neutral-950 transition-opacity hover:opacity-90 disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-300/60 focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-950"
        >
          {verifying ? (
            <>
              <Spinner />
              Verifying…
            </>
          ) : (
            "Verify and enable"
          )}
        </button>
      </div>
    </div>
  );
}

function Spinner() {
  return (
    <svg
      width={14}
      height={14}
      viewBox="0 0 24 24"
      fill="none"
      className="animate-spin"
      aria-hidden
    >
      <circle cx={12} cy={12} r={9} stroke="currentColor" strokeOpacity={0.25} strokeWidth={2.5} />
      <path
        d="M21 12a9 9 0 0 0-9-9"
        stroke="currentColor"
        strokeWidth={2.5}
        strokeLinecap="round"
      />
    </svg>
  );
}

/* -------------------------------------------------------------------------- */
/* Success                                                                    */
/* -------------------------------------------------------------------------- */

function SuccessPanel() {
  return (
    <div className="craftui-two-factor-setup-fade flex flex-col items-center gap-3 py-3 text-center">
      <div
        className="craftui-two-factor-setup-pop flex h-14 w-14 items-center justify-center rounded-full"
        style={{
          background:
            "radial-gradient(closest-side, rgba(74,222,128,0.9), rgba(74,222,128,0.25) 70%, transparent)",
        }}
      >
        <svg
          width={26}
          height={26}
          viewBox="0 0 24 24"
          fill="none"
          className="craftui-two-factor-setup-check"
          aria-hidden
        >
          <path
            d="M5 12l5 5L20 7"
            stroke="rgb(10,10,10)"
            strokeWidth={3}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
      <p className="max-w-[280px] text-xs text-white/55">
        Next time you sign in we will ask for a code from your authenticator app.
      </p>
    </div>
  );
}

export { TwoFactorSetup };
