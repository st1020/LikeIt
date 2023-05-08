/* eslint-env node */

module.exports = {
  root: true,
  extends: ["eslint:recommended"],
  ignorePatterns: ["assets/lib/**"],
  env: {
    browser: true,
    esnext: true,
  },
};
