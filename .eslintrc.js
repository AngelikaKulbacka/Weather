module.exports = {
  root: true,
  env: {
    node: true,
  },
  plugins: ['vue', 'prettier'],
  parser: 'vue-eslint-parser',
  extends: [
    'plugin:prettier/recommended',
    'eslint:recommended',
    'plugin:vue/vue3-essential',
    '@vue/typescript/recommended',
    'plugin:@typescript-eslint/recommended',
  ],
  parserOptions: {
    ecmaVersion: 2020,
  },
  rules: {
    'prettier/prettier': [
      'error',
      {
        arrowParens: 'always',
        semi: true,
        useTabs: false,
        tabWidth: 2,
        singleQuote: true,
        trailingComma: 'es5',
        bracketSameLine: true,
        endOfLine: 'crlf',
      },
    ],
    'vue/max-len': [
      'error',
      {
        code: 100,
        template: 120,
        tabWidth: 4,
        ignoreStrings: true,
        ignoreHTMLAttributeValues: true,
        comments: 120,
        ignoreUrls: true,
      },
    ],
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/ban-ts-comment': 'off',
    '@typescript-eslint/no-empty-interface': 'off',
    'no-console':
      process.env.NODE_ENV === 'production'
        ? ['error', { allow: ['warn', 'error'] }]
        : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    '@typescript-eslint/no-this-alias': [
      'error',
      {
        allowedNames: ['self'],
      },
    ],
    'vue/html-closing-bracket-spacing': [
      'error',
      {
        startTag: 'never',
        endTag: 'never',
        selfClosingTag: 'always',
      },
    ],
    'vue/html-closing-bracket-newline': [
      'error',
      {
        singleline: 'never',
        multiline: 'never',
      },
    ],
    'vue/singleline-html-element-content-newline': 'off',
    'vue/multiline-html-element-content-newline': 'error',
    'linebreak-style': ['error', 'windows'],
  },
};
