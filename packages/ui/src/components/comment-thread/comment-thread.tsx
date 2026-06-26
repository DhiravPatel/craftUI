"use client";

import * as React from "react";
import { cn } from "../../lib/cn";

export interface CommentThreadAuthor {
  name: string;
  avatar?: string;
  /** Tiny inline badge — e.g. "Author", "Mod", "Pro". */
  badge?: string;
}

export interface CommentThreadReaction {
  /** Stable id used by onReact. */
  id: string;
  /** Emoji glyph rendered in the chip. */
  emoji: string;
  /** Total reactions of this type. */
  count: number;
  /** Did the current viewer add this reaction? Highlights the chip. */
  you?: boolean;
}

export interface CommentThreadNode {
  id: string;
  author: CommentThreadAuthor;
  body: React.ReactNode;
  /** Relative time string ("2h", "yesterday"). Rendered as-is. */
  time?: string;
  /** Mark the comment as having been edited (adds "· edited"). */
  edited?: boolean;
  replies?: CommentThreadNode[];
  reactions?: CommentThreadReaction[];
}

export interface CommentThreadCurrentUser {
  name: string;
  avatar?: string;
}

export interface CommentThreadProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onSelect"> {
  /** Tree of comments. Each node may carry its own `replies`. */
  comments: CommentThreadNode[];
  /** Current viewer — drives the composer avatar and reaction ownership. */
  currentUser?: CommentThreadCurrentUser;
  /** Fires when the user submits a new reply. `parentId === null` for top-level. */
  onReply?: (parentId: string | null, body: string) => void;
  /** Fires when the user toggles a reaction on a comment. */
  onReact?: (commentId: string, reactionId: string) => void;
  /** Fires when an edit is saved. */
  onEdit?: (commentId: string, body: string) => void;
  /** Fires when the user confirms a delete. */
  onDelete?: (commentId: string) => void;
  /** Max nesting depth before the indent caps. Default 3. */
  maxDepth?: number;
  /** Render the Reply action / composer. Default true. */
  canReply?: boolean;
  /** Render the React action / picker. Default true. */
  canReact?: boolean;
  /** Render the Edit action. Default false. */
  canEdit?: boolean;
  /** Render the Delete action. Default false. */
  canDelete?: boolean;
  /** Accent color used for highlighted chips, focus rings, primary buttons. */
  accentColor?: string;
  /** Render a top-level composer above the thread. Default true. */
  showTopComposer?: boolean;
  /** Placeholder for any reply composer. Default "Write a reply…". */
  composerPlaceholder?: string;
}

const DEFAULT_ACCENT = "rgb(125, 211, 252)";

const QUICK_REACTIONS: ReadonlyArray<{ id: string; emoji: string }> = [
  { id: "like", emoji: "👍" },
  { id: "love", emoji: "❤️" },
  { id: "laugh", emoji: "😄" },
  { id: "wow", emoji: "😮" },
  { id: "sad", emoji: "😢" },
  { id: "fire", emoji: "🔥" },
];

function initialsOf(name: string): string {
  const parts = name.trim().split(/\s+/);
  const first = parts[0]?.[0] ?? "";
  const second = parts.length > 1 ? parts[parts.length - 1]?.[0] ?? "" : "";
  return (first + second).toUpperCase() || "?";
}

interface AvatarProps {
  name: string;
  src?: string;
  size?: number;
}

function Avatar({ name, src, size = 28 }: AvatarProps) {
  const dim = { width: size, height: size };
  if (src) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={src}
        alt=""
        draggable={false}
        className="shrink-0 rounded-full object-cover"
        style={dim}
      />
    );
  }
  return (
    <span
      aria-hidden
      className="flex shrink-0 select-none items-center justify-center rounded-full bg-white/10 text-[10px] font-semibold text-white/80"
      style={dim}
    >
      {initialsOf(name)}
    </span>
  );
}

interface ComposerProps {
  currentUser?: CommentThreadCurrentUser;
  placeholder: string;
  accentColor: string;
  submitLabel?: string;
  autoFocus?: boolean;
  onCancel?: () => void;
  onSubmit: (body: string) => void;
}

function Composer({
  currentUser,
  placeholder,
  accentColor,
  submitLabel = "Reply",
  autoFocus,
  onCancel,
  onSubmit,
}: ComposerProps) {
  const [value, setValue] = React.useState("");
  const taRef = React.useRef<HTMLTextAreaElement | null>(null);

  React.useEffect(() => {
    if (autoFocus && taRef.current) taRef.current.focus();
  }, [autoFocus]);

  const submit = () => {
    const trimmed = value.trim();
    if (!trimmed) return;
    onSubmit(trimmed);
    setValue("");
  };

  return (
    <div className="flex items-start gap-2">
      {currentUser ? (
        <Avatar name={currentUser.name} src={currentUser.avatar} size={26} />
      ) : null}
      <div className="min-w-0 flex-1">
        <textarea
          ref={taRef}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) {
              e.preventDefault();
              submit();
            } else if (e.key === "Escape" && onCancel) {
              e.preventDefault();
              onCancel();
            }
          }}
          rows={2}
          placeholder={placeholder}
          className="w-full resize-y rounded-lg border border-white/10 bg-white/[0.03] px-3 py-2 text-sm text-white placeholder:text-white/35 outline-none transition-colors focus:border-white/20 focus:bg-white/[0.05] focus:ring-2"
          style={
            {
              ["--tw-ring-color" as string]: `${accentColor}40`,
            } as React.CSSProperties
          }
        />
        <div className="mt-1.5 flex items-center justify-end gap-1.5">
          {onCancel ? (
            <button
              type="button"
              onClick={onCancel}
              className="flex h-7 items-center rounded-md bg-white/[0.06] px-2.5 text-[11px] font-medium text-white/75 transition-colors hover:bg-white/[0.1] hover:text-white"
            >
              Cancel
            </button>
          ) : null}
          <button
            type="button"
            onClick={submit}
            disabled={value.trim().length === 0}
            className="flex h-7 items-center rounded-md px-2.5 text-[11px] font-semibold text-neutral-950 transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
            style={{ background: accentColor }}
          >
            {submitLabel}
          </button>
        </div>
      </div>
    </div>
  );
}

interface CommentRowProps {
  node: CommentThreadNode;
  depth: number;
  maxDepth: number;
  currentUser?: CommentThreadCurrentUser;
  canReply: boolean;
  canReact: boolean;
  canEdit: boolean;
  canDelete: boolean;
  accentColor: string;
  composerPlaceholder: string;
  onReply?: (parentId: string | null, body: string) => void;
  onReact?: (commentId: string, reactionId: string) => void;
  onEdit?: (commentId: string, body: string) => void;
  onDelete?: (commentId: string) => void;
}

function CommentRow({
  node,
  depth,
  maxDepth,
  currentUser,
  canReply,
  canReact,
  canEdit,
  canDelete,
  accentColor,
  composerPlaceholder,
  onReply,
  onReact,
  onEdit,
  onDelete,
}: CommentRowProps) {
  const [replyOpen, setReplyOpen] = React.useState(false);
  const [editing, setEditing] = React.useState(false);
  const [collapsed, setCollapsed] = React.useState(false);
  const [pickerOpen, setPickerOpen] = React.useState(false);
  const [confirmDelete, setConfirmDelete] = React.useState(false);
  const pickerRef = React.useRef<HTMLDivElement | null>(null);
  const reactBtnRef = React.useRef<HTMLButtonElement | null>(null);

  // Edit drafts a string snapshot of the body when body is a string,
  // otherwise the user gets an empty draft (rich bodies aren't editable inline).
  const initialEditDraft = typeof node.body === "string" ? node.body : "";
  const [editDraft, setEditDraft] = React.useState(initialEditDraft);

  // Close the reaction picker on outside click / Esc.
  React.useEffect(() => {
    if (!pickerOpen) return;
    const onDown = (e: MouseEvent) => {
      const t = e.target as Node;
      if (
        pickerRef.current &&
        !pickerRef.current.contains(t) &&
        reactBtnRef.current &&
        !reactBtnRef.current.contains(t)
      ) {
        setPickerOpen(false);
      }
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setPickerOpen(false);
    };
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [pickerOpen]);

  const replyCount = node.replies?.length ?? 0;
  const hasReplies = replyCount > 0;
  const indentBeyondCap = depth >= maxDepth;

  const beginEdit = () => {
    setEditDraft(typeof node.body === "string" ? node.body : "");
    setEditing(true);
  };

  const saveEdit = () => {
    const trimmed = editDraft.trim();
    if (!trimmed) return;
    onEdit?.(node.id, trimmed);
    setEditing(false);
  };

  return (
    <div className="flex flex-col">
      <div className="flex items-start gap-2.5">
        <Avatar name={node.author.name} src={node.author.avatar} />
        <div className="min-w-0 flex-1">
          {/* Author line */}
          <div className="flex flex-wrap items-baseline gap-x-1.5 gap-y-0.5">
            <span className="text-sm font-semibold leading-tight text-white">
              {node.author.name}
            </span>
            {node.author.badge ? (
              <span
                className="rounded-full px-1.5 py-px text-[9px] font-semibold uppercase tracking-wider"
                style={{
                  background: `${accentColor}22`,
                  color: accentColor,
                }}
              >
                {node.author.badge}
              </span>
            ) : null}
            {node.time ? (
              <span className="text-[11px] text-white/45">{node.time}</span>
            ) : null}
            {node.edited ? (
              <span className="text-[11px] italic text-white/35">· edited</span>
            ) : null}
          </div>

          {/* Body or edit textarea */}
          {editing ? (
            <div className="mt-1.5">
              <textarea
                value={editDraft}
                onChange={(e) => setEditDraft(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) {
                    e.preventDefault();
                    saveEdit();
                  } else if (e.key === "Escape") {
                    e.preventDefault();
                    setEditing(false);
                  }
                }}
                rows={2}
                className="w-full resize-y rounded-lg border border-white/10 bg-white/[0.03] px-3 py-2 text-sm text-white outline-none transition-colors focus:border-white/20 focus:bg-white/[0.05] focus:ring-2"
                style={
                  {
                    ["--tw-ring-color" as string]: `${accentColor}40`,
                  } as React.CSSProperties
                }
              />
              <div className="mt-1.5 flex items-center justify-end gap-1.5">
                <button
                  type="button"
                  onClick={() => setEditing(false)}
                  className="flex h-7 items-center rounded-md bg-white/[0.06] px-2.5 text-[11px] font-medium text-white/75 transition-colors hover:bg-white/[0.1] hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={saveEdit}
                  disabled={editDraft.trim().length === 0}
                  className="flex h-7 items-center rounded-md px-2.5 text-[11px] font-semibold text-neutral-950 transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
                  style={{ background: accentColor }}
                >
                  Save
                </button>
              </div>
            </div>
          ) : (
            <div className="mt-0.5 text-sm leading-relaxed text-white/85">
              {node.body}
            </div>
          )}

          {/* Reactions strip */}
          {!editing && node.reactions && node.reactions.length > 0 ? (
            <div className="mt-1.5 flex flex-wrap items-center gap-1">
              {node.reactions.map((r) => (
                <button
                  key={r.id}
                  type="button"
                  onClick={() => onReact?.(node.id, r.id)}
                  aria-pressed={r.you ?? false}
                  className={cn(
                    "flex items-center gap-1 rounded-full px-2 py-0.5 text-[11px] transition-colors",
                    r.you
                      ? "text-white"
                      : "bg-white/[0.05] text-white/70 hover:bg-white/[0.08] hover:text-white"
                  )}
                  style={
                    r.you
                      ? {
                          background: `${accentColor}26`,
                          boxShadow: `inset 0 0 0 1px ${accentColor}55`,
                        }
                      : undefined
                  }
                >
                  <span aria-hidden>{r.emoji}</span>
                  <span className="font-mono tabular-nums">{r.count}</span>
                </button>
              ))}
            </div>
          ) : null}

          {/* Action row */}
          {!editing ? (
            <div className="mt-1.5 flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] text-white/55">
              {canReply ? (
                <button
                  type="button"
                  onClick={() => setReplyOpen((v) => !v)}
                  className="font-medium transition-colors hover:text-white"
                >
                  {replyOpen ? "Cancel" : "Reply"}
                </button>
              ) : null}

              {canReact ? (
                <div className="relative">
                  <button
                    ref={reactBtnRef}
                    type="button"
                    onClick={() => setPickerOpen((v) => !v)}
                    aria-haspopup="menu"
                    aria-expanded={pickerOpen}
                    className="font-medium transition-colors hover:text-white"
                  >
                    React
                  </button>
                  {pickerOpen ? (
                    <div
                      ref={pickerRef}
                      role="menu"
                      aria-label="Add reaction"
                      className="absolute left-0 top-full z-10 mt-1 flex items-center gap-0.5 rounded-full border border-white/10 bg-neutral-900 p-1 shadow-[0_10px_30px_-10px_rgba(0,0,0,0.6)] craftui-comment-thread-pop"
                    >
                      {QUICK_REACTIONS.map((r) => (
                        <button
                          key={r.id}
                          type="button"
                          role="menuitem"
                          onClick={() => {
                            onReact?.(node.id, r.id);
                            setPickerOpen(false);
                          }}
                          className="flex h-7 w-7 items-center justify-center rounded-full text-base transition-transform hover:scale-125 hover:bg-white/[0.06]"
                          aria-label={`React with ${r.emoji}`}
                        >
                          <span aria-hidden>{r.emoji}</span>
                        </button>
                      ))}
                    </div>
                  ) : null}
                </div>
              ) : null}

              {canEdit ? (
                <button
                  type="button"
                  onClick={beginEdit}
                  className="font-medium transition-colors hover:text-white"
                >
                  Edit
                </button>
              ) : null}

              {canDelete ? (
                confirmDelete ? (
                  <span className="flex items-center gap-1.5">
                    <span className="text-rose-300/85">Delete?</span>
                    <button
                      type="button"
                      onClick={() => {
                        onDelete?.(node.id);
                        setConfirmDelete(false);
                      }}
                      className="font-semibold text-rose-300 transition-colors hover:text-rose-200"
                    >
                      Yes
                    </button>
                    <button
                      type="button"
                      onClick={() => setConfirmDelete(false)}
                      className="font-medium text-white/55 transition-colors hover:text-white"
                    >
                      No
                    </button>
                  </span>
                ) : (
                  <button
                    type="button"
                    onClick={() => setConfirmDelete(true)}
                    className="font-medium transition-colors hover:text-rose-300"
                  >
                    Delete
                  </button>
                )
              ) : null}

              {hasReplies ? (
                <button
                  type="button"
                  onClick={() => setCollapsed((v) => !v)}
                  aria-expanded={!collapsed}
                  className="ml-auto inline-flex items-center gap-1 font-medium transition-colors hover:text-white"
                >
                  <svg
                    width={10}
                    height={10}
                    viewBox="0 0 24 24"
                    fill="none"
                    aria-hidden
                    className={cn(
                      "transition-transform duration-200",
                      collapsed ? "-rotate-90" : "rotate-0"
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
                  {collapsed
                    ? `Show ${replyCount} ${replyCount === 1 ? "reply" : "replies"}`
                    : `Hide ${replyCount} ${replyCount === 1 ? "reply" : "replies"}`}
                </button>
              ) : null}
            </div>
          ) : null}

          {/* Inline reply composer */}
          {replyOpen && canReply ? (
            <div className="mt-2.5">
              <Composer
                currentUser={currentUser}
                placeholder={composerPlaceholder}
                accentColor={accentColor}
                autoFocus
                onCancel={() => setReplyOpen(false)}
                onSubmit={(body) => {
                  onReply?.(node.id, body);
                  setReplyOpen(false);
                }}
              />
            </div>
          ) : null}
        </div>
      </div>

      {/* Nested replies */}
      {hasReplies && !collapsed ? (
        <div
          className={cn(
            "mt-3 flex flex-col gap-4 border-l border-white/10",
            indentBeyondCap ? "ml-3 pl-3" : "ml-3 pl-4"
          )}
        >
          {node.replies!.map((child) => (
            <CommentRow
              key={child.id}
              node={child}
              depth={Math.min(depth + 1, maxDepth)}
              maxDepth={maxDepth}
              currentUser={currentUser}
              canReply={canReply}
              canReact={canReact}
              canEdit={canEdit}
              canDelete={canDelete}
              accentColor={accentColor}
              composerPlaceholder={composerPlaceholder}
              onReply={onReply}
              onReact={onReact}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          ))}
        </div>
      ) : null}
    </div>
  );
}

/**
 * CommentThread — a self-contained threaded discussion. Renders avatars,
 * authors with optional badges, relative timestamps, reactions (chips with
 * emoji + count; "you" chips are accent-highlighted), and an action row of
 * Reply / React / Edit / Delete that's gated per-prop. Reply opens an inline
 * composer; React opens a tiny picker with six common emojis; Edit swaps
 * the body for a textarea (works on string bodies); Delete asks for inline
 * confirmation. Nested replies indent under a left border up to `maxDepth`
 * (after which the indent caps). Each parent comment has a collapse toggle.
 * Pure React + Tailwind, no dependencies.
 */
const CommentThread = React.forwardRef<HTMLDivElement, CommentThreadProps>(
  (
    {
      comments,
      currentUser,
      onReply,
      onReact,
      onEdit,
      onDelete,
      maxDepth = 3,
      canReply = true,
      canReact = true,
      canEdit = false,
      canDelete = false,
      accentColor = DEFAULT_ACCENT,
      showTopComposer = true,
      composerPlaceholder = "Write a reply…",
      className,
      style,
      ...props
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        className={cn(
          "w-full max-w-xl rounded-2xl border border-white/10 bg-neutral-950 p-4 text-white shadow-[0_20px_60px_-20px_rgba(0,0,0,0.6)]",
          className
        )}
        style={style}
        {...props}
      >
        {showTopComposer && canReply ? (
          <div className="mb-4 border-b border-white/5 pb-4">
            <Composer
              currentUser={currentUser}
              placeholder={composerPlaceholder.replace("reply", "comment")}
              accentColor={accentColor}
              submitLabel="Comment"
              onSubmit={(body) => onReply?.(null, body)}
            />
          </div>
        ) : null}

        {comments.length === 0 ? (
          <p className="px-2 py-6 text-center text-xs text-white/40">
            No comments yet.
          </p>
        ) : (
          <div className="flex flex-col gap-5">
            {comments.map((c) => (
              <CommentRow
                key={c.id}
                node={c}
                depth={0}
                maxDepth={maxDepth}
                currentUser={currentUser}
                canReply={canReply}
                canReact={canReact}
                canEdit={canEdit}
                canDelete={canDelete}
                accentColor={accentColor}
                composerPlaceholder={composerPlaceholder}
                onReply={onReply}
                onReact={onReact}
                onEdit={onEdit}
                onDelete={onDelete}
              />
            ))}
          </div>
        )}

        <style>{`
          @keyframes craftui-comment-thread-pop {
            0% { opacity: 0; transform: translateY(-2px) scale(0.94); }
            100% { opacity: 1; transform: translateY(0) scale(1); }
          }
          .craftui-comment-thread-pop {
            animation: craftui-comment-thread-pop 140ms cubic-bezier(0.22,1,0.36,1) both;
            transform-origin: top left;
          }
        `}</style>
      </div>
    );
  }
);
CommentThread.displayName = "CommentThread";

export { CommentThread };
