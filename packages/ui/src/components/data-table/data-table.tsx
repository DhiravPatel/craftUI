"use client";

import * as React from "react";
import { cn } from "../../lib/cn";

export interface DataTableColumn<T> {
  /** Stable key for the column. */
  key: string;
  /** Header content. */
  header: React.ReactNode;
  /** Returns the cell content for a row. Defaults to row[key]. */
  accessor?: (row: T) => React.ReactNode;
  /** Provide a sort value to make the column sortable. */
  sortBy?: (row: T) => string | number;
  /** Cell + header alignment. Default "left". */
  align?: "left" | "right" | "center";
  /** Fixed column width, e.g. "8rem" or 120. */
  width?: string | number;
  /** Extra classes on each cell in this column. */
  className?: string;
}

export interface DataTableProps<T>
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onSelect"> {
  /** Column definitions, left to right. */
  columns: DataTableColumn<T>[];
  /** Row data. */
  data: T[];
  /** Stable key per row — required for sorting / selection. */
  rowKey: (row: T, index: number) => string;
  /** Rows per page. Omit to render every row without pagination. */
  pageSize?: number;
  /** Show a leading checkbox column. */
  selectable?: boolean;
  /** Controlled selected row keys. */
  selectedKeys?: string[];
  /** Fired with the next selected-key list. */
  onSelectionChange?: (keys: string[]) => void;
  /** Fired when a row body is clicked. */
  onRowClick?: (row: T) => void;
  /** Shown when data is empty. */
  emptyMessage?: React.ReactNode;
}

type SortState = { key: string; dir: "asc" | "desc" } | null;

const ACCENT = "rgb(125, 211, 252)";

function SortIcon({ dir }: { dir: "asc" | "desc" | null }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={13}
      height={13}
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn("shrink-0 transition-opacity", dir ? "opacity-100" : "opacity-30")}
    >
      {dir === "desc" ? <path d="m6 9 6 6 6-6" /> : <path d="m6 15 6-6 6 6" />}
    </svg>
  );
}

/**
 * DataTable — a sortable, paginated table driven by a column config. Click a
 * sortable header to cycle ascending / descending; pass `pageSize` to page the
 * rows, and `selectable` to add a checkbox column with a header "select all".
 * Cells render `row[key]` by default or a custom `accessor`. Works controlled
 * or uncontrolled for selection, and is dependency-free. Ideal for dashboards,
 * admin tables, and report views.
 */
function DataTable<T>({
  columns,
  data,
  rowKey,
  pageSize,
  selectable = false,
  selectedKeys,
  onSelectionChange,
  onRowClick,
  emptyMessage = "No data to display.",
  className,
  ...props
}: DataTableProps<T>) {
  const [sort, setSort] = React.useState<SortState>(null);
  const [page, setPage] = React.useState(0);

  const selectControlled = selectedKeys !== undefined;
  const [internalSel, setInternalSel] = React.useState<string[]>([]);
  const selected = selectControlled ? selectedKeys! : internalSel;

  const commitSelection = React.useCallback(
    (next: string[]) => {
      if (!selectControlled) setInternalSel(next);
      onSelectionChange?.(next);
    },
    [selectControlled, onSelectionChange]
  );

  const sorted = React.useMemo(() => {
    if (!sort) return data;
    const col = columns.find((c) => c.key === sort.key);
    if (!col?.sortBy) return data;
    const factor = sort.dir === "asc" ? 1 : -1;
    return [...data].sort((a, b) => {
      const av = col.sortBy!(a);
      const bv = col.sortBy!(b);
      if (av < bv) return -1 * factor;
      if (av > bv) return 1 * factor;
      return 0;
    });
  }, [data, sort, columns]);

  const pageCount = pageSize ? Math.max(1, Math.ceil(sorted.length / pageSize)) : 1;
  const safePage = Math.min(page, pageCount - 1);
  const rows = pageSize
    ? sorted.slice(safePage * pageSize, safePage * pageSize + pageSize)
    : sorted;

  const pageKeys = rows.map((r, i) => rowKey(r, i));
  const allSelected = pageKeys.length > 0 && pageKeys.every((k) => selected.includes(k));
  const someSelected = pageKeys.some((k) => selected.includes(k));

  const toggleAll = () => {
    if (allSelected) commitSelection(selected.filter((k) => !pageKeys.includes(k)));
    else commitSelection([...new Set([...selected, ...pageKeys])]);
  };

  const toggleRow = (key: string) => {
    if (selected.includes(key)) commitSelection(selected.filter((k) => k !== key));
    else commitSelection([...selected, key]);
  };

  const cycleSort = (col: DataTableColumn<T>) => {
    if (!col.sortBy) return;
    setSort((prev) => {
      if (!prev || prev.key !== col.key) return { key: col.key, dir: "asc" };
      if (prev.dir === "asc") return { key: col.key, dir: "desc" };
      return null;
    });
  };

  const alignClass = (a?: "left" | "right" | "center") =>
    a === "right" ? "text-right" : a === "center" ? "text-center" : "text-left";

  return (
    <div
      className={cn(
        "w-full overflow-hidden rounded-xl border border-white/10 bg-neutral-950 text-white",
        className
      )}
      {...props}
    >
      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr className="border-b border-white/10 text-left text-xs uppercase tracking-wide text-white/45">
              {selectable ? (
                <th className="w-10 px-3 py-2.5">
                  <input
                    type="checkbox"
                    aria-label="Select all rows"
                    checked={allSelected}
                    ref={(el) => {
                      if (el) el.indeterminate = !allSelected && someSelected;
                    }}
                    onChange={toggleAll}
                    className="h-3.5 w-3.5 cursor-pointer accent-sky-400"
                  />
                </th>
              ) : null}
              {columns.map((col) => {
                const dir = sort?.key === col.key ? sort.dir : null;
                return (
                  <th
                    key={col.key}
                    style={{ width: col.width }}
                    className={cn("px-3 py-2.5 font-medium", alignClass(col.align))}
                  >
                    {col.sortBy ? (
                      <button
                        type="button"
                        onClick={() => cycleSort(col)}
                        className={cn(
                          "inline-flex items-center gap-1 transition-colors hover:text-white",
                          dir && "text-white"
                        )}
                        style={dir ? { color: ACCENT } : undefined}
                      >
                        {col.header}
                        <SortIcon dir={dir} />
                      </button>
                    ) : (
                      col.header
                    )}
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody>
            {rows.length === 0 ? (
              <tr>
                <td
                  colSpan={columns.length + (selectable ? 1 : 0)}
                  className="px-3 py-10 text-center text-sm text-white/45"
                >
                  {emptyMessage}
                </td>
              </tr>
            ) : (
              rows.map((row, i) => {
                const key = rowKey(row, i);
                const isSelected = selected.includes(key);
                return (
                  <tr
                    key={key}
                    onClick={() => onRowClick?.(row)}
                    className={cn(
                      "border-b border-white/[0.06] transition-colors last:border-0",
                      onRowClick && "cursor-pointer",
                      isSelected ? "bg-white/[0.06]" : "hover:bg-white/[0.03]"
                    )}
                  >
                    {selectable ? (
                      <td className="px-3 py-2.5" onClick={(e) => e.stopPropagation()}>
                        <input
                          type="checkbox"
                          aria-label={`Select row ${key}`}
                          checked={isSelected}
                          onChange={() => toggleRow(key)}
                          className="h-3.5 w-3.5 cursor-pointer accent-sky-400"
                        />
                      </td>
                    ) : null}
                    {columns.map((col) => (
                      <td
                        key={col.key}
                        className={cn("px-3 py-2.5 text-white/80", alignClass(col.align), col.className)}
                      >
                        {col.accessor
                          ? col.accessor(row)
                          : ((row as Record<string, React.ReactNode>)[col.key] ?? null)}
                      </td>
                    ))}
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {pageSize && sorted.length > pageSize ? (
        <div className="flex items-center justify-between border-t border-white/10 px-3 py-2.5 text-xs text-white/55">
          <span>
            {safePage * pageSize + 1}–
            {Math.min((safePage + 1) * pageSize, sorted.length)} of {sorted.length}
          </span>
          <div className="flex items-center gap-1">
            <button
              type="button"
              disabled={safePage === 0}
              onClick={() => setPage((p) => Math.max(0, p - 1))}
              className="rounded-md border border-white/10 px-2 py-1 transition-colors hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-40"
            >
              Prev
            </button>
            <span className="px-1.5">
              {safePage + 1} / {pageCount}
            </span>
            <button
              type="button"
              disabled={safePage >= pageCount - 1}
              onClick={() => setPage((p) => Math.min(pageCount - 1, p + 1))}
              className="rounded-md border border-white/10 px-2 py-1 transition-colors hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-40"
            >
              Next
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
}
DataTable.displayName = "DataTable";

export { DataTable };
