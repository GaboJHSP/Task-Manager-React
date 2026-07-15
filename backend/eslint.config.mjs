import eslint from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";

export default tseslint.config(
  {
    ignores: [
      "node_modules/**",
      "dist/**",
      "coverage/**",
      "prisma/migrations/**",
    ],
  },

  eslint.configs.recommended,

  ...tseslint.configs.recommended,

  {
    files: ["src/**/*.ts", "tests/**/*.ts"],

    languageOptions: {
      globals: {
        ...globals.node,
      },
    },

    rules: {
      // Tu código actual utiliza req, res y next con tipo any.
      // Puede mantenerse temporalmente desactivado.
      "@typescript-eslint/no-explicit-any": "off",
    },
  },
);