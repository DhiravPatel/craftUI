import path from "node:path";
import { Command } from "commander";
import chalk from "chalk";
import ora from "ora";
import inquirer from "inquirer";
import fs from "fs-extra";
import { listRegistry } from "@craftui/registry";
import { readConfig, aliasToPath } from "../utils/config.js";
import { writeEntry } from "../utils/writer.js";
import { logger } from "../utils/logger.js";

export const upgradeCommand = new Command("upgrade")
  .description("Re-install installed components to the latest registry version")
  .option("-y, --yes", "Overwrite without confirmation")
  .option("-c, --cwd <path>", "Working directory", process.cwd())
  .action(async (options) => {
    const cwd = path.resolve(options.cwd ?? process.cwd());
    const config = await readConfig(cwd);

    const installed = [];
    for (const entry of listRegistry()) {
      const componentsPath = aliasToPath(
        config.aliases.ui ?? config.aliases.components,
        cwd
      );
      const anyInstalled = await Promise.all(
        entry.files.map(async (f) => {
          const target = f.target.replace("{{components}}", componentsPath);
          const full = path.isAbsolute(target) ? target : path.join(cwd, target);
          return fs.pathExists(full);
        })
      );
      if (anyInstalled.some(Boolean)) installed.push(entry);
    }

    if (installed.length === 0) {
      logger.warn("No CraftUI components found in your project.");
      return;
    }

    logger.info(
      `${installed.length} installed component(s): ${chalk.cyan(installed.map((e) => e.name).join(", "))}`
    );

    let overwrite = options.yes === true;
    if (!overwrite) {
      const { confirm } = await inquirer.prompt([
        {
          type: "confirm",
          name: "confirm",
          message: "This will overwrite your local copies. Continue?",
          default: false,
        },
      ]);
      overwrite = confirm;
    }
    if (!overwrite) return;

    for (const entry of installed) {
      const spinner = ora(`Upgrading ${entry.name}…`).start();
      await writeEntry(entry, config, { overwrite: true, cwd });
      spinner.succeed(`Upgraded ${chalk.green(entry.name)}`);
    }
    logger.newline();
    logger.success("All components upgraded.");
  });
