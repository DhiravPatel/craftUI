"use client";

import * as React from "react";
import { cn } from "../../lib/cn";

export interface TreeNode {
  /** Unique id across the whole tree. */
  id: string;
  /** Row label. */
  label: string;
  /** Optional leading icon. Falls back to a folder / file glyph. */
  icon?: React.ReactNode;
  /** Child nodes. Presence of `children` (even empty) marks a branch. */
  children?: TreeNode[];
}

export interface TreeViewProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onSelect"> {
  /** Root-level nodes. */
  data: TreeNode[];
  /** Ids expanded on first render when uncontrolled. */
  defaultExpanded?: string[];
  /** Controlled set of expanded ids. */
  expanded?: string[];
  /** Fired with the next expanded-id list when a branch toggles. */
  onExpandedChange?: (ids: string[]) => void;
  /** Currently selected id when uncontrolled (initial). */
  defaultSelectedId?: string;
  /** Controlled selected id. */
  selectedId?: string;
  /** Fired when a node is clicked. */
  onSelect?: (id: string, node: TreeNode) => void;
}

const ACCENT = "rgb(125, 211, 252)";

function Chevron({ open }: { open: boolean }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={14}
      height={14}
      fill="none"
      stroke="currentColor"
      strokeWidth={2.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn("shrink-0 transition-transform", open && "rotate-90")}
    >
      <path d="m9 6 6 6-6 6" />
    </svg>
  );
}

function FolderGlyph({ open }: { open: boolean }) {
  return (
    <svg viewBox="0 0 24 24" width={15} height={15} fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" className="shrink-0">
      {open ? (
        <path d="M3 7a2 2 0 0 1 2-2h3.9a2 2 0 0 1 1.69.9l.82 1.2a2 2 0 0 0 1.69.9H19a2 2 0 0 1 2 2H5.5a2 2 0 0 0-1.94 1.5L3 19z" />
      ) : (
        <path d="M3 7a2 2 0 0 1 2-2h3.9a2 2 0 0 1 1.69.9l.82 1.2a2 2 0 0 0 1.69.9H19a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      )}
    </svg>
  );
}

function FileGlyph() {
  return (
    <svg viewBox="0 0 24 24" width={15} height={15} fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" className="shrink-0">
      <path d="M14 3v4a1 1 0 0 0 1 1h4" />
      <path d="M5 3h9l5 5v11a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1z" />
    </svg>
  );
}

interface RowProps {
  node: TreeNode;
  depth: number;
  expanded: Set<string>;
  selectedId?: string;
  onToggle: (id: string) => void;
  onSelect: (id: string, node: TreeNode) => void;
}

function TreeRow({ node, depth, expanded, selectedId, onToggle, onSelect }: RowProps) {
  const isBranch = Array.isArray(node.children);
  const isOpen = expanded.has(node.id);
  const isSelected = selectedId === node.id;

  return (
    <li role="treeitem" aria-expanded={isBranch ? isOpen : undefined} aria-selected={isSelected}>
      <div
        tabIndex={0}
        onClick={() => {
          onSelect(node.id, node);
          if (isBranch) onToggle(node.id);
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            onSelect(node.id, node);
            if (isBranch) onToggle(node.id);
          }
        }}
        className={cn(
          "flex cursor-pointer select-none items-center gap-1.5 rounded-md py-1.5 pr-2 text-sm outline-none transition-colors hover:bg-white/[0.06] focus-visible:ring-1 focus-visible:ring-white/30",
          isSelected ? "bg-white/[0.08] text-white" : "text-white/75"
        )}
        style={{ paddingLeft: `${depth * 16 + 8}px` }}
      >
        {isBranch ? (
          <Chevron open={isOpen} />
        ) : (
          <span className="w-3.5 shrink-0" />
        )}
        <span
          className="shrink-0"
          style={isSelected ? { color: ACCENT } : undefined}
        >
          {node.icon ?? (isBranch ? <FolderGlyph open={isOpen} /> : <FileGlyph />)}
        </span>
        <span className="truncate">{node.label}</span>
      </div>
      {isBranch && isOpen ? (
        <ul role="group">
          {node.children!.map((child) => (
            <TreeRow
              key={child.id}
              node={child}
              depth={depth + 1}
              expanded={expanded}
              selectedId={selectedId}
              onToggle={onToggle}
              onSelect={onSelect}
            />
          ))}
        </ul>
      ) : null}
    </li>
  );
}

/**
 * TreeView — a collapsible hierarchical list for file explorers, nested
 * navigation, or category pickers. Branches (nodes with a `children` array)
 * toggle on click; leaves fire selection. Expansion and selection can each be
 * controlled or uncontrolled, and rows fall back to folder / file glyphs when
 * no icon is supplied. Keyboard accessible and dependency-free.
 */
const TreeView = React.forwardRef<HTMLDivElement, TreeViewProps>(
  (
    {
      data,
      defaultExpanded,
      expanded,
      onExpandedChange,
      defaultSelectedId,
      selectedId,
      onSelect,
      className,
      ...props
    },
    ref
  ) => {
    const expandedControlled = expanded !== undefined;
    const [internalExpanded, setInternalExpanded] = React.useState<Set<string>>(
      () => new Set(defaultExpanded ?? [])
    );
    const expandedSet = expandedControlled
      ? new Set(expanded)
      : internalExpanded;

    const selectControlled = selectedId !== undefined;
    const [internalSelected, setInternalSelected] = React.useState<
      string | undefined
    >(defaultSelectedId);
    const currentSelected = selectControlled ? selectedId : internalSelected;

    const handleToggle = React.useCallback(
      (id: string) => {
        const next = new Set(expandedControlled ? expanded : internalExpanded);
        if (next.has(id)) next.delete(id);
        else next.add(id);
        if (!expandedControlled) setInternalExpanded(next);
        onExpandedChange?.([...next]);
      },
      [expandedControlled, expanded, internalExpanded, onExpandedChange]
    );

    const handleSelect = React.useCallback(
      (id: string, node: TreeNode) => {
        if (!selectControlled) setInternalSelected(id);
        onSelect?.(id, node);
      },
      [selectControlled, onSelect]
    );

    return (
      <div
        ref={ref}
        className={cn(
          "w-full rounded-xl border border-white/10 bg-neutral-950 p-2 text-white",
          className
        )}
        {...props}
      >
        <ul role="tree" className="space-y-0.5">
          {data.map((node) => (
            <TreeRow
              key={node.id}
              node={node}
              depth={0}
              expanded={expandedSet}
              selectedId={currentSelected}
              onToggle={handleToggle}
              onSelect={handleSelect}
            />
          ))}
        </ul>
      </div>
    );
  }
);
TreeView.displayName = "TreeView";

export { TreeView };
