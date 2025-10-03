module.exports = {
  extends: [
    'airbnb',
    'airbnb/hooks',
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:prettier/recommended',
  ],
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'react', 'react-hooks', 'prettier'],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  rules: {
    'prettier/prettier': 'error',
    'no-console': 'warn',
    'import/no-unresolved': 'off',
    'import/extensions': 'off',
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
    'import/order': [
      'error',
      {
        groups: [
          'builtin',
          'external',
          'internal',
          'parent',
          'sibling',
          'index',
          'object',
        ],
        'newlines-between': 'always',
        alphabetize: { order: 'asc', caseInsensitive: true },
      },
    ],
    'import/default': 'off',
    'import/no-named-as-default-member': 'off',
    'import/no-named-as-default': 'off',
    '@typescript-eslint/explicit-function-return-type': ['off'],
    '@typescript-eslint/explicit-module-boundary-types': ['off'],
    '@typescript-eslint/no-empty-function': ['off'],
    '@typescript-eslint/no-explicit-any': ['off'],
    'no-param-reassign': [
      'error',
      {
        props: true,
        ignorePropertyModificationsFor: [
          'state', // Allow state modifications in React components
        ],
      },
    ],
  },
  overrides: [
    {
      files: ['apps/frontend/**/*.{ts,tsx,js,jsx}'],
      env: {
        browser: true,
      },
      plugins: ['@tanstack/query'],
      rules: {
        'react/react-in-jsx-scope': 'off', // Not required for React 17+
        'react/prop-types': 'off', // TypeScript handles prop types
        '@typescript-eslint/no-unused-vars': [
          'warn',
          { argsIgnorePattern: '^_' },
        ], // Ignore unused variables starting with _
        '@typescript-eslint/no-explicit-any': 'warn', // Warn on use of any
        '@typescript-eslint/explicit-function-return-type': 'off', // Optional in frontend
        'import/prefer-default-export': 'warn', // Prefer default export for single component files
        'no-console': 'warn', // Allow console for debugging
        'prefer-const': 'warn',
        'no-var': 'error', // Disallow var
        'import/order': ['warn', { 'newlines-between': 'always' }], // Enforce import order
        'react/jsx-filename-extension': [1, { extensions: ['.jsx', '.tsx'] }],
        'react/function-component-definition': [
          2,
          {
            namedComponents: 'arrow-function',
            unnamedComponents: 'arrow-function',
          },
        ],
        'react/jsx-props-no-spreading': ['off'],
        'react/require-default-props': 'off',
        'jsx-a11y/anchor-is-valid': 'off',
        '@tanstack/query/exhaustive-deps': 'error',
      },
    },
    {
      files: ['apps/backend/**/*.{ts,js}'],
      env: {
        node: true,
      },
      rules: {
        'no-useless-constructor': 'off',
        'import/prefer-default-export': 'off', // Use named exports for Controller/Service/Module/DTO
        '@typescript-eslint/no-useless-constructor': 'off', // Allow constructors with only dependency injection
        '@typescript-eslint/no-unused-vars': [
          'warn',
          { argsIgnorePattern: '^_' },
        ], // Ignore unused variables starting with _
        '@typescript-eslint/no-explicit-any': 'warn', // Warn on use of any
        '@typescript-eslint/explicit-function-return-type': 'warn', // Recommend explicit return types in backend
        'no-console': 'warn',
        'prefer-const': 'warn',
        'no-var': 'error', // Disallow var
        'import/order': ['warn', { 'newlines-between': 'always' }], // Enforce import order
        'class-methods-use-this': 'off', // Service methods may not use 'this'
        'max-classes-per-file': ['warn', 1], // One class per file
      },
    },
  ],
  settings: {
    react: {
      version: 'detect',
    },
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
      typescript: {
        alwaysTryTypes: true,
      },
    },
  },
};
