"use client";

import * as React from "react";
import { Check, Copy } from "lucide-react";
import {
  Button,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@craftui/ui";
import { cn } from "@craftui/utils";

type Command = string;

interface PackageManagerTabsProps {
  /**
   * Either a record keyed by package manager, or the tail of an install
   * command to prepend with each manager (e.g. "add button" -> "pnpm add button", ...).
   */
  commands?: Partial<Record<"pnpm" | "npm" | "yarn" | "bun", Command>>;
  /** If provided, generates one command per PM automatically. */
  install?: string;
  /** Special prefix for `npx` commands — shown as-is on all tabs. */
  npx?: string;
  className?: string;
}

const DEFAULT_ORDER: Array<"pnpm" | "npm" | "yarn" | "bun"> = [
  "pnpm",
  "npm",
  "yarn",
  "bun",
];

function buildInstall(
  manager: "pnpm" | "npm" | "yarn" | "bun",
  args: string
): string {
  switch (manager) {
    case "pnpm":
      return `pnpm add ${args}`;
    case "npm":
      return `npm install ${args}`;
    case "yarn":
      return `yarn add ${args}`;
    case "bun":
      return `bun add ${args}`;
  }
}

function buildNpx(
  manager: "pnpm" | "npm" | "yarn" | "bun",
  command: string
): string {
  switch (manager) {
    case "pnpm":
      return `pnpm dlx ${command}`;
    case "npm":
      return `npx ${command}`;
    case "yarn":
      return `yarn dlx ${command}`;
    case "bun":
      return `bunx ${command}`;
  }
}

export function PackageManagerTabs({
  commands,
  install,
  npx,
  className,
}: PackageManagerTabsProps) {
  const resolved: Record<"pnpm" | "npm" | "yarn" | "bun", string> = {
    pnpm: commands?.pnpm ?? (install ? buildInstall("pnpm", install) : npx ? buildNpx("pnpm", npx) : ""),
    npm: commands?.npm ?? (install ? buildInstall("npm", install) : npx ? buildNpx("npm", npx) : ""),
    yarn: commands?.yarn ?? (install ? buildInstall("yarn", install) : npx ? buildNpx("yarn", npx) : ""),
    bun: commands?.bun ?? (install ? buildInstall("bun", install) : npx ? buildNpx("bun", npx) : ""),
  };

  return (
    <Tabs defaultValue="pnpm" className={cn("my-4", className)}>
      <TabsList className="h-9 w-full justify-start rounded-b-none rounded-t-md border border-b-0 bg-muted/50 p-1">
        {DEFAULT_ORDER.map((pm) => (
          <TabsTrigger
            key={pm}
            value={pm}
            className="h-7 rounded px-3 text-xs font-medium data-[state=active]:bg-background"
          >
            {pm}
          </TabsTrigger>
        ))}
      </TabsList>
      {DEFAULT_ORDER.map((pm) => (
        <TabsContent key={pm} value={pm} className="mt-0">
          <CommandRow command={resolved[pm]} />
        </TabsContent>
      ))}
    </Tabs>
  );
}

function CommandRow({ command }: { command: string }) {
  const [copied, setCopied] = React.useState(false);
  const onCopy = async () => {
    await navigator.clipboard.writeText(command);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };
  return (
    <div className="group flex items-center justify-between rounded-b-md border border-t-0 bg-muted/30 px-4 py-2.5 font-mono text-sm">
      <span>
        <span className="text-muted-foreground">$ </span>
        {command}
      </span>
      <Button
        variant="ghost"
        size="icon"
        className="h-7 w-7 opacity-0 transition-opacity group-hover:opacity-100"
        onClick={onCopy}
        aria-label="Copy command"
      >
        {copied ? (
          <Check className="h-3.5 w-3.5 text-success" />
        ) : (
          <Copy className="h-3.5 w-3.5" />
        )}
      </Button>
    </div>
  );
}
