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
  CalendarMultipleMonthsDemo,
} from "@/components/demos/calendar-demos";
import { FullFormDemo, LoginFormDemo } from "@/components/demos/form-demo";
import {
  ComboboxDemo,
  ModernNavbarDemo,
  MultiSelectDemo,
  SelectableTableDemo,
  SidebarDemo,
  TextareaCounterDemo,
  ThemeProviderDemo,
  ToastDemo,
  ToggleDemo,
} from "@/components/demos/interactive-demos";

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
        title: "Sizes",
        code: `<div className="flex items-center gap-2">
  <Button size="sm">Small</Button>
  <Button>Default</Button>
  <Button size="lg">Large</Button>
  <Button size="icon"><Settings /></Button>
</div>`,
        render: (
          <div className="flex items-center gap-2">
            <Button size="sm">Small</Button>
            <Button>Default</Button>
            <Button size="lg">Large</Button>
            <Button size="icon">
              <Settings className="h-4 w-4" />
            </Button>
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
    examples: [
      {
        title: "Vertical",
        code: `<div className="flex h-12 items-center gap-4 text-sm">
  <span>Docs</span>
  <Separator orientation="vertical" />
  <span>API</span>
  <Separator orientation="vertical" />
  <span>Blog</span>
</div>`,
        render: (
          <div className="flex h-12 items-center gap-4 text-sm">
            <span>Docs</span>
            <Separator orientation="vertical" />
            <span>API</span>
            <Separator orientation="vertical" />
            <span>Blog</span>
          </div>
        ),
      },
    ],
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
      title: "Sizes",
      code: `<div className="flex items-center gap-4">
  <Spinner size="sm" />
  <Spinner />
  <Spinner size="lg" />
  <Spinner size="xl" />
</div>`,
      render: (
        <div className="flex items-center gap-4">
          <Spinner size="sm" />
          <Spinner />
          <Spinner size="lg" />
          <Spinner size="xl" />
        </div>
      ),
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
        title: "Sizes",
        code: `<div className="flex items-end gap-3">
  <Avatar size="xs"><AvatarFallback>XS</AvatarFallback></Avatar>
  <Avatar size="sm"><AvatarFallback>SM</AvatarFallback></Avatar>
  <Avatar><AvatarFallback>MD</AvatarFallback></Avatar>
  <Avatar size="lg"><AvatarFallback>LG</AvatarFallback></Avatar>
  <Avatar size="xl"><AvatarFallback>XL</AvatarFallback></Avatar>
</div>`,
        render: (
          <div className="flex items-end gap-3">
            <Avatar size="xs">
              <AvatarFallback>XS</AvatarFallback>
            </Avatar>
            <Avatar size="sm">
              <AvatarFallback>SM</AvatarFallback>
            </Avatar>
            <Avatar>
              <AvatarFallback>MD</AvatarFallback>
            </Avatar>
            <Avatar size="lg">
              <AvatarFallback>LG</AvatarFallback>
            </Avatar>
            <Avatar size="xl">
              <AvatarFallback>XL</AvatarFallback>
            </Avatar>
          </div>
        ),
      },
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
      {
        title: "Two months",
        code: `<Calendar
  mode="single"
  selected={date}
  onSelect={setDate}
  numberOfMonths={2}
/>`,
        render: <CalendarMultipleMonthsDemo />,
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
      {
        title: "Four-digit (PIN-style)",
        description: "Shorter input for short PINs or 2FA backup codes.",
        code: `<InputOTP length={4} />`,
        render: <InputOTP length={4} />,
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
];

const byName = new Map(catalog.map((d) => [d.name, d]));

export function getComponentDoc(name: string): ComponentDoc | undefined {
  return byName.get(name);
}

export function listComponentDocs(): ComponentDoc[] {
  return catalog;
}
