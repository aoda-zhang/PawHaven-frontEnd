// Header must follow the pattern: type(scope?): subject (e.g., 'feat(parser): add new feature')

module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    // Enforce type to be one of the specified types
    'type-enum': [
      2,
      'always',
      ['feat', 'fix', 'docs', 'style', 'refactor', 'perf', 'test', 'chore'],
    ],

    // Scope is optional and can be any case (uppercase, lowercase, or Chinese)
    'scope-case': [0],

    // Subject can include uppercase, lowercase, or Chinese
    // Setting to 0 disables the lowercase enforcement
    'subject-case': [0],

    // Subject must be at least 5 characters long (since Chinese takes fewer characters)
    'subject-min-length': [2, 'always', 5],

    // Enforce maximum header length of 100 characters
    'header-max-length': [2, 'always', 100],
  },
};
