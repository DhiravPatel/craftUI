import { useState } from "react";
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
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  Checkbox,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  Input,
  Label,
  Progress,
  RadioGroup,
  RadioGroupItem,
  Separator,
  Skeleton,
  Slider,
  Switch,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  Textarea,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
  useTheme,
} from "@craftui/ui";
import {
  AlertCircle,
  CheckCircle2,
  Github,
  LayoutGrid,
  Moon,
  Palette,
  Puzzle,
  Sun,
  Terminal,
  TriangleAlert,
  Type,
} from "lucide-react";

type Section = "inputs" | "buttons" | "feedback" | "overlay" | "data" | "theme";

const sections: {
  id: Section;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  description: string;
}[] = [
  {
    id: "inputs",
    label: "Inputs",
    icon: Type,
    description: "Text fields, checkboxes, radio groups, switches, sliders.",
  },
  {
    id: "buttons",
    label: "Buttons",
    icon: Puzzle,
    description: "Button variants, sizes, loading states.",
  },
  {
    id: "feedback",
    label: "Feedback",
    icon: AlertCircle,
    description: "Alerts, progress, skeletons, badges.",
  },
  {
    id: "overlay",
    label: "Overlay",
    icon: LayoutGrid,
    description: "Dialogs, tooltips, accordions.",
  },
  {
    id: "data",
    label: "Data",
    icon: Terminal,
    description: "Tabs, cards, avatars.",
  },
  {
    id: "theme",
    label: "Theme",
    icon: Palette,
    description: "Inspect every CSS variable in the current theme.",
  },
];

export default function App() {
  const [section, setSection] = useState<Section>("buttons");
  const { theme, setTheme } = useTheme();
  const active = sections.find((s) => s.id === section)!;

  return (
    <div className="flex min-h-screen">
      <aside className="hidden w-64 shrink-0 flex-col border-r bg-muted/20 p-4 md:flex">
        <div className="mb-6 flex items-center gap-2 px-2">
          <span className="inline-flex h-7 w-7 items-center justify-center rounded-md bg-foreground text-background">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path
                d="M2 3.5C2 2.67157 2.67157 2 3.5 2H10.5C11.3284 2 12 2.67157 12 3.5V10.5C12 11.3284 11.3284 12 10.5 12H3.5C2.67157 12 2 11.3284 2 10.5V3.5Z"
                stroke="currentColor"
                strokeWidth="1.5"
              />
              <path d="M2 7H12" stroke="currentColor" strokeWidth="1.5" />
            </svg>
          </span>
          <div className="leading-tight">
            <div className="text-sm font-semibold tracking-tight">CraftUI</div>
            <div className="text-xs text-muted-foreground">Playground</div>
          </div>
        </div>

        <Separator className="mb-4" />

        <nav className="flex-1 space-y-1 text-sm">
          {sections.map((s) => {
            const isActive = s.id === section;
            return (
              <button
                key={s.id}
                onClick={() => setSection(s.id)}
                className={`group relative flex w-full items-center gap-2.5 rounded-md px-2.5 py-1.5 text-left transition-colors ${
                  isActive
                    ? "bg-accent font-medium text-accent-foreground"
                    : "text-muted-foreground hover:bg-accent/50 hover:text-foreground"
                }`}
              >
                <s.icon className="h-3.5 w-3.5" />
                {s.label}
              </button>
            );
          })}
        </nav>

        <Separator className="my-4" />

        <a
          href="https://github.com/craftui/craftui"
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-2 rounded-md px-2.5 py-1.5 text-xs text-muted-foreground transition-colors hover:bg-accent/50 hover:text-foreground"
        >
          <Github className="h-3.5 w-3.5" />
          View on GitHub
        </a>
      </aside>

      <main className="flex-1 overflow-y-auto">
        <header className="sticky top-0 z-10 border-b bg-background/80 px-8 py-4 backdrop-blur-xl">
          <div className="flex items-start justify-between">
            <div>
              <div className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                Playground
              </div>
              <h1 className="mt-1 text-2xl font-semibold tracking-tight">
                {active.label}
              </h1>
              <p className="mt-1 max-w-xl text-sm text-muted-foreground">
                {active.description}
              </p>
            </div>
            <Button
              variant="outline"
              size="icon"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              aria-label="Toggle theme"
            >
              {theme === "dark" ? (
                <Sun className="h-4 w-4" />
              ) : (
                <Moon className="h-4 w-4" />
              )}
            </Button>
          </div>
        </header>

        <div className="relative px-8 py-10">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 -z-10 bg-grid opacity-[0.15] mask-radial"
          />
          <div className="mx-auto max-w-5xl space-y-8">
            {section === "inputs" ? <InputsSection /> : null}
            {section === "buttons" ? <ButtonsSection /> : null}
            {section === "feedback" ? <FeedbackSection /> : null}
            {section === "overlay" ? <OverlaySection /> : null}
            {section === "data" ? <DataSection /> : null}
            {section === "theme" ? <ThemeSection /> : null}
          </div>
        </div>
      </main>
    </div>
  );
}

function DemoCard({
  title,
  description,
  children,
}: {
  title: string;
  description?: string;
  children: React.ReactNode;
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">{title}</CardTitle>
        {description ? <CardDescription>{description}</CardDescription> : null}
      </CardHeader>
      <CardContent className="flex min-h-[160px] items-center justify-center rounded-b-lg border-t bg-muted/30 p-8">
        {children}
      </CardContent>
    </Card>
  );
}

function ButtonsSection() {
  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <DemoCard title="Variants" description="Six semantic styles.">
        <div className="flex flex-wrap gap-2">
          <Button>Default</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="destructive">Destructive</Button>
          <Button variant="link">Link</Button>
        </div>
      </DemoCard>
      <DemoCard title="Sizes" description="sm, default, lg, icon.">
        <div className="flex items-center gap-2">
          <Button size="sm">Small</Button>
          <Button>Default</Button>
          <Button size="lg">Large</Button>
        </div>
      </DemoCard>
      <DemoCard title="States" description="Loading and disabled behavior.">
        <div className="flex items-center gap-2">
          <Button loading>Loading</Button>
          <Button disabled>Disabled</Button>
        </div>
      </DemoCard>
      <DemoCard title="As child" description="Renders an <a> under the hood.">
        <Button asChild variant="outline">
          <a href="#">Linked button</a>
        </Button>
      </DemoCard>
    </div>
  );
}

function InputsSection() {
  const [slider, setSlider] = useState([60]);
  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <DemoCard title="Text input" description="Placeholder + error state.">
        <div className="w-full max-w-sm space-y-3">
          <div className="space-y-1.5">
            <Label htmlFor="pg-email">Email</Label>
            <Input
              id="pg-email"
              type="email"
              placeholder="name@company.com"
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="pg-err">Invalid email</Label>
            <Input id="pg-err" error placeholder="oops@" />
          </div>
        </div>
      </DemoCard>
      <DemoCard title="Textarea" description="Comment box.">
        <div className="w-full max-w-sm space-y-1.5">
          <Label htmlFor="pg-message">Message</Label>
          <Textarea id="pg-message" placeholder="Tell us more…" rows={3} />
        </div>
      </DemoCard>
      <DemoCard title="Toggles" description="Switches and checkboxes.">
        <div className="w-full max-w-sm space-y-4">
          <div className="flex items-center gap-3">
            <Switch id="pg-notif" defaultChecked />
            <Label htmlFor="pg-notif">Email notifications</Label>
          </div>
          <div className="flex items-center gap-3">
            <Checkbox id="pg-terms" defaultChecked />
            <Label htmlFor="pg-terms">Accept terms & conditions</Label>
          </div>
          <RadioGroup defaultValue="card">
            <div className="flex items-center gap-2">
              <RadioGroupItem id="pg-card" value="card" />
              <Label htmlFor="pg-card">Credit card</Label>
            </div>
            <div className="flex items-center gap-2">
              <RadioGroupItem id="pg-invoice" value="invoice" />
              <Label htmlFor="pg-invoice">Invoice</Label>
            </div>
          </RadioGroup>
        </div>
      </DemoCard>
      <DemoCard title="Slider" description={`Value: ${slider[0]}%`}>
        <div className="w-full max-w-sm">
          <Slider
            value={slider}
            onValueChange={setSlider}
            min={0}
            max={100}
            step={1}
          />
        </div>
      </DemoCard>
    </div>
  );
}

function FeedbackSection() {
  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <DemoCard title="Alerts" description="Inline status messaging.">
        <div className="w-full space-y-3">
          <Alert>
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Heads up</AlertTitle>
            <AlertDescription>This is a default alert.</AlertDescription>
          </Alert>
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>Something went wrong.</AlertDescription>
          </Alert>
          <Alert variant="success">
            <CheckCircle2 className="h-4 w-4" />
            <AlertTitle>Deploy succeeded</AlertTitle>
            <AlertDescription>Live in production.</AlertDescription>
          </Alert>
          <Alert variant="warning">
            <TriangleAlert className="h-4 w-4" />
            <AlertTitle>Heads up</AlertTitle>
            <AlertDescription>Payment is due soon.</AlertDescription>
          </Alert>
        </div>
      </DemoCard>
      <DemoCard title="Progress" description="Determinate linear progress.">
        <div className="w-full space-y-3">
          <Progress value={20} />
          <Progress value={60} />
          <Progress value={90} />
        </div>
      </DemoCard>
      <DemoCard title="Skeletons" description="Placeholder shimmer.">
        <div className="w-full space-y-2">
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-4 w-1/2" />
          <Skeleton className="h-24 w-full" />
        </div>
      </DemoCard>
      <DemoCard title="Badges" description="Status pills.">
        <div className="flex flex-wrap gap-2">
          <Badge>Default</Badge>
          <Badge variant="secondary">Secondary</Badge>
          <Badge variant="success">Active</Badge>
          <Badge variant="warning">Pending</Badge>
          <Badge variant="destructive">Error</Badge>
          <Badge variant="outline">Draft</Badge>
        </div>
      </DemoCard>
    </div>
  );
}

function OverlaySection() {
  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <DemoCard title="Dialog" description="Modal with focus trap.">
        <Dialog>
          <DialogTrigger asChild>
            <Button>Open dialog</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Are you sure?</DialogTitle>
              <DialogDescription>
                This action cannot be undone.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button variant="outline">Cancel</Button>
              <Button variant="destructive">Delete</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </DemoCard>

      <DemoCard title="Tooltip" description="On hover or focus.">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="outline">Hover me</Button>
            </TooltipTrigger>
            <TooltipContent>This is helpful</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </DemoCard>

      <DemoCard title="Accordion" description="Disclosure panels.">
        <Accordion type="single" collapsible className="w-full max-w-sm">
          <AccordionItem value="a">
            <AccordionTrigger>Is it accessible?</AccordionTrigger>
            <AccordionContent>Yes. Built on Radix primitives.</AccordionContent>
          </AccordionItem>
          <AccordionItem value="b">
            <AccordionTrigger>Is it styled?</AccordionTrigger>
            <AccordionContent>Yes. Tailwind throughout.</AccordionContent>
          </AccordionItem>
          <AccordionItem value="c">
            <AccordionTrigger>Is it animated?</AccordionTrigger>
            <AccordionContent>
              Yes, with tailwindcss-animate.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </DemoCard>

      <DemoCard title="Tabs" description="Keyboard-navigable tabs.">
        <Tabs defaultValue="a" className="w-full max-w-sm">
          <TabsList>
            <TabsTrigger value="a">Account</TabsTrigger>
            <TabsTrigger value="b">Password</TabsTrigger>
          </TabsList>
          <TabsContent value="a" className="mt-4 text-sm text-muted-foreground">
            Account settings.
          </TabsContent>
          <TabsContent value="b" className="mt-4 text-sm text-muted-foreground">
            Password settings.
          </TabsContent>
        </Tabs>
      </DemoCard>
    </div>
  );
}

function DataSection() {
  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <DemoCard title="Card" description="Header + content + footer.">
        <Card className="w-full max-w-sm">
          <CardHeader>
            <CardTitle>Billing</CardTitle>
            <CardDescription>Manage your subscription.</CardDescription>
          </CardHeader>
          <CardContent>
            <Badge variant="success">Active</Badge>
          </CardContent>
          <CardFooter>
            <Button className="ml-auto">Upgrade</Button>
          </CardFooter>
        </Card>
      </DemoCard>

      <DemoCard title="Avatar group" description="Stacked members.">
        <div className="flex -space-x-2">
          {["OM", "JL", "IN", "WK"].map((i) => (
            <Avatar key={i} className="ring-2 ring-background">
              <AvatarFallback>{i}</AvatarFallback>
            </Avatar>
          ))}
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted text-xs font-medium ring-2 ring-background">
            +5
          </div>
        </div>
      </DemoCard>
    </div>
  );
}

function ThemeSection() {
  const tokens = [
    "background",
    "foreground",
    "primary",
    "primary-foreground",
    "secondary",
    "secondary-foreground",
    "muted",
    "muted-foreground",
    "accent",
    "accent-foreground",
    "destructive",
    "destructive-foreground",
    "success",
    "success-foreground",
    "warning",
    "warning-foreground",
    "border",
    "input",
    "ring",
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Design tokens</CardTitle>
        <CardDescription>
          Every color is an HSL CSS variable. Edit <code>globals.css</code> to
          rebrand in one place.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
          {tokens.map((token) => (
            <div
              key={token}
              className="rounded-lg border bg-background p-3"
            >
              <div
                className="mb-2 h-14 w-full rounded-md border"
                style={{ background: `hsl(var(--${token}))` }}
              />
              <div className="font-mono text-[11px] leading-tight">
                --{token}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
