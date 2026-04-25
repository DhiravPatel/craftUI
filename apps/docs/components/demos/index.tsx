import type { ReactNode } from "react";
import {
  Button,
  Input,
  Label,
  Textarea,
  Checkbox,
  Switch,
  RadioGroup,
  RadioGroupItem,
  Badge,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  Separator,
  Skeleton,
  Spinner,
  Alert,
  AlertDescription,
  AlertTitle,
  Progress,
  Avatar,
  AvatarFallback,
  AvatarImage,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@craftui/ui";
import { Mail, Terminal } from "lucide-react";

export interface Demo {
  code: string;
  render: ReactNode;
}

export const demos: Record<string, Demo> = {
  button: {
    code: `<div className="flex gap-2">
  <Button>Default</Button>
  <Button variant="secondary">Secondary</Button>
  <Button variant="outline">Outline</Button>
  <Button variant="ghost">Ghost</Button>
  <Button variant="destructive">Destructive</Button>
</div>`,
    render: (
      <div className="flex flex-wrap gap-2">
        <Button>Default</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="outline">Outline</Button>
        <Button variant="ghost">Ghost</Button>
        <Button variant="destructive">Destructive</Button>
      </div>
    ),
  },
  input: {
    code: `<div className="w-full max-w-sm space-y-2">
  <Label htmlFor="email">Email</Label>
  <Input id="email" placeholder="you@example.com" leftElement={<Mail />} />
</div>`,
    render: (
      <div className="w-full max-w-sm space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          placeholder="you@example.com"
          leftElement={<Mail className="h-4 w-4" />}
        />
      </div>
    ),
  },
  textarea: {
    code: `<Textarea placeholder="Tell us more..." />`,
    render: (
      <Textarea
        className="w-full max-w-sm"
        placeholder="Tell us more..."
      />
    ),
  },
  label: {
    code: `<div className="space-y-1">
  <Label required>Email</Label>
  <Input />
</div>`,
    render: (
      <div className="w-full max-w-sm space-y-1">
        <Label required>Email</Label>
        <Input />
      </div>
    ),
  },
  checkbox: {
    code: `<div className="flex items-center gap-2">
  <Checkbox id="terms" />
  <Label htmlFor="terms">Accept terms</Label>
</div>`,
    render: (
      <div className="flex items-center gap-2">
        <Checkbox id="terms" />
        <Label htmlFor="terms">Accept terms</Label>
      </div>
    ),
  },
  switch: {
    code: `<div className="flex items-center gap-2">
  <Switch id="notif" />
  <Label htmlFor="notif">Notifications</Label>
</div>`,
    render: (
      <div className="flex items-center gap-2">
        <Switch id="notif" />
        <Label htmlFor="notif">Notifications</Label>
      </div>
    ),
  },
  "radio-group": {
    code: `<RadioGroup defaultValue="one">
  <div className="flex items-center gap-2">
    <RadioGroupItem value="one" id="r1" />
    <Label htmlFor="r1">One</Label>
  </div>
  <div className="flex items-center gap-2">
    <RadioGroupItem value="two" id="r2" />
    <Label htmlFor="r2">Two</Label>
  </div>
</RadioGroup>`,
    render: (
      <RadioGroup defaultValue="one">
        <div className="flex items-center gap-2">
          <RadioGroupItem value="one" id="r1" />
          <Label htmlFor="r1">One</Label>
        </div>
        <div className="flex items-center gap-2">
          <RadioGroupItem value="two" id="r2" />
          <Label htmlFor="r2">Two</Label>
        </div>
      </RadioGroup>
    ),
  },
  badge: {
    code: `<div className="flex gap-2">
  <Badge>Default</Badge>
  <Badge variant="secondary">Secondary</Badge>
  <Badge variant="success">Success</Badge>
  <Badge variant="destructive">Destructive</Badge>
  <Badge variant="outline">Outline</Badge>
</div>`,
    render: (
      <div className="flex flex-wrap gap-2">
        <Badge>Default</Badge>
        <Badge variant="secondary">Secondary</Badge>
        <Badge variant="success">Success</Badge>
        <Badge variant="destructive">Destructive</Badge>
        <Badge variant="outline">Outline</Badge>
      </div>
    ),
  },
  card: {
    code: `<Card className="w-[340px]">
  <CardHeader>
    <CardTitle>Notifications</CardTitle>
    <CardDescription>You have 3 unread messages.</CardDescription>
  </CardHeader>
  <CardContent>
    You&apos;re all caught up.
  </CardContent>
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
        <CardContent>You&apos;re all caught up.</CardContent>
        <CardFooter>
          <Button className="ml-auto">Mark read</Button>
        </CardFooter>
      </Card>
    ),
  },
  separator: {
    code: `<div className="w-full max-w-sm space-y-2">
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
  skeleton: {
    code: `<div className="space-y-2">
  <Skeleton className="h-4 w-[250px]" />
  <Skeleton className="h-4 w-[200px]" />
</div>`,
    render: (
      <div className="space-y-2">
        <Skeleton className="h-4 w-[250px]" />
        <Skeleton className="h-4 w-[200px]" />
      </div>
    ),
  },
  spinner: {
    code: `<Spinner size="lg" />`,
    render: <Spinner size="lg" />,
  },
  alert: {
    code: `<Alert>
  <AlertTitle>Heads up!</AlertTitle>
  <AlertDescription>CraftUI components are ready.</AlertDescription>
</Alert>`,
    render: (
      <Alert className="w-full max-w-md">
        <Terminal className="h-4 w-4" />
        <AlertTitle>Heads up!</AlertTitle>
        <AlertDescription>CraftUI components are ready.</AlertDescription>
      </Alert>
    ),
  },
  progress: {
    code: `<Progress value={60} />`,
    render: <Progress className="w-full max-w-sm" value={60} />,
  },
  avatar: {
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
  tabs: {
    code: `<Tabs defaultValue="a" className="w-full max-w-sm">
  <TabsList>
    <TabsTrigger value="a">Account</TabsTrigger>
    <TabsTrigger value="b">Password</TabsTrigger>
  </TabsList>
  <TabsContent value="a">Account settings.</TabsContent>
  <TabsContent value="b">Password settings.</TabsContent>
</Tabs>`,
    render: (
      <Tabs defaultValue="a" className="w-full max-w-sm">
        <TabsList>
          <TabsTrigger value="a">Account</TabsTrigger>
          <TabsTrigger value="b">Password</TabsTrigger>
        </TabsList>
        <TabsContent value="a">Account settings.</TabsContent>
        <TabsContent value="b">Password settings.</TabsContent>
      </Tabs>
    ),
  },
  accordion: {
    code: `<Accordion type="single" collapsible className="w-full max-w-sm">
  <AccordionItem value="1">
    <AccordionTrigger>Is it accessible?</AccordionTrigger>
    <AccordionContent>Yes. ARIA-compliant.</AccordionContent>
  </AccordionItem>
</Accordion>`,
    render: (
      <Accordion type="single" collapsible className="w-full max-w-sm">
        <AccordionItem value="1">
          <AccordionTrigger>Is it accessible?</AccordionTrigger>
          <AccordionContent>Yes. ARIA-compliant.</AccordionContent>
        </AccordionItem>
        <AccordionItem value="2">
          <AccordionTrigger>Is it styled?</AccordionTrigger>
          <AccordionContent>Yes. Tailwind tokens throughout.</AccordionContent>
        </AccordionItem>
      </Accordion>
    ),
  },
  tooltip: {
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
            <Button variant="outline">Hover me</Button>
          </TooltipTrigger>
          <TooltipContent>Helpful hint</TooltipContent>
        </Tooltip>
      </TooltipProvider>
    ),
  },
};
