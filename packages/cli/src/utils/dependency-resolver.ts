import {
  getRegistryEntry,
  type RegistryEntry,
} from "@craftui/registry";

export function resolveDependencies(names: string[]): RegistryEntry[] {
  const visited = new Set<string>();
  const ordered: RegistryEntry[] = [];

  function visit(name: string) {
    if (visited.has(name)) return;
    const entry = getRegistryEntry(name);
    if (!entry) {
      throw new Error(`Unknown component: ${name}`);
    }
    visited.add(name);
    for (const dep of entry.registryDependencies) {
      visit(dep);
    }
    ordered.push(entry);
  }

  for (const name of names) visit(name);
  return ordered;
}

export function collectNpmDependencies(
  entries: RegistryEntry[]
): { deps: string[]; devDeps: string[] } {
  const deps = new Set<string>();
  const devDeps = new Set<string>();
  for (const e of entries) {
    e.dependencies.forEach((d) => deps.add(d));
    e.devDependencies.forEach((d) => devDeps.add(d));
  }
  return { deps: [...deps], devDeps: [...devDeps] };
}
