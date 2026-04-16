import js from "@eslint/js";
import globals from "globals";
import jest from "eslint-plugin-jest";

export default [
  {
    files: ["**/*.js"],
    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.jest
      }
    },
    plugins: {
      jest
    },
    rules: {
      "no-unused-vars": "warn"
    }
  }
];