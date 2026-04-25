import path from "node:path";
import fs from "fs-extra";
import type { CraftUIConfig } from "./config.js";
import type { RegistryEntry, RegistryFile } from "@craftui/registry";
import { aliasToPath } from "./config.js";
import { readSourceFile } from "./source.js";

export interface WriteOptions {
  overwrite?: boolean;
  pathOverride?: string;
  cwd?: string;
}

function resolveTarget(
  file: RegistryFile,
  config: CraftUIConfig,
  options: WriteOptions = {}
): string {
  const cwd = options.cwd ?? process.cwd();

  const componentsPath = options.pathOverride
    ? path.resolve(cwd, options.pathOverride)
    : aliasToPath(config.aliases.ui ?? config.aliases.components, cwd);
  const hooksPath = aliasToPath(config.aliases.hooks ?? "@/hooks", cwd);
  const libPath = aliasToPath(config.aliases.lib ?? "@/lib", cwd);

  const resolved = file.target
    .replace("{{components}}", componentsPath)
    .replace("{{hooks}}", hooksPath)
    .replace("{{lib}}", libPath);

  return path.isAbsolute(resolved) ? resolved : path.join(cwd, resolved);
}

/**
 * Rewrite internal imports like `../../lib/cn` → the user's utils alias.
 */
export function rewriteImports(source: string, config: CraftUIConfig): string {
  const utils = config.aliases.utils;
  const hooks = config.aliases.hooks ?? "@/hooks";
  const ui = config.aliases.ui ?? config.aliases.components;

  return source
    .replace(/from\s+"(\.\.\/)+lib\/cn"/g, `from "${utils}"`)
    .replace(/from\s+"(\.\.\/)+lib\/utils"/g, `from "${utils}"`)
    .replace(/from\s+"(\.\.\/)+hooks\/use-toast"/g, `from "${hooks}/use-toast"`)
    .replace(/from\s+"(\.\.\/)+hooks\/([\w-]+)"/g, `from "${hooks}/$2"`)
    .replace(
      /from\s+"(\.\.\/)+components\/([\w-]+)\/[\w-]+"/g,
      `from "${ui}/$2"`
    )
    .replace(/from\s+"@craftui\/utils"/g, `from "${utils}"`);
}

export async function writeComponentFile(
  file: RegistryFile,
  config: CraftUIConfig,
  options: WriteOptions = {}
): Promise<{ path: string; existed: boolean }> {
  const source = await readSourceFile(file.path);
  const rewritten = rewriteImports(source, config);
  const target = resolveTarget(file, config, options);

  const existed = await fs.pathExists(target);
  if (existed && !options.overwrite) {
    return { path: target, existed: true };
  }

  await fs.ensureDir(path.dirname(target));
  await fs.writeFile(target, rewritten, "utf8");
  return { path: target, existed: false };
}

export async function writeEntry(
  entry: RegistryEntry,
  config: CraftUIConfig,
  options: WriteOptions = {}
): Promise<Array<{ path: string; existed: boolean }>> {
  return Promise.all(
    entry.files.map((file) => writeComponentFile(file, config, options))
  );
}

export async function removeEntry(
  entry: RegistryEntry,
  config: CraftUIConfig,
  cwd = process.cwd()
): Promise<string[]> {
  const removed: string[] = [];
  for (const file of entry.files) {
    const target = resolveTarget(file, config, { cwd });
    if (await fs.pathExists(target)) {
      await fs.remove(target);
      removed.push(target);
    }
  }
  return removed;
}
