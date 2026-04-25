import { Callout } from "@/components/docs/callout";
import { CodeBlock } from "@/components/docs/code-block";
import { DocsHeader } from "@/components/docs/docs-header";
import { DocsPage } from "@/components/docs/docs-page";
import { DocsPageNav } from "@/components/docs/docs-page-nav";
import { PackageManagerTabs } from "@/components/docs/package-manager-tabs";

export const metadata = { title: "Theming" };

const toc = [
  { id: "variables", title: "CSS variables", level: 2 as const },
  { id: "tailwind", title: "Tailwind mapping", level: 2 as const },
  { id: "tokens", title: "Token inspector", level: 2 as const },
  { id: "presets", title: "Preset themes", level: 2 as const },
  { id: "custom", title: "Custom theme from hex", level: 2 as const },
];

const presets = [
  { name: "slate", color: "hsl(221.2 83.2% 53.3%)" },
  { name: "zinc", color: "hsl(240 5.9% 10%)" },
  { name: "stone", color: "hsl(24 5.4% 63.9%)" },
  { name: "neutral", color: "hsl(0 0% 9%)" },
  { name: "gray", color: "hsl(220.9 39.3% 11%)" },
  { name: "red", color: "hsl(0 72.2% 50.6%)" },
  { name: "rose", color: "hsl(346.8 77.2% 49.8%)" },
  { name: "orange", color: "hsl(24.6 95% 53.1%)" },
  { name: "green", color: "hsl(142.1 76.2% 36.3%)" },
  { name: "blue", color: "hsl(221.2 83.2% 53.3%)" },
  { name: "violet", color: "hsl(262.1 83.3% 57.8%)" },
];

const tokens = [
  ["background", "Page background"],
  ["foreground", "Default text color"],
  ["card", "Surface background"],
  ["popover", "Popovers, dropdowns"],
  ["primary", "Primary brand color"],
  ["secondary", "Secondary surfaces"],
  ["muted", "Muted surfaces"],
  ["accent", "Hover surfaces"],
  ["destructive", "Destructive actions"],
  ["success", "Success state"],
  ["warning", "Warning state"],
  ["border", "Borders"],
  ["input", "Input borders"],
  ["ring", "Focus rings"],
];

export default function ThemingPage() {
  return (
    <DocsPage toc={toc}>
      <DocsHeader
        breadcrumbs={[
          { title: "Docs", href: "/docs" },
          { title: "Theming" },
        ]}
        title="Theming"
        description="CraftUI uses HSL CSS variables so you can swap an entire theme in a single file. Every color is referenced as hsl(var(--color)) in Tailwind."
      />

      <section id="variables" className="mt-12 scroll-mt-20">
        <h2 className="text-2xl font-semibold tracking-tight">
          CSS variables
        </h2>
        <p className="mt-3 text-muted-foreground">
          CraftUI ships its theme as HSL triplets — no <code>hsl()</code>{" "}
          wrapper. This lets Tailwind build alpha variants on the fly:
        </p>
        <CodeBlock
          className="mt-4"
          language="css"
          code={`@layer base {
  :root {
    --background: 0 0% 100%;
    --foreground: 240 10% 3.9%;
    --primary: 240 5.9% 10%;
    --primary-foreground: 0 0% 98%;
    --destructive: 0 84.2% 60.2%;
    --border: 240 5.9% 90%;
    --ring: 240 5.9% 10%;
    --radius: 0.5rem;
  }

  .dark {
    --background: 240 10% 3.9%;
    --foreground: 0 0% 98%;
    /* … */
  }
}`}
        />
        <Callout variant="tip" title="Alpha compositing">
          Because the variable stores the HSL components (not the full color),
          you can write <code>bg-primary/50</code> and Tailwind composes{" "}
          <code>hsl(var(--primary) / 0.5)</code> for you.
        </Callout>
      </section>

      <section id="tailwind" className="mt-14 scroll-mt-20">
        <h2 className="text-2xl font-semibold tracking-tight">
          Tailwind mapping
        </h2>
        <p className="mt-3 text-muted-foreground">
          The Tailwind config maps every variable to a utility:
        </p>
        <CodeBlock
          className="mt-4"
          code={`// tailwind.config.ts
import type { Config } from "tailwindcss";

export default {
  theme: {
    extend: {
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        // … rest
      },
    },
  },
} satisfies Config;`}
        />
      </section>

      <section id="tokens" className="mt-14 scroll-mt-20">
        <h2 className="text-2xl font-semibold tracking-tight">
          Token inspector
        </h2>
        <p className="mt-3 text-muted-foreground">
          Every design token in the current theme. Toggle the header theme
          switch to see the dark palette.
        </p>
        <div className="mt-6 grid gap-3 sm:grid-cols-2 md:grid-cols-3">
          {tokens.map(([name, desc]) => (
            <div
              key={name}
              className="overflow-hidden rounded-lg border bg-background"
            >
              <div
                className="h-12 border-b"
                style={{ background: `hsl(var(--${name}))` }}
              />
              <div className="p-3">
                <div className="font-mono text-xs">--{name}</div>
                <div className="mt-1 text-xs text-muted-foreground">
                  {desc}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section id="presets" className="mt-14 scroll-mt-20">
        <h2 className="text-2xl font-semibold tracking-tight">
          Preset themes
        </h2>
        <p className="mt-3 text-muted-foreground">
          11 curated themes ship with the CLI. Apply one with:
        </p>
        <PackageManagerTabs npx="craftui@latest theme apply violet" />

        <div className="mt-6 grid gap-3 sm:grid-cols-3 md:grid-cols-4">
          {presets.map((p) => (
            <div
              key={p.name}
              className="flex items-center gap-3 rounded-lg border bg-background p-3"
            >
              <span
                className="h-8 w-8 rounded-md border"
                style={{ background: p.color }}
              />
              <div>
                <div className="font-mono text-sm font-medium capitalize">
                  {p.name}
                </div>
                <div className="font-mono text-[10px] text-muted-foreground">
                  craftui theme apply {p.name}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section id="custom" className="mt-14 scroll-mt-20">
        <h2 className="text-2xl font-semibold tracking-tight">
          Generate from a hex color
        </h2>
        <p className="mt-3 text-muted-foreground">
          Already have a brand color? Generate a complete theme from it:
        </p>
        <PackageManagerTabs npx='craftui@latest theme generate --color "#7C3AED"' />
        <Callout variant="note">
          The generator produces light + dark HSL triplets and keeps your
          radius, border, and focus-ring rules consistent with the rest of
          CraftUI.
        </Callout>
      </section>

      <DocsPageNav
        prev={{ title: "CLI", href: "/docs/cli" }}
        next={{ title: "Dark mode", href: "/docs/dark-mode" }}
      />
    </DocsPage>
  );
}
