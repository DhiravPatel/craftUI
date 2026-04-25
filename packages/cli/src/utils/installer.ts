import { execa } from "execa";
import { detectPackageManager } from "./detect.js";

export async function installDependencies(
  cwd: string,
  deps: string[],
  options: { dev?: boolean } = {}
): Promise<void> {
  if (deps.length === 0) return;
  const manager = await detectPackageManager(cwd);

  const installArg: Record<typeof manager, string> = {
    pnpm: "add",
    yarn: "add",
    npm: "install",
    bun: "add",
  };

  const devFlag: Record<typeof manager, string> = {
    pnpm: "-D",
    yarn: "--dev",
    npm: "--save-dev",
    bun: "-D",
  };

  const args = [installArg[manager]];
  if (options.dev) args.push(devFlag[manager]);
  args.push(...deps);

  await execa(manager, args, { cwd, stdio: "inherit" });
}
