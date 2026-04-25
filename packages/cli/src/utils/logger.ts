import chalk from "chalk";

export const logger = {
  heading: (msg: string) => console.log(chalk.bold(`\n✦ ${msg}\n`)),
  info: (msg: string) => console.log(chalk.gray(`  ${msg}`)),
  success: (msg: string) => console.log(chalk.green(`✓ ${msg}`)),
  warn: (msg: string) => console.log(chalk.yellow(`⚠ ${msg}`)),
  error: (msg: string) => console.error(chalk.red(`✖ ${msg}`)),
  dim: (msg: string) => console.log(chalk.dim(msg)),
  raw: (msg: string) => console.log(msg),
  newline: () => console.log(""),
};
