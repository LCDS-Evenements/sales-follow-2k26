import { eslintConfig } from "@bluzzi/eslint-config";

export default eslintConfig(
  {
    typescript: { tsconfigPath: "./tsconfig.json" },
  },
  {
    ignores: ["**/*.gtype.ts"],
  },
  {
    rules: {
      "@eslint-react/hooks-extra/no-direct-set-state-in-use-effect": "off",
      "react-hooks/exhaustive-deps": "off",
    },
  },
);
