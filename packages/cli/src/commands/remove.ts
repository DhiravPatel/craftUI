import path from "node:path";
import { Command } from "commander";
import chalk from "chalk";
import inquirer from "inquirer";
import { getRegistryEntry } from "@craftui/registry";
import { readConfig } from "../utils/config.js";
import { removeEntry } from "../utils/writer.js";
import { logger } from "../utils/logger.js";

export const removeCommand = new Command("remove")
  .description("Remove a component from your project")
  .argument("<component>", "Component name")
  .option("-y, --yes", "Skip confirmation")
  .option("-c, --cwd <path>", "Working directory", process.cwd())
  .action(async (component: string, options) => {
    const cwd = path.resolve(options.cwd ?? process.cwd());
    const config = await readConfig(cwd);
    const entry = getRegistryEntry(component);

    if (!entry) {
      logger.error(`Unknown component: ${component}`);
      process.exit(1);
    }

    if (!options.yes) {
      const { confirm } = await inquirer.prompt([
        {
          type: "confirm",
          name: "confirm",
          message: `Remove ${chalk.red(component)}?`,
          default: false,
        },
      ]);
      if (!confirm) return;
    }

    const removed = await removeEntry(entry, config, cwd);
    if (removed.length === 0) {
      logger.warn(`${component} was not installed.`);
      return;
    }
    removed.forEach((p) => logger.success(`Removed ${path.relative(cwd, p)}`));
  });
