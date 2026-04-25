import path from "node:path";
import fs from "fs-extra";

export type Framework = "next" | "vite" | "cra" | "remix" | "unknown";

export async function detectFramework(cwd: string): Promise<Framework> {
  const pkgPath = path.join(cwd, "package.json");
  if (!(await fs.pathExists(pkgPath))) return "unknown";

  const pkg = await fs.readJson(pkgPath);
  const deps = {
    ...(pkg.dependencies ?? {}),
    ...(pkg.devDependencies ?? {}),
  };

  if (deps.next) return "next";
  if (deps["@remix-run/react"] || deps["@remix-run/node"]) return "remix";
  if (deps.vite) return "vite";
  if (deps["react-scripts"]) return "cra";

  return "unknown";
}

export async function detectTypeScript(cwd: string): Promise<boolean> {
  if (await fs.pathExists(path.join(cwd, "tsconfig.json"))) return true;
  if (await fs.pathExists(path.join(cwd, "tsconfig.base.json"))) return true;
  return false;
}

export async function detectTailwind(cwd: string): Promise<boolean> {
  const candidates = [
    "tailwind.config.ts",
    "tailwind.config.js",
    "tailwind.config.mjs",
    "tailwind.config.cjs",
  ];
  for (const name of candidates) {
    if (await fs.pathExists(path.join(cwd, name))) return true;
  }
  return false;
}

export async function detectPackageManager(
  cwd: string
): Promise<"pnpm" | "yarn" | "npm" | "bun"> {
  if (await fs.pathExists(path.join(cwd, "pnpm-lock.yaml"))) return "pnpm";
  if (await fs.pathExists(path.join(cwd, "yarn.lock"))) return "yarn";
  if (await fs.pathExists(path.join(cwd, "bun.lockb"))) return "bun";
  return "npm";
}
