"use client";

import * as React from "react";
import { cn } from "../../lib/cn";

export interface AuthCardSocial {
  id: string;
  label: string;
  icon: React.ReactNode;
  onClick?: () => void | Promise<void>;
}

export interface AuthCardSubmitValues {
  email: string;
  password: string;
}

export interface AuthCardProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onSubmit"> {
  /** Sign-in or sign-up variant. Default "signin". */
  variant?: "signin" | "signup";
  /** Heading title. Defaults depend on variant. */
  title?: string;
  /** One-line description under the title. */
  description?: string;
  /** Social login buttons rendered at the top. */
  socials?: AuthCardSocial[];
  /** Render the email + password form. Default true. */
  showEmailPassword?: boolean;
  /** Submit button label. Defaults depend on variant. */
  submitLabel?: string;
  /** Anchor href for the forgot password link. */
  forgotHref?: string;
  /** Called when the forgot password link is clicked. */
  onForgotPassword?: () => void;
  /** Async-safe handler invoked with form values on submit. */
  onSubmit?: (values: AuthCardSubmitValues) => void | Promise<void>;
  /** Footer prompt text. Defaults depend on variant. */
  footerText?: string;
  /** Footer action label. Defaults depend on variant. */
  footerActionLabel?: string;
  /** Called when the footer link is clicked. */
  onFooterAction?: () => void;
  /** Optional logo / brand mark rendered above the title. */
  logo?: React.ReactNode;
  /** Accent color used for the submit button, focus ring, link. */
  accentColor?: string;
}

const DEFAULT_ACCENT = "rgb(125, 211, 252)";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * AuthCard — a production sign-in / sign-up card. Renders social login
 * buttons in a column at the top, an "Or continue with email" divider,
 * email + password fields with a show/hide eye toggle, an async-safe
 * submit button, a forgot-password link, and a footer link to switch
 * between sign-in and sign-up. Inline validation enforces required
 * fields and email format. Self-contained — no external dependencies.
 */
const AuthCard = React.forwardRef<HTMLDivElement, AuthCardProps>(
  (
    {
      variant = "signin",
      title,
      description,
      socials,
      showEmailPassword = true,
      submitLabel,
      forgotHref,
      onForgotPassword,
      onSubmit,
      footerText,
      footerActionLabel,
      onFooterAction,
      logo,
      accentColor = DEFAULT_ACCENT,
      className,
      style,
      ...props
    },
    ref
  ) => {
    const isSignup = variant === "signup";
    const reactId = React.useId();
    const emailId = `${reactId}-email`;
    const passwordId = `${reactId}-password`;
    const emailErrId = `${reactId}-email-err`;
    const passwordErrId = `${reactId}-password-err`;

    const resolvedTitle =
      title ?? (isSignup ? "Create your account" : "Welcome back");
    const resolvedDescription =
      description ??
      (isSignup
        ? "Start your journey — it only takes a minute."
        : "Sign in to continue to your workspace.");
    const resolvedSubmitLabel =
      submitLabel ?? (isSignup ? "Create account" : "Sign in");
    const resolvedFooterText =
      footerText ??
      (isSignup ? "Already have an account?" : "Don't have an account?");
    const resolvedFooterAction =
      footerActionLabel ?? (isSignup ? "Sign in" : "Sign up");

    const socialItems = socials ?? [];

    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [showPassword, setShowPassword] = React.useState(false);
    const [emailError, setEmailError] = React.useState<string | null>(null);
    const [passwordError, setPasswordError] = React.useState<string | null>(
      null
    );
    const [formError, setFormError] = React.useState<string | null>(null);
    const [pending, setPending] = React.useState(false);
    const [pendingSocialId, setPendingSocialId] = React.useState<string | null>(
      null
    );

    const validate = (): boolean => {
      let ok = true;
      const trimmedEmail = email.trim();
      if (trimmedEmail.length === 0) {
        setEmailError("Email is required.");
        ok = false;
      } else if (!EMAIL_REGEX.test(trimmedEmail)) {
        setEmailError("Enter a valid email address.");
        ok = false;
      } else {
        setEmailError(null);
      }
      if (password.length === 0) {
        setPasswordError("Password is required.");
        ok = false;
      } else if (isSignup && password.length < 8) {
        setPasswordError("Password must be at least 8 characters.");
        ok = false;
      } else {
        setPasswordError(null);
      }
      return ok;
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (pending) return;
      setFormError(null);
      if (!validate()) return;
      try {
        setPending(true);
        await onSubmit?.({ email: email.trim(), password });
      } catch (err) {
        setFormError(
          err instanceof Error ? err.message : "Something went wrong."
        );
      } finally {
        setPending(false);
      }
    };

    const handleSocial = async (social: AuthCardSocial) => {
      if (pendingSocialId || pending) return;
      try {
        setPendingSocialId(social.id);
        await social.onClick?.();
      } catch {
        // swallow — the consumer is responsible for surfacing OAuth errors
      } finally {
        setPendingSocialId(null);
      }
    };

    const handleForgot = (e: React.MouseEvent<HTMLAnchorElement>) => {
      if (onForgotPassword) {
        if (!forgotHref) e.preventDefault();
        onForgotPassword();
      }
    };

    const handleFooter = (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      onFooterAction?.();
    };

    const pendingLabel = isSignup ? "Creating account…" : "Signing in…";
    const accentStyle = {
      "--craftui-auth-accent": accentColor,
    } as React.CSSProperties;

    return (
      <div
        ref={ref}
        className={cn(
          "relative w-full max-w-sm overflow-hidden rounded-2xl border border-white/10 bg-neutral-950 p-6 text-white shadow-[0_20px_60px_-20px_rgba(0,0,0,0.6)]",
          className
        )}
        style={{ ...accentStyle, ...style }}
        {...props}
      >
        <div
          aria-hidden
          className="pointer-events-none absolute -top-28 left-1/2 h-56 w-[140%] -translate-x-1/2 opacity-30 blur-3xl"
          style={{
            background: `radial-gradient(closest-side, ${accentColor}, transparent)`,
          }}
        />

        <div className="relative flex flex-col items-center gap-2 text-center">
          {logo ? <div className="mb-1">{logo}</div> : null}
          <h2 className="text-lg font-semibold leading-tight">
            {resolvedTitle}
          </h2>
          {resolvedDescription ? (
            <p className="text-xs text-white/55">{resolvedDescription}</p>
          ) : null}
        </div>

        {socialItems.length > 0 ? (
          <div className="relative mt-5 flex flex-col gap-2">
            {socialItems.map((social) => {
              const isLoading = pendingSocialId === social.id;
              return (
                <button
                  key={social.id}
                  type="button"
                  onClick={() => void handleSocial(social)}
                  disabled={pending || pendingSocialId !== null}
                  className={cn(
                    "group/social flex h-10 w-full items-center justify-center gap-2.5 rounded-lg border border-white/10 bg-white/[0.04] px-3 text-sm font-medium text-white/90 transition-colors",
                    "hover:bg-white/[0.08] hover:text-white",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-950",
                    "disabled:cursor-not-allowed disabled:opacity-50"
                  )}
                  style={
                    {
                      "--tw-ring-color": accentColor,
                    } as React.CSSProperties
                  }
                  aria-label={`Continue with ${social.label}`}
                >
                  <span
                    className="flex h-4 w-4 shrink-0 items-center justify-center"
                    aria-hidden
                  >
                    {isLoading ? (
                      <span
                        className="craftui-auth-card-spinner block h-3.5 w-3.5 rounded-full border-2 border-white/20"
                        style={{ borderTopColor: accentColor }}
                      />
                    ) : (
                      social.icon
                    )}
                  </span>
                  <span className="truncate">
                    {isLoading ? "Connecting…" : `Continue with ${social.label}`}
                  </span>
                </button>
              );
            })}
          </div>
        ) : null}

        {socialItems.length > 0 && showEmailPassword ? (
          <div
            className="relative my-5 flex items-center gap-3"
            aria-hidden="true"
          >
            <span className="h-px flex-1 bg-white/10" />
            <span className="text-[10px] uppercase tracking-[0.18em] text-white/45">
              Or continue with email
            </span>
            <span className="h-px flex-1 bg-white/10" />
          </div>
        ) : null}

        {showEmailPassword ? (
          <form
            className="relative flex flex-col gap-3"
            onSubmit={handleSubmit}
            noValidate
          >
            <div className="flex flex-col gap-1.5">
              <label
                htmlFor={emailId}
                className="text-[11px] font-medium uppercase tracking-wider text-white/55"
              >
                Email
              </label>
              <input
                id={emailId}
                type="email"
                autoComplete="email"
                inputMode="email"
                spellCheck={false}
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (emailError) setEmailError(null);
                  if (formError) setFormError(null);
                }}
                placeholder="you@company.com"
                aria-invalid={emailError !== null}
                aria-describedby={emailError ? emailErrId : undefined}
                disabled={pending}
                className={cn(
                  "h-10 w-full rounded-lg border bg-white/[0.03] px-3 text-sm text-white placeholder:text-white/30 outline-none transition-colors",
                  "focus:bg-white/[0.05]",
                  "disabled:cursor-not-allowed disabled:opacity-60",
                  emailError
                    ? "border-rose-400/50 focus:border-rose-400/70 focus:ring-2 focus:ring-rose-400/30"
                    : "border-white/10 focus:border-white/25 focus:ring-2"
                )}
                style={
                  {
                    "--tw-ring-color": emailError
                      ? "rgba(251,113,133,0.3)"
                      : `${accentColor}40`,
                  } as React.CSSProperties
                }
              />
              {emailError ? (
                <p id={emailErrId} className="text-[11px] text-rose-300">
                  {emailError}
                </p>
              ) : null}
            </div>

            <div className="flex flex-col gap-1.5">
              <div className="flex items-baseline justify-between gap-3">
                <label
                  htmlFor={passwordId}
                  className="text-[11px] font-medium uppercase tracking-wider text-white/55"
                >
                  Password
                </label>
                {!isSignup && (forgotHref || onForgotPassword) ? (
                  <a
                    href={forgotHref ?? "#"}
                    onClick={handleForgot}
                    className="text-[11px] font-medium text-white/65 transition-colors hover:text-white"
                    style={{ color: undefined }}
                  >
                    Forgot password?
                  </a>
                ) : null}
              </div>
              <div className="relative">
                <input
                  id={passwordId}
                  type={showPassword ? "text" : "password"}
                  autoComplete={
                    isSignup ? "new-password" : "current-password"
                  }
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    if (passwordError) setPasswordError(null);
                    if (formError) setFormError(null);
                  }}
                  placeholder={isSignup ? "At least 8 characters" : "••••••••"}
                  aria-invalid={passwordError !== null}
                  aria-describedby={
                    passwordError ? passwordErrId : undefined
                  }
                  disabled={pending}
                  className={cn(
                    "h-10 w-full rounded-lg border bg-white/[0.03] pl-3 pr-10 text-sm text-white placeholder:text-white/30 outline-none transition-colors",
                    "focus:bg-white/[0.05]",
                    "disabled:cursor-not-allowed disabled:opacity-60",
                    passwordError
                      ? "border-rose-400/50 focus:border-rose-400/70 focus:ring-2 focus:ring-rose-400/30"
                      : "border-white/10 focus:border-white/25 focus:ring-2"
                  )}
                  style={
                    {
                      "--tw-ring-color": passwordError
                        ? "rgba(251,113,133,0.3)"
                        : `${accentColor}40`,
                    } as React.CSSProperties
                  }
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  aria-label={
                    showPassword ? "Hide password" : "Show password"
                  }
                  aria-pressed={showPassword}
                  disabled={pending}
                  className="absolute right-1 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-md text-white/45 transition-colors hover:bg-white/5 hover:text-white disabled:opacity-50"
                >
                  {showPassword ? (
                    <svg
                      width={15}
                      height={15}
                      viewBox="0 0 24 24"
                      fill="none"
                      aria-hidden
                    >
                      <path
                        d="M3 3l18 18M10.6 10.6a2 2 0 002.8 2.8M9.9 5.1A10.9 10.9 0 0112 5c5 0 9 4 10 7-0.5 1.4-1.6 3-3.2 4.4M6.2 6.2C4 7.7 2.5 9.6 2 12c1 3 5 7 10 7 1.4 0 2.7-.3 3.9-.8"
                        stroke="currentColor"
                        strokeWidth={1.6}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  ) : (
                    <svg
                      width={15}
                      height={15}
                      viewBox="0 0 24 24"
                      fill="none"
                      aria-hidden
                    >
                      <path
                        d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7-10-7-10-7Z"
                        stroke="currentColor"
                        strokeWidth={1.6}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <circle
                        cx={12}
                        cy={12}
                        r={3}
                        stroke="currentColor"
                        strokeWidth={1.6}
                      />
                    </svg>
                  )}
                </button>
              </div>
              {passwordError ? (
                <p id={passwordErrId} className="text-[11px] text-rose-300">
                  {passwordError}
                </p>
              ) : null}
            </div>

            {formError ? (
              <div
                role="alert"
                className="rounded-lg border border-rose-400/30 bg-rose-500/10 px-3 py-2 text-[11px] text-rose-200"
              >
                {formError}
              </div>
            ) : null}

            <button
              type="submit"
              disabled={pending}
              className={cn(
                "mt-1 flex h-10 w-full items-center justify-center gap-2 rounded-lg px-3 text-sm font-semibold text-neutral-950 transition-all",
                "hover:opacity-90",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-950",
                "disabled:cursor-not-allowed disabled:opacity-70"
              )}
              style={
                {
                  background: accentColor,
                  boxShadow: `0 8px 24px -10px ${accentColor}`,
                  "--tw-ring-color": accentColor,
                } as React.CSSProperties
              }
            >
              {pending ? (
                <>
                  <span
                    aria-hidden
                    className="craftui-auth-card-spinner block h-3.5 w-3.5 rounded-full border-2 border-neutral-950/30"
                    style={{ borderTopColor: "rgb(10,10,10)" }}
                  />
                  <span>{pendingLabel}</span>
                </>
              ) : (
                resolvedSubmitLabel
              )}
            </button>
          </form>
        ) : null}

        {(resolvedFooterText || resolvedFooterAction) && onFooterAction ? (
          <div className="relative mt-5 text-center text-xs text-white/55">
            {resolvedFooterText}{" "}
            <button
              type="button"
              onClick={handleFooter}
              className="font-medium text-white transition-colors hover:opacity-80"
              style={{ color: accentColor }}
            >
              {resolvedFooterAction}
            </button>
          </div>
        ) : null}

        <style>{`
          @keyframes craftui-auth-card-spin {
            to { transform: rotate(360deg); }
          }
          .craftui-auth-card-spinner {
            animation: craftui-auth-card-spin 700ms linear infinite;
          }
        `}</style>
      </div>
    );
  }
);
AuthCard.displayName = "AuthCard";

export { AuthCard };
