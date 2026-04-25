import path from "node:path";
import { Command } from "commander";
import chalk from "chalk";
import fs from "fs-extra";
import { diffLines } from "diff";
import { getRegistryEntry } from "@craftui/registry";
import { readConfig, aliasToPath } from "../utils/config.js";
import { readSourceFile } from "../utils/source.js";
import { rewriteImports } from "../utils/writer.js";
import { logger } from "../utils/logger.js";

export const diffCommand = new Command("diff")
  .description(
    "Show the diff between your local copy of a component and the registry"
  )
  .argument("<component>", "Component name")
  .option("-c, --cwd <path>", "Working directory", process.cwd())
  .action(async (component: string, options) => {
    const cwd = path.resolve(options.cwd ?? process.cwd());
    const config = await readConfig(cwd);
    const entry = getRegistryEntry(component);

    if (!entry) {
      logger.error(`Unknown component: ${component}`);
      process.exit(1);
    }

    for (const file of entry.files) {
      const componentsPath = aliasToPath(
        config.aliases.ui ?? config.aliases.components,
        cwd
      );
      const target = file.target
        .replace("{{components}}", componentsPath)
        .replace(
          "{{hooks}}",
          aliasToPath(config.aliases.hooks ?? "@/hooks", cwd)
        );
      const localPath = path.isAbsolute(target) ? target : path.join(cwd, target);

      if (!(await fs.pathExists(localPath))) {
        logger.warn(`Not installed locally: ${path.relative(cwd, localPath)}`);
        continue;
      }

      const local = await fs.readFile(localPath, "utf8");
      const remote = rewriteImports(await readSourceFile(file.path), config);

      console.log(
        chalk.bold(`\n${path.relative(cwd, localPath)}\n`)
      );
      const parts = diffLines(local, remote);
      if (parts.every((p) => !p.added && !p.removed)) {
        logger.dim("  (no changes)");
        continue;
      }
      for (const part of parts) {
        const prefix = part.added ? "+ " : part.removed ? "- " : "  ";
        const color = part.added
          ? chalk.green
          : part.removed
            ? chalk.red
            : chalk.dim;
        for (const line of part.value.replace(/\n$/, "").split("\n")) {
          process.stdout.write(color(prefix + line + "\n"));
        }
      }
    }
  });
