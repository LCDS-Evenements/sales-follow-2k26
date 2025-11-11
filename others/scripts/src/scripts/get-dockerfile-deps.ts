import type { Script } from "#/utils/script";
import { checkbox } from "@inquirer/prompts";
import { execSync } from "node:child_process";
import { join, normalize, sep } from "node:path";
import { z } from "zod";

export const SERVICES = {
  frontend: "@core-services/frontend",
} as const satisfies Record<string, string>;

const basePackageSchema = z.object({
  path: z.string(),
});

type Category = z.output<typeof basePackageSchema> & {
  dependencies?: Record<string, Category>;
};

export const packageSchema: z.ZodType<Category> = basePackageSchema.extend({
  dependencies: z.lazy(() => z.record(z.string(), packageSchema)).optional(),
});

export const packageListSchema = basePackageSchema.extend({
  name: z.string(),
  dependencies: z.lazy(() => z.record(z.string(), packageSchema)).optional(),
}).array();

export const recursiveFindPath = (packageInfo: z.output<typeof packageSchema>, result: string[] = []): string[] => {
  result.push(packageInfo.path);

  if (packageInfo.dependencies === undefined) return result;

  for (const subPackageInfo of Object.values(packageInfo.dependencies)) {
    recursiveFindPath(subPackageInfo, result);
  }

  return result;
};

export const replaceStrings = (origin: string, replacements: [string, string][]): string => {
  let replacedString = origin;

  for (const [search, replacement] of replacements) {
    replacedString = replacedString.replaceAll(search, replacement);
  }

  return replacedString;
};

export default {
  description: "Get the dependencies of a service to be used in a Dockerfile",
  execute: async () => {
    const output = execSync(
      "pnpm list --filter=@core-services/* --only-project --depth Infinity --json",
      { encoding: "utf8" },
    ).trim();

    const values = packageListSchema.safeParse(JSON.parse(output));

    if (!values.success) {
      console.error(`Error while parsing data: ${values.error.message}`);
      return;
    }

    const services = await checkbox({
      message: "Select services",
      choices: values.data.map((value) => ({
        name: value.name,
        value: value,
      })),
    });

    // get monorepo root path
    // compatible with any OS (node & pnpm need to be installed)
    const monorepoRootPath = execSync(
      "pnpm --workspace-root exec node -e \"process.stdout.write(process.cwd())\"",
      { encoding: "utf8" },
    );

    for (const config of services) {
      console.log([
        "",
        "-".repeat(process.stdout.columns),
        config.name,
        "-".repeat(process.stdout.columns),
      ].join("\n"));

      const uniquePaths = new Set(recursiveFindPath(config));
      const pathToRemove = normalize(join(monorepoRootPath, sep));

      const paths = [...uniquePaths].map((value) => replaceStrings(value, [
        [pathToRemove, ""],
        [sep, "/"],
      ]));
      const maxLength = Math.max(...paths.map((value) => value.length));

      for (const value of paths.sort()) {
        console.log(`COPY ./${value}/ ${" ".repeat(maxLength - value.length)}./${value}/`);
      }
    }
  },
} satisfies Script;
