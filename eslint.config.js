import globals from "globals";
import pluginJs from "@eslint/js";


/** @type {import('eslint').Linter.Config[]} */
export default [
  {languageOptions: { globals: globals.browser }},
  pluginJs.configs.recommended,
  {
    rules: {
      "no-unused-vars": "warn",
      "no-console": "error",
      "eqeqeq": "error",
      "semi": ["error", "always"],
      "prefer-const": "warn",
      "quotes": ["error", "double"],
      "no-var": "error",
      "curly": "error",
      "camelcase": "error"
    }
  }
];