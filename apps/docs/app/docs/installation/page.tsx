import { Callout } from "@/components/docs/callout";
import { CodeBlock } from "@/components/docs/code-block";
import { DocsHeader } from "@/components/docs/docs-header";
import { DocsPage } from "@/components/docs/docs-page";
import { DocsPageNav } from "@/components/docs/docs-page-nav";
import { PackageManagerTabs } from "@/components/docs/package-manager-tabs";

export const metadata = { title: "Installation" };

const toc = [
  { id: "requirements", title: "Requirements", level: 2 as const },
  { id: "init", title: "Initialize your project", level: 2 as const },
  { id: "add-components", title: "Add components", level: 2 as const },
  { id: "use-components", title: "Use the component", level: 2 as const },
  { id: "frameworks", title: "Framework notes", level: 2 as const },
];

export default function InstallationPage() {
  return (
    <DocsPage toc={toc}>
      <DocsHeader
        breadcrumbs={[
          { title: "Docs", href: "/docs" },
          { title: "Installation" },
        ]}
        title="Installation"
        description="Add CraftUI to an existing React project in under a minute."
      />

      <section id="requirements" className="mt-12 scroll-mt-20">
        <h2 className="text-2xl font-semibold tracking-tight">Requirements</h2>
        <p className="mt-3 text-muted-foreground">
          CraftUI works with any React project that uses Tailwind CSS.
          You&apos;ll need:
        </p>
        <ul className="mt-4 space-y-2 text-sm">
          {[
            ["React 18+", "Required for client components and Suspense"],
            ["Node 18+", "Needed to run the CLI"],
            ["Tailwind CSS 3.4+", "The CLI will install it if missing"],
            [
              "TypeScript (recommended)",
              "Not required, but strongly recommended",
            ],
          ].map(([name, body]) => (
            <li key={name} className="flex items-start gap-3">
              <span className="mt-1.5 inline-flex h-1.5 w-1.5 shrink-0 rounded-full bg-foreground" />
              <span>
                <span className="font-medium">{name}</span>
                <span className="ml-2 text-muted-foreground">— {body}</span>
              </span>
            </li>
          ))}
        </ul>
      </section>

      <section id="init" className="mt-14 scroll-mt-20">
        <h2 className="text-2xl font-semibold tracking-tight">
          Initialize your project
        </h2>
        <p className="mt-3 text-muted-foreground">
          Run the <code>init</code> command in your project root:
        </p>
        <PackageManagerTabs npx="craftui@latest init" />

        <p className="mt-6 text-sm text-muted-foreground">
          The CLI will ask a few questions and then:
        </p>
        <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
          {[
            "Detect your framework (Next.js, Vite, Remix, CRA).",
            "Detect TypeScript and Tailwind.",
            "Write craftui.config.json at the project root.",
            "Create or extend tailwind.config.ts with CraftUI's tokens.",
            "Inject HSL CSS variables into your globals.css.",
            "Create lib/utils.ts with the cn() helper.",
            "Install tailwindcss-animate, class-variance-authority, clsx, tailwind-merge, lucide-react.",
          ].map((line) => (
            <li key={line} className="flex items-start gap-3">
              <span className="mt-2 inline-flex h-1 w-1 shrink-0 rounded-full bg-muted-foreground" />
              <span>{line}</span>
            </li>
          ))}
        </ul>

        <Callout variant="note" title="Skip the prompts">
          Pass <code>-y</code> to accept defaults (slate base color, components
          at <code>@/components/ui</code>, CSS variables enabled).
        </Callout>
      </section>

      <section id="add-components" className="mt-14 scroll-mt-20">
        <h2 className="text-2xl font-semibold tracking-tight">
          Add components
        </h2>
        <p className="mt-3 text-muted-foreground">
          Once initialized, pull in any component by name. The CLI resolves
          transitive dependencies (for example, <code>combobox</code> brings in{" "}
          <code>popover</code>, <code>command</code>, and <code>button</code>).
        </p>
        <PackageManagerTabs npx="craftui@latest add button card input" />

        <p className="mt-6 text-sm text-muted-foreground">
          Run without arguments for an interactive picker:
        </p>
        <PackageManagerTabs npx="craftui@latest add" />

        <Callout variant="tip">
          The CLI writes each component into{" "}
          <code>@/components/ui/&lt;name&gt;.tsx</code> and installs any npm
          dependencies it needs.
        </Callout>
      </section>

      <section id="use-components" className="mt-14 scroll-mt-20">
        <h2 className="text-2xl font-semibold tracking-tight">
          Use the component
        </h2>
        <p className="mt-3 text-muted-foreground">
          Import from the path the CLI used:
        </p>
        <CodeBlock
          code={`import { Button } from "@/components/ui/button";

export function SignInForm() {
  return (
    <form className="space-y-4">
      <Button type="submit" className="w-full">
        Sign in
      </Button>
    </form>
  );
}`}
        />
      </section>

      <section id="frameworks" className="mt-14 scroll-mt-20">
        <h2 className="text-2xl font-semibold tracking-tight">
          Framework notes
        </h2>

        <div className="mt-6 space-y-6">
          <div className="rounded-xl border bg-background p-5">
            <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Next.js (App Router)
            </div>
            <p className="mt-2 text-sm text-muted-foreground">
              Wrap your <code>app/layout.tsx</code> with{" "}
              <code>&lt;ThemeProvider /&gt;</code> and import{" "}
              <code>globals.css</code>. Interactive components are already
              marked <code>&quot;use client&quot;</code>.
            </p>
          </div>

          <div className="rounded-xl border bg-background p-5">
            <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Vite
            </div>
            <p className="mt-2 text-sm text-muted-foreground">
              Import your <code>index.css</code> in <code>main.tsx</code>. The
              CLI places CSS variables there automatically.
            </p>
          </div>

          <div className="rounded-xl border bg-background p-5">
            <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Remix
            </div>
            <p className="mt-2 text-sm text-muted-foreground">
              Add the generated CSS link to your <code>links()</code> export in
              the root route.
            </p>
          </div>
        </div>
      </section>

      <DocsPageNav
        prev={{ title: "Introduction", href: "/docs" }}
        next={{ title: "CLI", href: "/docs/cli" }}
      />
    </DocsPage>
  );
}
