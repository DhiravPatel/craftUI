/** @type {import("eslint").Linter.Config} */
module.exports = {
  root: true,
  extends: ["@craftui/config/eslint/base"],
  ignorePatterns: [
    "dist/",
    ".next/",
    ".turbo/",
    "node_modules/",
    "coverage/",
  ],
};
