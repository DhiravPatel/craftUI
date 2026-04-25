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
  Combobox,
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
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  Grid,
  Input,
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
  ScrollArea,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Separator,
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
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@craftui/ui";
import {
  AlertCircle,
  CheckCircle2,
  Mail,
  MoreHorizontal,
  Settings,
  Terminal,
  Trash,
  User,
} from "lucide-react";

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
        title: "With icon",
        code: `<Button>
  <Mail />
  Login with Email
</Button>`,
        render: (
          <Button>
            <Mail className="h-4 w-4" />
            Login with Email
          </Button>
        ),
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
        title: "With label",
        code: `<div className="space-y-1.5">
  <Label htmlFor="email">Email</Label>
  <Input id="email" type="email" placeholder="you@example.com" />
</div>`,
        render: (
          <div className="w-full max-w-sm space-y-1.5">
            <Label htmlFor="ex-email">Email</Label>
            <Input
              id="ex-email"
              type="email"
              placeholder="you@example.com"
            />
          </div>
        ),
      },
      {
        title: "With icon",
        code: `<Input leftElement={<Mail />} placeholder="Search…" />`,
        render: (
          <Input
            className="max-w-sm"
            leftElement={<Mail className="h-4 w-4" />}
            placeholder="Search…"
          />
        ),
      },
      {
        title: "Error state",
        code: `<Input error placeholder="Invalid email" />`,
        render: <Input error className="max-w-sm" placeholder="Invalid" />,
      },
      {
        title: "Disabled",
        code: `<Input disabled placeholder="Disabled" />`,
        render: <Input disabled className="max-w-sm" placeholder="Disabled" />,
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
    related: ["label", "textarea", "form"],
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
        title: "With label",
        code: `<div className="space-y-1.5">
  <Label htmlFor="msg">Message</Label>
  <Textarea id="msg" />
</div>`,
        render: (
          <div className="w-full max-w-sm space-y-1.5">
            <Label htmlFor="ex-msg">Message</Label>
            <Textarea id="ex-msg" />
          </div>
        ),
      },
      {
        title: "Auto-resize",
        code: `<Textarea autoResize placeholder="Keeps growing…" />`,
        render: (
          <Textarea
            autoResize
            className="w-full max-w-sm"
            placeholder="Keeps growing…"
          />
        ),
      },
    ],
    props: [
      { name: "error", type: "boolean", default: "false" },
      { name: "autoResize", type: "boolean", default: "false" },
      { name: "rows", type: "number" },
    ],
    related: ["input", "label", "form"],
  },

  // ---------- Label ----------
  {
    name: "label",
    title: "Label",
    description: "Accessible label built on @radix-ui/react-label.",
    imports: `import { Label } from "@/components/ui/label";`,
    defaultExample: {
      title: "Default",
      code: `<Label htmlFor="email">Email address</Label>`,
      render: <Label htmlFor="_">Email address</Label>,
    },
    examples: [
      {
        title: "Required",
        code: `<Label required>Password</Label>`,
        render: <Label required>Password</Label>,
      },
      {
        title: "Optional",
        code: `<Label optional>Nickname</Label>`,
        render: <Label optional>Nickname</Label>,
      },
    ],
    props: [
      { name: "required", type: "boolean", default: "false" },
      { name: "optional", type: "boolean", default: "false" },
      { name: "htmlFor", type: "string" },
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
        title: "Checked",
        code: `<Checkbox defaultChecked />`,
        render: <Checkbox defaultChecked />,
      },
      {
        title: "Disabled",
        code: `<Checkbox disabled />`,
        render: <Checkbox disabled />,
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
      title: "Default",
      code: `<div className="flex items-center gap-2">
  <Switch id="notif" />
  <Label htmlFor="notif">Notifications</Label>
</div>`,
      render: (
        <div className="flex items-center gap-2">
          <Switch id="ex-switch" />
          <Label htmlFor="ex-switch">Notifications</Label>
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
        title: "Destructive",
        code: `<Alert variant="destructive">
  <AlertCircle className="h-4 w-4" />
  <AlertTitle>Error</AlertTitle>
  <AlertDescription>Your session has expired.</AlertDescription>
</Alert>`,
        render: (
          <Alert variant="destructive" className="w-full max-w-md">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>Your session has expired.</AlertDescription>
          </Alert>
        ),
      },
      {
        title: "Success",
        code: `<Alert variant="success">
  <CheckCircle2 className="h-4 w-4" />
  <AlertTitle>Deploy succeeded</AlertTitle>
  <AlertDescription>Shipped to production.</AlertDescription>
</Alert>`,
        render: (
          <Alert variant="success" className="w-full max-w-md">
            <CheckCircle2 className="h-4 w-4" />
            <AlertTitle>Deploy succeeded</AlertTitle>
            <AlertDescription>Shipped to production.</AlertDescription>
          </Alert>
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
  },

  // ---------- Drawer ----------
  {
    name: "drawer",
    title: "Drawer",
    description: "Mobile-first bottom drawer. Built on vaul.",
    imports: `import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";`,
    defaultExample: {
      title: "Default",
      code: `<Drawer>
  <DrawerTrigger asChild><Button>Open drawer</Button></DrawerTrigger>
  <DrawerContent>
    <DrawerHeader>
      <DrawerTitle>Move goal</DrawerTitle>
      <DrawerDescription>Set your daily activity goal.</DrawerDescription>
    </DrawerHeader>
    <DrawerFooter>
      <Button>Save</Button>
    </DrawerFooter>
  </DrawerContent>
</Drawer>`,
      render: (
        <Drawer>
          <DrawerTrigger asChild>
            <Button variant="outline">Open drawer</Button>
          </DrawerTrigger>
          <DrawerContent>
            <DrawerHeader>
              <DrawerTitle>Move goal</DrawerTitle>
              <DrawerDescription>
                Set your daily activity goal.
              </DrawerDescription>
            </DrawerHeader>
            <DrawerFooter>
              <Button>Save</Button>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      ),
    },
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
  },

  // ---------- Combobox ----------
  {
    name: "combobox",
    title: "Combobox",
    description: "Searchable select built on Popover + Command.",
    imports: `import { Combobox } from "@/components/ui/combobox";`,
    defaultExample: {
      title: "Default",
      code: `<Combobox
  options={[
    { label: "Next.js", value: "next" },
    { label: "Remix", value: "remix" },
    { label: "Vite", value: "vite" },
  ]}
  placeholder="Select framework…"
/>`,
      render: (
        <div className="w-full max-w-sm">
          <Combobox
            options={[
              { label: "Next.js", value: "next" },
              { label: "Remix", value: "remix" },
              { label: "Vite", value: "vite" },
              { label: "Astro", value: "astro" },
            ]}
            placeholder="Select framework…"
          />
        </div>
      ),
    },
  },

  // ---------- Calendar ----------
  {
    name: "calendar",
    title: "Calendar",
    description: "Date picker built on react-day-picker, styled to match.",
    imports: `import { Calendar } from "@/components/ui/calendar";`,
    defaultExample: {
      title: "Default",
      code: `<Calendar mode="single" />`,
      render: <Calendar mode="single" />,
    },
  },

  // ---------- Date Picker ----------
  {
    name: "date-picker",
    title: "Date Picker",
    description: "Calendar inside a popover.",
    imports: `import { DatePicker } from "@/components/ui/date-picker";`,
    defaultExample: {
      title: "Default",
      code: `<DatePicker />`,
      render: (
        <div className="w-full max-w-sm">
          <DatePicker />
        </div>
      ),
    },
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
  },

  // ---------- Scroll area ----------
  {
    name: "scroll-area",
    title: "Scroll Area",
    description: "Custom-styled scroll container with a themed scrollbar.",
    imports: `import { ScrollArea } from "@/components/ui/scroll-area";`,
    defaultExample: {
      title: "Default",
      code: `<ScrollArea className="h-72 w-48 rounded-md border p-4">
  {tags.map(t => <div key={t} className="text-sm py-1">{t}</div>)}
</ScrollArea>`,
      render: (
        <ScrollArea className="h-60 w-48 rounded-md border p-4">
          {Array.from({ length: 30 }, (_, i) => (
            <div key={i} className="py-1 text-sm">
              Tag {i + 1}
            </div>
          ))}
        </ScrollArea>
      ),
    },
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
      title: "Programmatic",
      code: `const { toast } = useToast();
<Button onClick={() => toast({ title: "Saved", description: "Your changes are live." })}>
  Save
</Button>`,
      render: (
        <div className="text-sm text-muted-foreground">
          Add <code>&lt;Toaster /&gt;</code> to your root layout and call{" "}
          <code>toast(…)</code> from any component.
        </div>
      ),
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
      title: "Pattern",
      code: `<Form {...form}>
  <form onSubmit={form.handleSubmit(onSubmit)}>
    <FormField
      control={form.control}
      name="email"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Email</FormLabel>
          <FormControl><Input {...field} /></FormControl>
          <FormDescription>We&apos;ll never share your email.</FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
    <Button type="submit">Submit</Button>
  </form>
</Form>`,
      render: (
        <div className="w-full max-w-sm space-y-4 rounded-md border bg-background p-4 text-sm">
          <div className="space-y-1.5">
            <Label>Email</Label>
            <Input placeholder="you@example.com" />
            <p className="text-xs text-muted-foreground">
              We&apos;ll never share your email.
            </p>
          </div>
          <Button size="sm">Submit</Button>
        </div>
      ),
    },
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
      title: "Default",
      code: `<Navbar>
  <NavbarBrand>Acme</NavbarBrand>
  <NavbarContent>
    <a href="#" className="text-sm">Docs</a>
    <a href="#" className="text-sm">Pricing</a>
  </NavbarContent>
  <NavbarActions>
    <Button size="sm">Sign in</Button>
  </NavbarActions>
</Navbar>`,
      render: (
        <div className="w-full overflow-hidden rounded-md border bg-background">
          <div className="flex h-12 items-center gap-6 px-4">
            <span className="font-semibold">Acme</span>
            <nav className="flex gap-4 text-sm text-muted-foreground">
              <a href="#">Docs</a>
              <a href="#">Pricing</a>
            </nav>
            <Button size="sm" className="ml-auto">
              Sign in
            </Button>
          </div>
        </div>
      ),
    },
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
      title: "Default",
      code: `<Sidebar>
  <SidebarHeader>Acme</SidebarHeader>
  <SidebarContent>
    <SidebarNavItem active>Overview</SidebarNavItem>
    <SidebarNavItem>Settings</SidebarNavItem>
  </SidebarContent>
</Sidebar>`,
      render: (
        <div className="flex h-[220px] w-full overflow-hidden rounded-md border">
          <div className="w-48 border-r bg-muted/20 p-3 text-sm">
            <div className="mb-3 px-2 font-medium">Acme</div>
            <div className="space-y-1">
              <div className="rounded-md bg-accent px-2 py-1.5 font-medium text-accent-foreground">
                Overview
              </div>
              <div className="rounded-md px-2 py-1.5 text-muted-foreground">
                Settings
              </div>
            </div>
          </div>
          <div className="flex-1 bg-background" />
        </div>
      ),
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
      title: "Toggle",
      code: `const { theme, setTheme } = useTheme();
<Button onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
  Toggle
</Button>`,
      render: (
        <div className="text-sm text-muted-foreground">
          Wrap your app in <code>&lt;ThemeProvider /&gt;</code> — use the header
          toggle above to test it.
        </div>
      ),
    },
  },
];

const byName = new Map(catalog.map((d) => [d.name, d]));

export function getComponentDoc(name: string): ComponentDoc | undefined {
  return byName.get(name);
}

export function listComponentDocs(): ComponentDoc[] {
  return catalog;
}
