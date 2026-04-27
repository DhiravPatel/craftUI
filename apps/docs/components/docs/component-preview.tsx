"use client";

import * as React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@craftui/ui";
import { cn } from "@craftui/utils";

export interface ComponentPreviewProps {
  /** Pre-rendered <CodeBlock /> — rendered on the server with shiki */
  codeBlock: React.ReactNode;
  children: React.ReactNode;
  className?: string;
  align?: "center" | "start" | "end";
  name?: string;
}

export function ComponentPreview({
  codeBlock,
  children,
  className,
  align = "center",
}: ComponentPreviewProps) {
  return (
    <Tabs defaultValue="preview" className="relative w-full">
      <TabsList className="h-9">
        <TabsTrigger value="preview" className="h-7 text-xs">
          Preview
        </TabsTrigger>
        <TabsTrigger value="code" className="h-7 text-xs">
          Code
        </TabsTrigger>
      </TabsList>
      <TabsContent value="preview" className="mt-3">
        <div
          className={cn(
            "flex min-h-[340px] w-full overflow-hidden rounded-lg border bg-background p-8",
            {
              "items-center justify-center": align === "center",
              "items-start justify-start": align === "start",
              "items-end justify-end": align === "end",
            },
            className
          )}
        >
          {children}
        </div>
      </TabsContent>
      <TabsContent value="code" className="mt-3">
        {codeBlock}
      </TabsContent>
    </Tabs>
  );
}
