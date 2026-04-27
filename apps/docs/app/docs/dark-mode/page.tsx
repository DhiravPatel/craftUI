import { Callout } from "@/components/docs/callout";
import { CodeBlock } from "@/components/docs/code-block";
import { DocsHeader } from "@/components/docs/docs-header";
import { DocsPage } from "@/components/docs/docs-page";
import { DocsPageNav } from "@/components/docs/docs-page-nav";
import { PackageManagerTabs } from "@/components/docs/package-manager-tabs";

export const metadata = { title: "Dark Mode" };

const toc = [
  { id: "install", title: "Install the provider", level: 2 as const },
  { id: "setup", title: "Wrap your app", level: 2 as const },
  { id: "toggle", title: "Build a toggle", level: 2 as const },
  { id: "hydration", title: "Avoid FOUC", level: 2 as const },
];

export default function DarkModePage() {
  return (
    <DocsPage toc={toc}>
      <DocsHeader
        breadcrumbs={[
          { title: "Docs", href: "/docs" },
          { title: "Dark Mode" },
        ]}
        title="Dark Mode"
        description="CraftUI ships a ready-made ThemeProvider that handles light / dark / system modes with localStorage persistence and no flash of unstyled content."
      />

      <section id="install" className="mt-12 scroll-mt-20">
        <h2 className="text-2xl font-semibold tracking-tight">
          Install the provider
        </h2>
        <p className="mt-3 text-muted-foreground">
          Add the theme provider component to your project:
        </p>
        <PackageManagerTabs npx="craftui@latest add theme-provider" />
      </section>

      <section id="setup" className="mt-14 scroll-mt-20">
        <h2 className="text-2xl font-semibold tracking-tight">Wrap your app</h2>
        <p className="mt-3 text-muted-foreground">
          In Next.js App Router, render it in <code>app/layout.tsx</code>:
        </p>
        <CodeBlock
          code={`import { ThemeProvider } from "@/components/ui/theme-provider";

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider defaultTheme="system">{children}</ThemeProvider>
      </body>
    </html>
  );
}`}
        />
        <Callout variant="warning" title="suppressHydrationWarning">
          Set <code>suppressHydrationWarning</code> on the{" "}
          <code>&lt;html&gt;</code> element. Without it, React will warn about
          the <code>class=&quot;dark&quot;</code> mismatch between server and
          client renders.
        </Callout>
      </section>

      <section id="toggle" className="mt-14 scroll-mt-20">
        <h2 className="text-2xl font-semibold tracking-tight">
          Build a toggle
        </h2>
        <p className="mt-3 text-muted-foreground">
          Any client component can read and set the theme using the{" "}
          <code>useTheme</code> hook:
        </p>
        <CodeBlock
          code={`"use client";

import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/components/ui/theme-provider";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
    >
      <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}`}
        />
      </section>

      <section id="hydration" className="mt-14 scroll-mt-20">
        <h2 className="text-2xl font-semibold tracking-tight">Avoid FOUC</h2>
        <p className="mt-3 text-muted-foreground">
          The <code>ThemeProvider</code> writes the theme class on the{" "}
          <code>&lt;html&gt;</code> element during the first render on the
          client. For pages rendered on the server, this means the initial
          paint uses <code>defaultTheme</code>. If you need no-flash dark mode
          on first paint, inject a tiny script before React hydrates.
        </p>
        <Callout variant="note">
          For most apps the <code>ThemeProvider</code> alone is good enough —
          add an inline <code>&lt;script&gt;</code> that reads{" "}
          <code>localStorage</code> only if you see a noticeable flicker.
        </Callout>
      </section>

      <DocsPageNav
        prev={{ title: "Theming", href: "/docs/theming" }}
        next={{ title: "All components", href: "/docs/components" }}
      />
    </DocsPage>
  );
}
