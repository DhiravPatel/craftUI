import path from "node:path";
import { Command } from "commander";
import chalk from "chalk";
import inquirer from "inquirer";
import fs from "fs-extra";
import { readConfig } from "../utils/config.js";
import {
  findPreset,
  generateThemeFromHex,
  PRESET_THEMES,
  renderCssVariables,
} from "../utils/theme-generator.js";
import { logger } from "../utils/logger.js";

async function injectThemeIntoCss(cssPath: string, block: string) {
  const exists = await fs.pathExists(cssPath);
  const current = exists ? await fs.readFile(cssPath, "utf8") : "";

  const startMarker = "/* craftui:theme:start */";
  const endMarker = "/* craftui:theme:end */";
  const wrapped = `${startMarker}\n${block}\n${endMarker}`;

  if (current.includes(startMarker) && current.includes(endMarker)) {
    const replaced = current.replace(
      new RegExp(`${startMarker}[\\s\\S]*?${endMarker}`),
      wrapped
    );
    await fs.writeFile(cssPath, replaced);
    return;
  }

  const header = current.includes("@tailwind")
    ? current
    : `@tailwind base;\n@tailwind components;\n@tailwind utilities;\n\n${current}`;

  await fs.ensureDir(path.dirname(cssPath));
  await fs.writeFile(cssPath, `${header.trim()}\n\n${wrapped}\n`);
}

export const themeCommand = new Command("theme")
  .description("Theme management — generate, list, apply presets")
  .addCommand(
    new Command("list")
      .description("List available preset themes")
      .action(() => {
        logger.heading("Preset Themes");
        PRESET_THEMES.forEach((t) =>
          console.log(
            `  ${chalk.cyan(t.name.padEnd(10))}${chalk.dim(`craftui theme apply ${t.name}`)}`
          )
        );
        logger.newline();
      })
  )
  .addCommand(
    new Command("apply")
      .description("Apply a preset theme")
      .argument("<name>", "Theme name")
      .option("-c, --cwd <path>", "Working directory", process.cwd())
      .action(async (name: string, options) => {
        const cwd = path.resolve(options.cwd ?? process.cwd());
        const config = await readConfig(cwd);
        const preset = findPreset(name);
        if (!preset) {
          logger.error(`Unknown theme: ${name}. Run \`craftui theme list\`.`);
          process.exit(1);
        }
        const block = renderCssVariables(preset);
        await injectThemeIntoCss(path.join(cwd, config.tailwind.css), block);
        logger.success(`Applied theme: ${name}`);
      })
  )
  .addCommand(
    new Command("generate")
      .description("Generate a custom theme from a primary color")
      .option("--color <hex>", "Primary hex color (e.g. #3B82F6)")
      .option("--radius <radius>", "Border radius (e.g. 0.5rem)")
      .option("-c, --cwd <path>", "Working directory", process.cwd())
      .action(async (options) => {
        const cwd = path.resolve(options.cwd ?? process.cwd());
        const config = await readConfig(cwd);

        const answers = await inquirer.prompt(
          [
            !options.color && {
              type: "input",
              name: "color",
              message: "Primary brand color (hex):",
              default: "#3B82F6",
              validate: (v: string) =>
                /^#[0-9A-Fa-f]{6}$/.test(v) || "Invalid hex color",
            },
            !options.radius && {
              type: "list",
              name: "radius",
              message: "Border radius:",
              choices: [
                { name: "None (0)", value: "0" },
                { name: "Small (0.25rem)", value: "0.25rem" },
                { name: "Medium (0.5rem)", value: "0.5rem" },
                { name: "Large (0.75rem)", value: "0.75rem" },
                { name: "Full (9999px)", value: "9999px" },
              ],
              default: "0.5rem",
            },
          ].filter(Boolean) as Parameters<typeof inquirer.prompt>[0]
        );

        const color = options.color ?? answers.color;
        const radius = options.radius ?? answers.radius ?? "0.5rem";
        const preset = generateThemeFromHex(color, radius);
        const block = renderCssVariables(preset);

        await injectThemeIntoCss(path.join(cwd, config.tailwind.css), block);
        logger.success(`Generated theme from ${color}`);
      })
  );
