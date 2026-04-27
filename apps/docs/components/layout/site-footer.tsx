import Link from "next/link";
import { Github, Twitter } from "lucide-react";

const columns = [
  {
    title: "Getting Started",
    links: [
      { label: "Introduction", href: "/docs" },
      { label: "Installation", href: "/docs/installation" },
      { label: "CLI", href: "/docs/cli" },
      { label: "Theming", href: "/docs/theming" },
    ],
  },
  {
    title: "Components",
    links: [
      { label: "Button", href: "/docs/components/button" },
      { label: "Input", href: "/docs/components/input" },
      { label: "Dialog", href: "/docs/components/dialog" },
      { label: "Form", href: "/docs/components/form" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "GitHub", href: "https://github.com/craftui/craftui" },
      { label: "Changelog", href: "/docs/changelog" },
      { label: "Roadmap", href: "/docs/roadmap" },
    ],
  },
];

export function SiteFooter() {
  return (
    <footer className="mt-24 border-t">
      <div className="container mx-auto px-4 py-16">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-5">
            <div className="flex items-center gap-2">
              <span className="inline-flex h-6 w-6 items-center justify-center rounded bg-foreground text-background">
                <svg width="12" height="12" viewBox="0 0 14 14" fill="none">
                  <path
                    d="M2 3.5C2 2.67157 2.67157 2 3.5 2H10.5C11.3284 2 12 2.67157 12 3.5V10.5C12 11.3284 11.3284 12 10.5 12H3.5C2.67157 12 2 11.3284 2 10.5V3.5Z"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  />
                  <path d="M2 7H12" stroke="currentColor" strokeWidth="1.5" />
                </svg>
              </span>
              <span className="font-semibold tracking-tight">CraftUI</span>
            </div>
            <p className="mt-4 max-w-sm text-sm text-muted-foreground">
              The developer-owned, Tailwind-native component system for React.
              Accessibility first. Zero runtime. Forever yours.
            </p>
            <div className="mt-6 flex items-center gap-3">
              <a
                href="https://github.com/craftui/craftui"
                target="_blank"
                rel="noreferrer"
                className="text-muted-foreground transition-colors hover:text-foreground"
                aria-label="GitHub"
              >
                <Github className="h-4 w-4" />
              </a>
              <a
                href="https://twitter.com/craftui_dev"
                target="_blank"
                rel="noreferrer"
                className="text-muted-foreground transition-colors hover:text-foreground"
                aria-label="Twitter"
              >
                <Twitter className="h-4 w-4" />
              </a>
            </div>
          </div>
          {columns.map((col) => (
            <div key={col.title} className="md:col-span-2">
              <h3 className="text-sm font-semibold">{col.title}</h3>
              <ul className="mt-4 space-y-2 text-sm">
                {col.links.map((l) => (
                  <li key={l.href}>
                    <Link
                      href={l.href}
                      className="text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          <div className="md:col-span-1" />
        </div>

        <div className="mt-12 flex flex-col items-start justify-between gap-2 border-t pt-8 text-xs text-muted-foreground sm:flex-row sm:items-center">
          <p>
            Built with care. MIT License © {new Date().getFullYear()} CraftUI.
          </p>
          <p>
            Crafted on the shoulders of Radix, Tailwind, and a lot of
            conversation.
          </p>
        </div>
      </div>
    </footer>
  );
}
