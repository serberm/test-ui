module.exports = {
    extends: ['react-app', 'eslint:recommended'],
    rules: {
        'linebreak-style': [
            'error',
            'unix'
        ],
        'key-spacing': 'error',
        'brace-style': ['error', '1tbs', {'allowSingleLine': true}],
        'keyword-spacing': 'error',
        'space-before-blocks': 'error',
        'quotes': [
            'error',
            'single'
        ],
        'quote-props': ['error', 'as-needed', { "keywords": true }],
        'no-console': ['error', { allow: ['error'] }],
        'space-infix-ops': 'error',
        'arrow-spacing': 'error',
        'prefer-const': 'error',
        'no-var': 'error',
        'no-nested-ternary': 'error',
        'no-unneeded-ternary': 'error',
        'dot-notation': ['error', { 'allowPattern': '^[a-z]+([_-][a-z]+)+$' }],
        'eol-last': ['error', 'always'],
        'no-debugger': 'error',
        'no-irregular-whitespace': 'error',
        'no-return-assign': ['error', 'always'],
        'react/prop-types': 0,
        'curly': 2,
        'semi': 2,
        'no-undef': 0,
        'max-len': [2, 170, 4, {'ignoreUrls': true}]
    }
};
