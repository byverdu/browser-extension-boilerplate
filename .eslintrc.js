module.exports = {
  env: {
    browser: true,
    es6: true,
    webextensions: true,
    'jest': true
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    sourceType: 'module',
    tsconfigRootDir: __dirname,
    project: ["./tsconfig.json"],
  },
  plugins: [
    '@typescript-eslint'
  ],
  extends: [
    "plugin:react-hooks/recommended"
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
    ],
    "object-curly-newline": ["error", {
        "ObjectExpression": "always",
        "ObjectPattern": { "multiline": true },
        "ImportDeclaration": "never",
        "ExportDeclaration": { "multiline": true, "minProperties": 3 }
    }],
    "object-property-newline": ["error"]
  }
};