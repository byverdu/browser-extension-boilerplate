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
    project: ['./tsconfig.json'],
  },
  plugins: [
    '@typescript-eslint',
    
  ],
  extends: [
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
  ],
  rules: {
    // ts
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
    'object-curly-newline': ['error', {
        'ObjectExpression': 'always',
        'ObjectPattern': { 'multiline': true },
        'ImportDeclaration': 'never',
        'ExportDeclaration': { 'multiline': true, 'minProperties': 3 }
    }],
    'object-property-newline': ['error'],

    // tsx
    'react/jsx-max-props-per-line': [2, { 'when': 'multiline' }],
    'react/jsx-indent-props': [2, 'first'],
    'react/jsx-wrap-multilines': [2, {
      'declaration': 'parens',
      'assignment': 'parens',
      'return': 'parens',
      'arrow': 'parens',
      }
    ],
    'react/jsx-props-no-multi-spaces': [2],
    'react/jsx-one-expression-per-line': [2, { 'allow': 'literal' }],
    'react/jsx-closing-bracket-location': [1, 'line-aligned']
  }
};