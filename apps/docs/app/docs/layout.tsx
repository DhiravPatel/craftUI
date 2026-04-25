import { DocsSidebar } from "@/components/layout/docs-sidebar";

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="mx-auto w-full max-w-screen-2xl flex-1 px-4 md:grid md:grid-cols-[240px_minmax(0,1fr)] md:gap-10 lg:px-8">
      {/* Outer aside fills its grid cell naturally (same height as the main
          content). The inner div is the sticky, viewport-height sidebar —
          this keeps the sidebar bounded inside the grid so it never leaks
          over the footer. */}
      <aside className="hidden md:block">
        <div className="sticky top-14 h-[calc(100vh-3.5rem)] overflow-hidden py-2">
          <DocsSidebar />
        </div>
      </aside>

      <main className="relative min-w-0 py-10 xl:py-12">{children}</main>
    </div>
  );
}
