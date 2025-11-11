import type { Script } from "#/utils/script";
import { select } from "@inquirer/prompts";
import { readdirSync } from "node:fs";
import { join } from "node:path";

// Get the list of scripts:
const scriptsDirectory = join(import.meta.dirname, "scripts");
const scripts: ({ name: string } & Script)[] = [];

for (const filename of readdirSync(scriptsDirectory)) {
  const scriptFile = await import(join(scriptsDirectory, filename)) as { default: Script };

  scripts.push({ name: filename.replace(".ts", ""), ...scriptFile.default });
}

const [_, __, ...argv] = process.argv;
let execute;
for (const arg of argv) {
  if (!arg.startsWith("--")) continue;

  const [command, value] = arg.substring(2).split("=");

  if (command === undefined || command !== "script") continue;
  if (value === undefined) continue;

  const script = scripts.find((script) => script.name === value);

  if (script === undefined) continue;

  execute = script.execute;
  break;
}

if (execute === undefined) {
// Ask for the script to run:
  execute = await select<Script["execute"]>({
    message: "Choose the script you want to run",
    choices: scripts.map((element) => ({
      name: element.name,
      description: element.description,
      value: element.execute,
    })),
  });
}

// Run the script:
await execute();
