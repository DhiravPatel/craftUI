import Link from "next/link";
import { Button } from "@craftui/ui";
import { Github } from "lucide-react";
import { DocsSearch } from "./docs-search";
import { ThemeToggle } from "./theme-toggle";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/50 bg-background/70 backdrop-blur-xl">
      <div className="container mx-auto flex h-14 items-center px-4">
        <Link href="/" className="mr-8 flex items-center gap-2">
          <LogoMark />
          <span className="font-semibold tracking-tight">CraftUI</span>
        </Link>

        <nav className="hidden items-center gap-6 text-sm md:flex">
          <Link
            href="/docs"
            className="text-muted-foreground transition-colors hover:text-foreground"
          >
            Docs
          </Link>
          <Link
            href="/docs/components/button"
            className="text-muted-foreground transition-colors hover:text-foreground"
          >
            Components
          </Link>
          <Link
            href="/docs/theming"
            className="text-muted-foreground transition-colors hover:text-foreground"
          >
            Theming
          </Link>
          <Link
            href="/docs/cli"
            className="text-muted-foreground transition-colors hover:text-foreground"
          >
            CLI
          </Link>
        </nav>

        <div className="ml-auto flex items-center gap-2">
          <DocsSearch />
          <ThemeToggle />
          <Button variant="ghost" size="icon" asChild>
            <a
              href="https://github.com/craftui/craftui"
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub"
            >
              <Github className="h-4 w-4" />
            </a>
          </Button>
        </div>
      </div>
    </header>
  );
}

function LogoMark() {
  return (
    <span className="relative inline-flex h-7 w-7 items-center justify-center overflow-hidden rounded-md bg-foreground text-background">
      <svg
        width="14"
        height="14"
        viewBox="0 0 14 14"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M2 3.5C2 2.67157 2.67157 2 3.5 2H10.5C11.3284 2 12 2.67157 12 3.5V10.5C12 11.3284 11.3284 12 10.5 12H3.5C2.67157 12 2 11.3284 2 10.5V3.5Z"
          stroke="currentColor"
          strokeWidth="1.5"
        />
        <path d="M2 7H12" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    </span>
  );
}
