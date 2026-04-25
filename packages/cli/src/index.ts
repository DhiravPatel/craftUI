import { Command } from "commander";
import chalk from "chalk";
import { initCommand } from "./commands/init.js";
import { addCommand } from "./commands/add.js";
import { removeCommand } from "./commands/remove.js";
import { listCommand } from "./commands/list.js";
import { diffCommand } from "./commands/diff.js";
import { themeCommand } from "./commands/theme.js";
import { upgradeCommand } from "./commands/upgrade.js";

const program = new Command();

program
  .name("craftui")
  .description(
    "CraftUI — add production-ready components to your React project"
  )
  .version("0.1.0");

program.addCommand(initCommand);
program.addCommand(addCommand);
program.addCommand(removeCommand);
program.addCommand(listCommand);
program.addCommand(diffCommand);
program.addCommand(themeCommand);
program.addCommand(upgradeCommand);

program.on("command:*", () => {
  console.error(
    chalk.red(`\nUnknown command: ${program.args.join(" ")}\n`)
  );
  program.help({ error: true });
});

program.parseAsync(process.argv).catch((error) => {
  console.error(chalk.red("\n✖  "), error instanceof Error ? error.message : error);
  process.exit(1);
});
