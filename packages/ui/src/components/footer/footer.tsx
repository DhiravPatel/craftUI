import * as React from "react";
import { cn } from "../../lib/cn";

export interface FooterLink {
  label: React.ReactNode;
  href: string;
}

export interface FooterColumn {
  title: React.ReactNode;
  links: FooterLink[];
}

export interface FooterProps extends React.HTMLAttributes<HTMLElement> {
  /** Brand mark — typically a logo and/or wordmark. */
  brand?: React.ReactNode;
  /** Copyright/notice rendered below the brand. */
  copyright?: React.ReactNode;
  /** Up to four columns of navigation links. */
  columns?: FooterColumn[];
  /** Giant watermark text rendered behind the footer (decorative). */
  watermark?: React.ReactNode;
  /** Show a top divider rule above the content. Default true. */
  showDivider?: boolean;
}

const Footer = React.forwardRef<HTMLElement, FooterProps>(
  (
    {
      brand,
      copyright,
      columns = [],
      watermark,
      showDivider = true,
      className,
      children,
      ...props
    },
    ref
  ) => {
    return (
      <footer
        ref={ref}
        className={cn("relative overflow-hidden bg-background", className)}
        {...props}
      >
        {showDivider ? (
          <span
            aria-hidden
            className="pointer-events-none absolute left-1/2 top-0 h-px w-[88%] -translate-x-1/2 bg-gradient-to-r from-transparent via-border to-transparent"
          />
        ) : null}

        <div className="relative mx-auto w-full max-w-7xl px-6 pt-16 pb-8">
          <div className="grid gap-12 md:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] md:gap-16">
            {/* Brand column */}
            <div className="flex flex-col gap-4">
              {brand ? <div className="flex items-center gap-2">{brand}</div> : null}
              {copyright ? (
                <p className="text-xs leading-relaxed text-muted-foreground">
                  {copyright}
                </p>
              ) : null}
              {children}
            </div>

            {/* Link columns */}
            {columns.length > 0 ? (
              <div className="grid grid-cols-2 gap-x-10 gap-y-10 sm:grid-cols-4">
                {columns.map((col, i) => (
                  <div key={i}>
                    <p className="text-sm font-semibold tracking-tight">
                      {col.title}
                    </p>
                    <ul className="mt-3 space-y-2.5">
                      {col.links.map((link, j) => (
                        <li key={j}>
                          <a
                            href={link.href}
                            className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                          >
                            {link.label}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            ) : null}
          </div>
        </div>

        {/* Decorative wordmark watermark */}
        {watermark ? (
          <div
            aria-hidden
            className="pointer-events-none relative -mt-4 flex items-end justify-center overflow-hidden pb-2"
          >
            <span
              className="select-none whitespace-nowrap font-bold leading-[0.85] tracking-tighter text-foreground/[0.04]"
              style={{ fontSize: "clamp(96px, 22vw, 320px)" }}
            >
              {watermark}
            </span>
          </div>
        ) : null}
      </footer>
    );
  }
);
Footer.displayName = "Footer";

export { Footer };
