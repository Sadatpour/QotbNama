module.exports = {
  root: true,
  env: { browser: true, es2021: true },
  extends: ['eslint:recommended'],
  parserOptions: { ecmaVersion: 'latest', sourceType: 'module', ecmaFeatures: { jsx: true } },
  ignorePatterns: ['dist', 'node_modules', '*.config.js', '*.config.ts'],
  rules: {},
}
