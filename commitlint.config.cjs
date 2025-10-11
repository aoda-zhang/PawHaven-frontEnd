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
    // Scope is optional but if present, must be lowercase
    'scope-case': [2, 'always', 'lower-case'],
    // Subject must be lowercase
    'subject-case': [2, 'always', 'lower-case'],
    // Subject must be at least 10 characters long
    'subject-min-length': [2, 'always', 10],
    // Enforce maximum header length of 100 characters
    'header-max-length': [2, 'always', 100],
  },
};
