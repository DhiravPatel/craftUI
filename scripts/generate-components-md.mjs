#!/usr/bin/env node
/**
 * Generates components.md at the repo root from packages/registry/src/components/*.json.
 *
 * Run from the repo root:
 *   node scripts/generate-components-md.mjs
 *
 * The output is an AI-friendly catalog: alphabetical index up top, then sections
 * grouped by registry category with a one-line description and the keyword tags
 * for each component. Re-run after adding components to keep it in sync.
 */
import { readFileSync, readdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");
const COMPONENTS_DIR = join(ROOT, "packages/registry/src/components");
const OUT = join(ROOT, "components.md");

const CATEGORY_TITLES = {
  display: "Display",
  form: "Form",
  "3d": "3D & Animated",
  layout: "Layout",
  navigation: "Navigation",
  overlay: "Overlay",
  feedback: "Feedback",
  data: "Data",
};

const CATEGORY_ORDER = [
  "form",
  "display",
  "3d",
  "layout",
  "navigation",
  "overlay",
  "feedback",
  "data",
];

const files = readdirSync(COMPONENTS_DIR)
  .filter((f) => f.endsWith(".json"))
  .sort();

const entries = files.map((f) =>
  JSON.parse(readFileSync(join(COMPONENTS_DIR, f), "utf8"))
);

const byCategory = new Map();
for (const e of entries) {
  const cat = e.category ?? "other";
  if (!byCategory.has(cat)) byCategory.set(cat, []);
  byCategory.get(cat).push(e);
}
for (const list of byCategory.values()) {
  list.sort((a, b) => a.name.localeCompare(b.name));
}

const orderedCats = [
  ...CATEGORY_ORDER.filter((c) => byCategory.has(c)),
  ...[...byCategory.keys()].filter((c) => !CATEGORY_ORDER.includes(c)).sort(),
];

const totalCount = entries.length;

const lines = [];
lines.push("# CraftUI components");
lines.push("");
lines.push(
  `> A copy-paste component library in a pnpm + turbo monorepo. **${totalCount} components** ship today.`
);
lines.push("");
lines.push("## How to use this file");
lines.push("");
lines.push(
  "This file is an AI-friendly catalog of every component CraftUI ships. Each entry is **one line**:"
);
lines.push("");
lines.push(
  '`- **name** — one-line purpose. _keywords: a, b, c_`'
);
lines.push("");
lines.push(
  "Use Cmd/Ctrl-F to find a component by name, behavior, or keyword. Then install it from the registry:"
);
lines.push("");
lines.push("```bash");
lines.push("npx craftui add <component-name>");
lines.push("```");
lines.push("");
lines.push(
  "Browse the live previews and full prop tables at the [docs site](./apps/docs)."
);
lines.push("");
lines.push("## Alphabetical index");
lines.push("");
const indexLines = entries
  .map((e) => e.name)
  .sort()
  .reduce((rows, name, i) => {
    const row = Math.floor(i / 4);
    if (!rows[row]) rows[row] = [];
    rows[row].push(name);
    return rows;
  }, []);
lines.push("| | | | |");
lines.push("|---|---|---|---|");
for (const row of indexLines) {
  while (row.length < 4) row.push("");
  lines.push(
    `| ${row
      .map((n) => (n ? `[\`${n}\`](#${n.toLowerCase()})` : ""))
      .join(" | ")} |`
  );
}
lines.push("");

for (const cat of orderedCats) {
  const list = byCategory.get(cat);
  if (!list || list.length === 0) continue;
  const title = CATEGORY_TITLES[cat] ?? cat.charAt(0).toUpperCase() + cat.slice(1);
  lines.push(`## ${title} <small>(${list.length})</small>`);
  lines.push("");
  for (const e of list) {
    const kw = (e.keywords ?? []).filter(Boolean).join(", ");
    const desc = (e.description ?? "").replace(/\s+/g, " ").trim();
    const tail = kw ? ` _keywords: ${kw}_` : "";
    lines.push(`- <a id="${e.name}"></a>**\`${e.name}\`** — ${desc}${tail}`);
  }
  lines.push("");
}

lines.push("---");
lines.push("");
lines.push(
  `_Generated from \`packages/registry/src/components/*.json\` by \`scripts/generate-components-md.mjs\`. Re-run after adding a component._`
);
lines.push("");

writeFileSync(OUT, lines.join("\n"));
console.log(`Wrote ${OUT} (${totalCount} components, ${orderedCats.length} categories).`);
