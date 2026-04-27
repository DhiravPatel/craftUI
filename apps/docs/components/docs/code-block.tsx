import { cn } from "@craftui/utils";
import { highlight } from "@/lib/highlight";
import { CopyButton } from "./copy-button";

export interface CodeBlockProps {
  code: string;
  language?: string;
  className?: string;
  showCopy?: boolean;
  /** Optional label shown in the top-left of the block (e.g. a filename) */
  filename?: string;
}

export async function CodeBlock({
  code,
  language = "tsx",
  className,
  showCopy = true,
  filename,
}: CodeBlockProps) {
  const html = await highlight(code, language as "tsx");

  return (
    <div
      className={cn(
        "group relative overflow-hidden rounded-lg border border-white/10 bg-[#0d1117] text-white",
        className
      )}
    >
      {filename ? (
        <div className="flex items-center justify-between border-b border-white/10 bg-white/[0.03] px-4 py-2 font-mono text-xs text-white/60">
          <span>{filename}</span>
          <span className="uppercase tracking-wider">{language}</span>
        </div>
      ) : null}
      <div
        className="shiki-block"
        dangerouslySetInnerHTML={{ __html: html }}
      />
      {showCopy ? (
        <CopyButton
          value={code}
          className="absolute right-2 top-2 text-white/70 opacity-0 hover:bg-white/10 hover:text-white group-hover:opacity-100"
        />
      ) : null}
    </div>
  );
}
