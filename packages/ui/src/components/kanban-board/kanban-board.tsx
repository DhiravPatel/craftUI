"use client";

import * as React from "react";
import { cn } from "../../lib/cn";

export interface KanbanCard {
  /** Unique id across the whole board. */
  id: string;
  /** Card heading. */
  title: string;
  /** Optional secondary line under the title. */
  description?: string;
  /** Optional pills shown at the bottom of the card. */
  tags?: string[];
  /** Optional assignee initials shown as a small avatar. */
  assignee?: string;
}

export interface KanbanColumn {
  /** Unique column id — used as the key in the board value. */
  id: string;
  /** Column heading. */
  title: string;
  /** Accent color for the header dot + count. Default sky. */
  accent?: string;
}

/** Map of column id -> the cards currently in that column, in order. */
export type KanbanState = Record<string, KanbanCard[]>;

export interface KanbanBoardProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange" | "defaultValue"> {
  /** Column definitions, left to right. */
  columns: KanbanColumn[];
  /** Controlled board state keyed by column id. */
  value?: KanbanState;
  /** Initial board state when uncontrolled. */
  defaultValue?: KanbanState;
  /** Fired with the next board state after a card is moved. */
  onChange?: (next: KanbanState) => void;
  /** Override how a card renders. */
  renderCard?: (card: KanbanCard, columnId: string) => React.ReactNode;
}

const ACCENT = "rgb(125, 211, 252)";

interface DragInfo {
  cardId: string;
  fromColumn: string;
}

/**
 * KanbanBoard — a drag-and-drop task board. Cards live in columns keyed by id;
 * drag a card to another column (or to reorder within one) and the board emits
 * the next state. Works controlled or uncontrolled, uses native HTML5 drag and
 * drop (no dependencies), and lets you customize card rendering. Great for
 * pipelines, sprint boards, and triage queues.
 */
const KanbanBoard = React.forwardRef<HTMLDivElement, KanbanBoardProps>(
  (
    {
      columns,
      value,
      defaultValue,
      onChange,
      renderCard,
      className,
      ...props
    },
    ref
  ) => {
    const isControlled = value !== undefined;
    const [internal, setInternal] = React.useState<KanbanState>(
      defaultValue ?? {}
    );
    const state = isControlled ? value! : internal;

    const [drag, setDrag] = React.useState<DragInfo | null>(null);
    const [overColumn, setOverColumn] = React.useState<string | null>(null);

    const commit = React.useCallback(
      (next: KanbanState) => {
        if (!isControlled) setInternal(next);
        onChange?.(next);
      },
      [isControlled, onChange]
    );

    const moveCard = React.useCallback(
      (cardId: string, fromColumn: string, toColumn: string, beforeId?: string) => {
        if (fromColumn === toColumn && beforeId === cardId) return;
        const source = state[fromColumn] ?? [];
        const card = source.find((c) => c.id === cardId);
        if (!card) return;

        const next: KanbanState = { ...state };
        next[fromColumn] = source.filter((c) => c.id !== cardId);
        const dest = (fromColumn === toColumn ? next[fromColumn] : state[toColumn] ?? []).filter(
          (c) => c.id !== cardId
        );
        const index = beforeId
          ? dest.findIndex((c) => c.id === beforeId)
          : -1;
        if (index === -1) dest.push(card);
        else dest.splice(index, 0, card);
        next[toColumn] = dest;
        commit(next);
      },
      [state, commit]
    );

    const handleDrop = (toColumn: string, beforeId?: string) => {
      if (!drag) return;
      moveCard(drag.cardId, drag.fromColumn, toColumn, beforeId);
      setDrag(null);
      setOverColumn(null);
    };

    return (
      <div
        ref={ref}
        className={cn(
          "flex w-full gap-4 overflow-x-auto rounded-2xl border border-white/10 bg-neutral-950 p-4 text-white",
          className
        )}
        {...props}
      >
        {columns.map((column) => {
          const cards = state[column.id] ?? [];
          const accent = column.accent ?? ACCENT;
          const isOver = overColumn === column.id;
          return (
            <div
              key={column.id}
              className="flex min-w-[15rem] flex-1 flex-col"
              onDragOver={(e) => {
                if (!drag) return;
                e.preventDefault();
                setOverColumn(column.id);
              }}
              onDrop={(e) => {
                e.preventDefault();
                handleDrop(column.id);
              }}
            >
              <div className="mb-3 flex items-center gap-2 px-1">
                <span
                  className="h-2 w-2 rounded-full"
                  style={{ backgroundColor: accent }}
                />
                <span className="text-sm font-semibold">{column.title}</span>
                <span
                  className="ml-auto rounded-full px-2 py-0.5 text-xs font-medium"
                  style={{ backgroundColor: `${accent}1f`, color: accent }}
                >
                  {cards.length}
                </span>
              </div>
              <div
                className={cn(
                  "flex min-h-24 flex-1 flex-col gap-2 rounded-xl border border-transparent p-1.5 transition-colors",
                  isOver && "border-white/15 bg-white/[0.03]"
                )}
              >
                {cards.map((card) => (
                  <div
                    key={card.id}
                    draggable
                    onDragStart={() =>
                      setDrag({ cardId: card.id, fromColumn: column.id })
                    }
                    onDragEnd={() => {
                      setDrag(null);
                      setOverColumn(null);
                    }}
                    onDragOver={(e) => {
                      if (!drag) return;
                      e.preventDefault();
                      e.stopPropagation();
                      setOverColumn(column.id);
                    }}
                    onDrop={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      handleDrop(column.id, card.id);
                    }}
                    className={cn(
                      "cursor-grab rounded-lg border border-white/10 bg-white/[0.04] p-3 shadow-sm transition-all active:cursor-grabbing hover:border-white/20",
                      drag?.cardId === card.id && "opacity-40"
                    )}
                  >
                    {renderCard ? (
                      renderCard(card, column.id)
                    ) : (
                      <>
                        <p className="text-sm font-medium leading-snug">
                          {card.title}
                        </p>
                        {card.description ? (
                          <p className="mt-1 text-xs leading-snug text-white/55">
                            {card.description}
                          </p>
                        ) : null}
                        {(card.tags?.length || card.assignee) && (
                          <div className="mt-2.5 flex items-center gap-1.5">
                            {card.tags?.map((tag) => (
                              <span
                                key={tag}
                                className="rounded bg-white/10 px-1.5 py-0.5 text-[10px] font-medium text-white/70"
                              >
                                {tag}
                              </span>
                            ))}
                            {card.assignee ? (
                              <span
                                className="ml-auto flex h-5 w-5 items-center justify-center rounded-full text-[10px] font-semibold text-neutral-950"
                                style={{ backgroundColor: accent }}
                              >
                                {card.assignee}
                              </span>
                            ) : null}
                          </div>
                        )}
                      </>
                    )}
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    );
  }
);
KanbanBoard.displayName = "KanbanBoard";

export { KanbanBoard };
