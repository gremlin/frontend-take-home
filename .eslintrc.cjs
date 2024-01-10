module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parser: '@typescript-eslint/parser',
  plugins: [
      'react-refresh',
      '@typescript-eslint',
      'import',
  ],
  rules: {
    '@typescript-eslint/explicit-function-return-type': 'warn',
    '@typescript-eslint/explicit-module-boundary-types': 'warn',
    '@typescript-eslint/no-explicit-any': 'error',
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
    'import/order': ['error', {
      'groups': [['builtin', 'external'], 'internal', 'parent', 'sibling', 'index', 'object'],
      'pathGroups': [
        {
          pattern: 'react*/',
          group: 'external',
          position: 'before'
        },
        {
          pattern: '**/*.scss',
          group: 'object',
          position: 'after'
        },
      ],
      'pathGroupsExcludedImportTypes': ['react', 'react-dom'],
      'newlines-between': 'always',
      'alphabetize': {
        order: 'asc',
        caseInsensitive: true
      }
    }],
    'quotes': ['error', 'single', { 'avoidEscape': true, 'allowTemplateLiterals': true }],
  },
}