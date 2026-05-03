import type { ReactNode } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  Alert,
  AlertDescription,
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
  AlertTitle,
  AspectRatio,
  Avatar,
  AvatarFallback,
  AvatarImage,
  Badge,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
  Button,
  Calendar,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  Checkbox,
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  DatePicker,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DropdownMenu,
  EmptyState,
  Kbd,
  Rating,
  Stat,
  Stepper,
  Timeline,
  TimelineDescription,
  TimelineHeader,
  TimelineItem,
  TimelineTime,
  TimelineTitle,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  Grid,
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
  Input,
  InputOTP,
  Label,
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Progress,
  RadioGroup,
  RadioGroupItem,
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
  Separator,
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  Skeleton,
  Slider,
  Spinner,
  Stack,
  Switch,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  Textarea,
  Toggle,
  ToggleGroup,
  ToggleGroupItem,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@craftui/ui";
import {
  AlertCircle,
  Bell,
  CheckCircle2,
  CreditCard,
  MoreHorizontal,
  Search,
  Settings,
  Star,
  Terminal,
  Trash,
  User,
} from "lucide-react";
import {
  CalendarSingleDemo,
  CalendarRangeDemo,
} from "@/components/demos/calendar-demos";
import { FullFormDemo, LoginFormDemo } from "@/components/demos/form-demo";
import {
  ComboboxDemo,
  FileUploadDemo,
  FooterDemo,
  ModernNavbarDemo,
  MultiSelectDemo,
  RatingDemo,
  SelectableTableDemo,
  SidebarDemo,
  TextareaCounterDemo,
  ThemeProviderDemo,
  ToastDemo,
  ToggleDemo,
} from "@/components/demos/interactive-demos";
import {
  AnimatedTextDemo,
  AnimatedTooltipDemo,
  AuroraDemo,
  BackgroundBeamsDemo,
  BackgroundBoxesDemo,
  BentoGridDemo,
  CardHoverEffectDemo,
  CardStackDemo,
  Carousel3DDemo,
  CompareDemo,
  CoverflowDemo,
  CubeDemo,
  DirectionAwareHoverDemo,
  DotPatternDemo,
  EvervaultCardDemo,
  FlipCardDemo,
  FlipWordsDemo,
  FloatingDockDemo,
  FocusCardsDemo,
  FollowingPointerDemo,
  GlobeDemo,
  HoloCardDemo,
  HoverBorderGradientDemo,
  InfiniteMovingCardsDemo,
  LampDemo,
  LensDemo,
  MagnetDemo,
  Marquee3DDemo,
  MeteorsDemo,
  MovingBorderDemo,
  MultiStepLoaderDemo,
  NeonGlowDemo,
  NumberTickerDemo,
  OrbitingCirclesDemo,
  ParallaxDemo,
  Pin3DDemo,
  RippleDemo,
  SparklesDemo,
  SparklesStarfieldDemo,
  SparklesTextDemo,
  SpotlightDemo,
  TextGenerateEffectDemo,
  TextScrambleDemo,
  TiltDemo,
  TracingBeamDemo,
  WavyBackgroundDemo,
  WavyTextDemo,
  WorldMapDemo,
} from "@/components/demos/threed-demos";

export interface PropDef {
  name: string;
  type: string;
  default?: string;
  description?: string;
  required?: boolean;
}

export interface ComponentExample {
  title: string;
  description?: string;
  code: string;
  render: ReactNode;
}

export interface ComponentDoc {
  name: string;
  title: string;
  description: string;
  imports: string;
  usage?: string;
  defaultExample: ComponentExample;
  examples?: ComponentExample[];
  props?: PropDef[];
  related?: string[];
}

// -----------------------------------------------------------------------------
// Component docs catalog
// -----------------------------------------------------------------------------
const catalog: ComponentDoc[] = [
  // ---------- Button ----------
  {
    name: "button",
    title: "Button",
    description:
      "A clickable button with variants, sizes, loading state, and polymorphic asChild support.",
    imports: `import { Button } from "@/components/ui/button";`,
    defaultExample: {
      title: "Default",
      code: `<Button>Click me</Button>`,
      render: <Button>Click me</Button>,
    },
    examples: [
      {
        title: "Variants",
        code: `<div className="flex gap-2">
  <Button>Default</Button>
  <Button variant="secondary">Secondary</Button>
  <Button variant="outline">Outline</Button>
  <Button variant="ghost">Ghost</Button>
  <Button variant="destructive">Destructive</Button>
  <Button variant="link">Link</Button>
</div>`,
        render: (
          <div className="flex flex-wrap gap-2">
            <Button>Default</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="destructive">Destructive</Button>
            <Button variant="link">Link</Button>
          </div>
        ),
      },
      {
        title: "Loading",
        code: `<Button loading>Saving…</Button>`,
        render: <Button loading>Saving…</Button>,
      },
      {
        title: "As link (asChild)",
        code: `<Button asChild>
  <a href="/dashboard">Go to dashboard</a>
</Button>`,
        render: (
          <Button asChild>
            <a href="#">Go to dashboard</a>
          </Button>
        ),
      },
    ],
    props: [
      {
        name: "variant",
        type: `"default" | "secondary" | "outline" | "ghost" | "destructive" | "link"`,
        default: `"default"`,
        description: "Visual style.",
      },
      {
        name: "size",
        type: `"sm" | "default" | "lg" | "icon"`,
        default: `"default"`,
      },
      { name: "loading", type: "boolean", default: "false" },
      { name: "leftIcon", type: "ReactNode" },
      { name: "rightIcon", type: "ReactNode" },
      {
        name: "asChild",
        type: "boolean",
        default: "false",
        description: "Render the child element as the button.",
      },
      { name: "disabled", type: "boolean", default: "false" },
    ],
    related: ["dropdown-menu", "alert-dialog"],
  },

  // ---------- Input ----------
  {
    name: "input",
    title: "Input",
    description:
      "A styled text input with error state and optional left/right element slots.",
    imports: `import { Input } from "@/components/ui/input";`,
    defaultExample: {
      title: "Default",
      code: `<Input placeholder="Email" />`,
      render: <Input placeholder="Email" className="max-w-sm" />,
    },
    examples: [
      {
        title: "With icon",
        description:
          "Use leftElement / rightElement to embed icons or actions.",
        code: `<Input leftElement={<Search />} placeholder="Search…" />`,
        render: (
          <Input
            className="max-w-sm"
            leftElement={<Search className="h-4 w-4" />}
            placeholder="Search…"
          />
        ),
      },
      {
        title: "Error state",
        description:
          "Pair with `<FormMessage />` in forms to show validation errors.",
        code: `<Input error placeholder="Invalid email" />`,
        render: (
          <Input
            error
            className="max-w-sm"
            placeholder="name@invalid"
          />
        ),
      },
      {
        title: "File input",
        code: `<Input type="file" />`,
        render: <Input className="max-w-sm" type="file" />,
      },
    ],
    props: [
      { name: "type", type: "string", default: `"text"` },
      { name: "placeholder", type: "string" },
      { name: "error", type: "boolean", default: "false" },
      { name: "leftElement", type: "ReactNode" },
      { name: "rightElement", type: "ReactNode" },
      { name: "disabled", type: "boolean", default: "false" },
    ],
    related: ["textarea", "form"],
  },

  // ---------- Textarea ----------
  {
    name: "textarea",
    title: "Textarea",
    description: "Multi-line text field with optional auto-resize.",
    imports: `import { Textarea } from "@/components/ui/textarea";`,
    defaultExample: {
      title: "Default",
      code: `<Textarea placeholder="Type your message here." />`,
      render: (
        <Textarea
          className="w-full max-w-sm"
          placeholder="Type your message here."
        />
      ),
    },
    examples: [
      {
        title: "Auto-resize",
        description:
          "The textarea grows with its content — no scrollbars on short text.",
        code: `<Textarea autoResize placeholder="Keeps growing…" />`,
        render: (
          <Textarea
            autoResize
            className="w-full max-w-sm"
            placeholder="Keeps growing…"
          />
        ),
      },
      {
        title: "With character count",
        description:
          "Bind to local state to render a live count under the field.",
        code: `const [value, setValue] = React.useState("");

<div className="space-y-1.5">
  <Textarea value={value} onChange={(e) => setValue(e.target.value)} maxLength={160} />
  <p className="text-right text-xs text-muted-foreground">{value.length} / 160</p>
</div>`,
        render: <TextareaCounterDemo />,
      },
    ],
    props: [
      { name: "error", type: "boolean", default: "false" },
      { name: "autoResize", type: "boolean", default: "false" },
      { name: "rows", type: "number" },
    ],
    related: ["input", "form"],
  },

  // ---------- Checkbox ----------
  {
    name: "checkbox",
    title: "Checkbox",
    description: "Accessible checkbox with indeterminate support.",
    imports: `import { Checkbox } from "@/components/ui/checkbox";`,
    defaultExample: {
      title: "Default",
      code: `<div className="flex items-center gap-2">
  <Checkbox id="terms" />
  <Label htmlFor="terms">Accept terms</Label>
</div>`,
      render: (
        <div className="flex items-center gap-2">
          <Checkbox id="ex-terms" />
          <Label htmlFor="ex-terms">Accept terms</Label>
        </div>
      ),
    },
    examples: [
      {
        title: "Notification preferences",
        description:
          "A list of independent toggles, each with its own description.",
        code: `<div className="space-y-4">
  {options.map(o => (
    <div key={o.id} className="flex items-start gap-3">
      <Checkbox id={o.id} defaultChecked={o.checked} />
      <div>
        <Label htmlFor={o.id}>{o.label}</Label>
        <p className="text-xs text-muted-foreground">{o.body}</p>
      </div>
    </div>
  ))}
</div>`,
        render: (
          <div className="w-full max-w-sm space-y-4">
            {[
              {
                id: "ck-news",
                label: "Email newsletters",
                body: "Monthly digest of new components.",
                checked: true,
              },
              {
                id: "ck-promo",
                label: "Promotional offers",
                body: "Get notified about sales and discounts.",
                checked: false,
              },
              {
                id: "ck-update",
                label: "Product updates",
                body: "Important changes to your account.",
                checked: true,
              },
            ].map((o) => (
              <div key={o.id} className="flex items-start gap-3">
                <Checkbox id={o.id} defaultChecked={o.checked} />
                <div>
                  <Label htmlFor={o.id}>{o.label}</Label>
                  <p className="text-xs text-muted-foreground">{o.body}</p>
                </div>
              </div>
            ))}
          </div>
        ),
      },
      {
        title: "Indeterminate (for tri-state lists)",
        description:
          "Set checked='indeterminate' to show a partial-selection state.",
        code: `<Checkbox checked="indeterminate" />`,
        render: (
          <div className="flex items-center gap-3">
            <Checkbox checked="indeterminate" />
            <span className="text-sm">3 of 5 selected</span>
          </div>
        ),
      },
    ],
    props: [
      { name: "checked", type: "boolean | 'indeterminate'" },
      { name: "defaultChecked", type: "boolean" },
      { name: "onCheckedChange", type: "(v: boolean) => void" },
      { name: "disabled", type: "boolean" },
      { name: "error", type: "boolean" },
    ],
    related: ["radio-group", "switch"],
  },

  // ---------- Radio group ----------
  {
    name: "radio-group",
    title: "Radio Group",
    description: "Accessible radio group with keyboard navigation.",
    imports: `import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";`,
    defaultExample: {
      title: "Default",
      code: `<RadioGroup defaultValue="one">
  <div className="flex items-center gap-2">
    <RadioGroupItem id="r1" value="one" />
    <Label htmlFor="r1">One</Label>
  </div>
  <div className="flex items-center gap-2">
    <RadioGroupItem id="r2" value="two" />
    <Label htmlFor="r2">Two</Label>
  </div>
</RadioGroup>`,
      render: (
        <RadioGroup defaultValue="one">
          <div className="flex items-center gap-2">
            <RadioGroupItem id="ex-r1" value="one" />
            <Label htmlFor="ex-r1">One</Label>
          </div>
          <div className="flex items-center gap-2">
            <RadioGroupItem id="ex-r2" value="two" />
            <Label htmlFor="ex-r2">Two</Label>
          </div>
        </RadioGroup>
      ),
    },
    examples: [
      {
        title: "Card-style payment options",
        description:
          "Wrap each radio in a `<Label>` so the whole card is clickable, and use `has-[:checked]` to highlight the selection.",
        code: `<RadioGroup defaultValue="card" className="gap-3">
  {plans.map(p => (
    <Label key={p.value} className="flex cursor-pointer items-start gap-3 rounded-lg border p-3 has-[:checked]:border-foreground">
      <RadioGroupItem value={p.value} className="mt-0.5" />
      <div>
        <div className="font-semibold">{p.title}</div>
        <p className="text-xs text-muted-foreground">{p.body}</p>
      </div>
    </Label>
  ))}
</RadioGroup>`,
        render: (
          <RadioGroup
            defaultValue="card"
            className="w-full max-w-sm gap-3"
          >
            {[
              {
                value: "card",
                title: "Credit card",
                body: "Pay with Visa, Mastercard, or Amex.",
              },
              {
                value: "invoice",
                title: "Invoice",
                body: "Net 30. We'll email you a PDF.",
              },
              {
                value: "wire",
                title: "Wire transfer",
                body: "Best for amounts over $10k.",
              },
            ].map((p) => (
              <Label
                key={p.value}
                className="flex cursor-pointer items-start gap-3 rounded-lg border p-3 has-[:checked]:border-foreground"
              >
                <RadioGroupItem value={p.value} className="mt-0.5" />
                <div>
                  <div className="font-semibold">{p.title}</div>
                  <p className="text-xs text-muted-foreground">{p.body}</p>
                </div>
              </Label>
            ))}
          </RadioGroup>
        ),
      },
    ],
    props: [
      { name: "value", type: "string" },
      { name: "defaultValue", type: "string" },
      { name: "onValueChange", type: "(v: string) => void" },
      { name: "disabled", type: "boolean" },
    ],
    related: ["checkbox", "switch"],
  },

  // ---------- Switch ----------
  {
    name: "switch",
    title: "Switch",
    description: "Toggle switch for boolean state.",
    imports: `import { Switch } from "@/components/ui/switch";`,
    defaultExample: {
      title: "Settings list",
      code: `<div className="space-y-4">
  {settings.map(s => (
    <div key={s.id} className="flex items-center justify-between">
      <div>
        <Label htmlFor={s.id}>{s.title}</Label>
        <p className="text-xs text-muted-foreground">{s.body}</p>
      </div>
      <Switch id={s.id} defaultChecked={s.on} />
    </div>
  ))}
</div>`,
      render: (
        <div className="w-full max-w-sm space-y-4">
          {[
            {
              id: "sw-mkt",
              title: "Marketing emails",
              body: "Receive monthly product updates.",
              on: true,
            },
            {
              id: "sw-2fa",
              title: "Two-factor auth",
              body: "Protect your account with a TOTP code.",
              on: false,
            },
            {
              id: "sw-public",
              title: "Public profile",
              body: "Show your profile to everyone.",
              on: true,
            },
          ].map((s) => (
            <div
              key={s.id}
              className="flex items-center justify-between gap-4"
            >
              <div>
                <Label htmlFor={s.id}>{s.title}</Label>
                <p className="text-xs text-muted-foreground">{s.body}</p>
              </div>
              <Switch id={s.id} defaultChecked={s.on} />
            </div>
          ))}
        </div>
      ),
    },
    props: [
      { name: "checked", type: "boolean" },
      { name: "defaultChecked", type: "boolean" },
      { name: "onCheckedChange", type: "(v: boolean) => void" },
      { name: "disabled", type: "boolean" },
    ],
    related: ["checkbox", "radio-group"],
  },

  // ---------- Select ----------
  {
    name: "select",
    title: "Select",
    description: "Accessible select dropdown with grouping and keyboard nav.",
    imports: `import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";`,
    defaultExample: {
      title: "Default",
      code: `<Select>
  <SelectTrigger className="w-[180px]">
    <SelectValue placeholder="Select a fruit" />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="apple">Apple</SelectItem>
    <SelectItem value="banana">Banana</SelectItem>
    <SelectItem value="mango">Mango</SelectItem>
  </SelectContent>
</Select>`,
      render: (
        <Select>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select a fruit" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="apple">Apple</SelectItem>
            <SelectItem value="banana">Banana</SelectItem>
            <SelectItem value="mango">Mango</SelectItem>
          </SelectContent>
        </Select>
      ),
    },
    examples: [
      {
        title: "Grouped with labels",
        code: `<Select>
  <SelectTrigger className="w-[220px]">
    <SelectValue placeholder="Select a food" />
  </SelectTrigger>
  <SelectContent>
    <SelectGroup>
      <SelectLabel>Fruits</SelectLabel>
      <SelectItem value="apple">Apple</SelectItem>
      <SelectItem value="orange">Orange</SelectItem>
    </SelectGroup>
    <SelectSeparator />
    <SelectGroup>
      <SelectLabel>Vegetables</SelectLabel>
      <SelectItem value="carrot">Carrot</SelectItem>
      <SelectItem value="spinach">Spinach</SelectItem>
    </SelectGroup>
  </SelectContent>
</Select>`,
        render: (
          <Select>
            <SelectTrigger className="w-[220px]">
              <SelectValue placeholder="Select…" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Fruits</SelectLabel>
                <SelectItem value="apple">Apple</SelectItem>
                <SelectItem value="orange">Orange</SelectItem>
              </SelectGroup>
              <SelectSeparator />
              <SelectGroup>
                <SelectLabel>Vegetables</SelectLabel>
                <SelectItem value="carrot">Carrot</SelectItem>
                <SelectItem value="spinach">Spinach</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        ),
      },
    ],
    related: ["combobox", "dropdown-menu"],
  },

  // ---------- Slider ----------
  {
    name: "slider",
    title: "Slider",
    description: "Range slider with keyboard control.",
    imports: `import { Slider } from "@/components/ui/slider";`,
    defaultExample: {
      title: "Default",
      code: `<Slider defaultValue={[60]} max={100} step={1} />`,
      render: (
        <Slider
          className="w-full max-w-sm"
          defaultValue={[60]}
          max={100}
          step={1}
        />
      ),
    },
    examples: [
      {
        title: "Range (two thumbs)",
        description:
          "Pass two values to capture a from/to range — useful for price filters and time windows.",
        code: `<Slider defaultValue={[20, 80]} max={100} step={1} />`,
        render: (
          <Slider
            className="w-full max-w-sm"
            defaultValue={[20, 80]}
            max={100}
            step={1}
          />
        ),
      },
      {
        title: "Stepped",
        description:
          "Use step to constrain the slider to discrete values — here, multiples of 20.",
        code: `<Slider defaultValue={[40]} max={100} step={20} />`,
        render: (
          <Slider
            className="w-full max-w-sm"
            defaultValue={[40]}
            max={100}
            step={20}
          />
        ),
      },
    ],
  },

  // ---------- Badge ----------
  {
    name: "badge",
    title: "Badge",
    description: "Small status pill or label with color variants.",
    imports: `import { Badge } from "@/components/ui/badge";`,
    defaultExample: {
      title: "Variants",
      code: `<div className="flex gap-2">
  <Badge>Default</Badge>
  <Badge variant="secondary">Secondary</Badge>
  <Badge variant="success">Active</Badge>
  <Badge variant="destructive">Error</Badge>
  <Badge variant="warning">Pending</Badge>
  <Badge variant="outline">Outline</Badge>
</div>`,
      render: (
        <div className="flex flex-wrap gap-2">
          <Badge>Default</Badge>
          <Badge variant="secondary">Secondary</Badge>
          <Badge variant="success">Active</Badge>
          <Badge variant="destructive">Error</Badge>
          <Badge variant="warning">Pending</Badge>
          <Badge variant="outline">Outline</Badge>
        </div>
      ),
    },
    examples: [
      {
        title: "With icon",
        code: `<div className="flex flex-wrap gap-2">
  <Badge variant="success" className="gap-1">
    <CheckCircle2 className="h-3 w-3" /> Verified
  </Badge>
  <Badge variant="destructive" className="gap-1">
    <AlertCircle className="h-3 w-3" /> Failed
  </Badge>
  <Badge variant="outline" className="gap-1">
    <Star className="h-3 w-3" /> Featured
  </Badge>
</div>`,
        render: (
          <div className="flex flex-wrap gap-2">
            <Badge variant="success" className="gap-1">
              <CheckCircle2 className="h-3 w-3" /> Verified
            </Badge>
            <Badge variant="destructive" className="gap-1">
              <AlertCircle className="h-3 w-3" /> Failed
            </Badge>
            <Badge variant="outline" className="gap-1">
              <Star className="h-3 w-3" /> Featured
            </Badge>
          </div>
        ),
      },
    ],
    props: [
      {
        name: "variant",
        type: `"default" | "secondary" | "success" | "destructive" | "warning" | "outline"`,
        default: `"default"`,
      },
    ],
  },

  // ---------- Card ----------
  {
    name: "card",
    title: "Card",
    description:
      "Flexible compound container. Compose with Header, Title, Description, Content, and Footer.",
    imports: `import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";`,
    defaultExample: {
      title: "Notifications",
      code: `<Card className="w-[340px]">
  <CardHeader>
    <CardTitle>Notifications</CardTitle>
    <CardDescription>You have 3 unread messages.</CardDescription>
  </CardHeader>
  <CardContent>Your team shipped 4 PRs today.</CardContent>
  <CardFooter>
    <Button className="ml-auto">Mark read</Button>
  </CardFooter>
</Card>`,
      render: (
        <Card className="w-[340px]">
          <CardHeader>
            <CardTitle>Notifications</CardTitle>
            <CardDescription>You have 3 unread messages.</CardDescription>
          </CardHeader>
          <CardContent>Your team shipped 4 PRs today.</CardContent>
          <CardFooter>
            <Button className="ml-auto">Mark read</Button>
          </CardFooter>
        </Card>
      ),
    },
    examples: [
      {
        title: "Stat card",
        code: `<Card className="w-[260px]">
  <CardHeader className="flex flex-row items-center justify-between pb-2">
    <CardDescription>Revenue</CardDescription>
    <CreditCard className="h-4 w-4 text-muted-foreground" />
  </CardHeader>
  <CardContent>
    <div className="text-2xl font-semibold">$45,231.89</div>
    <p className="text-xs text-success">+20.1% from last month</p>
  </CardContent>
</Card>`,
        render: (
          <Card className="w-[260px]">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardDescription>Revenue</CardDescription>
              <CreditCard className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-semibold">$45,231.89</div>
              <p className="text-xs text-success">+20.1% from last month</p>
            </CardContent>
          </Card>
        ),
      },
      {
        title: "With form",
        code: `<Card className="w-[360px]">
  <CardHeader>
    <CardTitle>Sign in</CardTitle>
    <CardDescription>Enter your email below.</CardDescription>
  </CardHeader>
  <CardContent className="space-y-4">
    <div className="space-y-1.5">
      <Label htmlFor="email">Email</Label>
      <Input id="email" placeholder="you@example.com" />
    </div>
    <div className="space-y-1.5">
      <Label htmlFor="password">Password</Label>
      <Input id="password" type="password" />
    </div>
  </CardContent>
  <CardFooter>
    <Button className="w-full">Sign in</Button>
  </CardFooter>
</Card>`,
        render: (
          <Card className="w-[360px]">
            <CardHeader>
              <CardTitle>Sign in</CardTitle>
              <CardDescription>Enter your email below.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-1.5">
                <Label htmlFor="ex-card-email">Email</Label>
                <Input id="ex-card-email" placeholder="you@example.com" />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="ex-card-pass">Password</Label>
                <Input id="ex-card-pass" type="password" />
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full">Sign in</Button>
            </CardFooter>
          </Card>
        ),
      },
    ],
  },

  // ---------- Separator ----------
  {
    name: "separator",
    title: "Separator",
    description: "Visual or semantic divider (horizontal / vertical).",
    imports: `import { Separator } from "@/components/ui/separator";`,
    defaultExample: {
      title: "Default",
      code: `<div className="max-w-sm space-y-2">
  <p>Above</p>
  <Separator />
  <p>Below</p>
</div>`,
      render: (
        <div className="w-full max-w-sm space-y-2">
          <p>Above</p>
          <Separator />
          <p>Below</p>
        </div>
      ),
    },
    props: [
      {
        name: "orientation",
        type: `"horizontal" | "vertical"`,
        default: `"horizontal"`,
      },
      { name: "decorative", type: "boolean", default: "true" },
    ],
  },

  // ---------- Skeleton ----------
  {
    name: "skeleton",
    title: "Skeleton",
    description: "Animated placeholder for loading states.",
    imports: `import { Skeleton } from "@/components/ui/skeleton";`,
    defaultExample: {
      title: "User card",
      code: `<div className="flex items-center space-x-4">
  <Skeleton className="h-12 w-12 rounded-full" />
  <div className="space-y-2">
    <Skeleton className="h-4 w-[250px]" />
    <Skeleton className="h-4 w-[200px]" />
  </div>
</div>`,
      render: (
        <div className="flex items-center space-x-4">
          <Skeleton className="h-12 w-12 rounded-full" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-[250px]" />
            <Skeleton className="h-4 w-[200px]" />
          </div>
        </div>
      ),
    },
    examples: [
      {
        title: "Text lines",
        code: `<div className="w-full max-w-sm space-y-2">
  <Skeleton className="h-3 w-full" />
  <Skeleton className="h-3 w-full" />
  <Skeleton className="h-3 w-2/3" />
</div>`,
        render: (
          <div className="w-full max-w-sm space-y-2">
            <Skeleton className="h-3 w-full" />
            <Skeleton className="h-3 w-full" />
            <Skeleton className="h-3 w-2/3" />
          </div>
        ),
      },
    ],
  },

  // ---------- Spinner ----------
  {
    name: "spinner",
    title: "Spinner",
    description: "Animated loading indicator with accessible label.",
    imports: `import { Spinner } from "@/components/ui/spinner";`,
    defaultExample: {
      title: "Default",
      code: `<Spinner />`,
      render: <Spinner />,
    },
    props: [
      {
        name: "size",
        type: `"sm" | "default" | "lg" | "xl"`,
        default: `"default"`,
      },
      { name: "label", type: "string", default: `"Loading"` },
    ],
  },

  // ---------- Alert ----------
  {
    name: "alert",
    title: "Alert",
    description: "Inline status message with icon and color variants.",
    imports: `import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";`,
    defaultExample: {
      title: "Default",
      code: `<Alert>
  <Terminal className="h-4 w-4" />
  <AlertTitle>Heads up!</AlertTitle>
  <AlertDescription>CraftUI is ready to ship.</AlertDescription>
</Alert>`,
      render: (
        <Alert className="w-full max-w-md">
          <Terminal className="h-4 w-4" />
          <AlertTitle>Heads up!</AlertTitle>
          <AlertDescription>CraftUI is ready to ship.</AlertDescription>
        </Alert>
      ),
    },
    examples: [
      {
        title: "All variants",
        description:
          "Switch the visual tone with the variant prop — default, destructive, success, warning, info.",
        code: `<Alert variant="destructive">…</Alert>
<Alert variant="success">…</Alert>
<Alert variant="warning">…</Alert>`,
        render: (
          <div className="w-full max-w-md space-y-3">
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>Your session has expired.</AlertDescription>
            </Alert>
            <Alert variant="success">
              <CheckCircle2 className="h-4 w-4" />
              <AlertTitle>Deploy succeeded</AlertTitle>
              <AlertDescription>Shipped to production.</AlertDescription>
            </Alert>
          </div>
        ),
      },
    ],
    props: [
      {
        name: "variant",
        type: `"default" | "destructive" | "success" | "warning" | "info"`,
        default: `"default"`,
      },
      { name: "icon", type: "ReactNode | false" },
    ],
  },

  // ---------- Progress ----------
  {
    name: "progress",
    title: "Progress",
    description: "Determinate linear progress bar.",
    imports: `import { Progress } from "@/components/ui/progress";`,
    defaultExample: {
      title: "Default",
      code: `<Progress value={60} />`,
      render: <Progress className="w-full max-w-sm" value={60} />,
    },
    examples: [
      {
        title: "With label",
        code: `<div className="w-full max-w-sm space-y-1.5">
  <div className="flex justify-between text-xs text-muted-foreground">
    <span>Uploading</span>
    <span>74%</span>
  </div>
  <Progress value={74} />
</div>`,
        render: (
          <div className="w-full max-w-sm space-y-1.5">
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>Uploading</span>
              <span>74%</span>
            </div>
            <Progress value={74} />
          </div>
        ),
      },
    ],
    props: [
      { name: "value", type: "number" },
      { name: "indicatorClassName", type: "string" },
    ],
  },

  // ---------- Avatar ----------
  {
    name: "avatar",
    title: "Avatar",
    description: "User avatar with image fallback, size and shape variants.",
    imports: `import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";`,
    defaultExample: {
      title: "Default",
      code: `<Avatar>
  <AvatarImage src="https://github.com/shadcn.png" />
  <AvatarFallback>CN</AvatarFallback>
</Avatar>`,
      render: (
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" alt="avatar" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      ),
    },
    examples: [
      {
        title: "Stacked group",
        code: `<div className="flex -space-x-2">
  {team.map(m => (
    <Avatar key={m} className="ring-2 ring-background">
      <AvatarFallback>{m}</AvatarFallback>
    </Avatar>
  ))}
  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted text-xs font-medium ring-2 ring-background">+5</div>
</div>`,
        render: (
          <div className="flex -space-x-2">
            {["OM", "JL", "IN", "WK"].map((m) => (
              <Avatar key={m} className="ring-2 ring-background">
                <AvatarFallback>{m}</AvatarFallback>
              </Avatar>
            ))}
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted text-xs font-medium ring-2 ring-background">
              +5
            </div>
          </div>
        ),
      },
    ],
    props: [
      {
        name: "size",
        type: `"xs" | "sm" | "default" | "lg" | "xl"`,
        default: `"default"`,
      },
      { name: "shape", type: `"circle" | "square"`, default: `"circle"` },
    ],
  },

  // ---------- Tabs ----------
  {
    name: "tabs",
    title: "Tabs",
    description: "Accessible tab navigation with keyboard support.",
    imports: `import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";`,
    defaultExample: {
      title: "Default",
      code: `<Tabs defaultValue="account" className="w-[400px]">
  <TabsList>
    <TabsTrigger value="account">Account</TabsTrigger>
    <TabsTrigger value="password">Password</TabsTrigger>
  </TabsList>
  <TabsContent value="account">Make changes to your account here.</TabsContent>
  <TabsContent value="password">Change your password here.</TabsContent>
</Tabs>`,
      render: (
        <Tabs defaultValue="account" className="w-full max-w-md">
          <TabsList>
            <TabsTrigger value="account">Account</TabsTrigger>
            <TabsTrigger value="password">Password</TabsTrigger>
          </TabsList>
          <TabsContent
            value="account"
            className="mt-4 text-sm text-muted-foreground"
          >
            Make changes to your account here.
          </TabsContent>
          <TabsContent
            value="password"
            className="mt-4 text-sm text-muted-foreground"
          >
            Change your password here.
          </TabsContent>
        </Tabs>
      ),
    },
  },

  // ---------- Accordion ----------
  {
    name: "accordion",
    title: "Accordion",
    description: "Collapsible disclosure panels.",
    imports: `import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";`,
    defaultExample: {
      title: "Default",
      code: `<Accordion type="single" collapsible className="w-full">
  <AccordionItem value="a">
    <AccordionTrigger>Is it accessible?</AccordionTrigger>
    <AccordionContent>Yes. Built on Radix primitives.</AccordionContent>
  </AccordionItem>
  <AccordionItem value="b">
    <AccordionTrigger>Is it styled?</AccordionTrigger>
    <AccordionContent>Yes. Tailwind throughout.</AccordionContent>
  </AccordionItem>
</Accordion>`,
      render: (
        <Accordion
          type="single"
          collapsible
          className="w-full max-w-md"
        >
          <AccordionItem value="a">
            <AccordionTrigger>Is it accessible?</AccordionTrigger>
            <AccordionContent>
              Yes. Built on Radix primitives.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="b">
            <AccordionTrigger>Is it styled?</AccordionTrigger>
            <AccordionContent>Yes. Tailwind throughout.</AccordionContent>
          </AccordionItem>
        </Accordion>
      ),
    },
    examples: [
      {
        title: "Multiple open",
        code: `<Accordion type="multiple" defaultValue={["a"]} className="w-full">
  <AccordionItem value="a">
    <AccordionTrigger>Section A</AccordionTrigger>
    <AccordionContent>Content A.</AccordionContent>
  </AccordionItem>
  <AccordionItem value="b">
    <AccordionTrigger>Section B</AccordionTrigger>
    <AccordionContent>Content B.</AccordionContent>
  </AccordionItem>
  <AccordionItem value="c">
    <AccordionTrigger>Section C</AccordionTrigger>
    <AccordionContent>Content C.</AccordionContent>
  </AccordionItem>
</Accordion>`,
        render: (
          <Accordion
            type="multiple"
            defaultValue={["a"]}
            className="w-full max-w-md"
          >
            {["a", "b", "c"].map((k) => (
              <AccordionItem key={k} value={k}>
                <AccordionTrigger>Section {k.toUpperCase()}</AccordionTrigger>
                <AccordionContent>
                  Content for section {k.toUpperCase()}.
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        ),
      },
    ],
  },

  // ---------- Dialog ----------
  {
    name: "dialog",
    title: "Dialog",
    description: "Accessible modal dialog with portal and focus trap.",
    imports: `import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";`,
    defaultExample: {
      title: "Default",
      code: `<Dialog>
  <DialogTrigger asChild>
    <Button>Open dialog</Button>
  </DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Edit profile</DialogTitle>
      <DialogDescription>Make changes to your profile here.</DialogDescription>
    </DialogHeader>
    <div className="space-y-2">
      <Label>Name</Label>
      <Input defaultValue="Pedro Duarte" />
    </div>
    <DialogFooter>
      <Button>Save changes</Button>
    </DialogFooter>
  </DialogContent>
</Dialog>`,
      render: (
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline">Open dialog</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit profile</DialogTitle>
              <DialogDescription>
                Make changes to your profile here.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-2">
              <Label>Name</Label>
              <Input defaultValue="Pedro Duarte" />
            </div>
            <DialogFooter>
              <Button>Save changes</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      ),
    },
    examples: [
      {
        title: "Confirmation",
        code: `<Dialog>
  <DialogTrigger asChild>
    <Button variant="destructive">Delete project</Button>
  </DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Delete project?</DialogTitle>
      <DialogDescription>
        This permanently removes the project and all its data.
      </DialogDescription>
    </DialogHeader>
    <DialogFooter>
      <Button variant="outline">Cancel</Button>
      <Button variant="destructive">Delete</Button>
    </DialogFooter>
  </DialogContent>
</Dialog>`,
        render: (
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="destructive">Delete project</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Delete project?</DialogTitle>
                <DialogDescription>
                  This permanently removes the project and all its data.
                </DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <Button variant="outline">Cancel</Button>
                <Button variant="destructive">Delete</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        ),
      },
    ],
  },

  // ---------- Alert Dialog ----------
  {
    name: "alert-dialog",
    title: "Alert Dialog",
    description:
      "A confirmation dialog that interrupts the user with important content.",
    imports: `import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";`,
    defaultExample: {
      title: "Default",
      code: `<AlertDialog>
  <AlertDialogTrigger asChild>
    <Button variant="destructive">Delete account</Button>
  </AlertDialogTrigger>
  <AlertDialogContent>
    <AlertDialogHeader>
      <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
      <AlertDialogDescription>This action cannot be undone.</AlertDialogDescription>
    </AlertDialogHeader>
    <AlertDialogFooter>
      <AlertDialogCancel>Cancel</AlertDialogCancel>
      <AlertDialogAction>Continue</AlertDialogAction>
    </AlertDialogFooter>
  </AlertDialogContent>
</AlertDialog>`,
      render: (
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="destructive">Delete account</Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction>Continue</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      ),
    },
    examples: [
      {
        title: "Programmatic open",
        description:
          "Use controlled open state to fire the dialog from anywhere — useful for confirming async actions.",
        code: `const [open, setOpen] = React.useState(false);

<AlertDialog open={open} onOpenChange={setOpen}>
  <AlertDialogContent>…</AlertDialogContent>
</AlertDialog>

// elsewhere
<Button onClick={() => setOpen(true)}>Trigger</Button>`,
        render: (
          <div className="text-sm text-muted-foreground">
            Wire <code>open</code>/<code>onOpenChange</code> to your own
            state to call the dialog imperatively (e.g. before destructive
            mutations).
          </div>
        ),
      },
    ],
  },

  // ---------- Popover ----------
  {
    name: "popover",
    title: "Popover",
    description: "Floating content anchored to a trigger.",
    imports: `import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";`,
    defaultExample: {
      title: "Default",
      code: `<Popover>
  <PopoverTrigger asChild><Button variant="outline">Open</Button></PopoverTrigger>
  <PopoverContent>Place content here.</PopoverContent>
</Popover>`,
      render: (
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline">Open</Button>
          </PopoverTrigger>
          <PopoverContent>Place content here.</PopoverContent>
        </Popover>
      ),
    },
    examples: [
      {
        title: "With form",
        code: `<Popover>
  <PopoverTrigger asChild><Button variant="outline">Set dimensions</Button></PopoverTrigger>
  <PopoverContent className="w-72">
    <div className="space-y-3">
      <h4 className="font-medium">Dimensions</h4>
      <div className="space-y-1.5">
        <Label htmlFor="w">Width</Label>
        <Input id="w" defaultValue="100" />
      </div>
      <div className="space-y-1.5">
        <Label htmlFor="h">Height</Label>
        <Input id="h" defaultValue="100" />
      </div>
    </div>
  </PopoverContent>
</Popover>`,
        render: (
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline">Set dimensions</Button>
            </PopoverTrigger>
            <PopoverContent className="w-72">
              <div className="space-y-3">
                <h4 className="font-medium">Dimensions</h4>
                <div className="space-y-1.5">
                  <Label htmlFor="ex-pop-w">Width</Label>
                  <Input id="ex-pop-w" defaultValue="100" />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="ex-pop-h">Height</Label>
                  <Input id="ex-pop-h" defaultValue="100" />
                </div>
              </div>
            </PopoverContent>
          </Popover>
        ),
      },
    ],
  },

  // ---------- Tooltip ----------
  {
    name: "tooltip",
    title: "Tooltip",
    description: "A short description shown on hover or focus.",
    imports: `import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";`,
    defaultExample: {
      title: "Default",
      code: `<TooltipProvider>
  <Tooltip>
    <TooltipTrigger asChild><Button variant="outline">Hover</Button></TooltipTrigger>
    <TooltipContent>Helpful hint</TooltipContent>
  </Tooltip>
</TooltipProvider>`,
      render: (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="outline">Hover</Button>
            </TooltipTrigger>
            <TooltipContent>Helpful hint</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      ),
    },
    examples: [
      {
        title: "All sides",
        code: `<TooltipProvider>
  <div className="flex gap-2">
    {(["top","right","bottom","left"]).map(s => (
      <Tooltip key={s}>
        <TooltipTrigger asChild><Button variant="outline" size="sm">{s}</Button></TooltipTrigger>
        <TooltipContent side={s}>Side: {s}</TooltipContent>
      </Tooltip>
    ))}
  </div>
</TooltipProvider>`,
        render: (
          <TooltipProvider>
            <div className="flex gap-2">
              {(["top", "right", "bottom", "left"] as const).map((s) => (
                <Tooltip key={s}>
                  <TooltipTrigger asChild>
                    <Button variant="outline" size="sm">
                      {s}
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent side={s}>Side: {s}</TooltipContent>
                </Tooltip>
              ))}
            </div>
          </TooltipProvider>
        ),
      },
    ],
  },

  // ---------- Dropdown Menu ----------
  {
    name: "dropdown-menu",
    title: "Dropdown Menu",
    description:
      "Accessible menu with support for items, submenus, and keyboard nav.",
    imports: `import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";`,
    defaultExample: {
      title: "Default",
      code: `<DropdownMenu>
  <DropdownMenuTrigger asChild>
    <Button variant="outline">Open menu</Button>
  </DropdownMenuTrigger>
  <DropdownMenuContent>
    <DropdownMenuLabel>My Account</DropdownMenuLabel>
    <DropdownMenuSeparator />
    <DropdownMenuItem>Profile</DropdownMenuItem>
    <DropdownMenuItem>Billing</DropdownMenuItem>
    <DropdownMenuItem>Settings</DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>`,
      render: (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">
              <MoreHorizontal className="h-4 w-4" />
              Open menu
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
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
              <Trash className="h-4 w-4" />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ),
    },
    examples: [
      {
        title: "With shortcuts",
        code: `<DropdownMenu>
  <DropdownMenuTrigger asChild><Button variant="outline">File</Button></DropdownMenuTrigger>
  <DropdownMenuContent>
    <DropdownMenuItem>
      New file <DropdownMenuShortcut>⌘N</DropdownMenuShortcut>
    </DropdownMenuItem>
    <DropdownMenuItem>
      Open <DropdownMenuShortcut>⌘O</DropdownMenuShortcut>
    </DropdownMenuItem>
    <DropdownMenuSeparator />
    <DropdownMenuItem>
      Save <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
    </DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>`,
        render: (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">File</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>
                New file
                <span className="ml-auto text-xs tracking-widest opacity-60">
                  ⌘N
                </span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                Open
                <span className="ml-auto text-xs tracking-widest opacity-60">
                  ⌘O
                </span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                Save
                <span className="ml-auto text-xs tracking-widest opacity-60">
                  ⌘S
                </span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ),
      },
    ],
  },

  // ---------- Command ----------
  {
    name: "command",
    title: "Command",
    description: "Fast, composable command menu built on cmdk.",
    imports: `import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";`,
    defaultExample: {
      title: "Default",
      code: `<Command className="rounded-lg border w-[380px]">
  <CommandInput placeholder="Type a command…" />
  <CommandList>
    <CommandEmpty>No results.</CommandEmpty>
    <CommandGroup heading="Suggestions">
      <CommandItem>Calendar</CommandItem>
      <CommandItem>Search emoji</CommandItem>
      <CommandItem>Calculator</CommandItem>
    </CommandGroup>
  </CommandList>
</Command>`,
      render: (
        <Command className="w-[380px] rounded-lg border">
          <CommandInput placeholder="Type a command…" />
          <CommandList>
            <CommandEmpty>No results.</CommandEmpty>
            <CommandGroup heading="Suggestions">
              <CommandItem>Calendar</CommandItem>
              <CommandItem>Search emoji</CommandItem>
              <CommandItem>Calculator</CommandItem>
            </CommandGroup>
          </CommandList>
        </Command>
      ),
    },
    examples: [
      {
        title: "Multiple groups",
        code: `<Command className="rounded-lg border w-[380px]">
  <CommandInput placeholder="Type a command..." />
  <CommandList>
    <CommandGroup heading="Suggestions">
      <CommandItem>Open quickly</CommandItem>
      <CommandItem>Search files</CommandItem>
    </CommandGroup>
    <CommandGroup heading="Settings">
      <CommandItem>Preferences</CommandItem>
      <CommandItem>Keyboard shortcuts</CommandItem>
    </CommandGroup>
  </CommandList>
</Command>`,
        render: (
          <Command className="w-[380px] rounded-lg border">
            <CommandInput placeholder="Type a command…" />
            <CommandList>
              <CommandGroup heading="Suggestions">
                <CommandItem>Open quickly</CommandItem>
                <CommandItem>Search files</CommandItem>
              </CommandGroup>
              <CommandGroup heading="Settings">
                <CommandItem>Preferences</CommandItem>
                <CommandItem>Keyboard shortcuts</CommandItem>
              </CommandGroup>
            </CommandList>
          </Command>
        ),
      },
    ],
  },

  // ---------- Combobox ----------
  {
    name: "combobox",
    title: "Combobox",
    description:
      "Searchable, keyboard-first single-select. Built on Popover + Command, with a custom-rendered selection chip.",
    imports: `import { Combobox } from "@/components/ui/combobox";`,
    defaultExample: {
      title: "Timezone picker",
      code: `const [value, setValue] = React.useState<string>("");
const TIMEZONES = [
  { value: "pst", label: "Pacific Standard Time", abbr: "UTC−08:00" },
  { value: "est", label: "Eastern Standard Time", abbr: "UTC−05:00" },
  { value: "gmt", label: "Greenwich Mean Time", abbr: "UTC+00:00" },
  { value: "ist", label: "India Standard Time", abbr: "UTC+05:30" },
];

<Popover>
  <PopoverTrigger asChild>
    <Button variant="outline" role="combobox">
      {selected?.label ?? "Pick a timezone…"}
      <ChevronsUpDown className="ml-auto h-4 w-4 opacity-50" />
    </Button>
  </PopoverTrigger>
  <PopoverContent className="w-[--radix-popover-trigger-width] p-0">
    <Command>
      <CommandInput placeholder="Search timezones…" />
      <CommandList>
        <CommandEmpty>No matches.</CommandEmpty>
        <CommandGroup>
          {TIMEZONES.map(t => (
            <CommandItem
              key={t.value}
              value={\`\${t.label} \${t.abbr}\`}
              onSelect={() => setValue(t.value)}
            >
              {t.label}
              <span className="ml-auto font-mono text-[10px] text-muted-foreground">
                {t.abbr}
              </span>
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </Command>
  </PopoverContent>
</Popover>`,
      render: <ComboboxDemo />,
    },
    examples: [
      {
        title: "Multi-select with checkboxes",
        description:
          "Combobox-style trigger that holds multiple values — the selected items render as chips inline.",
        code: `const [selected, setSelected] = React.useState<string[]>([]);

<Popover>
  <PopoverTrigger asChild>
    <Button variant="outline" role="combobox" className="w-full justify-between">
      {selected.length === 0
        ? "Select frameworks…"
        : selected.map(v => <Badge key={v}>{label(v)}</Badge>)}
      <ChevronsUpDown className="h-4 w-4 opacity-50" />
    </Button>
  </PopoverTrigger>
  <PopoverContent className="p-0">
    <Command>
      <CommandInput placeholder="Search…" />
      <CommandList>
        <CommandGroup>
          {options.map(o => (
            <CommandItem key={o.value} onSelect={() => toggle(o.value)}>
              <Checkbox checked={selected.includes(o.value)} />
              {o.label}
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </Command>
  </PopoverContent>
</Popover>`,
        render: <MultiSelectDemo />,
      },
    ],
  },

  // ---------- Date Picker (Calendar + Popover) ----------
  {
    name: "date-picker",
    title: "Date Picker",
    description:
      "Calendar-driven date selection. Use the inline <Calendar /> for embedded UI, or <DatePicker /> for a compact popover trigger.",
    imports: `// Compact popover trigger
import { DatePicker } from "@/components/ui/date-picker";

// Inline / embedded calendar
import { Calendar } from "@/components/ui/calendar";`,
    defaultExample: {
      title: "Popover (compact)",
      code: `<DatePicker />`,
      render: (
        <div className="w-full max-w-sm">
          <DatePicker />
        </div>
      ),
    },
    examples: [
      {
        title: "With label",
        code: `<div className="space-y-1.5">
  <Label htmlFor="dob">Date of birth</Label>
  <DatePicker />
</div>`,
        render: (
          <div className="w-full max-w-sm space-y-1.5">
            <Label htmlFor="ex-dp-dob">Date of birth</Label>
            <DatePicker />
          </div>
        ),
      },
      {
        title: "Inline calendar",
        description:
          "Embed the calendar directly in your layout — no popover, always visible.",
        code: `const [date, setDate] = React.useState<Date | undefined>(new Date());

<Calendar
  mode="single"
  selected={date}
  onSelect={setDate}
  className="rounded-md border"
/>`,
        render: <CalendarSingleDemo />,
      },
      {
        title: "Range selection",
        description: "Use mode=\"range\" to capture a from/to date pair.",
        code: `const [range, setRange] = React.useState<DateRange | undefined>({
  from: today,
  to: addDays(today, 4),
});

<Calendar mode="range" selected={range} onSelect={setRange} />`,
        render: <CalendarRangeDemo />,
      },
    ],
  },

  // ---------- Breadcrumb ----------
  {
    name: "breadcrumb",
    title: "Breadcrumb",
    description: "Breadcrumb trail with ellipsis collapse.",
    imports: `import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";`,
    defaultExample: {
      title: "Default",
      code: `<Breadcrumb>
  <BreadcrumbList>
    <BreadcrumbItem><BreadcrumbLink href="/">Home</BreadcrumbLink></BreadcrumbItem>
    <BreadcrumbSeparator />
    <BreadcrumbItem><BreadcrumbLink href="/docs">Docs</BreadcrumbLink></BreadcrumbItem>
    <BreadcrumbSeparator />
    <BreadcrumbItem><BreadcrumbPage>Breadcrumb</BreadcrumbPage></BreadcrumbItem>
  </BreadcrumbList>
</Breadcrumb>`,
      render: (
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="#">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="#">Docs</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Breadcrumb</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      ),
    },
    examples: [
      {
        title: "Custom separator",
        code: `<Breadcrumb>
  <BreadcrumbList>
    <BreadcrumbItem><BreadcrumbLink href="/">Home</BreadcrumbLink></BreadcrumbItem>
    <BreadcrumbSeparator>/</BreadcrumbSeparator>
    <BreadcrumbItem><BreadcrumbLink href="/docs">Docs</BreadcrumbLink></BreadcrumbItem>
    <BreadcrumbSeparator>/</BreadcrumbSeparator>
    <BreadcrumbItem><BreadcrumbPage>Components</BreadcrumbPage></BreadcrumbItem>
  </BreadcrumbList>
</Breadcrumb>`,
        render: (
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="#">Home</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator>/</BreadcrumbSeparator>
              <BreadcrumbItem>
                <BreadcrumbLink href="#">Docs</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator>/</BreadcrumbSeparator>
              <BreadcrumbItem>
                <BreadcrumbPage>Components</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        ),
      },
      {
        title: "With ellipsis",
        code: `<Breadcrumb>
  <BreadcrumbList>
    <BreadcrumbItem><BreadcrumbLink href="/">Home</BreadcrumbLink></BreadcrumbItem>
    <BreadcrumbSeparator />
    <BreadcrumbItem><BreadcrumbEllipsis /></BreadcrumbItem>
    <BreadcrumbSeparator />
    <BreadcrumbItem><BreadcrumbLink href="#">Components</BreadcrumbLink></BreadcrumbItem>
    <BreadcrumbSeparator />
    <BreadcrumbItem><BreadcrumbPage>Button</BreadcrumbPage></BreadcrumbItem>
  </BreadcrumbList>
</Breadcrumb>`,
        render: (
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="#">Home</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <span className="px-1 text-muted-foreground">…</span>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href="#">Components</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Button</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        ),
      },
    ],
  },

  // ---------- Pagination ----------
  {
    name: "pagination",
    title: "Pagination",
    description: "Pagination controls.",
    imports: `import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";`,
    defaultExample: {
      title: "Default",
      code: `<Pagination>
  <PaginationContent>
    <PaginationItem><PaginationPrevious href="#" /></PaginationItem>
    <PaginationItem><PaginationLink href="#">1</PaginationLink></PaginationItem>
    <PaginationItem><PaginationLink href="#" isActive>2</PaginationLink></PaginationItem>
    <PaginationItem><PaginationLink href="#">3</PaginationLink></PaginationItem>
    <PaginationItem><PaginationEllipsis /></PaginationItem>
    <PaginationItem><PaginationNext href="#" /></PaginationItem>
  </PaginationContent>
</Pagination>`,
      render: (
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious href="#" />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">1</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#" isActive>
                2
              </PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">3</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
            <PaginationItem>
              <PaginationNext href="#" />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      ),
    },
    examples: [
      {
        title: "Bare prev / next",
        description:
          "Drop the numeric pages for a minimal previous/next pattern.",
        code: `<Pagination>
  <PaginationContent>
    <PaginationItem><PaginationPrevious href="#" /></PaginationItem>
    <span className="px-3 text-sm text-muted-foreground">Page 3 of 12</span>
    <PaginationItem><PaginationNext href="#" /></PaginationItem>
  </PaginationContent>
</Pagination>`,
        render: (
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious href="#" />
              </PaginationItem>
              <span className="px-3 text-sm text-muted-foreground">
                Page 3 of 12
              </span>
              <PaginationItem>
                <PaginationNext href="#" />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        ),
      },
    ],
  },

  // ---------- Table ----------
  {
    name: "table",
    title: "Table",
    description: "Semantic HTML table with styled parts.",
    imports: `import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";`,
    defaultExample: {
      title: "Recent invoices",
      code: `<Table>
  <TableHeader>
    <TableRow>
      <TableHead>Invoice</TableHead>
      <TableHead>Status</TableHead>
      <TableHead className="text-right">Amount</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    <TableRow>
      <TableCell>INV001</TableCell>
      <TableCell><Badge variant="success">Paid</Badge></TableCell>
      <TableCell className="text-right">$250.00</TableCell>
    </TableRow>
    <TableRow>
      <TableCell>INV002</TableCell>
      <TableCell><Badge variant="warning">Pending</Badge></TableCell>
      <TableCell className="text-right">$150.00</TableCell>
    </TableRow>
  </TableBody>
</Table>`,
      render: (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Invoice</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Amount</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>INV001</TableCell>
              <TableCell>
                <Badge variant="success">Paid</Badge>
              </TableCell>
              <TableCell className="text-right">$250.00</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>INV002</TableCell>
              <TableCell>
                <Badge variant="warning">Pending</Badge>
              </TableCell>
              <TableCell className="text-right">$150.00</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      ),
    },
    examples: [
      {
        title: "Team members",
        code: `<Table>
  <TableHeader>
    <TableRow>
      <TableHead>Name</TableHead>
      <TableHead>Role</TableHead>
      <TableHead>Status</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    {team.map(t => (
      <TableRow key={t.email}>
        <TableCell className="font-medium">{t.name}</TableCell>
        <TableCell>{t.role}</TableCell>
        <TableCell><Badge variant="success">Active</Badge></TableCell>
      </TableRow>
    ))}
  </TableBody>
</Table>`,
        render: (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {[
                { name: "Olivia Martin", role: "Designer", status: "Active" },
                { name: "Jackson Lee", role: "Engineer", status: "Active" },
                { name: "Isabella Nguyen", role: "PM", status: "Invited" },
              ].map((t) => (
                <TableRow key={t.name}>
                  <TableCell className="font-medium">{t.name}</TableCell>
                  <TableCell>{t.role}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        t.status === "Active" ? "success" : "secondary"
                      }
                    >
                      {t.status}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ),
      },
      {
        title: "Selectable rows",
        description:
          "Combine the table with Checkbox to support row selection. The first column toggles a single row; the header cell selects all.",
        code: `const [selected, setSelected] = React.useState<Set<number>>(new Set());

<Table>
  <TableHeader>
    <TableRow>
      <TableHead className="w-10">
        <Checkbox checked={allChecked} onCheckedChange={toggleAll} />
      </TableHead>
      <TableHead>Name</TableHead>
      <TableHead>Email</TableHead>
      <TableHead>Role</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    {data.map(row => (
      <TableRow key={row.id} data-state={selected.has(row.id) ? "selected" : undefined}>
        <TableCell>
          <Checkbox
            checked={selected.has(row.id)}
            onCheckedChange={() => toggle(row.id)}
          />
        </TableCell>
        <TableCell>{row.name}</TableCell>
        <TableCell>{row.email}</TableCell>
        <TableCell><Badge variant="secondary">{row.role}</Badge></TableCell>
      </TableRow>
    ))}
  </TableBody>
</Table>`,
        render: <SelectableTableDemo />,
      },
    ],
  },

  // ---------- Toast ----------
  {
    name: "toast",
    title: "Toast",
    description:
      "Transient notifications. Combine the useToast hook with <Toaster /> in your layout.",
    imports: `import { useToast } from "@/hooks/use-toast";
import { Toaster } from "@/components/ui/toaster";`,
    usage: `// Render <Toaster /> once in your root layout, then call useToast() where needed:
const { toast } = useToast();
toast({ title: "Copied", description: "Link copied to clipboard" });`,
    defaultExample: {
      title: "Try it",
      code: `import { toast } from "@/hooks/use-toast";

<Button onClick={() => toast({ title: "Saved", description: "Your changes are live." })}>
  Show toast
</Button>`,
      render: <ToastDemo />,
    },
  },

  // ---------- FileUpload ----------
  {
    name: "file-upload",
    title: "File Upload",
    description:
      "Drop / click upload zone with an animated grid backdrop, a central upload tile, and a dashed accent ring that smoothly fades in on hover or drag-over. Selected files appear as removable chips below the zone.",
    imports: `import { FileUpload } from "@/components/ui/file-upload";`,
    defaultExample: {
      title: "Drag, drop, or click",
      description:
        "Hover the zone to see the dashed accent ring fade in and the central tile lift. Drop files (or click to open the picker) and they appear as removable chips. The component manages its own state but emits the selected files via `onChange`.",
      code: `const [files, setFiles] = useState<File[]>([]);

<FileUpload
  onChange={setFiles}
  accept="image/*,application/pdf"
/>`,
      render: <FileUploadDemo />,
    },
    props: [
      {
        name: "onChange",
        type: "(files: File[]) => void",
        description: "Fired when files are selected via drop or the file picker.",
      },
      {
        name: "multiple",
        type: "boolean",
        default: "true",
        description: "Allow multiple files.",
      },
      {
        name: "accept",
        type: "string",
        description: "`accept` attribute for the underlying file input.",
      },
      {
        name: "title",
        type: "ReactNode",
        default: `"Upload file"`,
      },
      {
        name: "description",
        type: "ReactNode",
        default: `"Drag or drop your files here or click to upload"`,
      },
      {
        name: "accentColor",
        type: "string",
        default: `"rgb(56, 189, 248)"`,
        description: "Color of the dashed ring + icon glow.",
      },
      {
        name: "disabled",
        type: "boolean",
        default: "false",
      },
    ],
    related: ["input", "form"],
  },

  // ---------- Footer ----------
  {
    name: "footer",
    title: "Footer",
    description:
      "Site footer with a brand column, up to four link columns, and an optional giant watermark wordmark behind the content.",
    imports: `import { Footer } from "@/components/ui/footer";`,
    defaultExample: {
      title: "Brand + four link columns + watermark",
      description:
        "Pass a brand mark, copyright line, and an array of `columns` (each with a title and links). Add a `watermark` for the giant decorative wordmark behind the content.",
      code: `<Footer
  brand={<><Logo /> <span>DevStudio</span></>}
  copyright="© DevStudios 2024. All rights reserved."
  watermark="DevStudio"
  columns={[
    { title: "Pages", links: [...] },
    { title: "Socials", links: [...] },
    { title: "Legal", links: [...] },
    { title: "Register", links: [...] },
  ]}
/>`,
      render: <FooterDemo />,
    },
    props: [
      {
        name: "brand",
        type: "ReactNode",
        description: "Brand mark — typically a logo and/or wordmark.",
      },
      {
        name: "copyright",
        type: "ReactNode",
        description: "Copyright/notice rendered below the brand.",
      },
      {
        name: "columns",
        type: "{ title: ReactNode; links: { label: ReactNode; href: string }[] }[]",
        description: "Up to four columns of navigation links.",
      },
      {
        name: "watermark",
        type: "ReactNode",
        description: "Giant wordmark rendered behind the footer (decorative).",
      },
      {
        name: "showDivider",
        type: "boolean",
        default: "true",
        description: "Show a top divider rule above the content.",
      },
    ],
    related: ["navbar", "layout"],
  },

  // ---------- Form ----------
  {
    name: "form",
    title: "Form",
    description:
      "Form primitives wired to react-hook-form + Zod for type-safe validation.",
    imports: `import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";`,
    usage: `import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

const schema = z.object({
  email: z.string().email(),
});

const form = useForm<z.infer<typeof schema>>({
  resolver: zodResolver(schema),
  defaultValues: { email: "" },
});`,
    defaultExample: {
      title: "Sign-up form",
      code: `const schema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(8),
  bio: z.string().max(160).optional(),
  country: z.string().min(1),
  dob: z.date().optional(),
  plan: z.enum(["hobby","pro","team"]),
  marketing: z.boolean(),
  terms: z.literal(true),
});

const form = useForm<z.infer<typeof schema>>({
  resolver: zodResolver(schema),
  defaultValues: { /* ... */ },
});

<Form {...form}>
  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
    {/* Inputs, Textarea, Select, DatePicker, RadioGroup, Switch, Checkbox */}
    <Button type="submit">Create account</Button>
  </form>
</Form>`,
      render: <FullFormDemo />,
    },
    examples: [
      {
        title: "Login form",
        description:
          "A minimal two-field form. Validation runs on submit; errors appear under each field.",
        code: `const schema = z.object({
  email: z.string().email("Invalid email"),
  password: z.string().min(8, "At least 8 characters"),
});

const form = useForm<z.infer<typeof schema>>({
  resolver: zodResolver(schema),
});

<Form {...form}>
  <form onSubmit={form.handleSubmit(onSubmit)}>
    <FormField name="email" render={({field}) => (
      <FormItem>
        <FormLabel>Email</FormLabel>
        <FormControl><Input type="email" {...field} /></FormControl>
        <FormMessage />
      </FormItem>
    )} />
    <FormField name="password" render={({field}) => (
      <FormItem>
        <FormLabel>Password</FormLabel>
        <FormControl><Input type="password" {...field} /></FormControl>
        <FormMessage />
      </FormItem>
    )} />
    <Button type="submit" className="w-full">Sign in</Button>
  </form>
</Form>`,
        render: <LoginFormDemo />,
      },
    ],
  },

  // ---------- Layout: container ----------
  {
    name: "layout",
    title: "Layout primitives",
    description:
      "Container, Stack, Grid, and AspectRatio — the building blocks for page layout.",
    imports: `import { Container, Stack, Grid, AspectRatio } from "@/components/ui/container";`,
    defaultExample: {
      title: "Stack",
      code: `<Stack spacing="default">
  <div className="rounded-md border p-3">Item 1</div>
  <div className="rounded-md border p-3">Item 2</div>
  <div className="rounded-md border p-3">Item 3</div>
</Stack>`,
      render: (
        <Stack spacing="default" className="w-full max-w-sm">
          <div className="rounded-md border bg-background p-3 text-sm">
            Item 1
          </div>
          <div className="rounded-md border bg-background p-3 text-sm">
            Item 2
          </div>
          <div className="rounded-md border bg-background p-3 text-sm">
            Item 3
          </div>
        </Stack>
      ),
    },
    examples: [
      {
        title: "Grid",
        code: `<Grid cols={3} gap="default">
  {items.map(i => <div>{i}</div>)}
</Grid>`,
        render: (
          <Grid cols={3} gap="default" className="w-full">
            {[1, 2, 3, 4, 5, 6].map((n) => (
              <div
                key={n}
                className="rounded-md border bg-background p-3 text-center text-sm"
              >
                {n}
              </div>
            ))}
          </Grid>
        ),
      },
      {
        title: "AspectRatio",
        code: `<AspectRatio ratio={16 / 9}>
  <img className="rounded-md object-cover" />
</AspectRatio>`,
        render: (
          <div className="w-full max-w-md">
            <AspectRatio ratio={16 / 9}>
              <div className="h-full w-full rounded-md border bg-muted" />
            </AspectRatio>
          </div>
        ),
      },
    ],
  },

  // ---------- Navbar ----------
  {
    name: "navbar",
    title: "Navbar",
    description: "Top-level site navigation header with brand, links, actions.",
    imports: `import { Navbar, NavbarActions, NavbarBrand, NavbarContent } from "@/components/ui/navbar";`,
    defaultExample: {
      title: "Modern app navbar",
      code: `<Navbar>
  <NavbarBrand>
    <Logo /> Acme <Badge>Pro</Badge>
  </NavbarBrand>
  <NavbarContent>
    <Link href="#">Dashboard</Link>
    <Link href="#">Customers</Link>
    <Link href="#">Reports</Link>
  </NavbarContent>
  <NavbarActions>
    <SearchTrigger />
    <NotificationBell />
    <UserMenu />
  </NavbarActions>
</Navbar>`,
      render: <ModernNavbarDemo />,
    },
    examples: [
      {
        title: "Marketing site",
        code: `<Navbar>
  <NavbarBrand>Acme</NavbarBrand>
  <NavbarContent>
    <a href="#">Features</a>
    <a href="#">Pricing</a>
    <a href="#">Docs</a>
  </NavbarContent>
  <NavbarActions>
    <Button variant="ghost" size="sm">Sign in</Button>
    <Button size="sm">Get started</Button>
  </NavbarActions>
</Navbar>`,
        render: (
          <div className="w-full overflow-hidden rounded-md border bg-background">
            <div className="flex h-14 items-center gap-6 px-4">
              <span className="font-semibold">Acme</span>
              <nav className="hidden gap-5 text-sm text-muted-foreground md:flex">
                <a href="#" className="hover:text-foreground">
                  Features
                </a>
                <a href="#" className="hover:text-foreground">
                  Pricing
                </a>
                <a href="#" className="hover:text-foreground">
                  Docs
                </a>
              </nav>
              <div className="ml-auto flex items-center gap-2">
                <Button variant="ghost" size="sm">
                  Sign in
                </Button>
                <Button size="sm">Get started</Button>
              </div>
            </div>
          </div>
        ),
      },
    ],
  },

  // ---------- Sidebar ----------
  {
    name: "sidebar",
    title: "Sidebar",
    description: "Collapsible app sidebar with nav items.",
    imports: `import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarNavItem,
} from "@/components/ui/sidebar";`,
    defaultExample: {
      title: "Clickable nav (try it)",
      code: `const [active, setActive] = React.useState("overview");

<Sidebar className="w-56">
  <SidebarHeader>Acme</SidebarHeader>
  <SidebarContent>
    {nav.map(n => (
      <SidebarNavItem
        key={n.id}
        href="#"
        active={active === n.id}
        onClick={(e) => { e.preventDefault(); setActive(n.id); }}
      >
        <n.icon className="h-4 w-4" />
        {n.label}
      </SidebarNavItem>
    ))}
  </SidebarContent>
</Sidebar>`,
      render: <SidebarDemo />,
    },
  },

  // ---------- Theme provider ----------
  {
    name: "theme-provider",
    title: "Theme Provider",
    description:
      "Client-side theme provider with light / dark / system support and localStorage persistence.",
    imports: `import { ThemeProvider, useTheme } from "@/components/ui/theme-provider";`,
    usage: `// Wrap your app at the root:
<ThemeProvider defaultTheme="system">
  <App />
</ThemeProvider>

// Then anywhere:
const { theme, setTheme, resolvedTheme } = useTheme();`,
    defaultExample: {
      title: "Light / Dark / System toggle",
      code: `const { theme, setTheme, resolvedTheme } = useTheme();

<div className="inline-flex rounded-lg border p-1">
  {["light","dark","system"].map(t => (
    <button
      key={t}
      onClick={() => setTheme(t)}
      data-active={theme === t}
    >
      {t}
    </button>
  ))}
</div>`,
      render: <ThemeProviderDemo />,
    },
  },

  // ---------- Toggle (+ ToggleGroup) ----------
  {
    name: "toggle",
    title: "Toggle",
    description:
      "Two-state pressable buttons. Use a single Toggle for binary controls, or a ToggleGroup for segmented selection.",
    imports: `import { Toggle } from "@/components/ui/toggle";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";`,
    defaultExample: {
      title: "Single toggle",
      code: `const [pressed, setPressed] = React.useState(false);

<Toggle pressed={pressed} onPressedChange={setPressed}>
  <Bell className="h-4 w-4" />
  Notifications
</Toggle>`,
      render: <ToggleDemo />,
    },
    examples: [
      {
        title: "Toggle group — text formatting",
        description:
          "Multi-select group. Press to apply Bold / Italic / Underline.",
        code: `<ToggleGroup type="multiple" defaultValue={["bold","italic"]}>
  <ToggleGroupItem value="bold"><span className="font-bold">B</span></ToggleGroupItem>
  <ToggleGroupItem value="italic"><span className="italic">I</span></ToggleGroupItem>
  <ToggleGroupItem value="underline"><span className="underline">U</span></ToggleGroupItem>
</ToggleGroup>`,
        render: (
          <ToggleGroup type="multiple" defaultValue={["bold", "italic"]}>
            <ToggleGroupItem value="bold">
              <span className="font-bold">B</span>
            </ToggleGroupItem>
            <ToggleGroupItem value="italic">
              <span className="italic">I</span>
            </ToggleGroupItem>
            <ToggleGroupItem value="underline">
              <span className="underline">U</span>
            </ToggleGroupItem>
          </ToggleGroup>
        ),
      },
      {
        title: "View switcher (single, outline)",
        description: "Single-select group with the outline variant.",
        code: `<ToggleGroup type="single" defaultValue="grid" variant="outline">
  <ToggleGroupItem value="grid">Grid</ToggleGroupItem>
  <ToggleGroupItem value="list">List</ToggleGroupItem>
  <ToggleGroupItem value="kanban">Kanban</ToggleGroupItem>
</ToggleGroup>`,
        render: (
          <ToggleGroup
            type="single"
            defaultValue="grid"
            variant="outline"
          >
            <ToggleGroupItem value="grid">Grid</ToggleGroupItem>
            <ToggleGroupItem value="list">List</ToggleGroupItem>
            <ToggleGroupItem value="kanban">Kanban</ToggleGroupItem>
          </ToggleGroup>
        ),
      },
    ],
    props: [
      {
        name: "variant",
        type: `"default" | "outline"`,
        default: `"default"`,
      },
      {
        name: "size",
        type: `"sm" | "default" | "lg"`,
        default: `"default"`,
      },
      { name: "pressed", type: "boolean" },
      { name: "defaultPressed", type: "boolean" },
      {
        name: "onPressedChange",
        type: "(pressed: boolean) => void",
      },
    ],
    related: ["switch", "tabs"],
  },

  // ---------- Sheet ----------
  {
    name: "sheet",
    title: "Sheet",
    description:
      "A side-anchored slide-in panel. Useful for mobile menus, settings, and secondary forms.",
    imports: `import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";`,
    defaultExample: {
      title: "Right (default)",
      code: `<Sheet>
  <SheetTrigger asChild><Button variant="outline">Open sheet</Button></SheetTrigger>
  <SheetContent>
    <SheetHeader>
      <SheetTitle>Edit profile</SheetTitle>
      <SheetDescription>Make changes to your profile here.</SheetDescription>
    </SheetHeader>
    <div className="grid gap-3 py-4">
      <Label>Name</Label>
      <Input defaultValue="Pedro Duarte" />
    </div>
    <SheetFooter>
      <Button>Save changes</Button>
    </SheetFooter>
  </SheetContent>
</Sheet>`,
      render: (
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline">Open sheet</Button>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>Edit profile</SheetTitle>
              <SheetDescription>
                Make changes to your profile here.
              </SheetDescription>
            </SheetHeader>
            <div className="grid gap-3 py-4">
              <Label htmlFor="ex-sh-name">Name</Label>
              <Input id="ex-sh-name" defaultValue="Pedro Duarte" />
            </div>
            <SheetFooter>
              <Button>Save changes</Button>
            </SheetFooter>
          </SheetContent>
        </Sheet>
      ),
    },
    examples: [
      {
        title: "Sides",
        code: `<div className="flex gap-2">
  {(["top","right","bottom","left"]).map(s => (
    <Sheet key={s}>
      <SheetTrigger asChild><Button variant="outline" size="sm">{s}</Button></SheetTrigger>
      <SheetContent side={s}>
        <SheetHeader>
          <SheetTitle>{s} sheet</SheetTitle>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  ))}
</div>`,
        render: (
          <div className="flex flex-wrap gap-2">
            {(["top", "right", "bottom", "left"] as const).map((s) => (
              <Sheet key={s}>
                <SheetTrigger asChild>
                  <Button variant="outline" size="sm">
                    {s}
                  </Button>
                </SheetTrigger>
                <SheetContent side={s}>
                  <SheetHeader>
                    <SheetTitle>{s} sheet</SheetTitle>
                    <SheetDescription>
                      Slides in from the {s}.
                    </SheetDescription>
                  </SheetHeader>
                </SheetContent>
              </Sheet>
            ))}
          </div>
        ),
      },
    ],
    related: ["dialog", "drawer"],
  },

  // ---------- HoverCard ----------
  {
    name: "hover-card",
    title: "Hover Card",
    description:
      "Rich preview that appears on hover or focus — perfect for user mentions, link previews, or contextual info.",
    imports: `import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";`,
    defaultExample: {
      title: "User preview",
      code: `<HoverCard>
  <HoverCardTrigger asChild>
    <Button variant="link">@shadcn</Button>
  </HoverCardTrigger>
  <HoverCardContent className="w-72">
    <div className="flex gap-3">
      <Avatar><AvatarFallback>SH</AvatarFallback></Avatar>
      <div>
        <h4 className="font-semibold">@shadcn</h4>
        <p className="text-xs text-muted-foreground">Building UI primitives that you own.</p>
      </div>
    </div>
  </HoverCardContent>
</HoverCard>`,
      render: (
        <HoverCard>
          <HoverCardTrigger asChild>
            <Button variant="link">@shadcn</Button>
          </HoverCardTrigger>
          <HoverCardContent className="w-72">
            <div className="flex gap-3">
              <Avatar>
                <AvatarFallback>SH</AvatarFallback>
              </Avatar>
              <div>
                <h4 className="font-semibold">@shadcn</h4>
                <p className="text-xs text-muted-foreground">
                  Building UI primitives that you own.
                </p>
                <p className="mt-2 text-xs text-muted-foreground">
                  Joined December 2021
                </p>
              </div>
            </div>
          </HoverCardContent>
        </HoverCard>
      ),
    },
    props: [
      { name: "openDelay", type: "number", default: "200" },
      { name: "closeDelay", type: "number", default: "150" },
      { name: "open", type: "boolean" },
      { name: "onOpenChange", type: "(open: boolean) => void" },
    ],
    related: ["popover", "tooltip"],
  },

  // ---------- InputOTP ----------
  {
    name: "input-otp",
    title: "Input OTP",
    description:
      "Multi-cell one-time password input with auto-advance, paste support, and a blinking caret.",
    imports: `import { InputOTP } from "@/components/ui/input-otp";`,
    defaultExample: {
      title: "Six-digit code",
      code: `<InputOTP length={6} />`,
      render: <InputOTP length={6} />,
    },
    examples: [
      {
        title: "With label and helper",
        description:
          "Pair the input with descriptive copy so users know where the code came from.",
        code: `<div className="space-y-2">
  <Label>Verification code</Label>
  <InputOTP length={6} />
  <p className="text-xs text-muted-foreground">
    We sent a 6-digit code to your email — it expires in 10 minutes.
  </p>
</div>`,
        render: (
          <div className="space-y-2">
            <Label>Verification code</Label>
            <InputOTP length={6} />
            <p className="text-xs text-muted-foreground">
              We sent a 6-digit code to your email — it expires in 10
              minutes.
            </p>
          </div>
        ),
      },
    ],
    props: [
      { name: "length", type: "number", default: "6" },
      { name: "value", type: "string" },
      { name: "defaultValue", type: "string" },
      { name: "onChange", type: "(value: string) => void" },
      { name: "onComplete", type: "(value: string) => void" },
      { name: "disabled", type: "boolean" },
    ],
    related: ["input", "form"],
  },

  // ---------- Kbd ----------
  {
    name: "kbd",
    title: "Kbd",
    description:
      "Inline keyboard shortcut chip. Use it next to button text or in tooltips to advertise hotkeys.",
    imports: `import { Kbd } from "@/components/ui/kbd";`,
    defaultExample: {
      title: "Default",
      code: `<div className="flex items-center gap-2 text-sm">
  Press <Kbd>⌘</Kbd> <Kbd>K</Kbd> to open the command palette.
</div>`,
      render: (
        <div className="flex items-center gap-1 text-sm">
          Press <Kbd>⌘</Kbd> <Kbd>K</Kbd>
          <span className="ml-1 text-muted-foreground">
            to open the command palette.
          </span>
        </div>
      ),
    },
    props: [
      {
        name: "size",
        type: `"sm" | "default" | "lg"`,
        default: `"default"`,
      },
    ],
  },

  // ---------- Empty State ----------
  {
    name: "empty-state",
    title: "Empty State",
    description:
      "A friendly placeholder for empty lists, search results, or first-run experiences. Icon + title + description + optional CTA.",
    imports: `import { EmptyState } from "@/components/ui/empty-state";`,
    defaultExample: {
      title: "No results",
      code: `<EmptyState
  icon={<Search />}
  title="No results found"
  description="Try a different search term or clear the filters."
  action={<Button variant="outline">Clear filters</Button>}
/>`,
      render: (
        <EmptyState
          className="w-full max-w-md"
          icon={<Search />}
          title="No results found"
          description="Try a different search term or clear the filters."
          action={<Button variant="outline">Clear filters</Button>}
        />
      ),
    },
    examples: [
      {
        title: "First-run / onboarding",
        description:
          "Use a stronger title and a primary CTA to guide users to their first action.",
        code: `<EmptyState
  icon={<Plus />}
  title="Create your first project"
  description="Projects let you group related work. Start with a template or a blank canvas."
  action={<Button>New project</Button>}
/>`,
        render: (
          <EmptyState
            className="w-full max-w-md"
            icon={<MoreHorizontal />}
            title="Create your first project"
            description="Projects let you group related work. Start with a template or a blank canvas."
            action={<Button>New project</Button>}
          />
        ),
      },
    ],
    props: [
      { name: "icon", type: "ReactNode" },
      { name: "title", type: "ReactNode", required: true },
      { name: "description", type: "ReactNode" },
      { name: "action", type: "ReactNode" },
    ],
  },

  // ---------- Stat ----------
  {
    name: "stat",
    title: "Stat",
    description:
      "A purpose-built KPI card with label, value, trend delta, and optional helper text.",
    imports: `import { Stat } from "@/components/ui/stat";`,
    defaultExample: {
      title: "Revenue",
      code: `<Stat
  label="Revenue"
  value="$45,231.89"
  delta="+20.1%"
  trend="up"
  helper="vs. last month"
  icon={<CreditCard />}
/>`,
      render: (
        <Stat
          className="w-[260px]"
          label="Revenue"
          value="$45,231.89"
          delta="+20.1%"
          trend="up"
          helper="vs. last month"
          icon={<CreditCard />}
        />
      ),
    },
    examples: [
      {
        title: "Stat grid",
        description:
          "Compose multiple Stat cards in a grid for dashboards. Trend automatically chooses the icon and color (up/down/flat).",
        code: `<div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
  <Stat label="Visitors" value="12,402" delta="+12.4%" trend="up" />
  <Stat label="Signups" value="824" delta="+4.2%" trend="up" />
  <Stat label="Bounce" value="32%" delta="-1.8%" trend="down" />
  <Stat label="MRR" value="$8,210" delta="0%" trend="flat" />
</div>`,
        render: (
          <div className="grid w-full gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <Stat label="Visitors" value="12,402" delta="+12.4%" trend="up" />
            <Stat label="Signups" value="824" delta="+4.2%" trend="up" />
            <Stat label="Bounce" value="32%" delta="-1.8%" trend="down" />
            <Stat label="MRR" value="$8,210" delta="0%" trend="flat" />
          </div>
        ),
      },
    ],
    props: [
      { name: "label", type: "ReactNode", required: true },
      { name: "value", type: "ReactNode", required: true },
      { name: "delta", type: "ReactNode" },
      {
        name: "trend",
        type: `"up" | "down" | "flat"`,
        default: `"flat"`,
      },
      { name: "icon", type: "ReactNode" },
      { name: "helper", type: "ReactNode" },
    ],
    related: ["card"],
  },

  // ---------- Stepper ----------
  {
    name: "stepper",
    title: "Stepper",
    description:
      "Multi-step progress indicator with completed / current / upcoming states. Horizontal for forms, vertical for narrow surfaces.",
    imports: `import { Stepper } from "@/components/ui/stepper";`,
    defaultExample: {
      title: "Horizontal",
      code: `<Stepper
  current={1}
  steps={[
    { title: "Account" },
    { title: "Profile" },
    { title: "Plan" },
    { title: "Confirm" },
  ]}
/>`,
      render: (
        <div className="w-full max-w-2xl">
          <Stepper
            current={1}
            steps={[
              { title: "Account" },
              { title: "Profile" },
              { title: "Plan" },
              { title: "Confirm" },
            ]}
          />
        </div>
      ),
    },
    examples: [
      {
        title: "Vertical with descriptions",
        description:
          "Vertical orientation works better in narrow side panels and supports per-step descriptions.",
        code: `<Stepper
  orientation="vertical"
  current={2}
  steps={[
    { title: "Create account", description: "Email and password." },
    { title: "Verify email", description: "We sent a 6-digit code." },
    { title: "Set up workspace", description: "Pick a name and slug." },
    { title: "Invite teammates", description: "Optional — you can do this later." },
  ]}
/>`,
        render: (
          <div className="w-full max-w-md">
            <Stepper
              orientation="vertical"
              current={2}
              steps={[
                {
                  title: "Create account",
                  description: "Email and password.",
                },
                {
                  title: "Verify email",
                  description: "We sent a 6-digit code.",
                },
                {
                  title: "Set up workspace",
                  description: "Pick a name and slug.",
                },
                {
                  title: "Invite teammates",
                  description: "Optional — you can do this later.",
                },
              ]}
            />
          </div>
        ),
      },
    ],
    props: [
      { name: "steps", type: "StepperStep[]", required: true },
      { name: "current", type: "number", required: true },
      {
        name: "orientation",
        type: `"horizontal" | "vertical"`,
        default: `"horizontal"`,
      },
    ],
  },

  // ---------- Timeline ----------
  {
    name: "timeline",
    title: "Timeline",
    description:
      "Vertical timeline of events. Compose markers (dots, icons), titles, timestamps, and descriptions for changelogs and activity feeds.",
    imports: `import {
  Timeline,
  TimelineDescription,
  TimelineHeader,
  TimelineItem,
  TimelineTime,
  TimelineTitle,
} from "@/components/ui/timeline";`,
    defaultExample: {
      title: "Activity feed",
      code: `<Timeline>
  {events.map((e, i) => (
    <TimelineItem key={e.id} isLast={i === events.length - 1}>
      <TimelineHeader>
        <TimelineTitle>{e.title}</TimelineTitle>
        <TimelineTime>{e.when}</TimelineTime>
      </TimelineHeader>
      <TimelineDescription>{e.body}</TimelineDescription>
    </TimelineItem>
  ))}
</Timeline>`,
      render: (
        <Timeline className="w-full max-w-md">
          {[
            {
              id: 1,
              title: "Deployed v0.2.0 to production",
              when: "2 min ago",
              body: "Includes 3 new components and the redesigned shadow language.",
            },
            {
              id: 2,
              title: "Merged feat/component-design-changes",
              when: "1 h ago",
              body: "47 files changed, 1,234 insertions, 412 deletions.",
            },
            {
              id: 3,
              title: "Opened PR #142",
              when: "3 h ago",
              body: "Design polish across Button, Card, and Switch.",
            },
            {
              id: 4,
              title: "Created branch",
              when: "Yesterday",
            },
          ].map((e, i, arr) => (
            <TimelineItem key={e.id} isLast={i === arr.length - 1}>
              <TimelineHeader>
                <TimelineTitle>{e.title}</TimelineTitle>
                <TimelineTime>{e.when}</TimelineTime>
              </TimelineHeader>
              {e.body ? (
                <TimelineDescription>{e.body}</TimelineDescription>
              ) : null}
            </TimelineItem>
          ))}
        </Timeline>
      ),
    },
    examples: [
      {
        title: "With custom markers",
        description:
          "Pass any node to the marker prop — useful for icons that signal event type.",
        code: `<Timeline>
  <TimelineItem marker={<Plus />}>
    <TimelineTitle>Project created</TimelineTitle>
  </TimelineItem>
  <TimelineItem marker={<CheckCircle2 />}>
    <TimelineTitle>Domain verified</TimelineTitle>
  </TimelineItem>
  <TimelineItem marker={<Bell />} isLast>
    <TimelineTitle>Notifications enabled</TimelineTitle>
  </TimelineItem>
</Timeline>`,
        render: (
          <Timeline className="w-full max-w-md">
            <TimelineItem marker={<MoreHorizontal />}>
              <TimelineTitle>Project created</TimelineTitle>
              <TimelineDescription>
                Initialized with the Next.js + Tailwind template.
              </TimelineDescription>
            </TimelineItem>
            <TimelineItem marker={<CheckCircle2 />}>
              <TimelineTitle>Domain verified</TimelineTitle>
              <TimelineDescription>
                acme.com is now ready to receive traffic.
              </TimelineDescription>
            </TimelineItem>
            <TimelineItem marker={<Bell />} isLast>
              <TimelineTitle>Notifications enabled</TimelineTitle>
            </TimelineItem>
          </Timeline>
        ),
      },
    ],
  },

  // ---------- Rating ----------
  {
    name: "rating",
    title: "Rating",
    description:
      "Star rating control with hover preview, keyboard support, and click-to-clear behavior.",
    imports: `import { Rating } from "@/components/ui/rating";`,
    defaultExample: {
      title: "Interactive",
      code: `const [rating, setRating] = React.useState(4);

<Rating value={rating} onChange={setRating} />`,
      render: <RatingDemo />,
    },
    examples: [
      {
        title: "Read-only display",
        description:
          "Use readOnly when showing a rating sourced from data — keyboard and click are disabled.",
        code: `<Rating value={4.5} readOnly />`,
        render: (
          <div className="flex items-center gap-3 text-sm">
            <Rating value={4} readOnly />
            <span className="text-muted-foreground">4.0 · 1,238 reviews</span>
          </div>
        ),
      },
    ],
    props: [
      { name: "value", type: "number" },
      { name: "defaultValue", type: "number", default: "0" },
      { name: "onChange", type: "(value: number) => void" },
      { name: "count", type: "number", default: "5" },
      {
        name: "size",
        type: `"sm" | "default" | "lg"`,
        default: `"default"`,
      },
      { name: "readOnly", type: "boolean", default: "false" },
    ],
  },

  // ---------- Tilt (3D) ----------
  {
    name: "tilt",
    title: "Tilt",
    description:
      "Pure-CSS 3D tilt that follows the cursor, with an optional glare highlight. Wraps any element to give it depth and presence.",
    imports: `import { Tilt } from "@/components/ui/tilt";`,
    defaultExample: {
      title: "Brand card",
      description:
        "Move the cursor over the card. The element rotates on its X and Y axes, the glare tracks the pointer, and a soft scale bump sells the lift.",
      code: `<Tilt className="rounded-2xl" intensity={14} glare>
  <div className="h-[260px] w-[420px] rounded-2xl bg-gradient-to-br from-foreground via-foreground/85 to-foreground/70 p-6 text-background shadow-[0_20px_60px_-20px_rgba(0,0,0,0.4)]">
    {/* card content */}
  </div>
</Tilt>`,
      render: <TiltDemo />,
    },
    props: [
      {
        name: "intensity",
        type: "number",
        default: "12",
        description: "Maximum tilt angle in degrees.",
      },
      {
        name: "perspective",
        type: "number",
        default: "1000",
        description: "Perspective distance in px. Smaller = more dramatic.",
      },
      {
        name: "glare",
        type: "boolean",
        default: "true",
        description: "Render a soft white glare that follows the cursor.",
      },
      {
        name: "scale",
        type: "number",
        default: "1.02",
        description: "Hover scale factor. Set to 1 to disable.",
      },
    ],
    related: ["flip-card", "card-stack"],
  },

  // ---------- FlipCard (3D) ----------
  {
    name: "flip-card",
    title: "Flip Card",
    description:
      "A two-sided 3D card that flips on hover or click. Useful for pricing toggles, feature reveals, or trading-card layouts.",
    imports: `import {
  FlipCard,
  FlipCardFront,
  FlipCardBack,
} from "@/components/ui/flip-card";`,
    defaultExample: {
      title: "Pricing card",
      description:
        "Hover the card to flip and reveal the included features. The back face uses an inverted color treatment to make the transition feel intentional.",
      code: `<FlipCard className="h-[280px] w-[260px]">
  <FlipCardFront className="rounded-2xl border bg-card p-6">
    {/* front content — price, summary */}
  </FlipCardFront>
  <FlipCardBack className="rounded-2xl bg-foreground p-6 text-background">
    {/* back content — feature list, CTA */}
  </FlipCardBack>
</FlipCard>`,
      render: <FlipCardDemo />,
    },
    props: [
      {
        name: "trigger",
        type: `"hover" | "click"`,
        default: `"hover"`,
        description: "How the flip is triggered.",
      },
      {
        name: "axis",
        type: `"x" | "y"`,
        default: `"y"`,
        description: "Rotate around the vertical (y) or horizontal (x) axis.",
      },
      {
        name: "duration",
        type: "number",
        default: "700",
        description: "Flip duration in milliseconds.",
      },
      { name: "flipped", type: "boolean", description: "Controlled state." },
      {
        name: "defaultFlipped",
        type: "boolean",
        default: "false",
        description: "Initial state when uncontrolled.",
      },
      { name: "onFlippedChange", type: "(flipped: boolean) => void" },
    ],
    related: ["tilt", "card-stack"],
  },

  // ---------- Cube (3D) ----------
  {
    name: "cube",
    title: "Cube",
    description:
      "Pure-CSS 3D cube with six independent faces. Drive the visible face from state to build testimonial carousels, feature reels, or interactive product showcases.",
    imports: `import { Cube, CubeFace } from "@/components/ui/cube";`,
    defaultExample: {
      title: "Testimonial cube",
      description:
        "Each side hosts a full panel. Switch the `face` prop and the cube rotates smoothly to bring that side forward.",
      code: `const [face, setFace] = React.useState<"front" | "right" | "back" | "left">("front");

<Cube face={face} size={260}>
  <CubeFace face="front" className="...">{/* … */}</CubeFace>
  <CubeFace face="right" className="...">{/* … */}</CubeFace>
  <CubeFace face="back" className="...">{/* … */}</CubeFace>
  <CubeFace face="left" className="...">{/* … */}</CubeFace>
</Cube>`,
      render: <CubeDemo />,
    },
    props: [
      {
        name: "face",
        type: `"front" | "back" | "right" | "left" | "top" | "bottom"`,
        default: `"front"`,
        description: "Which face is currently shown to the viewer.",
      },
      {
        name: "size",
        type: "number",
        default: "240",
        description: "Edge length of the cube in pixels.",
      },
      {
        name: "perspective",
        type: "number",
        default: "1200",
        description: "Perspective distance. Smaller = more dramatic.",
      },
      {
        name: "duration",
        type: "number",
        default: "800",
        description: "Rotation duration in ms.",
      },
    ],
    related: ["card-stack", "flip-card"],
  },

  // ---------- CardStack (3D) ----------
  {
    name: "card-stack",
    title: "Card Stack",
    description:
      "Auto-cycling deck of layered cards with depth and parallax. Pauses on hover; click the front card to advance manually.",
    imports: `import { CardStack } from "@/components/ui/card-stack";`,
    defaultExample: {
      title: "Cycling testimonials",
      description:
        "Each card translates back and scales down as it falls behind, then re-emerges when its turn comes around again.",
      code: `const items = [
  { id: 1, content: <Testimonial author="Sasha" quote="…" /> },
  { id: 2, content: <Testimonial author="Diego" quote="…" /> },
  { id: 3, content: <Testimonial author="Mira"  quote="…" /> },
];

<CardStack className="h-[260px] w-[360px]" items={items} />`,
      render: <CardStackDemo />,
    },
    props: [
      {
        name: "items",
        type: "{ id: string | number; content: ReactNode }[]",
        required: true,
      },
      {
        name: "interval",
        type: "number",
        default: "4000",
        description: "Auto-cycle interval in ms. Set to 0 to disable.",
      },
      {
        name: "visibleDepth",
        type: "number",
        default: "3",
        description: "How many cards behind the front card to render.",
      },
      {
        name: "offsetY",
        type: "number",
        default: "10",
        description: "Vertical offset between layered cards in px.",
      },
      {
        name: "scaleStep",
        type: "number",
        default: "0.04",
        description: "Scale decrement per card behind the front.",
      },
      {
        name: "pauseOnHover",
        type: "boolean",
        default: "true",
      },
    ],
    related: ["cube", "tilt"],
  },

  // ---------- HoloCard (3D) ----------
  {
    name: "holo-card",
    title: "Holo Card",
    description:
      "Holographic 3D card with iridescent conic shimmer and a cursor-tracked highlight. Pure CSS — perfect for collectibles, premium tiers, or NFT-style showcases.",
    imports: `import { HoloCard } from "@/components/ui/holo-card";`,
    defaultExample: {
      title: "Founders edition",
      description:
        "Move the cursor over the card. The rainbow conic gradient rotates with cursor angle while a soft white highlight tracks the pointer.",
      code: `<HoloCard className="rounded-2xl" intensity={16}>
  <div className="h-[300px] w-[220px] rounded-2xl bg-gradient-to-br from-indigo-950 via-purple-900 to-fuchsia-900 p-5 text-white">
    {/* card content */}
  </div>
</HoloCard>`,
      render: <HoloCardDemo />,
    },
    props: [
      {
        name: "intensity",
        type: "number",
        default: "12",
        description: "Maximum tilt angle in degrees.",
      },
      {
        name: "perspective",
        type: "number",
        default: "900",
        description: "Perspective distance in px.",
      },
      {
        name: "shimmer",
        type: "number",
        default: "0.55",
        description: "Strength of the iridescent rainbow (0–1).",
      },
      {
        name: "glare",
        type: "number",
        default: "0.7",
        description: "Strength of the cursor highlight (0–1).",
      },
    ],
    related: ["tilt", "flip-card"],
  },

  // ---------- Coverflow (3D) ----------
  {
    name: "coverflow",
    title: "Coverflow",
    description:
      "iTunes-style 3D linear carousel. The center item faces the viewer; sides angle into the distance. Click any side card to bring it forward, or use the arrow keys.",
    imports: `import { Coverflow } from "@/components/ui/coverflow";`,
    defaultExample: {
      title: "Album covers",
      description:
        "Each card is positioned in 3D space relative to the active index, with rotation and translateZ creating the focal effect.",
      code: `const items = [
  { id: 1, content: <Cover title="Midnight Drive"  /> },
  { id: 2, content: <Cover title="Deep Focus"      /> },
  { id: 3, content: <Cover title="Late Night"      /> },
];

<Coverflow items={items} defaultIndex={1} />`,
      render: <CoverflowDemo />,
    },
    props: [
      {
        name: "items",
        type: "{ id: string | number; content: ReactNode }[]",
        required: true,
      },
      { name: "index", type: "number", description: "Controlled active index." },
      {
        name: "defaultIndex",
        type: "number",
        default: "0",
        description: "Initial active index when uncontrolled.",
      },
      { name: "onIndexChange", type: "(index: number) => void" },
      {
        name: "itemWidth",
        type: "number",
        default: "220",
        description: "Width of each card in px.",
      },
      {
        name: "itemHeight",
        type: "number",
        default: "280",
        description: "Height of each card in px.",
      },
      {
        name: "rotation",
        type: "number",
        default: "45",
        description: "Rotation angle for off-center items, in degrees.",
      },
      {
        name: "spacing",
        type: "number",
        default: "0.6",
        description: "Horizontal spacing as a fraction of itemWidth.",
      },
    ],
    related: ["carousel-3d", "card-stack"],
  },

  // ---------- Carousel3D (3D) ----------
  {
    name: "carousel-3d",
    title: "Carousel 3D",
    description:
      "Items arranged on a virtual cylinder that rotates around the Y axis. Click any face to bring it forward, drive the active index from state, or set autoplay for a hands-off showcase.",
    imports: `import { Carousel3D } from "@/components/ui/carousel-3d";`,
    defaultExample: {
      title: "Testimonial ring",
      description:
        "Six cards live on the surface of a ring. Set `autoplay` to advance automatically, or use the arrow keys when the carousel is focused.",
      code: `<Carousel3D
  items={items}
  radius={300}
  itemWidth={200}
  itemHeight={240}
  autoplay={3500}
/>`,
      render: <Carousel3DDemo />,
    },
    props: [
      {
        name: "items",
        type: "{ id: string | number; content: ReactNode }[]",
        required: true,
      },
      { name: "index", type: "number", description: "Controlled active index." },
      { name: "defaultIndex", type: "number", default: "0" },
      { name: "onIndexChange", type: "(index: number) => void" },
      {
        name: "radius",
        type: "number",
        default: "280",
        description: "Ring radius in px.",
      },
      {
        name: "itemWidth",
        type: "number",
        default: "200",
      },
      {
        name: "itemHeight",
        type: "number",
        default: "260",
      },
      {
        name: "autoplay",
        type: "number",
        default: "0",
        description: "Auto-advance interval in ms. Set to 0 to disable.",
      },
      {
        name: "hideBackside",
        type: "boolean",
        default: "true",
        description: "Hide items on the far side of the ring.",
      },
    ],
    related: ["coverflow", "cube"],
  },

  // ---------- Parallax (3D) ----------
  {
    name: "parallax",
    title: "Parallax",
    description:
      "Compound mouse-tracked parallax. Wrap a scene in `<Parallax>` and stack `<ParallaxLayer>` components with different `depth` values to create dimensional hover scenes.",
    imports: `import { Parallax, ParallaxLayer } from "@/components/ui/parallax";`,
    defaultExample: {
      title: "Layered hero",
      description:
        "Each layer translates a different amount based on the cursor offset. Lower-depth layers move less (deep background); higher-depth layers move more (foreground).",
      code: `<Parallax className="h-[300px] w-[480px] rounded-2xl bg-indigo-950">
  <ParallaxLayer depth={6}>{/* stars */}</ParallaxLayer>
  <ParallaxLayer depth={20}>{/* clouds */}</ParallaxLayer>
  <ParallaxLayer depth={36}>{/* mountains */}</ParallaxLayer>
  <ParallaxLayer depth={56}>{/* title */}</ParallaxLayer>
</Parallax>`,
      render: <ParallaxDemo />,
    },
    props: [
      {
        name: "perspective",
        type: "number",
        default: "1000",
        description: "Perspective distance in px (Parallax).",
      },
      {
        name: "depth",
        type: "number",
        default: "20",
        description:
          "Distance in px the layer moves at extreme cursor positions (ParallaxLayer).",
      },
      {
        name: "z",
        type: "number",
        default: "0",
        description: "Z-axis translation for layered depth (ParallaxLayer).",
      },
      {
        name: "invert",
        type: "boolean",
        default: "false",
        description:
          "Move the layer opposite to the cursor (ParallaxLayer).",
      },
    ],
    related: ["tilt", "holo-card"],
  },

  // ---------- Pin3D (3D) ----------
  {
    name: "pin-3d",
    title: "Pin 3D",
    description:
      "Perspective pin reveal. The card tilts back on hover while a label badge pops above, connected by a vertical thread and pulsing halo.",
    imports: `import { Pin3D } from "@/components/ui/pin-3d";`,
    defaultExample: {
      title: "Project card",
      description:
        "Hover the card. The label rises with a ping ring and a hairline connecting it to the card — the card itself tilts back on its X axis to sell the depth.",
      code: `<Pin3D label="View on GitHub" pinOffset={72}>
  <div className="h-[280px] w-[260px] rounded-2xl bg-slate-900 p-6 text-white">
    {/* card content */}
  </div>
</Pin3D>`,
      render: <Pin3DDemo />,
    },
    props: [
      {
        name: "label",
        type: "ReactNode",
        required: true,
        description: "Label content for the pin badge.",
      },
      {
        name: "href",
        type: "string",
        description: "Wraps the entire pin in an anchor tag.",
      },
      {
        name: "pinOffset",
        type: "number",
        default: "56",
        description: "Distance the pin label lifts above the top of the card, in px.",
      },
      {
        name: "landingDepth",
        type: "number",
        default: "100",
        description:
          "How far the line continues into the card from its top edge, in px. The landing ripple sits at this depth.",
      },
      {
        name: "tilt",
        type: "number",
        default: "22",
        description: "Backward tilt of the card on hover, in degrees.",
      },
      {
        name: "lineColor",
        type: "string",
        default: `"rgb(34, 211, 238)"`,
        description: "Color of the connecting line and landing ripple.",
      },
    ],
    related: ["tilt", "holo-card"],
  },

  // ---------- Marquee3D (3D) ----------
  {
    name: "marquee-3d",
    title: "Marquee 3D",
    description:
      "Perspective-tilted marquee. Multiple rows scroll horizontally on a 3D plane in alternating directions for a parallax-y, ticker-tape feel.",
    imports: `import { Marquee3D } from "@/components/ui/marquee-3d";`,
    defaultExample: {
      title: "Brand grid",
      description:
        "Each row alternates direction; pause on hover. Tilt and Z-rotation give it that diagonal Aceternity-style stage look.",
      code: `<Marquee3D
  items={brandChips}
  rows={4}
  duration={28}
  tiltX={45}
  rotateZ={-12}
/>`,
      render: <Marquee3DDemo />,
    },
    props: [
      { name: "items", type: "ReactNode[]", required: true },
      {
        name: "rows",
        type: "number",
        default: "3",
      },
      {
        name: "duration",
        type: "number",
        default: "30",
        description: "Loop duration in seconds (lower = faster).",
      },
      {
        name: "tiltX",
        type: "number",
        default: "50",
        description: "X-axis tilt in degrees.",
      },
      {
        name: "rotateZ",
        type: "number",
        default: "-15",
        description: "Z-axis rotation in degrees.",
      },
      {
        name: "pauseOnHover",
        type: "boolean",
        default: "true",
      },
      {
        name: "gap",
        type: "number",
        default: "16",
        description: "Spacing between items in px.",
      },
    ],
    related: ["coverflow", "carousel-3d"],
  },

  // ---------- Spotlight (3D) ----------
  {
    name: "spotlight",
    title: "Spotlight",
    description:
      "Cursor-following spotlight. Wraps any section to add a soft, depth-conveying light source that tracks the pointer.",
    imports: `import { Spotlight } from "@/components/ui/spotlight";`,
    defaultExample: {
      title: "Hero panel",
      description:
        "Move your cursor over the panel — a radial spotlight follows the pointer. Tune size, color, and intensity to match the hero's tone.",
      code: `<Spotlight
  className="h-[280px] w-[480px] rounded-2xl bg-slate-950 text-white"
  size={420}
  intensity={0.22}
>
  {/* hero content */}
</Spotlight>`,
      render: <SpotlightDemo />,
    },
    props: [
      {
        name: "size",
        type: "number",
        default: "360",
        description: "Spotlight radius in px.",
      },
      {
        name: "color",
        type: "string",
        default: `"rgba(255,255,255,0.9)"`,
        description: "CSS color for the spotlight center.",
      },
      {
        name: "intensity",
        type: "number",
        default: "0.18",
        description: "Spotlight strength (0–1).",
      },
      {
        name: "ambient",
        type: "boolean",
        default: "false",
        description: "Show a static dim glow even when not hovered.",
      },
    ],
    related: ["tilt", "parallax"],
  },

  // ---------- Lens (3D) ----------
  {
    name: "lens",
    title: "Lens",
    description:
      "Circular magnifier that follows the cursor and zooms into the underlying content. Glass-dome shading gives it a tactile, 3D-feel surface.",
    imports: `import { Lens } from "@/components/ui/lens";`,
    defaultExample: {
      title: "Inspector",
      description:
        "Hover over the panel — the lens scales the children inside a circular clip so you can inspect detail. Set `alwaysVisible` for a permanent magnifier.",
      code: `<Lens size={150} zoom={2}>
  <img src="/artwork.jpg" alt="" />
</Lens>`,
      render: <LensDemo />,
    },
    props: [
      {
        name: "size",
        type: "number",
        default: "140",
        description: "Diameter of the lens in px.",
      },
      {
        name: "zoom",
        type: "number",
        default: "1.8",
        description: "Magnification factor.",
      },
      {
        name: "alwaysVisible",
        type: "boolean",
        default: "false",
        description: "Keep the lens visible even when not hovered.",
      },
    ],
    related: ["spotlight", "tilt"],
  },

  // ---------- DirectionAwareHover (3D) ----------
  {
    name: "direction-aware-hover",
    title: "Direction-aware Hover",
    description:
      "Overlay slides in from the cursor's entry direction. Computes the nearest edge of the card on `mouseenter` and animates the overlay accordingly — top/right/bottom/left.",
    imports: `import { DirectionAwareHover } from "@/components/ui/direction-aware-hover";`,
    defaultExample: {
      title: "Album tile",
      description:
        "Move into the card from any side — the overlay enters from that edge. Move out, and it leaves toward the exit edge.",
      code: `<DirectionAwareHover
  hoverContent={<NowPlayingPanel />}
>
  <AlbumArt />
</DirectionAwareHover>`,
      render: <DirectionAwareHoverDemo />,
    },
    props: [
      {
        name: "hoverContent",
        type: "ReactNode",
        required: true,
        description: "Content shown on hover.",
      },
      {
        name: "distance",
        type: "number",
        default: "24",
        description: "Translation distance in px when entering or leaving.",
      },
    ],
    related: ["tilt", "spotlight"],
  },

  // ---------- Meteors (3D) ----------
  {
    name: "meteors",
    title: "Meteors",
    description:
      "Animated meteor shower overlay. Drop into any container to make it feel kinetic — meteors stream diagonally with randomized speed and delay.",
    imports: `import { Meteors } from "@/components/ui/meteors";`,
    defaultExample: {
      title: "Hero panel",
      description:
        "The Meteors layer is absolutely positioned — wrap it inside any `relative` container and the streaks fill the available space.",
      code: `<div className="relative h-[300px] w-[480px] overflow-hidden rounded-2xl bg-slate-950">
  <Meteors count={24} speed={[3, 8]} />
  {/* hero copy */}
</div>`,
      render: <MeteorsDemo />,
    },
    props: [
      {
        name: "count",
        type: "number",
        default: "20",
        description: "Number of meteor streaks.",
      },
      {
        name: "speed",
        type: "[number, number]",
        default: "[4, 10]",
        description: "Min/max duration range in seconds.",
      },
      {
        name: "maxDelay",
        type: "number",
        default: "6",
        description: "Maximum random delay before each meteor starts.",
      },
    ],
    related: ["sparkles", "spotlight"],
  },

  // ---------- Aurora (3D) ----------
  {
    name: "aurora",
    title: "Aurora",
    description:
      "Animated aurora background. Multiple colored gradient blobs slowly drift and morph behind your content for a calming, premium feel.",
    imports: `import { Aurora } from "@/components/ui/aurora";`,
    defaultExample: {
      title: "Hero with motion",
      description:
        "Pass children to render content above the aurora. Customize `colors`, `duration`, and `blur` for any palette.",
      code: `<Aurora className="h-[300px] w-[480px] rounded-2xl bg-slate-950 text-white">
  <div className="p-8">
    {/* hero copy */}
  </div>
</Aurora>`,
      render: <AuroraDemo />,
    },
    props: [
      {
        name: "colors",
        type: "string[]",
        description: "Override the gradient blob colors.",
      },
      {
        name: "duration",
        type: "number",
        default: "18",
        description: "Loop duration for the slowest blob in seconds.",
      },
      {
        name: "blur",
        type: "number",
        default: "64",
        description: "Strength of the blur in px.",
      },
    ],
    related: ["spotlight", "sparkles"],
  },

  // ---------- MovingBorder (3D) ----------
  {
    name: "moving-border",
    title: "Moving Border",
    description:
      "Animated conic-gradient border that traces the perimeter. Wrap any content — card, button, badge — to add a premium edge that pulls the eye.",
    imports: `import { MovingBorder } from "@/components/ui/moving-border";`,
    defaultExample: {
      title: "Pricing card + CTA",
      description:
        "Works at any radius — including pills. The spinning ring sits behind the inner background, so only a hairline of the gradient is visible at any time.",
      code: `<MovingBorder duration={4} radius={20}>
  <div className="px-6 py-7">
    {/* card content */}
  </div>
</MovingBorder>`,
      render: <MovingBorderDemo />,
    },
    props: [
      {
        name: "borderWidth",
        type: "number",
        default: "1.5",
      },
      {
        name: "duration",
        type: "number",
        default: "4",
        description: "Spin duration in seconds.",
      },
      {
        name: "radius",
        type: "number",
        default: "16",
      },
      {
        name: "innerBg",
        type: "string",
        description:
          "Tailwind class for the inner content background. Default `bg-background`.",
      },
      {
        name: "colors",
        type: "string[]",
        description:
          "Conic-gradient color stops for the moving ring.",
      },
    ],
    related: ["aurora", "spotlight"],
  },

  // ---------- OrbitingCircles (3D) ----------
  {
    name: "orbiting-circles",
    title: "Orbiting Circles",
    description:
      "Items orbit around a center on a circular path with optional reverse direction. Each item counter-rotates so it stays upright. Stack instances for concentric rings — perfect for tech-stack hero panels.",
    imports: `import { OrbitingCircles } from "@/components/ui/orbiting-circles";`,
    defaultExample: {
      title: "Two-ring tech stack",
      description:
        "Pass `center` to nest another OrbitingCircles for concentric rings. Toggle `reverse` so adjacent rings rotate in opposite directions.",
      code: `<OrbitingCircles items={outerIcons} radius={150} duration={28}>
  <OrbitingCircles items={innerIcons} radius={80} duration={18} reverse>
    <Logo />
  </OrbitingCircles>
</OrbitingCircles>`,
      render: <OrbitingCirclesDemo />,
    },
    props: [
      {
        name: "items",
        type: "ReactNode[]",
        required: true,
      },
      {
        name: "center",
        type: "ReactNode",
        description: "Optional content rendered at the center of the orbit.",
      },
      {
        name: "radius",
        type: "number",
        default: "120",
      },
      {
        name: "duration",
        type: "number",
        default: "20",
        description: "Orbit duration in seconds.",
      },
      {
        name: "reverse",
        type: "boolean",
        default: "false",
      },
      {
        name: "showPath",
        type: "boolean",
        default: "true",
        description: "Show a faint dashed orbit path.",
      },
    ],
    related: ["carousel-3d", "cube"],
  },


  // ---------- Sparkles (3D) ----------
  {
    name: "sparkles",
    title: "Sparkles",
    description:
      "Twinkling particle overlay with two visual modes — `shape=\"star\"` for 4-pointed sparkles and `shape=\"dot\"` for a starfield-style background of dots with optional glow halo.",
    imports: `import { Sparkles } from "@/components/ui/sparkles";`,
    defaultExample: {
      title: "Decorated headline",
      description:
        "Sparkles is absolutely positioned — wrap it inside any `relative` container. Tune `count`, `size`, `speed`, and `color` to fit the surrounding scene.",
      code: `<div className="relative h-[260px] w-[480px] rounded-2xl bg-slate-950">
  <Sparkles count={36} size={[2, 4]} color="rgb(245, 208, 110)" />
  {/* hero copy */}
</div>`,
      render: <SparklesDemo />,
    },
    examples: [
      {
        title: "Starfield (shape=\"dot\")",
        description:
          "Pass `shape=\"dot\"` to render a dense field of round stars with subtle glow halos — replaces the old `GlowingStars` component.",
        code: `<Sparkles
  shape="dot"
  count={150}
  speed={[2, 5]}
  color="rgb(255,255,255)"
  glow
/>`,
        render: <SparklesStarfieldDemo />,
      },
    ],
    props: [
      {
        name: "shape",
        type: `"star" | "dot"`,
        default: `"star"`,
        description:
          "Visual shape of each particle. `\"star\"` renders 4-pointed sparkles; `\"dot\"` renders round stars with optional glow.",
      },
      {
        name: "count",
        type: "number",
        description: "Default 30 for stars, 120 for dots.",
      },
      {
        name: "size",
        type: "[number, number]",
        description: "Min/max size. Default `[2, 5]` for stars, `[1, 2.4]` for dots.",
      },
      {
        name: "speed",
        type: "[number, number]",
        default: "[1.5, 4]",
        description: "Min/max twinkle duration in seconds.",
      },
      { name: "color", type: "string", default: `"currentColor"` },
      {
        name: "glow",
        type: "boolean",
        default: "true",
        description: "For `shape=\"dot\"`: a fraction of dots emit a soft halo.",
      },
    ],
    related: ["meteors", "aurora"],
  },

  // ---------- InfiniteMovingCards (3D) ----------
  {
    name: "infinite-moving-cards",
    title: "Infinite Moving Cards",
    description:
      "Auto-scrolling row of cards that loops forever. Pause on hover, choose direction, fade the edges. Perfect for testimonials, logo walls, and 'Trusted by' sections.",
    imports: `import { InfiniteMovingCards } from "@/components/ui/infinite-moving-cards";`,
    defaultExample: {
      title: "Testimonials reel",
      description:
        "The list is duplicated internally for a seamless loop. The mask fades the edges so the cards visually slide off-screen.",
      code: `<InfiniteMovingCards
  items={cards}
  duration={28}
  gap={20}
/>`,
      render: <InfiniteMovingCardsDemo />,
    },
    props: [
      { name: "items", type: "ReactNode[]", required: true },
      {
        name: "direction",
        type: `"left" | "right"`,
        default: `"left"`,
      },
      {
        name: "duration",
        type: "number",
        default: "30",
        description: "Scroll duration in seconds.",
      },
      { name: "pauseOnHover", type: "boolean", default: "true" },
      { name: "gap", type: "number", default: "16" },
      {
        name: "fade",
        type: "boolean",
        default: "true",
        description: "Fade the left/right edges with a mask.",
      },
    ],
    related: ["marquee-3d", "coverflow"],
  },

  // ---------- HoverBorderGradient (3D) ----------
  {
    name: "hover-border-gradient",
    title: "Hover Border Gradient",
    description:
      "Border that lights up where the cursor hovers. A radial highlight follows the pointer along the edge, creating a flashlight-on-a-frame effect.",
    imports: `import { HoverBorderGradient } from "@/components/ui/hover-border-gradient";`,
    defaultExample: {
      title: "Pricing card",
      description:
        "Move the cursor over the card edges. The highlight tracks the pointer; when the cursor leaves, the border fades back to neutral.",
      code: `<HoverBorderGradient color="rgba(168, 85, 247, 0.9)" radius={20}>
  <div className="p-7">
    {/* card content */}
  </div>
</HoverBorderGradient>`,
      render: <HoverBorderGradientDemo />,
    },
    props: [
      { name: "borderWidth", type: "number", default: "1.5" },
      { name: "radius", type: "number", default: "16" },
      {
        name: "innerBg",
        type: "string",
        description: "Tailwind class for the inner background. Default `bg-background`.",
      },
      {
        name: "color",
        type: "string",
        description: "Color of the moving highlight.",
      },
    ],
    related: ["moving-border", "spotlight"],
  },

  // ---------- Lamp (3D) ----------
  {
    name: "lamp",
    title: "Lamp",
    description:
      "Spotlight from above. A bright bar at the top edge cones light down across the panel. Iconic Aceternity-style hero treatment for product launches.",
    imports: `import { Lamp } from "@/components/ui/lamp";`,
    defaultExample: {
      title: "Launch hero",
      description:
        "Place the Lamp wrapper around any dark hero. Tune `color`, `beamWidth`, and `beamHeight` to match your brand.",
      code: `<Lamp
  className="rounded-2xl bg-slate-950 text-white"
  color="rgba(56, 189, 248, 0.9)"
  beamWidth={460}
  beamHeight={220}
>
  {/* hero copy */}
</Lamp>`,
      render: <LampDemo />,
    },
    props: [
      {
        name: "color",
        type: "string",
        default: `"rgba(56, 189, 248, 0.8)"`,
      },
      { name: "beamWidth", type: "number", default: "480" },
      { name: "beamHeight", type: "number", default: "200" },
    ],
    related: ["spotlight", "aurora"],
  },

  // ---------- Magnet (3D) ----------
  {
    name: "magnet",
    title: "Magnet",
    description:
      "Element gravitates toward the cursor when nearby. Listens to window mousemove and translates within a configurable range; snaps back when out of range.",
    imports: `import { Magnet } from "@/components/ui/magnet";`,
    defaultExample: {
      title: "Magnetic CTAs",
      description:
        "Wrap any button (or anything else) in `<Magnet>` to give it that pulled-toward-cursor feel.",
      code: `<Magnet strength={20} range={120}>
  <Button>Get started</Button>
</Magnet>`,
      render: <MagnetDemo />,
    },
    props: [
      {
        name: "strength",
        type: "number",
        default: "24",
        description: "Maximum translation distance in px.",
      },
      {
        name: "range",
        type: "number",
        default: "100",
        description: "Distance from center in px where the pull starts.",
      },
      { name: "disabled", type: "boolean", default: "false" },
    ],
    related: ["tilt", "hover-border-gradient"],
  },

  // ---------- AnimatedText (3D) — combines shiny / gradient / typewriter / reveal ----------
  {
    name: "animated-text",
    title: "Animated Text",
    description:
      "One component, four text effects. Switch via the `variant` prop: `shiny` (gradient sweep), `gradient` (animated rainbow), `typewriter` (cycling phrases), `reveal` (char/word stagger on scroll).",
    imports: `import { AnimatedText } from "@/components/ui/animated-text";`,
    defaultExample: {
      title: "All four variants",
      description:
        "All effects share one API surface and one Tailwind keyframe set, so you can pick the feel without adding a new component each time.",
      code: `<AnimatedText variant="shiny">Ship beautifully.</AnimatedText>
<AnimatedText variant="gradient">spark joy</AnimatedText>
<AnimatedText variant="typewriter" phrases={["designers", "founders"]} />
<AnimatedText variant="reveal">Build interfaces that feel inevitable.</AnimatedText>`,
      render: <AnimatedTextDemo />,
    },
    props: [
      {
        name: "variant",
        type: `"shiny" | "gradient" | "typewriter" | "reveal"`,
        default: `"shiny"`,
      },
      {
        name: "children",
        type: "ReactNode",
        description: "Text content for `shiny`, `gradient`, and `reveal` variants.",
      },
      {
        name: "phrases",
        type: "string[]",
        description: "Phrases to cycle through (`typewriter`).",
      },
      {
        name: "duration",
        type: "number",
        description:
          "Seconds for `shiny`/`gradient`; ms-per-character for `reveal`.",
      },
      {
        name: "baseColor",
        type: "string",
        default: `"hsl(var(--foreground) / 0.5)"`,
        description: "Base text color (`shiny`).",
      },
      {
        name: "shineColor",
        type: "string",
        default: `"hsl(var(--foreground))"`,
        description: "Highlight color of the sweep (`shiny`).",
      },
      {
        name: "colors",
        type: "string[]",
        description: "Gradient color stops (`gradient`).",
      },
      {
        name: "static",
        type: "boolean",
        default: "false",
        description: "Lock the gradient in place (`gradient`).",
      },
      {
        name: "typeSpeed",
        type: "number",
        default: "70",
        description: "Typing speed in ms (`typewriter`).",
      },
      {
        name: "deleteSpeed",
        type: "number",
        default: "40",
        description: "Deletion speed in ms (`typewriter`).",
      },
      {
        name: "pause",
        type: "number",
        default: "1500",
        description: "Pause at end of each phrase (`typewriter`).",
      },
      { name: "loop", type: "boolean", default: "true" },
      { name: "cursor", type: "boolean", default: "true" },
      { name: "cursorChar", type: "string", default: `"|"` },
      {
        name: "stagger",
        type: "number",
        default: "30",
        description: "Per-character/word delay in ms (`reveal`).",
      },
      {
        name: "delay",
        type: "number",
        default: "0",
        description: "Delay before the reveal starts (`reveal`).",
      },
      {
        name: "whenInView",
        type: "boolean",
        default: "true",
        description: "Trigger reveal only when scrolled into view (`reveal`).",
      },
      {
        name: "byWord",
        type: "boolean",
        default: "false",
        description: "Reveal by word instead of character (`reveal`).",
      },
    ],
    related: ["sparkles", "number-ticker"],
  },

  // ---------- NumberTicker (3D) ----------
  {
    name: "number-ticker",
    title: "Number Ticker",
    description:
      "Animated number counter that rolls from `from` to `value` with a cubic ease. Defaults to triggering when scrolled into view; supports custom formatting.",
    imports: `import { NumberTicker } from "@/components/ui/number-ticker";`,
    defaultExample: {
      title: "Stat trio",
      description:
        "Each ticker uses an IntersectionObserver to start when scrolled into view. Pass `whenInView={false}` to start immediately on mount.",
      code: `<NumberTicker value={124000} duration={1800} />`,
      render: <NumberTickerDemo />,
    },
    props: [
      {
        name: "value",
        type: "number",
        required: true,
        description: "Final value the counter animates to.",
      },
      { name: "from", type: "number", default: "0" },
      {
        name: "duration",
        type: "number",
        default: "1500",
        description: "Animation duration in ms.",
      },
      { name: "decimals", type: "number", default: "0" },
      {
        name: "format",
        type: "(value: number) => string",
        description: "Custom number formatter.",
      },
      { name: "whenInView", type: "boolean", default: "true" },
    ],
    related: ["animated-text"],
  },

  // ---------- NeonGlow (3D) ----------
  {
    name: "neon-glow",
    title: "Neon Glow",
    description:
      "Neon-sign style wrapper. Layers concentric box-shadows in a chosen color to make any element look like it's emitting light. Pops on dark backgrounds.",
    imports: `import { NeonGlow } from "@/components/ui/neon-glow";`,
    defaultExample: {
      title: "Neon trio",
      description:
        "Wrap any block element. The glow uses outer + inset box-shadow combined with a thin colored border. Works at any radius — including pills.",
      code: `<NeonGlow color="rgb(34, 211, 238)" intensity={0.7}>
  <div className="px-5 py-3">CYAN</div>
</NeonGlow>`,
      render: <NeonGlowDemo />,
    },
    props: [
      {
        name: "color",
        type: "string",
        default: `"rgb(34, 211, 238)"`,
        description:
          "Glow color. Accepts `rgb(...)` for alpha derivation, or any CSS color.",
      },
      {
        name: "intensity",
        type: "number",
        default: "0.7",
        description: "Glow intensity (0–1).",
      },
      { name: "radius", type: "number", default: "16" },
    ],
    related: ["moving-border", "hover-border-gradient"],
  },

  // ---------- BackgroundBeams (3D) ----------
  {
    name: "background-beams",
    title: "Background Beams",
    description:
      "Animated diagonal beams streaking across a hero panel. SVG + CSS — no canvas, no battery drain.",
    imports: `import { BackgroundBeams } from "@/components/ui/background-beams";`,
    defaultExample: {
      title: "Hero backdrop",
      description:
        "Drop into any `relative` container — beams render absolutely. Tune `count`, `speed`, and `color` to match the surrounding scene.",
      code: `<div className="relative h-[300px] w-[480px] rounded-2xl bg-slate-950">
  <BackgroundBeams count={14} color="rgba(99,102,241,0.55)" />
  {/* hero copy */}
</div>`,
      render: <BackgroundBeamsDemo />,
    },
    props: [
      { name: "count", type: "number", default: "12" },
      {
        name: "speed",
        type: "[number, number]",
        default: "[6, 14]",
        description: "Min/max travel duration in seconds.",
      },
      {
        name: "color",
        type: "string",
        default: `"rgba(99,102,241,0.5)"`,
      },
    ],
    related: ["meteors", "aurora"],
  },

  // ---------- BackgroundBoxes (3D) ----------
  {
    name: "background-boxes",
    title: "Background Boxes",
    description:
      "Skewed grid of cells that highlight as the cursor passes over them. Iconic Aceternity-style hero backdrop.",
    imports: `import { BackgroundBoxes } from "@/components/ui/background-boxes";`,
    defaultExample: {
      title: "Hover any cell",
      description:
        "The grid is positioned absolutely and skewed for that cinematic perspective. The hover color is fully customizable.",
      code: `<div className="relative h-[320px] w-[520px] rounded-2xl bg-slate-950">
  <BackgroundBoxes
    rows={9}
    cols={18}
    cellSize={36}
    hoverColor="rgba(168, 85, 247, 0.85)"
  />
  {/* hero copy */}
</div>`,
      render: <BackgroundBoxesDemo />,
    },
    props: [
      { name: "rows", type: "number", default: "12" },
      { name: "cols", type: "number", default: "24" },
      { name: "cellSize", type: "number", default: "36" },
      {
        name: "hoverColor",
        type: "string",
        default: `"rgba(168, 85, 247, 0.85)"`,
      },
    ],
    related: ["background-beams", "wavy-background"],
  },

  // ---------- WavyBackground (3D) ----------
  {
    name: "wavy-background",
    title: "Wavy Background",
    description:
      "Animated wavy SVG lines that drift behind your content. Multiple colored waves with blur — perfect for atmospheric heroes.",
    imports: `import { WavyBackground } from "@/components/ui/wavy-background";`,
    defaultExample: {
      title: "Atmospheric hero",
      description:
        "Wrap your hero copy directly inside `<WavyBackground>`. Customize `colors`, `duration`, `strokeWidth`, and `blur`.",
      code: `<WavyBackground className="rounded-2xl bg-slate-950 text-white">
  <div className="p-8">
    {/* hero copy */}
  </div>
</WavyBackground>`,
      render: <WavyBackgroundDemo />,
    },
    props: [
      {
        name: "colors",
        type: "string[]",
        description: "Wave colors (one path per color).",
      },
      {
        name: "duration",
        type: "number",
        default: "14",
        description: "Animation duration in seconds.",
      },
      { name: "strokeWidth", type: "number", default: "3" },
      { name: "blur", type: "number", default: "8" },
    ],
    related: ["aurora", "background-beams"],
  },

  // ---------- FollowingPointer (3D) ----------
  {
    name: "following-pointer",
    title: "Following Pointer",
    description:
      "Custom cursor that follows the pointer inside a wrapped area. Hide the system cursor and replace it with a branded indicator (or any React node).",
    imports: `import { FollowingPointer } from "@/components/ui/following-pointer";`,
    defaultExample: {
      title: "Live preview surface",
      description:
        "Wrap any area to take over the cursor inside it. Pass `indicator` to render a custom follower, or accept the default arrow + label.",
      code: `<FollowingPointer className="rounded-2xl border bg-card">
  <div className="p-8">
    {/* content */}
  </div>
</FollowingPointer>`,
      render: <FollowingPointerDemo />,
    },
    props: [
      {
        name: "indicator",
        type: "ReactNode",
        description: "Custom indicator. Default: arrow + label.",
      },
      {
        name: "hideCursor",
        type: "boolean",
        default: "true",
        description: "Hide the system cursor inside the wrapped area.",
      },
    ],
    related: ["magnet", "spotlight"],
  },

  // ---------- Compare (3D) ----------
  {
    name: "compare",
    title: "Compare",
    description:
      "Drag-to-compare slider that reveals two layers. Perfect for before/after code states, theme previews, or design comparisons.",
    imports: `import { Compare } from "@/components/ui/compare";`,
    defaultExample: {
      title: "Stub vs. implementation",
      description:
        "Pass any React content as `before` and `after`. Here we compare two code states — drag the handle to wipe between the stub (with `// Implement this`) and the finished implementation.",
      code: `<Compare
  before={<CodePanel variant="before" />}
  after={<CodePanel variant="after" />}
/>`,
      render: <CompareDemo />,
    },
    props: [
      { name: "before", type: "ReactNode", required: true },
      { name: "after", type: "ReactNode", required: true },
      {
        name: "defaultPosition",
        type: "number",
        default: "50",
        description: "Initial divider position (0–100).",
      },
      {
        name: "position",
        type: "number",
        description: "Controlled divider position (0–100).",
      },
      { name: "onPositionChange", type: "(position: number) => void" },
      {
        name: "followHover",
        type: "boolean",
        default: "false",
        description: "Move the divider while hovering (no drag needed).",
      },
    ],
    related: ["lens", "tilt"],
  },

  // ---------- CardHoverEffect (3D) ----------
  {
    name: "card-hover-effect",
    title: "Card Hover Effect",
    description:
      "Grid of feature cards with a sliding background pill behind the hovered card. Smooth, distraction-free way to give a card grid life.",
    imports: `import { CardHoverEffect } from "@/components/ui/card-hover-effect";`,
    defaultExample: {
      title: "Feature grid",
      description:
        "Pass an array of items with `title`, `description`, `icon`, and optional `href`. The hover pill slides between cards as the cursor moves.",
      code: `<CardHoverEffect
  items={features}
  columns={3}
/>`,
      render: <CardHoverEffectDemo />,
    },
    props: [
      {
        name: "items",
        type: "{ id, title, description?, icon?, href? }[]",
        required: true,
      },
      { name: "columns", type: "number", default: "3" },
    ],
    related: ["tilt", "hover-border-gradient"],
  },

  // ---------- SparklesText (3D) ----------
  {
    name: "sparkles-text",
    title: "Sparkles Text",
    description:
      "Hero text with a glowing horizontal beam below it and twinkling sparkle particles streaming downward — Aceternity-style 'Sparkles' headline. Pure CSS, no canvas.",
    imports: `import { SparklesText } from "@/components/ui/sparkles-text";`,
    defaultExample: {
      title: "Headline with light + sparkles",
      description:
        "Wrap any inline text. The component renders the children, a horizontal gradient beam with glow, a soft halo, and a field of twinkling particles below.",
      code: `<SparklesText beamColor="rgb(56, 189, 248)" particleCount={120}>
  <h1 className="text-7xl font-bold text-white">CraftUI</h1>
</SparklesText>`,
      render: <SparklesTextDemo />,
    },
    props: [
      {
        name: "children",
        type: "ReactNode",
        required: true,
        description: "Text content (or any inline node).",
      },
      {
        name: "beamColor",
        type: "string",
        default: `"rgb(56, 189, 248)"`,
        description: "Color of the horizontal beam and halo.",
      },
      {
        name: "particleCount",
        type: "number",
        default: "180",
        description: "Number of particles streaming below the beam.",
      },
      {
        name: "spread",
        type: "number",
        default: "80",
        description: "Spread of particles to either side of the beam, in % width.",
      },
      {
        name: "beamGap",
        type: "number",
        default: "8",
        description:
          "Vertical gap (in px) between the bottom of the text and the beam.",
      },
    ],
    related: ["sparkles", "animated-text"],
  },

  // ---------- MultiStepLoader (3D / feedback) ----------
  {
    name: "multi-step-loader",
    title: "Multi Step Loader",
    description:
      "Fullscreen overlay that auto-advances through a list of steps. Completed steps stack above the active step; upcoming steps queue below. Optional close button.",
    imports: `import { MultiStepLoader } from "@/components/ui/multi-step-loader";`,
    defaultExample: {
      title: "Click to load",
      description:
        "Pass `loading={true}` to show the overlay. The component cycles through `steps` every `duration` ms. Set `loop` to keep advancing forever, or use `onComplete` to handle the end.",
      code: `const [loading, setLoading] = useState(false);

<Button onClick={() => setLoading(true)}>Click to load</Button>
<MultiStepLoader
  loading={loading}
  steps={[
    { text: "Buying a condo" },
    { text: "Travelling in a flight" },
    { text: "Meeting Tyler Durden" },
    // …
  ]}
  duration={1800}
  loop
  onClose={() => setLoading(false)}
/>`,
      render: <MultiStepLoaderDemo />,
    },
    props: [
      {
        name: "loading",
        type: "boolean",
        required: true,
        description: "Whether the loader is visible.",
      },
      {
        name: "steps",
        type: "{ text: ReactNode }[]",
        required: true,
      },
      {
        name: "duration",
        type: "number",
        default: "2000",
        description: "Time spent on each step in ms.",
      },
      {
        name: "loop",
        type: "boolean",
        default: "false",
        description: "Loop forever once the last step is reached.",
      },
      {
        name: "onComplete",
        type: "() => void",
        description: "Called when the last step finishes (when `loop=false`).",
      },
      {
        name: "closable",
        type: "boolean",
        default: "true",
        description: "Show a close button in the corner.",
      },
      {
        name: "onClose",
        type: "() => void",
      },
    ],
    related: ["stepper", "spinner"],
  },

  // ---------- WorldMap (3D) ----------
  {
    name: "world-map",
    title: "World Map",
    description:
      "Dotted world map with animated cyan arcs that draw, hold, and erase between lat/lng coordinates — perfect for 'remote connectivity' or 'global reach' hero sections.",
    imports: `import { WorldMap } from "@/components/ui/world-map";`,
    defaultExample: {
      title: "Routes between continents",
      description:
        "Pass an array of `connections`, each with a `start` and `end` lat/lng. Each arc cycles: draws from start → end, holds, then erases off the end. Routes are staggered so they fire one at a time.",
      code: `<WorldMap
  connections={[
    { start: { lat: 40.71, lng: -74.00 }, end: { lat: 51.50, lng: -0.12 } },
    { start: { lat: 51.50, lng: -0.12 }, end: { lat: 35.68, lng: 139.65 } },
    // …
  ]}
  duration={4}
  stagger={0.55}
/>`,
      render: <WorldMapDemo />,
    },
    props: [
      {
        name: "connections",
        type: "{ start: { lat: number; lng: number }; end: { lat: number; lng: number } }[]",
        description: "Routes to animate.",
      },
      {
        name: "lineColor",
        type: "string",
        default: `"rgb(56, 189, 248)"`,
        description: "Color of the arcs and endpoint dots.",
      },
      {
        name: "dotColor",
        type: "string",
        default: `"rgba(255, 255, 255, 0.18)"`,
        description: "Color of the underlying dotted continents.",
      },
      {
        name: "duration",
        type: "number",
        default: "4",
        description: "Single arc cycle duration in seconds.",
      },
      {
        name: "stagger",
        type: "number",
        default: "0.6",
        description: "Stagger between arcs in seconds.",
      },
    ],
    related: ["globe", "background-beams"],
  },

  // ---------- Globe (3D) ----------
  {
    name: "globe",
    title: "Globe",
    description:
      "Drag-to-rotate 3D dotted globe with continent-shaped dots and animated arcs between cities. Auto-rotates when idle; click + drag to spin in any direction. Pure CSS 3D — no Three.js dependency.",
    imports: `import { Globe } from "@/components/ui/globe";`,
    defaultExample: {
      title: "Interactive earth with arcs",
      description:
        "Surface dots are filtered by a continent polygon mask, so they cluster on land instead of evenly across the sphere. `connections` are sampled along great-circle paths and rendered as a wave of small dots that animate sequentially — like signal traveling between cities.",
      code: `<Globe
  size={420}
  dotCount={3500}
  markers={[
    { lat: 40.71, lng: -74.00, label: "NYC" },
    { lat: 51.50, lng: -0.12, label: "London" },
    { lat: 35.68, lng: 139.65, label: "Tokyo" },
  ]}
  connections={[
    { start: { lat: 40.71, lng: -74 }, end: { lat: 51.5, lng: -0.12 } },
    { start: { lat: 51.5, lng: -0.12 }, end: { lat: 35.68, lng: 139.65 } },
  ]}
  autoRotate
  autoRotateSpeed={6}
/>`,
      render: <GlobeDemo />,
    },
    props: [
      {
        name: "size",
        type: "number",
        default: "420",
        description: "Globe diameter in px.",
      },
      {
        name: "dotCount",
        type: "number",
        default: "3500",
        description:
          "Candidate Fibonacci samples before filtering by the land mask. Higher = denser continents.",
      },
      {
        name: "dotColor",
        type: "string",
        default: `"rgba(125, 211, 252, 0.7)"`,
      },
      {
        name: "atmosphereColor",
        type: "string",
        default: `"rgba(56, 189, 248, 0.55)"`,
        description: "Atmosphere/halo color.",
      },
      {
        name: "autoRotate",
        type: "boolean",
        default: "true",
      },
      {
        name: "autoRotateSpeed",
        type: "number",
        default: "8",
        description: "Auto-rotate speed in deg/s.",
      },
      {
        name: "markers",
        type: "{ lat: number; lng: number; color?: string; size?: number; label?: ReactNode }[]",
        description: "City markers to highlight on the surface.",
      },
      {
        name: "connections",
        type: "{ start: { lat, lng }; end: { lat, lng } }[]",
        description: "Animated arcs drawn between two lat/lng points.",
      },
      {
        name: "arcColor",
        type: "string",
        default: `"rgb(125, 211, 252)"`,
      },
      {
        name: "arcDuration",
        type: "number",
        default: "4",
        description: "Single arc cycle duration in seconds.",
      },
      {
        name: "arcStagger",
        type: "number",
        default: "0.7",
        description: "Stagger between arcs in seconds.",
      },
      {
        name: "arcSegments",
        type: "number",
        default: "32",
        description: "Number of dot segments per arc.",
      },
    ],
    related: ["world-map", "cube"],
  },

  // ---------- TracingBeam ----------
  {
    name: "tracing-beam",
    title: "Tracing Beam",
    description:
      "Scroll-driven vertical progress line with a glowing dot that travels down as the user reads through the wrapped content.",
    imports: `import { TracingBeam } from "@/components/ui/tracing-beam";`,
    defaultExample: {
      title: "Article rail",
      description:
        "Wrap any block of long-form content. The component listens to window scroll, computes how much of itself is in view via `getBoundingClientRect`, and maps that to 0–1 progress. The portion of the line above the dot brightens; below stays dim.",
      code: `<TracingBeam color="rgb(56, 189, 248)">
  {/* article content */}
</TracingBeam>`,
      render: <TracingBeamDemo />,
    },
    props: [
      {
        name: "color",
        type: "string",
        default: `"rgb(56, 189, 248)"`,
        description: "Color of the progress line + glowing dot.",
      },
      {
        name: "thickness",
        type: "number",
        default: "1.5",
        description: "Line thickness in px.",
      },
      {
        name: "contentPadding",
        type: "number",
        default: "32",
        description:
          "Inner padding-left applied so content doesn't sit on top of the beam.",
      },
    ],
    related: ["timeline", "stepper"],
  },

  // ---------- AnimatedTooltip ----------
  {
    name: "animated-tooltip",
    title: "Animated Tooltip",
    description:
      "Overlapping avatar group where hovering an avatar lifts and tilts it while a tooltip with name + role rises above. Useful for team rosters and 'people on this project'.",
    imports: `import { AnimatedTooltip } from "@/components/ui/animated-tooltip";`,
    defaultExample: {
      title: "Team avatars",
      description:
        "Pass an array of items with `id`, `name`, and an optional `designation` and `image`. Hover any avatar — it lifts, tilts, and reveals a tooltip card.",
      code: `<AnimatedTooltip
  items={[
    { id: 1, name: "Sasha Lee", designation: "Eng Lead" },
    { id: 2, name: "Diego Alvarez", designation: "Founder" },
    // …
  ]}
  size={56}
/>`,
      render: <AnimatedTooltipDemo />,
    },
    props: [
      {
        name: "items",
        type: "{ id: string | number; name: string; designation?: string; image?: string }[]",
        required: true,
      },
      {
        name: "size",
        type: "number",
        default: "48",
        description: "Avatar diameter in px.",
      },
    ],
    related: ["avatar", "hover-card"],
  },

  // ---------- BentoGrid ----------
  {
    name: "bento-grid",
    title: "Bento Grid",
    description:
      "Multi-size feature grid layout (compound: BentoGrid + BentoGridItem). Items can span multiple columns or rows for the Apple/Vercel-style 'bento' presentation.",
    imports: `import { BentoGrid, BentoGridItem } from "@/components/ui/bento-grid";`,
    defaultExample: {
      title: "Feature grid",
      description:
        "Use `span` on each item (e.g. `\"2x2\"`, `\"2x1\"`) to let cells spread across the grid. Pass `icon`, `title`, `description`, and an optional `background` node for decoration.",
      code: `<BentoGrid columns={3} rowHeight="11rem">
  <BentoGridItem
    span="2x2"
    icon={<Zap />}
    title="Composable"
    description="Every component is a single file you own."
  />
  <BentoGridItem
    icon={<Star />}
    title="Themeable"
    description="HSL CSS variables."
  />
  {/* … */}
</BentoGrid>`,
      render: <BentoGridDemo />,
    },
    props: [
      {
        name: "columns",
        type: "number",
        default: "3",
        description: "BentoGrid: number of columns.",
      },
      {
        name: "rowHeight",
        type: "string",
        default: `"18rem"`,
        description: "BentoGrid: row height in CSS units.",
      },
      {
        name: "span",
        type: `"1x1" | "1x2" | "2x1" | "2x2" | "3x1" | "1x3"`,
        default: `"1x1"`,
        description: "BentoGridItem: cell span as <cols>x<rows>.",
      },
      { name: "title", type: "ReactNode" },
      { name: "description", type: "ReactNode" },
      { name: "icon", type: "ReactNode" },
      {
        name: "background",
        type: "ReactNode",
        description: "Optional decorative background.",
      },
    ],
    related: ["card-hover-effect", "card"],
  },

  // ---------- FloatingDock ----------
  {
    name: "floating-dock",
    title: "Floating Dock",
    description:
      "macOS-style dock with magnify-on-hover. Tiles closest to the cursor scale up smoothly via cosine falloff; tooltip labels rise above the active tile.",
    imports: `import { FloatingDock } from "@/components/ui/floating-dock";`,
    defaultExample: {
      title: "App dock",
      description:
        "Each tile measures its distance to the cursor (window-level mousemove) and interpolates between `baseSize` and `magnifySize` using a cosine falloff inside `range` px.",
      code: `<FloatingDock
  items={[
    { icon: <Globe />, label: "Browse", href: "/" },
    { icon: <Music />, label: "Music" },
    // …
  ]}
  baseSize={44}
  magnifySize={72}
  range={130}
/>`,
      render: <FloatingDockDemo />,
    },
    props: [
      {
        name: "items",
        type: "{ icon: ReactNode; label?: string; href?: string; onClick?: () => void }[]",
        required: true,
      },
      {
        name: "baseSize",
        type: "number",
        default: "44",
        description: "Resting tile size in px.",
      },
      {
        name: "magnifySize",
        type: "number",
        default: "68",
        description: "Maximum hover size in px.",
      },
      {
        name: "range",
        type: "number",
        default: "110",
        description: "Magnify radius from cursor in px.",
      },
    ],
    related: ["navbar", "tooltip"],
  },

  // ---------- WavyText ----------
  {
    name: "wavy-text",
    title: "Wavy Text",
    description:
      "Text whose characters oscillate vertically on a sine wave with a per-character delay, so the wave travels through the word.",
    imports: `import { WavyText } from "@/components/ui/wavy-text";`,
    defaultExample: {
      title: "Bouncing headline",
      description:
        "Pass `text` plus optional `amplitude` (max vertical travel), `duration` (one full oscillation), and `stagger` (delay between characters).",
      code: `<WavyText text="CraftUI" amplitude={10} duration={2.2} stagger={0.08} />`,
      render: <WavyTextDemo />,
    },
    props: [
      { name: "text", type: "string", required: true },
      {
        name: "amplitude",
        type: "number",
        default: "8",
        description: "Vertical wave amplitude in px.",
      },
      {
        name: "duration",
        type: "number",
        default: "2",
        description: "Single oscillation duration in seconds.",
      },
      {
        name: "stagger",
        type: "number",
        default: "0.08",
        description: "Per-character delay in seconds.",
      },
    ],
    related: ["animated-text", "sparkles-text"],
  },

  // ---------- EvervaultCard ----------
  {
    name: "evervault-card",
    title: "Evervault Card",
    description:
      "Card whose background fills with random characters that become visible behind a cursor-tracked colored gradient on hover. Inspired by the encrypted-storage-vault aesthetic.",
    imports: `import { EvervaultCard } from "@/components/ui/evervault-card";`,
    defaultExample: {
      title: "Encrypted vault",
      description:
        "On hover, a radial gradient follows the cursor (`mix-blend: screen`) and fades in a grid of random characters underneath, giving the card a 'decrypting' feel.",
      code: `<EvervaultCard cursorColor="rgb(34, 211, 238)" radius={20}>
  <div>{/* card content */}</div>
</EvervaultCard>`,
      render: <EvervaultCardDemo />,
    },
    props: [
      {
        name: "charSet",
        type: "string",
        default: `"0123456789ABCDEF"`,
        description: "Characters used to fill the background grid.",
      },
      {
        name: "charCount",
        type: "number",
        default: "800",
      },
      {
        name: "cursorColor",
        type: "string",
        default: `"rgb(34, 211, 238)"`,
        description: "Color of the cursor-following gradient.",
      },
      {
        name: "radius",
        type: "number",
        default: "16",
      },
    ],
    related: ["holo-card", "hover-border-gradient"],
  },

  // ---------- FocusCards ----------
  {
    name: "focus-cards",
    title: "Focus Cards",
    description:
      "Image gallery grid where hovering one card keeps it sharp while the rest blur and dim. The focused card surfaces an optional caption overlay with a smooth fade.",
    imports: `import { FocusCards } from "@/components/ui/focus-cards";`,
    defaultExample: {
      title: "Hover any tile to focus it",
      description:
        "Hovering a card sets it as the focused one — every other card transitions blur, opacity, and a slight scale-down on a `cubic-bezier(0.22,1,0.36,1)` curve. The focused card fades in a caption overlay from a bottom gradient.",
      code: `<FocusCards
  items={[
    { id: 1, src: "/forest.jpg", title: "Quiet places to think." },
    { id: 2, src: "/canyon.jpg", title: "Carved by patience." },
    // …
  ]}
  columns={3}
/>`,
      render: <FocusCardsDemo />,
    },
    props: [
      {
        name: "items",
        type: "{ id: string | number; src: string; alt?: string; title?: ReactNode; href?: string }[]",
        required: true,
      },
      {
        name: "columns",
        type: "number",
        default: "3",
      },
      {
        name: "aspectRatio",
        type: "number",
        default: "0.78",
        description: "Width / height ratio for each card. Default ~4:5 portrait.",
      },
      {
        name: "blurAmount",
        type: "number",
        default: "6",
        description: "Blur (px) applied to non-focused cards.",
      },
      {
        name: "dimOpacity",
        type: "number",
        default: "0.45",
        description: "Opacity (0–1) of non-focused cards.",
      },
    ],
    related: ["card-hover-effect", "lens"],
  },

  // ---------- DotPattern ----------
  {
    name: "dot-pattern",
    title: "Dot Pattern",
    description:
      "CSS-only dotted background that brightens dots near the cursor via a masked second layer. Pure background-image — no DOM dots, scales to any container size for free.",
    imports: `import { DotPattern } from "@/components/ui/dot-pattern";`,
    defaultExample: {
      title: "Cursor spotlight",
      description:
        "Two stacked layers: a dim dot grid for full coverage, plus a bright dot grid masked by a radial gradient at the cursor position so only nearby dots light up.",
      code: `<DotPattern
  spacing={22}
  dotSize={1.2}
  glowRadius={160}
  glowColor="rgba(56, 189, 248, 0.95)"
/>`,
      render: <DotPatternDemo />,
    },
    props: [
      { name: "spacing", type: "number", default: "22" },
      { name: "dotSize", type: "number", default: "1" },
      {
        name: "dotColor",
        type: "string",
        default: `"rgba(255, 255, 255, 0.16)"`,
      },
      {
        name: "glowOnHover",
        type: "boolean",
        default: "true",
      },
      {
        name: "glowRadius",
        type: "number",
        default: "140",
        description: "Radius of the cursor spotlight in px.",
      },
      {
        name: "glowColor",
        type: "string",
        default: `"rgba(56, 189, 248, 0.85)"`,
      },
    ],
    related: ["background-boxes", "background-beams"],
  },

  // ---------- TextGenerateEffect ----------
  {
    name: "text-generate-effect",
    title: "Text Generate Effect",
    description:
      "Words appear from a blurred-out state to focus, staggered left-to-right. Reads as if the text is being 'generated' with a soft camera focus instead of plain typing.",
    imports: `import { TextGenerateEffect } from "@/components/ui/text-generate-effect";`,
    defaultExample: {
      title: "Hero headline reveal",
      description:
        "Splits the input on whitespace and animates each word from `opacity: 0` + `blur(10px)` to focus, with a per-word `stagger` delay. Triggers on scroll-into-view by default.",
      code: `<TextGenerateEffect
  words="Build interfaces that feel inevitable."
  stagger={90}
  duration={650}
  blur={10}
/>`,
      render: <TextGenerateEffectDemo />,
    },
    props: [
      { name: "words", type: "string", required: true },
      {
        name: "blur",
        type: "number",
        default: "10",
        description: "Initial blur in px.",
      },
      {
        name: "stagger",
        type: "number",
        default: "90",
        description: "Delay between words in ms.",
      },
      {
        name: "duration",
        type: "number",
        default: "600",
        description: "Per-word transition duration in ms.",
      },
      { name: "whenInView", type: "boolean", default: "true" },
    ],
    related: ["animated-text", "wavy-text"],
  },

  // ---------- FlipWords ----------
  {
    name: "flip-words",
    title: "Flip Words",
    description:
      "Drop into a sentence to cycle one word with a 3D rotateX flip and soft blur. Each word stays for `duration` ms, then the next slides in.",
    imports: `import { FlipWords } from "@/components/ui/flip-words";`,
    defaultExample: {
      title: "Cycling word",
      description:
        "Pass an array of words. The component remounts the inner span on each tick (via React `key`), which replays the `flip-word` keyframe (translateY + rotateX + blur).",
      code: `<FlipWords
  words={["beautiful", "fast", "modern", "yours"]}
  duration={2200}
/>`,
      render: <FlipWordsDemo />,
    },
    props: [
      { name: "words", type: "string[]", required: true },
      {
        name: "duration",
        type: "number",
        default: "3000",
        description: "Time on each word in ms before flipping.",
      },
      {
        name: "loop",
        type: "boolean",
        default: "true",
      },
    ],
    related: ["animated-text", "text-generate-effect"],
  },

  // ---------- Ripple ----------
  {
    name: "ripple",
    title: "Ripple",
    description:
      "Concentric rings that scale from 0 to full size and fade out, staggered so a new ring starts as the outer one disappears. Sonar / radar pulse — useful for 'live', 'loading', or 'waiting' indicators.",
    imports: `import { Ripple } from "@/components/ui/ripple";`,
    defaultExample: {
      title: "Pulse indicator",
      description:
        "Renders `count` rings, each with `animationDelay = (i / count) × duration`. Combined with the looping `ripple` keyframe, you get one ring leaving as another arrives.",
      code: `<Ripple
  size={260}
  color="rgb(56, 189, 248)"
  count={4}
  duration={3.2}
/>`,
      render: <RippleDemo />,
    },
    props: [
      {
        name: "size",
        type: "number",
        default: "240",
        description: "Final ring diameter in px.",
      },
      {
        name: "color",
        type: "string",
        default: `"rgb(56, 189, 248)"`,
      },
      {
        name: "count",
        type: "number",
        default: "4",
        description: "Number of concurrent rings.",
      },
      {
        name: "duration",
        type: "number",
        default: "3",
        description: "Single ring cycle duration in seconds.",
      },
      {
        name: "centerDot",
        type: "boolean",
        default: "true",
      },
    ],
    related: ["spinner", "neon-glow"],
  },

  // ---------- TextScramble ----------
  {
    name: "text-scramble",
    title: "Text Scramble",
    description:
      "Letters cycle through random characters, then settle on the target text from left to right. Like a terminal 'decoding' effect. Optional hover-trigger and loop modes.",
    imports: `import { TextScramble } from "@/components/ui/text-scramble";`,
    defaultExample: {
      title: "Decoder + hover re-trigger",
      description:
        "Each character has a random `start` and `end` frame. Before `start` it shows whitespace; between `start` and `end` it cycles through the `alphabet`; after `end` it locks to the target letter. The container reserves `text.length × 1ch` so layout doesn't shift.",
      code: `<TextScramble text="DECRYPTING SIGNAL" speed={45} loop />

<TextScramble
  text="ACCESS GRANTED"
  speed={30}
  triggerOnHover
  whenInView={false}
/>`,
      render: <TextScrambleDemo />,
    },
    props: [
      { name: "text", type: "string", required: true },
      {
        name: "alphabet",
        type: "string",
        description: "Pool of characters to draw from while scrambling.",
      },
      {
        name: "speed",
        type: "number",
        default: "40",
        description: "Frame interval in ms. Lower = faster.",
      },
      { name: "whenInView", type: "boolean", default: "true" },
      { name: "loop", type: "boolean", default: "false" },
      {
        name: "pause",
        type: "number",
        default: "2500",
        description: "Pause between loops in ms.",
      },
      {
        name: "triggerOnHover",
        type: "boolean",
        default: "false",
        description: "Trigger the scramble on hover instead of automatically.",
      },
    ],
    related: ["animated-text", "typewriter"],
  },
];

const byName = new Map(catalog.map((d) => [d.name, d]));

export function getComponentDoc(name: string): ComponentDoc | undefined {
  return byName.get(name);
}

export function listComponentDocs(): ComponentDoc[] {
  return catalog;
}
