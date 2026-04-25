"use client";

import * as React from "react";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Badge,
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Input,
  Label,
  Progress,
  Separator,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@craftui/ui";
import {
  ArrowDownRight,
  ArrowUpRight,
  CreditCard,
  DollarSign,
  Search,
  Users,
} from "lucide-react";

const stats = [
  {
    label: "Revenue",
    value: "$45,231.89",
    delta: "+20.1%",
    trend: "up" as const,
    icon: DollarSign,
  },
  {
    label: "Subscriptions",
    value: "2,350",
    delta: "+180.1%",
    trend: "up" as const,
    icon: Users,
  },
  {
    label: "Sales",
    value: "12,234",
    delta: "-4.2%",
    trend: "down" as const,
    icon: CreditCard,
  },
  {
    label: "Active",
    value: "573",
    delta: "+2.5%",
    trend: "up" as const,
    icon: Users,
  },
];

const activity = [
  {
    name: "Olivia Martin",
    email: "olivia.martin@email.com",
    amount: "+$1,999.00",
    avatar: "OM",
  },
  {
    name: "Jackson Lee",
    email: "jackson.lee@email.com",
    amount: "+$39.00",
    avatar: "JL",
  },
  {
    name: "Isabella Nguyen",
    email: "isabella.nguyen@email.com",
    amount: "+$299.00",
    avatar: "IN",
  },
  {
    name: "William Kim",
    email: "will@email.com",
    amount: "+$99.00",
    avatar: "WK",
  },
  {
    name: "Sofia Davis",
    email: "sofia.davis@email.com",
    amount: "+$39.00",
    avatar: "SD",
  },
];

export function DashboardPreview() {
  return (
    <div className="relative mx-auto max-w-6xl">
      {/* Soft outer glow for depth */}
      <div
        aria-hidden
        className="absolute -inset-10 -z-10 rounded-[3rem] bg-foreground/[0.03] blur-3xl"
      />
      <div className="overflow-hidden rounded-xl border bg-background shadow-2xl shadow-foreground/[0.07]">
        {/* Faux window chrome */}
        <div className="flex items-center gap-2 border-b bg-muted/50 px-4 py-2.5">
          <span className="h-2.5 w-2.5 rounded-full bg-muted-foreground/30" />
          <span className="h-2.5 w-2.5 rounded-full bg-muted-foreground/30" />
          <span className="h-2.5 w-2.5 rounded-full bg-muted-foreground/30" />
          <div className="ml-4 flex flex-1 items-center gap-2 rounded-md border bg-background px-3 py-1 text-xs text-muted-foreground">
            <Search className="h-3 w-3" />
            app.craftui.dev/dashboard
          </div>
        </div>

        {/* App surface */}
        <div className="grid grid-cols-1 md:grid-cols-[200px_1fr]">
          {/* Sidebar */}
          <aside className="hidden border-r bg-muted/20 p-4 md:block">
            <div className="flex items-center gap-2 px-1 pb-4">
              <span className="inline-flex h-6 w-6 items-center justify-center rounded bg-foreground text-background">
                <span className="text-[10px] font-bold">A</span>
              </span>
              <span className="text-sm font-medium">Acme Inc.</span>
            </div>
            <Separator className="mb-3" />
            <nav className="space-y-1 text-sm">
              {["Overview", "Customers", "Products", "Analytics", "Settings"].map(
                (item, i) => (
                  <a
                    key={item}
                    href="#"
                    className={`flex rounded-md px-2 py-1.5 ${
                      i === 0
                        ? "bg-accent font-medium text-accent-foreground"
                        : "text-muted-foreground hover:bg-accent/50"
                    }`}
                  >
                    {item}
                  </a>
                )
              )}
            </nav>
          </aside>

          {/* Main panel */}
          <div className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold tracking-tight">Overview</h3>
                <p className="text-sm text-muted-foreground">
                  Here&apos;s what&apos;s happening this month.
                </p>
              </div>
              <div className="hidden items-center gap-2 md:flex">
                <Button variant="outline" size="sm">
                  Export
                </Button>
                <Button size="sm">New report</Button>
              </div>
            </div>

            {/* Stat cards */}
            <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {stats.map((s) => (
                <Card key={s.label} className="overflow-hidden">
                  <CardHeader className="flex flex-row items-center justify-between p-4 pb-2 space-y-0">
                    <CardDescription className="text-xs">
                      {s.label}
                    </CardDescription>
                    <s.icon className="h-3.5 w-3.5 text-muted-foreground" />
                  </CardHeader>
                  <CardContent className="p-4 pt-0">
                    <div className="text-2xl font-semibold tracking-tight">
                      {s.value}
                    </div>
                    <div
                      className={`mt-1 flex items-center gap-1 text-xs ${
                        s.trend === "up" ? "text-success" : "text-destructive"
                      }`}
                    >
                      {s.trend === "up" ? (
                        <ArrowUpRight className="h-3 w-3" />
                      ) : (
                        <ArrowDownRight className="h-3 w-3" />
                      )}
                      {s.delta} from last month
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Tabs + activity */}
            <div className="mt-6 grid gap-4 lg:grid-cols-3">
              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle className="text-base">Performance</CardTitle>
                  <Tabs defaultValue="week" className="mt-1">
                    <TabsList className="h-8">
                      <TabsTrigger value="day" className="h-6 text-xs">
                        Day
                      </TabsTrigger>
                      <TabsTrigger value="week" className="h-6 text-xs">
                        Week
                      </TabsTrigger>
                      <TabsTrigger value="month" className="h-6 text-xs">
                        Month
                      </TabsTrigger>
                    </TabsList>
                    <TabsContent value="week" className="mt-4">
                      <SparkBars />
                    </TabsContent>
                    <TabsContent value="day" className="mt-4">
                      <SparkBars seed={3} />
                    </TabsContent>
                    <TabsContent value="month" className="mt-4">
                      <SparkBars seed={7} />
                    </TabsContent>
                  </Tabs>
                </CardHeader>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Recent sales</CardTitle>
                  <CardDescription>265 this month.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {activity.slice(0, 4).map((a) => (
                    <div key={a.name} className="flex items-center gap-3">
                      <Avatar size="sm">
                        <AvatarImage src="" alt={a.name} />
                        <AvatarFallback>{a.avatar}</AvatarFallback>
                      </Avatar>
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-medium">
                          {a.name}
                        </p>
                        <p className="truncate text-xs text-muted-foreground">
                          {a.email}
                        </p>
                      </div>
                      <div className="font-mono text-xs">{a.amount}</div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>

            {/* Form strip */}
            <Card className="mt-6">
              <CardHeader className="pb-3">
                <CardTitle className="text-base">Invite teammate</CardTitle>
                <CardDescription>
                  They&apos;ll get read-only access by default.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-3 sm:grid-cols-[1fr_auto_auto]">
                  <div className="space-y-1">
                    <Label htmlFor="demo-email" className="sr-only">
                      Email
                    </Label>
                    <Input
                      id="demo-email"
                      placeholder="name@company.com"
                      type="email"
                    />
                  </div>
                  <Button variant="outline">Send invite</Button>
                  <Badge
                    variant="secondary"
                    className="flex items-center self-center"
                  >
                    3 seats left
                  </Badge>
                </div>
                <div className="mt-4">
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>Plan usage</span>
                    <span>62 / 100 seats</span>
                  </div>
                  <Progress value={62} className="mt-1.5 h-1.5" />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

function SparkBars({ seed = 1 }: { seed?: number }) {
  const bars = React.useMemo(() => {
    const out: number[] = [];
    let x = seed * 37;
    for (let i = 0; i < 24; i++) {
      x = (x * 9301 + 49297) % 233280;
      out.push(30 + (x / 233280) * 70);
    }
    return out;
  }, [seed]);

  return (
    <div className="flex h-32 items-end gap-1.5">
      {bars.map((h, i) => (
        <div
          key={i}
          className="flex-1 rounded-sm bg-foreground/80"
          style={{ height: `${h}%` }}
        />
      ))}
    </div>
  );
}
