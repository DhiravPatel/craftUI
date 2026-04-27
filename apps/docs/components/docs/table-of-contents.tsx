"use client";

import * as React from "react";
import { cn } from "@craftui/utils";

export interface TocItem {
  id: string;
  title: string;
  level: 2 | 3;
}

export interface TableOfContentsProps {
  items: TocItem[];
  className?: string;
}

export function TableOfContents({ items, className }: TableOfContentsProps) {
  const [activeId, setActiveId] = React.useState<string | null>(
    items[0]?.id ?? null
  );

  React.useEffect(() => {
    if (items.length === 0) return;
    const observers = new Map<string, IntersectionObserver>();
    const visible = new Set<string>();

    items.forEach((item) => {
      const el = document.getElementById(item.id);
      if (!el) return;
      const obs = new IntersectionObserver(
        (entries) => {
          entries.forEach((e) => {
            if (e.isIntersecting) visible.add(item.id);
            else visible.delete(item.id);
          });
          // Pick the topmost visible id in document order
          const first = items.find((i) => visible.has(i.id));
          if (first) setActiveId(first.id);
        },
        { rootMargin: "-80px 0px -66% 0px", threshold: [0, 1] }
      );
      obs.observe(el);
      observers.set(item.id, obs);
    });

    return () => {
      observers.forEach((o) => o.disconnect());
    };
  }, [items]);

  if (items.length === 0) return null;

  return (
    <nav className={cn("text-sm", className)} aria-label="On this page">
      <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
        On this page
      </p>
      <ul className="space-y-1.5">
        {items.map((item) => {
          const active = activeId === item.id;
          return (
            <li
              key={item.id}
              className={cn(item.level === 3 && "pl-3")}
            >
              <a
                href={`#${item.id}`}
                onClick={() => setActiveId(item.id)}
                className={cn(
                  "block text-muted-foreground transition-colors hover:text-foreground",
                  active && "font-medium text-foreground"
                )}
              >
                {item.title}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
