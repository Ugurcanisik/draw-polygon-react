module.exports = {
  'env': {
    'browser': true,
    'es2021': true,
    'node': true
  },
  'extends': [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:import/recommended'
  ],
  'parser': '@babel/eslint-parser',
  'parserOptions': {
    'requireConfigFile': false,
    'babelOptions': {
      'presets': ['@babel/preset-react']
    },
    'ecmaFeatures': {
      'jsx': true
    }
  },
  'plugins': [
    'react'
  ],
  'settings': {
    'import/resolver': {
      'node': {
        'paths': ['src'],
        'extensions': ['.js', '.jsx', '.ts', '.tsx', '.json']
      },
      'eslint-import-resolver-custom-alias': {
        'alias': {
          '@/classes': './src/classes',
          '@/components': './src/components',
          '@/config': './src/config',
          '@/contexts': './src/contexts',
          '@/constants': './src/constants',
          '@/helpers': './src/helpers',
          '@/hooks': './src/hooks',
          '@/services': './src/services',
          '@/redux': './src/redux',
          '@/pages': './src/pages',
          '@/validations': './src/validations'
        },
        'extensions': ['.js', '.jsx', '.ts', '.tsx', '.json']
      }
    }
  },
  'ignorePatterns': ['/public/*.js'],
  'rules': {
    'comma-dangle': ['error', 'never'],
    'react/prop-types': 'off',
    'react/react-in-jsx-scope': 'off',
    'react/no-access-state-in-setstate': 'warn',
    'react/no-did-mount-set-state': 'warn',
    'react/no-did-update-set-state': 'warn',
    'react/no-this-in-sfc': 'warn',
    // 'react/jsx-child-element-spacing': 'warn',
    'react/jsx-curly-newline': ['warn', { multiline: 'require', singleline: 'consistent' }],
    'react/jsx-curly-spacing': ['warn', { when: 'never', allowMultiline: true }],
    'react/jsx-equals-spacing': ['warn', 'never'],
    'react/jsx-first-prop-new-line': ['warn'],
    'react/jsx-no-useless-fragment': 'warn',
    'react/jsx-props-no-multi-spaces': 'warn',
    'react/jsx-tag-spacing': ['warn'],
    // https://eslint.org/docs/rules/indent
    'indent': [
      'warn',
      2,
      {
        'ignoreComments': true,
        'offsetTernaryExpressions': false,
        'flatTernaryExpressions': true,
        'ObjectExpression': 1,
        'ArrayExpression': 1,
        'CallExpression': { 'arguments': 'first' },
        'FunctionExpression': { 'body': 1, 'parameters': 2 },
        'FunctionDeclaration': { 'body': 1, 'parameters': 2 },
        'MemberExpression': 1,
        'SwitchCase': 1
      }
    ],
    'no-empty': ['error', { 'allowEmptyCatch': true }],
    'no-async-promise-executor': ['warn'],
    // 'react/jsx-indent': ['warn', 2, { indentLogicalExpressions: true }],
    'react/jsx-indent-props': ['warn', 2],
    'curly': 'warn', // https://eslint.org/docs/rules/curly
    'no-new-wrappers': 'warn', // https://eslint.org/docs/rules/no-new-wrappers
    'block-scoped-var': 'warn', // https://eslint.org/docs/rules/block-scoped-var
    'no-shadow': 'warn', // https://eslint.org/docs/rules/no-shadow
    'no-else-return': 'warn', // https://eslint.org/docs/rules/no-else-return
    // 'no-extra-parens': ['warn'], // https://eslint.org/docs/rules/no-extra-parens
    'no-label-var': ['warn'], // https://eslint.org/docs/rules/no-label-var
    'no-multi-spaces': ['warn'], // https://eslint.org/docs/rules/no-multi-spaces
    'no-return-assign': ['warn'], // https://eslint.org/docs/rules/no-return-assign
    'no-trailing-spaces': ['warn'], // https://eslint.org/docs/rules/no-trailing-spaces
    'no-undef-init': ['warn'], // https://eslint.org/docs/rules/no-undef-init
    'no-useless-computed-key': ['warn'], // https://eslint.org/docs/rules/no-useless-computed-key
    'no-useless-rename': ['warn'], // https://eslint.org/docs/rules/no-useless-rename
    'no-whitespace-before-property': ['warn'], // https://eslint.org/docs/rules/no-whitespace-before-property
    'rest-spread-spacing': ['warn'], // https://eslint.org/docs/rules/rest-spread-spacing
    'no-return-await': 'warn', // https://eslint.org/docs/rules/no-return-await
    'no-self-compare': 'warn', // https://eslint.org/docs/rules/no-self-compare
    'no-useless-concat': 'warn', // https://eslint.org/docs/rules/no-useless-concat
    'no-use-before-define': 'warn', // https://eslint.org/docs/rules/no-use-before-define

    /* Styling */
    'array-bracket-spacing': ['warn', 'never'], // https://eslint.org/docs/rules/array-bracket-spacing
    'array-bracket-newline': ['warn', 'consistent'], // https://eslint.org/docs/rules/array-bracket-newline
    'array-element-newline': ['warn', 'consistent'], // https://eslint.org/docs/rules/array-element-newline
    'block-spacing': 'warn', // https://eslint.org/docs/rules/block-spacing
    'brace-style': ['warn', '1tbs', { allowSingleLine: true }], // https://eslint.org/docs/rules/brace-style
    'camelcase': ['warn'], // https://eslint.org/docs/rules/camelcase
    'new-cap': ['warn'], // https://eslint.org/docs/rules/new-cap
    'new-parens': ['warn'], // https://eslint.org/docs/rules/new-parens
    'wrap-iife': ['warn'], // https://eslint.org/docs/rules/wrap-iife
    'yoda': ['warn'], // https://eslint.org/docs/rules/yoda
    'comma-spacing': ['warn', { before: false, after: true }], // https://eslint.org/docs/rules/comma-spacing
    'comma-style': ['warn', 'last'], // https://eslint.org/docs/rules/comma-style
    'func-call-spacing': 'warn', // https://eslint.org/docs/rules/func-call-spacing
    'function-call-argument-newline': ['warn', 'consistent'], // https://eslint.org/docs/rules/function-call-argument-newline
    'function-paren-newline': ['warn', 'consistent'], // https://eslint.org/docs/rules/function-paren-newline
    'key-spacing': ['warn', { 'beforeColon': false, 'afterColon': true, 'mode': 'strict' }], // https://eslint.org/docs/rules/key-spacing
    'keyword-spacing': ['warn', { 'before': true, 'after': true }], // https://eslint.org/docs/rules/keyword-spacing
    'lines-around-comment': ['warn'], // https://eslint.org/docs/rules/lines-around-comment
    'lines-between-class-members': ['warn'], // https://eslint.org/docs/rules/lines-between-class-members
    'multiline-ternary': ['warn', 'always-multiline'], // https://eslint.org/docs/rules/multiline-ternary
    'newline-per-chained-call': ['warn', { 'ignoreChainWithDepth': 3 }], // https://eslint.org/docs/rules/newline-per-chained-call
    'no-lonely-if': ['warn'], // https://eslint.org/docs/rules/no-lonely-if
    'no-mixed-operators': ['warn'], // https://eslint.org/docs/rules/no-mixed-operators
    'no-multiple-empty-lines': ['warn', { 'max': 2 }], // https://eslint.org/docs/rules/no-multiple-empty-lines
    'no-unneeded-ternary': ['warn'], // https://eslint.org/docs/rules/no-unneeded-ternary
    'object-curly-spacing': ['warn', 'always'], // https://eslint.org/docs/rules/object-curly-spacing
    'operator-linebreak': ['warn'], // https://eslint.org/docs/rules/operator-linebreak
    'semi-spacing': ['warn'], // https://eslint.org/docs/rules/semi-spacing
    'semi-style': ['warn'], // https://eslint.org/docs/rules/semi-style
    'space-unary-ops': ['warn'], // https://eslint.org/docs/rules/space-unary-ops
    'space-before-blocks': ['warn'], // https://eslint.org/docs/rules/space-before-blocks
    'space-in-parens': ['warn', 'never'], // ??? https://eslint.org/docs/rules/space-in-parens
    'space-infix-ops': ['warn'], // https://eslint.org/docs/rules/space-infix-ops
    'space-before-function-paren': ['warn', { 'anonymous': 'never', 'named': 'never', 'asyncArrow': 'always' }], // https://eslint.org/docs/rules/space-before-function-paren
    'switch-colon-spacing': ['warn'], // https://eslint.org/docs/rules/switch-colon-spacing
    'spaced-comment': ['warn', 'always'], // https://eslint.org/docs/rules/spaced-comment
    'arrow-spacing': ['warn'], // https://eslint.org/docs/rules/arrow-spacing
    'no-duplicate-imports': ['warn'], // https://eslint.org/docs/rules/no-duplicate-imports
    'template-curly-spacing': ['warn'], // https://eslint.org/docs/rules/template-curly-spacing
    'no-nested-ternary': ['warn'], // ??? https://eslint.org/docs/rules/no-nested-ternary
    'quotes': ['warn', 'single'], // ??? https://eslint.org/docs/rules/quotes
    'jsx-quotes': ['warn', 'prefer-single'], // ??? https://eslint.org/docs/rules/jsx-quotes
    // "arrow-body-style": ["warn", "always"], // https://eslint.org/docs/rules/arrow-body-style
    // 'implicit-arrow-linebreak': ['warn', 'beside'], // https://eslint.org/docs/rules/implicit-arrow-linebreak
    'react-hooks/exhaustive-deps': 'off',
    'no-case-declarations': 'off',
    'no-unused-vars': 'warn'
  }
}
