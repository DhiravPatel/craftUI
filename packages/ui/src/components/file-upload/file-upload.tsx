"use client";

import * as React from "react";
import { Upload, X } from "lucide-react";
import { cn } from "../../lib/cn";

export interface FileUploadProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange" | "title"> {
  /** Fired when files are selected via drop or the file picker. */
  onChange?: (files: File[]) => void;
  /** Allow multiple files. Default true. */
  multiple?: boolean;
  /** `accept` attribute for the underlying file input (e.g. `"image/*"`). */
  accept?: string;
  /** Title shown at the top of the drop area. */
  title?: React.ReactNode;
  /** Subtitle/instruction shown beneath the title. */
  description?: React.ReactNode;
  /** Accent color used for the dashed border and icon glow. Default sky-400. */
  accentColor?: string;
  /** Disable the picker + drop entirely. */
  disabled?: boolean;
}

/**
 * FileUpload — drop / click upload zone with an animated grid backdrop,
 * a central upload tile, and a dashed accent ring that smoothly appears
 * on hover or drag-over. Files dropped or chosen are surfaced via `onChange`
 * and listed below the zone as removable chips.
 */
const FileUpload = React.forwardRef<HTMLDivElement, FileUploadProps>(
  (
    {
      onChange,
      multiple = true,
      accept,
      title = "Upload file",
      description = "Drag or drop your files here or click to upload",
      accentColor = "rgb(56, 189, 248)",
      disabled = false,
      className,
      style,
      ...props
    },
    ref
  ) => {
    const inputRef = React.useRef<HTMLInputElement>(null);
    const [files, setFiles] = React.useState<File[]>([]);
    const [hovered, setHovered] = React.useState(false);
    const [dragging, setDragging] = React.useState(false);
    // Counter approach — drag enter/leave fires for every nested element, so
    // we track depth and only consider the drag finished when it returns to 0.
    const dragDepth = React.useRef(0);

    const active = !disabled && (hovered || dragging);

    const acceptFiles = (incoming: FileList | File[] | null) => {
      if (!incoming || disabled) return;
      const arr = Array.from(incoming);
      const next = multiple ? [...files, ...arr] : arr.slice(0, 1);
      setFiles(next);
      onChange?.(next);
    };

    const removeFile = (index: number) => {
      const next = files.filter((_, i) => i !== index);
      setFiles(next);
      onChange?.(next);
    };

    return (
      <div
        ref={ref}
        className={cn(
          "relative isolate overflow-hidden rounded-2xl border border-border/60 bg-[#0b0d12] text-white",
          !disabled && "cursor-pointer",
          disabled && "opacity-60",
          className
        )}
        style={style}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onClick={() => {
          if (disabled) return;
          inputRef.current?.click();
        }}
        onDragEnter={(event) => {
          event.preventDefault();
          if (disabled) return;
          dragDepth.current += 1;
          setDragging(true);
        }}
        onDragOver={(event) => {
          event.preventDefault();
          if (disabled) return;
          event.dataTransfer.dropEffect = "copy";
        }}
        onDragLeave={(event) => {
          event.preventDefault();
          if (disabled) return;
          dragDepth.current -= 1;
          if (dragDepth.current <= 0) {
            dragDepth.current = 0;
            setDragging(false);
          }
        }}
        onDrop={(event) => {
          event.preventDefault();
          if (disabled) return;
          dragDepth.current = 0;
          setDragging(false);
          acceptFiles(event.dataTransfer.files);
        }}
        {...props}
      >
        {/* Grid backdrop — faint cell lines + subtle inset highlights */}
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage: [
              "linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px)",
              "linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)",
            ].join(", "),
            backgroundSize: "44px 44px",
            backgroundPosition: "center center",
          }}
        />
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(circle at 50% 30%, rgba(255,255,255,0.06), transparent 50%)",
            backgroundSize: "44px 44px",
            backgroundPosition: "center center",
            mixBlendMode: "screen",
          }}
        />

        {/* Glow that follows the active state */}
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 transition-opacity duration-500"
          style={{
            opacity: active ? 0.5 : 0,
            background: `radial-gradient(60% 50% at 50% 65%, ${accentColor}33, transparent 70%)`,
          }}
        />

        <div className="relative flex flex-col items-center px-8 py-10">
          {/* Title + description */}
          <p className="text-base font-bold leading-tight">{title}</p>
          <p className="mt-1 max-w-md text-center text-sm text-white/60">
            {description}
          </p>

          {/* Drop tile + animated dashed ring */}
          <div className="relative mt-8 h-28 w-28">
            {/* Dashed accent ring — fades in on hover / drag */}
            <span
              aria-hidden
              className={cn(
                "pointer-events-none absolute -inset-3 rounded-2xl border-2 border-dashed transition-[opacity,transform] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]"
              )}
              style={{
                borderColor: accentColor,
                opacity: active ? 1 : 0,
                transform: active ? "scale(1)" : "scale(0.92)",
              }}
            />

            {/* The tile itself */}
            <div
              className="relative flex h-full w-full items-center justify-center rounded-xl bg-[#15171f] shadow-[inset_0_1px_0_rgba(255,255,255,0.06),0_8px_24px_-12px_rgba(0,0,0,0.6)] transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]"
              style={{
                transform: dragging
                  ? "translateY(-4px) scale(1.05)"
                  : hovered
                    ? "translateY(-2px) scale(1.03)"
                    : "translateY(0) scale(1)",
                boxShadow: active
                  ? `inset 0 1px 0 rgba(255,255,255,0.08), 0 14px 32px -12px ${accentColor}55, 0 0 0 1px ${accentColor}30`
                  : undefined,
              }}
            >
              <Upload
                className="h-6 w-6 transition-colors duration-300"
                style={{
                  color: active ? accentColor : "rgba(255,255,255,0.75)",
                }}
              />
            </div>
          </div>

          {/* Selected files */}
          {files.length > 0 ? (
            <ul
              className="relative mt-7 flex w-full max-w-lg flex-wrap justify-center gap-2"
              onClick={(e) => e.stopPropagation()}
            >
              {files.map((file, i) => (
                <li
                  key={`${file.name}-${i}`}
                  className="group/file inline-flex max-w-[16rem] items-center gap-2 truncate rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/80 transition-colors hover:bg-white/10"
                >
                  <span className="truncate">{file.name}</span>
                  <span className="font-mono text-[10px] text-white/40">
                    {formatBytes(file.size)}
                  </span>
                  <button
                    type="button"
                    aria-label={`Remove ${file.name}`}
                    onClick={(e) => {
                      e.stopPropagation();
                      removeFile(i);
                    }}
                    className="ml-0.5 inline-flex h-4 w-4 items-center justify-center rounded-full text-white/50 transition-colors hover:bg-white/10 hover:text-white"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </li>
              ))}
            </ul>
          ) : null}
        </div>

        <input
          ref={inputRef}
          type="file"
          className="sr-only"
          multiple={multiple}
          accept={accept}
          disabled={disabled}
          onChange={(event) => {
            acceptFiles(event.target.files);
            event.target.value = "";
          }}
        />
      </div>
    );
  }
);
FileUpload.displayName = "FileUpload";

function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  const kb = bytes / 1024;
  if (kb < 1024) return `${kb.toFixed(0)} KB`;
  return `${(kb / 1024).toFixed(1)} MB`;
}

export { FileUpload };
