"use client";

import Link from "next/link";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  Alert,
  AlertDescription,
  AlertTitle,
  Avatar,
  AvatarFallback,
  Badge,
  Button,
  Checkbox,
  Input,
  Label,
  Progress,
  Separator,
  Skeleton,
  Switch,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@craftui/ui";
import { ArrowRight, CheckCircle2 } from "lucide-react";

interface ShowcaseItem {
  title: string;
  href: string;
  description: string;
  render: React.ReactNode;
  className?: string;
}

const items: ShowcaseItem[] = [
  {
    title: "Button",
    href: "/docs/components/button",
    description: "Six variants, four sizes, loading state, asChild for link-as-button.",
    render: (
      <div className="flex flex-wrap gap-2">
        <Button size="sm">Default</Button>
        <Button size="sm" variant="secondary">Secondary</Button>
        <Button size="sm" variant="outline">Outline</Button>
        <Button size="sm" variant="destructive">Destructive</Button>
      </div>
    ),
  },
  {
    title: "Input + Label",
    href: "/docs/components/input",
    description: "Accessible inputs with error state, icon slots, and label wiring.",
    render: (
      <div className="w-full space-y-1.5">
        <Label htmlFor="sh-email" className="text-xs">Email</Label>
        <Input id="sh-email" placeholder="name@example.com" />
      </div>
    ),
  },
  {
    title: "Switch + Checkbox",
    href: "/docs/components/switch",
    description: "Toggle controls with full keyboard support and indeterminate state.",
    render: (
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <Switch id="sh-notif" defaultChecked />
          <Label htmlFor="sh-notif" className="text-sm">Notifications</Label>
        </div>
        <div className="flex items-center gap-2">
          <Checkbox id="sh-terms" />
          <Label htmlFor="sh-terms" className="text-sm">Accept terms</Label>
        </div>
      </div>
    ),
  },
  {
    title: "Tabs",
    href: "/docs/components/tabs",
    description: "Keyboard-navigable tabs, underline or pill variants.",
    render: (
      <Tabs defaultValue="a" className="w-full">
        <TabsList className="h-8">
          <TabsTrigger value="a" className="h-6 text-xs">Overview</TabsTrigger>
          <TabsTrigger value="b" className="h-6 text-xs">Metrics</TabsTrigger>
          <TabsTrigger value="c" className="h-6 text-xs">Logs</TabsTrigger>
        </TabsList>
        <TabsContent value="a" className="mt-2 text-xs text-muted-foreground">
          Health check: 2 services passing.
        </TabsContent>
      </Tabs>
    ),
  },
  {
    title: "Badge",
    href: "/docs/components/badge",
    description: "Color variants for status, counts, and categorization.",
    render: (
      <div className="flex flex-wrap gap-2">
        <Badge>Default</Badge>
        <Badge variant="secondary">Secondary</Badge>
        <Badge variant="success">Active</Badge>
        <Badge variant="destructive">Error</Badge>
        <Badge variant="warning">Pending</Badge>
        <Badge variant="outline">Draft</Badge>
      </div>
    ),
  },
  {
    title: "Progress",
    href: "/docs/components/progress",
    description: "Determinate linear progress built on Radix.",
    render: (
      <div className="w-full space-y-2">
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>Uploading…</span>
          <span>62%</span>
        </div>
        <Progress value={62} className="h-1.5" />
      </div>
    ),
  },
  {
    title: "Alert",
    href: "/docs/components/alert",
    description: "Info, success, warning, destructive. Icon slot included.",
    render: (
      <Alert variant="success" className="w-full">
        <CheckCircle2 className="h-4 w-4" />
        <AlertTitle className="text-sm">Deploy successful</AlertTitle>
        <AlertDescription className="text-xs">
          Shipped to production in 47s.
        </AlertDescription>
      </Alert>
    ),
  },
  {
    title: "Avatar",
    href: "/docs/components/avatar",
    description: "Image with fallback, sizes, and shape variants.",
    render: (
      <div className="flex -space-x-2">
        {["OM", "JL", "IN", "WK"].map((i, idx) => (
          <Avatar key={i} className="ring-2 ring-background" size="sm">
            <AvatarFallback>{i}</AvatarFallback>
          </Avatar>
        ))}
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted text-xs font-medium ring-2 ring-background">
          +5
        </div>
      </div>
    ),
  },
  {
    title: "Accordion",
    href: "/docs/components/accordion",
    description: "Collapsible disclosure panels with accessible keyboard control.",
    render: (
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="a">
          <AccordionTrigger className="py-2 text-sm">
            Is it accessible?
          </AccordionTrigger>
          <AccordionContent className="text-xs">
            Yes. Built on Radix primitives.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    ),
  },
  {
    title: "Skeleton",
    href: "/docs/components/skeleton",
    description: "Placeholder shimmer for loading states.",
    render: (
      <div className="w-full space-y-2">
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-4 w-1/2" />
        <Skeleton className="h-4 w-full" />
      </div>
    ),
  },
  {
    title: "Separator",
    href: "/docs/components/separator",
    description: "Semantic horizontal or vertical divider.",
    render: (
      <div className="w-full text-sm">
        <div>Billing</div>
        <Separator className="my-2" />
        <div className="text-muted-foreground">Payment history</div>
      </div>
    ),
  },
  {
    title: "And 25+ more…",
    href: "/docs/components/button",
    description: "Dialog, Drawer, Popover, Select, Combobox, Calendar, DataPicker, Command, Toast, DropdownMenu, Form, Table, Tooltip — all built.",
    render: (
      <div className="flex items-center gap-2 text-sm">
        <Button variant="outline" size="sm" asChild>
          <Link href="/docs/components/button">
            Browse all <ArrowRight className="h-3 w-3" />
          </Link>
        </Button>
      </div>
    ),
  },
];

export function ComponentsShowcase() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((item) => (
        <div
          key={item.title}
          className="group relative flex flex-col overflow-hidden rounded-xl border bg-background p-5 transition-all hover:border-foreground/20 hover:shadow-lg hover:shadow-foreground/[0.05]"
        >
          {/* Non-interactive visual preview. pointer-events-none lets the
              stretched link underneath receive clicks for the card. */}
          <div className="pointer-events-none flex min-h-[80px] items-center">
            <div className="w-full">{item.render}</div>
          </div>
          <div className="mt-6">
            <Link
              href={item.href}
              className="before:absolute before:inset-0 before:content-['']"
            >
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-semibold tracking-tight">
                  {item.title}
                </h3>
                <ArrowRight className="h-3.5 w-3.5 text-muted-foreground opacity-0 transition-all group-hover:translate-x-0.5 group-hover:opacity-100" />
              </div>
            </Link>
            <p className="mt-1 text-xs text-muted-foreground">
              {item.description}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
