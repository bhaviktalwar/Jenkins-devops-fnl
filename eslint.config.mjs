import globals from "globals";
import jest from "eslint-plugin-jest";

export default [
  {
    files: ["**/*.js"],
    
    ignores: [
      "node_modules/**",
      "coverage/**"
    ],

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
      "no-unused-vars": "warn",
      "no-console": "off",
      "eqeqeq": "error",
      "complexity": ["error", 5],   // threshold (HD)
      "max-lines": ["warn", 300],   // maintainability
      "no-duplicate-imports": "error"
    }
  }
];