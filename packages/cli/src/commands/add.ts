import path from "node:path";
import { Command } from "commander";
import chalk from "chalk";
import ora from "ora";
import inquirer from "inquirer";
import fs from "fs-extra";
import { listRegistry } from "@craftui/registry";
import { readConfig } from "../utils/config.js";
import {
  collectNpmDependencies,
  resolveDependencies,
} from "../utils/dependency-resolver.js";
import { installDependencies } from "../utils/installer.js";
import { writeEntry } from "../utils/writer.js";
import { logger } from "../utils/logger.js";

export const addCommand = new Command("add")
  .description("Add component(s) to your project")
  .argument("[components...]", "Components to add")
  .option("--no-install", "Skip installing npm dependencies")
  .option("-y, --yes", "Overwrite existing files without prompting")
  .option("-p, --path <path>", "Override components directory")
  .option("-c, --cwd <path>", "Working directory", process.cwd())
  .action(async (components: string[], options) => {
    const cwd = path.resolve(options.cwd ?? process.cwd());
    const config = await readConfig(cwd);

    if (components.length === 0) {
      const registry = listRegistry();
      const { selected } = await inquirer.prompt([
        {
          type: "checkbox",
          name: "selected",
          message: "Select components to add:",
          choices: registry.map((c) => ({
            name: `${c.name} ${chalk.dim(`— ${c.description}`)}`,
            value: c.name,
            short: c.name,
          })),
          pageSize: 20,
        },
      ]);
      components = selected;
    }

    if (components.length === 0) {
      logger.warn("No components selected.");
      return;
    }

    const resolveSpinner = ora("Resolving dependencies…").start();
    const entries = resolveDependencies(components);
    resolveSpinner.succeed(
      `Found ${entries.length} component(s) to install`
    );

    // Detect conflicts
    const writeResults: Array<{ path: string; existed: boolean; name: string }> = [];
    for (const entry of entries) {
      const results = await writeEntry(entry, config, {
        overwrite: false,
        pathOverride: options.path,
        cwd,
      });
      results.forEach((r) =>
        writeResults.push({ ...r, name: entry.name })
      );
    }

    const conflicts = writeResults.filter((r) => r.existed);
    let overwrite = options.yes === true;

    if (conflicts.length > 0 && !overwrite) {
      const { confirm } = await inquirer.prompt([
        {
          type: "confirm",
          name: "confirm",
          message: `${conflicts.length} file(s) already exist. Overwrite?`,
          default: false,
        },
      ]);
      overwrite = confirm;
    }

    // Re-write with overwrite permission
    for (const entry of entries) {
      const spinner = ora(`Adding ${entry.name}…`).start();
      try {
        const results = await writeEntry(entry, config, {
          overwrite,
          pathOverride: options.path,
          cwd,
        });
        const wrote = results.filter((r) => !r.existed).length;
        if (wrote === 0 && !overwrite) {
          spinner.warn(`Skipped ${entry.name} (files already exist)`);
        } else {
          spinner.succeed(`Added ${chalk.green(entry.name)}`);
        }
      } catch (err) {
        spinner.fail(`Failed to add ${entry.name}`);
        throw err;
      }
    }

    // Install npm deps
    if (options.install !== false) {
      const { deps, devDeps } = collectNpmDependencies(entries);
      const pkgJson = await fs.readJson(path.join(cwd, "package.json")).catch(
        () => ({ dependencies: {}, devDependencies: {} })
      );
      const installedDeps = {
        ...(pkgJson.dependencies ?? {}),
        ...(pkgJson.devDependencies ?? {}),
      };

      const missing = deps.filter((d) => !installedDeps[d]);
      const missingDev = devDeps.filter((d) => !installedDeps[d]);

      if (missing.length > 0) {
        const install = ora("Installing npm dependencies…").start();
        try {
          await installDependencies(cwd, missing);
          install.succeed(`Installed ${missing.length} dependencies`);
        } catch (err) {
          install.fail("Failed to install dependencies");
          throw err;
        }
      }
      if (missingDev.length > 0) {
        const install = ora("Installing npm dev dependencies…").start();
        try {
          await installDependencies(cwd, missingDev, { dev: true });
          install.succeed(`Installed ${missingDev.length} dev dependencies`);
        } catch (err) {
          install.fail("Failed to install dev dependencies");
          throw err;
        }
      }
    }

    logger.newline();
    logger.success("Done!");
  });
