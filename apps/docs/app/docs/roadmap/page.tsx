import { Badge } from "@craftui/ui";
import { CheckCircle2, CircleDashed, CircleDot } from "lucide-react";
import { DocsHeader } from "@/components/docs/docs-header";
import { DocsPage } from "@/components/docs/docs-page";

export const metadata = {
  title: "Roadmap",
  description: "What's shipped, what's in flight, and what comes next.",
};

type Status = "done" | "in-progress" | "planned";

interface Milestone {
  version: string;
  title: string;
  description: string;
  status: Status;
  items: { label: string; status: Status }[];
}

const milestones: Milestone[] = [
  {
    version: "V1 — Foundation",
    title: "Production-ready, publishable",
    description:
      "The core library, CLI, and docs. Everything you need to start using CraftUI in real projects.",
    status: "in-progress",
    items: [
      { label: "Turborepo + pnpm monorepo", status: "done" },
      { label: "35+ accessible components", status: "done" },
      { label: "CSS variable theming + dark mode", status: "done" },
      { label: "`craftui init` and `craftui add`", status: "done" },
      { label: "React Hook Form + Zod forms", status: "done" },
      { label: "Vitest + jest-axe test harness", status: "done" },
      { label: "Publish `craftui` to npm", status: "in-progress" },
      { label: "Full docs site with per-component MDX", status: "in-progress" },
    ],
  },
  {
    version: "V2 — Intelligence Layer",
    title: "From library to developer tool",
    description:
      "Make the CLI smarter and the docs richer. Extract CraftUI from the shadow of shadcn/ui.",
    status: "planned",
    items: [
      { label: "`craftui diff` command", status: "done" },
      { label: "`craftui upgrade` command", status: "done" },
      { label: "Theme generator from brand color", status: "done" },
      { label: "VS Code extension (autocomplete + previews)", status: "planned" },
      { label: "Live component playground in-docs (editable)", status: "planned" },
      { label: "Per-component variant generator", status: "planned" },
      { label: "Data table + async Combobox + File Upload", status: "planned" },
    ],
  },
  {
    version: "V3 — Autonomous System",
    title: "AI-powered, team-level",
    description:
      "Tooling that teams reach for first — from scaffolding whole pages to syncing design tokens from Figma.",
    status: "planned",
    items: [
      { label: "AI component generator (prompt → code)", status: "planned" },
      { label: "Page templates (Auth, Dashboard, CRUD)", status: "planned" },
      { label: "Team-private component registries", status: "planned" },
      { label: "Figma design token sync", status: "planned" },
      { label: "CraftUI Pro tier", status: "planned" },
    ],
  },
];

function StatusIcon({ status }: { status: Status }) {
  if (status === "done") return <CheckCircle2 className="h-4 w-4 text-success" />;
  if (status === "in-progress")
    return <CircleDot className="h-4 w-4 text-warning" />;
  return <CircleDashed className="h-4 w-4 text-muted-foreground" />;
}

function StatusBadge({ status }: { status: Status }) {
  if (status === "done") return <Badge variant="success">Done</Badge>;
  if (status === "in-progress") return <Badge variant="warning">In progress</Badge>;
  return <Badge variant="outline">Planned</Badge>;
}

export default function RoadmapPage() {
  const toc = milestones.map((m) => ({
    id: m.version.replace(/\s+/g, "-").toLowerCase(),
    title: m.version,
    level: 2 as const,
  }));

  return (
    <DocsPage toc={toc}>
      <DocsHeader
        breadcrumbs={[
          { title: "Docs", href: "/docs" },
          { title: "Roadmap" },
        ]}
        title="Where we're headed"
        description="A living document. Items move between states as we ship. Have a request? Open an issue on GitHub and tell us what's missing."
      />

      <div className="mt-14 space-y-14">
        {milestones.map((m) => (
          <section
            key={m.version}
            id={m.version.replace(/\s+/g, "-").toLowerCase()}
            className="scroll-mt-20"
          >
            <div className="flex flex-wrap items-center gap-3">
              <h2 className="text-2xl font-semibold tracking-tight">
                {m.version}
              </h2>
              <StatusBadge status={m.status} />
            </div>
            <p className="mt-2 text-lg text-muted-foreground">{m.title}</p>
            <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
              {m.description}
            </p>

            <ul className="mt-6 divide-y divide-border overflow-hidden rounded-lg border bg-background">
              {m.items.map((item) => (
                <li
                  key={item.label}
                  className="flex items-center gap-3 px-4 py-3 text-sm"
                >
                  <StatusIcon status={item.status} />
                  <span
                    className={
                      item.status === "done"
                        ? "flex-1 text-muted-foreground line-through"
                        : "flex-1"
                    }
                  >
                    {item.label}
                  </span>
                  <span className="hidden text-xs text-muted-foreground sm:inline">
                    {item.status === "done"
                      ? "shipped"
                      : item.status === "in-progress"
                        ? "in flight"
                        : "up next"}
                  </span>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </DocsPage>
  );
}
