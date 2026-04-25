import { Badge } from "@craftui/ui";
import { Callout } from "@/components/docs/callout";
import { CodeBlock } from "@/components/docs/code-block";
import { DocsHeader } from "@/components/docs/docs-header";
import { DocsPage } from "@/components/docs/docs-page";
import { DocsPageNav } from "@/components/docs/docs-page-nav";
import { PackageManagerTabs } from "@/components/docs/package-manager-tabs";

export const metadata = { title: "CLI" };

const commands = [
  { id: "init", title: "init" },
  { id: "add", title: "add" },
  { id: "remove", title: "remove" },
  { id: "list", title: "list" },
  { id: "diff", title: "diff" },
  { id: "upgrade", title: "upgrade" },
  { id: "theme", title: "theme" },
] as const;

const toc = commands.map((c) => ({
  id: c.id,
  title: c.title,
  level: 2 as const,
}));

export default function CliPage() {
  return (
    <DocsPage toc={toc}>
      <DocsHeader
        breadcrumbs={[
          { title: "Docs", href: "/docs" },
          { title: "CLI" },
        ]}
        title="CLI reference"
        description="The craftui CLI is how you install, upgrade, and manage components in your project."
      />

      <Callout variant="info" title="Version">
        <code>craftui@0.1.0</code> — all flags are stable and backwards
        compatible across patch versions.
      </Callout>

      <Command
        id="init"
        title="init"
        description="Initialize CraftUI in your project. Detects your framework, writes craftui.config.json, updates Tailwind config, and injects CSS variables."
      >
        <PackageManagerTabs npx="craftui@latest init" />
        <Flags
          rows={[
            ["-y, --yes", "Accept defaults without prompting"],
            ["--no-install", "Skip installing core dependencies"],
            ["-c, --cwd <path>", "Run against a different directory"],
          ]}
        />
      </Command>

      <Command
        id="add"
        title="add"
        description="Add one or more components to your project. Resolves transitive dependencies automatically."
      >
        <PackageManagerTabs npx="craftui@latest add button input card" />
        <p className="mt-4 text-sm text-muted-foreground">
          Without arguments, opens an interactive multi-select picker.
        </p>
        <Flags
          rows={[
            ["-y, --yes", "Overwrite existing files without prompting"],
            ["--no-install", "Skip installing npm dependencies"],
            ["-p, --path <path>", "Override the components directory"],
            ["-c, --cwd <path>", "Run against a different directory"],
          ]}
        />
      </Command>

      <Command
        id="remove"
        title="remove"
        description="Remove a component from your project. Only deletes the files the CLI originally wrote."
      >
        <PackageManagerTabs npx="craftui@latest remove button" />
        <Flags rows={[["-y, --yes", "Skip confirmation"]]} />
      </Command>

      <Command
        id="list"
        title="list"
        description="List all components available in the registry, grouped by category."
      >
        <PackageManagerTabs npx="craftui@latest list" />
        <Flags
          rows={[
            [
              "--category <name>",
              'Filter to one category: "inputs", "overlay", "navigation"…',
            ],
          ]}
        />
      </Command>

      <Command
        id="diff"
        title="diff"
        description="Show the difference between your local copy of a component and the version in the registry."
      >
        <PackageManagerTabs npx="craftui@latest diff button" />
        <Callout variant="tip">
          Use this to see what&apos;s changed upstream before running{" "}
          <code>upgrade</code>.
        </Callout>
      </Command>

      <Command
        id="upgrade"
        title="upgrade"
        description="Re-install every component in your project to the latest registry version. Asks before overwriting."
      >
        <PackageManagerTabs npx="craftui@latest upgrade" />
        <Flags rows={[["-y, --yes", "Overwrite without confirmation"]]} />
        <Callout variant="warning">
          Your local customizations will be overwritten. Run{" "}
          <code>craftui diff &lt;name&gt;</code> first to see what changes.
        </Callout>
      </Command>

      <Command
        id="theme"
        title="theme"
        description="Generate and apply themes. Swap an entire palette with a single command."
      >
        <div className="space-y-6">
          <SubCommand
            name="theme list"
            body="List the 11 preset themes."
            command="craftui@latest theme list"
          />
          <SubCommand
            name="theme apply <preset>"
            body="Apply a preset theme by name — slate, zinc, stone, neutral, gray, red, rose, orange, green, blue, violet."
            command="craftui@latest theme apply violet"
          />
          <SubCommand
            name="theme generate"
            body="Generate a custom theme from a hex color."
            command='craftui@latest theme generate --color "#7C3AED"'
          />
        </div>

        <p className="mt-6 text-sm text-muted-foreground">
          All variants of <code>theme</code> replace the CSS variable block in
          the stylesheet referenced by <code>tailwind.css</code> in your
          config.
        </p>

        <CodeBlock
          className="mt-4"
          code={`/* globals.css — rewritten by craftui theme apply */
@layer base {
  :root {
    --primary: 262.1 83.3% 57.8%;
    --primary-foreground: 210 40% 98%;
    /* … rest of the theme … */
  }
}`}
        />
      </Command>

      <DocsPageNav
        prev={{ title: "Installation", href: "/docs/installation" }}
        next={{ title: "Theming", href: "/docs/theming" }}
      />
    </DocsPage>
  );
}

function Command({
  id,
  title,
  description,
  children,
}: {
  id: string;
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="mt-14 scroll-mt-20">
      <div className="flex flex-wrap items-center gap-2">
        <h2 className="text-2xl font-semibold tracking-tight">
          <span className="font-mono text-muted-foreground">craftui </span>
          {title}
        </h2>
        <Badge variant="outline" className="font-mono text-[10px]">
          command
        </Badge>
      </div>
      <p className="mt-3 text-muted-foreground">{description}</p>
      <div className="mt-4">{children}</div>
    </section>
  );
}

function SubCommand({
  name,
  body,
  command,
}: {
  name: string;
  body: string;
  command: string;
}) {
  return (
    <div>
      <h3 className="font-mono text-sm font-semibold tracking-tight">
        craftui {name}
      </h3>
      <p className="mt-1.5 text-sm text-muted-foreground">{body}</p>
      <div className="mt-2">
        <PackageManagerTabs npx={command} />
      </div>
    </div>
  );
}

function Flags({ rows }: { rows: [string, string][] }) {
  return (
    <div className="mt-4 overflow-hidden rounded-lg border">
      <table className="w-full text-sm">
        <thead className="bg-muted/50">
          <tr>
            <th className="px-4 py-2 text-left font-medium">Flag</th>
            <th className="px-4 py-2 text-left font-medium">Description</th>
          </tr>
        </thead>
        <tbody>
          {rows.map(([flag, desc]) => (
            <tr key={flag} className="border-t">
              <td className="px-4 py-2 font-mono text-xs">{flag}</td>
              <td className="px-4 py-2 text-muted-foreground">{desc}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
