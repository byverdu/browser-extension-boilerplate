module.exports = {
  env: {
    browser: true,
    es6: true,
    webextensions: true,
    'jest/globals': true
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: './tsconfig.json',
  },
  plugins: [
    '@typescript-eslint'
  ],
  rules: {
    indent: [
      'error',
      2
    ],
    'prefer-destructuring': [
      'error',
      {
        array: true,
        object: true
      }
    ],
    'no-console': 0,
    'object-shorthand': [
      'error',
      'always'
    ],
    'prefer-const': 2,
    'object-curly-spacing': [
      'error',
      'always'
    ],
    'array-bracket-spacing': [
      'error',
      'always'
    ],
    'computed-property-spacing': [
      'error',
      'always'
    ],
    'space-before-function-paren': [
      'error',
      'always'
    ],
    'func-call-spacing': [
      'error',
      'always'
    ],
    'keyword-spacing': [
      'error',
      {
        before: true
      }
    ],
    'space-in-parens': [
      'error',
      'always'
    ],
    'linebreak-style': [
      'error',
      'unix'
    ],
    quotes: [
      'error',
      'single'
    ],
    semi: [
      'error',
      'always'
    ]
  }
};