import Link from "next/link";
import { notFound } from "next/navigation";
import { getRegistryEntry, listRegistry } from "@craftui/registry";
import { Badge } from "@craftui/ui";
import { CodeBlock } from "@/components/docs/code-block";
import { ComponentPreview } from "@/components/docs/component-preview";
import { DocsHeader } from "@/components/docs/docs-header";
import { DocsPage } from "@/components/docs/docs-page";
import { DocsPageNav } from "@/components/docs/docs-page-nav";
import { Installation } from "@/components/docs/installation";
import { PropsTable } from "@/components/docs/props-table";
import { getComponentDoc } from "@/lib/component-docs";

export function generateStaticParams() {
  return listRegistry().map((entry) => ({ component: entry.name }));
}

export function generateMetadata({
  params,
}: {
  params: { component: string };
}) {
  const entry = getRegistryEntry(params.component);
  const doc = getComponentDoc(params.component);
  if (!entry) return {};
  return {
    title: doc?.title ?? entry.name,
    description: doc?.description ?? entry.description,
  };
}

export default function ComponentPage({
  params,
}: {
  params: { component: string };
}) {
  const entry = getRegistryEntry(params.component);
  if (!entry) notFound();

  const doc = getComponentDoc(params.component);
  const displayName =
    doc?.title ??
    entry.name
      .split("-")
      .map((p) => p.charAt(0).toUpperCase() + p.slice(1))
      .join(" ");
  const description = doc?.description ?? entry.description;

  // Compute prev/next based on alphabetical order
  const all = listRegistry()
    .slice()
    .sort((a, b) => a.name.localeCompare(b.name));
  const idx = all.findIndex((e) => e.name === entry.name);
  const prev = idx > 0 ? all[idx - 1] : null;
  const next = idx < all.length - 1 ? all[idx + 1] : null;

  // Build TOC
  const toc: { id: string; title: string; level: 2 }[] = [
    { id: "installation", title: "Installation", level: 2 },
  ];
  if (doc?.imports || doc?.usage)
    toc.push({ id: "usage", title: "Usage", level: 2 });
  if (doc?.examples && doc.examples.length > 0)
    toc.push({ id: "examples", title: "Examples", level: 2 });
  if (doc?.props && doc.props.length > 0)
    toc.push({ id: "api", title: "API Reference", level: 2 });
  if (doc?.related && doc.related.length > 0)
    toc.push({ id: "related", title: "Related", level: 2 });

  return (
    <DocsPage toc={toc}>
      <DocsHeader
        breadcrumbs={[
          { title: "Docs", href: "/docs" },
          { title: "Components", href: "/docs/components" },
          { title: displayName },
        ]}
        title={displayName}
        description={description}
      />

      <div className="mt-6 flex flex-wrap items-center gap-2">
        <Badge variant="secondary">{entry.category}</Badge>
        <Badge variant="outline" className="font-mono text-[10px]">
          components/ui/{entry.name}.tsx
        </Badge>
      </div>

      {doc?.defaultExample ? (
        <div className="mt-10">
          <ComponentPreview
            name={entry.name}
            codeBlock={<CodeBlock code={doc.defaultExample.code} />}
          >
            {doc.defaultExample.render}
          </ComponentPreview>
        </div>
      ) : null}

      <Section id="installation" title="Installation">
        <Installation
          component={entry.name}
          dependencies={entry.dependencies}
          importBlock={
            <CodeBlock
              code={
                doc?.imports ??
                `// Import from @/components/ui/${entry.name}`
              }
            />
          }
        />
      </Section>

      {doc?.imports || doc?.usage ? (
        <Section id="usage" title="Usage">
          <div className="space-y-4">
            {doc.imports ? <CodeBlock code={doc.imports} /> : null}
            {doc.usage ? <CodeBlock code={doc.usage} /> : null}
          </div>
        </Section>
      ) : null}

      {doc?.examples && doc.examples.length > 0 ? (
        <Section id="examples" title="Examples">
          <div className="space-y-10">
            {doc.examples.map((ex) => (
              <div key={ex.title}>
                <h3 className="text-lg font-semibold tracking-tight">
                  {ex.title}
                </h3>
                {ex.description ? (
                  <p className="mt-1 text-sm text-muted-foreground">
                    {ex.description}
                  </p>
                ) : null}
                <div className="mt-4">
                  <ComponentPreview
                    name={`${entry.name}-${ex.title}`}
                    codeBlock={<CodeBlock code={ex.code} />}
                  >
                    {ex.render}
                  </ComponentPreview>
                </div>
              </div>
            ))}
          </div>
        </Section>
      ) : null}

      {doc?.props && doc.props.length > 0 ? (
        <Section id="api" title="API Reference">
          <p className="text-sm text-muted-foreground">
            Props for <code>&lt;{displayName.replace(/\s/g, "")} /&gt;</code>.
          </p>
          <PropsTable props={doc.props} />
        </Section>
      ) : null}

      {doc?.related && doc.related.length > 0 ? (
        <Section id="related" title="Related">
          <div className="flex flex-wrap gap-2">
            {doc.related.map((r) => (
              <Link
                key={r}
                href={`/docs/components/${r}`}
                className="rounded-md border bg-background px-3 py-1.5 text-sm font-medium transition-colors hover:bg-accent"
              >
                {r}
              </Link>
            ))}
          </div>
        </Section>
      ) : null}

      <DocsPageNav
        prev={
          prev
            ? {
                title:
                  getComponentDoc(prev.name)?.title ?? toTitle(prev.name),
                href: `/docs/components/${prev.name}`,
              }
            : { title: "All components", href: "/docs/components" }
        }
        next={
          next
            ? {
                title:
                  getComponentDoc(next.name)?.title ?? toTitle(next.name),
                href: `/docs/components/${next.name}`,
              }
            : undefined
        }
      />
    </DocsPage>
  );
}

function Section({
  id,
  title,
  children,
}: {
  id: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mt-14 scroll-mt-20" id={id}>
      <h2 className="text-2xl font-semibold tracking-tight">{title}</h2>
      <div className="mt-4">{children}</div>
    </section>
  );
}

function toTitle(name: string) {
  return name
    .split("-")
    .map((p) => p.charAt(0).toUpperCase() + p.slice(1))
    .join(" ");
}
