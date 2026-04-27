"use client";

import * as React from "react";
import { Check, Copy } from "lucide-react";
import { Button } from "@craftui/ui";
import { cn } from "@craftui/utils";

export interface CopyCommandProps {
  command: string;
  className?: string;
}

export function CopyCommand({ command, className }: CopyCommandProps) {
  const [copied, setCopied] = React.useState(false);

  const onCopy = async () => {
    try {
      await navigator.clipboard.writeText(command);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      /* clipboard blocked */
    }
  };

  return (
    <div
      className={cn(
        "flex items-center justify-between gap-2 rounded-md border bg-muted/50 px-4 py-2 font-mono text-sm",
        className
      )}
    >
      <span>
        <span className="text-muted-foreground">$ </span>
        {command}
      </span>
      <Button
        variant="ghost"
        size="icon"
        className="h-7 w-7"
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
