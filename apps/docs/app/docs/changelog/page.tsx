import { Badge } from "@craftui/ui";
import { DocsHeader } from "@/components/docs/docs-header";
import { DocsPage } from "@/components/docs/docs-page";

export const metadata = {
  title: "Changelog",
  description: "Release notes for CraftUI.",
};

interface Release {
  version: string;
  date: string;
  tag?: "latest" | "beta" | "stable";
  title: string;
  sections: {
    label: "Added" | "Changed" | "Fixed" | "Removed";
    items: string[];
  }[];
}

const releases: Release[] = [
  {
    version: "0.1.0",
    date: "2026-04-25",
    tag: "latest",
    title: "Initial public release",
    sections: [
      {
        label: "Added",
        items: [
          "35+ accessible, Tailwind-native components (Button, Input, Dialog, Form, Table, Toast, Calendar, DatePicker, Command, Combobox…)",
          "Delightful CLI with `init`, `add`, `remove`, `list`, `diff`, `upgrade`, and `theme` commands",
          "Framework auto-detection for Next.js, Vite, Remix, and CRA",
          "11 preset themes + hex-to-theme generator",
          "React Hook Form + Zod `<Form />` primitives",
          "`<ThemeProvider />` with light / dark / system support",
          "Full TypeScript + CVA variant typing",
          "Vitest + jest-axe test harness",
        ],
      },
    ],
  },
];

export default function ChangelogPage() {
  const toc = releases.map((r) => ({
    id: `v${r.version}`,
    title: `v${r.version}`,
    level: 2 as const,
  }));

  return (
    <DocsPage toc={toc}>
      <DocsHeader
        breadcrumbs={[
          { title: "Docs", href: "/docs" },
          { title: "Changelog" },
        ]}
        title="What's new"
        description="Every user-visible change we ship. Following SemVer and Changesets — one line per change, no marketing fluff."
      />

      <div className="mt-14 space-y-14">
        {releases.map((r) => (
          <section
            key={r.version}
            id={`v${r.version}`}
            className="relative scroll-mt-20"
          >
            <div className="sticky top-16 z-10 -mx-4 flex items-center gap-3 border-b bg-background/80 px-4 py-4 backdrop-blur-xl">
              <h2 className="font-mono text-2xl font-semibold tracking-tight">
                v{r.version}
              </h2>
              {r.tag === "latest" ? (
                <Badge variant="success">Latest</Badge>
              ) : r.tag ? (
                <Badge variant="secondary">{r.tag}</Badge>
              ) : null}
              <span className="ml-auto font-mono text-xs text-muted-foreground">
                {r.date}
              </span>
            </div>

            <div className="mt-6 space-y-6">
              <p className="text-lg text-muted-foreground">{r.title}</p>
              {r.sections.map((s) => (
                <div key={s.label}>
                  <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    {s.label}
                  </h3>
                  <ul className="mt-3 space-y-2 border-l-2 border-border pl-4">
                    {s.items.map((item) => (
                      <li
                        key={item}
                        className="text-sm leading-relaxed text-foreground"
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>

      <div className="mt-20 rounded-lg border bg-muted/30 p-5 text-sm text-muted-foreground">
        Follow{" "}
        <a
          href="https://github.com/craftui/craftui/releases"
          target="_blank"
          rel="noreferrer"
          className="font-medium text-foreground underline decoration-border underline-offset-4 hover:decoration-foreground"
        >
          releases on GitHub
        </a>{" "}
        to get notified about new versions.
      </div>
    </DocsPage>
  );
}
