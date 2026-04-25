import Link from "next/link";
import {
  ArrowRight,
  Check,
  Code2,
  Palette,
  Shield,
  Sparkles,
  Terminal,
  Zap,
} from "lucide-react";
import { Button, Card, CardContent } from "@craftui/ui";
import { CopyCommand } from "@/components/docs/copy-command";
import { DashboardPreview } from "@/components/showcase/dashboard-preview";
import { ComponentsShowcase } from "@/components/showcase/components-showcase";

const features = [
  {
    icon: Code2,
    title: "Own the code",
    body: "Components live in your repo. Edit, extend, delete. No black boxes. No lock-in.",
  },
  {
    icon: Sparkles,
    title: "Tailwind native",
    body: "Utility-first styling from the ground up. No CSS-in-JS runtime. No surprises.",
  },
  {
    icon: Palette,
    title: "HSL theming",
    body: "CSS variables everywhere. Swap an entire theme in a single file. Dark mode included.",
  },
  {
    icon: Shield,
    title: "Accessible by default",
    body: "Built on Radix primitives. WCAG 2.1 AA. Keyboard-first, screen-reader tested.",
  },
  {
    icon: Terminal,
    title: "Delightful CLI",
    body: "npx craftui add button. Auto-resolves dependencies. Detects your framework.",
  },
  {
    icon: Zap,
    title: "Zero runtime cost",
    body: "You ship what you use. Tree-shakable by design because you literally copy the code.",
  },
];

const stats = [
  { value: "35+", label: "Components" },
  { value: "100%", label: "TypeScript" },
  { value: "0kb", label: "Runtime" },
  { value: "WCAG 2.1 AA", label: "Accessibility" },
];

export default function HomePage() {
  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="relative overflow-hidden border-b">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-grid opacity-[0.25] mask-radial"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-0 -z-10 h-[600px] w-[900px] -translate-x-1/2 rounded-full bg-foreground/[0.04] blur-3xl"
        />

        <div className="container relative mx-auto px-4 pb-24 pt-20 md:pb-32 md:pt-28">
          <div className="mx-auto flex max-w-4xl flex-col items-center text-center">
            <Link
              href="/docs"
              className="group inline-flex items-center gap-2 rounded-full border bg-background/60 px-3 py-1 text-xs backdrop-blur transition-colors hover:bg-background"
            >
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-success opacity-75" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-success" />
              </span>
              <span className="font-medium">v0.1 is live</span>
              <span className="text-muted-foreground">·</span>
              <span className="text-muted-foreground">
                35+ components, full CLI
              </span>
              <ArrowRight className="h-3 w-3 text-muted-foreground transition-transform group-hover:translate-x-0.5" />
            </Link>

            <h1 className="mt-8 text-balance text-5xl font-semibold tracking-tight md:text-7xl">
              Beautifully designed
              <br />
              <span className="text-gradient">components you own.</span>
            </h1>

            <p className="mt-6 max-w-2xl text-balance text-lg text-muted-foreground md:text-xl">
              CraftUI is a Tailwind-native component system for React.
              Accessibility-first. Zero runtime. Copy what you need, edit
              anything, delete the rest.
            </p>

            <div className="mt-10 flex flex-col items-center gap-3 sm:flex-row">
              <Button size="lg" asChild>
                <Link href="/docs">
                  Get started
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/docs/components/button">Browse components</Link>
              </Button>
            </div>

            <div className="mt-10 w-full max-w-md">
              <CopyCommand command="npx craftui@latest init" />
            </div>
          </div>
        </div>

        <div className="relative border-t bg-background/60 backdrop-blur">
          <div className="container mx-auto grid grid-cols-2 divide-x md:grid-cols-4">
            {stats.map((s) => (
              <div key={s.label} className="px-6 py-8 text-center">
                <div className="text-2xl font-semibold tracking-tight">
                  {s.value}
                </div>
                <div className="mt-1 text-xs uppercase tracking-wider text-muted-foreground">
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Live dashboard preview */}
      <section className="relative overflow-hidden border-b bg-muted/30 py-20 md:py-28">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-dot opacity-[0.35] mask-radial"
        />
        <div className="container relative mx-auto px-4">
          <SectionIntro
            eyebrow="Built with CraftUI"
            title="A real app, built from the same components."
            description="Every primitive you see is in the library. Every interaction is accessible. Every pixel is yours to change."
          />
          <div className="mt-14">
            <DashboardPreview />
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="container mx-auto px-4 py-24 md:py-32">
        <SectionIntro
          eyebrow="Why CraftUI"
          title="Built for teams who take UI seriously."
          description="Everything you would build if you had the time. Nothing you wouldn't."
        />
        <div className="mt-14 grid gap-px overflow-hidden rounded-2xl border bg-border sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f) => (
            <div
              key={f.title}
              className="group flex flex-col bg-background p-8 transition-colors hover:bg-muted/40"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-lg border bg-muted/50 transition-colors group-hover:border-foreground/20">
                <f.icon className="h-4 w-4" />
              </div>
              <h3 className="mt-5 text-base font-semibold tracking-tight">
                {f.title}
              </h3>
              <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                {f.body}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Component showcase */}
      <section className="relative border-y bg-muted/30 py-24 md:py-32">
        <div className="container mx-auto px-4">
          <SectionIntro
            eyebrow="The library"
            title="35+ components. All yours."
            description="Peek at a few. Every card is a working component — tab to focus, Space to interact."
          />
          <div className="mt-14">
            <ComponentsShowcase />
          </div>
          <div className="mt-12 flex justify-center">
            <Button variant="outline" size="lg" asChild>
              <Link href="/docs/components/button">
                Explore all components
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* CLI showcase */}
      <section className="container mx-auto px-4 py-24 md:py-32">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center lg:gap-16">
          <div>
            <div className="mb-4 inline-flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-muted-foreground">
              <Terminal className="h-3.5 w-3.5" />
              CLI
            </div>
            <h2 className="text-balance text-3xl font-semibold tracking-tight md:text-4xl">
              Install components as easily as running a command.
            </h2>
            <p className="mt-4 text-muted-foreground">
              The CraftUI CLI detects your framework, resolves dependencies,
              installs npm packages, and writes type-safe component source into
              your project. Then it gets out of your way.
            </p>
            <ul className="mt-6 space-y-2.5">
              {[
                "Automatic framework detection (Next, Vite, Remix, CRA)",
                "Dependency graph resolution",
                "11 preset themes + generator from any hex color",
                "diff command to see what's changed upstream",
                "upgrade command to pull in the latest",
              ].map((line) => (
                <li key={line} className="flex items-start gap-2.5 text-sm">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-success" />
                  <span>{line}</span>
                </li>
              ))}
            </ul>
          </div>

          <Card className="overflow-hidden border-foreground/10 bg-background shadow-xl shadow-foreground/[0.05]">
            <CardContent className="p-0">
              <div className="flex items-center gap-2 border-b bg-muted/50 px-4 py-2.5">
                <span className="h-2.5 w-2.5 rounded-full bg-muted-foreground/30" />
                <span className="h-2.5 w-2.5 rounded-full bg-muted-foreground/30" />
                <span className="h-2.5 w-2.5 rounded-full bg-muted-foreground/30" />
                <span className="ml-2 font-mono text-xs text-muted-foreground">
                  ~/projects/acme
                </span>
              </div>
              <pre className="overflow-x-auto p-5 font-mono text-xs leading-relaxed">
                <code>
                  <span className="text-muted-foreground">$ </span>
                  npx craftui@latest add button input card
                  {"\n"}
                  <span className="text-muted-foreground">
                    ✓ Resolving dependencies…
                  </span>
                  {"\n"}
                  <span className="text-success">
                    ✓ Found 3 component(s) to install
                  </span>
                  {"\n"}
                  <span className="text-success">✓ Added button</span>
                  {"\n"}
                  <span className="text-success">✓ Added input</span>
                  {"\n"}
                  <span className="text-success">✓ Added card</span>
                  {"\n"}
                  <span className="text-success">
                    ✓ Installed 4 dependencies
                  </span>
                  {"\n\n"}
                  <span className="text-muted-foreground">
                    Done. Import from{" "}
                  </span>
                  <span className="text-foreground">@/components/ui</span>
                </code>
              </pre>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden border-t bg-background">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-grid opacity-[0.2] mask-radial"
        />
        <div className="container relative mx-auto px-4 py-24 text-center md:py-32">
          <h2 className="text-balance text-4xl font-semibold tracking-tight md:text-5xl">
            Stop fighting your component library.
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-balance text-lg text-muted-foreground">
            Start shipping interfaces your team is proud of.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button size="lg" asChild>
              <Link href="/docs">
                Read the docs
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <a
                href="https://github.com/craftui/craftui"
                target="_blank"
                rel="noreferrer"
              >
                Star on GitHub
              </a>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}

function SectionIntro({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description?: string;
}) {
  return (
    <div className="mx-auto max-w-2xl text-center">
      <div className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
        {eyebrow}
      </div>
      <h2 className="mt-3 text-balance text-3xl font-semibold tracking-tight md:text-4xl">
        {title}
      </h2>
      {description ? (
        <p className="mx-auto mt-4 max-w-xl text-balance text-muted-foreground">
          {description}
        </p>
      ) : null}
    </div>
  );
}
