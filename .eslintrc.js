module.exports = {
  root: true,
  parserOptions: {
    parser: '@typescript-eslint/parser',
  },
  plugins: [
    '@typescript-eslint',
  ],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:vue/essential',
  ],
  rules: {
    'no-undef': 'off',
    '@typescript-eslint/no-use-before-define': 'off',
    '@typescript-eslint/no-explicit-any': 'off',

    'quotes': ['error', 'single'],
    'comma-dangle': ['error', 'always-multiline'],
    '@typescript-eslint/explicit-function-return-type': ['warn', {
      allowExpressions: true,
    }],
    '@typescript-eslint/member-delimiter-style': ['error', {
      multiline: { delimiter: 'none' },
      singleline: { delimiter: 'comma', requireLast: false },
    }],
  },
  overrides: [
    {
      files: ['**/*.js'],
      rules: {
        '@typescript-eslint/no-var-requires': 'off',
        '@typescript-eslint/explicit-function-return-type': 'off',
      },
    }
  ],
}
