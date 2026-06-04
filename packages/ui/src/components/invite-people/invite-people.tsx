"use client";

import * as React from "react";
import { cn } from "../../lib/cn";

export interface InviteRole {
  /** Unique value, e.g. "admin", "member". */
  value: string;
  /** Display label. */
  label: string;
  /** Optional secondary description in the picker. */
  description?: string;
}

export interface PendingInvite {
  id: string;
  email: string;
  role: string;
  /** Optional human time string, e.g. "2d ago". */
  sentAt?: string;
}

export interface InvitePeopleProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onSubmit"> {
  /** Roles a new invite can be sent as. Default ["Admin", "Member", "Viewer"]. */
  roles?: InviteRole[];
  /** Initial role selected. Defaults to the first role. */
  defaultRole?: string;
  /** Existing pending invites shown below the form. */
  pending?: PendingInvite[];
  /** Fires when the user submits a valid invite. */
  onInvite?: (email: string, role: string) => void;
  /** Fires when the user clicks "Resend" on a pending row. */
  onResend?: (invite: PendingInvite) => void;
  /** Fires when the user clicks "Revoke" on a pending row. */
  onRevoke?: (invite: PendingInvite) => void;
  /** Optional title shown above the form. */
  title?: string;
  /** Optional subtitle. */
  description?: string;
}

const DEFAULT_ROLES: InviteRole[] = [
  { value: "admin", label: "Admin", description: "Full access to the workspace." },
  { value: "member", label: "Member", description: "Read and write access." },
  { value: "viewer", label: "Viewer", description: "Read-only access." },
];

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * InvitePeople — the team invite block from a SaaS settings page. An
 * email field with inline validation, a role dropdown, a Send button,
 * and a list of pending invites underneath with Resend / Revoke
 * actions. Fully controlled via callbacks — the parent decides what
 * happens with the email + role on submit.
 */
const InvitePeople = React.forwardRef<HTMLDivElement, InvitePeopleProps>(
  (
    {
      roles = DEFAULT_ROLES,
      defaultRole,
      pending = [],
      onInvite,
      onResend,
      onRevoke,
      title = "Invite people",
      description = "Add teammates by email. They'll receive a link to join.",
      className,
      style,
      ...props
    },
    ref
  ) => {
    const [email, setEmail] = React.useState("");
    const [role, setRole] = React.useState<string>(
      defaultRole ?? roles[0]?.value ?? ""
    );
    const [touched, setTouched] = React.useState(false);
    const [open, setOpen] = React.useState(false);

    const valid = EMAIL_RE.test(email.trim());
    const showError = touched && email.length > 0 && !valid;

    const selectedRole = roles.find((r) => r.value === role) ?? roles[0];

    const submit = () => {
      setTouched(true);
      if (!valid) return;
      onInvite?.(email.trim(), role);
      setEmail("");
      setTouched(false);
    };

    return (
      <div
        ref={ref}
        className={cn(
          "w-full max-w-lg rounded-2xl border border-white/10 bg-neutral-950 p-5 text-white",
          className
        )}
        style={style}
        {...props}
      >
        {title || description ? (
          <div className="mb-4">
            {title ? (
              <h3 className="text-base font-semibold leading-tight">{title}</h3>
            ) : null}
            {description ? (
              <p className="mt-1 text-[12px] text-white/55">{description}</p>
            ) : null}
          </div>
        ) : null}

        {/* Form */}
        <div className="flex flex-col gap-2 sm:flex-row">
          <div className="relative flex-1">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onBlur={() => setTouched(true)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  submit();
                }
              }}
              placeholder="name@company.com"
              aria-invalid={showError}
              className={cn(
                "block w-full rounded-lg border bg-neutral-900 px-3 py-2 text-sm text-white placeholder:text-white/35 outline-none transition-colors",
                showError
                  ? "border-rose-400/50 focus:border-rose-400/70 focus:ring-2 focus:ring-rose-400/30"
                  : "border-white/10 focus:border-sky-300/50 focus:ring-2 focus:ring-sky-300/30"
              )}
            />
            {showError ? (
              <p className="mt-1 text-[11px] text-rose-300">
                Enter a valid email address.
              </p>
            ) : null}
          </div>

          {/* Role picker */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setOpen((o) => !o)}
              aria-haspopup="listbox"
              aria-expanded={open}
              className="flex h-[38px] items-center gap-1.5 rounded-lg border border-white/10 bg-neutral-900 px-3 text-sm text-white/85 hover:bg-white/[0.04]"
            >
              {selectedRole?.label ?? "Role"}
              <svg
                width={12}
                height={12}
                viewBox="0 0 24 24"
                fill="none"
                className="text-white/45"
                aria-hidden
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
                role="listbox"
                className="absolute right-0 top-full z-30 mt-1 w-64 rounded-xl border border-white/10 bg-neutral-950 p-1 shadow-[0_18px_40px_-16px_rgba(0,0,0,0.6)]"
                onMouseLeave={() => setOpen(false)}
              >
                {roles.map((r) => {
                  const active = r.value === role;
                  return (
                    <button
                      key={r.value}
                      type="button"
                      role="option"
                      aria-selected={active}
                      onClick={() => {
                        setRole(r.value);
                        setOpen(false);
                      }}
                      className={cn(
                        "flex w-full items-start gap-2 rounded-lg px-2.5 py-2 text-left",
                        active ? "bg-white/[0.07]" : "hover:bg-white/[0.04]"
                      )}
                    >
                      <span className="mt-1 inline-flex h-3 w-3 shrink-0 items-center justify-center rounded-full border border-white/20">
                        {active ? (
                          <span className="block h-1.5 w-1.5 rounded-full bg-sky-300" />
                        ) : null}
                      </span>
                      <span className="min-w-0">
                        <span className="block text-[13px] font-medium text-white">
                          {r.label}
                        </span>
                        {r.description ? (
                          <span className="block text-[11px] text-white/50">
                            {r.description}
                          </span>
                        ) : null}
                      </span>
                    </button>
                  );
                })}
              </div>
            ) : null}
          </div>

          <button
            type="button"
            onClick={submit}
            disabled={touched && !valid}
            className="rounded-lg bg-sky-300 px-4 py-2 text-sm font-medium text-neutral-950 transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Send invite
          </button>
        </div>

        {/* Pending list */}
        {pending.length > 0 ? (
          <div className="mt-6">
            <p className="mb-2 text-[11px] uppercase tracking-widest text-white/45">
              Pending ({pending.length})
            </p>
            <ul className="divide-y divide-white/[0.06] rounded-xl border border-white/10">
              {pending.map((inv) => (
                <li
                  key={inv.id}
                  className="flex items-center justify-between gap-3 px-3 py-2.5"
                >
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm text-white/90">{inv.email}</p>
                    <p className="mt-0.5 text-[11px] text-white/45">
                      {(roles.find((r) => r.value === inv.role)?.label ?? inv.role)}
                      {inv.sentAt ? ` · invited ${inv.sentAt}` : null}
                    </p>
                  </div>
                  <div className="flex shrink-0 items-center gap-1">
                    <button
                      type="button"
                      onClick={() => onResend?.(inv)}
                      className="rounded-md px-2.5 py-1 text-[11px] font-medium text-white/65 hover:bg-white/[0.06] hover:text-white"
                    >
                      Resend
                    </button>
                    <button
                      type="button"
                      onClick={() => onRevoke?.(inv)}
                      className="rounded-md px-2.5 py-1 text-[11px] font-medium text-rose-300/80 hover:bg-rose-400/10 hover:text-rose-300"
                    >
                      Revoke
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        ) : null}
      </div>
    );
  }
);
InvitePeople.displayName = "InvitePeople";

export { InvitePeople };
