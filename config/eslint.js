// Inspired by https://github.com/airbnb/javascript but less opinionated.

// We use eslint-loader so even warnings are very visibile.
// This is why we only use 'WARNING' level for potential errors,
// and we don't use 'ERROR' level at all.

// In the future, we might create a separate list of rules for production.
// It would probably be more strict.

module.exports = {
  root: true,

  extends: 'airbnb',

  parser: 'babel-eslint',

  plugins: [/*'import', */'flowtype', 'jsx-a11y', 'react'],

  env: {
    browser: true,
    commonjs: true,
    es6: true,
    node: true
  },

  parserOptions: {
    ecmaVersion: 6,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
      generators: true,
      experimentalObjectRestSpread: true
    }
  },

  settings: {
    flowtype: {
      'onlyFilesWithFlowAnnotation': true
    },
    'import/ignore': [
      'node_modules',
      '\\.(json|css|jpg|png|gif|eot|svg|ttf|woff|woff2|mp4|webm)$',
    ],
    'import/extensions': ['.js'],
    'import/resolver': {
      node: {
        extensions: ['.js', '.json']
      }
    }
  },

  rules: {
    semi: ['error', 'never'],
    'comma-dangle': ['error', 'only-multiline'],
    'spaced-comment': ['warn', 'always'],
    'global-require': 'warn',
    'react/jsx-filename-extension': 'off',
  }
}
