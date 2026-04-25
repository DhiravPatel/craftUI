import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";

export interface DocsPageNavLink {
  title: string;
  href: string;
}

export function DocsPageNav({
  prev,
  next,
}: {
  prev?: DocsPageNavLink;
  next?: DocsPageNavLink;
}) {
  if (!prev && !next) return null;

  return (
    <nav className="mt-20 grid grid-cols-2 gap-4 border-t pt-8">
      <div>
        {prev ? (
          <Link
            href={prev.href}
            className="group flex flex-col rounded-lg border bg-background p-4 transition-colors hover:bg-accent/50"
          >
            <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <ArrowLeft className="h-3 w-3 transition-transform group-hover:-translate-x-0.5" />
              Previous
            </span>
            <span className="mt-1.5 text-sm font-semibold tracking-tight">
              {prev.title}
            </span>
          </Link>
        ) : null}
      </div>
      <div>
        {next ? (
          <Link
            href={next.href}
            className="group flex flex-col items-end rounded-lg border bg-background p-4 text-right transition-colors hover:bg-accent/50"
          >
            <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
              Next
              <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
            </span>
            <span className="mt-1.5 text-sm font-semibold tracking-tight">
              {next.title}
            </span>
          </Link>
        ) : null}
      </div>
    </nav>
  );
}
