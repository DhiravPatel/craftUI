"use client";

import type { ReactNode } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@craftui/ui";
import { CopyCommand } from "./copy-command";

export interface InstallationProps {
  component: string;
  dependencies?: string[];
  /** Pre-rendered <CodeBlock /> showing the manual import snippet. */
  importBlock: ReactNode;
}

export function Installation({
  component,
  dependencies = [],
  importBlock,
}: InstallationProps) {
  const cliCommand = `npx craftui@latest add ${component}`;

  const manualInstallDeps =
    dependencies.length > 0
      ? `npm install ${dependencies.join(" ")}`
      : undefined;

  return (
    <Tabs defaultValue="cli" className="mt-4">
      <TabsList className="h-9">
        <TabsTrigger value="cli" className="h-7 text-xs">
          CLI
        </TabsTrigger>
        <TabsTrigger value="manual" className="h-7 text-xs">
          Manual
        </TabsTrigger>
      </TabsList>

      <TabsContent value="cli" className="mt-4 space-y-3">
        <CopyCommand command={cliCommand} />
        <p className="text-sm text-muted-foreground">
          The CLI copies the component source into{" "}
          <code>@/components/ui</code>, installs npm dependencies, and resolves
          any <code>registryDependencies</code> (like <code>label</code>) for
          you.
        </p>
      </TabsContent>

      <TabsContent value="manual" className="mt-4 space-y-4">
        {manualInstallDeps ? (
          <div className="space-y-2">
            <div className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
              1. Install dependencies
            </div>
            <CopyCommand command={manualInstallDeps} />
          </div>
        ) : null}
        <div className="space-y-2">
          <div className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
            {manualInstallDeps ? "2. Copy the import" : "1. Copy the import"}
          </div>
          {importBlock}
          <p className="text-sm text-muted-foreground">
            Then paste the component source into your project at{" "}
            <code>components/ui/{component}.tsx</code>. The full source lives in{" "}
            <a
              className="underline decoration-border underline-offset-4 hover:decoration-foreground"
              href={`https://github.com/craftui/craftui/blob/main/packages/ui/src/components/${component}`}
              target="_blank"
              rel="noreferrer"
            >
              packages/ui/src/components/{component}
            </a>
            .
          </p>
        </div>
      </TabsContent>
    </Tabs>
  );
}
