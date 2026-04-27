import Link from "next/link";
import { listRegistry } from "@craftui/registry";
import { Badge } from "@craftui/ui";
import { ArrowRight } from "lucide-react";
import { DocsHeader } from "@/components/docs/docs-header";
import { DocsPage } from "@/components/docs/docs-page";
import { DocsPageNav } from "@/components/docs/docs-page-nav";
import { listComponentDocs } from "@/lib/component-docs";

export const metadata = {
  title: "Components",
  description: "All CraftUI components with live previews and install commands.",
};

const CATEGORY_ORDER = [
  "inputs",
  "forms",
  "overlay",
  "navigation",
  "display",
  "feedback",
  "layout",
  "theming",
] as const;

export default function ComponentsIndexPage() {
  const registry = listRegistry();
  const docs = new Map(listComponentDocs().map((d) => [d.name, d]));

  const byCategory = registry.reduce<Record<string, typeof registry>>(
    (acc, entry) => {
      const cat = entry.category;
      if (!acc[cat]) acc[cat] = [];
      acc[cat]!.push(entry);
      return acc;
    },
    {}
  );

  const categories: string[] = [
    ...CATEGORY_ORDER.filter((c) => byCategory[c]),
    ...Object.keys(byCategory).filter(
      (c) => !CATEGORY_ORDER.includes(c as (typeof CATEGORY_ORDER)[number])
    ),
  ];

  const toc = categories.map((c) => ({
    id: c,
    title: c.charAt(0).toUpperCase() + c.slice(1),
    level: 2 as const,
  }));

  return (
    <DocsPage toc={toc}>
      <DocsHeader
        breadcrumbs={[
          { title: "Docs", href: "/docs" },
          { title: "Components" },
        ]}
        title="The library"
        description={`${registry.length} accessible, Tailwind-native components. Click any card to see usage, installation, examples, and the full API.`}
      />

      <div className="mt-6 flex items-center gap-2">
        <Badge variant="secondary">{registry.length} components</Badge>
        <Badge variant="outline">{categories.length} categories</Badge>
      </div>

      <div className="mt-12 space-y-14">
        {categories.map((category) => {
          const items = byCategory[category]!.slice().sort((a, b) =>
            a.name.localeCompare(b.name)
          );
          return (
            <section
              key={category}
              id={category}
              className="scroll-mt-20"
            >
              <div className="mb-5 flex items-baseline justify-between">
                <h2 className="text-lg font-semibold capitalize tracking-tight">
                  {category}
                </h2>
                <span className="text-xs text-muted-foreground">
                  {items.length}{" "}
                  {items.length === 1 ? "component" : "components"}
                </span>
              </div>
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-2">
                {items.map((entry) => {
                  const doc = docs.get(entry.name);
                  const name = doc?.title ?? toTitle(entry.name);
                  return (
                    <Link
                      key={entry.name}
                      href={`/docs/components/${entry.name}`}
                      className="group flex flex-col rounded-lg border bg-background p-4 transition-all hover:border-foreground/20 hover:shadow-sm"
                    >
                      <div className="flex items-center justify-between">
                        <h3 className="text-sm font-semibold tracking-tight">
                          {name}
                        </h3>
                        <ArrowRight className="h-3.5 w-3.5 text-muted-foreground opacity-0 transition-all group-hover:translate-x-0.5 group-hover:opacity-100" />
                      </div>
                      <p className="mt-1 line-clamp-2 text-xs text-muted-foreground">
                        {doc?.description ?? entry.description}
                      </p>
                      <div className="mt-3 flex items-center gap-2 font-mono text-[10px] text-muted-foreground">
                        <span className="rounded border bg-muted/50 px-1.5 py-0.5">
                          craftui add {entry.name}
                        </span>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </section>
          );
        })}
      </div>

      <DocsPageNav
        prev={{ title: "Dark mode", href: "/docs/dark-mode" }}
        next={{ title: "Button", href: "/docs/components/button" }}
      />
    </DocsPage>
  );
}

function toTitle(name: string) {
  return name
    .split("-")
    .map((p) => p.charAt(0).toUpperCase() + p.slice(1))
    .join(" ");
}
