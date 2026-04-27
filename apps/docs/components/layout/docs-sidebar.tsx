"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@craftui/utils";
import { navigation } from "@/lib/navigation";

export function DocsSidebar() {
  const pathname = usePathname();

  return (
    <nav className="thin-scroll h-full w-full overflow-y-auto py-6 pr-4 text-sm">
      {navigation.map((section) => (
        <div key={section.title} className="pb-6">
          <h4 className="mb-2 px-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            {section.title}
          </h4>
          <ul className="space-y-0.5">
            {section.items.map((item) => {
              const active = pathname === item.href;
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={cn(
                      "group relative flex rounded-md px-2 py-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground",
                      active && "font-medium text-foreground"
                    )}
                  >
                    {active ? (
                      <span className="absolute -left-px top-1/2 h-4 w-0.5 -translate-y-1/2 rounded-r bg-foreground" />
                    ) : null}
                    {item.title}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </nav>
  );
}
