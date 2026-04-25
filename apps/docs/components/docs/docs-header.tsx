import { ChevronRight } from "lucide-react";
import Link from "next/link";

export interface DocsHeaderProps {
  breadcrumbs?: Array<{ title: string; href?: string }>;
  title: string;
  description?: string;
}

export function DocsHeader({
  breadcrumbs,
  title,
  description,
}: DocsHeaderProps) {
  return (
    <header>
      {breadcrumbs && breadcrumbs.length > 0 ? (
        <nav
          className="flex items-center gap-1 text-xs text-muted-foreground"
          aria-label="Breadcrumb"
        >
          {breadcrumbs.map((crumb, i) => (
            <span key={i} className="flex items-center gap-1">
              {crumb.href ? (
                <Link
                  href={crumb.href}
                  className="transition-colors hover:text-foreground"
                >
                  {crumb.title}
                </Link>
              ) : (
                <span className="text-foreground">{crumb.title}</span>
              )}
              {i < breadcrumbs.length - 1 ? (
                <ChevronRight className="h-3 w-3" />
              ) : null}
            </span>
          ))}
        </nav>
      ) : null}
      <h1 className="mt-3 text-balance text-4xl font-semibold tracking-tight md:text-5xl">
        {title}
      </h1>
      {description ? (
        <p className="mt-3 max-w-2xl text-balance text-lg text-muted-foreground">
          {description}
        </p>
      ) : null}
    </header>
  );
}
