import path from "node:path";
import fs from "fs-extra";

export interface CraftUIConfig {
  $schema?: string;
  style: "default" | "new-york";
  rsc: boolean;
  tsx: boolean;
  tailwind: {
    config: string;
    css: string;
    baseColor: string;
    cssVariables: boolean;
  };
  aliases: {
    components: string;
    utils: string;
    ui?: string;
    lib?: string;
    hooks?: string;
  };
}

export const DEFAULT_CONFIG: CraftUIConfig = {
  $schema: "https://craftui.dev/schema.json",
  style: "default",
  rsc: false,
  tsx: true,
  tailwind: {
    config: "tailwind.config.ts",
    css: "app/globals.css",
    baseColor: "slate",
    cssVariables: true,
  },
  aliases: {
    components: "@/components/ui",
    utils: "@/lib/utils",
    ui: "@/components/ui",
    lib: "@/lib",
    hooks: "@/hooks",
  },
};

const CONFIG_FILENAME = "craftui.config.json";

export async function readConfig(cwd = process.cwd()): Promise<CraftUIConfig> {
  const filePath = path.join(cwd, CONFIG_FILENAME);
  if (!(await fs.pathExists(filePath))) {
    throw new Error(
      `No craftui.config.json found in ${cwd}. Run \`craftui init\` first.`
    );
  }
  const raw = await fs.readJson(filePath);
  return { ...DEFAULT_CONFIG, ...raw };
}

export async function writeConfig(
  config: CraftUIConfig,
  cwd = process.cwd()
): Promise<void> {
  await fs.writeJson(path.join(cwd, CONFIG_FILENAME), config, { spaces: 2 });
}

/**
 * Resolve an alias like `@/components/ui` to a filesystem path by reading
 * the project's tsconfig paths (best effort). Falls back to a heuristic
 * that strips the leading `@/`.
 */
export function aliasToPath(alias: string, cwd: string = process.cwd()): string {
  // Support common forms: "@/components/ui", "src/components/ui", "./components"
  const stripped = alias.replace(/^@\//, "").replace(/^\.\//, "");
  // Prefer src/ if it exists
  const srcPath = path.join(cwd, "src", stripped);
  if (fs.existsSync(srcPath) || fs.existsSync(path.dirname(srcPath))) {
    return srcPath;
  }
  return path.join(cwd, stripped);
}
