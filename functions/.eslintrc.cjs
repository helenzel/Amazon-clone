/* eslint-env node */
module.exports = {
  env: {
    node: true,
    es2021: true
  },
  parserOptions: {
    sourceType: "script",
    ecmaVersion: 2021,
  },
  extends: ["eslint:recommended", "google"],
  rules: {
    "no-restricted-globals": ["error", "name", "length"],
    "prefer-arrow-callback": "error",
    quotes: ["error", "double", { allowTemplateLiterals: true }],
    "no-unused-vars": ["error", { varsIgnorePattern: "^[A-Z_]" }],
  },
  overrides: [
    {
      files: ["functions/**/*.js"], // <-- add this override
      env: {
        node: true,
        browser: false,
      },
      parserOptions: {
        sourceType: "script",
        ecmaVersion: 2021,
      },
      rules: {},
    },

    {
      files: ["**/*.spec.*"],
      env: {
        mocha: true,
      },
      rules: {},
    },
  ],
};
