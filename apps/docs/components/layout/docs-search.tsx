"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { Search, FileText, Box, Palette, Terminal, Moon } from "lucide-react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@craftui/ui";
import { listRegistry } from "@craftui/registry";

const gettingStarted = [
  { title: "Introduction", href: "/docs", icon: FileText },
  { title: "Installation", href: "/docs/installation", icon: FileText },
  { title: "CLI", href: "/docs/cli", icon: Terminal },
  { title: "Theming", href: "/docs/theming", icon: Palette },
  { title: "Dark Mode", href: "/docs/dark-mode", icon: Moon },
  { title: "Changelog", href: "/docs/changelog", icon: FileText },
  { title: "Roadmap", href: "/docs/roadmap", icon: FileText },
  { title: "All components", href: "/docs/components", icon: Box },
];

export function DocsSearch() {
  const [open, setOpen] = React.useState(false);
  const router = useRouter();

  React.useEffect(() => {
    const down = (event: KeyboardEvent) => {
      if (
        (event.key === "k" || event.key === "K") &&
        (event.metaKey || event.ctrlKey)
      ) {
        event.preventDefault();
        setOpen((prev) => !prev);
      }
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  const go = React.useCallback(
    (href: string) => {
      setOpen(false);
      router.push(href);
    },
    [router]
  );

  const registry = React.useMemo(() => listRegistry(), []);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="hidden h-9 w-56 items-center gap-2 rounded-md border border-border bg-muted/40 px-3 text-sm text-muted-foreground transition-colors hover:bg-muted sm:inline-flex"
      >
        <Search className="h-4 w-4" />
        <span>Search docs…</span>
        <kbd className="ml-auto inline-flex h-5 select-none items-center gap-1 rounded border bg-background px-1.5 font-mono text-[10px] font-medium">
          ⌘ K
        </kbd>
      </button>

      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Search"
        className="inline-flex h-9 w-9 items-center justify-center rounded-md text-muted-foreground hover:bg-muted hover:text-foreground sm:hidden"
      >
        <Search className="h-4 w-4" />
      </button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent
          showClose={false}
          className="max-w-2xl gap-0 overflow-hidden p-0 sm:rounded-xl md:max-w-3xl"
        >
          <DialogTitle className="sr-only">Search documentation</DialogTitle>
          <DialogDescription className="sr-only">
            Search across all CraftUI docs and components. Press the up and
            down arrows to navigate, Enter to select.
          </DialogDescription>
          <Command
            className="[&_[cmdk-group-heading]]:px-3 [&_[cmdk-group-heading]]:pt-3 [&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:font-semibold [&_[cmdk-group-heading]]:uppercase [&_[cmdk-group-heading]]:tracking-wider [&_[cmdk-group-heading]]:text-muted-foreground [&_[cmdk-input-wrapper]]:px-4 [&_[cmdk-input-wrapper]_svg]:h-5 [&_[cmdk-input-wrapper]_svg]:w-5 [&_[cmdk-input]]:h-14 [&_[cmdk-input]]:text-base [&_[cmdk-item]]:rounded-md [&_[cmdk-item]]:px-3 [&_[cmdk-item]]:py-2.5"
          >
            <CommandInput placeholder="Search docs or components…" />
            <CommandList className="thin-scroll max-h-[480px] overflow-y-auto p-2">
              <CommandEmpty className="py-10 text-center">
                <p className="text-sm font-medium">No results found</p>
                <p className="mt-1 text-xs text-muted-foreground">
                  Try a different keyword — e.g. &quot;button&quot;,
                  &quot;form&quot;, &quot;theme&quot;.
                </p>
              </CommandEmpty>

              <CommandGroup heading="Getting Started">
                {gettingStarted.map((item) => (
                  <CommandItem
                    key={item.href}
                    value={item.title}
                    onSelect={() => go(item.href)}
                  >
                    <item.icon className="mr-3 h-4 w-4 text-muted-foreground" />
                    <span>{item.title}</span>
                  </CommandItem>
                ))}
              </CommandGroup>

              <CommandGroup heading="Components">
                {registry
                  .slice()
                  .sort((a, b) => a.name.localeCompare(b.name))
                  .map((entry) => {
                    const title = toTitle(entry.name);
                    return (
                      <CommandItem
                        key={entry.name}
                        value={`${title} ${entry.name} ${entry.category} ${entry.description}`}
                        onSelect={() =>
                          go(`/docs/components/${entry.name}`)
                        }
                      >
                        <Box className="mr-3 h-4 w-4 text-muted-foreground" />
                        <span className="flex-1">{title}</span>
                        <span className="rounded border bg-muted/50 px-1.5 py-0.5 text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
                          {entry.category}
                        </span>
                      </CommandItem>
                    );
                  })}
              </CommandGroup>
            </CommandList>

            <div className="flex items-center justify-between border-t bg-muted/30 px-4 py-2 text-xs text-muted-foreground">
              <div className="flex items-center gap-3">
                <Kbd>↑</Kbd>
                <Kbd>↓</Kbd>
                <span>to navigate</span>
              </div>
              <div className="flex items-center gap-3">
                <Kbd>↵</Kbd>
                <span>to select</span>
                <Kbd>esc</Kbd>
                <span>to close</span>
              </div>
            </div>
          </Command>
        </DialogContent>
      </Dialog>
    </>
  );
}

function Kbd({ children }: { children: React.ReactNode }) {
  return (
    <kbd className="inline-flex h-5 min-w-[20px] select-none items-center justify-center rounded border bg-background px-1.5 font-mono text-[10px] font-medium">
      {children}
    </kbd>
  );
}

function toTitle(name: string) {
  return name
    .split("-")
    .map((p) => p.charAt(0).toUpperCase() + p.slice(1))
    .join(" ");
}
