import Link from "next/link";
import {
  ArrowRight,
  Code2,
  Package,
  Palette,
  Shield,
  Sparkles,
  Terminal,
  Zap,
} from "lucide-react";
import { Badge, Button } from "@craftui/ui";
import { Callout } from "@/components/docs/callout";
import { CodeBlock } from "@/components/docs/code-block";
import { DocsHeader } from "@/components/docs/docs-header";
import { DocsPage } from "@/components/docs/docs-page";
import { DocsPageNav } from "@/components/docs/docs-page-nav";
import { PackageManagerTabs } from "@/components/docs/package-manager-tabs";

export const metadata = {
  title: "Introduction",
  description: "Welcome to CraftUI — the developer-owned UI component system.",
};

const toc = [
  { id: "features", title: "Features", level: 2 as const },
  { id: "why-copy-paste", title: "Why copy-paste?", level: 2 as const },
  { id: "quick-install", title: "Quick install", level: 2 as const },
  { id: "whats-in-the-box", title: "What's in the box", level: 2 as const },
  { id: "built-on", title: "Built on giants", level: 2 as const },
  { id: "faq", title: "FAQ", level: 2 as const },
];

const highlights = [
  {
    icon: Code2,
    title: "You own the code",
    body: "Components are copied into your codebase. Edit, rename, delete — no negotiation with a package.",
  },
  {
    icon: Sparkles,
    title: "Tailwind native",
    body: "Utility-first styling. No CSS-in-JS runtime. Predictable, inspectable, purgeable.",
  },
  {
    icon: Palette,
    title: "HSL theming",
    body: "Every color is a CSS variable. Swap entire themes in one file. Dark mode included.",
  },
  {
    icon: Shield,
    title: "Accessible by default",
    body: "Built on Radix primitives. WCAG 2.1 AA. Keyboard-first. Tested with jest-axe.",
  },
  {
    icon: Terminal,
    title: "Delightful CLI",
    body: "`craftui add button` — resolves deps, detects your framework, updates Tailwind config.",
  },
  {
    icon: Zap,
    title: "Zero runtime",
    body: "Tree-shakable by design — you literally ship only the components you copied in.",
  },
];

const boxItems = [
  {
    label: "Components",
    value: "35+",
    body: "Button, Input, Dialog, Form, Combobox, Table, Toast, Calendar, DatePicker, Command, and more.",
  },
  {
    label: "CLI commands",
    value: "7",
    body: "init, add, remove, list, diff, upgrade, theme — everything scripted and scriptable.",
  },
  {
    label: "Preset themes",
    value: "11",
    body: "slate, zinc, stone, neutral, gray, red, rose, orange, green, blue, violet.",
  },
  {
    label: "Form primitives",
    value: "Zod + RHF",
    body: "Typed forms from the ground up, with schema validation wired in.",
  },
];

export default function IntroductionPage() {
  return (
    <DocsPage toc={toc}>
      <DocsHeader
        breadcrumbs={[
          { title: "Docs", href: "/docs" },
          { title: "Introduction" },
        ]}
        title="Components you own. Production-ready from day one."
        description="CraftUI is a collection of beautifully designed, accessible React components styled with Tailwind CSS. Components are copied into your project, not imported from a package — so you own the code."
      />

      <div className="mt-6 flex flex-wrap items-center gap-2">
        <Badge variant="secondary">v0.1</Badge>
        <Badge variant="outline">35+ components</Badge>
        <Badge variant="outline">MIT Licensed</Badge>
      </div>

      <div className="mt-8 flex flex-wrap gap-3">
        <Button asChild>
          <Link href="/docs/installation">
            Install CraftUI
            <ArrowRight className="h-4 w-4" />
          </Link>
        </Button>
        <Button variant="outline" asChild>
          <Link href="/docs/components">Browse components</Link>
        </Button>
      </div>

      <section id="features" className="mt-16 scroll-mt-20">
        <SectionHeading>Features</SectionHeading>
        <div className="mt-6 grid gap-px overflow-hidden rounded-xl border bg-border sm:grid-cols-2">
          {highlights.map((h) => (
            <div
              key={h.title}
              className="flex flex-col bg-background p-5 transition-colors hover:bg-muted/40"
            >
              <div className="flex h-9 w-9 items-center justify-center rounded-md border bg-muted/50">
                <h.icon className="h-4 w-4" />
              </div>
              <h3 className="mt-4 text-sm font-semibold tracking-tight">
                {h.title}
              </h3>
              <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                {h.body}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section id="why-copy-paste" className="mt-16 scroll-mt-20">
        <SectionHeading>Why copy-paste instead of a package?</SectionHeading>
        <p className="mt-4 leading-relaxed text-muted-foreground">
          Traditional component libraries hide implementation behind a version
          number. When you need to tweak a component — a particular hover
          state, a specific animation, a new variant — you&apos;re negotiating
          with the library maintainers through config options, CSS overrides,
          or forks. CraftUI skips all of that. The source is yours.
        </p>

        <div className="mt-6 overflow-hidden rounded-xl border">
          <div className="grid sm:grid-cols-2">
            <div className="border-r bg-muted/30 p-6">
              <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Other libraries
              </div>
              <p className="mt-3 font-mono text-sm leading-relaxed text-muted-foreground">
                <span className="text-foreground">you</span>
                {" → "}import
                {" → "}
                <span className="text-foreground">library</span>
                {" → "}
                black box
                {" → "}rendered UI
              </p>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                A version upgrade away from breakage. Customization through
                config and CSS overrides.
              </p>
            </div>
            <div className="p-6">
              <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                CraftUI
              </div>
              <p className="mt-3 font-mono text-sm leading-relaxed">
                <span className="text-foreground">you</span>
                {" → "}CLI{" → "}
                <span className="text-foreground">source code</span>
                {" → "}
                <span className="text-foreground">your UI</span>
              </p>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                The component is a file in your repo. Change anything. Version
                it with your app.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="quick-install" className="mt-16 scroll-mt-20">
        <SectionHeading>Quick install</SectionHeading>
        <p className="mt-4 text-sm text-muted-foreground">
          Initialize CraftUI in your project. The CLI detects Next.js / Vite /
          Remix / CRA, installs dependencies, and writes a{" "}
          <code>craftui.config.json</code>.
        </p>

        <PackageManagerTabs npx="craftui@latest init" />

        <p className="mt-6 text-sm text-muted-foreground">
          Then add the components you need:
        </p>
        <PackageManagerTabs npx="craftui@latest add button card input" />

        <Callout variant="tip" title="That's it">
          Import the component from <code>@/components/ui/button</code> and
          start building. No provider to wrap, no theme to configure — the CLI
          already set up the CSS variables and Tailwind config.
        </Callout>
      </section>

      <section id="whats-in-the-box" className="mt-16 scroll-mt-20">
        <SectionHeading>What&apos;s in the box</SectionHeading>
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          {boxItems.map((item) => (
            <div
              key={item.label}
              className="rounded-xl border bg-background p-5"
            >
              <div className="flex items-baseline justify-between">
                <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  {item.label}
                </p>
                <p className="font-mono text-2xl font-semibold tracking-tight">
                  {item.value}
                </p>
              </div>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {item.body}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-16">
        <SectionHeading>Using a component</SectionHeading>
        <p className="mt-4 text-sm text-muted-foreground">
          Once installed, components live in <code>@/components/ui</code> and
          are imported like any other module:
        </p>
        <div className="mt-4">
          <CodeBlock
            code={`import { Button } from "@/components/ui/button";

export function Example() {
  return <Button variant="outline">Click me</Button>;
}`}
          />
        </div>
      </section>

      <section id="built-on" className="mt-16 scroll-mt-20">
        <SectionHeading>Built on the shoulders of giants</SectionHeading>
        <p className="mt-4 leading-relaxed text-muted-foreground">
          CraftUI stands on the work of the best open-source projects in the
          ecosystem.
        </p>
        <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {[
            { name: "Radix UI", role: "Accessible primitives" },
            { name: "Tailwind CSS", role: "Utility-first styling" },
            { name: "class-variance-authority", role: "Typed variants" },
            { name: "React Hook Form", role: "Form state" },
            { name: "Zod", role: "Schema validation" },
            { name: "shadcn/ui", role: "Copy-paste philosophy" },
          ].map((t) => (
            <div
              key={t.name}
              className="flex items-start gap-3 rounded-lg border bg-background p-4"
            >
              <Package className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" />
              <div>
                <div className="text-sm font-semibold">{t.name}</div>
                <div className="text-xs text-muted-foreground">{t.role}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section id="faq" className="mt-16 scroll-mt-20">
        <SectionHeading>FAQ</SectionHeading>
        <div className="mt-6 space-y-6">
          <Faq q="Do I need Tailwind CSS?">
            Yes. CraftUI components are styled exclusively with Tailwind
            utilities. The <code>craftui init</code> command will install
            Tailwind and configure it for you.
          </Faq>
          <Faq q="Is CraftUI a fork of shadcn/ui?">
            No. CraftUI is independently built but follows the same
            copy-paste philosophy, which shadcn popularized. We credit them
            proudly.
          </Faq>
          <Faq q="Can I use it with React Server Components?">
            Yes. Interactive components are marked{" "}
            <code>&quot;use client&quot;</code>. Pure presentational
            components render as server components.
          </Faq>
          <Faq q="Does it support mobile / React Native?">
            Not today — CraftUI targets the web. A React Native port may
            happen in v3.
          </Faq>
          <Faq q="How do I contribute?">
            Open an issue or PR on GitHub. Component requests welcome.
          </Faq>
        </div>
      </section>

      <DocsPageNav
        next={{ title: "Installation", href: "/docs/installation" }}
      />
    </DocsPage>
  );
}

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-2xl font-semibold tracking-tight">{children}</h2>
  );
}

function Faq({ q, children }: { q: string; children: React.ReactNode }) {
  return (
    <div>
      <h3 className="text-base font-semibold tracking-tight">{q}</h3>
      <p className="mt-2 leading-relaxed text-muted-foreground">{children}</p>
    </div>
  );
}
