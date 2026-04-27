import { CopyCommand } from "./copy-command";

export function InstallCommand({ component }: { component: string }) {
  return <CopyCommand command={`npx craftui@latest add ${component}`} />;
}
