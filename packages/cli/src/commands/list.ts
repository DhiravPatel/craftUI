import { Command } from "commander";
import chalk from "chalk";
import { listRegistry } from "@craftui/registry";
import { logger } from "../utils/logger.js";

export const listCommand = new Command("list")
  .description("List all available components")
  .option("--category <category>", "Filter by category")
  .action((options) => {
    const registry = listRegistry();

    const grouped = registry.reduce<Record<string, typeof registry>>(
      (acc, c) => {
        const cat = c.category || "other";
        if (!acc[cat]) acc[cat] = [];
        acc[cat]!.push(c);
        return acc;
      },
      {}
    );

    logger.heading("Available CraftUI Components");

    for (const [category, components] of Object.entries(grouped)) {
      if (options.category && category !== options.category) continue;
      console.log(chalk.blue.bold(`  ${category.toUpperCase()}`));
      components.forEach((c) => {
        console.log(
          chalk.gray(`    ${c.name.padEnd(20)} ${c.description}`)
        );
      });
      console.log();
    }

    logger.info(`Total: ${registry.length} components`);
    logger.newline();
  });
