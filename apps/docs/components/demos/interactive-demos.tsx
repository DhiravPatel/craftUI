"use client";

import * as React from "react";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Badge,
  Button,
  Checkbox,
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  Input,
  Label,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarNavItem,
  Toggle,
  toast,
  useTheme,
} from "@craftui/ui";
import {
  Bell,
  Check,
  ChevronsUpDown,
  CreditCard,
  Globe,
  LayoutGrid,
  Monitor,
  Moon,
  Search,
  Settings,
  Sun,
  User,
  Users,
} from "lucide-react";
import { cn } from "@craftui/utils";

/* ------------------------------------------------------------------
 * Toast — a real button that calls toast() with several variants.
 * ------------------------------------------------------------------ */
export function ToastDemo() {
  return (
    <div className="flex flex-wrap gap-2">
      <Button
        onClick={() =>
          toast({
            title: "Saved",
            description: "Your changes are live.",
          })
        }
      >
        Show toast
      </Button>
      <Button
        variant="outline"
        onClick={() =>
          toast({
            title: "Scheduled",
            description: "Meeting at 10:30am tomorrow.",
            action: (
              <Button variant="outline" size="sm">
                Undo
              </Button>
            ),
          })
        }
      >
        With action
      </Button>
      <Button
        variant="destructive"
        onClick={() =>
          toast({
            variant: "destructive",
            title: "Failed to save",
            description: "Check your connection and try again.",
          })
        }
      >
        Error toast
      </Button>
    </div>
  );
}

/* ------------------------------------------------------------------
 * ThemeProvider — interactive triple toggle (light / dark / system).
 * ------------------------------------------------------------------ */
export function ThemeProviderDemo() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const options = [
    { value: "light" as const, label: "Light", icon: Sun },
    { value: "dark" as const, label: "Dark", icon: Moon },
    { value: "system" as const, label: "System", icon: Monitor },
  ];
  return (
    <div className="space-y-3">
      <div className="inline-flex rounded-lg border bg-background p-1">
        {options.map((o) => (
          <button
            key={o.value}
            type="button"
            onClick={() => setTheme(o.value)}
            className={cn(
              "inline-flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-medium transition-colors",
              theme === o.value
                ? "bg-muted text-foreground"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            <o.icon className="h-3.5 w-3.5" />
            {o.label}
          </button>
        ))}
      </div>
      <p className="text-xs text-muted-foreground">
        Active: <code>{theme}</code> · Resolved:{" "}
        <code>{resolvedTheme}</code>
      </p>
    </div>
  );
}

/* ------------------------------------------------------------------
 * Sidebar — clickable demo with state.
 * ------------------------------------------------------------------ */
const SIDEBAR_NAV = [
  { id: "overview", label: "Overview", icon: LayoutGrid },
  { id: "customers", label: "Customers", icon: Users },
  { id: "billing", label: "Billing", icon: CreditCard },
  { id: "settings", label: "Settings", icon: Settings },
] as const;

export function SidebarDemo() {
  const [active, setActive] = React.useState<string>("overview");
  const activeItem = SIDEBAR_NAV.find((n) => n.id === active);

  return (
    <div className="flex h-[280px] w-full overflow-hidden rounded-lg border">
      <Sidebar className="w-56">
        <SidebarHeader>
          <span className="inline-flex h-6 w-6 items-center justify-center rounded bg-foreground text-[10px] font-bold text-background">
            A
          </span>
          <span className="text-sm font-semibold tracking-tight">Acme</span>
        </SidebarHeader>
        <SidebarContent>
          {SIDEBAR_NAV.map((n) => {
            const Icon = n.icon;
            return (
              <SidebarNavItem
                key={n.id}
                href="#"
                active={active === n.id}
                onClick={(event) => {
                  event.preventDefault();
                  setActive(n.id);
                }}
              >
                <Icon className="h-4 w-4" />
                {n.label}
              </SidebarNavItem>
            );
          })}
        </SidebarContent>
      </Sidebar>
      <div className="flex flex-1 items-center justify-center bg-background text-sm">
        <div className="text-center">
          <div className="text-xs uppercase tracking-wider text-muted-foreground">
            Page
          </div>
          <div className="mt-1 text-base font-semibold">
            {activeItem?.label}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------
 * Multi Select — Combobox-style with checkboxes for multi-selection.
 * ------------------------------------------------------------------ */
const FRAMEWORKS = [
  { value: "next", label: "Next.js" },
  { value: "remix", label: "Remix" },
  { value: "vite", label: "Vite" },
  { value: "astro", label: "Astro" },
  { value: "nuxt", label: "Nuxt" },
  { value: "sveltekit", label: "SvelteKit" },
];

export function MultiSelectDemo() {
  const [open, setOpen] = React.useState(false);
  const [selected, setSelected] = React.useState<string[]>(["next", "vite"]);

  const toggle = (value: string) =>
    setSelected((prev) =>
      prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]
    );

  const labels = selected
    .map((v) => FRAMEWORKS.find((f) => f.value === v)?.label)
    .filter(Boolean) as string[];

  return (
    <div className="w-full max-w-sm">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-full justify-between font-normal"
          >
            <span className="flex flex-wrap gap-1">
              {selected.length === 0 ? (
                <span className="text-muted-foreground">
                  Select frameworks…
                </span>
              ) : (
                labels.map((l) => (
                  <Badge key={l} variant="secondary" className="font-normal">
                    {l}
                  </Badge>
                ))
              )}
            </span>
            <ChevronsUpDown className="h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[--radix-popover-trigger-width] p-0">
          <Command>
            <CommandInput placeholder="Search…" />
            <CommandList>
              <CommandEmpty>No results.</CommandEmpty>
              <CommandGroup>
                {FRAMEWORKS.map((f) => {
                  const checked = selected.includes(f.value);
                  return (
                    <CommandItem
                      key={f.value}
                      value={f.label}
                      onSelect={() => toggle(f.value)}
                    >
                      <div
                        className={cn(
                          "mr-2 flex h-4 w-4 items-center justify-center rounded-sm border",
                          checked
                            ? "border-foreground bg-foreground text-background"
                            : "border-foreground/30"
                        )}
                      >
                        {checked ? <Check className="h-3 w-3" /> : null}
                      </div>
                      {f.label}
                    </CommandItem>
                  );
                })}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
}

/* ------------------------------------------------------------------
 * Combobox — improved with state, keyboard nav, custom selection chip.
 * ------------------------------------------------------------------ */
const TIMEZONES = [
  { value: "pst", label: "Pacific Standard Time", abbr: "UTC−08:00" },
  { value: "mst", label: "Mountain Standard Time", abbr: "UTC−07:00" },
  { value: "cst", label: "Central Standard Time", abbr: "UTC−06:00" },
  { value: "est", label: "Eastern Standard Time", abbr: "UTC−05:00" },
  { value: "gmt", label: "Greenwich Mean Time", abbr: "UTC+00:00" },
  { value: "cet", label: "Central European Time", abbr: "UTC+01:00" },
  { value: "ist", label: "India Standard Time", abbr: "UTC+05:30" },
  { value: "jst", label: "Japan Standard Time", abbr: "UTC+09:00" },
];

export function ComboboxDemo() {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState<string>("");
  const selected = TIMEZONES.find((t) => t.value === value);

  return (
    <div className="w-full max-w-sm space-y-1.5">
      <Label>Timezone</Label>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-full justify-between font-normal"
          >
            {selected ? (
              <span className="flex items-center gap-2">
                <Globe className="h-4 w-4 text-muted-foreground" />
                {selected.label}
                <span className="font-mono text-[10px] text-muted-foreground">
                  {selected.abbr}
                </span>
              </span>
            ) : (
              <span className="text-muted-foreground">Pick a timezone…</span>
            )}
            <ChevronsUpDown className="h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[--radix-popover-trigger-width] p-0">
          <Command>
            <CommandInput placeholder="Search timezones…" />
            <CommandList>
              <CommandEmpty>No matches.</CommandEmpty>
              <CommandGroup>
                {TIMEZONES.map((t) => (
                  <CommandItem
                    key={t.value}
                    value={`${t.label} ${t.abbr}`}
                    onSelect={() => {
                      setValue(t.value === value ? "" : t.value);
                      setOpen(false);
                    }}
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        value === t.value ? "opacity-100" : "opacity-0"
                      )}
                    />
                    <span className="flex-1">{t.label}</span>
                    <span className="font-mono text-[10px] text-muted-foreground">
                      {t.abbr}
                    </span>
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
}

/* ------------------------------------------------------------------
 * Modern Navbar — full-width with brand, nav links, search trigger,
 * notification bell, and avatar dropdown.
 * ------------------------------------------------------------------ */
export function ModernNavbarDemo() {
  return (
    <div className="w-full overflow-hidden rounded-lg border bg-background">
      <div className="flex h-14 items-center gap-6 border-b px-4">
        <div className="flex items-center gap-2 font-semibold">
          <span className="inline-flex h-7 w-7 items-center justify-center rounded-md bg-foreground text-background">
            <span className="text-xs font-bold">A</span>
          </span>
          <span>Acme</span>
          <Badge variant="secondary" className="ml-1">
            Pro
          </Badge>
        </div>
        <nav className="hidden items-center gap-5 text-sm text-muted-foreground md:flex">
          <a className="font-medium text-foreground" href="#">
            Dashboard
          </a>
          <a href="#" className="hover:text-foreground">
            Customers
          </a>
          <a href="#" className="hover:text-foreground">
            Reports
          </a>
          <a href="#" className="hover:text-foreground">
            Billing
          </a>
        </nav>
        <div className="ml-auto flex items-center gap-2">
          <button
            type="button"
            className="hidden h-8 w-44 items-center gap-2 rounded-md border bg-muted/40 px-2.5 text-xs text-muted-foreground hover:bg-muted md:inline-flex"
          >
            <Search className="h-3.5 w-3.5" />
            Search…
            <kbd className="ml-auto inline-flex h-4 select-none items-center gap-0.5 rounded border bg-background px-1 font-mono text-[9px]">
              ⌘K
            </kbd>
          </button>
          <Button variant="ghost" size="icon" aria-label="Notifications">
            <span className="relative">
              <Bell className="h-4 w-4" />
              <span className="absolute -right-0.5 -top-0.5 h-2 w-2 rounded-full bg-destructive ring-2 ring-background" />
            </span>
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                aria-label="Account"
                className="rounded-full"
              >
                <Avatar size="sm">
                  <AvatarImage
                    src="https://github.com/shadcn.png"
                    alt="avatar"
                  />
                  <AvatarFallback>SH</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>shadcn</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <User className="h-4 w-4" />
                Profile
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Settings className="h-4 w-4" />
                Settings
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-destructive">
                Sign out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------
 * Toggle — clearer default with text + icon hint.
 * ------------------------------------------------------------------ */
export function ToggleDemo() {
  const [pressed, setPressed] = React.useState(false);
  return (
    <div className="flex flex-col items-center gap-3">
      <Toggle pressed={pressed} onPressedChange={setPressed}>
        <Bell className="h-4 w-4" />
        Notifications
      </Toggle>
      <p className="text-xs text-muted-foreground">
        State: <code>{pressed ? "on" : "off"}</code>
      </p>
    </div>
  );
}

/* ------------------------------------------------------------------
 * Table — selectable rows with checkbox column.
 * ------------------------------------------------------------------ */
export function SelectableTableDemo() {
  const data = [
    { id: 1, name: "Olivia Martin", email: "olivia@ex.com", role: "Owner" },
    { id: 2, name: "Jackson Lee", email: "jackson@ex.com", role: "Member" },
    { id: 3, name: "Isabella Nguyen", email: "isabella@ex.com", role: "Member" },
    { id: 4, name: "William Kim", email: "will@ex.com", role: "Viewer" },
  ];
  const [selected, setSelected] = React.useState<Set<number>>(new Set([2]));

  const toggle = (id: number) =>
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });

  const allChecked = selected.size === data.length;
  const toggleAll = () =>
    setSelected(allChecked ? new Set() : new Set(data.map((d) => d.id)));

  return (
    <div className="w-full">
      <div className="mb-2 flex items-center justify-between text-sm text-muted-foreground">
        <span>{selected.size} of {data.length} selected</span>
        <Button
          variant="outline"
          size="sm"
          disabled={selected.size === 0}
        >
          Delete
        </Button>
      </div>
      <div className="overflow-hidden rounded-lg border">
        <table className="w-full text-sm">
          <thead className="bg-muted/50">
            <tr>
              <th className="w-10 px-3 py-2.5">
                <Checkbox
                  checked={allChecked}
                  onCheckedChange={toggleAll}
                  aria-label="Select all"
                />
              </th>
              <th className="px-3 py-2.5 text-left font-medium">Name</th>
              <th className="px-3 py-2.5 text-left font-medium">Email</th>
              <th className="px-3 py-2.5 text-left font-medium">Role</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row) => {
              const checked = selected.has(row.id);
              return (
                <tr
                  key={row.id}
                  data-state={checked ? "selected" : undefined}
                  className="border-t transition-colors hover:bg-muted/30 data-[state=selected]:bg-muted/50"
                >
                  <td className="px-3 py-2.5">
                    <Checkbox
                      checked={checked}
                      onCheckedChange={() => toggle(row.id)}
                      aria-label={`Select ${row.name}`}
                    />
                  </td>
                  <td className="px-3 py-2.5 font-medium">{row.name}</td>
                  <td className="px-3 py-2.5 text-muted-foreground">
                    {row.email}
                  </td>
                  <td className="px-3 py-2.5">
                    <Badge variant="secondary">{row.role}</Badge>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------
 * Textarea with character counter.
 * ------------------------------------------------------------------ */
import { Textarea } from "@craftui/ui";

export function TextareaCounterDemo() {
  const [value, setValue] = React.useState("");
  const max = 160;
  return (
    <div className="w-full max-w-sm space-y-1.5">
      <Textarea
        value={value}
        onChange={(event) => setValue(event.target.value.slice(0, max))}
        placeholder="Tell us a little about yourself…"
        maxLength={max}
      />
      <p className="text-right text-xs text-muted-foreground">
        {value.length} / {max}
      </p>
    </div>
  );
}

/* Avoid the unused Input import warning */
export function _SilenceUnusedInput() {
  return <Input className="hidden" aria-hidden />;
}
