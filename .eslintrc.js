module.exports = {
  env: {
    commonjs: true,
    es2021: true,
    node: true,
  },
  extends: [
    'eslint:recommended',
    'airbnb-base',
    'prettier',
    'plugin:import/recommended',
    'plugin:playwright/recommended',
    'plugin:prettier/recommended',
  ],
  plugins: ['import', 'prettier'],
  overrides: [],
  parserOptions: {
    ecmaVersion: 'latest',
  },
  rules: {
    'playwright/valid-expect': 'off',
    'playwright/expect-expect': 'off',
    'import/prefer-default-export': 'off',
    'import/no-extraneous-dependencies': 'off',
    'prefer-regex-literals': 'off',
    'no-console': 'off',
    'no-useless-constructor': 'error',
    'no-empty-function': 'error',
    'max-len': [
      'error',
      {
        code: 120,
        ignoreComments: true,
        ignoreTrailingComments: true,
        ignoreUrls: true,
        ignoreStrings: true,
        ignoreTemplateLiterals: true,
        ignoreRegExpLiterals: true,
      },
    ],
    'prettier/prettier': [
      'error',
      {},
      {
        usePrettierrc: true,
      },
    ],
  },
  ignorePatterns: ['node_modules', 'playwright-report', 'test-results', 'blob-report'],
};
