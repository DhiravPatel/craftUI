import path from "node:path";
import { fileURLToPath } from "node:url";
import { Command } from "commander";
import chalk from "chalk";
import ora from "ora";
import inquirer from "inquirer";
import fs from "fs-extra";
import {
  DEFAULT_CONFIG,
  writeConfig,
  type CraftUIConfig,
} from "../utils/config.js";
import {
  detectFramework,
  detectTailwind,
  detectTypeScript,
} from "../utils/detect.js";
import { installDependencies } from "../utils/installer.js";
import { logger } from "../utils/logger.js";
import {
  findPreset,
  renderCssVariables,
} from "../utils/theme-generator.js";

const __filename = fileURLToPath(import.meta.url);
const TEMPLATES_DIR = path.resolve(path.dirname(__filename), "../templates");

async function loadTemplate(name: string): Promise<string> {
  const candidates = [
    path.join(TEMPLATES_DIR, name),
    path.resolve(path.dirname(__filename), "templates", name),
    path.resolve(path.dirname(__filename), "..", "templates", name),
  ];
  for (const c of candidates) {
    if (await fs.pathExists(c)) return fs.readFile(c, "utf8");
  }
  throw new Error(`Template not found: ${name}`);
}

export const initCommand = new Command("init")
  .description("Initialize CraftUI in your project")
  .option("--no-install", "Skip installing dependencies")
  .option("-y, --yes", "Accept defaults without prompting")
  .option("-c, --cwd <path>", "Working directory", process.cwd())
  .action(async (options) => {
    const cwd = path.resolve(options.cwd ?? process.cwd());
    logger.heading("CraftUI Init");

    const detect = ora("Detecting project setup…").start();
    const framework = await detectFramework(cwd);
    const isTypescript = await detectTypeScript(cwd);
    const hasTailwind = await detectTailwind(cwd);
    detect.succeed("Project detected");

    logger.info(`Framework: ${chalk.cyan(framework)}`);
    logger.info(`TypeScript: ${chalk.cyan(isTypescript ? "yes" : "no")}`);
    logger.info(`Tailwind: ${chalk.cyan(hasTailwind ? "yes" : "no")}`);
    logger.newline();

    const answers = options.yes
      ? {
          componentsDir: "components/ui",
          style: "default" as const,
          baseColor: "slate",
          cssVariables: true,
        }
      : await inquirer.prompt([
          {
            type: "input",
            name: "componentsDir",
            message: "Where should components be installed?",
            default: framework === "next" ? "components/ui" : "src/components/ui",
          },
          {
            type: "list",
            name: "style",
            message: "Which style would you like to use?",
            choices: ["default", "new-york"],
            default: "default",
          },
          {
            type: "list",
            name: "baseColor",
            message: "Which base color would you like to use?",
            choices: ["slate", "gray", "zinc", "neutral", "stone"],
            default: "slate",
          },
          {
            type: "confirm",
            name: "cssVariables",
            message: "Use CSS variables for theming?",
            default: true,
          },
        ]);

    const config: CraftUIConfig = {
      ...DEFAULT_CONFIG,
      style: answers.style,
      rsc: framework === "next",
      tsx: isTypescript,
      tailwind: {
        ...DEFAULT_CONFIG.tailwind,
        config: isTypescript ? "tailwind.config.ts" : "tailwind.config.js",
        css:
          framework === "next" ? "app/globals.css" : "src/index.css",
        baseColor: answers.baseColor,
        cssVariables: answers.cssVariables,
      },
      aliases: {
        components: `@/${answers.componentsDir.replace(/^\.?\//, "")}`,
        ui: `@/${answers.componentsDir.replace(/^\.?\//, "")}`,
        utils: "@/lib/utils",
        lib: "@/lib",
        hooks: "@/hooks",
      },
    };

    const writing = ora("Writing craftui.config.json…").start();
    await writeConfig(config, cwd);
    writing.succeed("Wrote craftui.config.json");

    // Tailwind config
    if (!hasTailwind) {
      const tailwindTpl = await loadTemplate("tailwind.config.ts.tpl");
      await fs.writeFile(path.join(cwd, config.tailwind.config), tailwindTpl);
      logger.success(`Created ${config.tailwind.config}`);
    } else {
      logger.info(
        `tailwind config exists at ${config.tailwind.config} — extend manually.`
      );
    }

    // globals.css
    const preset = findPreset(answers.baseColor) ?? findPreset("slate")!;
    const themeVars = renderCssVariables(preset);
    const cssTpl = await loadTemplate("globals.css.tpl");
    const cssPath = path.join(cwd, config.tailwind.css);
    await fs.ensureDir(path.dirname(cssPath));
    await fs.writeFile(
      cssPath,
      cssTpl.replace("{{themeVariables}}", themeVars)
    );
    logger.success(`Wrote theme variables to ${config.tailwind.css}`);

    // utils.ts — resolve the aliased "utils" path to a filesystem location.
    const utilsTpl = await loadTemplate("utils.ts.tpl");
    const utilsRel = config.aliases.utils
      .replace(/^@\//, "")
      .replace(/^src\//, "src/");
    const utilsBase = path.join(
      cwd,
      utilsRel.startsWith("src/") || (await fs.pathExists(path.join(cwd, "src")))
        ? utilsRel.startsWith("src/")
          ? utilsRel
          : path.join("src", utilsRel)
        : utilsRel
    );
    const utilsTarget = `${utilsBase}.ts`;
    await fs.ensureDir(path.dirname(utilsTarget));
    if (!(await fs.pathExists(utilsTarget))) {
      await fs.writeFile(utilsTarget, utilsTpl);
      logger.success(`Created ${path.relative(cwd, utilsTarget)}`);
    }

    // Install core deps
    if (options.install !== false) {
      const install = ora("Installing core dependencies…").start();
      try {
        await installDependencies(cwd, [
          "tailwindcss-animate",
          "class-variance-authority",
          "clsx",
          "tailwind-merge",
          "lucide-react",
        ]);
        install.succeed("Dependencies installed");
      } catch (err) {
        install.fail("Failed to install dependencies");
        throw err;
      }
    }

    logger.newline();
    logger.success("CraftUI initialized!");
    logger.info("Next: run `craftui add button` to install your first component.");
    logger.newline();
  });
