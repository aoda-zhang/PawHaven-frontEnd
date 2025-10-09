/**
 * Base ESLint configuration for PawHaven monorepo projects.
 * This configuration provides a foundational setup for linting JavaScript and TypeScript code,
 * ensuring consistent code style, best practices, and error prevention across all packages.
 */
module.exports = {
  // Define the environments that the code is designed to run in.
  // This enables global variables predefined by these environments.
  env: {
    browser: true, // Enables browser global variables like window and document
    node: true, // Enables Node.js global variables and Node.js scoping
    es2022: true, // Enables all ECMAScript 2022 globals and syntax
  },

  // Specify the parser to use for ESLint.
  // '@typescript-eslint/parser' allows ESLint to lint TypeScript code.
  parser: '@typescript-eslint/parser',

  // Plugins extend ESLint with additional rules and capabilities.
  // '@typescript-eslint' provides TypeScript-specific linting rules.
  // 'prettier' integrates Prettier formatting rules into ESLint.
  // 'import' helps validate proper import/export syntax and ordering.
  plugins: ['@typescript-eslint', 'prettier', 'import'],

  // The 'extends' array includes shared ESLint configurations to inherit rules from.
  // 'airbnb' provides a widely adopted style guide as a base.
  // 'plugin:import/errors' and 'plugin:import/warnings' add import-related linting.
  // 'plugin:prettier/recommended' integrates Prettier formatting as ESLint rules.
  extends: [
    'airbnb',
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:prettier/recommended',
  ],

  // Parser options specify the JavaScript language options and features to support.
  parserOptions: {
    ecmaVersion: 'latest', // Use the latest ECMAScript syntax available
    sourceType: 'module', // Enable support for ES modules
    ecmaFeatures: {
      jsx: true, // Enable linting for JSX syntax (used in React)
    },
  },

  // Rules define the specific linting behaviors and code style preferences.
  rules: {
    // Prettier rules enforce consistent code formatting.
    'prettier/prettier': 'error',

    // General JavaScript best practices and warnings.
    'no-console': 'warn', // Warn on console usage to encourage proper logging
    'no-debugger': 'warn', // Warn on debugger statements to avoid leftover debugging code
    'no-alert': 'warn', // Warn on alert usage as it can be disruptive

    // Import rules help manage module imports and enforce order and correctness.
    'import/no-unresolved': 'off', // Disabled to allow unresolved imports (e.g., handled by bundler)
    'import/extensions': 'off', // Disable requiring file extensions in imports
    'import/order': [
      'error',
      {
        groups: [
          'builtin', // Node.js built-in modules
          'external', // External modules from node_modules
          'internal', // Internal modules within the project
          'parent', // Parent directories
          'sibling', // Sibling files
          'index', // Index files
          'object', // Object imports
        ],
        'newlines-between': 'always', // Enforce new lines between import groups for readability
        alphabetize: { order: 'asc', caseInsensitive: true }, // Sort imports alphabetically
      },
    ],
    'import/newline-after-import': ['error', { count: 1 }], // Require newline after import statements
    'import/no-duplicates': 'error', // Prevent duplicate imports
    'import/default': 'off', // Disabled due to potential false positives
    'import/no-named-as-default-member': 'off', // Disabled to avoid conflicts in named imports
    'import/no-named-as-default': 'off', // Disabled for similar reasons

    // TypeScript-specific rules enhance type safety and consistency.
    'no-unused-vars': 'off', // Disable base rule to avoid conflict with TypeScript version
    '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }], // Error on unused vars except those prefixed with _
    '@typescript-eslint/explicit-function-return-type': 'off', // Disable mandatory return types for functions
    '@typescript-eslint/explicit-module-boundary-types': 'off', // Disable explicit types on module boundaries
    '@typescript-eslint/no-empty-function': 'off', // Allow empty functions (useful in some cases)
    '@typescript-eslint/no-explicit-any': 'off', // Allow usage of 'any' type
    '@typescript-eslint/consistent-type-imports': [
      'error',
      { prefer: 'type-imports', disallowTypeAnnotations: false },
    ], // Enforce consistent usage of type-only imports
    '@typescript-eslint/array-type': ['warn', { default: 'array-simple' }], // Prefer simple array types like T[] over Array<T>
    '@typescript-eslint/ban-ts-comment': [
      'warn',
      { 'ts-ignore': 'allow-with-description' },
    ], // Warn on ts-ignore comments without descriptions

    // Other miscellaneous rules for code style and safety.
    'func-style': ['error', 'declaration', { allowArrowFunctions: true }], // Enforce function declarations except for arrow functions
    'no-magic-numbers': [
      'warn',
      { ignore: [0, 1, -1], ignoreArrayIndexes: true },
    ], // Warn on magic numbers except common ones and array indexes
    'no-param-reassign': [
      'error',
      {
        props: true,
        ignorePropertyModificationsFor: ['state'], // Allow parameter reassignment for 'state' (common in state management)
      },
    ],
  },
};

// This base configuration is intended to be extended by framework-specific configs,
// such as React and Node.js configurations, to provide environment-specific rules.
