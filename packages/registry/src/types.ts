export type RegistryCategory =
  | "inputs"
  | "overlay"
  | "navigation"
  | "display"
  | "feedback"
  | "layout"
  | "forms"
  | "theming";

export interface RegistryFile {
  /** Path relative to `packages/ui/src/` */
  path: string;
  /** Where to write in the user's project (supports `{{components}}` token) */
  target: string;
  type: "component" | "hook" | "lib" | "util";
}

export interface RegistryEntry {
  name: string;
  description: string;
  category: RegistryCategory;
  files: RegistryFile[];
  /** npm dependencies installed by the CLI */
  dependencies: string[];
  /** npm dev dependencies installed by the CLI */
  devDependencies: string[];
  /** Other CraftUI components this depends on */
  registryDependencies: string[];
  /** Free-form docs URL */
  docs?: string;
  keywords?: string[];
}

export type Registry = RegistryEntry[];
