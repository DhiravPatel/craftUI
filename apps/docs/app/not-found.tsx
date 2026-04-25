import Link from "next/link";
import { ArrowLeft, Home } from "lucide-react";
import { Button } from "@craftui/ui";

export default function NotFound() {
  return (
    <div className="relative flex min-h-[calc(100vh-14rem)] items-center justify-center overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-grid opacity-[0.25] mask-radial"
      />
      <div className="relative mx-auto max-w-lg px-4 text-center">
        <p className="font-mono text-xs font-medium uppercase tracking-wider text-muted-foreground">
          Error · 404
        </p>
        <h1 className="mt-3 text-balance text-5xl font-semibold tracking-tight md:text-7xl">
          Page not found
        </h1>
        <p className="mx-auto mt-5 max-w-md text-balance text-muted-foreground">
          The page you&apos;re looking for doesn&apos;t exist, or has moved.
          Check the URL, or head back to familiar territory.
        </p>

        <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Button asChild>
            <Link href="/">
              <Home className="h-4 w-4" />
              Back to home
            </Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/docs">
              <ArrowLeft className="h-4 w-4" />
              Read the docs
            </Link>
          </Button>
        </div>

        <div className="mx-auto mt-12 max-w-sm rounded-lg border bg-muted/30 p-4 text-left font-mono text-xs">
          <p className="text-muted-foreground">
            <span className="text-foreground">$</span> craftui{" "}
            <span className="text-destructive">find</span> page
          </p>
          <p className="text-muted-foreground">
            <span className="text-destructive">✖</span> no matches found
          </p>
        </div>
      </div>
    </div>
  );
}
