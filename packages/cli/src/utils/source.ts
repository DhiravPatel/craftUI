import path from "node:path";
import { fileURLToPath } from "node:url";
import fs from "fs-extra";

/**
 * Return the absolute path to the bundled `packages/ui/src` directory.
 * When running from the monorepo it's a sibling package; when installed
 * as an npm dep it lives under `node_modules/@craftui/ui/src`.
 */
export function getUiSourceRoot(): string {
  const __filename = fileURLToPath(import.meta.url);
  const distDir = path.dirname(__filename);

  const candidates = [
    path.resolve(distDir, "../../ui/src"),
    path.resolve(distDir, "../../../ui/src"),
    path.resolve(distDir, "../node_modules/@craftui/ui/src"),
    path.resolve(distDir, "../../node_modules/@craftui/ui/src"),
  ];

  for (const c of candidates) {
    if (fs.existsSync(c)) return c;
  }

  throw new Error(
    "Could not locate @craftui/ui source. Did you build the registry?"
  );
}

export async function readSourceFile(relativePath: string): Promise<string> {
  const full = path.join(getUiSourceRoot(), relativePath);
  if (!(await fs.pathExists(full))) {
    throw new Error(`Source file not found: ${relativePath}`);
  }
  return fs.readFile(full, "utf8");
}
